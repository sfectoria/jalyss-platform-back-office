// authSlice

import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie';

const initialState={
  isAuthenticated: !!Cookies.get('authToken'),
  user: 'ghdh',
  token: Cookies.get('authToken') || null,
  error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        Cookies.set('authToken', action.payload.token, { secure: true, sameSite: 'Strict' });
      },
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        Cookies.remove('authToken');
      },
      loginFailure: (state, action) => {
        state.error = action.payload;
      },
    },
  })

export const { loginSuccess, logout, loginFailure } = authSlice.actions;

export default authSlice.reducer