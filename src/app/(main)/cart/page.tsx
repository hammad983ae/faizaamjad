"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

function fmt(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

const SHIPPING = 500;
const TAX_RATE = 0.015;

const RELATED = [
  {
    id: "summer-breeze",
    name: "Summer Breeze",
    price: "Rs. 32,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7nJGf41PzhmjqBHkBNNjccpH4i6_F2vmh-1pERPBVR3ruFBfss1h0ul5F21TJfmXWDg5XxEIL8LzQXnuvFMKV8q0Sj0si9cgZQeNAn4l6ax17cdQ-tXDCBdmI6p_7ieuc1YEZND5B539Mny9wysKwShIHdnj2dwd09dYL3SgKEfjpzgDjZb4vgPakDtGST3QZsLEdir4Z_CNutCz35Y6FDaR14puTcVCA_XqSXk6YDBC4qAZLcrNoMq8PcOKD7S4gQX9Vk3cAIQp5",
  },
  {
    id: "rose-gold-glow",
    name: "Rose Gold Glow",
    price: "Rs. 48,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBg76pf9U4clTLJWtwQNKYlipcpxhzo_5UD8oHgB-WFzqM9MeuT8bgG5JXF_9msklHkTV1XRsyCZNjRoI6c1J87poQlRvV1yNpu9sJb5K4HWZ89bAH_9GQUw_C1R0tpTXlKl6dXyBmIXCx5W8dQuIEWYd8kfBURuTkq9QYnWlemCUNKutowhzTng3GGL76ndUxXJh4HR9JaRoajyvd8B5RU8_kcJ7ZsXliURfYjM52LxMWnymKOcxRIS33361oHwcJms8TYu7fmOdsn",
  },
  {
    id: "midnight-sapphire",
    name: "Midnight Sapphire",
    price: "Rs. 55,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBp2flNSar9ltD3GFeWQrZ51R6fq8DN2iw9JUpEILL2qHvPlQJS5TLbk5MH1HsMpPi4rN1CwMniHKkvXRUJNbR2MCfQTWlcFFDz6nuuZhPvIFer3u9psmW2GzPhLJVq1x-CBZfHlAloyMWG_KlJjIG2iwJ8OF-Yq4KmIRLkSNT0cjj9qRqvPU2rjCdUuMhf4TPUnMf7Avc8dU4Xe85RFZnzWoaXzG2FUDm1ZIshgGejr_QeBzZCDJmatdSMgBz4bUR5NDKaH4LeWyY",
  },
  {
    id: "ivory-grace",
    name: "Ivory Grace",
    price: "Rs. 28,000",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmL0oDEwSc152txqTiL2c3oiPXopz_yKjsq12_p9Mw71d37p1G3dzsf4YndIFg468oaZ8c6m6BjQkJ1_s1bKfSAS72HQbwWO7L5jawqAvwne2Iunf3lT6uNxaSJXdNlI1ays63iJXRxS9xFEKTAWxQUK5LOXMjha6eDiySLj_oV-ONlEPBZ6EEl74pEAYDaKRXNaHgYFGBALTDJt8j3f5hdy936sefBjRBEqC4UfJw7JMDF3T247SVtl3QnJds_-dAvSI3mkKQs5BX",
  },
];

export default function CartPage() {
  const { items, subtotal, removeItem, updateQty } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING + taxes - discount;

  function applyDiscount() {
    if (discountCode.toUpperCase() === "FAIZA10") {
      setDiscount(Math.round(subtotal * 0.1));
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-20 py-8 w-full">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mb-8 text-sm font-medium">
        <Link href="/" className="text-primary/70 hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-primary/30 text-xs">chevron_right</span>
        <span className="text-slate-900">Shopping Cart</span>
      </nav>

      <h1 className="text-4xl font-display font-bold mb-10">Shopping Cart</h1>

      {items.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
          <span className="material-symbols-outlined text-7xl text-slate-200">shopping_bag</span>
          <h2 className="font-display text-2xl font-light">Your bag is empty</h2>
          <p className="text-slate-500 max-w-sm">
            Add some pieces from our latest collections to get started.
          </p>
          <Link
            href="/products"
            className="bg-primary text-white px-10 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-6 p-6 bg-white rounded-xl shadow-sm border border-primary/5"
              >
                {/* Image */}
                <div
                  className="aspect-[3/4] rounded-lg bg-cover bg-center w-24 md:w-32 shrink-0 shadow-inner"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-display font-bold">{item.name}</h3>
                      <p className="text-primary/60 text-sm mt-1">Size: {item.size}</p>
                    </div>
                    <p className="text-lg font-bold">{fmt(item.price * item.quantity)}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    {/* Qty stepper */}
                    <div className="flex items-center gap-3 bg-primary/5 rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                        className="size-8 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-all font-bold"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                        className="size-8 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-all font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="flex flex-col gap-6">
            <div className="p-8 bg-white rounded-xl shadow-lg border border-primary/10 sticky top-8">
              <h2 className="text-xl font-display font-bold mb-6 border-b border-primary/10 pb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary/70">Subtotal</span>
                  <span className="font-bold">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Estimated Shipping</span>
                  <span className="font-bold">{fmt(SHIPPING)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/70">Estimated Taxes</span>
                  <span className="font-bold">{fmt(taxes)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (FAIZA10)</span>
                    <span className="font-bold">−{fmt(discount)}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-primary/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-display font-bold">Total</span>
                  <span className="text-2xl font-display font-bold text-primary">{fmt(total)}</span>
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary/60 mb-2">
                    Discount Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 rounded-lg border border-primary/20 bg-primary/5 focus:border-primary focus:ring-primary text-sm px-3 py-2 outline-none"
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-primary transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Try: FAIZA10 for 10% off</p>
                </div>

                <Link href="/checkout" className="w-full py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mb-4 uppercase tracking-widest text-sm">
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>

                {/* Payment logos */}
                <div className="flex items-center justify-center gap-4 mt-6 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                  <img
                    alt="PayPal"
                    className="h-4"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtD-RjDiFleQACb4Xaeo6vMdLgcNiISIoaY0gxsjVAmlwRmMn_cZvLGJyoCs12bPRHgetSRVk7qYbHhZBGHVgElDu7LUGUgwVdIdqF4jy6op5aWAHrn_VT1Bv9blCUdRP7zGEJ3miFpXbFcfuION71AmlR6xWy6CwthtzRwt728jP_NRxxBKZo9Jhhn-xcWn8GRV9qzhbWfoklPBMIOJbvVJG-cudHDQHhU1UDnrsn4PQOdcsiwFkDlSjxivhez_LdnKOpV6MhHN48"
                  />
                  <img
                    alt="Visa"
                    className="h-3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbkeSo3uhsOn7yyTi2rB5zzUTiOaNGKtuoo6gE8gzpxs08PkeNuw2LgnzRHqksQWNwGCdt4gT4CLqJ15vjmtUiIWt3-RTt8EoPTO7enger8Qo2syp4-mwsdI2X6EaNwHxJaycNUBx3rrJJnbvgq-Ot4KD5vyWPtvZulHbWsdidaUPAuVASqT8Xhx5261unaK3Gh52F5Ual7ElLsS62vgULwtvJisLyeIiyAS9MUSetsTOa-2WuuiNGVCslIaHjddIN4KX42H5BuGU7"
                  />
                  <img
                    alt="Mastercard"
                    className="h-4"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBW2nhplAF0q7KtvttuJeWL6Kq_4iHbFNeNW7IE4po2hXEPIT2OsjUksWER__YL0jWbFe0awX_1IoS_JJiKEZRgZXk40vLAvFZIAXKRL-4nxRh1JoQLbsXSnyly4x19RjHvtzMJkFIl-RqJ-bllG2nJ_2WjsjRho39z9PGsFa7tbZCVTMvvGatlm82B6asFOrbobsWpZ29cZDKKbntmLH0TYbtK5-cr2joseYh2d4AHwXEmdBNzwvjSWks3GHKi5bLBfeLcEyfNBjpN"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── You May Also Like ── */}
      <section className="mt-24 border-t border-primary/10 pt-16 mb-20">
        <h2 className="text-2xl font-display font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {RELATED.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-primary/5 rounded-xl overflow-hidden mb-4">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-primary shadow-sm hover:bg-primary hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined text-sm">favorite</span>
                </button>
              </div>
              <h3 className="font-medium text-slate-900 mb-1 group-hover:text-primary transition-colors">
                {p.name}
              </h3>
              <p className="text-primary font-bold">{p.price}</p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
