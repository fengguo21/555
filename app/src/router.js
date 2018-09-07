//公共页面




import login from './views/user/login'
import home from './views/home'
import drugResTable from './views/drugResTable/drugResTable'
import drugHot from './views/drugResTable/drugHot'
import marketQuotation from './views/marketQuotation'
import provenanceSelection from './views/provenanceSelection'
import drugResTableDetail from './views/drugResTable/drugResTableDetail'
import transaction from './views/transaction'
import search from './views/search/search'
import lowPriceRes from './views/myResource/lowPriceRes'
import urgentNeed from './views/myNeed/urgentNeed'
import myAttention from './views/myAttention'
import drugmoney from './views/drugmoney'
import myResource from './views/myResource/myResource'
import findPassWord from './views/user/findPassWord'
import mySet from './views/user/mySet'
import revisePassWordConfirm from './views/user/revisePassWordConfirm'
import addressManage from './views/address/addressManage'
import addressRevise from './views/address/addressRevise'
import feedBack from './views/user/feedBack'
import code from './views/user/code'
import resourceDetail from './views/myResource/resourceDetail'
import detailsPage from './views/user/detailsPage'
import addAddress from './views/address/addAddress'

import aboutus from './views/staticsView/aboutus'
import copyright from './views/staticsView/copyright'
import profile from './views/staticsView/profile'
import protocolForYdb from './views/staticsView/protocolForYdb'
import protocolForYdbRule from './views/staticsView/protocolForYdbRule'
import YDBSteps from './views/staticsView/YDBSteps'


import requestCode from './views/user/requestCode'
import releaseSearch from './views/search/releaseSearch'
import news from './views/staticsView/news'
import cart from './views/cart/cart'
import multipleOrders from './views/cart/multipleOrders'
import allOrder from './views/order/allOrder'
import allOrderDetail from './views/order/allOrderDetail'
import drugThat from './views/staticsView/drugThat'
import account from './views/user/account'
import accountRevise from './views/user/accountRevise'
import subCompany from './views/staticsView/subCompany'
import oneStopService from './views/staticsView/oneStopService'
import fourAdvantages from './views/staticsView/fourAdvantages'
import protocol from './views/staticsView/protocol'
import codeExplain from './views/staticsView/codeExplain'
import wchatLogin from './views/user/wchatLogin'
import releaseNeeds from './views/myRelease/releaseNeeds'
import releaseResource from './views/myRelease/releaseResource'
import releaseSuccess from './views/myRelease/releaseSuccess'
import offerDetail from './views/myOffer/offerDetail'
import needDetails from './views/myNeed/needDetails'
import myNeeds from './views/myNeed/myNeeds'
import myOffer from './views/myOffer/myOffer'
import releaseOffer from './views/myRelease/releaseOffer'
import releaseOfferSuccess from './views/myRelease/releaseOfferSuccess'
import register from './views/user/register'
import bindphone from './views/user/bindphone'
import perfectObject from './views/user/perfectObject'
import perfectId from './views/user/perfectId'
import majorBusiness from './views/user/majorBusiness'
import message from './views/message/message'
import sayPriceNotice from './views/message/sayPriceNotice'
import orderNotice from './views/message/orderNotice'
import activityNotice from './views/message/activityNotice'
import intentionNotice from './views/message/intentionNotice'
import systemMessage from './views/message/systemMessage'
import personalStep1 from './views/authen/personalStep1'
import personalStep2 from './views/authen/personalStep2'
import authResult from './views/authen/authResult'
import authPhoto from './views/authen/authPhoto'
import companyAuth from './views/authen/companyAuth'
import yaodaibao from './views/yaodaibao'
import question from './views/question'

//components
import hello from './components/Hello'
import menu from './components/menu'
import express from './components/express/express'
import expressList from './components/express/expressList'
import trendChart from './components/echart/trendChart'
import echartYear from './components/echart/echartYear'
//import resource from './components/index/resource'

//qrcode
import qrcode from './components/qrcode/qrcode'

//药贷宝
import lendMoney from './views/lendMoney/lendMoney'
import applyLendStep from './views/lendMoney/applyLendStep'
import ydbApply from './views/lendMoney/ydbApply'


const scrollBehavior = (to, from, savedPosition) => {
    console.log(savedPosition);
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        // new navigation.
        // scroll to anchor
        if (to.hash) {
            return { anchor: true }
        }
        // explicitly control scroll position
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            return { x: 0, y: 0 }
        }
    }
}

