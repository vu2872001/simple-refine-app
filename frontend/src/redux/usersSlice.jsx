const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name:'users',
    initialState:{
        getAll:{
            isFetching:false,
            isError:false,
            usersData:''
        },
        restoreAll:{
            isFetching:false,
            isError:false,
            isSuccess:false,
        }
    },
    reducers:{
        getAllUsersStart:(state) =>{
            state.getAll.isFetching = true;
        },
        getAllUsersSuccess: (state, action) =>{
            state.getAll.isFetching= false;
            state.getAll.usersData = action.payload;
            state.getAll.isError= false;
        },
        getAllUsersFailed: (state) =>{
            state.getAll.isError = true;
            state.getAll.isFetching = false;
        },

        restoreAllUsersStart:(state) =>{
            state.restoreAll.isFetching = true;
        },
        restoreAllUsersSuccess:(state) =>{
            state.restoreAll.isFetching = false;
            state.restoreAll.isSuccess = true;
            state.getAll.usersData = null;
            state.restoreAll.isError = false;
        },
        restoreAllUsersFailed:(state) =>{
            state.restoreAll.isFetching = false;
            state.restoreAll.isError = true;
        },
    }
})

export const {
    getAllUsersStart,getAllUsersFailed,getAllUsersSuccess,
    restoreAllUsersStart,restoreAllUsersSuccess,restoreAllUsersFailed
} = usersSlice.actions

export default usersSlice.reducer