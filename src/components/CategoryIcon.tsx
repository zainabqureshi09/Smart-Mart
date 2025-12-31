import { Cookie, Candy, Sandwich, Coffee, Snowflake, ShoppingBasket, Sparkles, Home, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Cookie,
  Candy,
  Sandwich,
  Coffee,
  Snowflake,
  ShoppingBasket,
  Sparkles,
  Home,
};

interface CategoryIconProps {
  icon: string;
  className?: string;
}

export function CategoryIcon({ icon, className = "h-5 w-5" }: CategoryIconProps) {
  const IconComponent = iconMap[icon];
  
  if (!IconComponent) {
    return <ShoppingBasket className={className} />;
  }
  
  return <IconComponent className={className} />;
}