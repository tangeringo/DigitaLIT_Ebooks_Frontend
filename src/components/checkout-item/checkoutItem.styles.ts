import styled from "styled-components";

import { black } from "../../styles/colors.styles";
import { mediaPixelsWidth1400, mediaPixelsWidth600 } from "../../variables";


export const SectionWrapperUnderline = styled.div`
    margin-top: 25px;
    border-top: 1px solid ${(props) => props.theme.textPrimary}};
`;

export const SectionWeapper = styled.div`
    margin: 25px auto 0;
    width: 90%;
    display: flex;
    text-align: center;

    @media (max-width: ${mediaPixelsWidth1400}) {
        display: block;
    }
`;

export const CheckoutProductImage = styled.img.attrs(() => ({
    alt: ""
}))`
    margin: 30px;
    border: none;
    width: 200px;
    height: 25vh;
    border: 1.5px solid ${(props) => props.theme.textPrimary};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};

    @media (max-width: ${mediaPixelsWidth600}) {
        width: 70%;
    }
`;

export const WrapperContainer = styled.div`
    display: flex;
    flex-direction: column;
`;


export const DescriptionWrapperContainer = styled.div.attrs((props) => (props.theme.background === black? {className: "bg-dark"} : {}))`
    background-color: ${(props) => props.theme.background};
    border: 1.5px solid ${(props) => props.theme.textPrimary};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
    height: fit-content;
    margin: 30px 12px 10px;
    width: 80%;
    display: flex;
    flex-direction: row;
    text-align: left;

    @media (max-width: ${mediaPixelsWidth1400}) {
        width: 100%;
    }
`;

export const ProductLabel = styled.span`
    color: ${(props) => props.theme.textPrimary};
    font-size: 17px;
    padding: 5px;
`;

export const ProductItemTitle = styled(ProductLabel)`
    font-weight: bold;
    font-size: 18.5px;
`;

export const ProductItemPrice = styled(ProductLabel)`
    margin-left: auto;
    font-weight: bold;
`;

export const BottomLinkLabel = styled.span`
    color: ${(props) => props.theme.textSecondary};
    padding: 8px;
    text-decoration: underline;
    cursor: pointer;
`;