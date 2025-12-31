import { Link } from "react-router-dom";
import { Search, HelpCircle, Package, Truck, CreditCard, RotateCcw, MessageCircle, Phone, Mail } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const helpTopics = [
  { icon: Package, title: "Orders", description: "Track orders, manage orders" },
  { icon: Truck, title: "Shipping", description: "Delivery info, shipping rates" },
  { icon: CreditCard, title: "Payments", description: "Payment methods, refunds" },
  { icon: RotateCcw, title: "Returns", description: "Return policy, exchanges" },
];

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by going to 'My Orders' in your account. Click on the specific order to see its current status and tracking information."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery (COD), credit/debit cards, bank transfers, and mobile wallets like JazzCash and Easypaisa."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days within major cities. Remote areas may take 5-7 business days. Express delivery is available for selected areas."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for most items. Products must be unused and in original packaging. Some categories like food items may have different policies."
  },
  {
    question: "How do I become a seller on Smart Mart?",
    answer: "Visit our Seller Portal and complete the registration process. You'll need to provide business documents and bank details. Once verified, you can start listing products."
  },
  {
    question: "Is Cash on Delivery available?",
    answer: "Yes, Cash on Delivery is available for most locations across Pakistan. COD orders may have a small additional fee."
  },
];

export default function Help() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How can we help you?
            </h1>
            <p className="text-primary-foreground/80 mb-8">
              Search our help center or browse topics below
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                className="pl-12 h-14 text-lg rounded-xl bg-background text-foreground"
              />
            </div>
          </div>
        </section>

        {/* Help Topics */}
        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              Browse Help Topics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {helpTopics.map((topic) => (
                <Card key={topic.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <topic.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-2xl font-display font-bold mb-8 text-center">
              Still need help?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    +92 21 1234 5678
                  </p>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    support@smartmart.pk
                  </p>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}