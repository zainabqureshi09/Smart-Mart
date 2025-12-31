import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Truck, Shield, ArrowLeft, Share2, BadgeCheck, Minus, Plus, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { getProductById, products, formatPrice, calculateDiscount } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discountedPrice = product.discount
    ? calculateDiscount(product.priceWithGst, product.discount)
    : product.priceWithGst;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-primary">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-lg px-4 py-2">
                    -{product.discount}%
                  </Badge>
                )}
                {product.isBestPrice && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground flex items-center gap-1">
                    <Trophy className="h-3 w-3" /> Best Price
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{product.brand}</span>
                  <BadgeCheck className="h-4 w-4 text-accent" />
                  <span>Verified Seller</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-warning text-warning"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-end gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {formatPrice(discountedPrice)}
                  </span>
                  {product.discount && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.priceWithGst)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <Separator />

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Truck className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <div className="font-medium">Free Delivery</div>
                    <div className="text-muted-foreground">On orders over Rs. 2,000</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-5 w-5 text-secondary" />
                  <div className="text-sm">
                    <div className="font-medium">Secure Payment</div>
                    <div className="text-muted-foreground">100% Protected</div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-3">
                <h3 className="font-semibold">Product Details</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd>{product.category}</dd>
                  <dt className="text-muted-foreground">Sub-Category</dt>
                  <dd>{product.subCategory}</dd>
                  <dt className="text-muted-foreground">Brand</dt>
                  <dd>{product.brand}</dd>
                  <dt className="text-muted-foreground">Barcode</dt>
                  <dd>{product.barcode}</dd>
                  <dt className="text-muted-foreground">Distributor</dt>
                  <dd>{product.distributor}</dd>
                </dl>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-display font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
