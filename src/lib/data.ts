// Smart Mart Product Data - Parsed from Excel
// Categories and products from the uploaded Excel file

export interface Product {
  id: string;
  barcode: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  distributor: string;
  tradePrice: number;
  retailPrice: number;
  gstPercent: number;
  priceWithGst: number;
  discount?: number;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  image: string;
  isBestPrice?: boolean;
  isFlashDeal?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  image: string;
  subCategories: string[];
}

// Categories extracted from Excel
export const categories: Category[] = [
  {
    id: "1",
    name: "Biscuits",
    slug: "biscuits",
    icon: "🍪",
    productCount: 245,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
    subCategories: ["Biscuit", "Wafers", "Cookies", "Cream Biscuits"],
  },
  {
    id: "2",
    name: "Confectionery",
    slug: "confectionery",
    icon: "🍬",
    productCount: 189,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    subCategories: ["Candy/Sweets", "Mouth Freshner", "Chocolates", "Toffees"],
  },
  {
    id: "3",
    name: "Chips & Snacks",
    slug: "chips-snacks",
    icon: "🥨",
    productCount: 312,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    subCategories: ["Local Chips", "Peanut & Nimco", "Imported Chips", "Nachos"],
  },
  {
    id: "4",
    name: "Beverages",
    slug: "beverages",
    icon: "🥤",
    productCount: 156,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400",
    subCategories: ["Soft Drinks", "Juices", "Energy Drinks", "Water"],
  },
  {
    id: "5",
    name: "Dairy & Frozen",
    slug: "dairy-frozen",
    icon: "🧊",
    productCount: 89,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400",
    subCategories: ["Milk", "Cheese", "Ice Cream", "Frozen Foods"],
  },
  {
    id: "6",
    name: "Grocery",
    slug: "grocery",
    icon: "🛒",
    productCount: 423,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    subCategories: ["Rice", "Flour", "Spices", "Oil"],
  },
  {
    id: "7",
    name: "Personal Care",
    slug: "personal-care",
    icon: "🧴",
    productCount: 178,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    subCategories: ["Shampoo", "Soap", "Skincare", "Oral Care"],
  },
  {
    id: "8",
    name: "Home Care",
    slug: "home-care",
    icon: "🏠",
    productCount: 134,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
    subCategories: ["Detergent", "Cleaners", "Air Fresheners", "Tissue"],
  },
];

