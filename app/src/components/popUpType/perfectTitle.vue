<style lang="less" scoped>
.certification {
    
    width: 100%;
    height: 30px;
    background-color: #FFF8E2;
    display: flex;
    flex-direction: row;
    position: relative;
    .horn {
        width: 17px;
        height: 16px;
        position: absolute;
        left: 10px;
        top: 7px;
    }
    @media screen {
        .titles {
            font-size: 12px;
            color: #F64F00;
            text-align: left;
            line-height: 30px;
            margin-left: 33px;
        }
        @media (max-width: 320px) {
            .titles {
                font-size: 10px;
                color: #F64F00;
                text-align: left;
                line-height: 30px;
                margin-left: 33px;
            }
        }
    }
    .close {
        width: 14px;
        height: 14px;
        position: absolute;
        right: 10px;
        top: 8px;
    }
}
</style>
<template>
    <div class="certification" v-show="param.myTitle" @click="perfectMessage">
        <img src="/static/icon/horn.png" class="horn">
        <div class="titles">想提高报价的成功率吗？赶紧点击认证吧！</div>
        <img src="/static/icon/close.png" class="close" @click.stop="closeTitle">
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
            return {
                myTitle: true,   
            }
        },
        props:{
            param:{

            }
        },
        computed: {
            userInfor() {
                return this.$store.state.user.userInfor;
            }
        },
        methods: {
            closeTitle() {
                let _self = this;
                _self.param.myTitle = false;
            },
            perfectMessage() {
                let _self = this;
                if (_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
                        function perfect() {
                            _self.$router.push('/perfectObject');
                        }
                        this.$msgBox.showMsgBox({
								title: '信息完善',
								content: '您的信息还未完善，现在去完善吗？',
								isShowCancelImg: '/static/icon/list/miao1.png',
								isShowCancelBtn:false,
								confirmBtnText:'去完善'
							}).then(async(val) => {
								perfect()
							}).catch(() => {});
                        return;
                }
                _self.param.selectType = true;
            }
        },
        created() {
            let _self = this;
            
        },
        
}
</script>
