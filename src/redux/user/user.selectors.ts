import { createSelector } from "reselect";

import { UserState } from "./user.reducer";
import { RootState } from '../store';

export const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUserTokens = createSelector(
    selectUserReducer,
    (user) => user.userTokens);   