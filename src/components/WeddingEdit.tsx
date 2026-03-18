import Link from "next/link";

export default function WeddingEdit() {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden my-16 md:my-24">
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFYWlQLw6zud4F-6qbjzrxWnNA3buGRYhrbewtCZJNI37gA6aNlTv7fkcR7UGXmcifQZ-DIHm8P5VNrk6ZzDMyx2ftNN9aVl5N9NflpsFrZEWRAX56rOPoHxr4KPOaVvXUHOuolvB47zUGKdWCWGKDhJFjD8JnNAOJn5LHFw_z0AScCoFAYmvA-sslJ0R9wacnep8I0AR74j-BdjyOd_aBbRlb5oq5cL_JToW2ZY06n6CA2egBpe6sH1oyevnyUL83CGsCxpk3Y8km')",
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
        <p className="text-xs uppercase tracking-[0.5em] mb-4">Exquisite Craftsmanship</p>
        <h2 className="font-display text-5xl md:text-7xl mb-8">The Wedding Edit</h2>
        <Link
          className="border border-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-slate-900 transition-all duration-500"
          href="/products"
        >
          Explore The Atelier
        </Link>
      </div>
    </section>
  );
}
