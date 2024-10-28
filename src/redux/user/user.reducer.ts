import { Action } from "@reduxjs/toolkit";
import { CurrentUserType } from '../../data/types/types.global';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';

export type UserState = {
    readonly currentUser: CurrentUserType | null;
    readonly isCurrentUserLoading: boolean;
    readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isCurrentUserLoading: false,
    error: null,
}


const updateTokens = (state: UserState, user: CurrentUserType): UserState => ({
    ...state,
    currentUser: {
        ...state.currentUser,
        id: user.id,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken || state.currentUser?.refreshToken
    }
});

export const userReducer = (state = USER_INITIAL_STATE, action: Action) => {

    if (signInSuccess.match(action))
        return updateTokens(state, action.payload);
    if (signUpSuccess.match(action))
        return updateTokens(state, action.payload);
    if (signOutSuccess.match(action))
        return { ...state, currentUser: null }
    if (
        signInFailure.match(action) ||
        signUpFailure.match(action) ||  
        signOutFailure.match(action)
    )
        return { ...state, error: action.payload }
    return state;
}