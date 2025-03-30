import { createSlice } from "@reduxjs/toolkit";

export const taskSlice=createSlice({
    name:"task",
    initialState:{
        task:null
    },
    reducers:{
        setTask:(state,action)=>{
            const{newTask}=action.payload
            state.task=newTask
        }
    }
})

export const{setTask}=taskSlice.actions
export default taskSlice.reducer