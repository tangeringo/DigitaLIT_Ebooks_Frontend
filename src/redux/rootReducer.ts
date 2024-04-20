import { combineReducers } from 'redux';

import { cartReducer } from './cart/cartReducer';
import { libraryReducer } from './library/libraryReducer';

export const rootReducer = combineReducers({
    cart: cartReducer,
    library: libraryReducer,
});
