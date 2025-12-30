import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100),
  description: z.string().max(500).optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  parent_id: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface Category {
  id: string;
  name: string;
}

interface CategoryFormProps {
  category?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      image_url: category?.image_url || "",
      parent_id: category?.parent_id || "",
    },
  });

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const fetchParentCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("id, name")
      .is("parent_id", null)
      .order("name");
    if (data) {
      // Exclude current category if editing
      setParentCategories(
        category ? data.filter((c) => c.id !== category.id) : data
      );
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const onSubmit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      const categoryData = {
        name: data.name,
        slug: category?.slug || generateSlug(data.name),
        description: data.description || null,
        image_url: data.image_url || null,
        parent_id: data.parent_id || null,
      };

      if (category) {
        const { error } = await supabase
          .from("categories")
          .update(categoryData)
          .eq("id", category.id);
        if (error) throw error;
        toast({ title: "Category updated successfully" });
      } else {
        const { error } = await supabase.from("categories").insert(categoryData);
        if (error) throw error;
        toast({ title: "Category created successfully" });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parent_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parent Category (optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parent category (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">None (Top-level category)</SelectItem>
                  {parentCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Category description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {category ? "Update Category" : "Add Category"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
