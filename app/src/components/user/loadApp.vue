<style lang="less" scoped>
.load_app {
    height: 65px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: row;
    align-items: center;
    @media screen {
        .logo {
            width: 40px;
            margin-left: 15px;
        }
        .title {
            color: #fff;
            text-align: left;
            font-size: 14px;
            margin-left: 8px;
            .last {
                //text-indent: 1em;
                text-align: left;
            }
        }
        @media (max-width: 320px) {
            .logo {
                width: 40px;
                margin-left: 10px;
            }
            .title {
                color: #fff;
                font-size: 12px;
                .last {
                    //text-indent: 1em;
                }
            }
        }
    }
    .button {
        background-color: rgba(250, 103, 5, 1);
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 15px;
        color: #fff;
    }
    .emtry {
        flex: 1;
    }
    .cancel {
        height: 17px;
        padding: 0 13px 0 13px;
    }
}
</style>
<template>
    <div class="load_app">
        <!-- <a href="#" id="openApp">贴吧客户端</a> -->
        <img src="/static/icon/load-app-logo.png" class="logo">
        <div class="title">
            <div>
                买卖药材就上药材
            </div>
            <div class="last">买卖网APP！</div>
        </div>
        <div class="emtry"></div>
        <div class="button" @click="loadIos">
            立即下载
        </div>
        <img src="/static/icon/close-app.png" alt="" class="cancel" @click="cancel">
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {

        }
    },
    props: {
        loadApps: {

        }
    },
    methods: {
        cancel() {
            let _self = this;
            this.loadApps.show = false;
            setTimeout(() => {
                _self.loadApps.show = true;
            }, 120000);
        },
        createIframe(){
            var iframe;
            return function(){
                if(iframe){
                    return iframe;
                }else{
                    iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    return iframe;
                }
            }
        },
        isIOS9() {
            //获取固件版本
            var getOsv = function () {
                var reg = /OS ((\d+_?){2,3})\s/;
                if (navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
                    var osv = reg.exec(navigator.userAgent);
                    if (osv.length > 0) {
                        return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
                    }
                }
                return '';
            };
            var osv = getOsv();
            var osvArr = osv.split('.');
            //初始化显示ios9引导
            if (osvArr && osvArr.length > 0) {
                if (parseInt(osvArr[0]) >= 9) {
                    return true
                }
            }
            return false
        },
        openApp() {
           
        },
        loadIos() {
            //window.location.href = 'YCMM://';
         
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
        }
    },
    created() {
        let _self = this;

    }

}
</script>

