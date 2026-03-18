"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Logo from "@/images/Logo.png";




const SEARCH_CATEGORIES = ["New Arrivals", "Ready-to-Wear", "Chiffon Edit"];

export interface HeaderCategory {
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
}

export default function Header({ categories = [] }: { categories?: HeaderCategory[] }) {
  const { totalItems, openDrawer } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch search results when query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-primary text-white text-[10px] uppercase tracking-[0.2em] py-2 text-center font-medium">
        Complimentary Shipping on all Domestic Orders
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/">
              <img src={Logo.src} alt="Faiza Amjad Logo" className="h-12 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 h-full">

            {/* Collections with Mega Menu */}
            <div className="group h-full flex items-center relative">
              <Link
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors flex items-center gap-1"
                href="/products"
              >
                Collections
                <span className="material-symbols-outlined text-sm leading-none">expand_more</span>
              </Link>

              {/* Mega Menu */}
              <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full pt-0 w-max">
                <div className="bg-white shadow-2xl border-t border-primary/5 rounded-b-xl overflow-hidden mt-0" style={{ width: "780px" }}>
                  <div className="grid grid-cols-12 gap-0">

                    {/* Sidebar — populated from WP_CATEGORIES (TODO: fetch from WordPress) */}
                    <div className="col-span-3 bg-slate-50 p-8 border-r border-slate-100">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-6">
                        Explore All
                      </h3>
                      <ul className="space-y-4">
                        {categories.slice(0, 8).map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              className="text-base font-display hover:text-primary block"
                              href={`/products?category=${cat.slug}`}
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Category Grid */}
                    <div className="col-span-6 p-8 grid grid-cols-2 gap-4">
                      {categories.slice(0, 4).map((cat, idx) => {
                        const icon = ["wb_sunny", "celebration", "eco", "diamond"][idx % 4];
                        return (
                          <Link
                            key={cat.slug}
                            className="flex gap-4 items-start p-3 rounded-xl hover:bg-primary/5 transition-all"
                            href={`/products?category=${cat.slug}`}
                          >
                            <div className="bg-primary/10 text-primary p-2 rounded-lg shrink-0">
                              <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">{cat.name}</h4>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {cat.description || "Explore this beautifully crafted collection."}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Featured */}
                    <div className="col-span-3 p-8 bg-slate-50 flex flex-col">
                      <div className="aspect-[4/5] rounded-lg overflow-hidden relative mb-4 group/img">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/img:scale-110"
                          style={{
                            backgroundImage:
                              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBViRMCva6BfrqjpRtebz5HgZUVjXXhr57U5LJLD5y0r64JA0U3TNTYUlQpQHRp14GjvA8it6Jwm7KimZTqn9JKbScwVNc35R3Pu2c03z4St7kicLKPUqaFwxNaquGdNUS-kx85kDpx8qGvrgBOPEf1iI0jVNRgAptPQa6xmu4EcnrCfAaFT_5VK-IIYMJwkBAypWg-nALFgGvhRHi4fXx7CUGCZ8pgsqXlBoDiQK0v6PYYLHCN93C8o_QUaxhP13DIQ9VjmsoUUeUw')",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">
                            New Release
                          </p>
                          <h5 className="text-white font-display text-lg">Bridal Couture &apos;24</h5>
                        </div>
                      </div>
                      <Link
                        href="/products?category=bridal"
                        className="w-full bg-primary text-white py-3 rounded-lg text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors text-center"
                      >
                        Explore the Lookbook
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            <Link className="text-sm font-medium tracking-wide hover:text-primary transition-colors" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium tracking-wide hover:text-primary transition-colors" href="/contact">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Search (Desktop) */}
            <div
              ref={searchRef}
              className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-48 lg:w-64 focus-within:ring-1 focus-within:ring-primary/50 transition-all relative"
            >
              <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
              <input
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 ml-1"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
              />

              {/* Search Results Dropdown */}
              {searchOpen && (
                <div className="absolute top-full left-0 mt-3 bg-white shadow-2xl rounded-xl border border-slate-100 overflow-hidden z-60"
                  style={{ width: "350px" }}>
                  <div className="p-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                      {searchQuery ? "Search Results" : "Top Results"}
                    </h3>
                    <div className="space-y-4">
                      {isSearching ? (
                        <p className="text-xs text-slate-500 py-2">Loading...</p>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((result) => (
                          <Link
                            key={result.id}
                            className="flex gap-3 items-center group/item"
                            href={`/products/${result.slug}`}
                            onClick={() => setSearchOpen(false)}
                          >
                            <div className="size-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                              <img
                                alt={result.name}
                                className="w-full h-full object-cover"
                                src={result.image}
                              />
                            </div>
                            <div>
                              <h4 className="font-display text-sm font-medium group-hover/item:text-primary transition-colors line-clamp-1">
                                {result.name}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">{result.price}</p>
                            </div>
                          </Link>
                        ))
                      ) : searchQuery ? (
                        <p className="text-xs text-slate-500 py-2">No products found.</p>
                      ) : (
                        <p className="text-xs text-slate-500 py-2">Type to start searching...</p>
                      )}
                    </div>

                    <hr className="my-4 border-slate-100" />

                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                      Popular Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 5).map((cat) => (
                        <Link
                          key={cat.slug}
                          className="px-3 py-1.5 bg-slate-50 rounded-full text-[11px] font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                          href={`/products?category=${cat.slug}`}
                          onClick={() => setSearchOpen(false)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    className="block w-full bg-slate-50 py-3 text-center text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors border-t border-slate-100"
                    href={`/products${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    View All Results
                  </Link>
                </div>
              )}
            </div>

            {/* Icon Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700">
                <span className="material-symbols-outlined">person</span>
              </button>
              <button className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700 relative">
                <span className="material-symbols-outlined">favorite</span>
                <span className="absolute top-1 right-1 size-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
              <button
                onClick={openDrawer}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700 relative"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 size-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="material-symbols-outlined">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white">
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
              <div>
                <button
                  className="flex items-center justify-between w-full hover:text-primary transition-colors pr-2"
                  onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
                >
                  Collections
                  <span className={`material-symbols-outlined transition-transform ${mobileCollectionsOpen ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </button>
                {mobileCollectionsOpen && (
                  <div className="mt-4 pl-4 space-y-4 border-l-2 border-primary/10">
                    <Link
                      className="block text-slate-600 hover:text-primary transition-colors"
                      href="/products"
                      onClick={() => { setMobileMenuOpen(false); setMobileCollectionsOpen(false); }}
                    >
                      View All
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        className="block text-slate-600 hover:text-primary transition-colors"
                        href={`/products?category=${cat.slug}`}
                        onClick={() => { setMobileMenuOpen(false); setMobileCollectionsOpen(false); }}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                className="hover:text-primary transition-colors"
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {/* Mobile Search */}
              <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 mt-2">
                <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                <input
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 ml-1"
                  placeholder="Search..."
                  type="text"
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
