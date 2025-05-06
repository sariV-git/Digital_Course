import { createSlice } from '@reduxjs/toolkit'

export const courseSlice =createSlice({
    name:"course",
    initialState:{
        course:null,
        courses:null,   
    },
    reducers:{
        setCourse:(state,action)=>{
            const {newCourse}=action.payload;
            state.course=newCourse;
        },
        setCourses:(state,action)=>{
            const {newCourses}=action.payload;
            state.courses=newCourses;
        }
    }
})

export const {setCourse,setCourses}=courseSlice.actions

export default courseSlice.reducer
//