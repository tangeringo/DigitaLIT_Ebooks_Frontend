import styled from "styled-components";
import variables from "../data/variables/variables.static.json";


export const lightTheme = {
    background: variables.colors.white,
    backgroundSecondary: variables.colors.darkCreme,
    textPrimary: variables.colors.black,
    textSecondary: variables.colors.lightBlack,
    border: variables.colors.lightBlack,
    formBackground: variables.colors.white,
    cursive: variables.colors.darkWhite
}

export const darkTheme = {
    background: variables.colors.black,
    backgroundSecondary: variables.colors.creme,
    textPrimary: variables.colors.white,
    textSecondary: variables.colors.creme,
    border: variables.colors.grey,
    formBackground: variables.colors.transparentGrey,
    cursive: variables.colors.darkBlue
}

export const BaseBackgroundContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    transition: all .5s;
    display: flex;

    @media (min-width: ${variables.mediaPixels.width1600}) {
        height: 100vh;
    }
`;