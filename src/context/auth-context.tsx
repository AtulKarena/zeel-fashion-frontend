"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { checkUserLoggedInAction } from "@/lib/getUser";
const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  checkoutToken: string | null;
  setCheckoutToken: (v: string | null) => void;
  paymentToken: string;
  setPaymentToken: (v: string) => void;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState<string | null>(null);
  const [paymentToken, setPaymentToken] = useState<string>("");

  useEffect(() => {
    checkUserLoggedInAction().then(setIsLoggedIn);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        checkoutToken,
        setCheckoutToken,
        paymentToken,
        setPaymentToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
