<style lang="less" scoped>
	.drug_table {
		.box {
			overflow: auto;
			background: #fff;
		}
		.swiper {
			height: 110px;
			background-color: #f3f3f3;
			padding: 10px 0 0;
			img {
				width: 100%;
				height: 100px;
			}
		}
		.hotDrug {
			background-color: #f3f3f3;
			padding-top: 10px;
			&>p {
				text-align: left;
				background-color: #fff;
				padding: 10px 0.7692rem;
				border-bottom: 1px solid #eee;
				span {
					float: right;
				}
			}
		}
		/*轮播下部分*/
		.hotDrug_swiper {
			overflow: auto;
			background-color: #fff;
			ul {
				margin: 0;
				padding: 0;
				width: 5000px;
				li {
					list-style: none;
					width: 100px;
					height: 100px;
					position: relative;
					overflow: hidden;
					float: left;
					margin: 10px;
					img {
						width: 100px;
						min-height: 100px;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
					p {
						position: absolute;
						text-align: center;
						width: 100%;
						bottom: 0;
						margin: 0;
						color: #555;
						background: rgba(255, 255, 255, 0.8);
					}
				}
			}
		}
		/*热门品种*/
		.hot_drugs {
			background-color: #fff;
			/*height: 280px;*/
			text-align: center;
			padding-left: 2%;
			padding-bottom: 1.5384rem;
			.hot_drug {
				display: inline-block;
				position: relative;
				width: 45%;
				float: left;
				margin: 0.7692rem 0 0 2.5%;
				img {
					width: 100%;
				}
				p {
					position: absolute;
					color: #555;
					margin: 15px 0 0 10px;
					width: 85%;
					height: 16px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					line-height: 16px;
					text-align: left;
					&:nth-child(2) {
						margin: 35px 0 0 10px;
						color: #777;
						font-size: 13px;
					}
				}
			}
			.clear {
				clear: both;
				height: 0;
				line-height: 0;
				font-size: 0
			}
		}
		/*}*/
	}
</style>

<template>
	<div class="drug_table">
		<iosHead :param="param"></iosHead>
		<div class="box" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<!--图片轮播-->
			<div class="swiper">
				<mt-swipe :auto="4000" :prevent="false">
					<mt-swipe-item v-for="(item,index) in imgbanner">
						<img v-bind:src="item.appImg" @click="jumpDetail(item.name)">
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<!--热门药材-->
			<div class="hotDrug">
				<p @click="jump('/drugHot')">热门药材<span>></span></p>
				<div class="hotDrug_swiper">
					<ul>
						<li v-for="item in obj" @click="jumpDetail(item.name)">
							<img :src="item.icon">
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
			</div>
			<!--热门品种-->
			<div class="hotDrug" v-if="$route.query.from == 'web'">
				<p>热门品种</p>
				<div class="hot_drugs">
					<div class="hot_drug" v-for="todo in todos" v-on:click="jumpRes(todo)">
						<p v-html="todo.keyWord" class="image"></p>
						<p v-html="todo.eName" class="image"></p>
						<img :src="todo.hotImg" />
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import iosHead from '../../components/header/iosHead'
	import httpService from '../../common/httpService.js'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		data() {
			return {
				param: {
					name: '药材百科',
					router: 'home',
					appBack: true,
					type: 'my',
					search: '1'
				},
				type: '',
				wrapperHeight: '',
				headHeight: '',
				showHead: true,
				todos: [],
				datas: [],
				title: 'test',
				obj: {},
				detail_obj: {},
				imgbanner: {}
			}
		},
		created() {
			let _self = this;
			_self.hotKeySearch();
			_self.hotDrug();
			_self.myBanner();
			let from = _self.$route.params.from;
			console.log(from);
			if(from == 'ios') {
				_self.param.type = 'ios';
				_self.param.appBack = true;
			} else if(from == 'android') {
				_self.param.type = 'android';
				_self.param.appBack = true;
			} else {
				_self.param.appBack = false;
			}
		},
		components: {
			iosHead,
			swiper,
			swiperSlide
		},
		methods: {
			//---------------------跳转热门药材全部请求----------------------；
			jump(index) {
				this.$router.push(index);
			},
			//----------------------这里是热门药材请求-----------------------
			hotDrug() {
				let _self = this;
				httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
					biz_module: 'breedService',
					biz_method: 'hotDrugPropertiesInfo',
					biz_param: {
						pn: 1,
						pSize: 10
					}
				}, function(suc) {
					let result = suc.data.biz_result.list;
					if(suc.data.code == '1c01') {
						_self.obj = result;
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('message', err.data.msg);
				})
			},
			//------------------这里是轮播图的请求---------------------------
			myBanner() {
				let _self = this;
				httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
					biz_module: 'herbBannerService',
					biz_method: 'queryBannerList',
					biz_param: {
						type: 1
					}
				}, function(suc) {
					let result = suc.body.biz_result.list;
					_self.imgbanner = result;

				}, function(err) {})
			},
			//------------------------这里是热门品种请求-------------------------------
			hotKeySearch() {
				let _self = this;
				httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
					biz_module: 'searchKeywordService',
					biz_method: 'queryHotSearchList',
					biz_param: {
						pn: 1,
						pSize: 6
					}
				}, function(suc) {
					let result = suc.data.biz_result.list;
					if(suc.data.code == '1c01') {
						_self.todos = result;
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('message', err.data.msg);
				})
			},
			getValue: function(param) {
				this.title = param;
			},
			jumpBack: function() {
				window.back();
			},
			//-----------------------跳转详情页请求-----------------------
			jumpDetail(name) {
				let _self = this;
				common.$emit("informdrugDetail", name); //通知药性表详情刷新
				_self.$router.push('/drugResTableDetail?name=' + name);
			},
			//-------------------跳转搜索热门品种页面---------------
			jumpRes(item) {
				console.log(item);
				let _self = this;
				common.$emit("setParam", 'lowPrice', item);
				common.$emit("lowPriceRes", item);
				_self.$router.push('/lowPriceRes');
			}
		},
		mounted() {
			let _self = this;
			_self.wrapperHeight = window.screen.height - _self.$refs.wrapper.getBoundingClientRect().top;
			setTimeout(function() {
				window.back = function() {
					try {
						if(_self.type == 'ios') {
							window.webkit.messageHandlers.AppModel.postMessage({
								body: 'iosResult'
							});
						} else {
							window.Android.back();
						}
					} catch(e) {
						window.history.go(-1);
					}
				}
				window.jumpSearch = function() {
					try {
						if(_self.type == 'ios') {
							window.webkit.messageHandlers.AppModel.postMessage({
								body: 'ios'
							});
						} else {
							window.Android.jumpSearch();
						}
					} catch(e) {
						console.log(e);
					}
				}
				window.getValue = function(param) {
					_self.getValue(param);
				}
				var iframe = document.createElement('iframe')
				iframe.style.visibility = 'hidden'
				iframe.style.width = '1px'
				iframe.style.height = '1px'
				iframe.onload = function() {
					setTimeout(function() {
						document.body.removeChild(iframe)
					}, 0)
				}
				document.body.appendChild(iframe)
			}, 0)
		}
	}
</script>