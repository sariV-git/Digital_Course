
import { createSlice } from "@reduxjs/toolkit";

export const itemsInTheMenubarSlice=createSlice({
    name:"itemsInTheMenubar",
    initialState:{
        itemsInTheMenubar:null
    },
    reducers:{
        setItemsInTheMenubar:(state,action)=>{
            const {newItems}=action.payload
            console.log('newItem',newItems);
            
            state.itemsInTheMenubar=newItems
        console.log('state: ',state.itemsInTheMenubar);
        
        }
    }
})

export const{setItemsInTheMenubar}=itemsInTheMenubarSlice.actions
export default itemsInTheMenubarSlice.reducer