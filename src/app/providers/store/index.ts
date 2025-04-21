import { configureStore } from '@reduxjs/toolkit';
import orderReducer from '../../../entities/order/model/slice';
import clientReducer from '../../../entities/client/model/slice';

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    clients: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
