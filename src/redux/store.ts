import { compose, configureStore, applyMiddleware, Middleware, Tuple } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import logger from 'redux-logger';
import { PersistConfig, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';

export type RootState = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
};

const createPersistConfig = (whitelist: (keyof RootState)[]): ExtendedPersistConfig => ({
    key: 'root',
    storage,
    whitelist
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(
    (middleware): middleware is Middleware => Boolean(middleware)
);

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancer =
    (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

// Initial persistConfig without 'user' in the whitelist
let persistConfig = createPersistConfig(['cart', 'theme', 'auth']);

// Function to update the persisted reducer dynamically
const updatePersistedReducer = (newWhitelist: (keyof RootState)[]) => {
    persistConfig = createPersistConfig(newWhitelist);
    return persistReducer(persistConfig, rootReducer);
};

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    enhancers: () => new Tuple(composedEnhancers)
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// Subscribe to changes in rememberMe in the auth state
store.subscribe(() => {
    const { rememberMe } = store.getState().auth;
    const isUserPersisted = persistConfig.whitelist.includes('user');

    if (rememberMe && !isUserPersisted) {
        // Update persistConfig to include 'user' when rememberMe is true
        persistedReducer = updatePersistedReducer(['cart', 'theme', 'auth', 'user']);
        store.replaceReducer(persistedReducer);
        persistor.persist();
    }
});
