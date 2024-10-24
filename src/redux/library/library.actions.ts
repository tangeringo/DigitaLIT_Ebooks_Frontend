import { BookItem, LibraryTypes } from "./library.types";
import { createAction, withMatcher, ActionWithPayload } from "../redux.utils";


export type SelectedBookItem = ActionWithPayload<LibraryTypes.SET_SELECTED_CART_ITEM, BookItem>

export type SetOpenSideBar = ActionWithPayload<LibraryTypes.SET_OPEN_SIDE_BAR, boolean>

export const selectedBookItem = withMatcher((book: BookItem): SelectedBookItem => 
    createAction(LibraryTypes.SET_SELECTED_CART_ITEM, book))

export const setSelectedBookItem = (book: BookItem) => {
    return selectedBookItem(book);
}

export const setOpenSideBar = withMatcher((bool: boolean) : SetOpenSideBar => (
    createAction(LibraryTypes.SET_OPEN_SIDE_BAR, bool)));