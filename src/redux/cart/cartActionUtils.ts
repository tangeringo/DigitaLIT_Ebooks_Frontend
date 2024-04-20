import { BookItem } from "../library/libraryTypes";
import { CartItem } from "./cartTypes";


export const addCartItem = (cartItems: CartItem[], productToAdd: BookItem): CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
  
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};


export const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}
  
  
export const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
}