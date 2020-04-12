import {getProductListApi} from './../../api/product'

const product = {
    namespaced: true,
    state: {
        productList: []
    },
    mutations: {
        SET_PRODUCT_LIST(state, productList) {
            state.productList = productList;
        }
    },
    actions: {
        getProductList ({commit, state}, {currentPage, pageNum}) {
            return new Promise((resolve, reject) => {
                getProductListApi(currentPage, pageNum).then(res => {
                    if(res.success){
                        commit('SET_PRODUCT_LIST', res.data)
                        resolve(res)
                    }else{
                        reject(res.message)
                    }
                })
            })
        }
    }
}

export default product