import { compose, configureStore, applyMiddleware, Middleware, Tuple } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';

import logger from 'redux-logger';
import { PersistConfig, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== "production" && logger].filter((middleware): middleware is Middleware => Boolean(middleware))

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?: typeof compose }
}

const composeEnhancer = ( process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))


export const store = configureStore({
    reducer: persistedReducer,    // persistedReducer
    enhancers: () => new Tuple(composedEnhancers)
});

export const persistor = persistStore(store);
