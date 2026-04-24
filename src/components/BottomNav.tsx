"use client";

import Link from "next/link";

const items = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-2 text-xs font-medium shadow-lg backdrop-blur md:hidden"
      aria-label="Mobile Navigation"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
