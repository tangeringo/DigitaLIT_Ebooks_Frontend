import React from 'react';
import { setTheme } from '../../redux/theme/theme.actions';
import { useDispatch } from 'react-redux';
import { ThemeTogglerProps } from '../../data/types/types.global';

import {  
    ThemeToggleContainer, 
    ThemeButton, 
} from './themeToggler.styles';


const ThemeToggler: React.FC<ThemeTogglerProps> = ({ currentTheme }) => {

    const dispatch = useDispatch();
    const newTheme = (): string => currentTheme === "light"? "dark": "light";
    const theme = newTheme();
    
    return (
        <ThemeToggleContainer>
            {currentTheme === "light" ? (
                <ThemeButton onClick={() => dispatch(setTheme(theme))}>🌙</ThemeButton>
            ) : (
                <ThemeButton onClick={() => dispatch(setTheme(theme))}>☀️</ThemeButton>
            )}
        </ThemeToggleContainer>
    );
}

export default ThemeToggler;