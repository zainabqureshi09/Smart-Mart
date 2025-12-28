import { Link } from "react-router-dom";
import { ArrowRight, Zap, TrendingUp, Star, Timer, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, flashDeals, trendingProducts, products, formatPrice } from "@/lib/data";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero text-primary-foreground">
          <div className="container py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-slide-up">
                <Badge className="bg-background/20 text-primary-foreground border-0 text-sm px-4 py-1">
                  🎉 Pakistan's #1 Marketplace
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                  Shop Smart,
                  <br />
                  <span className="text-background">Save Big!</span>
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg">
                  Discover thousands of products at unbeatable prices. From snacks to groceries, we've got everything you need.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" className="font-semibold" asChild>
                    <Link to="/deals">
                      <Zap className="mr-2 h-5 w-5" />
                      Flash Deals
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                    <Link to="/category/biscuits">
                      Browse Categories
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                
                {/* Trust Stats */}
                <div className="flex flex-wrap gap-8 pt-4">
                  <div>
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-sm text-primary-foreground/70">Products</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-primary-foreground/70">Brands</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-primary-foreground/70">Support</div>
                  </div>
                </div>
              </div>
              
              {/* Hero Product Card */}
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-background/10 rounded-full blur-3xl" />
                  <div className="relative bg-background rounded-2xl p-6 shadow-2xl">
                    <Badge className="absolute -top-3 -right-3 bg-destructive text-destructive-foreground text-lg px-4 py-2 animate-bounce-subtle">
                      -25% OFF
                    </Badge>
                    <img
                      src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400"
                      alt="Featured Product"
                      className="w-full aspect-square object-cover rounded-xl mb-4"
                    />
                    <h3 className="font-semibold text-foreground text-lg">Premium Biscuits Box</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl font-bold text-primary">Rs. 899</span>
                      <span className="text-muted-foreground line-through">Rs. 1,199</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
            </svg>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">Shop by Category</h2>
                <p className="text-muted-foreground">Browse our wide range of categories</p>
              </div>
              <Button variant="ghost" asChild>
                <Link to="/categories">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        {/* Flash Deals Section */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full gradient-deal text-primary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Flash Deals</h2>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>Ends in 23:45:32</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link to="/deals">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {flashDeals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-12 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-secondary text-secondary-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">Trending Now</h2>
                  <p className="text-muted-foreground">Most popular products this week</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {trendingProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Featured Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(0, 3).map((category) => (
                <CategoryCard key={category.id} category={category} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* All Products */}
        <section className="py-12 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold">All Products</h2>
              <Button variant="outline" asChild>
                <Link to="/products">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} variant="compact" />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 gradient-secondary text-secondary-foreground">
          <div className="container text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <Badge className="bg-background/20 text-secondary-foreground border-0">
                <Percent className="h-4 w-4 mr-1" /> Save up to 50%
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Become a Seller Today!
              </h2>
              <p className="text-lg text-secondary-foreground/80">
                Join thousands of sellers on Smart Mart and reach millions of customers across Pakistan.
              </p>
              <Button size="lg" variant="outline" className="bg-transparent border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
                Start Selling <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
