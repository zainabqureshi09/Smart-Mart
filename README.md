# PakSmart Mart

PakSmart Mart is a modern e-commerce marketplace platform built for Pakistan, featuring a comprehensive shopping experience with product browsing, cart management, wishlist, admin panel, and seller portal. The platform is built with Next.js App Router, React Router, Supabase, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Product Management**: Browse products by categories, search functionality, product details
- **Shopping Cart**: Add to cart, manage quantities, checkout process
- **Wishlist**: Save favorite products for later
- **User Authentication**: Secure authentication with Supabase Auth
- **Admin Panel**: Manage products, categories, and platform settings
- **Seller Portal**: Dedicated portal for sellers to manage their products
- **Order Tracking**: Track order status and delivery
- **Flash Deals**: Time-limited deals and promotions
- **Categories**: Organized product categories with subcategories
- **Responsive Design**: Mobile-first responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + React Router (legacy pages)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Database, Authentication, Real-time)
- **State Management**: Zustand, React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation
- **Notifications**: Sonner (Toast notifications)
- **Icons**: Lucide React
- **Charts**: Recharts

## 📁 Project Structure

```
paksmart-mart/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   ├── cart/                     # Shopping cart page
│   ├── product/[id]/             # Product detail pages
│   ├── products/                 # Products listing
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── src/
│   ├── components/               # React components
│   │   ├── admin/                # Admin components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── Header.tsx            # Site header
│   │   ├── Footer.tsx            # Site footer
│   │   ├── ProductCard.tsx       # Product card component
│   │   └── CategoryCard.tsx      # Category card component
│   ├── pages/                    # React Router pages
│   │   ├── Index.tsx             # Home page
│   │   ├── Products.tsx          # Products page
│   │   ├── ProductDetail.tsx     # Product detail
│   │   ├── Cart.tsx              # Shopping cart
│   │   ├── Wishlist.tsx          # Wishlist
│   │   ├── Admin.tsx              # Admin panel
│   │   ├── SellerPortal.tsx      # Seller portal
│   │   ├── Orders.tsx            # Order management
│   │   ├── TrackOrder.tsx        # Order tracking
│   │   └── ...                   # Other pages
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.tsx           # Authentication hook
│   │   └── use-mobile.tsx        # Mobile detection
│   ├── lib/                      # Utilities and helpers
│   │   ├── supabase/             # Supabase clients
│   │   │   ├── client.ts         # Browser client
│   │   │   └── server.ts         # Server client (SSR)
│   │   ├── cart.ts               # Cart management
│   │   ├── data.ts               # Mock data and utilities
│   │   └── utils.ts              # General utilities
│   ├── integrations/             # Third-party integrations
│   │   └── supabase/             # Supabase integration
│   ├── App.tsx                   # React Router setup
│   └── main.tsx                  # React entry point
├── middleware.ts                 # Next.js middleware (auth)
├── tailwind.config.ts            # Tailwind configuration
├── next.config.mjs               # Next.js configuration
└── components.json               # shadcn/ui configuration
```

## 🔧 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd paksmart-mart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Setup

The project uses Supabase for database and authentication. Make sure to:

1. Set up your Supabase project
2. Run the migrations from `supabase/migrations/`
3. Configure authentication providers in Supabase dashboard
4. Set up the required tables:
   - `products`
   - `categories`
   - `cart`
   - `wishlist`
   - `orders`
   - `users`

## 🎨 Styling

The project uses Tailwind CSS with custom design tokens:
- **Primary Color**: Professional red
- **Secondary/Success**: Green
- **Accent**: Deep blue
- Custom gradients, shadows, and utilities

Global styles are defined in `src/index.css` and imported via `app/globals.css`.

## 🔐 Authentication

Authentication is handled by Supabase Auth:
- Email/password authentication
- Session management via middleware
- Protected routes for admin and seller portals
- User roles and permissions

## 🛣️ Routing

The project uses a hybrid routing approach:
- **Next.js App Router**: New routes in `app/` directory
- **React Router**: Legacy routes in `src/pages/` (being migrated)

## 📦 Key Dependencies

- `next` - Next.js framework
- `react` & `react-dom` - React library
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Supabase SSR helpers (replaces deprecated auth-helpers)
- `@tanstack/react-query` - Data fetching and caching
- `react-router-dom` - Client-side routing
- `tailwindcss` - Utility-first CSS
- `zustand` - State management
- `sonner` - Toast notifications
- `lucide-react` - Icon library

## 🚀 Deployment

### Vercel (Recommended)

1. Push your repository to GitHub/GitLab/Bitbucket
2. Import the repository into Vercel
3. Set environment variables in Vercel dashboard
4. Deploy - Vercel will auto-detect Next.js

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Notes

- The project is in a hybrid state with both Next.js App Router and React Router
- Migration from React Router to Next.js App Router is ongoing
- Some pages still use React Router (`src/pages/`)
- New features should use Next.js App Router (`app/`)

## 🔄 Migration Status

- ✅ Next.js App Router setup
- ✅ Supabase integration
- ✅ Authentication system
- ✅ Basic pages migrated
- 🔄 Remaining pages migration in progress

## 📄 License

Proprietary — All rights reserved.
