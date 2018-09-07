import httpService from '../../common/httpService.js'
import common from '../../common/common.js'


const state = {
    photoList: []
}

// getters
const getters = {
    photoList: state => state.photoList
}

// actions
const actions = {
    getPhoto({ commit, state }, param) {
        commit('getPhoto', param)
        console.log(param)
    },
    removePhoto({ commit, state }){
        commit('removePhoto')
    }

}

// mutations
const mutations = {
    removePhoto(state){
        state.photoList = [];
    },
    getPhoto(state, param) {
        console.log(param);
        for (var i = 0; i < param.length; i++) {
            switch (param.category) {
                case 0:
                    param.name = '手持身份证照';
                    break;
                case 1:
                    param.name = '身份证正面';
                    break;
                case 2:
                    param.name = '身份证反面';
                    break;
                case 3:
                    param.name = '工商营业执照';
                    break;
                case 4:
                    param.name = '组织机构代码证';
                    break;
                case 5:
                    param.name = '税务登记证';
                    break;
                case 6:
                    param.name = '银行开户许可证';
                    break;
                case 7:
                    param.name = 'GMP资质证书';
                    break;
                case 8:
                    param.name = 'GSP资质证书';
                    break;
                case 9:
                    param.name = '三证合一';
                    break;
                case 10:
                    param.name = '银行开户许可证';
                    break;
                case 11:
                    param.name = 'GMP资质证书';
                    break;
                case 12:
                    param.name = 'GSP资质证书';
                    break;
                case 13:
                    param.name = '生产许可证';
                    break;
                case 14:
                    param.name = '生产许可证';
                    break;
            }
        }
        state.photoList = param;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}
