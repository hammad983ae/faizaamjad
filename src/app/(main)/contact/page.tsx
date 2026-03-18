import ContactForm from "@/components/ContactForm";

const LOCATIONS = [
  {
    label: "Lahore Studio & Head Office",
    address: ["88-T, Habib Metro Bank Basement,", "2 Lalak Jan Chowk, Sector T DHA Phase 3,", "Lahore, Pakistan"],
    phone: "0307 1763763",
  },
];

const HOURS = [
  { day: "Monday — Saturday", time: "11:00 AM — 8:00 PM", closed: false },
  { day: "Sunday", time: "Closed", closed: true },
];

const SOCIALS = [
  { icon: "brand_awareness", label: "Facebook" },
  { icon: "share", label: "Share" },
  { icon: "mail", label: "Email" },
];

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-20 py-16">

      {/* Hero */}
      <div className="mb-20 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-light mb-6 font-display italic text-slate-900">
          Get in Touch
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Experience the heritage of artisanal craftsmanship. Whether you are inquiring about a
          bridal consultation or need assistance with your order, our team is here to guide you.
        </p>
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

        {/* Contact Form */}
        <section>
          <ContactForm />
        </section>

        {/* Information Section */}
        <section className="flex flex-col gap-16">

          {/* Store Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {LOCATIONS.map((loc) => (
              <div key={loc.label}>
                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-6">
                  {loc.label}
                </h3>
                <p className="font-display text-lg leading-relaxed text-slate-700">
                  {loc.address.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < loc.address.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <p className="mt-4 text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">call</span>
                  {loc.phone}
                </p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="w-full h-64 bg-slate-200 rounded-lg relative overflow-hidden group">
            <img
              alt="Map location — Karachi flagship"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARPHLsHk7at2cvvUgH2qifCDLlXoaFCxYFN5sSNeeqRishbM-euUofo2NW3__7oOnC82-UiZBDvCrtuu0OWA5Yic4mpB6WCVw4vD1ZmvH4CB76BK-1rmUtauRdjTiZnQUz0kl5T3eEzdaYxOIe2BdNkGIio9mvDn-leIC3DFl0Dy3TODuPa2rxIsqAupLlradDXcnEvl5l-w6ggwZsL8RhGk2mMQRAiEalRf4smUwRn-TNWrK9ex1zmW6_Z4r7Qtkk2fnR-xwy_kI-"
              className="w-full h-full object-cover grayscale opacity-60 mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 px-6 py-3 border border-primary/20 backdrop-blur-sm hover:border-primary transition-colors"
              >
                <span className="text-xs uppercase tracking-widest font-bold text-slate-900">
                  View on Map
                </span>
              </a>
            </div>
          </div>

          {/* Concierge Hours */}
          <div className="border-t border-slate-200 pt-10">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-6">
              Concierge Hours
            </h3>
            <div className="flex flex-col gap-3">
              {HOURS.map(({ day, time, closed }) => (
                <div key={day} className="flex justify-between items-center max-w-xs">
                  <span className="text-slate-600">{day}</span>
                  <span className={closed ? "text-slate-400 italic" : "font-medium"}>
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-8 flex gap-6">
              {SOCIALS.map(({ icon, label }) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={label}
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </a>
              ))}
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
