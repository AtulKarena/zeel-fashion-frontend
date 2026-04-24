import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.2fr_2fr]">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-56 relative">
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
          <p className="text-sm text-black/60">
            We curate premium men&apos;s and kidswear for the store floor.
            Expect refined essentials, sharp fits, and standout accessories.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition hover:border-black/30"
            >
              Contact
            </Link>
            <Link
              href="/shop"
              className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop arrivals
            </Link>
          </div>
        </div>

        <div className="grid gap-6 text-sm md:grid-cols-3">
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-black">Shop</h5>
            <div className="mt-3 grid gap-2">
              <Link
                href="/shop?category=Men"
                className="text-black/60 transition hover:text-black"
              >
                Men&apos;s clothing
              </Link>
              <Link
                href="/shop?category=Kids"
                className="text-black/60 transition hover:text-black"
              >
                Kids&apos; clothing
              </Link>
              <Link
                href="/shop?category=Perfumes"
                className="text-black/60 transition hover:text-black"
              >
                Perfumes
              </Link>
              <Link
                href="/shop?category=Belts"
                className="text-black/60 transition hover:text-black"
              >
                Belts
              </Link>
              <Link
                href="/shop?category=Tracksuits"
                className="text-black/60 transition hover:text-black"
              >
                Tracksuits
              </Link>
              <Link
                href="/shop?category=Shoes"
                className="text-black/60 transition hover:text-black"
              >
                Shoes
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-black">Support</h5>
            <div className="mt-3 grid gap-2">
              <Link
                href="/support/shipping"
                className="text-black/60 transition hover:text-black"
              >
                Shipping & pickup
              </Link>
              <Link
                href="/support/returns"
                className="text-black/60 transition hover:text-black"
              >
                Return policy
              </Link>
              <Link
                href="/support/size-guide"
                className="text-black/60 transition hover:text-black"
              >
                Size guidance
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-black">Visit</h5>
            <div className="mt-3 grid gap-2">
              <p className="text-black/60">Liberty Plaza, Colombo</p>
              <p className="text-black/60">Daily 9:00 AM - 9:00 PM</p>
              <p className="text-black/60">+94 11 555 2424</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 px-6 py-6 text-xs text-black/50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <span>Copyright {new Date().getFullYear()} Zeel Fashion.</span>
          <span className="flex flex-wrap items-center gap-2">
            <Link href="/privacy" className="transition hover:text-black">
              Privacy Policy
            </Link>
            <span aria-hidden="true">�</span>
            <Link
              href="/support/returns"
              className="transition hover:text-black"
            >
              Terms
            </Link>
            <span aria-hidden="true">�</span>
            <Link
              href="/support/returns"
              className="transition hover:text-black"
            >
              Accessibility
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
