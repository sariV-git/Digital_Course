import { createSlice } from "@reduxjs/toolkit";

export const lessonSlice=createSlice({
    name:"lesson",
    initialState:{
        lesson:null,
    },
    reducers:{
        setLesson:(state,action)=>{
            const{newLesson}=action.payload
            state.lesson=newLesson
        }
    }
})

export const {setLesson}=lessonSlice.actions
export default lessonSlice.reducer