import { createAction, withMatcher, Action, ActionWithPayload } from "../redux.utils";
import { UserTypes } from "./user.types";
import { TokenType } from "../../globalTypes";

export type CheckUserSession = Action<UserTypes.CHECK_USER_SESSION>;
export const checkUserSession = withMatcher((): CheckUserSession => 
    createAction(UserTypes.CHECK_USER_SESSION));

export type SetCurrentUser = ActionWithPayload<UserTypes.SET_CURRENT_USER, TokenType>;
export const setCurrentUser = withMatcher((tokens: TokenType): SetCurrentUser => (
    createAction(UserTypes.SET_CURRENT_USER, tokens)));

export type ManualSignInStart = ActionWithPayload<UserTypes.MANUAL_SIGN_IN_START, TokenType>;
export const manualSignInStart = withMatcher((tokens: TokenType): ManualSignInStart => 
    createAction(UserTypes.MANUAL_SIGN_IN_START, tokens));

export type GoogleSignInStart = Action<UserTypes.GOOGLE_SIGN_IN_START>;
export const googleSignInStart = withMatcher((): GoogleSignInStart => 
    createAction(UserTypes.GOOGLE_SIGN_IN_START));

export type FacebookSignInStart = Action<UserTypes.FACEBOOK_SIGN_IN_START>;
export const facebookSignInStart = withMatcher((): FacebookSignInStart => 
    createAction(UserTypes.FACEBOOK_SIGN_IN_START));

export type TwitterSignInStart = Action<UserTypes.TWITTER_SIGN_IN_START>;
export const twitterSignInStart = withMatcher((): TwitterSignInStart => 
    createAction(UserTypes.TWITTER_SIGN_IN_START));

export type SignInSuccess = ActionWithPayload<UserTypes.SIGN_IN_SUCCESS, TokenType> 
export const signInSuccess = withMatcher((tokens: TokenType & {id: string}): SignInSuccess => 
    createAction(UserTypes.SIGN_IN_SUCCESS, tokens));

export type SignInFailure = ActionWithPayload<UserTypes.SIGN_IN_FAILED, Error>
export const signInFailure = withMatcher((
    error: Error
): SignInFailure => 
    createAction(UserTypes.SIGN_IN_FAILED, error));

    

export type SignOutStart = Action<UserTypes.SIGN_OUT_START>
export const signOutStart = withMatcher((): SignOutStart => createAction(UserTypes.SIGN_OUT_START));

export type SignOutSuccess = Action<UserTypes.SIGN_OUT_SUCCESS>
export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(UserTypes.SIGN_OUT_SUCCESS));

export type SignOutFailure = ActionWithPayload<UserTypes.SIGN_OUT_FAILED, Error>
export const signOutFailure = withMatcher((error: Error): SignOutFailure => createAction(UserTypes.SIGN_OUT_FAILED, error));