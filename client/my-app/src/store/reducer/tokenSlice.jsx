import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
      token: null,
      isManager:false,
      user:null
    },
    reducers: {
      setToken: (state,action) => {
        const {accessToken}=action.payload;
        console.log("the token in the store: ",accessToken);
        state.token = accessToken;
      },
      logOut: (state) => {
        console.log("clean the token");       
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
