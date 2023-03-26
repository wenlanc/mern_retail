import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import itemReducer from './reducers/itemReducer';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import orderReducer from './reducers/orderReducer';
import itemSlice from './reducers/itemSlice';

const rootReducer = combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
})

const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;