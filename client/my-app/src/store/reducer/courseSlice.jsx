import { createSlice } from '@reduxjs/toolkit'

export const courseSlice =createSlice({
    name:"course",
    initialState:{
        course:null
    },
    reducers:{
        setCourse:(state,action)=>{
            const {newCourse}=action.payload;
            state.course=newCourse;
        }
    }
})

export const {setCourse}=courseSlice.actions

export default courseSlice.reducer