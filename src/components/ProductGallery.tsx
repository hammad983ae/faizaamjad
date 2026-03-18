"use client";

import { useState } from "react";

interface Props {
  images: string[];
  mainImage: string;
  productName: string;
}

export default function ProductGallery({ images, mainImage, productName }: Props) {
  const [active, setActive] = useState(0);
  const all = [mainImage, ...images.filter((i) => i !== mainImage)];

  return (
    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-4 md:pb-0">
        {all.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`min-w-[80px] w-20 md:w-full aspect-[3/4] rounded-lg border-2 bg-cover bg-center cursor-pointer transition-colors shrink-0 ${
              active === i
                ? "border-primary"
                : "border-primary/10 hover:border-primary/40"
            }`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div
          className="aspect-[3/4] w-full rounded-xl bg-cover bg-center shadow-sm transition-all duration-500"
          style={{ backgroundImage: `url('${all[active]}')` }}
          role="img"
          aria-label={productName}
        />
      </div>
    </div>
  );
}
