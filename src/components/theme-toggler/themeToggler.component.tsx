import React from 'react';
import { ThemeTogglerProps } from '../../globalTypes';

import {  
    ThemeToggleContainer, 
    ThemeButton, 
} from './themeToggler.styles';


const ThemeToggler: React.FC<ThemeTogglerProps> = ({ themeTitle, setThemeTitle }) => {

    const switchTheme = () => {
        const newThemeTitle = themeTitle === 'light' ? 'dark' : 'light';
        setThemeTitle(newThemeTitle)
    }
    
    return (
        <ThemeToggleContainer>
            {themeTitle === "light" ? (
                <ThemeButton onClick={switchTheme}>🌙</ThemeButton>
            ) : (
                <ThemeButton onClick={switchTheme}>☀️</ThemeButton>
            )}
        </ThemeToggleContainer>
    );
}

export default ThemeToggler;