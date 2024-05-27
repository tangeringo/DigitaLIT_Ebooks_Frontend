import styled, { RuleSet, css } from "styled-components";
import { black, creme } from "../../styles/colors.styles";
import { addToCart, moreInfo, showBook } from "../../variables";


export const BookImage = styled.img.attrs(() => ({
    alt: ""
}))`
    width: 95%;
    height: 350px;
    background-size: cover;
    background-position: center;
    margin-bottom: 5px;
`;

const LibraryItemStyles = css`
    border-radius: 50px;
    width: 50px;
    padding: 0;
    position: absolute;
    letter-spacing: 2.7px;
    line-height: 35px;
    font-size: 25px;
    top: 15px;
    right: 25px;
    transform: rotate(-90.0deg);
`;


type ButtonNameProps = {
    buttonName: string;
}


const getButtonItemStyles = ({ buttonName }: ButtonNameProps): RuleSet<object> | undefined => {
    if (buttonName === moreInfo)
        return LibraryItemStyles;
}

export const CartItemButton = styled.button<ButtonNameProps>`
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 360px;
    margin: 0 auto;
    display: none;
    width: auto;
    height: 50px;
    letter-spacing: 1.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    color: ${black};
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    display: none;
    justify-content: center;

    ${(props) => getButtonItemStyles(props)};
`;

export const ButtonTitle = styled.strong<ButtonNameProps>`
    font-size: ${({buttonName}) => buttonName === moreInfo? "25px" : "15px"};
`;


const CheckoutCollectionItemStyles = css`
    margin-top: 100px;
    width: 80%;
    height: fit-content;
`;

const getCheckoutCollectionItemStyles = ({ buttonName }: ButtonNameProps): RuleSet<object> | undefined => {
    if (buttonName === addToCart) {
        return CheckoutCollectionItemStyles;
    }
}

export const CollectionItem = styled.div<ButtonNameProps>`
    width: 300px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    align-items: center;
    position: relative;
    margin: 1% auto 5%;
    border: 2px solid ${creme};
    border-radius: 10px;
    box-shadow: 0px 0px 12px ${(props) => props.theme.border};

    &:hover {
        ${BookImage} { 
            opacity: 0.8;
        }

        ${CartItemButton} {
          opacity: 0.85;
          display: flex;
        }
    }

    ${(props) => getCheckoutCollectionItemStyles(props)};
`;

type ItemDescriptionProps = {
    buttonTitle: string;
}


export const ItemDescription = styled.div<ItemDescriptionProps>`
    width: 100%;
    height: fit-content;
    display: flex;
    text-align: center;
    justify-content: ${({buttonTitle}) => buttonTitle === showBook? "center" : "space-between"};
    font-size: 18px;
    background-color: ${creme};
    margin-top: 10px;
    padding-left: 5px;
`;


export const BookTitle = styled.span`
    width: 90%;
    display: flex;
    font-weight: bold;
    letter-spacing: 1px;
`;

export const BookPrice = styled.h4`
    width: 10%;
    margin-right: 20px;
`;

export const BookDescription = styled.p`
    display: flex;
    margin-top: auto;
`;