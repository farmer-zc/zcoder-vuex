import router from '../router'
import store from '../store/index.js'

router.beforeEach((to, from, next) => {

    const token = store.state.user.token;

    if (!token) {
        if (to.path !== '/login') {
            next({path: '/login'});
        } else {
            next();
        }
    } else {
        if (to.path !== 'login') {
            const userInfo = store.state.user.userInfo;
            if (!userInfo) {
                store.dispatch('user/getUserInfo', store.state.user.token).then(res => {
                    console.log(res)
                    if (res.code == '1000000') {
                        next()
                    } else {
                        next({path: '/login'});
                    }
                });
            }else{
                next();
            }
        } else {
            next();
        }
    }
});