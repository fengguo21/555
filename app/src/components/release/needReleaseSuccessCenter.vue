<style lang="less" scoped>
.drug_infor {
    background-color: #fff;
    font-size: 14px;
    color: #000;
    line-height: 20px;
    padding-left: 15px;
    .inbox {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #E6E6E6;
        flex-wrap:wrap;
        .left {
            width: 85px;
            text-align: left;
        }
        .t_left{
            width: 70px;
            text-align: left;
        }
        .right {
            flex: 1;
            text-align: left;
        }
        .image{
            width:80px;
            margin-right:10px;
            img{
                width:80px;
                height:80px;
            }
        }
    }
}
.other_drug_infor{
    margin-top:15px;
}
</style>
<template>
    <div>
        <div class="drug_infor" v-show="words == '求购'">
            <div class="inbox">
                <div class="left">求购的品名：</div>
                <div class="right">{{infor.breedName}}</div>
            </div>
            <div class="inbox">
                <div class="left">求购的规格：</div>
                <div class="right">{{infor.spec}}</div>
            </div>
            <div class="inbox">
                <div class="left">求购的产地：</div>
                <div class="right">{{infor.location}}</div>
            </div>
            <div class="inbox">
                <div class="left">求购有效期：</div>
                <div class="right">{{infor.duedate | timeDays}}</div>
            </div>
            <div class="inbox">
                <div class="left">产品的要求：</div>
                <div class="right">{{infor.quality}}</div>
            </div>
        </div>
        <div class="drug_infor" v-show="words == '资源'">
            <div class="inbox">
                <div class="left">资源的品名：</div>
                <div class="right">{{infor.breedName}}</div>
            </div>
            <div class="inbox">
                <div class="left">资源的规格：</div>
                <div class="right">{{infor.spec}}</div>
            </div>
            <div class="inbox">
                <div class="left">资源的产地：</div>
                <div class="right">{{infor.location}}</div>
            </div>
            <div class="inbox">
                <div v-for="todo in infor.image" class="image">
                    <img :src="todo">
                </div>
            </div>
            <div class="inbox">
                <div class="left">资源的卖点：</div>
                <div class="right">{{infor.quality}}</div>
            </div>
        </div>
        <div class="drug_infor other_drug_infor" v-show="words == '资源'">
            <div class="inbox">
                <div class="t_left">数量：</div>
                <div class="right">{{infor.number}}{{infor.unit}}</div>
            </div>
            <div class="inbox">
                <div class="t_left">价格：</div>
                <div class="right">{{infor.price}}元/{{infor.unit}}</div>
            </div>
            <div class="inbox">
                <div class="t_left">样品数量：</div>
                <div class="right">{{infor.sampleNumber}}份</div>
            </div>
            <div class="inbox">
                <div class="t_left">样品价格：</div>
                <div class="right">{{infor.sampleAmount}}元/份</div>
            </div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import filters from '../../filters/filters.js'
export default {
    data() {
            return {

            }
        },
        props: {
            words: ''
        },
        computed: {
            infor() {
                return this.$store.state.release.needRelease
            }
        },
        methods: {

        },

        created() {

        },

}
</script>
