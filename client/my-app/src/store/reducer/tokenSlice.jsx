import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
      token: null,
      isManager:false
    },
    reducers: {
      setToken: (state,action) => {
        const {accessToken}=action.payload;
        console.log(accessToken);
        state.token = accessToken;
      },
      logOut: (state,action) => {
        state.token = null;
        state.isManager=false
      },
      setIsManager:(state,action)=>{
        state.isManager=action.payload
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setToken,logOut ,setIsManager} = tokenSlice.actions
  
  export default tokenSlice.reducer
