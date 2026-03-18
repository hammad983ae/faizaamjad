import Link from "next/link";
import Logo from "@/images/Logo.png";

const QUICK_LINKS = [
  { label: "New Arrivals", href: "/products?category=new-arrivals" },
  { label: "Collections", href: "/products" },
  { label: "Wedding Edit", href: "/products?category=wedding-formal-dresses" },
  { label: "Luxury Pret", href: "/products?category=embroidered-pret" },
  { label: "Modern Cuts", href: "/products?category=bridal-wear" },
];

const CUSTOMER_CARE_LINKS = [
  { label: "Shipping Policy", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
  { label: "Order Tracking", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-primary/10">

      {/* Newsletter Section */}
      <div className="border-b border-primary/5">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-bold mb-2">Join the Inner Circle</h3>
            <p className="text-slate-500 text-sm">
              Subscribe to receive updates on new collections, exclusive events, and seasonal sales.
            </p>
          </div>
          <div className="w-full max-w-md">
            <form className="flex gap-2">
              <input
                className="flex-1 bg-background-light border-none focus:ring-1 focus:ring-primary rounded-lg px-4 py-3 text-sm outline-none"
                placeholder="Enter your email address"
                type="email"
              />
              <button
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold text-sm transition-colors uppercase tracking-wider"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Story */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/">
                <img src={Logo.src} alt="Faiza Amjad Logo" className="h-12 w-auto object-contain" />
              </Link>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Faiza Amjad is a high-end fashion house known for its exquisite craftsmanship,
              intricate embroideries, and timeless silhouettes. We celebrate the modern woman
              through designs that blend traditional artistry with contemporary elegance.
            </p>
            <div className="flex gap-4">
              {[
                { icon: "public", label: "Website", url: "https://faizaamjadstudio.com" },
                { icon: "photo_camera", label: "Instagram", url: "https://instagram.com/faiza_amjad_official" },
                { icon: "groups", label: "Facebook", url: "https://facebook.com/faizaamjadofficial" },
              ].map(({ icon, label, url }) => (
                <a
                  key={icon}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    className={`text-slate-500 hover:text-primary text-sm transition-colors${label === "Sale" ? " font-semibold" : ""}`}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">
              Customer Care
            </h4>
            <ul className="space-y-4">
              {CUSTOMER_CARE_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link className="text-slate-500 hover:text-primary text-sm transition-colors" href={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <a
                    className="text-sm text-slate-600 hover:text-primary"
                    href="mailto:support@faizaamjad.com"
                  >
                    support@faizaamjad.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">call</span>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">WhatsApp</p>
                  <a
                    className="text-sm text-slate-600 hover:text-primary"
                    href="tel:+923071763763"
                  >
                    0307 1763763
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Head Office</p>
                  <p className="text-sm text-slate-600">88-T, Habib Metro Bank Basement, 2 Lalak Jan Chowk, Sector T DHA Phase 3, Lahore</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-background-light py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-xs tracking-wide">
            © 2026 Faiza Amjad. All Rights Reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center gap-6 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all">
            {[
              { icon: "credit_card", label: "Visa" },
              { icon: "payments", label: "Mastercard" },
              { icon: "account_balance_wallet", label: "Paypal" },
              { icon: "local_shipping", label: "COD" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[24px]">{icon}</span>
                <span className="text-[8px] uppercase font-bold mt-1">{label}</span>
              </div>
            ))}
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <span className="material-symbols-outlined text-[16px]">language</span>
            <span>Pakistan | English</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
