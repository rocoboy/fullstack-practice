import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import clientReducer from './slices/clientSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    client: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
