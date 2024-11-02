import { createSelector } from "reselect";

import { AuthState } from "./auth.reducer";
import { RootState } from '../store';

export const selectAuthReducer = (state: RootState): AuthState => state.auth

export const selectRememberMe = createSelector(
    selectAuthReducer,
    (auth) => auth.rememberMe
)