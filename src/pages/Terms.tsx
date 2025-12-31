import { Scale, FileText, AlertCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <Scale className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: December 31, 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  By accessing or using Smart Mart's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use of Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You agree to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>Not use the service for illegal purposes</li>
                  <li>Not interfere with the operation of our website</li>
                  <li>Not attempt to access other users' accounts</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Orders and Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2">
                  <li>All prices are listed in Pakistani Rupees (PKR)</li>
                  <li>Prices are subject to change without notice</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                  <li>Payment must be made at the time of order or upon delivery (COD)</li>
                  <li>We are not responsible for bank/payment gateway fees</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We strive to display accurate product information including descriptions, images, and prices. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  All content on this website, including text, graphics, logos, images, and software, is the property of Smart Mart and is protected by Pakistani and international copyright laws.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Smart Mart shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our services. Our total liability shall not exceed the amount paid by you for the specific product or service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  For questions about these Terms of Service, contact us at:
                </p>
                <p className="mt-2">
                  Email: legal@smartmart.pk<br />
                  Phone: +92 21 1234 5678<br />
                  Address: Plot #123, Block 5, Clifton, Karachi, Pakistan
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}