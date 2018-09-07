<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
    background-color: #fff;
}
				
.release_title {
	margin-top: -1px;
    .box {
        background-color: #FBFBF6;
        height: 48px;
        padding: 0 0 0 15px;
        line-height: 48px;
        display: flex;
        flex-direction: row;
        &.white{
        	background-color: #fff;
        	border-radius:  15px 15px 0 0;
        	border-bottom: 1px solid #e6e6e6;
        }
        &.noborder{
        	border-bottom: 0;
        }
        img {
            height: 20px;
            margin-top: 14px;
        }
        .title {
            font-size: 16px;
            color: #7BB157;
            padding-left: 5px;
            &.orange{
            	color: #FF8201;
            }
        }
        .word {
            color: #999999;
            font-size:10px;
        }
        .offer_num{
            color:#333333;
            /*width: 110px;*/
            background: url(../../../static/icon/list/listbac.png) no-repeat;
            background-size: 100% 31px;
            margin: 10px -8px 0 0;
            height: 31px;
            font-size:12px;
            line-height: 28px;
            color: #fff;
            padding: 0 5px;
            .person{
            	vertical-align: top;
            	margin: 7px 5px  0 5px ;
            	width: 20px;
            	height: 14px;
            }
        }
    }
}
</style>
<template>
    <div class="release_title">
        <div class="box white" v-if="tab == '1'">
            <img src="/static/icon/need-title.png">
            <div class="title">基本信息</div>&nbsp;
        </div>
        <div class="box  white" v-if="tab == '2'">
            <img src="/static/icon/history.png">
            <div class="title">产品信息</div>&nbsp;
            <!--<div class="word">(请至少上传一张图片，图片越多越真实)</div>-->
        </div>
        <div class="box" v-if="tab == '3'">
            <img src="/static/icon/need-title.png">
            <div class="title">求购信息</div>&nbsp;
            <div class="offer_num">(已报价<span>{{obj.content.offer}}</span>人)</div>
        </div>
        <div class="box  white noborder" v-if="tab == '4'">
            <img src="/static/icon/new-offer.png">
            <div class="title">最新报价</div>&nbsp;
        </div>
        <div class="box" v-if="tab == '5'">
            <img src="/static/icon/history.png">
            <div class="title">历史报价</div>&nbsp;
        </div>
        <div class="box  white" v-if="tab == '6'">
            <img src="../../../static/icon/list/need-title.png">
            <div class="title orange">交收要求</div>&nbsp;
        </div>
         <div class="box white" v-if="tab == '7'">
            <img src="/static/icon/product-infor.png">
            <div class="title">药材图片</div>&nbsp;
        </div>
        <div class="box white" v-if="tab == '8'">
            <img src="../../../static/icon/list/need-title.png">
            <div class="title orange">求购信息</div>&nbsp;
            <div style="flex: 1;"></div>
            <div class="offer_num"><img src="../../../static/icon/list/person.png" class="person" />已报价<span>{{obj.offer}}</span>人</div>
        </div>
         <div class="box white" v-if="tab == '9'">
            <img src="../../../static/icon/list/need-title.png">
            <div class="title orange">产品信息</div>
        </div>
        
        <div class="box white" v-if="tab == '10'">
            <img src="../../../static/icon/list/need-title.png">
            <div class="title orange">参考图片</div>
        </div>
        
        <div class="box white" v-if="tab == '11'">
            <img src="../../../static/icon/list/need-title.png">
            <div class="title orange">交货要求</div>
        </div>
        
    </div>
</template>
<script>
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
        methods: {


        },
        components: {

        },
        created() {

        },
        mounted() {

        }
}
</script>
