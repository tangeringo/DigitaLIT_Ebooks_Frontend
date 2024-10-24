import { createAction, withMatcher, ActionWithPayload } from '../redux.utils';
import { ThemeTypes } from './theme.types'

// Define the type for the theme
export type SetTheme = ActionWithPayload<ThemeTypes.SET_THEME, string>;

// Action to set the theme
export const setTheme = withMatcher((theme: string): SetTheme => 
    createAction(ThemeTypes.SET_THEME, theme));
