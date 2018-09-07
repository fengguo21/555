<style lang="less" scoped>
.title_box {
    padding-left: 15px;
    background-color: #fff;
    .inbox {
        display: flex;
        flex-direction: row;
        line-height: 15px;
        text-align: left;
        border-bottom: 1px solid #E6E6E6;
        padding: 15px 15px 15px 0;
    }
    .last{
        border-bottom:none;
    }
    .left {
        font-size: 15px;
        color: #343434;
        width: 80px;
    }
    .right {
        flex:1;
        font-size: 14px;
        color: #494949;
        word-break:break-all;
    }
}
</style>
<template>
    <div>
        <div class="title_box" v-if="tab == '2'">
            <div class="inbox">
                <div class="left">产品信息</div>
                <div class="right">{{obj.newOffer.quality}}</div>
            </div>
        </div>
        <div class="title_box" v-if="tab == '2'">
            <div class="inbox">
                <div class="left">备注信息</div>
                <div class="right">{{obj.newOffer.priceDescription}}</div>
            </div>
        </div>
        <div class="title_box" v-if="tab == '3'">
            <div class="inbox">
                <div class="left">产品信息</div>
                <div class="right">{{obj.quality}}</div>
            </div>
        </div>
        <div class="title_box" v-if="tab == '3'">
            <div class="inbox">
                <div class="left">备注信息</div>
                <div class="right">{{obj.priceDescription}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import filters from '../../filters/filters'
export default {
    data() {
            return {

            }
        },
        props: {
            tab:'',
            obj:{

            }
        },
        components: {

        },
        methods: {

        },
        mounted() {

        },
        created() {

        }


}
</script>
