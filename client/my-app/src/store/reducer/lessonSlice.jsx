import { createSlice } from "@reduxjs/toolkit";

export const lessonSlice=createSlice({
    name:"lesson",
    initialState:{
        lessons:[],
        lesson:null,
    },
    reducers:{
        setLesson:(state,action)=>{
            const{newLesson}=action.payload
            state.lesson=newLesson
        },
        setLessons:(state,action)=>{
            const{lessons}=action.payload
            state.lessons=lessons
        }
    }
})
export const {setLesson,setLessons}=lessonSlice.actions
export default lessonSlice.reducer