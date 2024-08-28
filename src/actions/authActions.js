import axios from 'axios';
import Cookies from 'js-cookie';

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('/api/login', credentials);
        const token = response.data.token;
        Cookies.set('authToken', token, { secure: true, sameSite: 'Strict' });

        dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};

export const logout = () => (dispatch) => {
    Cookies.remove('authToken');
    dispatch({ type: 'LOGOUT' });
};
