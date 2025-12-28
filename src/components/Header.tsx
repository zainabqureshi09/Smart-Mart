import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, Heart, MapPin, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { categories } from "@/lib/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground">
        <div className="container flex h-8 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Deliver to: Karachi, Pakistan
            </span>
            <span>🔥 Free delivery on orders over Rs. 2,000</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/seller" className="hover:underline">
              Become a Seller
            </Link>
            <Link to="/help" className="hover:underline">
              Help & Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 items-center gap-4">
        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-border bg-primary text-primary-foreground">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xl">Smart Mart</span>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <nav className="flex-1 overflow-auto p-4">
                <div className="space-y-1">
                  <Link
                    to="/"
                    className="block px-3 py-2 rounded-lg hover:bg-muted font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/deals"
                    className="block px-3 py-2 rounded-lg hover:bg-muted font-medium text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    🔥 Flash Deals
                  </Link>
                  <div className="pt-4 pb-2 px-3 text-sm font-semibold text-muted-foreground">
                    Categories
                  </div>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl">
          <span className="gradient-primary text-primary-foreground px-2 py-1 rounded-lg">Smart</span>
          <span className="text-foreground">Mart</span>
        </Link>

        {/* Categories Dropdown - Desktop */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden lg:flex">
            <Button variant="ghost" className="gap-2">
              <Menu className="h-4 w-4" />
              Categories
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {categories.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link
                  to={`/category/${category.slug}`}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-xl">{category.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.productCount} products
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products, brands, categories..."
              className="w-full pl-10 pr-20 h-11 rounded-full border-2 focus-visible:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Heart className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Categories Bar - Desktop */}
      <div className="hidden md:block border-t border-border bg-muted/30">
        <div className="container flex items-center gap-6 h-10 overflow-x-auto">
          <Link
            to="/deals"
            className="text-sm font-medium text-primary hover:underline whitespace-nowrap flex items-center gap-1"
          >
            🔥 Flash Deals
          </Link>
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