// Products from Excel data
export const products: Product[] = [
  {
    id: "1",
    barcode: "8964000598306",
    name: "Aas Pas Chocolate Pan Masala 1x48pcs",
    category: "Confectionery",
    subCategory: "Mouth Freshner",
    brand: "Aas Pas",
    distributor: "Shahi Enterprises",
    tradePrice: 100,
    retailPrice: 101.69,
    gstPercent: 18,
    priceWithGst: 119.70,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    isFlashDeal: true,
    discount: 15,
  },
  {
    id: "2",
    barcode: "8990800011196",
    name: "Alpenlibe Caramel and Cream Candy 32G",
    category: "Confectionery",
    subCategory: "Candy/Sweets",
    brand: "Alpenliebe",
    distributor: "Saleem & Sons",
    tradePrice: 121,
    retailPrice: 135.59,
    gstPercent: 21.8,
    priceWithGst: 157.39,
    rating: 4.8,
    reviews: 567,
    inStock: true,
    image: "https://images.unsplash.com/photo-1581798269146-f7b29e263eb8?w=400",
    isTrending: true,
    isBestPrice: true,
  },
  {
    id: "3",
    barcode: "8991115000103",
    name: "Alpenliebe Caramel Stick 32GM",
    category: "Biscuits",
    subCategory: "Wafers",
    brand: "Alpenliebe",
    distributor: "Saleem & Sons",
    tradePrice: 159,
    retailPrice: 160,
    gstPercent: 28.69,
    priceWithGst: 188.69,
    rating: 4.3,
    reviews: 189,
    inStock: true,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
  },
  {
    id: "4",
    barcode: "8886001038028",
    name: "Astor Chocolate Wafer Roll 330GM Tin",
    category: "Biscuits",
    subCategory: "Wafers",
    brand: "Astor",
    distributor: "Asad Traders",
    tradePrice: 1143,
    retailPrice: 1032,
    gstPercent: 20.57,
    priceWithGst: 1237.68,
    rating: 4.9,
    reviews: 892,
    inStock: true,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    isFlashDeal: true,
    discount: 20,
    isBestPrice: true,
  },
  {
    id: "5",
    barcode: "8964001413042",
    name: "Aurora Mirch Masala Chips",
    category: "Chips & Snacks",
    subCategory: "Local Chips",
    brand: "Aurora",
    distributor: "Aurora Food",
    tradePrice: 17,
    retailPrice: 16.95,
    gstPercent: 18.15,
    priceWithGst: 20.03,
    rating: 4.2,
    reviews: 445,
    inStock: true,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    isTrending: true,
  },
  {
    id: "6",
    barcode: "8964001413097",
    name: "Aurora Ringlings Onion Chips 40G",
    category: "Chips & Snacks",
    subCategory: "Local Chips",
    brand: "Aurora",
    distributor: "Aurora Food",
    tradePrice: 26,
    retailPrice: 25.42,
    gstPercent: 18.31,
    priceWithGst: 30.08,
    rating: 4.6,
    reviews: 312,
    inStock: true,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400",
  },
  {
    id: "7",
    barcode: "8964000596593",
    name: "Ballay Ballay Dal Chaska Rs 20",
    category: "Chips & Snacks",
    subCategory: "Peanut & Nimco",
    brand: "Ballay Ballay",
    distributor: "F.O Traders",
    tradePrice: 16,
    retailPrice: 16.95,
    gstPercent: 16.86,
    priceWithGst: 19.81,
    rating: 4.4,
    reviews: 523,
    inStock: true,
    image: "https://images.unsplash.com/photo-1604413191066-4dd20bedf4a3?w=400",
    isFlashDeal: true,
    discount: 10,
  },
  {
    id: "8",
    barcode: "8964003456818",
    name: "B & B Chocolate Wafers Stick 40G",
    category: "Biscuits",
    subCategory: "Wafers",
    brand: "B & B",
    distributor: "JF Marketing",
    tradePrice: 200,
    retailPrice: 224,
    gstPercent: 0,
    priceWithGst: 224,
    rating: 4.1,
    reviews: 156,
    inStock: true,
    image: "https://images.unsplash.com/photo-1590080875897-ebb4c9f8b6e1?w=400",
  },
  {
    id: "9",
    barcode: "8961102507892",
    name: "BC Biscuit Crux Rs-30",
    category: "Biscuits",
    subCategory: "Biscuit",
    brand: "Bisconi",
    distributor: "ZM Traders",
    tradePrice: 27,
    retailPrice: 25.42,
    gstPercent: 19.37,
    priceWithGst: 30.34,
    rating: 4.7,
    reviews: 678,
    inStock: true,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    isTrending: true,
    isBestPrice: true,
  },
  {
    id: "10",
    barcode: "110898",
    name: "Baris Food Peanut Chikki",
    category: "Chips & Snacks",
    subCategory: "Peanut & Nimco",
    brand: "Baris Food",
    distributor: "Baris Food",
    tradePrice: 50,
    retailPrice: 66.10,
    gstPercent: 13.62,
    priceWithGst: 75.10,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    image: "https://images.unsplash.com/photo-1604413191066-4dd20bedf4a3?w=400",
  },
  {
    id: "11",
    barcode: "8697422657640",
    name: "ATV Moto Egg Surprise",
    category: "Confectionery",
    subCategory: "Candy/Sweets",
    brand: "ATV",
    distributor: "Saleem & Sons",
    tradePrice: 180,
    retailPrice: 192,
    gstPercent: 16.88,
    priceWithGst: 224.40,
    rating: 4.8,
    reviews: 423,
    inStock: true,
    image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400",
    isFlashDeal: true,
    discount: 25,
  },
  {
    id: "12",
    barcode: "9287229457216",
    name: "American Crystal Flavoured Drink 290ML",
    category: "Beverages",
    subCategory: "Soft Drinks",
    brand: "American Crystal",
    distributor: "S.A.M Enterprise",
    tradePrice: 92,
    retailPrice: 96,
    gstPercent: 17.19,
    priceWithGst: 112.50,
    rating: 4.3,
    reviews: 345,
    inStock: true,
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400",
    isTrending: true,
  },
];

export const flashDeals = products.filter((p) => p.isFlashDeal);
export const trendingProducts = products.filter((p) => p.isTrending);
export const bestPriceProducts = products.filter((p) => p.isBestPrice);

export function getProductsByCategory(categorySlug: string): Product[] {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return products.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function calculateDiscount(original: number, discountPercent: number): number {
  return original - (original * discountPercent) / 100;
}
