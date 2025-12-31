import { Truck, Clock, MapPin, Package, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const shippingZones = [
  { city: "Karachi", time: "1-2 days", cost: "Free over Rs. 2,000" },
  { city: "Lahore", time: "2-3 days", cost: "Rs. 150" },
  { city: "Islamabad", time: "2-3 days", cost: "Rs. 150" },
  { city: "Other Major Cities", time: "3-5 days", cost: "Rs. 200" },
  { city: "Remote Areas", time: "5-7 days", cost: "Rs. 300" },
];

export default function Shipping() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <Truck className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Shipping Information
            </h1>
            <p className="text-muted-foreground">
              Everything you need to know about delivery times and costs
            </p>
          </div>

          {/* Shipping Zones */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Delivery Zones & Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Destination</th>
                      <th className="text-left py-3 px-4">Delivery Time</th>
                      <th className="text-left py-3 px-4">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingZones.map((zone, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4 font-medium">{zone.city}</td>
                        <td className="py-3 px-4">{zone.time}</td>
                        <td className="py-3 px-4">{zone.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Same Day Delivery</h3>
                <p className="text-muted-foreground">
                  Order before 2 PM for same-day delivery in Karachi. Available for selected areas only.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Package className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">Secure Packaging</h3>
                <p className="text-muted-foreground">
                  All orders are carefully packaged to ensure your products arrive in perfect condition.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-muted-foreground text-sm">
                    Enjoy free shipping on orders over Rs. 2,000 within Karachi.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Order Tracking</h4>
                  <p className="text-muted-foreground text-sm">
                    Track your order in real-time from dispatch to delivery.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Delivery Attempts</h4>
                  <p className="text-muted-foreground text-sm">
                    We make up to 3 delivery attempts. After that, the order is returned.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}