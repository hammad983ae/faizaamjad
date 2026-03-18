export interface Product {
  id: string;
  slug?: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  description?: string;
  category?: string;
  badge?: string;
}
