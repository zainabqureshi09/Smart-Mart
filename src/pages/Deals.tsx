import { Link } from "react-router-dom";
import { Zap, Timer, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { flashDeals, bestPriceProducts } from "@/lib/data";

export default function Deals() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="gradient-deal text-primary-foreground py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-background/20">
                  <Zap className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold">Flash Deals</h1>
                  <p className="text-primary-foreground/80">Limited time offers - Don't miss out!</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-background/20 rounded-xl px-6 py-4">
                <Timer className="h-6 w-6" />
                <div>
                  <div className="text-sm text-primary-foreground/80">Ends in</div>
                  <div className="text-2xl font-bold font-mono">23:45:32</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Deals */}
        <section className="py-12 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold">Today's Flash Deals</h2>
                <p className="text-muted-foreground">Up to 50% off on selected items</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {flashDeals.length} deals available
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Best Prices */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-display font-bold">Best Price Guarantee</h2>
                <p className="text-muted-foreground">We match any competitor's price</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {bestPriceProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-background">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Want more deals?
            </h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter and never miss a flash deal again.
            </p>
            <Button size="lg" asChild>
              <Link to="/">
                Browse All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}