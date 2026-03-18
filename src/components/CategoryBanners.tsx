import lunaImg from "@/images/al-harir-apparel-pret-collection-2023-gulzar-angoori-_3__1.webp";
import luxeImg from "@/images/tree-1-1-600x600.webp";
import Link from "next/link";

export default function CategoryBanners() {
  return (
    <section className="grid md:grid-cols-2 gap-4 px-4 pb-16">
      <Link href="/products?category=new-arrivals" className="relative aspect-square overflow-hidden group">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
          alt="Luna Eid Edit"
          src={lunaImg.src}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="font-display text-4xl mb-4 italic">Luna Eid Edit</h3>
          <span
            className="border-b border-white text-[10px] uppercase tracking-widest pb-1 hover:text-primary hover:border-primary transition-all"
          >
            Shop The Edit
          </span>
        </div>
      </Link>
      <Link href="/products?category=embroidered-pret" className="relative aspect-square overflow-hidden group">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
          alt="Luxe Pret"
          src={luxeImg.src}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="font-display text-4xl mb-4 italic">Luxe Pret</h3>
          <span
            className="border-b border-white text-[10px] uppercase tracking-widest pb-1 hover:text-primary hover:border-primary transition-all"
          >
            Discover More
          </span>
        </div>
      </Link>
    </section>
  );
}
