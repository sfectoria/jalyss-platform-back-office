// authSlice

import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
      me: 
      {
        name: "oussema", lastname: "cherif"
      }
    },
    reducers: {
      
    },
  })
export default authSlice.reducer