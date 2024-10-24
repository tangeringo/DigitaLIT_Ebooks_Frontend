import styled from "styled-components";
import { creme } from "../../styles/styles.colrs";
import { BaseBackgroundContainer } from "../../styles/styles.global";
import variables from "../../data/variables/variables.static.json";

type CheckoutBackgroundProps = {
    secret: unknown;
}

export const CheckoutBackground = styled(BaseBackgroundContainer)<CheckoutBackgroundProps>`
    height: ${({ secret }) => secret? "150vh" : "100vh"};
`;

export const CheckoutContainer = styled.div`
    width: 85%;
    height: fit-content;
    margin: auto;
`;

export const CheckoutItemsWrapper = styled.div`
    overflow: auto;
    height: 60vh;
    background-color: ${creme};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
`;

export const BottomComponentsContainer = styled.div`
    margin: 15px auto 0;
    display: flex;

    @media (max-width: ${variables.mediaPixels.width600}) {
        display: block;
    }    
`;

export const TotalCountWrapper = styled.div`
    width: fit-content;
    background-color: ${creme};
    box-shadow: 0px 0px 16px ${(props) => props.theme.border};
    padding: 4px;

    @media (max-width: ${variables.mediaPixels.width600}) {
        margin: 30px auto;
    }  
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;
