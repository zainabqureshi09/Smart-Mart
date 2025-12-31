import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, CreditCard, Truck, Shield, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Trust Badges */}
      <div className="border-b border-background/10">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Free Delivery</div>
                <div className="text-xs text-background/60">On orders over Rs. 2,000</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-secondary/20">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Secure Payment</div>
                <div className="text-xs text-background/60">100% Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-accent/20">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-semibold text-sm">24/7 Support</div>
                <div className="text-xs text-background/60">Always here to help</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/20">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Easy Returns</div>
                <div className="text-xs text-background/60">7-day return policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl mb-4">
              <span className="gradient-primary text-primary-foreground px-2 py-1 rounded-lg">Smart</span>
              <span>Mart</span>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              Pakistan's smartest marketplace. Shop from thousands of products at the best prices, with fast delivery across Pakistan.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <div className="font-semibold mb-2">Subscribe to our newsletter</div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button>Subscribe</Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/deals" className="text-background/70 hover:text-primary transition-colors">Flash Deals</Link></li>
              <li><Link to="/category/biscuits" className="text-background/70 hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link to="/category/chips-snacks" className="text-background/70 hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link to="/seller" className="text-background/70 hover:text-primary transition-colors">Become a Seller</Link></li>
              <li><Link to="/track-order" className="text-background/70 hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-background/70 hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/returns" className="text-background/70 hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/shipping" className="text-background/70 hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/faq" className="text-background/70 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Plot #123, Block 5, Clifton, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="h-5 w-5" />
                <span>+92 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="h-5 w-5" />
                <span>support@smartmart.pk</span>
              </li>
            </ul>
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-background rounded-full hover:bg-[#128C7E] transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-background/60">
              © 2024 Smart Mart. All rights reserved. Made in Pakistan
            </div>
            <div className="flex items-center gap-4 text-sm text-background/60">
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-primary">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
