export default {
    namespaced: true,
    state: {
        vuexVal: '我是初始数据vuexVal'
    },
    mutations: {
        SET_VUEX_VAL (state, vuexVal) {
            state.vuexVal = vuexVal;
        }
    },
    actions: {
        setVuexVal ({commit}, vuexVal) {
            commit('SET_VUEX_VAL', vuexVal)
        }
    }
}