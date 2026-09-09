export type Category = "man" | "woman";
export type Subcategory = "underwear" | "t-shirt";
export type ProductSize = "S" | "M" | "L" | "XL" | "XXL" | "3XL" | "4XL";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory: Subcategory;
  price: number;
  mrp: number; // original price, for discount display
  images: string[];
  sizes: ProductSize[];
  colors?: string[];
  isNew?: boolean;
  description: string;
  createdAt: string; // ISO date, used for New Arrival sorting
  printName?: string;
  productType?: string; // e.g., "Trunks", "Boxer Briefs", "Classic Crew Tee", "Bikini Brief", "Boy Shorts", "Lounge Tee"
  badge?: string; // e.g. "Bestseller", "Shark Tank Deal", "Staff Pick", "Limited"
  rating?: number;
  reviewsCount?: number;
  fabricDetails?: string;
  features?: string[];
  inStock?: boolean;
  bgPastel?: string; // e.g. "#FFF3EA", "#E6F7F2", "#F3E8FF", "#FEF9C3"
}

export interface CartItem {
  id: string; // unique item id composed of product id + size + color + bundle
  productId: string;
  product: Product;
  size: ProductSize;
  color?: string;
  quantity: number;
  price: number;
  bundleName?: string;
  boxCount?: number;
}

export interface FilterState {
  category?: Category | 'all';
  subcategory?: Subcategory | 'all';
  sizes: ProductSize[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
  searchQuery: string;
  productType?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  verified: boolean;
  quote: string;
  rating: number;
  productName: string;
  productSlug: string;
  avatar: string;
  location: string;
}
