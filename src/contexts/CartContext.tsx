"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; id: string; size: string }
  | { type: "UPDATE_QTY"; id: string; size: string; quantity: number }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = (i: CartItem) => `${i.id}-${i.size}`;
      const exists = state.items.find((i) => key(i) === key(action.item));
      const items = exists
        ? state.items.map((i) =>
          key(i) === key(action.item) ? { ...i, quantity: i.quantity + action.item.quantity } : i
        )
        : [...state.items, action.item];
      return { ...state, items };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => !(i.id === action.id && i.size === action.size)),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id && i.size === action.size
            ? { ...i, quantity: Math.max(1, action.quantity) }
            : i
        ),
      };
    case "OPEN_DRAWER":
      return { ...state, drawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, drawerOpen: false };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const INITIAL_ITEMS: CartItem[] = [];

interface CartContextValue {
  items: CartItem[];
  drawerOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, quantity: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: INITIAL_ITEMS,
    drawerOpen: false,
  });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        drawerOpen: state.drawerOpen,
        totalItems,
        subtotal,
        addItem: (item) => dispatch({ type: "ADD_ITEM", item }),
        removeItem: (id, size) => dispatch({ type: "REMOVE_ITEM", id, size }),
        updateQty: (id, size, quantity) => dispatch({ type: "UPDATE_QTY", id, size, quantity }),
        openDrawer: () => dispatch({ type: "OPEN_DRAWER" }),
        closeDrawer: () => dispatch({ type: "CLOSE_DRAWER" }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
