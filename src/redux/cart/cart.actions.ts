import { BookItem } from "../library/library.types";
import { CartTypes, CartItem } from "./cart.types";

import { createAction, withMatcher, ActionWithPayload } from "../redux.utils";
import { addCartItem, removeCartItem, clearCartItem } from './cart.utils';



export type SetIsCartOpen = ActionWithPayload<CartTypes.SET_IS_CART_OPEN, boolean>

export type SetCartIconPulse = ActionWithPayload<CartTypes.SET_CART_ICON_PULSE, boolean>

export type SetCartItems = ActionWithPayload<CartTypes.SET_CART_ITEMS, CartItem[]>

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
    createAction(CartTypes.SET_CART_ITEMS, cartItems))


export const addItemToCart = (cartItems: CartItem[], product: BookItem) => {
    const newCartItems = addCartItem(cartItems, product);
    return setCartItems(newCartItems);
}


export const removeItemFromCart = (cartItems: CartItem[], product: CartItem) => {
    const newCartItems = removeCartItem(cartItems, product);
    return setCartItems(newCartItems);
}


export const clearItemFromCart = (cartItems: CartItem[], product: CartItem) => {
    const newCartItems = clearCartItem(cartItems, product);
    return setCartItems(newCartItems);
}


export const setIsCartOpen = withMatcher((bool: boolean) : SetIsCartOpen => (
    createAction(CartTypes.SET_IS_CART_OPEN, bool)));


export const setCartIconPulse = withMatcher((bool: boolean) : SetCartIconPulse => (
    createAction(CartTypes.SET_CART_ICON_PULSE, bool)));