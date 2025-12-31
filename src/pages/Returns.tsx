import { RotateCcw, CheckCircle, XCircle, Clock, Package, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Returns() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <RotateCcw className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Returns & Refunds
            </h1>
            <p className="text-muted-foreground">
              Our hassle-free return policy ensures your satisfaction
            </p>
          </div>

          {/* Return Window */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">7-Day Return Policy</h2>
              <p className="text-muted-foreground">
                Return any item within 7 days of delivery for a full refund
              </p>
            </CardContent>
          </Card>

          {/* Eligible vs Non-Eligible */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  Eligible for Return
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Unused products in original packaging
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Defective or damaged items
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Wrong item received
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  Missing items from order
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Not Eligible for Return
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  Used or opened products
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  Perishable food items
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  Items without original packaging
                </p>
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                  Returns after 7 days
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Return Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "Request Return", desc: "Go to My Orders and select the item to return" },
                  { step: 2, title: "Pack Item", desc: "Pack the item securely in original packaging" },
                  { step: 3, title: "Pickup", desc: "Our courier will pick up the item from your address" },
                  { step: 4, title: "Refund", desc: "Receive refund within 5-7 business days" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                      {item.step}
                    </div>
                    <h4 className="font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Refund Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Refund Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Refunds are processed within 5-7 business days after we receive the returned item. 
                The refund will be credited to your original payment method.
              </p>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Need help with a return?</h4>
                  <p className="text-sm text-muted-foreground">Contact our support team</p>
                </div>
                <Button asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}