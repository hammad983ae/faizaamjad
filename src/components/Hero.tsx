import heroBg from "@/images/passu-eastern-collection-image.webp";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full aspect-[16/9] md:h-[85vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroBg.src}')`,
        }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h2 className="font-display text-white text-4xl md:text-7xl mb-4 tracking-tight">
          Luxury Unstitched
        </h2>
        <p className="text-white text-xs md:text-sm uppercase tracking-[0.3em] mb-8">
          Spring / Summer Collection &apos;26
        </p>
        <Link
          className="bg-white text-slate-900 px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all duration-300"
          href="/products"
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}
