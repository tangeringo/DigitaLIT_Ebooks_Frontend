import { createSelector } from 'reselect';

import { LibraryState } from './library.reducer';
import { RootState } from '../store';


const selectLibraryReducer = (state: RootState): LibraryState => state.library;

export const selectTargetBookItem = createSelector(
    [selectLibraryReducer],
    state => state.bookItem
)

export const selectIsSideBarOpen = createSelector(
    [selectLibraryReducer],
    state => state.isSideBarOpen
)