import { Action } from "@reduxjs/toolkit";
import { CartItem } from "./cart.types";

import { setCartItems, setIsCartOpen, setCartIconPulse } from "./cart.actions";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
  readonly canIconPulse: boolean;
}

export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
  canIconPulse: false,
}

export const cartReducer = (state = CART_INITIAL_STATE, action: Action): CartState => {
  if (setIsCartOpen.match(action)) 
    return { ...state, isCartOpen: action.payload }
  if (setCartIconPulse.match(action)) 
    return { ...state, canIconPulse: action.payload }
  if (setCartItems.match(action)) 
    return { ...state, cartItems: action.payload }
  return state;
}
