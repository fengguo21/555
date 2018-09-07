<style lang="less" scoped>
	.resource {
		height: 100vh;
		.fixed {
			position: absolute;
			width: 100%;
			z-index: 2;
			background: #fff;
			.search_content {
				width: 100%;
				background: #ff8201;
				position: relative;
				z-index: 2;
			}
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
	
	.resource .go-back {
		position: absolute;
		width: 15%;
		padding-right: 5%;
		height: 50px;
		border-bottom: 1px solid #ccc;
		background: #ff8201;
	}
	
	.resource {
		overflow: hidden;
		.main {
			width: 100%;
			padding-top: 90px;
			overflow: scroll;
			width: 100%;
			background-color: #f3f3f3;
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
	<div class="content resource">
		<div class="fixed">
			<div @click="jumpSearch" class="search_content">
				<longSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" :param="myShow"></longSearch>
			</div>
			<sort v-on:postId="getId" v-on:initial="initial" :sortRouter="sortRouter" :paramArr="sortArr"></sort>
		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!==0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<!--列表模块-->
				<resourceList :param='todos' :httpPraram='httpPraram'></resourceList>
				<!--上拉下拉-->
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
	import longSearch from '../../components/tools/longSearch'
	import sort from '../../components/tools/sort'
	import resourceList from '../../views/myResource/resourceList'
	import errPage from '../../components/tools/err'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	export default {
		data() {
			return {
				scrollTop: 0,
				isAttention: 0,
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png',
				},
				myShow: {
					myShow: '',
					mycart: '',
					resource: '',
					myMessage: '',
					back: '',
					goBack: ''
				},
				sortRouter: 'resource',
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
				todos: [],
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					time: 0,
					price: 0,
					sample: '',
					location: [],
					locationId: [],
					user_type: '-1',
					keyword: '',
					page: 1,
					pageSize: 10
				}
			}
		},
		components: {
			resourceList,
			longSearch,
			sort,
			errPage
		},

		methods: {
			//获取数据
			getHttp(back) {
				let _self = this;
				if(_self.httpPraram.page == 1) {
					this.allLoaded = false;
					common.$emit('show-load');
				}
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionService',
					biz_method: 'querySupplyList',
					biz_param: {
						keyWord: _self.httpPraram.keyword,
						sort: {
							"shelve_time": _self.httpPraram.time,
							"price": _self.httpPraram.price,

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
					console.log(result,'recommend===')
					var img = new Image();
					var imgSize = [];
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
						console.log(_self.todos,'todos===')
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
			//排序触发事件
			getId(param) {
				let _self = this;
				_self.httpPraram.page = 1;
				_self.httpPraram[param.key] = param[param.key];
				_self.getHttp();
			},
			//初始化事件
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
			//清除搜索事件
			clearKeyword() {
				this.httpPraram.page = 1;
				this.httpPraram.keyword = '';
				this.getHttp();
			},
			//跳转搜索事件
			jumpSearch() {
				console.log(212312)
				common.searchType = 'keyword';
				common.$emit('setParam', 'router', 'resource')
				common.$emit('clearSearch', 1)
				this.$router.push('search');
			},
			//下拉事件
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
			handleScroll() {
				this.scrollTop = this.$refs.wrapper.scrollTop;
			},
			getScrollTop() {
				this.$refs.wrapper.scrollTop = this.scrollTop;
			},
			//判断页面是资源还是低价资源
			getRouter() {
				let _self = this;
				if(_self.$route.path == '/lowPriceRes') {
					_self.myShow.myShow = false;
					_self.myShow.mycart = false;
					_self.myShow.resource = true;
					_self.myShow.myMessage = true;
					_self.myShow.back = true;
					_self.myShow.goBack = true;
					_self.httpPraram.page = 1;
					_self.httpPraram.keyword = '';

				} else {
					_self.myShow.myShow = false;
					_self.myShow.mycart = true;
					_self.myShow.resource = true;
					_self.myShow.myMessage = true;
					_self.myShow.back = false;
					_self.myShow.goBack = false;
					_self.httpPraram.page = 1;
					_self.httpPraram.keyword = '';
					
				}
			}

		},
		watch: {
			'$route': 'getScrollTop',
		},
		created() {
			let _self = this;
			_self.getRouter()
			_self.getHttp();
			common.$on('resource', function(item) {
				_self.httpPraram.keyword = item.keyWord;
				_self.httpPraram.page = 1;
				_self.getHttp();
			})
			common.$on('clearResourceSearch', function(item) { //首页->资源页面通知
				_self.myShow.myShow = false;
				_self.myShow.mycart = true;
				_self.myShow.resource = true;
				_self.myShow.myMessage = true;
				_self.myShow.back = false;
				_self.myShow.goBack = false;
				_self.httpPraram.page = 1;
				_self.httpPraram.keyword = '';
				_self.getHttp();
			})
			common.$on('resource-sort', function(item) { //产地选择通知刷新
				_self.httpPraram.location = item.idArr;
				let name = item.areaArr;
				if(name.length>0){
					name = name[0]
				}else{
					name = ""
				}
				_self.sortArr[3].name = name.length>3?name.slice(0,3)+'...':name;
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
			common.$on('getInfo', function(item) { //登陆通知刷新
				_self.httpPraram.page = 1;
				_self.getHttp();
			})
		},
		mounted() {
			this.wrapperHeight = document.body.offsetHeight - this.$refs.wrapper.getBoundingClientRect().top - 55;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		},

	}
</script>