import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slice/userSlice';
import { cartReducer } from './slice/cartSlice';
import { checkoutReducer } from './slice/checkoutSlice';

export const store = configureStore({
    reducer: {
      cart: cartReducer,
        checkout: checkoutReducer,
        user: userReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;