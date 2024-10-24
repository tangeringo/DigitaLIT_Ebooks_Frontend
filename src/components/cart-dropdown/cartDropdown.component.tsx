import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import CartItemComponent from '../cart-item/cartItem.component';
import SubmitButton, { BUTTON_TYPE_CLASS } from '../submit-button/submitButton.component';

import { 
    DropdownContainer,
    CartItemsContainer,
    EmptyMessage
} from './cartDropdown.styles';


const CartDropdown: React.FC = () =>  {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const redirectToCheckoutPage = () => navigate("/checkout");

    return (
        <DropdownContainer>
            <CartItemsContainer>
                {cartItems.length?
                    cartItems.map(cartItem => (<CartItemComponent key={cartItem.id} cartItem={cartItem} />))
                    :<EmptyMessage>Your cart is empty</EmptyMessage>
                }
            </CartItemsContainer>
            <SubmitButton onClick={redirectToCheckoutPage} buttonType={BUTTON_TYPE_CLASS.dropdown}>Checkout</SubmitButton>
        </DropdownContainer>
    );
}


export default CartDropdown;