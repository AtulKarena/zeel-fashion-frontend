export type category =
  | "Menswear"
  | "Kidswear"
  | "Footwear"
  | "Belts"
  | "Tracksuits"
  | "Perfume";

export type ProductColor = {
  name: string;
};
export type Category = {
  _id: string;
  name: string;
  active: boolean;
};

export type Product = {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  category: Category; // 👈 populated
  sizes?: string[];
  colors?: string[];
  stock?: number;
  reservedStock?: number;
  images?: string[];
  ratings?: number;
  offer?: {
    label: string;
    percentOff: number;
  };
  createdAt: string;
  updatedAt: string;
};
/* export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  colors: string[];
  sizes: string[];
  offer?: {
    label: string;
    percentOff: number;
  };
}; */

export const productCategories: category[] = [
  "Menswear",
  "Kidswear",
  "Footwear",
  "Belts",
  "Tracksuits",
  "Perfume",
];

const menGallery = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
];

const kidsGallery = [
  "https://images.unsplash.com/photo-1503457574462-bd27054394c1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
];

const perfumeGallery = [
  "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
];

const beltGallery = [
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
];

const trackGallery = [
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
];

const shoesGallery = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
];

const commonOffer = { label: "Limited-time offer", percentOff: 15 };

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
};

export type ContactInformation = {
  name: string;
  email: string;
  phone: number;
};

export type ShippingAddress = {
  address: string;
  city: string;
  zip: number;
  country: string;
};

export type Order = {
  _id: string;
  userId?: string;

  orderItems: OrderItem[];

  contactInformation: ContactInformation;
  shippingAddress: ShippingAddress;

  totalPrice: number;

  isPaid: boolean;
  isDelivered: boolean;
  paymentId?: string | null;

  createdAt: string;
  updatedAt: string;
};

export type User = {
  name: string;
  email: string;
};

export type Payment = {
  _id: string;

  user: User;
  amount: number;
  currency?: string;

  paymentMethod: "card" | "upi" | "netbanking" | "cod";

  transactionId?: string;

  paymentStatus?: "pending" | "success" | "failed";

  paymentGateway?: string;

  createdAt?: Date;
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export type Inventory = {
  productId: string;
  name: string;
  price: number;
  stock: number;
  reserved: number;
  available: number;
  lowStock: number; // 🔥 useful for UI
};
