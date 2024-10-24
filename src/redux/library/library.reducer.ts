import { Action } from "@reduxjs/toolkit";
import { BookItem, BookItemObject } from "./library.types";

import { selectedBookItem, setOpenSideBar } from "./library.actions";

export type LibraryState = {
    readonly bookItem: BookItem;
    readonly isSideBarOpen: boolean;
}

export const LIBRARY_INITIAL_STATE: LibraryState = {
    bookItem: BookItemObject,
    isSideBarOpen: false
}

export const libraryReducer = (state = LIBRARY_INITIAL_STATE, action: Action) => {
    if (setOpenSideBar.match(action)) 
        return { ...state, isSideBarOpen: action.payload }
    if (selectedBookItem.match(action))
        return { ...state, bookItem: action.payload }
    return state;
}