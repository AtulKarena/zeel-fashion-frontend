export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Privacy Policy
        </p>
        <h1 className="text-3xl md:text-4xl">Your privacy at Zeel Fashion</h1>
        <p className="text-sm text-black/60">
          We respect your privacy and handle your information with care. This
          policy explains what we collect, how we use it, and the choices you
          have.
        </p>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Information we collect</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
          <li>Contact details like name, email, and phone number.</li>
          <li>Order and purchase history to support your requests.</li>
          <li>Messages you send through our contact form.</li>
        </ul>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">How we use your data</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
          <li>To process inquiries, fittings, or store pickup coordination.</li>
          <li>To improve product selection and in-store experience.</li>
          <li>To share updates you&apos;ve opted into (you can unsubscribe anytime).</li>
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Your choices</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-black/60">
            <li>Request access to the information we hold about you.</li>
            <li>Ask us to correct or delete your details.</li>
            <li>Opt out of marketing messages at any time.</li>
          </ul>
        </div>
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Data security</h2>
          <p className="mt-4 text-sm text-black/60">
            We use reasonable safeguards to protect your information, but no
            system is 100% secure. Please contact us if you have concerns.
          </p>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Contact us</h2>
        <p className="mt-2 text-sm text-black/60">
          Email us at hello@zeelfashion.lk or visit our store for privacy
          questions.
        </p>
      </div>
    </div>
  );
}
