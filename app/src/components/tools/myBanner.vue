<template>
    <div class="tbox">
        <div class="title">
            {{param.title}}
        </div>
        <div class="logo">
            <img src="/static/images/company-logo.png">
            <div class="logo_right">
                <div class="name">药材买卖网</div>
                <div class="time">{{param.time}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {}
        },
        props: {
            param: {

            }
        },
        methods: {

        },
        created() {

        },
        mounted() {
            // this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
        }
}
</script>
<style scoped>
.tbox {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
    margin-top: 30px;
}

.tbox .title {
    font-size: 18px;
    font-weight: 600;
    color: #000;
    text-align: left;
}

.tbox .logo {
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    margin-top: 12px;
}

.tbox .logo img {
    width: 42px;
    height: 42px;
}

.tbox .logo .logo_right {
    flex: 1;
    text-align: left;
    height: 42px;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.tbox .logo .logo_right>div {
    flex: 1;
    font-size: 12px;
}

.tbox .logo .logo_right .name {
    padding-top: 5px;
}
</style>
