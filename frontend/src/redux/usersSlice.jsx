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
        },
        updateUser:{
            isFetching:false,
            isError:false,
            isSuccess:false
        },
        deleteUser:{
            isFetching:false,
            isError:false,
            isSuccess:false
        },
        getInfo:{
            isFetching:false,
            isError:false,
            userInfo:''
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
            state.getInfo.userInfo = null;
            state.restoreAll.isError = false;
        },
        restoreAllUsersFailed:(state) =>{
            state.restoreAll.isFetching = false;
            state.restoreAll.isError = true;
        },

        updateUserStart:(state) =>{
            state.updateUser.isFetching = true;
        },
        updateUserSuccess:(state) =>{
            state.updateUser.isFetching = false;
            state.updateUser.isSuccess = true;
            state.updateUser.isError = false;
        },
        updateUserFailed:(state) =>{
            state.updateUser.isFetching = false;
            state.updateUser.isError = true;
        },

        deleteUserStart:(state) =>{
            state.deleteUser.isFetching = true;
        },
        deleteUserSuccess:(state) =>{
            state.deleteUser.isFetching = false;
            state.deleteUser.isSuccess = true;
            state.deleteUser.isError = false;
        },
        deleteUserFailed:(state) =>{
            state.deleteUser.isFetching = false;
            state.deleteUser.isError = true;
        },
        
        getUserInfoStart:(state) =>{
            state.getInfo.isFetching = true;
        },
        getUserInfoSuccess: (state, action) =>{
            state.getInfo.isFetching= false;
            state.getInfo.userInfo = action.payload;
            state.getInfo.isError= false;
        },
        getUserInfoFailed: (state) =>{
            state.getInfo.isError = true;
            state.getInfo.isFetching = false;
        },
    }
})

export const {
    getAllUsersStart,getAllUsersFailed,getAllUsersSuccess,
    restoreAllUsersStart,restoreAllUsersSuccess,restoreAllUsersFailed,
    updateUserStart,updateUserFailed,updateUserSuccess,
    deleteUserFailed,deleteUserStart,deleteUserSuccess,
    getUserInfoStart,getUserInfoSuccess, getUserInfoFailed,
} = usersSlice.actions

export default usersSlice.reducer