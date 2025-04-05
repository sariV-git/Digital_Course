
import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        belongToTheCourses:[]//an array with id of the course which the user succeed to login
    },
    reducers:{
        setUser:(state,action)=>{
            const {newUser}=action.payload
            state.user=newUser
        },
        setOneBelongToTheCourses:(state,action)=>{
            const {newIdOfCourse}=action.payload
            state.belongToTheCourses=[...state.belongToTheCourses,newIdOfCourse]
            console.log('belongToTheCourses',state.belongToTheCourses);   
        },
        setBelongToTheCourses:(state,action)=>{
            const{newItems}=action.payload
            state.belongToTheCourses=newItems
            console.log('at the second belongToTheCourses',state.belongToTheCourses);
            
        }
    }
})

export const{setUser,setBelongToTheCourses,setOneBelongToTheCourses}=userSlice.actions
export default userSlice.reducer