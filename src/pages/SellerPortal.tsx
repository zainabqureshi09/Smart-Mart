import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Store, Package, Plus, Pencil, Trash2, Loader2, ArrowLeft, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductForm } from "@/components/admin/ProductForm";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  price_with_gst: number;
  stock: number;
  is_active: boolean;
  category: { name: string } | null;
}

export default function SellerPortal() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSeller, setIsSeller] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      checkSellerRole();
    }
  }, [user, loading, navigate]);

  const checkSellerRole = async () => {
    setCheckingRole(true);
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user!.id)
      .eq("role", "seller")
      .maybeSingle();
    
    setIsSeller(!!data);
    if (data) {
      fetchSellerProducts();
    }
    setCheckingRole(false);
  };

  const fetchSellerProducts = async () => {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, price_with_gst, stock, is_active, category:categories(name)")
      .eq("seller_id", user!.id)
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ title: "Error fetching products", description: error.message, variant: "destructive" });
    } else {
      setProducts(data || []);
    }
    setLoadingProducts(false);
  };

  const handleRegisterAsSeller = async () => {
    setRegistering(true);
    try {
      const { error } = await supabase.from("user_roles").insert({
        user_id: user!.id,
        role: "seller",
      });
      if (error) throw error;
      
      toast({ title: "Success!", description: "You are now registered as a seller." });
      setIsSeller(true);
      fetchSellerProducts();
    } catch (error) {
      toast({
        title: "Registration failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setRegistering(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    
    const { error } = await supabase.from("products").delete().eq("id", selectedProduct.id);
    if (error) {
      toast({ title: "Error deleting product", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      fetchSellerProducts();
    }
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSuccess = async () => {
    setDialogOpen(false);
    // Add seller_id to the product
    if (!selectedProduct) {
      // Refetch to ensure seller_id is set properly
    }
    fetchSellerProducts();
  };

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-display font-bold">Seller Portal</h1>
              <p className="text-muted-foreground">Manage your products and listings</p>
            </div>
          </div>

          {!isSeller ? (
            <Card className="max-w-lg mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto p-4 rounded-full bg-primary/10 w-fit mb-4">
                  <Store className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Become a Seller</CardTitle>
                <CardDescription>
                  Start selling your products on Smart Mart. Register as a seller to list your products and reach thousands of customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button onClick={handleRegisterAsSeller} disabled={registering} size="lg">
                  {registering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Register as Seller
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="products" className="space-y-6">
              <TabsList>
                <TabsTrigger value="products" className="gap-2">
                  <Package className="h-4 w-4" />
                  My Products
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>My Products</CardTitle>
                        <CardDescription>Manage your product listings</CardDescription>
                      </div>
                      <Button onClick={() => { setSelectedProduct(null); setDialogOpen(true); }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {loadingProducts ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Stock</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {products.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                  No products yet. Add your first product!
                                </TableCell>
                              </TableRow>
                            ) : (
                              products.map((product) => (
                                <TableRow key={product.id}>
                                  <TableCell className="font-medium">{product.name}</TableCell>
                                  <TableCell>{product.category?.name || "-"}</TableCell>
                                  <TableCell>₹{product.price_with_gst.toFixed(2)}</TableCell>
                                  <TableCell>{product.stock}</TableCell>
                                  <TableCell>
                                    <Badge variant={product.is_active ? "default" : "secondary"}>
                                      {product.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => { setSelectedProduct(product); setDialogOpen(true); }}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => { setSelectedProduct(product); setDeleteDialogOpen(true); }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Track your sales performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">{products.length}</div>
                          <p className="text-sm text-muted-foreground">Total Products</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">{products.filter(p => p.is_active).length}</div>
                          <p className="text-sm text-muted-foreground">Active Listings</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-2xl font-bold">₹0</div>
                          <p className="text-sm text-muted-foreground">Total Sales</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <SellerProductForm
            product={selectedProduct}
            sellerId={user.id}
            onSuccess={handleProductSuccess}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}

// Seller-specific product form that auto-sets seller_id
function SellerProductForm({ product, sellerId, onSuccess, onCancel }: {
  product?: any;
  sellerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("id, name").order("name");
    if (data) setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const priceWithGst = parseFloat(formData.get("price_with_gst") as string) || 0;
    const stock = parseInt(formData.get("stock") as string) || 0;
    const categoryId = formData.get("category_id") as string;
    const description = formData.get("description") as string;
    const brand = formData.get("brand") as string;
    const imageUrl = formData.get("image_url") as string;

    const slug = `${name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}-${Date.now()}`;

    const productData = {
      name,
      slug,
      price,
      price_with_gst: priceWithGst,
      stock,
      category_id: categoryId || null,
      description: description || null,
      brand: brand || null,
      image_url: imageUrl || null,
      seller_id: sellerId,
      is_active: true,
    };

    try {
      if (product) {
        const { error } = await supabase.from("products").update(productData).eq("id", product.id);
        if (error) throw error;
        toast({ title: "Product updated" });
      } else {
        const { error } = await supabase.from("products").insert(productData);
        if (error) throw error;
        toast({ title: "Product created" });
      }
      onSuccess();
    } catch (error) {
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Product Name *</label>
          <input
            name="name"
            defaultValue={product?.name || ""}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Product name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            name="category_id"
            defaultValue={product?.category_id || ""}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price *</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product?.price || ""}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price with GST *</label>
          <input
            name="price_with_gst"
            type="number"
            step="0.01"
            defaultValue={product?.price_with_gst || ""}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock</label>
          <input
            name="stock"
            type="number"
            defaultValue={product?.stock || 0}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Brand</label>
          <input
            name="brand"
            defaultValue={product?.brand || ""}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Brand name"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Image URL</label>
          <input
            name="image_url"
            defaultValue={product?.image_url || ""}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="https://..."
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          defaultValue={product?.description || ""}
          className="w-full px-3 py-2 border rounded-md min-h-[80px]"
          placeholder="Product description..."
        />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
