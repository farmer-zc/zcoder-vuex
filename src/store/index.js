import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user.js'
import demo from './modules/demo.js'
import product from './modules/product.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    demo,
    product
  }
});
