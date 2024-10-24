import { BookItem } from "../library/library.types";

export enum CartTypes {
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
    SET_CART_ICON_PULSE = 'cart/SET_CART_ICON_PULSE',
    SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
    SET_CART_COUNT = 'cart/SET_CART_COUNT'
}

export type CartItem = BookItem & {
    quantity: number;
}