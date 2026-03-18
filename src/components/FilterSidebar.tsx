"use client";

import { useState, useEffect } from "react";

export interface Category {
  name: string;
  slug: string;
  count: number;
}

interface Props {
  onClose?: () => void;
  categories?: Category[];
  initialSelected?: string[];
  initialMinPrice?: string;
  initialMaxPrice?: string;
  onApply?: (selectedCategories: string[], minPrice: string, maxPrice: string) => void;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function FilterSidebar({
  onClose,
  categories = [],
  initialSelected = [],
  initialMinPrice = "",
  initialMaxPrice = "",
  onApply
}: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelected);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["S"]);
  const [sizeOpen, setSizeOpen] = useState(false);

  useEffect(() => {
    setSelectedCategories(initialSelected);
  }, [initialSelected]);

  useEffect(() => {
    setMinPrice(initialMinPrice);
    setMaxPrice(initialMaxPrice);
  }, [initialMinPrice, initialMaxPrice]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function handleApply() {
    if (onApply) {
      onApply(selectedCategories, minPrice, maxPrice);
    }
    if (onClose) {
      onClose();
    }
  }

  function handleClear() {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setMinPrice("");
    setMaxPrice("");
    if (onApply) {
      onApply([], "", "");
    }
  }

  return (
    <aside className="w-64 flex-shrink-0 space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center justify-between">
          Categories
          <span className="material-symbols-outlined text-sm">remove</span>
        </h3>
        <div className="space-y-3">
          {categories.map(({ name, slug, count }) => (
            <label key={slug} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(slug)}
                onChange={() => toggleCategory(slug)}
                className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
              />
              <span className="text-sm group-hover:text-primary transition-colors">{name}</span>
              <span className="ml-auto text-xs text-slate-400">{count}</span>
            </label>
          ))}
          {categories.length === 0 && (
            <p className="text-xs text-slate-500">No categories found.</p>
          )}
        </div>
      </div>

      {/* Size */}
      <div className="pt-6 border-t border-slate-200">
        <button
          className="w-full font-bold text-sm uppercase tracking-wider mb-4 flex items-center justify-between"
          onClick={() => setSizeOpen(!sizeOpen)}
        >
          Size
          <span className="material-symbols-outlined text-sm">
            {sizeOpen ? "remove" : "add"}
          </span>
        </button>
        {sizeOpen && (
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`h-10 border rounded flex items-center justify-center text-xs transition-all ${selectedSizes.includes(size)
                  ? "border-primary text-primary"
                  : "border-slate-200 hover:border-primary hover:text-primary"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="pt-6 border-t border-slate-200">
        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center justify-between">
          Price Range (PKR)
          <span className="material-symbols-outlined text-sm">remove</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-slate-400">Min</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-slate-400">Max</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Any"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-8">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-slate-900 text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="w-full py-3 text-slate-500 text-xs font-medium mt-2"
        >
          Clear All
        </button>
      </div>
    </aside>
  );
}
