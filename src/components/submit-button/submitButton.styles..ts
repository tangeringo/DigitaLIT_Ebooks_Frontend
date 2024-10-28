import styled from "styled-components";
import variables from "../../data/variables/variables.static.json";
import { SpinnerContainer } from "../loading-spinner/loadingSpinner.styles";

export const BaseButtonStyles = styled.button`
    background-color: ${variables.colors.grey};
    border: 1px solid ${variables.colors.black};
    color: ${variables.colors.white};
    display: flex;
    justify-content: center;
    margin: 16px auto;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    width: 100%;
    min-width: 200px;
    cursor: pointer;
    width: 50%;

    &:hover {
        background-color: ${variables.colors.darkGrey};
        border: 1px solid ${variables.colors.black};
    }
`;

export const CheckoutButtonStyles = styled(BaseButtonStyles)`
    width: 30%;
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
`;

export const DropdownButtonStyles = styled(BaseButtonStyles)`
    background-color: ${variables.colors.creme};

    &:hover {
        background-color: ${variables.colors.darkCreme};
    }
`;

export const CloseButtonStyles = styled(BaseButtonStyles)`
    width: 0;
    min-width: 50px;
    display: flex;
    justify-content: center;
    margin: 90px auto -70px 4px;
    padding: 5px;
    font-size: 25px;
`;


export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;