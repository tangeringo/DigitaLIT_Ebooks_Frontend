import { Action } from "@reduxjs/toolkit";
import { setRememberMe } from './auth.actions';

export type AuthState = { readonly rememberMe: boolean }

const AUTH_INITIAL_STATE: AuthState = { rememberMe: false }

export const authReducer = (state = AUTH_INITIAL_STATE, action: Action) => {
    if (setRememberMe.match(action))
        return { ...state, rememberMe: action.payload }
    return state;
}
