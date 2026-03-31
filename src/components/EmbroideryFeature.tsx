import img1 from "@/images/Hero.jpg";
import img2 from "@/images/Exclusive_Eastern_Lawn_Suit_Collection_2025_with_Embroidery_and_Dupatta.webp";

export default function EmbroideryFeature() {
  return (
    <section className="py-16 md:py-24 bg-[#FAF9F6]">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              alt="Trend Alert Lifestyle"
              className="w-full aspect-[4/5] object-cover"
              src={img1.src}
            />
            <div className="absolute -bottom-6 -right-6 hidden lg:block bg-white p-8 max-w-xs shadow-sm">
              <h5 className="font-display text-xl mb-3">Timeless Elegance</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                Our signature hand-crafted details meet contemporary silhouettes this season.
              </p>
              <a
                className="text-[10px] uppercase tracking-widest font-bold hover:text-primary transition-colors"
                href="#"
              >
                Read More
              </a>
            </div>
          </div>
          <div className="space-y-8 md:pl-12">
            <div className="space-y-4">
              <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold">
                Trend Alert
              </p>
              <h3 className="font-display text-4xl md:text-5xl leading-tight">
                The Art of Embroidery
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                Discover the intricate craftsmanship that defines every piece in our latest
                collection. From delicate zardozi to bold silk thread work, we celebrate the
                heritage of artisan design.
              </p>
            </div>
            <img
              alt="Trend Alert Lifestyle 2"
              className="w-full aspect-video object-cover"
              src={img2.src}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
