import styled from "styled-components";
import { black, creme, darkCreme, grey, lightBlack, transparentGrey, white } from "./colors.styles";


export const lightTheme = {
    background: white,
    backgroundSecondary: darkCreme,
    textPrimary: black,
    textSecondary: lightBlack,
    border: lightBlack,
    formBackground: white
}

export const darkTheme = {
    background: black,
    backgroundSecondary: creme,
    textPrimary: white,
    textSecondary: creme,
    border: grey,
    formBackground: transparentGrey
}

export const BaseBackgroundContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    transition: all .5s;
    height: 100vh;
    display: flex;
`;