import Link from "next/link";

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Support
        </p>
        <h1 className="text-3xl md:text-4xl">Size guidance</h1>
        <p className="text-sm text-black/60">
          Our team validates sizes before they reach the shop floor. Use the
          guide below for best fits.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Menswear</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
            <li>True to size with tailored silhouettes.</li>
            <li>Size up for relaxed fits or layering.</li>
            <li>Ask in-store for exact measurements.</li>
          </ul>
        </div>
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Kidswear</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
            <li>Comfort-forward fits with adjustable waistbands.</li>
            <li>Check age guidance alongside height in cm.</li>
            <li>We&apos;re happy to recommend the right size.</li>
          </ul>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Need a recommendation?</h2>
        <p className="mt-2 text-sm text-black/60">
          Book a fitting or send measurements and we&apos;ll suggest the right size.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
        >
          Get sizing help
        </Link>
      </div>
    </div>
  );
}
