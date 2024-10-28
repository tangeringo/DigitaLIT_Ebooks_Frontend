import styled from "styled-components";
import { Link } from "react-router-dom";
import variables from "../../data/variables/variables.static.json";

export const AuthAppContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textPrimary};
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: .8rem;
    transition: all .5s;
`;

export const LoginContainer = styled.div`
    text-align: center;
    margin: 6rem 0 2rem;
    margin-bottom: 4rem;
`;

export const Headding = styled.h2`
    text-align: center;
    padding: 1rem;
`;

export const ThemeToggleContainer = styled.div`
    font-size: 2rem;
    cursor: pointer;
    position: absolute;
    top: 0;
`;

export const ThemeButton = styled.button.attrs(() => ({
    className: "bg-dark"
}))`
    background-color: ${variables.colors.creme};
    border: 1px solid ${variables.colors.darkCreme};
    color: #fff;
    margin: 16px 8px;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    width: 40%;
    cursor: pointer;
`;

export const ComponentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    width: 400px;
    height: 500px;
    margin: auto;
    box-shadow: 0px 0px 12px ${(props) => props.theme.border};
    border-radius: 8px;
    background-color: ${(props) => props.theme.formBackground};
  
    @media (max-width: ${variables.mediaPixels.width600}) {
        width: 70%;
    }
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

export const Divider = styled.p`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid ${(props) => props.theme.textPrimary};
    line-height: .1rem;
    margin: 2rem 0;
`;

export const OrText = styled.span`
    padding: 0 10px;
    background-color: ${(props) => props.theme.formBackground};
`;

export const BottomComponnetsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: .8rem;

    @media (max-width: ${variables.mediaPixels.width600}) {
        display: block;
    }
`;

export const RememberContainer = styled.div`
    padding-left: 8px;
`;

export const RememberCheckbox = styled.input.attrs(() => ({ type: 'checkbox' }))`
    margin: 13px;
`;

export const RedirectionLink = styled(Link)`
    color: ${(props) => props.theme.textPrimary};
    font-size: 1rem;
    margin-top: .5rem;
    cursor: pointer;
`;