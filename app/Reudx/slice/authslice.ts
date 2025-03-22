// src/redux/slices/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getItem, setItem} from '../../uikit/UikitUtils/mmkvStorage';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: getItem('isLoggedIn') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      console.log('state==>', state);
      setItem('isLoggedIn', 'true'); // Persist to MMKV
      //   setItem('', JSON.stringify(userData));
      //   setItem('userDetail',JSON.stringify())
    },
    logout: state => {
      state.isLoggedIn = false;
      setItem('isLoggedIn', 'false'); // Persist to MMKV
    },
    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      setItem('isLoggedIn', action.payload ? 'true' : 'false'); // Persist to MMKV
    },
  },
});

export const {login, logout, setLoginState} = authSlice.actions;

export default authSlice.reducer;
