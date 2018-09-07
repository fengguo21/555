<template>
    <div class="open_app" v-show="show">
        <div class="box">
            <div class="clogo">
                <img src="/static/icons/err.png">
            </div>
            <div class="tlogo">药材买卖网APP</div>
            <div @click="goApp()" class="go_app">打开APP</div>
        </div>
        <img src="/static/icons/close.png" @click="killIt()">
    </div>
</template>
<script>
export default {
    data() {
            return {
                show: true
            }
        },
        props: {
            id: ''
        },
        methods: {
            goApp() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (isiOS) {
                    window.location.href = 'YCMM://push/YCMMDemandDetailViewController?intentionID=' + this.id;
                }
                if (isAndroid) {
                    window.location.href = 'mianguan://yaocaimaimai.yaocaimaimai'
                }

            },
            killIt() {
                this.show = false;
            }
        }

}
</script>
<style scoped>
.open_app {
    position: fixed;
    bottom: 41px;
    left: 0;
    z-index: 10000;
    width: 100%;
    box-sizing: border-box;
    height: 70px;
}

.open_app>img {
    width: 15px;
    height: 15px;
    position: fixed;
    bottom: 94px;
    left: 0px;
    box-sizing: border-box;
}

.tlogo {
    float: left;
}

.clogo {
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
}

.clogo img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.go_app {
    float: right;
    width: 90px;
    height: 40px;
    box-sizing: border-box;
    background: #ff8201;
    color: white;
    line-height: 40px;
    border-radius: 10px;
    margin-top: 15px;
}

.open_app .box {
    box-sizing: border-box;
    border-radius: 4px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    line-height: 70px;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 16px;
}
</style>
