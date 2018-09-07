import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import release from './modules/release'
import authen from './modules/authen'
import anOffer from './modules/anOffer'
import address from './modules/address'
//import order from './modules/order'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        cart,
        user,
        release,
        authen,
        anOffer,
        address,
//      order
    },
    strict: debug
})