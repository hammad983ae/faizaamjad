const STORY_IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeuuFWb3WnLYOXghyMMD3aUJtLCu86sVE3BJEE98_JVNxQvqAzO56ppmRPcoNoLgoHW2tUf04zz7QeAGxk0G-tPKC3th53reLRtXzVjlwmCvKYfl3aCUm6nAZmch9AMtvjPcnOO2OIKixF9pFHku6X73az7Y5MTZ949A7Oxh7RG6VSz9QLYAlAqzXWI6_XQK4t7AW2madA2FQTyAo_Dfr-G2TKVhBaedojG8Or1nj359WqHupHe7Qo9bSNy-sh2T-xUTl5Iux2SQLg",
    label: "The Inception",
    caption: "Reviving the lost art of the Tukri work.",
    offset: false,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbcnlSkbJ-f7jya5WYgWcmqoemNHRj0ZoLjbHK2g_pUtDPfDs39FzQmghfVYFvNqBRohB9tnnJoRF7VcBv-xGI8TV5QuOyjLadwhNreC3mUyTEggdUB1iyuTNCpS8bDiVYCsxPKfoSPZpGmw6eEQLPgQs0HDaFYQc3iOrxoWfypA6Wgi89cds4AunNjLx4GbUSe_Z2OXn38rUgGaenJ4ZEH5R0UqeZxgDSGe3kVR0qGeSqzFqGzC-zE-RhZdkNm2LEweUkgKxS0kLf",
    label: "The Evolution",
    caption: "Mastering the craft of hand-block printing.",
    offset: true,
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTIMPsYHOyQAJOwJddtATnNxehOy-bdjMBbYeOE0CS9QWHY3GeQEBG3Ut4FVE7llMhxnMVewRz35Vea0g_l8CHx9cLXdg2Pj-z7bpiXoAYJBwxlvbE4Bn6SBmqWW3r_XeKL2t6FlGAHFKNaj-zvqQw0dyTZXhZuEq5-ztpP9x_tVR6OV9L1pguDwJZUh8ju09qcLqmhFrfFqV7Y-PQUsyDMojJvwFKpcNUBGH4mYzzYZ8-YvfF4APfWsCYE7CZMInqqXBdaYxc04LQ",
    label: "The Vision",
    caption: "Bridging the gap between heritage and modern luxury.",
    offset: false,
  },
];

