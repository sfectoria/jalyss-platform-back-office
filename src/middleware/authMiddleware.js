import axios from 'axios';
import Cookies from 'js-cookie';
import { logout } from '../features/auth/authSlice';

export const validateTokenMiddleware = (store) => async (next) => async (action) => {
  const token = Cookies.get('authToken');

  if (token) {
    try {
      const response = await axios.post('/api/validate-token', { token });

      if (response.data.valid) {
        next(action);
      } else {
        store.dispatch(logout());
      }
    } catch (error) {
      store.dispatch(logout());
    }
  } else {
    next(action);
  }
};
