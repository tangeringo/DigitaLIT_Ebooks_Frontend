import { combineReducers } from 'redux';

import { cartReducer } from './cart/cart.reducer';
import { libraryReducer } from './library/library.reducer';
import { userReducer } from './user/user.reducer';
import { themeReducer } from './theme/theme.reducer';
import { authReducer } from './auth/auth.reducer'

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    library: libraryReducer,
    theme: themeReducer,
    auth: authReducer
});
