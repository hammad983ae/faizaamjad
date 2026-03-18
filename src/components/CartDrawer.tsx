"use client";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

function formatPrice(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, subtotal, removeItem, updateQty } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-bold">Your Bag</h2>
            <span className="size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">
                shopping_bag
              </span>
              <p className="text-slate-500 text-sm">Your bag is empty</p>
              <button
                onClick={closeDrawer}
                className="text-xs font-bold uppercase tracking-widest text-primary underline underline-offset-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-4 bg-background-light rounded-xl"
              >
                {/* Image */}
                <div
                  className="w-20 aspect-[3/4] rounded-lg bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-sm">{item.name}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">Size: {item.size}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty stepper */}
                    <div className="flex items-center gap-2 bg-white rounded-lg px-1 py-0.5 border border-primary/10">
                      <button
                        onClick={() => updateQty(item.id, item.size, item.quantity - 1)}
                        className="size-6 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.size, item.quantity + 1)}
                        className="size-6 flex items-center justify-center rounded-full text-primary hover:bg-primary hover:text-white transition-all text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-[11px] text-slate-400 hover:text-primary flex items-center gap-0.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-primary/10 space-y-3 bg-white">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold text-lg">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Shipping & taxes calculated at checkout
            </p>

            <Link
              href="/cart"
              onClick={closeDrawer}
              className="block w-full py-3 border border-primary text-primary font-bold text-sm text-center rounded-lg hover:bg-primary/5 transition-colors uppercase tracking-widest"
            >
              View Full Cart
            </Link>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="w-full py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
