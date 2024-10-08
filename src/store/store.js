// store config
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})