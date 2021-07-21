import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/Counter/couterSlice.js';
import userReducer from '../features/Auth/userSlice.js';
import cartReducer from '../features/Carts/cartSlice.js';

const rootReducer = {
    count: counterReducer,
    user: userReducer,
    cart: cartReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
