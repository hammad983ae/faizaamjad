"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

const SIZES = ["XS", "S", "M", "L", "XL"];

export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductOptions({ product }: { product: ProductData }) {
  const [selectedSize, setSelectedSize] = useState("S");
  const { addItem, openDrawer } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });
    openDrawer();
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      slug: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    });
    router.push("/checkout");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
        <button className="text-xs text-primary underline underline-offset-4 font-medium uppercase tracking-wider">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-6 py-2 rounded text-sm font-medium transition-all ${selectedSize === size
                ? "border-2 border-primary bg-primary/5 font-bold"
                : "border border-slate-200 hover:border-primary"
              }`}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-primary text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-background-dark text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:opacity-90 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
