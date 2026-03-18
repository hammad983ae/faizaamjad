"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

interface FormState {
  email: string;
  newsletter: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apt: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  shipping: "standard" | "express";
  discountCode: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<FormState>({
    email: "",
    newsletter: false,
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    country: "Pakistan",
    postalCode: "",
    phone: "",
    shipping: "standard",
    discountCode: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const shippingCost = form.shipping === "standard" ? 500 : 1200;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + shippingCost + taxes;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [target.name]: target.checked }));
    } else if (target instanceof HTMLInputElement && target.type === "radio") {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    } else {
      setForm((prev) => ({ ...prev, [target.name]: target.value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, items })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to place order.");
      }

      clearCart();
      setSubmitted(true);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background-light flex flex-col">
        {/* Minimal Header */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <svg className="size-7" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              Faiza Amjad
            </span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">check_circle</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
            <p className="text-slate-500 text-sm mb-6">
              Thank you, {form.firstName || "there"}! Your order has been placed and will be processed shortly.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-100 py-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="hover:text-slate-600 transition-colors">Refund Policy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            </div>
            <p>© 2025 Faiza Amjad. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Minimal Header */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <svg className="size-7" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">
              Faiza Amjad
            </span>
          </div>
          <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700 relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            {items.length > 0 && (
              <span className="absolute top-1 right-1 size-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ─── Left Column ─── */}
            <div className="flex-[1.5] flex flex-col gap-8">

              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm font-medium flex-wrap">
                <Link className="text-primary hover:underline" href="/cart">Cart</Link>
                <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
                <span className="text-slate-900 font-bold">Information</span>
                <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
                <span className="text-slate-400">Shipping</span>
                <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
                <span className="text-slate-400">Payment</span>
              </nav>

              {/* Contact Information */}
              <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-slate-900">Contact Information</h2>
                  <span className="text-xs text-slate-500">
                    Already have an account?{" "}
                    <a href="#" className="text-primary hover:underline font-medium">Log in</a>
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                  />
                  <label className="flex items-center gap-3 text-sm text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={form.newsletter}
                      onChange={handleChange}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    Keep me up to date on news and exclusive offers
                  </label>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-display text-lg font-bold text-slate-900">Shipping Address</h2>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className="rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                  />
                  <input
                    type="text"
                    name="apt"
                    value={form.apt}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    <select
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition appearance-none"
                    >
                      <option>Pakistan</option>
                      <option>United Arab Emirates</option>
                      <option>Saudi Arabia</option>
                      <option>United Kingdom</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      className="rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    <div />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone (optional)"
                    className="w-full rounded-lg border border-slate-200 bg-white p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                  />
                </div>
              </section>

              {/* Shipping Method */}
              <section className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-display text-lg font-bold text-slate-900">Shipping Method</h2>
                </div>
                <div className="p-6">
                  <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                    <label className="flex items-center justify-between p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={form.shipping === "standard"}
                          onChange={handleChange}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium">Standard Shipping (3–5 business days)</span>
                      </div>
                      <span className="text-sm font-bold">Rs. 500.00</span>
                    </label>
                    <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={form.shipping === "express"}
                          onChange={handleChange}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium">Express Shipping (1–2 business days)</span>
                      </div>
                      <span className="text-sm font-bold">Rs. 1,200.00</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Bottom bar */}
              <div className="flex items-center justify-between py-2">
                <Link
                  href="/cart"
                  className="flex items-center gap-1 text-sm text-slate-600 hover:text-primary transition-colors font-medium"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Return to cart
                </Link>
                {errorMsg && (
                  <p className="text-red-500 text-sm">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : "Complete Order"}
                </button>
              </div>
            </div>

            {/* ─── Right Column — Order Summary ─── */}
            <div className="lg:w-[380px] lg:sticky lg:top-8 self-start">
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h2 className="font-display text-lg font-bold text-slate-900">Order Summary</h2>
                </div>

                {/* Items */}
                <div className="p-6 flex flex-col gap-5">
                  {items.length === 0 ? (
                    <p className="text-sm text-slate-400 text-center py-4">Your cart is empty.</p>
                  ) : (
                    items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-20 h-24 rounded-lg bg-slate-100 overflow-visible flex-shrink-0">
                          <div className="w-full h-full rounded-lg overflow-hidden">
                            <img
                              className="w-full h-full object-cover"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center z-10">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-slate-900 truncate">{item.name}</h3>
                          <p className="text-xs text-slate-500 uppercase mt-0.5">Size: {item.size}</p>
                        </div>
                        <div className="flex items-center flex-shrink-0">
                          <span className="text-sm font-bold text-slate-900">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Discount Code */}
                <div className="px-6 pb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="discountCode"
                      value={form.discountCode}
                      onChange={handleChange}
                      placeholder="Discount code"
                      className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                    <button
                      type="button"
                      onClick={() => form.discountCode && setDiscountApplied(true)}
                      className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors whitespace-nowrap"
                    >
                      {discountApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {discountApplied && (
                    <p className="text-xs text-primary mt-2 font-medium">Discount code applied!</p>
                  )}
                </div>

                {/* Totals */}
                <div className="px-6 pb-6 flex flex-col gap-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-900">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Shipping</span>
                    <span className="text-slate-400 text-xs">
                      {form.shipping === "standard"
                        ? "Rs. 500.00 (Standard)"
                        : "Rs. 1,200.00 (Express)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Taxes (5%)</span>
                    <span className="font-medium text-slate-900">Rs. {taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="font-bold text-base text-slate-900">Total</span>
                    <span className="font-bold text-xl text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-slate-100 py-4 px-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact Us</a>
          </div>
          <p>© 2025 Faiza Amjad. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
