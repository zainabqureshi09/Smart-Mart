import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Category } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/CategoryIcon";

interface CategoryCardProps {
  category: Category;
  variant?: "default" | "compact" | "featured";
}

export function CategoryCard({ category, variant = "default" }: CategoryCardProps) {
  if (variant === "featured") {
    return (
      <Link
        to={`/category/${category.slug}`}
        className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[4/3]"
      >
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <CategoryIcon icon={category.icon} className="h-7 w-7 text-background" />
            <h3 className="text-2xl font-display font-bold text-background">
              {category.name}
            </h3>
          </div>
          <p className="text-background/80 text-sm mb-3">
            {category.productCount}+ products
          </p>
          <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
            Shop Now
            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/category/${category.slug}`}
        className="group flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted transition-colors"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary/10">
          <CategoryIcon icon={category.icon} className="h-7 w-7 md:h-8 md:w-8 text-primary" />
        </div>
        <span className="text-sm font-medium text-center line-clamp-1">
          {category.name}
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <CategoryIcon icon={category.icon} className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.productCount} products
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
