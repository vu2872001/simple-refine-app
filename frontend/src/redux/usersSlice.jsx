const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name:'users',
    initialState:{
        getAll:{
            isFetching:false,
            isError:false,
            usersData:''
        }
    },
    reducers:{
        getAllUsersStart:(state) =>{
            state.getAll.isFetching = true;
        },
        getAllUsersSuccess: (state, action) =>{
            state.getAll.isFetching= false;
            state.getAll.usersData = action.payload;
        },
        getAllUsersFailed: (state) =>{
            state.getAll.isError = true;
            state.getAll.isFetching = false;
        }
    }
})

export const {
    getAllUsersStart,getAllUsersFailed,getAllUsersSuccess
} = usersSlice.actions

export default usersSlice.reducer