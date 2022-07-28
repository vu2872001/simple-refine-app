import jwt_decode from "jwt-decode";
import { store } from "redux/store";

export const authProvider = {
    login: (value) => {
        if (value) {
        return Promise.resolve();
        }

        return Promise.reject({
        name: "Login Failed!",
        message: "Unauthorized user",
        });
    },
    logout: () => {
    return Promise.resolve();
    },
    checkError: (error) => {
        if (error && error.statusCode === 401) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => { 
        const state = store.getState()
        const currentUser = state.auth.login.currentUser
        const token = currentUser.access;
        const role = jwt_decode(token).user.role;
        if(role){
            return Promise.resolve();
        }
        return Promise.reject();
    },
    getPermissions: () => {    
        const state = store.getState()
        const currentUser = state.auth.login.currentUser 
        const token = currentUser.access;
        const permissions = jwt_decode(token).user.permissions;
        if(permissions){
            return Promise.resolve(permissions);
        }
        return Promise.reject();
    },
    getUserIdentity: () => {  
        const state = store.getState()
        const currentUser = state.auth.login.currentUser
        const token = currentUser.access;
        const role = jwt_decode(token).user.role;
        if(role){
            return Promise.resolve(role);
        }
        return Promise.reject();
    },
};
