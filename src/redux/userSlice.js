import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userPosts:[],
    count:0
}
const userSlice=createSlice({
name:'cartslice',
initialState,
reducers:{
    increase(state){
        state.count=state.count+1
    },
    setAllPosts(state,action){
            state.userPosts=action.payload
    }
}
})

export const {setAllPosts} = userSlice.actions

export default userSlice.reducer