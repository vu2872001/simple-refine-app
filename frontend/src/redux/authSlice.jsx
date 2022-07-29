const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name:'auth',
    initialState:{
        login:{
            currentUser:'',
            isFetching:false,
            isError:false,
        },
        logout:{
            isFetching:false,
            isError:false,
            isSuccess:false
        },
        register:{
            isFetching:false,
            isError:false,
            isSuccess:false
        }
    },
    reducers:{
        loginStart:(state) =>{
            state.login.isFetching =true;
        },
        loginSuccess:(state, action) =>{
            state.login.isFetching = false;
            state.login.currentUser= action.payload;
            state.login.isError = false;
        },
        loginFailed:(state) =>{
            state.login.isFetching = false;
            state.login.isError = true;
        },

        logOutStart:(state) =>{
            state.logout.isFetching=true;
        },
        logOutSuccess:(state) =>{
            state.logout.isFetching=false;
            state.login.currentUser = null;
            state.logout.isSuccess = true; 
            state.logout.isError = false;
        },
        logOutFailed:(state) =>{
            state.logout.isFetching=false;
            state.logout.isError=true;
        },

        registerStart:(state) =>{
            state.register.isFetching=true;
        },
        registerSuccess:(state) =>{
            state.register.isFetching=false;
            state.register.isSuccess = true;
            state.register.isError = false;
        },
        registerFailed:(state) =>{
            state.register.isFetching=false;
            state.register.isError=true;
        },
        
    }
});

export const {
    loginStart,loginFailed,loginSuccess,
    logOutFailed,logOutStart,logOutSuccess,
    registerFailed,registerStart,registerSuccess
} = authSlice.actions

export default authSlice.reducer