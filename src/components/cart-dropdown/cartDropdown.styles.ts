import styled from 'styled-components';
import { white } from '../../styles/styles.colrs';


export const DropdownContainer = styled.div.attrs(() => ({
    className: "bg-dark"
}))`
    position: absolute;
    width: 320px;
    height: 380px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    top: 85px;
    right: 0;
    z-index: 5;
`;

export const CartItemsContainer = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;



export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
  color: ${white};
`;