import { useState } from "react";
import { Package, Search, CheckCircle, Truck, Clock, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState<null | {
    id: string;
    status: string;
    steps: { title: string; date: string; completed: boolean }[];
  }>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      toast.error("Please enter an order ID");
      return;
    }

    // Demo tracking result
    setTrackingResult({
      id: orderId.toUpperCase(),
      status: "In Transit",
      steps: [
        { title: "Order Placed", date: "Dec 28, 2024 - 10:30 AM", completed: true },
        { title: "Order Confirmed", date: "Dec 28, 2024 - 11:00 AM", completed: true },
        { title: "Shipped", date: "Dec 29, 2024 - 2:00 PM", completed: true },
        { title: "In Transit", date: "Dec 30, 2024 - 9:00 AM", completed: true },
        { title: "Out for Delivery", date: "Expected today", completed: false },
        { title: "Delivered", date: "", completed: false },
      ],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <Package className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-display font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order ID to see the current status
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleTrack} className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Enter Order ID (e.g., SM12345678)"
                    className="pl-12 h-12"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg">
                  Track Order
                </Button>
              </form>
            </CardContent>
          </Card>

          {trackingResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order #{trackingResult.id}</span>
                  <span className="text-sm font-normal bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {trackingResult.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {trackingResult.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 pb-8 last:pb-0">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : index === 4 ? (
                            <Truck className="h-5 w-5" />
                          ) : index === 5 ? (
                            <MapPin className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        {index < trackingResult.steps.length - 1 && (
                          <div className={`absolute left-1/2 top-10 w-0.5 h-8 -translate-x-1/2 ${
                            step.completed ? "bg-primary" : "bg-muted"
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className={`font-medium ${!step.completed && "text-muted-foreground"}`}>
                          {step.title}
                        </h3>
                        {step.date && (
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}