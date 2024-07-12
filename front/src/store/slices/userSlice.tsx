import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState { // Exporta el tipo UserState
  email: string | null;
  password: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  email: null,
  password: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.password = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
