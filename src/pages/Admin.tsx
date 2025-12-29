import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Package, FolderTree, Users, ShoppingBag, BarChart3, FileSpreadsheet, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from "xlsx";

interface UploadResult {
  total: number;
  success: number;
  failed: number;
  errors: string[];
}

export default function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, users: 0 });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, isAdmin, loading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
      ]);
      
      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        orders: 0,
        users: 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      toast({
        title: "Invalid File",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setUploadProgress(20);

      const result: UploadResult = { total: jsonData.length, success: 0, failed: 0, errors: [] };

      // First, ensure categories exist
      const categoryMap = new Map<string, string>();
      const uniqueCategories = [...new Set(jsonData.map((row: any) => row["Category"] || row["category"]).filter(Boolean))];

      setUploadProgress(30);

      for (const categoryName of uniqueCategories) {
        const slug = (categoryName as string).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        
        const { data: existingCategory } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        if (existingCategory) {
          categoryMap.set(categoryName as string, existingCategory.id);
        } else {
          const { data: newCategory, error } = await supabase
            .from("categories")
            .insert({
              name: categoryName,
              slug,
            })
            .select("id")
            .single();

          if (newCategory) {
            categoryMap.set(categoryName as string, newCategory.id);
          }
        }
      }

      setUploadProgress(50);

      // Now insert products
      const batchSize = 50;
      for (let i = 0; i < jsonData.length; i += batchSize) {
        const batch = jsonData.slice(i, i + batchSize);
        
        for (const row of batch) {
          const data = row as Record<string, any>;
          const categoryName = data["Category"] || data["category"] || "";
          const categoryId = categoryMap.get(categoryName);

          const productName = data["Discription"] || data["Description"] || data["Product Name"] || data["name"] || "";
          const slug = `${productName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          const tradePrice = parseFloat(data["T.Price"] || data["Trade Price"] || data["price"] || "0") || 0;
          const gstPercent = parseFloat(data["G.S.T %"] || data["GST"] || "0") || 0;
          const priceWithGst = tradePrice * (1 + gstPercent / 100);

          const productData = {
            name: productName,
            slug,
            barcode: String(data["Bar Code"] || data["Barcode"] || ""),
            brand: data["Brand"] || "",
            category_id: categoryId || null,
            distributor: data["Distributor"] || "",
            price: tradePrice,
            price_with_gst: priceWithGst,
            discount: 0,
            stock: 100,
            is_active: true,
          };

          if (!productData.name) {
            result.failed++;
            result.errors.push(`Row ${i + batch.indexOf(row) + 2}: Missing product name`);
            continue;
          }

          const { error } = await supabase.from("products").insert(productData);

          if (error) {
            result.failed++;
            result.errors.push(`Row ${i + batch.indexOf(row) + 2}: ${error.message}`);
          } else {
            result.success++;
          }
        }

        setUploadProgress(50 + Math.floor(((i + batch.length) / jsonData.length) * 45));
      }

      setUploadProgress(100);
      setUploadResult(result);
      fetchStats();

      toast({
        title: "Upload Complete",
        description: `Successfully imported ${result.success} of ${result.total} products.`,
      });

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your Smart Mart store</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Admin
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.products}</p>
                    <p className="text-sm text-muted-foreground">Products</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <FolderTree className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.categories}</p>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <ShoppingBag className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.orders}</p>
                    <p className="text-sm text-muted-foreground">Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-muted">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.users}</p>
                    <p className="text-sm text-muted-foreground">Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList>
              <TabsTrigger value="upload" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Products
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-2">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5" />
                    Import Products from Excel
                  </CardTitle>
                  <CardDescription>
                    Upload your Excel file (.xlsx) to import products. The file should contain columns for Product Name, Category, Price, Barcode, Brand, and Distributor.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    {uploading ? (
                      <div className="space-y-4">
                        <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                        <p className="text-lg font-medium">Importing products...</p>
                        <Progress value={uploadProgress} className="max-w-md mx-auto" />
                        <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                      </div>
                    ) : uploadResult ? (
                      <div className="space-y-4">
                        <CheckCircle2 className="h-12 w-12 mx-auto text-green-500" />
                        <p className="text-lg font-medium">Import Complete!</p>
                        <div className="flex justify-center gap-4">
                          <Badge variant="default" className="text-sm">
                            {uploadResult.success} Imported
                          </Badge>
                          {uploadResult.failed > 0 && (
                            <Badge variant="destructive" className="text-sm">
                              {uploadResult.failed} Failed
                            </Badge>
                          )}
                        </div>
                        {uploadResult.errors.length > 0 && (
                          <div className="mt-4 max-w-md mx-auto text-left">
                            <p className="text-sm font-medium text-destructive flex items-center gap-2 mb-2">
                              <AlertCircle className="h-4 w-4" />
                              Errors:
                            </p>
                            <ul className="text-xs text-muted-foreground space-y-1 max-h-32 overflow-y-auto">
                              {uploadResult.errors.slice(0, 10).map((error, i) => (
                                <li key={i}>{error}</li>
                              ))}
                              {uploadResult.errors.length > 10 && (
                                <li>...and {uploadResult.errors.length - 10} more errors</li>
                              )}
                            </ul>
                          </div>
                        )}
                        <Button onClick={() => setUploadResult(null)}>Upload Another File</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium">Drop your Excel file here</p>
                          <p className="text-sm text-muted-foreground">or click to browse</p>
                        </div>
                        <input
                          type="file"
                          accept=".xlsx,.xls"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button asChild>
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Select File
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Expected Excel Format:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• <strong>Discription</strong> or <strong>Product Name</strong>: Product name (required)</li>
                      <li>• <strong>Category</strong>: Category name</li>
                      <li>• <strong>T.Price</strong> or <strong>Trade Price</strong>: Base price</li>
                      <li>• <strong>G.S.T %</strong>: GST percentage</li>
                      <li>• <strong>Bar Code</strong>: Product barcode</li>
                      <li>• <strong>Brand</strong>: Brand name</li>
                      <li>• <strong>Distributor</strong>: Distributor name</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>View and manage all products in the database</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You have {stats.products} products in the database. Use the Excel upload to add more products.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>View store performance and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Analytics dashboard coming soon. Track sales, popular products, and more.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
