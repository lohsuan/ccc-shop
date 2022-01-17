import Vue from 'vue'
import Vuex from 'vuex'
import userStore from "./modules/userStore"
import productStore from "./modules/productStore"
import shoppingCartStore from "./modules/shoppingCartStore";
import discountStore from "./modules/discountStore";


Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: { userStore, productStore, shoppingCartStore, discountStore },
})
