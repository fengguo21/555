<style lang="less" scoped>
	.low_price {
		height: 100vh;
		.fixed {
			position: fixed;
			width: 100%;
			z-index: 2;
			background: #fff;
		}
	}
	
	.mint-loadmore-top span {
		display: inline-block;
		transition: .2s linear;
		vertical-align: middle;
	}
	
	.mint-loadmore-bottom span {
		display: inline-block;
		transition: .2s linear;
		vertical-align: middle;
	}
	
	.low_price .fixed .search_content {
		width: 100%;
		background: #ff8201;
		position: relative;
		z-index: 2;
	}
	
	.low_price .go-back {
		position: absolute;
		width: 15%;
		padding-right: 5%;
		height: 50px;
		border-bottom: 1px solid #ccc;
		background: #ff8201;
	}
	
	.low_price {
		overflow: hidden;
		.main {
			width: 100%;
			padding-top: 90px;
			overflow-y: scroll;
		}
		.factory {
			background-color: #fff;
			display: flex;
			flex-direction: row;
			width: 100%;
			padding: 5px 10px;
			border-bottom: 1px solid #E6E6E6;
			.left {
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 13px;
				color: #4D4D4D;
				border: 1px solid #E4E4E4;
				border-radius: 15px;
				padding: 0px 20px;
				margin-right: 10px;
			}
			.active {
				border: 1px solid #ff8201;
				color: #ff8201;
			}
		}
	}
