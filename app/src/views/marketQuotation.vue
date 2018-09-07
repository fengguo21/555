<style lang="less" scoped>
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
	
	.market_quotation {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		position: relative;
		.type {
			width: 100%;
			height: 44px;
			background-color: #fff;
			border-bottom: 1px solid #e6e6e6;
			padding: 6px 0;
			.box {
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 150px;
				height: 30px;
				margin: 0 auto;
				font-size: 14px;
				border-radius: 5px;
				border: 1px solid #ff8201;
				overflow: hidden;
				div {
					flex: 1;
					height: 100%;
					color: #ff8201;
					background-color: #fff;
					line-height: 30px;
				}
				.active {
					background-color: #ff8201;
					color: #fff;
				}
			}
		}
		.main {
			width: 100%;
			overflow-y: scroll;
			overflow-x: hidden;
			.list {
				.item {
					background-color: #fff;
					margin-top: 10px;
					.top {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #e6e6e6;
						padding: 11px 8px;
						.breed {
							font-size: 17px;
							color: #000;
							width: 30%;
							text-align: left;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.top_right {
							display: flex;
							flex-direction: row;
							align-items: center;
							.day {
								text-align: right;
								width: 100px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 14px;
								color: #6e6e6e;
							}
							.week {
								margin-left: 5px;
							}
						}
					}
					.content {
						width: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						padding: 16px 8px 5px 8px;
						.left {
							flex: 1;
							text-align: left;
							font-size: 15px;
							color: #333;
							line-height: 15px;
							.location {
								width: 160px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin-bottom: 14px;
							}
							.red {
								color: #fb3f24;
							}
							.green {
								color: #7bb157;
							}
						}
						.right {
							flex: 1;
							display: flex;
							flex-direction: column;
							align-items: center;
							.price {
								color: #ff8201;
								font-size: 16px;
								span {
									font-size: 15px;
								}
							}
							.button {
								display: flex;
								flex-direction: row;
								align-items: center;
								width: 125px;
								height: 40px;
								justify-content: center;
								border: 1px solid #ff8201;
								border-radius: 20px;
								margin-top: 15px;
								img {
									width: 16px;
									height: 15px;
									margin-right: 4px;
								}
								.txt {
									font-size: 15px;
									color: #ff8201;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="market_quotation">
		<marketHead :param="param" @jumpSearch="jumpSearch" @cancel="cancel"></marketHead>
		<div class="type">
			<div class="box">
				<div class="left" @click="selectType(0)" v-bind:class="{active:!httpPraram.index}">类别</div>
				<div class="right" @click="selectType(1)" v-bind:class="{active:httpPraram.index}">药市</div>
			</div>
		</div>
		<marketNav :wrapperWidth="wrapperWidth" :personArr="personArr" :scrollLeft="scrollLeft" @selectHttp="selectHttp"></marketNav>
		<div class="main" ref="wrapper" :style="{height:wrapperHeight + 'px'}" v-show="todos.length!=0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<div class="list">
					<div class="item" v-for="todo in todos" @click="lookTrend(todo)">
						<div class="top">
							<div class="breed">{{todo.name}}</div>
							<div class="top_right">
								<div class="day">日涨跌: {{todo.dayMoney | marketFloatType}}%</div>
								<div class="day week">周涨跌: {{todo.weekdowns | marketFloatType}}%</div>
							</div>
						</div>
						<div class="content">
							<div class="left">
								<div class="location">产地: {{todo.location}}</div>
								<div class="location spec">规格: {{todo.spec}}</div>
								<div class="location market">市场: {{todo.area}}药市</div>
								<div class="location" v-bind:class="{red:todo.dayDowns>0,'green':todo.dayDowns<0}">涨跌幅度: {{todo.dayDowns | marketFloatType}}%
									<span v-show="todo.dayDowns>0">↑</span>
									<span v-show="todo.dayDowns<0">↓</span>
								</div>
							</div>
							<div class="right">
								<div class="price">￥{{todo.unitprice}}</div>
								<div class="button" >
									<img src="/static/icon/trend.png">
									<div class="txt">看走势图</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
		<errPage :param="err" v-show="_self.distodos==0"></errPage>
	</div>
</template>
<script>
	import longSearch from '../components/tools/longSearch'
	import common from '../common/common.js'
	import marketHead from '../components/user/marketHead'
	import marketNav from '../components/user/marketNav'
	import httpService from '../common/httpService.js'
	import errPage from '../components/tools/err'
	import filters from '../filters/filters'
	export default {
		data() {
			return {
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png'
				},
				param: {
					name: '市场行情',
					show: false
				},
				wrapperWidth: 0,
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					page: 1,
					pageSize: 10,
					name: '',
					area: '',
					breedId: -1,
					categoryId: -1,
					index: 0
				},
				personArr: [],
				scrollLeft: '',
				todos: ['1'],
				distodos: '1',
			}
		},
		components: {
			marketHead,
			longSearch,
			errPage,
			marketNav
		},
		methods: {
			getHttp(back) {
				let _self = this;
				if(_self.httpPraram.page == 1) common.$emit('show-load');
				httpService.marketQuotation(common.urlCommon + common.apiUrl.most, {
					biz_module: 'breedService',
					biz_method: 'queryNewBreedPrice',
					biz_param: {
						name: _self.httpPraram.name,
						area: _self.httpPraram.area,
						categoryId: _self.httpPraram.categoryId,
						breedId: _self.httpPraram.breedId,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize
					}
				}, function(suc) {
					common.$emit('close-load');
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					let data = suc.data.biz_result.list;
					if(suc.data.code == '1c01') {
						for(var i = 0; i < data.length; i++) {
							_self.todos.push(data[i]);
						}
					} else {

					}
					_self.distodos = _self.todos.length;
					console.log(_self.todos);

					if(data.length < _self.httpPraram.pageSize) {
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
			getType() {
				let _self = this;
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'breedService',
					biz_method: 'herbCategory',
					biz_param: {

					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myAttention(url, body, function(suc) {
					let result = suc.data.biz_result.list;
					for(var i = 0; i < result.length; i++) {
						result[i].show = false;
						result[0].show = true;
					}
					_self.personArr = result;
					_self.wrapperWidth = 25 * (_self.personArr.length)
					console.log(99, result)
				}, function(err) {})
				common.$emit('close-load');
			},
			lookTrend(todo) {
				let _self = this;
				common.$emit('trendChart', todo);
				this.$router.push("/trendChart/name="+todo.name +';location='+todo.location +';spec='+todo.spec+';area='+todo.area+';breedId='+todo.breedId);
			},
			selectType(index) {
				let _self = this;
				_self.httpPraram.index = index;
				if(index) {
					_self.wrapperWidth = 25 * 5;
					_self.personArr = [{
						name: '全部',
						area: '',
						show: true
					}, {
						name: '亳州药市',
						area: '亳州',
						show: false
					}, {
						name: '成都荷花池药市',
						area: '荷花池',
						show: false
					}, {
						name: '安国药市',
						area: '安国',
						show: false
					}, {
						name: '玉林药市',
						area: '玉林',
						show: false
					}]
					_self.httpPraram.categoryId = -1;
					_self.getHttp();
				} else {
					_self.httpPraram.area = '';
					_self.getType();
					_self.getHttp();
				}
			},
			selectHttp(param) {
				let _self = this;
				if(_self.httpPraram.index) {
					_self.httpPraram.page = 1;
					_self.httpPraram.area = _self.personArr[param].area;
					_self.getHttp();
				} else {
					_self.httpPraram.page = 1;
					_self.httpPraram.categoryId = _self.personArr[param].id;
					_self.getHttp();
				}
			},
			jumpSearch() {
				common.$emit('setParam', 'router', 'marketQuotation')
				this.$router.push('/releaseSearch')
			},
			cancel() {
				this.param.show = false;
				this.httpPraram.breedId = -1;
				this.httpPraram.name = '';
				this.getHttp();
			},
			jump() {
				common.searchType = 'breed';
				common.$emit("setParam", "router", 'marketQuotation');
				this.$router.push("/releaseSearch");
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom(id) {
				let _self = this;
				setTimeout(() => {
					if(_self.todos.length < _self.httpPraram.page * _self.httpPraram.pageSize) {
						_self.allLoaded = true;
					} else {
						_self.httpPraram.page++;
						_self.getHttp(function() {
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
					_self.todos.splice(0, _self.todos.length);
					_self.getHttp(function() {
						_self.$refs.loadmore.onTopLoaded(id);
					});
				}, 500);
			}
		},
		created() {
			let _self = this;
			_self.httpPraram.page = 1;
			_self.todos.splice(0, _self.todos.length);
			_self.getType();
			_self.getHttp();
			common.$on('marketQuotation', function(item) {
				console.log(99, item);
				_self.httpPraram.page = 1;
				_self.todos.splice(0, _self.todos.length);
				_self.httpPraram.breedId = item.breedId;
				_self.httpPraram.name = item.keyWord;
				_self.param.show = true;
				_self.getHttp();
			})
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 139;
		}
	}
</script>