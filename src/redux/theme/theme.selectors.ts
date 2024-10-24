import { createSelector } from 'reselect';
import { ThemeState } from './theme.reducer'
import { RootState } from '../store';

const selectThemeReducer = (state: RootState): ThemeState => state.theme;

export const selectCurrentTheme = createSelector(
    [selectThemeReducer],
    theme => theme.theme
);