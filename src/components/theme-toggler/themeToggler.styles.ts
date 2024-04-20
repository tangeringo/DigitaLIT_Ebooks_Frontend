import styled from "styled-components";

import { creme, darkCreme } from "../../styles/colors.styles";

export const Headding = styled.h2`
    text-align: center;
    padding: 1rem;
`;

export const ThemeToggleContainer = styled.div`
    font-size: 2rem;
    cursor: pointer;
    position: fixed;
    top: -10px;
    z-index: 1;
`;

export const ThemeButton = styled.button.attrs(() => ({
    className: "bg-dark"
}))`
    background-color: ${creme};
    border: 1px solid ${darkCreme};
    color: #fff;
    margin: 16px 8px;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    width: 100%;
    cursor: pointer;
`;