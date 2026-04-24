"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import {
  useAddToCart,
  useRemoveFromCart,
  useUpdateCartItemQuantity,
  useClearCart,
} from "@/components/_services/cart-hooks";
import { useAuth } from "./auth-context";
import API from "@/services/api";
import { toast } from "sonner";
type Category = {
  _id: string;
  name: string;
  active: boolean;
};

type Product = {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  category: Category; // 👈 populated
  sizes?: string[];
  colors?: string[];
  stock?: number;
  images?: string[];
  ratings?: number;
  offer?: {
    label: string;
    percentOff: number;
  };
  createdAt: string;
  updatedAt: string;
};

/* export type CartLine = {
  product: Product;
  quantity: number;
}; */
export type CartLine = {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setItems: (items: CartLine[]) => void;
};

type LocalCart = {
  items: CartLine[];
  isSyncedFromServer: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "zeel-fashion-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState<CartLine[]>([]);
  const addToCart = useAddToCart();
  const updateCartItemQuantity = useUpdateCartItemQuantity();
  const removeFromCart = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  useEffect(() => {
    if (!isLoggedIn) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      try {
        const parsed = JSON.parse(raw);

        if (parsed?.items) {
          setItems(parsed.items);
        } else if (Array.isArray(parsed)) {
          // backward compatibility
          setItems(parsed);
        }
      } catch {
        console.warn("Malformed cart data, clearing it.");
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      API.get("/cart", { withCredentials: true })
        .then(({ data }) => {
          setItems(data.data?.items || []);
        })
        .catch((error) => {
          console.error("Cart error:", error);
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      const existing = window.localStorage.getItem(STORAGE_KEY);

      let isSyncedFromServer = false;

      if (existing) {
        try {
          const parsed = JSON.parse(existing);
          isSyncedFromServer = parsed?.isSyncedFromServer ?? false;
        } catch {}
      }

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          isSyncedFromServer,
        }),
      );
    }
  }, [items, isLoggedIn]);

  /* useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]); */

  /* const addItem = async (product: Product) => {
    if (!isLoggedIn) {
      setItems((prev) => {
        const existing = prev.find((line) => line.product._id === product._id);
        if (existing) {
          return prev.map((line) =>
            line.product._id === product._id
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    } else {
      addToCart.mutate({
        productId: product._id,
        quantity: 1,
        size: product.sizes?.[0] || "",
        color: product.colors?.[0] || "",
      });
    }
  }; */
  const addItem = useCallback(
    (product: Product) => {
      const size = product.sizes?.[0] || "";
      const color = product.colors?.[0] || "";
      const price = getDiscountedPrice(product);
      if (!isLoggedIn) {
        setItems((prev) => {
          const existing = prev.find(
            (line) =>
              line.productId === product._id &&
              line.size === size &&
              line.color === color,
          );

          let updated;

          if (existing) {
            updated = prev.map((line) =>
              line.productId === product._id &&
              line.size === size &&
              line.color === color
                ? { ...line, quantity: line.quantity + 1 }
                : line,
            );
          } else {
            updated = [
              ...prev,
              { productId: product._id, quantity: 1, size, color, price },
            ];
          }

          // 🔥 mark as modified
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              items: updated,
              isSyncedFromServer: false,
            }),
          );

          return updated;
        });
      } else {
        setItems((prev) => {
          const existing = prev.find(
            (line) =>
              line.productId === product._id &&
              line.size === size &&
              line.color === color,
          );

          if (existing) {
            return prev.map((line) =>
              line.productId === product._id &&
              line.size === size &&
              line.color === color
                ? { ...line, quantity: line.quantity + 1 }
                : line,
            );
          }

          return [
            ...prev,
            { productId: product._id, quantity: 1, size, color, price },
          ];
        });

        addToCart.mutate({
          productId: product._id,
          quantity: 1,
          size,
          color,
          price,
        });
      }
    },
    [isLoggedIn, addToCart],
  );
  /* const removeItem = (id: string) => {
    setItems((prev) => prev.filter((line) => line.product._id !== id));
  }; */
  const removeItem = (id: string) => {
    if (!isLoggedIn) {
      const updated = items.filter((line) => line.productId !== id);

      setItems(updated);

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: updated,
          isSyncedFromServer: false,
        }),
      );
    } else {
      setItems((prev) => prev.filter((line) => line.productId !== id));
      removeFromCart.mutate(id);
    }
  };

  /*  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((line) => line.product._id !== id);
      }
      return prev.map((line) =>
        line.product._id === id ? { ...line, quantity } : line,
      );
    });
  }; */
  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!isLoggedIn) {
        setItems((prev) => {
          let updated;

          if (quantity <= 0) {
            updated = prev.filter((line) => line.productId !== id);
          } else {
            updated = prev.map((line) =>
              line.productId === id ? { ...line, quantity } : line,
            );
          }

          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              items: updated,
              isSyncedFromServer: false,
            }),
          );

          return updated;
        });
      } else {
        setItems((prev) => {
          if (quantity <= 0) {
            return prev.filter((line) => line.productId !== id);
          }

          return prev.map((line) =>
            line.productId === id ? { ...line, quantity } : line,
          );
        });
        updateCartItemQuantity.mutate({ productId: id, quantity });
      }
    },
    [isLoggedIn, updateCartItemQuantity],
  );

  const clearCart = () => {
    if (!isLoggedIn) {
      setItems([]);
    } else {
      clearCartMutation.mutate();
    }
  };

  const itemCount = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items],
  );

  const getDiscountedPrice = (product: Product) => {
    const price = product.price || 0;
    const percentOff = product.offer?.percentOff || 0;

    return price - (price * percentOff) / 100;
  };

  /*  const total = useMemo(
    () =>
      items.reduce(
        (sum, line) => sum + getDiscountedPrice(line.product) * line.quantity,
        0,
      ),
    [items],
  ); */
  const total = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [items],
  );
  const value = useMemo(
    () => ({
      items,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setItems,
    }),
    [items, itemCount, total, addItem, removeItem, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
