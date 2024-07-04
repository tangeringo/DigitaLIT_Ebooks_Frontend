import styled from "styled-components";

import { creme, lightBlack } from "../../styles/colors.styles";
import { DescriptionWrapperContainer } from "../../components/checkout-item/checkoutItem.styles";
import { Headding, RedirectionLink } from "../login/login.styles";

import { mediaPixelsWidth1600, mediaPixelsWidth910 } from "../../variables";
import { BaseBackgroundContainer } from "../../styles/globalStyles.styles";


export const HomeBaseBackgroundContainer = styled(BaseBackgroundContainer)`
    @media (max-width: ${mediaPixelsWidth1600}) {
        height: 100%;
    }
`;

export const HomeBaseContainer = styled.div`
    background-color: ${creme};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
    width: fit-content;
    width: 80%;
    height: fit-content;
    margin: auto;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${mediaPixelsWidth1600}) {
        margin-top: 180px;
        display: block;
    }
`;

export const SquareWrapper = styled.div`
    width: 50%
    height: 15vh;
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
    margin-right: 10px;
    
    @media (max-width: ${mediaPixelsWidth1600}) {
        width: 100%;
        padding-bottom: 15px;
    }
`;

export const ExplanationContainerWrapper = styled(DescriptionWrapperContainer)`
    width: 100%;
    margin: 10px 0 0;

    @media (max-width: ${mediaPixelsWidth910}) {
        display: block;
        text-align: center;
    }
`;

export const DescriptionLabelContainer = styled.div`
    margin: 30px;
    width: 21vw; 
    height: fit-content;
    background-color: ${creme};
    box-shadow: 0px 0px 6px ${(props) => props.theme.border};
    
    @media (max-width: ${mediaPixelsWidth1600}) {
        width: 75%;
        padding-bottom: 15px;
    }

    @media (max-width: ${mediaPixelsWidth910}) {
        margin: 30px auto;
    }
`;

export const TitleHeadding = styled(Headding)`
    border-bottom: 2px solid ${lightBlack};
    width: 90%;
    margin: 0 auto;
    color: ${lightBlack};
    letter-spacing: .7px;
    font-family: roboto;
`;

export const ExplanationParagraph = styled.p`
    margin: 20px;
    justify-content: left;
    letter-spacing: .7px;
`;

export const RedirectionLinkText = styled(RedirectionLink)`
    margin-left: 5px;
`;
