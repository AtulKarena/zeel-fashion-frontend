"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/app/(auth)/_services/auth-hooks";
import Image from "next/image";
import { CircleUser } from "lucide-react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { data: user, isLoading } = useUser();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="bg-black text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-2 text-xs tracking-[0.25em]">
            Wholesale-sourced style, curated for you
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-56 relative ">
              <Image
                alt="Zeel Fashion"
                src={"/site_logo.png"}
                width={100}
                height={100}
                className="w-full object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-black/70 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* <Link
            href="/shop"
            className="hidden rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black/30 hover:bg-black/5 md:inline-flex"
          >
            Explore
          </Link> */}

            {user ? (
              <>
                <Link
                  href="/account"
                  className="hidden md:inline-flex rounded-full border border-black/10 px-2 py-2 text-sm font-medium hover:bg-black/5"
                >
                  <span data-tooltip-id="tooltip" data-tooltip-content="Account">
                    <CircleUser />
                  </span>
                </Link>

                <Tooltip border={10} place="bottom" id="tooltip" />
              </>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                Login
              </Link>
            )}

            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Cart
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">
                {itemCount}
              </span>
            </Link>
            <button
              className="inline-flex items-center rounded-full border border-black/10 px-3 py-2 text-sm font-medium md:hidden"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              Menu
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-black/5 bg-white px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 transition hover:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
