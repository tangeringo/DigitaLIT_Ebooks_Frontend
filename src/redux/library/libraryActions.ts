import { BookItem, LibraryTypes } from "./libraryTypes";
import { createAction, withMatcher, ActionWithPayload } from "../redux.utils";


export type selectedBookItem = ActionWithPayload<LibraryTypes.SET_SELECTED_CART_ITEM, BookItem>

export type SetOpenSideBar = ActionWithPayload<LibraryTypes.SET_OPEN_SIDE_BAR, boolean>

export const selectedBookItem = withMatcher((book: BookItem): selectedBookItem => 
    createAction(LibraryTypes.SET_SELECTED_CART_ITEM, book))

export const setSelectedBookItem = (book: BookItem) => {
    return selectedBookItem(book);
}

export const setOpenSideBar = withMatcher((bool: boolean) : SetOpenSideBar => (
    createAction(LibraryTypes.SET_OPEN_SIDE_BAR, bool)));