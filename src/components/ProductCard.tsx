import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Eye, BadgeCheck } from "lucide-react";
import { Product, formatPrice, calculateDiscount } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const discountedPrice = product.discount
    ? calculateDiscount(product.priceWithGst, product.discount)
    : product.priceWithGst;

  if (variant === "horizontal") {
    return (
      <Link
        to={`/product/${product.id}`}
        className="group flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300"
      >
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-destructive">
              -{product.discount}%
            </Badge>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              {product.discount && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.priceWithGst)}
                </span>
              )}
            </div>
          </div>
          
          <Button
            size="sm"
            className="mt-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group relative flex flex-col bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300",
        variant === "compact" && "rounded-lg"
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-muted",
        variant === "compact" ? "aspect-square" : "aspect-[4/3]"
      )}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          )}
          {product.isBestPrice && (
            <Badge className="bg-secondary text-secondary-foreground">
              Best Price
            </Badge>
          )}
          {product.isFlashDeal && (
            <Badge className="gradient-deal text-primary-foreground">
              🔥 Flash Deal
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-md"
            onClick={(e) => {
              e.preventDefault();
              toast.success("Added to wishlist!");
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-md"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart - Appears on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            className="w-full shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col",
        variant === "compact" ? "p-3" : "p-4"
      )}>
        {/* Brand */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <span>{product.brand}</span>
          <BadgeCheck className="h-3 w-3 text-accent" />
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors",
          variant === "compact" ? "text-sm" : "text-base"
        )}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating || 0)
                    ? "fill-warning text-warning"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-end gap-2">
          <span className={cn(
            "font-bold text-primary",
            variant === "compact" ? "text-base" : "text-lg"
          )}>
            {formatPrice(discountedPrice)}
          </span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.priceWithGst)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <Badge variant="secondary" className="mt-2 w-fit">
            Out of Stock
          </Badge>
        )}
      </div>
    </Link>
  );
}
