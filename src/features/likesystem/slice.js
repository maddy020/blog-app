import { createSlice } from "@reduxjs/toolkit";
const initialState={
    likes:0
}
export const likeSlice=createSlice({
    name:'like',
    initialState,
    reducers:{
        toLike:(state,action)=>{
           
        },
        toDislike:(state,action)=>{

        }
    }

})
export const {toLike,toDislike}=likeSlice.actions;
export default likeSlice.reducer;