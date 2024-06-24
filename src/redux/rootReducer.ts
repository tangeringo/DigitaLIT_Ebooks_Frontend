import { combineReducers } from 'redux';

import { cartReducer } from './cart/cartReducer';
import { libraryReducer } from './library/libraryReducer';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    library: libraryReducer,
});
