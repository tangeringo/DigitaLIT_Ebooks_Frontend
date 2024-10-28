import ProfilePicture from '../../assets/ProfilePage/profileDefault.png';
import styled from "styled-components";
import variables from '../../data/variables/variables.static.json';

export const ProfileBaseBackgroundContainer = styled.div`
    background-color: ${(props) => props.theme.background};
    transition: all .5s;
    display: flex;
    min-height: 100vh;
    padding-bottom: 150px;
    @media (max-width: ${variables.mediaPixels.width1400}) {
        height: 125vh;
    }
    @media (max-width: ${variables.mediaPixels.width1200}) {
        height: 165vh;
    }
`;

export const ProfileBaseContainer = styled.div.attrs((props) => (props.theme.background === variables.colors.black? {className: "bg-dark"} : {}))`
    background-color: ${(props) => props.theme.background};
    padding-top: 30%;
    display: flex;
    margin: 150px auto 0;
    width: 80%;
    position: relative;
    border: 4px solid ${variables.colors.creme};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
`;


export const StraitLineContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: fit-content;
    background-color: ${variables.colors.creme};
    box-shadow: 0px 0px 8px ${(props) => props.theme.border};
    position: absolute;
    top: 10%;

    @media (max-width: ${variables.mediaPixels.width1200}) {
        display: block;
    }
`;


export const ProfilePictureContainer = styled.div.attrs((props) => (props.theme.background === variables.colors.black? {className: "bg-dark"}: {}))`
    background-color: ${(props) => props.theme.background};
    box-shadow: 0px 0px 4px ${(props) => props.theme.border};
    display: flex;
    width: 300px;
    height: 310px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${variables.mediaPixels.width1200}) {
        margin: 5px auto;
    }
`;

export const ProfilePictureImg = styled.img.attrs(() => ({
    src: ProfilePicture,
    alt: ""
}))`
    width: 250px;
    height: 250px;
`;


export const ProfileNameContainer = styled.div.attrs((props) => (props.theme.background === variables.colors.black? {className: "bg-dark"} : {}))`
    background-color: ${(props) => props.theme.background};
    box-shadow: 0px 0px 4px ${(props) => props.theme.border};
    height: 8vh;
    margin-top: 5px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MyContainers = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    width: 100%;
    padding: 24px;


    @media (max-width: ${variables.mediaPixels.width1400}) {
        display: block;
    }
`;


const MyContainerBase = styled.div.attrs((props) => (props.theme.background === variables.colors.black? {className: "bg-dark"} : {}))`
    background-color: ${(props) => props.theme.background};
    box-shadow: 0px 0px 4px ${(props) => props.theme.border};
    display: flex;
    width: 25vw;
    height: 25vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4px;

    @media (max-width: ${variables.mediaPixels.width1200}) {
        width: 100%;
        // margin: 4px 0 0;
    }
`;


export const MyStoryContainer = styled(MyContainerBase)`
    margin-right: 2px;

    @media (max-width: ${variables.mediaPixels.width1200}) {
        margin-right: 0;
    }
`;


export const MyInfoContainer = styled(MyContainerBase)`
    margin-left: 2px;

    @media (max-width: ${variables.mediaPixels.width1200}) {
        margin-left: 0;
    }
`;


export const StraitLineInfoContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    width: 100%;
    height: 50px;
    height: 12vh;
    background-color: ${variables.colors.creme};
    z-index: 1;
    box-shadow: 0px 0px 8px ${(props) => props.theme.border};
    position: absolute;
    bottom: 5px;
`;


export const Profiletext = styled.p`
    color: ${(props => props.theme.textSecondary)};
`;