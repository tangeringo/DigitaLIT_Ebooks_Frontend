import React, { memo } from 'react';
import { CartItem } from '../../redux/cart/cart.types';
import { CartItemContainer, CartItemDescribtion } from './cartItem.styles';

export type CartItemProps = {
    cartItem: CartItem
}

const CartItemComponent: React.FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, quantity, price, img } = cartItem;
    return (
        <CartItemContainer>
            <img src={img} alt="cart-item" />
            <CartItemDescribtion>
                <span> {name} </span>
                <span> {quantity} x ${price} </span>
            </CartItemDescribtion>
        </CartItemContainer>
    );
});

export default CartItemComponent;