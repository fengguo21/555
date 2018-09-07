<template>
    <div class="sub_company">
        <div class="box">
            <myBanner :param="param"></myBanner>
            <div class="chinese_map">
                <img src="/static/images/chinese-map.png">
            </div>
            <div class="list">
                <div class="item" v-for="todo in arr">
                    <div class="top">
                        <img src="/static/icons/sub-company-logo.png">
                        <div class="tname">{{todo.name}}</div>
                    </div>
                    <div class="content">
                        {{todo.content}}
                    </div>
                    <div class="right">
                        <div class="address">
                            <span>地址:</span>{{todo.address}}
                        </div>
                        <div class="address">
                            <span>电话:</span>{{todo.tel}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import myBanner from '../../components/tools/myBanner'
export default {
    data() {
            return {
                wrapperHeight: '',
                show: true,
                my_header: {
                    name: '详情',
                },
                param: {
                    title: '五大药市子公司，盛大开业',
                    time: '2017-4-15 15:00'
                },
                arr: [{
                    name: '安国市东璧中药材经营有限公司',
                    content: '药材买卖网总部全国化战略部署子公司之一在安国，其重要考虑是安国市场覆盖了内蒙、东北三省和河北的大部分药材品种，并且靠近北京、天津，是重要的销地。这样有利于我们更好的掌握一手资讯及优质药材，服务于客户。',
                    address: '河北省安国市保衡北大街87号',
                    tel: '0321-3510209'
                }, {
                    name: '玉林东璧中药材有限公司',
                    content: '综合考虑，药材买卖网总部全国化战略部署子公司之一在玉林的原因是为了依靠专业市场 紧抓产地资源和进口香料货源。为了更好更快速的帮助企业找货、卖货。',
                    address: '广西省玉林市中药港12#A11',
                    tel: '0775-2820086'
                }, {
                    name: '成都市东璧本草中药材有限责任公司',
                    content: '药材买卖网总部全国化战略部署子公司之一在成都，是看中了成都市场的药材品种繁多，需求量大两大优势，其目的也是在把控药材质量的前提下有效地客户多元化的需求。',
                    address: '四川省成都市金牛区天回镇木龙湾社区四季天街第三幢239号',
                    tel: '028-64206689'
                }, {
                    name: '定西市东璧本草中药材有限公司',
                    content: '药材买卖网总部全国化战略部署子公司之一在甘肃首阳，其主要特点是该市场存在的三个优势即1品种具有代表性 2 资源相对集中  3种植面积成规模.',
                    address: '定西市陇西县首阳镇药材市场8号楼19-20',
                    tel: '0932-6636798'
                }]

            }
        },
        components: {
            myBanner
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
.sub_company {}

.sub_company .chinese_map {
    margin-top: 30px;
    width: 100%;
    height: 258px;
}

.sub_company .box {
    padding: 0 15px;
}

.sub_company .chinese_map img {
    width: 100%;
    height: 100%;
}

.sub_company .box .list {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 40px;
}

.sub_company .box .list .item {
    box-sizing: border-box;
    margin-top: 20px;
}

.sub_company .box .list .item .top {
    display: flex;
    flex-direction: row;
}

.sub_company .box .list .item .top img {
    width: 55px;
    height: 30px;
}

.sub_company .box .list .item .top .tname {
    font-size: 17px;
    color: #ff8201;
    line-height: 30px;
    margin-left: 5px;
    text-align: left;
}
</style>
