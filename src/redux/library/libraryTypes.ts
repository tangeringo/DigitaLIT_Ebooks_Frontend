export enum LibraryTypes {
    SET_SELECTED_CART_ITEM = 'cart/SET_SELECTED_CART_ITEM',
    SET_OPEN_SIDE_BAR = 'cart/SET_OPEN_SIDE_BAR'
}

export const BookItemObject = {
    id: 0,
    imgSource: "",
    name: "",
    price: 0,
    copyright: "",
    description: ""
}

export type BookItem = {
    id: number;
    imgSource: string;
    name: string;
    price: number;
    copyright: string;
    description: string;
}