const PHILOSOPHY = [
  {
    title: "Sustainability",
    body: "Our commitment to slow fashion means we focus on quality over quantity, creating pieces intended to last a lifetime and beyond.",
  },
  {
    title: "Inclusivity",
    body: "We celebrate the diverse beauty of women, designing silhouettes that honor every form with grace and sophistication.",
  },
  {
    title: "Innovation",
    body: "While rooted in tradition, we constantly push boundaries, integrating modern aesthetics with classical forms.",
  },
  {
    title: "Ethics",
    body: "Supporting the local artisan community is at the heart of our brand, providing fair wages and preserving local talent.",
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">

      {/* ── Hero ── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] w-full bg-primary/10 rounded-xl overflow-hidden shadow-2xl">
            <img
              className="w-full h-full object-cover"
              alt="Designer portrait in studio"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcl2re410wsWQlHDqfWk-gDguP5F0VEHXbxt2C8NTYO4RWX4VkfL4KNLaON4gcaTeygfjHUjCIGToFTwfaSHUzaQ-yXeXbuA5j0tC1lcSMvEHpzG5z8SnhtGIhebm7mFFJQFxNGyAMorF51I95MrZmF6ED4wa0uwJH-VoMy0fuARxJCPaZuZg2B-aTQBdIsz4W19anVC7y4uQNILwPdbkh5shcFzCOFndRdfvk05CrhSoKTCN-klCQRTQDMsoKv77uxxg0lCKRIY7U"
            />
          </div>
        </div>
        <div className="lg:col-span-5 space-y-8">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
            Est. 2005
          </span>
          <h2 className="text-5xl lg:text-7xl font-display leading-tight font-light">
            A Legacy of <br />
            <span className="italic">Craftsmanship</span>
          </h2>
          <p className="font-display text-lg leading-relaxed text-slate-700">
            Faiza Amjad has been a silent force in the world of luxury couture, driven by an
            unwavering commitment to the revival of traditional Pakistani crafts.
          </p>
          <div className="h-px w-24 bg-primary" />
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="mb-32">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-3xl font-display mb-6">The Brand Story</h3>
          <p className="text-lg leading-relaxed text-slate-600 font-light">
            Founded in 2005, the Faiza Amjad label is born out of a passion for the preservation
            of age-old techniques. What began as a small atelier focusing on fine embroideries has
            evolved into a global symbol of refined elegance. Each collection is a chapter in a
            long-standing narrative of cultural pride and artistic innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {STORY_IMAGES.map((item) => (
            <div
              key={item.label}
              className={`space-y-4 ${item.offset ? "translate-y-8" : ""}`}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-primary/5">
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt={item.label}
                  src={item.src}
                />
              </div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold">
                {item.label}
              </p>
              <p className="font-display text-sm italic text-slate-600">{item.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Craftsmanship & Heritage ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 bg-primary/5 -mx-6 lg:-mx-20 px-6 lg:px-20 py-24">
        <div className="order-2 lg:order-1 space-y-8">
          <h3 className="text-4xl font-display">
            Craftsmanship <br />& Heritage
          </h3>
          <div className="space-y-6 text-slate-700 font-display leading-relaxed">
            <p>
              We believe that fashion is a medium for storytelling. Our artisans, many of whom
              come from generations of master craftsmen, use techniques such as{" "}
              <span className="text-primary italic">zardozi</span>,{" "}
              <span className="text-primary italic">resham work</span>, and{" "}
              <span className="text-primary italic">vasli</span> to create pieces that are more
              than just garments—they are heirlooms.
            </p>
            <p>
              At Faiza Amjad, we don&apos;t just design clothes; we preserve a way of life.
              Every stitch is a tribute to the hands that made it, ensuring that the legacy of our
              ancestors continues to thrive in the modern world.
            </p>
          </div>
          <button className="px-8 py-3 bg-primary text-white font-bold rounded-lg uppercase tracking-widest text-xs hover:bg-primary/90 transition-all">
            Explore the Atelier
          </button>
        </div>

        <div className="order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-primary/10 rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Traditional needlework"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf_TONUwSyKCIA5JwRxZBZIOUQMzceScIFz4z6kXX4FgPtTRw8sWqjU4TwZUEcgXvd6v98jDeeQ5CVMR8rEhFDv1w_0Pafvepa2GyTY7_mESG20TImyTLoUbJSeL_53amPbOP6F56JDrwUKQmQRvXaMHCh9HJ6xHIUnKSsMK85a9f3LNpTu66WBGc_sHOv3xVpSdUVZoqGr2huv3c59zynd3EhjYIacPqYRBbFf3N9BMul0GUTbKQ-PHq3oci6FFBRn54lfLYkyiwe"
              />
            </div>
            <div className="aspect-[3/4] bg-primary/10 rounded-xl overflow-hidden mt-12">
              <img
                className="w-full h-full object-cover"
                alt="Vintage textile patterns"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8rCvZF2cYlbnsE53R2l2R4c1aiQCdkggM9BTBcB6aEbdyRd9_xr9XvB5qm3XgiyLCw6cifIdGQ4DCARWscCN83CbB_jsFa3AcAqJ76fuxsIPNezltkNhYN2B6jpXLWzVzncdnU1Q2uz8Ojv9aPgi9PU66tT1ZzjwPbWxuMRLu2pEiI3ZSji5_-WfDna8zWx0pVFLf1qChIVfy2h-Q9Da65l36q-gww5lP6_LHYTGlQeGm7AM08agQ-6m2PjDs2E1arA7aSSZ0WxZS"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Philosophy ── */}
      <section className="mb-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-5xl text-primary/40">
              auto_awesome
            </span>
            <h3 className="text-4xl font-display">Our Philosophy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PHILOSOPHY.map(({ title, body }) => (
              <div key={title} className="space-y-4">
                <h4 className="font-bold text-primary uppercase text-xs tracking-widest">
                  {title}
                </h4>
                <p className="font-display text-slate-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="rounded-2xl bg-background-dark text-slate-100 p-12 lg:p-20 text-center space-y-8 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10">
          <h3 className="text-3xl font-display italic mb-4">Join Our Journey</h3>
          <p className="max-w-lg mx-auto text-slate-400 mb-8">
            Subscribe to receive exclusive access to our newest collections and stories from the
            atelier.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-6 py-3 text-sm placeholder:text-slate-400 outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-lg transition-colors uppercase text-xs tracking-widest"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
