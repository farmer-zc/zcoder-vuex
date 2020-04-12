// 第二种导出方式
import request from '@/common/request'

export default {

    // 校验密码, userId, password 旧密码
    checkPassword (userId, password) {
        return request({
            url: '/checkPassword',
            method: 'post',
            data: {
                userId,
                password
            }
        })
    },

    // 修改密码userId 用户ID, password 新密码
    updatePwd (userId, password) {
        return request({
            url: '/updatePwd',
            method: 'post',
            data: {
                userId,
                password
            }
        })
    }
}