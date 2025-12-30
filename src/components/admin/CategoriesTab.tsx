import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryForm } from "./CategoryForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  parent?: { name: string } | null;
}

export function CategoriesTab({ onStatsChange }: { onStatsChange: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, description, image_url, parent_id, parent:categories!parent_id(name)")
      .order("name");
    
    if (error) {
      toast({ title: "Error fetching categories", description: error.message, variant: "destructive" });
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    
    const { error } = await supabase.from("categories").delete().eq("id", selectedCategory.id);
    if (error) {
      toast({ title: "Error deleting category", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Category deleted" });
      fetchCategories();
      onStatsChange();
    }
    setDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Category Management</CardTitle>
              <CardDescription>Organize products with categories</CardDescription>
            </div>
            <Button onClick={() => { setSelectedCategory(null); setDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={category.image_url || ""} alt={category.name} />
                            <AvatarFallback>{category.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            {category.name}
                            {category.description && (
                              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                        <TableCell>{category.parent?.name || "-"}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setSelectedCategory(category); setDialogOpen(true); }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setSelectedCategory(category); setDeleteDialogOpen(true); }}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
          </DialogHeader>
          <CategoryForm
            category={selectedCategory}
            onSuccess={() => { setDialogOpen(false); fetchCategories(); onStatsChange(); }}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? Products in this category will become uncategorized.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
