import styled, { css } from 'styled-components';
import variables from '../../data/variables/variables.static.json';


const onClickAnimationStyles = css`
    animation: pulse 1s normal ease-in-out;

    @keyframes pulse {
        0% {
          transform: scaleX(1.5) scaleY(1.5);
          background-color: ${variables.colors.creme};
        }
        50% {
          transform: scale3d(1.05, 1.05, 1.05);
          background-color: ${variables.colors.white};
        }
        to {
            background-color: ${variables.colors.creme};
            transform: scaleX(1.5) scaleY(1.5)
        }
      }
`;

type CartIconContainerProps = {
  canIconPulse: boolean;
}

export const CartIconContainer = styled.div<CartIconContainerProps>`
    margin: auto 0;
    width: 56px;
    height: 56px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${variables.colors.white};
    border-radius: 15px;

    @media (max-width: ${variables.mediaPixels.width770}) {
        margin: 0;
    }

    ${({ canIconPulse }) => canIconPulse && onClickAnimationStyles};
`;

export const ItemsInCart = styled.span`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 24px;
`;