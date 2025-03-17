import { createSlice } from '@reduxjs/toolkit'
export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
      token: null
    },
    reducers: {
      setToken: (state,action) => {
        const {accessToken}=action.payload;
        console.log(accessToken);
       
        state.token = accessToken;

      },
      logOut: (state,action) => {
        
  
        state.token = null;
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setToken,logOut } = tokenSlice.actions
  
  export default tokenSlice.reducer
