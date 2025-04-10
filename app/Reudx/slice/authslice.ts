// app/Reudx/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, setItem } from '../../uikit/UikitUtils/mmkvStorage';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: getItem('isLoggedIn') === 'true',
};

// ✅ This was likely missing
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      setItem('isLoggedIn', 'true');
    },
    logout: (state) => {
      state.isLoggedIn = false;
      setItem('isLoggedIn', 'false');
    },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      setItem('isLoggedIn', action.payload ? 'true' : 'false');
    },
  },
});

// ✅ Export actions
export const { login, logout, setLoginState } = authSlice.actions;

// ✅ Export reducer
export default authSlice.reducer;
