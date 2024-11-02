import React, { memo } from 'react';
import { bookImages, BookImageKeys } from '../../assets/books/_images';
import { CartItem } from '../../redux/cart/cart.types';
import { CartItemContainer, CartItemDescribtion } from './cartItem.styles';

export type CartItemProps = {
    cartItem: CartItem
}

const CartItemComponent: React.FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, quantity, price, img } = cartItem;
    const imgPath = bookImages[img as BookImageKeys] ?? "";
    return (
        <CartItemContainer>
            <img src={imgPath} alt="cart-item" />
            <CartItemDescribtion>
                <span> {name} </span>
                <span> {quantity} x ${price} </span>
            </CartItemDescribtion>
        </CartItemContainer>
    );
});

export default CartItemComponent;