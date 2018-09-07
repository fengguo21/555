<style lang="less" scoped>
.market_nav {
    position: relative;
    height: 46px;
    .white {
        position: absolute;
        height: 13px;
        background-color: #fff;
        z-index: 300;
        overflow-x: scroll;
        overflow-y: hidden;
        bottom: 2px;
    }
    .sort {
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        height: 46px;
        position: relative;
        .box {
            background-color: #fff;
            display: flex;
            flex-direction: row;
            align-items: center;
            .item {
                width: 25vw;
                font-size: 16px;
                color: #000;
                height: 45px;
                line-height: 46px;
                .inbox {
                    width: 80%;
                    height: 46px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .active {
                    border-bottom: 3px solid #ff8201;
                    color: #ff8201;
                }
            }
        }
    }
}
</style>
<template>
    <div class="market_nav">
        <div class="white" :style="{width:wrapperWidth + 'vw'}">
        </div>
        <div class="sort">
            <div class="box" ref="wrapper" :style="{width:wrapperWidth + 'vw'}">
                <div class="item" v-for="(todo,index) in personArr" @click="select(todo,index)">
                    <div class="inbox" v-bind:class="{active:personArr[index].show}">
                        {{todo.name}}
                    </div>
                </div>
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
        wrapperWidth: '',
        personArr: '',
        scrollLeft: ''
    },
    components: {

    },
    methods: {
        select(todo, index) {
            let _self = this;
            console.log(11)
            for (var i = 0; i < _self.personArr.length; i++) {
                _self.personArr[i].show = false;
            }
            _self.personArr[index].show = true;
            this.$emit('selectHttp',index)
        },
        getScrollTop() {
            this.$refs.wrapper.scrollLeft = this.scrollLeft;
        },
    },
    created() {

    },
    mounted() {
        console.log(99, this.$refs.wrapper.scrollLeft)
        //this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
    }
}
</script>

