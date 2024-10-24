import { Action } from "@reduxjs/toolkit";
import { setTheme } from './theme.actions';

export type ThemeState = {
    readonly theme: string;
};

export const THEME_INITIAL_STATE: ThemeState = { theme: 'light' };
export const themeReducer = (state = THEME_INITIAL_STATE, action: Action) => {
    if (setTheme.match(action)) 
        return {...state, theme: action.payload};
    return state;
};
