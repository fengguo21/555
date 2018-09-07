import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'
import './assets/css/my-mint.css';//全局修改mint-UI样式  
import common from "./common/common"
import vueTap from 'v-tap'
import store from './store'
import message2 from './components/popUpType/messageBoxs'
import filters2 from './filters/filters'

// src/main.js
import MessageBox from './components/MessageBox/index';
Vue.use(MessageBox);

// src/main.js
import MyPlugin from './components/MessageBox/boxDefault/boxDefault';
Vue.use(MyPlugin);


// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.use(vueTap);
Vue.use(Mint);
Vue.use(VueRouter)
Vue.use(VueResource);
//全局注册过滤器
Vue.filter('filters', filters2);
//全局注册提示框
Vue.component('message2', message2);
Vue.config.debug = true;

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

if (isWeiXin()) common.getWeixinSign(common.shareUrl);

function stopPropagation(e) {
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }
}
document.getElementsByTagName('div').touch = function(e) {
    stopPropagation(e);
}

document.getElementsByTagName("html")[0].style.fontSize = Math.floor(document.documentElement.clientWidth * 100000 / 32) / 100000 + "px";
const router = new VueRouter(
    configRouter // （缩写）相当于 routes: routes
)

function getCookie(name) {
    var search = name + '='
    var offset = document.cookie.indexOf(search)
    if (offset === -1) {
        return ''
    } else {
        offset += search.length
        var end = document.cookie.indexOf(';', offset)
        if (end === -1) {
            end = document.cookie.length
        }
        return (document.cookie.substring(offset, end))
    }
}


router.beforeEach((to, from, next) => {

   next()
})

router.afterEach(route => {
    if(route.name == "login"){
       
    console.log('mylogin')
   }
    common.share();
    Vue.nextTick(() => {

    });
});


Vue.http.interceptors.push((request, next) => {
    next((response) => {
        if (response.status == 403) {
            if (common.wxshow == true) {
                //微信登录的情况
                return router.push('/wchatLogin');
                //return common.getWxUrl();
            } else {
                //正常登录的情况
                return router.push('/login');
            }
        }
        return response
    })
});

//Vue.prototype.globalname='5.1.1';



new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')