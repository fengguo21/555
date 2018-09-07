<template>
    <div class="news">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
                <div class="swipe_height">
                    <!-- <img v-bind:src="banner.imgUrl">
                        <p>{{banner.title}}</p> -->
                    <!-- <swiper :options="swiperOption">
                        <swiper-slide> -->
                    <a @click="jump(todo.linkUrl)" v-for="(todo,index) in list" v-show="index == 0">
                        <img v-bind:src="todo.imgUrl">
                        <p>{{todo.title}}</p>
                    </a>
                    <!--   </swiper-slide>
                    </swiper> -->
                </div>
                <!--  <div class="report">
                     公司报道
                </div> -->
                <ul class="main">
                    <li v-for="todo in list" @click="jump(todo.linkUrl)">
                        <div class="inbox">
                            <img v-bind:src="todo.imgUrl">
                            <div class="title">
                                <p class="title_head">{{todo.title}}</p>
                                <div class="title_content">{{todo.intro}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper'
export default {
    data() {
            return {
                banner: {

                },
                list: [],
                obj: '',
                swiperOption: {
                    autoplay: 3500,
                    setWrapperSize: true,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    mousewheelControl: true,
                    observeParents: true,
                },
                params: {
                    pn: 1,
                    pSize: 10,
                },
                topStatus: '',
                wrapperHeight: 0,
                allLoaded: false,
                bottomStatus: '',

            }
        },
        created() {
            let _self = this;
            _self.getHttp();
        },
        components: {
            swiper,
            swiperSlide
        },
        methods: {
            getHttp(back) {
                let _self = this;
                common.$emit('show-load');
                httpService.myAttention(common.urlCommon + common.apiUrl.most, {
                    biz_module: 'pushService',
                    biz_method: 'weCahtCompanyNewsList',
                    biz_param: _self.params
                }, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {

                        //_self.banner = suc.data.biz_result.banners;
                        //console.log(suc.data.biz_result.banners)

                        //_self.list = suc.data.biz_result.list;

                        if (_self.params.pn == 1) {
                            _self.list.splice(0, _self.list.length);
                        }
                        let result = suc.data.biz_result.list;
                        if (suc.data.code == '1c01') {
                            for (var i = 0; i < result.length; i++) {
                                _self.list.push(result[i]);
                            }
                        } else {
                            common.$emit('message', suc.data.msg);
                        }
                        if (result.length < _self.params.pSize) {
                            _self.allLoaded = true;
                        }

                        if (back) {
                            back();
                        }

                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                    if (back) {
                        back();
                    }
                })
            },
            jump(linkUrl) {
                if (linkUrl) window.location.href = linkUrl;
            },
            loadBottom(id) {
                let _self = this;
                setTimeout(() => {
                    if (this.list.length < this.params.pn * this.params.pSize) {
                        this.allLoaded = true;
                    } else {
                        this.params.pn++;
                        this.getHttp(function() {
                            _self.$refs.loadmore.onBottomLoaded(id);
                        });
                    }
                }, 500);

            },
            loadTop(id) {
                let _self = this;
                setTimeout(() => {
                    _self.params.pn = 1;
                    _self.getHttp(function() {
                        _self.$refs.loadmore.onTopLoaded(id);
                    });
                }, 500);

            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        }
}
</script>
<style scoped>
.news {}

.news .swipe_height {
    height: 280px;
    width: 100%;
    position: relative;
}

.news .swipe_height p {
    position: absolute;
    bottom: 20px;
    font-size: 20px;
    color: white;
    white-space: nowrap;
    margin-left: 5%;
}

.news .swipe_height img {
    height: 280px;
    width: 100%;
}

.news .report {
    width: 100%;
    text-align: center;
    font-size: 16px;
    padding: 10px;
    color: green;
    background: #F2F2F2;
    border-bottom: 1px solid #DEDDE0;
}

.news .main {
    padding-bottom: 10px;
    width: 100%;
}

.news .main li {
    padding: 10px 0px 0px 4%;
}

.news .main li .inbox {
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #DEDDE0;
    overflow: hidden;
}

.news .main li .inbox img {
    height: 50px;
    width: 20%;
}

.news .main li .inbox .title {
    float: right;
    width: 76%;
    text-align: left;
    margin-top: 3px;
    height: 50px;
    overflow: hidden;
}

.news .main li .inbox .title .title_head {
    float: left;
    font-size: 14px;
    line-height: 15px;
    width: 98%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #000000;
    font-weight: bold;
}

.news .main li .inbox .title .title_content {
    float: left;
    width: 98%;
    font-size: 12px;
    line-height: 15px;
    margin-top: 5px;
    overflow: hidden;
}
</style>
