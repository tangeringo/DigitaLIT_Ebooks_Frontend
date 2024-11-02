import { Action } from "@reduxjs/toolkit";
import { CurrentUserType } from '../../data/types/types.global';
import { 
    signInSuccess, 
    signInFailure, 
    signOutSuccess, 
    signOutFailure, 
    signUpFailure, 
    signUpSuccess, 
    updateAccessTokenSuccess, 
    updateAccessTokenFailure 
} from './user.actions';

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

export const userReducer = (state = USER_INITIAL_STATE, action: Action) => {
    if (updateAccessTokenSuccess.match(action))
        return { ...state, currentUser: !state.currentUser? null : { ...state.currentUser, accessToken: action.payload }}
    if (signInSuccess.match(action) || signUpSuccess.match(action))
        return { ...state, currentUser: action.payload }
    if (signOutSuccess.match(action))
        return { ...state, currentUser: null }
    if (
        signInFailure.match(action) ||
        signUpFailure.match(action) ||  
        signOutFailure.match(action) || 
        updateAccessTokenFailure.match(action)
    )
        return { ...state, error: action.payload }
    return state;
}