import { createAction, withMatcher, ActionWithPayload } from "../redux.utils";
import { AuthTypes } from "./auth.types";

export type SetRememberMe = ActionWithPayload<AuthTypes.REMEMBER_ME, boolean>;
export const setRememberMe = withMatcher((bool: boolean): SetRememberMe => 
    createAction(AuthTypes.REMEMBER_ME, bool));