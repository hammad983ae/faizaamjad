import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group cursor-pointer block">
      <div className="aspect-[3/4] overflow-hidden bg-slate-100 mb-4">
        <img
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={product.image}
        />
      </div>
      <h4 className="text-[11px] uppercase tracking-widest font-bold mb-1 group-hover:text-primary transition-colors">
        {product.name}
      </h4>
      <p className="text-[11px] text-slate-500">{product.price}</p>
    </Link>
  );
}