module.exports = {
    // mode: 'history',
    base: __dirname,
    // scrollBehavior,
    routes: [
    	
    	//药贷宝
    	{ name: 'applyLendStep', path: '/applyLendStep', component: applyLendStep },
    	{ name: 'lendMoney', path: '/lendMoney', component: lendMoney },
    	{ name: 'ydbApply', path: '/ydbApply', component: ydbApply },
    
    
    	//components
    	{ name: 'express', path: '/express/:id', component: express },
    	{ name: 'expressList', path: '/expressList', component: expressList }, 
    	{ name: 'trendChart', path: '/trendChart/:id', component: trendChart }, 
    	{ name: 'echartYear', path: '/echartYear/:id', component: echartYear }, 
//  	{ name: 'resource', path: '/lowPriceRes', component: resource }, 
    	//qrcode
    	{ name: 'qrcode', path: '/qrcode/:id', component: qrcode },
    	
    	
        { name: 'login', path: '/login', component: login },
        { name: 'news', path: '/news', component: news },
        { name: 'home', path: '/home', component: home },
        { name: 'drugResTable', path: '/drugResTable', component: drugResTable },
        { name: 'drugHot', path: '/drugHot', component: drugHot },
        { name: 'marketQuotation', path: '/marketQuotation', component: marketQuotation },
        { name: 'provenanceSelection', path: '/provenanceSelection/:from', component: provenanceSelection },
        { name: 'drugResTableDetail', path: '/drugResTableDetail', component: drugResTableDetail },
        { name: 'transaction', path: '/transaction', component: transaction },
        { name: 'search', path: '/search', component: search },
        { name: 'lowPriceRes', path: '/lowPriceRes', component: lowPriceRes },
        { name: 'urgentNeed', path: '/urgentNeed', component: urgentNeed },
        { name: 'myAttention', path: '/myAttention', component: myAttention },
        { name: 'drugmoney', path: '/drugmoney', component: drugmoney },
        { name: 'myResource', path: '/myResource', component: myResource },
        { name: 'findPassWord', path: '/findPassWord', component: findPassWord },
        { name: 'mySet', path: '/mySet', component: mySet },
        { name: 'detailsPage', path: '/detailsPage', component: detailsPage },
        { name: 'revisePassWordConfirm', path: '/revisePassWordConfirm', component: revisePassWordConfirm },
        { name: 'addressManage', path: '/addressManage', component: addressManage },
        { name: 'addressRevise', path: '/addressRevise/:addreId', component: addressRevise },
        { name: 'feedBack', path: '/feedBack', component: feedBack },
        { name: 'addAddress', path: '/addAddress/:addreId', component: addAddress },
        { name: 'companyAuth', path: '/companyAuth', component: companyAuth },
        { name: 'personalStep1', path: '/personalStep1', component: personalStep1 },
        { name: 'personalStep2', path: '/personalStep2', component: personalStep2 },
        { name: 'authResult', path: '/authResult', component: authResult },
        { name: 'resourceDetail', path: '/resourceDetail/:sourceId', component: resourceDetail },
        
        
        { name: 'protocolForYdbRule', path: '/protocolForYdbRule', component: protocolForYdbRule },
        { name: 'protocolForYdb', path: '/protocolForYdb', component: protocolForYdb },
        { name: 'aboutus', path: '/aboutus/:from', component: aboutus },
        { name: 'copyright', path: '/copyright/:from', component: copyright },
        { name: 'profile', path: '/profile/:from', component: profile },
        { name: 'YDBSteps', path: '/YDBSteps', component: YDBSteps },
         { name: 'yaodaibao', path: '/yaodaibao', component: yaodaibao },
          { name: 'yaodaibao', path: '/question', component: question },
        
        { name: 'requestCode', path: '/requestCode', component: requestCode },
        { name: 'releaseSearch', path: '/releaseSearch', component: releaseSearch },
        { name: 'cart', path: '/cart', component: cart },
        { name: 'multipleOrders', path: '/multipleOrders', component: multipleOrders },
        { name: 'allOrder', path: '/allOrder', component: allOrder },
        { name: 'allOrderDetail', path: '/allOrderDetail/:allOrderId', component: allOrderDetail },
        { name: 'drugThat', path: '/drugThat/:from', component: drugThat },
        { name: 'account', path: '/account', component: account },
        { name: 'accountRevise', path: '/accountRevise/:id', component: accountRevise },
        { name: 'subCompany', path: '/subCompany', component: subCompany },
        { name: 'oneStopService', path: '/oneStopService', component: oneStopService },
        { name: 'fourAdvantages', path: '/fourAdvantages', component: fourAdvantages },
        { name: 'protocol', path: '/protocol/:from', component: protocol },
         { name: 'codeExplain', path: '/codeExplain/:from', component: codeExplain },
        { name: 'wchatLogin', path: '/wchatLogin', component: wchatLogin },
        { name: 'releaseNeeds', path: '/releaseNeeds/:id', component: releaseNeeds },
        { name: 'releaseResource', path: '/releaseResource/:id', component: releaseResource },
        { name: 'releaseSuccess', path: '/releaseSuccess', component: releaseSuccess },
        { name: 'offerDetail', path: '/offerDetail/:id', component: offerDetail },
        { name: 'needDetails', path: '/needDetails/:id', component: needDetails },
        { name: 'myNeeds', path: '/myNeeds', component: myNeeds },
        { name: 'myOffer', path: '/myOffer', component: myOffer },
        { name: 'releaseOffer', path: '/releaseOffer/:id', component: releaseOffer },
        { name: 'releaseOfferSuccess', path: '/releaseOfferSuccess', component: releaseOfferSuccess },
        { name: 'register', path: '/register', component: register },
        { name: 'bindPhone', path: '/bindphone', component: bindphone },
        { name: 'perfectObject', path: '/perfectObject', component: perfectObject },
        { name: 'perfectId', path: '/perfectId', component: perfectId },
        { name: 'majorBusiness', path: '/majorBusiness', component: majorBusiness },
        { name: 'message', path: '/message', component: message },
        { name: 'sayPriceNotice', path: '/sayPriceNotice', component: sayPriceNotice },
        { name: 'orderNotice', path: '/orderNotice', component: orderNotice },
        { name: 'activityNotice', path: '/activityNotice', component: activityNotice },
        { name: 'intentionNotice', path: '/intentionNotice', component: intentionNotice },
        { name: 'systemMessage', path: '/systemMessage', component: systemMessage },
        { name: 'authPhoto', path: '/authPhoto', component: authPhoto },
        { name: 'code', path: '/code', component: code },
        { path: '*', redirect: '/home' }
    ]
}