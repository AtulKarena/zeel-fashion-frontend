import "./globals.css";
import { Manrope, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/cart-context";
import QueryProvider from "@/context/query-provider";
import { Toaster } from "sonner";
import { isUserLoggedIn } from "@/lib/auth";
import { AuthProvider } from "@/context/auth-context";
const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      
      <body>
        <QueryProvider>
          <AuthProvider>
            <CartProvider>
              <main>{children}</main>
            </CartProvider>
          </AuthProvider>
        </QueryProvider>
        <Toaster />
      </body>
      
    </html>
    
  );
}
