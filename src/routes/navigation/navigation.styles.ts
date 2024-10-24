import styled from 'styled-components';
import { grey, white } from '../../styles/styles.colrs';
import variables from '../../data/variables/variables.static.json';


export const NavigationContainer = styled.nav.attrs(() => ({
    className: "navbar navbar-expand-md navbar-dark bg-dark shadow"
}))`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
`;

type NavBarImageProps = {
    route?: string | undefined;
}

export const NavBarImage = styled.img.attrs(() => ({
    className: "d-inline-block align-center",
    alt: "",
    width: "60",    
    height: "60",
}))<NavBarImageProps>`
    margin-right: 15px;
    margin-left: ${({route}) => route === variables.routes.editPdf? "0": "100px"};
    background-color: ${white};
    border-radius: 20px;
    padding: 5px;
`;

export const NavBarProfileImage = styled(NavBarImage)`
    margin-left: 0;
`;

export const HamburgerMenuButton = styled.button.attrs(() => ({
    className: "navbar-toggler",
    type: "button",
    $ariacontrols: "navbarSupportedContent",
    $ariaexpanded: "false",
    $arialabel: "Toggle navigation"
}))``;


export const OuterRoutesContainer = styled.div.attrs(() => ({
    className: "collapse navbar-collapse",
    id: "navbarSupportedContent"
}))``;


export const RoutesContainer = styled.ul.attrs(() => ({
    className: "navbar-nav me-auto mb-2 mb-md-1"
}))``;

export const RoutesContainerAfterAuth = styled.div`
    display: flex;
    
    @media (max-width: ${variables.mediaPixels.width770}) {
        margin: 0 auto 0 0;
        flex-direction: column;
    }
`;

export const RouteLink = styled.li.attrs(() => ({
    className: "nav-item"
}))``;

export const LogOutTag = styled.p`
    color: ${grey};
    font-weight: bold;
    margin: -15px 15px 0 25px;
    width: 70px;
    cursor: pointer;

    @media (max-width: ${variables.mediaPixels.width770}) {
        margin: 0 15px 15px 0;
    }
`;

export const FormSearch = styled.form.attrs(() => ({
    className: "d-flex me-3"
}))`
    @media (max-width: ${variables.mediaPixels.width770}) {
        flex-direction: column;
    }
`;


export const RightComponentsWeapperContainer = styled.div`
    display: flex;
    flex-direction: column;
`;


export const InputSearch = styled.input.attrs(() => ({
    className: "form-control me-2",
    type: "search",
    placeholder: "Search",
    ariaLabel: "Search"
}))`
    display: flex;
`;


export const SearchButton = styled.button.attrs(() => ({
    className: "btn btn-outline-success",
    type: "submit"
}))``;