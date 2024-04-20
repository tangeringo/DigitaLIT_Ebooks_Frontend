import { createSelector } from 'reselect';

import { CartState } from './cartReducer';
import { RootState } from '../store';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    cart => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    cart => cart.isCartOpen
);

export const selectCanIconPulse = createSelector(
    [selectCartReducer],
    cart => cart.canIconPulse
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) => 
    cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity, 0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) => 
    cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price, 0
    )
);