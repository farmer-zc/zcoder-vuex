// 第一种导出方式
import request from '@/common/request'

export function login(username, password) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            username,
            password
        }
    });
}

export function getUserInfo(token) {
    return request({
        url: `/getUserInfo/${token}`,
        method: 'get'
    });
}

export function logout(token){
    return request({
        url: '/logout',
        method: 'post',
        data: {
            token
        }
    });
}


