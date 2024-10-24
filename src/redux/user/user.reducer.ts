import { Action } from "@reduxjs/toolkit";
import { TokenType } from '../../data/types/types.global';

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';

export type UserState = {
    readonly userTokens: TokenType | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
    userTokens: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = USER_INITIAL_STATE, action: Action) => {

    if (signInSuccess.match(action))
        return { ...state, userTokens: action.payload }
    if (signUpSuccess.match(action))
        return { ...state, userTokens: action.payload }
    if (signOutSuccess.match(action))
        return { ...state, userTokens: null }
    if (
        signInFailure.match(action) ||
        signUpFailure.match(action) ||  
        signOutFailure.match(action)
    )
        return { ...state, error: action.payload }
    return state;
}