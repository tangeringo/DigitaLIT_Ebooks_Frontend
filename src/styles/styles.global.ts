import styled from "styled-components";
import { black, creme, darkCreme, grey, lightBlack, transparentGrey, white, darkBlue, darkWhite } from "./styles.colrs";
import variables from "../data/variables/variables.static.json";


export const lightTheme = {
    background: white,
    backgroundSecondary: darkCreme,
    textPrimary: black,
    textSecondary: lightBlack,
    border: lightBlack,
    formBackground: white,
    cursive: darkWhite
}

export const darkTheme = {
    background: black,
    backgroundSecondary: creme,
    textPrimary: white,
    textSecondary: creme,
    border: grey,
    formBackground: transparentGrey,
    cursive: darkBlue
}

export const BaseBackgroundContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    transition: all .5s;
    display: flex;

    @media (min-width: ${variables.mediaPixels.width1600}) {
        height: 100vh;
    }
`;