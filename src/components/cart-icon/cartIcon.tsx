import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as ShoppingIcon } from '../../assets/ShoppingCart/shopping-cart.svg';

import { CartIconContainer, ItemsInCart } from './cartIcon.styles';
import { selectCanIconPulse, selectCartCount, selectIsCartOpen } from '../../redux/cart/cartSelectors';
import { setCartIconPulse, setIsCartOpen } from '../../redux/cart/cartActions';


const CartIcon: React.FC = () => {
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const canIconPulse = useSelector(selectCanIconPulse);

    const dispatch = useDispatch();
    const toggle = () => dispatch(setIsCartOpen(!isCartOpen));
    if (canIconPulse) setTimeout(() => dispatch(setCartIconPulse(false)), 500);

    return (
        <CartIconContainer canIconPulse={canIconPulse} onClick={toggle}>
            <ShoppingIcon style={{ width: "45px", height: "45px" }}/>
            <ItemsInCart>{cartCount}</ItemsInCart>
        </CartIconContainer>
    );
}


export default CartIcon;