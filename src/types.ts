export interface Product {
  id: string;
  name: string;
  category: 'iPhone' | 'Android' | 'Laptops' | 'Starlink' | 'Accessories';
  price: number; // default display price
  priceBrandNew?: number;
  priceUKUsed?: number;
  description: string;
  subTitle?: string;
  image: string;
  imagesList?: string[];
  storageOptions?: string[];
  condition: 'Brand New' | 'UK Used' | 'Both';
  badge?: string;
  gradeBadge?: string;
  colorOptions?: { name: string; class: string }[];
  specs?: {
    display?: string;
    camera?: string;
    battery?: string;
    processor?: string;
  };
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  condition: 'Brand New' | 'UK Used';
  storage: string;
  image: string;
}

export interface RepairQuote {
  model: string;
  issueType: string;
  message: string;
  estimate: number;
  date: string;
  bookingId: string;
}
