import { createAction, withMatcher, Action, ActionWithPayload } from "../redux.utils";
import { UserTypes } from "./user.types";
import { AdditionalInfo, TokenType } from "../../globalTypes";

export type CheckUserSession = Action<UserTypes.CHECK_USER_SESSION>;
export const checkUserSession = withMatcher((): CheckUserSession => 
    createAction(UserTypes.CHECK_USER_SESSION));

export type SetCurrentUser = ActionWithPayload<UserTypes.SET_CURRENT_USER, TokenType>;
export const setCurrentUser = withMatcher((tokens: TokenType): SetCurrentUser => (
    createAction(UserTypes.SET_CURRENT_USER, tokens)));

export type EmailAndPasswordSignInStart = ActionWithPayload<UserTypes.EMAIL_AND_PASSWORD_SIGN_IN_START, {email: string, password: string}>
export const emailAndPasswordSignInStart = withMatcher((email: string, password: string): EmailAndPasswordSignInStart => 
    createAction(UserTypes.EMAIL_AND_PASSWORD_SIGN_IN_START, {email, password}));

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
export const signInSuccess = withMatcher((tokens: TokenType & {id?: string | undefined}): SignInSuccess => 
    createAction(UserTypes.SIGN_IN_SUCCESS, tokens));

export type SignInFailure = ActionWithPayload<UserTypes.SIGN_IN_FAILED, Error>
export const signInFailure = withMatcher((
    error: Error
): SignInFailure => 
    createAction(UserTypes.SIGN_IN_FAILED, error));

export type SignUpStart = ActionWithPayload <UserTypes.SIGN_UP_START, {email: string, password: string, displayName: string}>
export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => 
    createAction(UserTypes.SIGN_UP_START, { email, password, displayName }));

export type SignUpSuccess = ActionWithPayload<UserTypes.SIGN_UP_SUCCESS, TokenType>
export const signUpSuccess = withMatcher((tokens: TokenType): SignUpSuccess => 
    createAction(UserTypes.SIGN_UP_SUCCESS, tokens));

export type SignUpFailure = ActionWithPayload<UserTypes.SIGN_UP_FAILED, Error>
export const signUpFailure = withMatcher((error: Error): SignUpFailure => 
    createAction(UserTypes.SIGN_UP_FAILED, error));
    

export type SignOutStart = Action<UserTypes.SIGN_OUT_START>
export const signOutStart = withMatcher((): SignOutStart => createAction(UserTypes.SIGN_OUT_START));

export type SignOutSuccess = Action<UserTypes.SIGN_OUT_SUCCESS>
export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(UserTypes.SIGN_OUT_SUCCESS));

export type SignOutFailure = ActionWithPayload<UserTypes.SIGN_OUT_FAILED, Error>
export const signOutFailure = withMatcher((error: Error): SignOutFailure => createAction(UserTypes.SIGN_OUT_FAILED, error));