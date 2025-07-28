"use client";

import type { CartItem, Product } from "@/lib/types";
import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "SET_STATE"; payload: CartState };

const initialState: CartState = {
  items: [],
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  totalPrice: number;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { ...state, items: newItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "SET_STATE":
      return action.payload;
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedState = localStorage.getItem("cartState");
      if (storedState) {
        dispatch({ type: "SET_STATE", payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Could not load cart from local storage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cartState", JSON.stringify(state));
    } catch (error) {
      console.error("Could not save cart to local storage", error);
    }
  }, [state]);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const enhancedDispatch: React.Dispatch<CartAction> = (action) => {
    if (action.type === 'ADD_ITEM') {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (!existingItem) {
          toast({
              title: "Added to Cart",
              description: `${action.payload.name} has been added to your cart.`,
          });
        }
    }
    dispatch(action);
  };


  return (
    <CartContext.Provider value={{ state, dispatch: enhancedDispatch, itemCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