</style>
<template>
	<div class="low_price">
		<div class="fixed">
			<div @click="jumpSearch" class="search_content">
				<longSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" :param="myShow"></longSearch>
			</div>
			<sort v-on:postId="getId" v-on:initial="initial" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<!--数据-->
				<resourceList :param='todos' :httpPraram='httpPraram'></resourceList>
				
				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
					<span v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
					<span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
				</div>
			</mt-loadmore>
		</div>
		<errPage :param="err" v-show="todos.length==0"></errPage>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import sort from '../../components/tools/sort'
	import resourceList from './resourceList'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import headFix from '../../components/header/head'
	import longSearch from '../../components/tools/longSearch'
	import errPage from '../../components/tools/err'
	import filters from '../../filters/filters'
	export default {
		data() {
			return {
				scrollTop: 0,
				isAttention: 0,
				myShow: {
					myShow: false,
					mycart: false,
					resource: true,
					myMessage: true,
					back: true,
					goBack: false
				},
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png',
				},
				sortRouter: 'lowRes',
				sortArr: [{
					name: '用户类型',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '用户类型',
					class: 'sort_content_detail',
					sortArr: [{
						name: '全部',
						asc: '',
						show: false,
						user_type: -1,
						key: 'user_type'
					}, {
						name: '未认证',
						asc: 'top',
						show: false,
						user_type: 0,
						key: 'user_type'
					}, {
						name: '认证',
						asc: 'low',
						show: false,
						user_type: 1,
						key: 'user_type'
					}]
				}, {
					name: '价格',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '价格',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						price: 0,
						key: 'price'
					}, {
						name: '由低到高',
						asc: 'low',
						show: false,
						price: 1,
						key: 'price'
					}, {
						name: '由高到低',
						asc: 'top',
						show: false,
						price: 2,
						key: 'price'
					}]
				}, {
					name: '是否供样',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '可否样品',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						sample: '',
						key: 'sample'
					}, {
						name: '可供样',
						asc: 'low',
						show: false,
						sample: 1,
						key: 'sample'
					}, {
						name: '不供样',
						asc: 'top',
						show: false,
						sample: 0,
						key: 'sample'
					}]
				}, {
					name: '产地',
					asc: 'location',
					url: '/static/icons/screen.png',
					class: 'sort_content_detail',
				}],
				back_key: '0',
				keyword: '',
				todos: [],
				obj: {},
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				show: '',
				httpPraram: {
					time: 0,
					price: 0,
					sample: '',
					location: [],
					user_type: '-1',
					keyword: '',
					page: 1,
					pageSize: 10
				},
				headParam: {
					title: '低价资源',
					keyword: '',
					router: 'lowPriceRes'
				}
			}
		},
		components: {
			sort,
			headFix,
			errPage,
			resourceList,
			longSearch
		},
		methods: {
			getHttp(back) {
				if(this.httpPraram.page == 1) {
					common.$emit('show-load');
					this.allLoaded = false;
				}
				let _self = this;
				if(_self.httpPraram.page == 1) common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionService',
					biz_method: 'querySupplyList',
					biz_param: {
						keyWord: _self.httpPraram.keyword,
						sort: {
							"shelve_time": _self.httpPraram.time,
							"price": _self.httpPraram.price
						},
						sampling: _self.httpPraram.sample,
						isAuth: _self.httpPraram.user_type,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize,
						location: _self.httpPraram.location
					}
				}
				if(common.KEY) {
					url = common.addSID(common.urlCommon + common.apiUrl.most);
					body.version = 1;
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				}
				httpService.myAttention(url, body, function(suc) {
					common.$emit('close-load');
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					let result = suc.data.biz_result.list;
					if(suc.data.code == '1c01') {
						for(var i = 0; i < result.length; i++) {
							var img = new Image();
							img.src = result[i].image[0];
							var imgSize = {
								width: img.width,
								height: img.height
							};
							result[i].imgsize = imgSize;
							_self.todos.push(result[i]);
						}
					} else {
						common.$emit('message', suc.data.msg);
					}
					if(result.length < _self.httpPraram.pageSize) {
						_self.allLoaded = true;
					}
					if(back) {
						back();
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
					if(back) {
						back();
					}
				})
			},
			getId(param) {
				let _self = this;
				_self.httpPraram.page = 1;
				_self.httpPraram[param.key] = param[param.key];
				_self.getHttp();
			},
			jumpSearch() {
				common.searchType = 'keyword';
				common.$emit('setParam', 'router', 'lowPriceRes')
				this.$router.push('search');
			},
			initial(param) {
				let _self = this;
				if(!param) {
					_self.httpPraram.time = 0;
					_self.httpPraram.price = 0;
					_self.httpPraram.keyword = '';
					_self.httpPraram.sample = '';
					_self.httpPraram.location = [];
					_self.httpPraram.page = 1;
					for(var i = 1; i < _self.sortArr.length; i++) {
						if(i < 3) {
							_self.sortArr[i].name = _self.sortArr[i].saveName;
							_self.sortArr[i].url = '/static/icons/drop_down.png';
							_self.sortArr[i].class = 'sort_content_detail';
						}
						if(i == 3) {
							_self.sortArr[3].name = '产地';
							_self.sortArr[3].class = "sort_content_detail";
							_self.sortArr[3].url = "/static/icons/screen.png";
							common.$emit('initial', 1)
						}
					}
					_self.getHttp();
				}
			},
			clearKeyword() {
				this.httpPraram.page = 1;
				this.httpPraram.keyword = '';
				this.getHttp();
			},
			jumpDetail(id) {
				let _self = this;
				if(!_self.pull) {
					common.$emit('resourceDetail', id);
					_self.$router.push('resourceDetail/' + id);
				} else {
					console.log('在加载...')
				}

			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom(id) {
				let _self = this;
				setTimeout(() => {
					if(this.todos.length < this.httpPraram.page * this.httpPraram.pageSize) {
						this.allLoaded = true;
					} else {
						this.httpPraram.page++;
						this.getHttp(function() {
							_self.$refs.loadmore.onBottomLoaded(id);
						});
					}
				}, 500);

			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadTop(id) {
				let _self = this;
				setTimeout(() => {
					_self.httpPraram.page = 1;
					_self.getHttp(function() {
						_self.$refs.loadmore.onTopLoaded(id);
					});
				}, 500);

			},
			jump(router) {
				this.$router.push(router);
			},
			handleScroll() {
				this.scrollTop = this.$refs.wrapper.scrollTop;
			},
			getScrollTop() {
				this.$refs.wrapper.scrollTop = this.scrollTop;
			}
		},
		watch: {
			'$route': 'getScrollTop'
		},
		created() {
			let _self = this;
			let type = _self.$route.query.value;
			if(type == 'web') {
				_self.myShow.goBack = true;
			} else {
				_self.myShow.goBack = false;
			}
			_self.headParam.keyword = common.pageParam.lowPrice.keyWord;
			_self.httpPraram.keyword = common.pageParam.lowPrice.keyWord;
			_self.getHttp();
			common.$on('lowPriceRes', function(item) {
				console.log(22, item)
				_self.headParam.keyword = item.keyWord;
				_self.httpPraram.keyword = item.keyWord;
				_self.httpPraram.page = 1;
				_self.getHttp();
			})
			common.$on('clearThisSearch', function(item) {
				_self.httpPraram.page = 1;
				_self.headParam.keyword = '';
				_self.httpPraram.keyword = '';
				_self.getHttp();
			})
			common.$on('lowRes-sort', function(item) {
				_self.httpPraram.location = item.idArr;
				_self.sortArr[3].name = item.areaArr[0];
				_self.sortArr[3].class = "sort_content_detail_select";
				_self.sortArr[3].url = "/static/icons/screen_selected.png";
				if(item.length > 1) {
					_self.sortArr[3].name += '...';
				} else if(!_self.sortArr[3].name) {
					_self.sortArr[3].name = '产地';
					_self.sortArr[3].class = "sort_content_detail";
					_self.sortArr[3].url = "/static/icons/screen.png";
				}
				_self.httpPraram.page = 1;
				_self.getHttp();
			});
			/*common.$on('listOflowPrice',function(item){
			    _self.getHttp();
			})*/
			common.$on('getInfo', function(item) {
				_self.getHttp();
			})

		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}
	}
</script>