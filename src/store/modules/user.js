import { login, getUserInfo, logout } from "../../api/login.js";
import passwordApi from "../../api/password.js"

const user = {
    namespaced: true,
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')),
        token: localStorage.getItem('token')
    },
    mutations: {
        SET_USERINFO (state,userInfo) {
            state.userInfo = userInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        },
        SET_TOKEN (state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        DELETE_USER_INFO (state) {
            state.token = '';
            state.userInfo = null;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
        }
    },
    actions: {
        loginAction ({commit}, user) {
            return new Promise((resolve, reject)=>{
                login(user.username, user.password).then( res => {
                    if(res.success){
                        commit('SET_TOKEN', res.token);
                        commit('SET_USERINFO',res.data)
                        resolve(res)
                    } else {
                        reject(res.message)
                    }
                })
            })
        },
        getUserInfo ({commit, state}, token) {
            return new Promise((resolve, reject) => {
                getUserInfo(token).then( res => {
                    if(res.success){
                        commit('SET_USERINFO',res.data)
                        resolve(res)
                    } else {
                        reject(res.message)
                    }
                })
            })
        },
        logout ({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(res => {
                    if(res.success){
                        commit('DELETE_USER_INFO');
                        resolve(res);
                    }else{
                        reject(res.message);
                    }
                })
            })
        },
        updatePwd ({commit, state}, password) {
            return new Promise((resolve, reject) => {
                passwordApi.updatePwd(state.userInfo.userId, password).then(res => {
                    if(res.success){
                        resolve(res);
                    }else{
                        reject(res.message);
                    }
                })
            })
        }
    }
}

export default user;