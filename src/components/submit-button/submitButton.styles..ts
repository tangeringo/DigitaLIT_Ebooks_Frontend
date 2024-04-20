import styled from "styled-components";
import { white, grey, darkGrey, black, creme, darkCreme } from "../../styles/colors.styles";
import { SpinnerContainer } from "../loading-spinner/loadingSpinner.styles";

export const BaseButtonStyles = styled.button`
    background-color: ${grey};
    border: 1px solid ${black};
    color: ${white};
    margin: 16px 0;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    width: 100%;
    min-width: 200px;
    cursor: pointer;

    &:hover {
        background-color: ${darkGrey};
        border: 1px solid ${black};
    }
`;

export const CheckoutButtonStyles = styled(BaseButtonStyles)`
    width: 30%;
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
`;

export const DropdownButtonStyles = styled(BaseButtonStyles)`
    background-color: ${creme};

    &:hover {
        background-color: ${darkCreme};
    }
`;

export const CloseButtonStyles = styled(BaseButtonStyles)`
    width: 0;
    min-width: 50px;
    display: flex;
    justify-content: center;
    margin: 30px 30px 0 auto;
    font-size: 25px;

`;


export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;