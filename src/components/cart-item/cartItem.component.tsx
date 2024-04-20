import React, { memo } from 'react';
import { CartItem } from '../../redux/cart/cartTypes';
import { CartItemContainer, CartItemDescribtion } from './cartItem.styles';

export type CartItemProps = {
    cartItem: CartItem
}

const CartItemComponent: React.FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, quantity, price, imgSource } = cartItem;
    return (
        <CartItemContainer>
            <img src={imgSource} alt="cart-item" />
            <CartItemDescribtion>
                <span> {name} </span>
                <span> {quantity} x ${price} </span>
            </CartItemDescribtion>
        </CartItemContainer>
    );
});

export default CartItemComponent;