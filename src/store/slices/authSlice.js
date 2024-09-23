import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosGetWithHeaders } from '../../helpers/axiosWithHeaders';

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (args, { dispatch,rejectWithValue }) => {
  try {
    
    const response = await axios.post('http://localhost:3000/auth/login', args);
    console.log(response.data,"response");

    localStorage.setItem("token", response.data);
    dispatch(getMe());
    return response.data;
  } catch (error) {
  

    return rejectWithValue(error.response.data.message)
  }
});

export const getMe = createAsyncThunk("getme", async () => {
  const response = await axiosGetWithHeaders('auth/me')
  console.log("me", response.data);
  return response.data; 
});

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  "update",
  async ({ id, body }, { dispatch }) => {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `http://localhost:3000/auth/${id}`, 
      body,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("body",body);
    window.location.reload(); 

  }
);

export const verifyPassword = createAsyncThunk(
  'auth/verifyPassword',
  async ({ id, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3000/auth/verify-password/${id}`, { password });
      return response.data; // Renvoie le message de succès ou d'échec
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: null,
    verificationMessage: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(verifyPassword.fulfilled, (state, action) => {
        state.verificationMessage = action.payload; 
      })
      .addCase(verifyPassword.rejected, (state, action) => {
        state.verificationMessage = action.payload; 
      });
  },
});

export default authSlice.reducer;
