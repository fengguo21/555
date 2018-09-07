<style lang="less" scoped>
	.my_needs {
		.bg_white {
			background-color: #FBFBF6;
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
		.main {
			li {
				background-color: #fff;
				margin: 10px 10px 5px;
				border-radius: 10px;
				box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
				.box {
					.top {
						padding: 10px 25px;
						width: 100%;
						border-bottom: 1px solid #e6e6e6;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						position: relative;
						.tag {
							position: absolute;
							top: 0;
							left: 10px;
							width: 9px;
							height: 16px;
						}
						.red {
							color: #E96A6D;
						}
						.black {
							color: #333;
						}
						.gray {
							color: #BEBEBE;
						}
						.green {
							color: #438200;
						}
						.orange{
							color: #FF8201;
						}
						.yellow {
							color: #ECBB26;
						}
						.left {
							font-size: 15px;
						}
						.right {
							color: #CACACA;
							font-size: 14px;
							flex: 1;
							text-align: right;
						}
					}
					.content {
						padding: 10px 15px;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						.left {
							.breed_name {
								text-align: left;
								font-size: 19px;
								color: #000;
								width: 180px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.spec {
								color: 6D6D6D;
								font-size: 14px;
								margin-top: 5px;
								text-align: left;
								line-height: 25px;
								img {
									width: 12px;
									height: 16px;
									vertical-align: middle;
									margin-right: 5px;
								}
								.num {
									vertical-align: middle;
								}
								.money{
									width: 16px;
								}
							}
						}
						.right {
							/*width: 120px;*/
							.date {
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;
								font-size: 14px;
								color: #3F3F3F;
								line-height: 13px;
								img {
									height: 15px;
									margin: 0 10px 0 0;
									padding: 0;
								}
							}
							.detail {
								background-color: #FFC600;
								color: #fff;
								font-size: 15px;
								line-height: 16px;
								padding: 8px 14px;
								border-radius: 16px;
								display: inline-block;
								margin-top: 35px;
							}
						}
					}
					.footer {
						height: 40px;
						text-align: right;
						padding: 0 15px;
						border-top: 1px solid #e6e6e6;
						.date {
							/*display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;*/
							display: inline-block;
							font-size: 14px;
							color: #3F3F3F;
							line-height: 40px;
							img {
								height: 15px;
								margin: 0 4px 0 0;
								padding: 0;
								vertical-align: middle;
							}
						}
					}
				}
			}
		}
	}
	
	.status {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		.items {
			flex: 1;
			height: 40px;
			line-height: 40px;
			font-size: 14px;
		}
		.red {
			color: #ff8201;
		}
	}
	
	.red {
		color: #ff8201;
	}
</style>
<template>
	<div class="my_needs">
		<div>
			<myHeader :param="param"></myHeader>
			<div class="status">
				<div class="items" v-bind:class="{red:todo.show}" v-for="todo in status" @click="changeStatus(todo)">{{todo.name}}</div>
			</div>
		</div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul class="main">
					<li v-for="todo in todos" @click="jump(router,todo.intentionId)">
						<div class="box">
							<div class="top">
								<!--
                                	描述：onshell-2 红 onshell2 绿 onshell1黄 onshell0 灰 onshell3蓝色
                                -->
                                
								<img class="tag" src="../../../static/icon/list/onshell2.png" v-show="todo.accept == 1" />
								<img class="tag" src="../../../static/icon/list/onshell0.png" v-show="todo.accept == 2"/>
								<img class="tag" src="../../../static/icon/list/onsell1.png"  v-show="todo.accept == 3 || todo.accept == 0 "/>
								<!--
                                	描述：是否接口 0/1/2/3 未处理/接受/不接受/正在跟进
                                	注释：0和3状态都是已报价的意思，但是两种状态都在
                                -->
								<div class="left">报价状态:
									
									<span class="orange" v-if="todo.state>=0&&todo.state<100&&todo.state!==11">受理中</span>
									<span class="green" v-if="todo.state>=100&&todo.state<114&&todo.state!==111" >已采用</span>
									<span class="red" v-if="todo.state==11">未采用</span>
									<span class="orange" v-if="todo.state==114||todo.state==115">待寄样</span>
									<span class="green" v-if="todo.state>=116&&todo.state<131">已寄样</span>
									<span class="red" v-if="todo.state==131">样品不合格</span>
									<span class="orange" v-if="todo.state<170&&todo.state>131">待成交</span>
									<span class="green" v-if="todo.state==170">已成交</span>
									<span class="red" v-if="todo.state==111">无法寄样</span>
									<!--<span class="black" v-show="todo.accept == 0">{{todo.accept | myOfferStatus}}</span>-->
								</div>
								<div class="right">{{todo.otime | timeFormats}}</div>
							</div>
							<div class="content">
								<div class="left">
									<div class="breed_name">{{todo.breedName}}</div>
									<div class="spec"><img src="/static/icon/list/local.png">{{todo.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;<img src="/static/icon/list/spc.png">{{todo.spec,10 | filterTxt}}</div>
									<div class="spec"><img class="money" src="/static/icon/list/money.png"><span class="num">{{todo.price}}</span>&nbsp;元/{{todo.unit}}</div>
								</div>
								<div class="right">
									<div class="detail">
										查看详情
									</div>
								</div>
							</div>
							<div class="footer">
								<div class="date">
									<span>
										<img src="/static/icon/times.png">
									</span>
									<span>{{todo.duedate}}</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
					<span v-show="topStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
					<span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
				</div>
			</mt-loadmore>
		</div>
		<errPage :param="err" v-show="todos.length==0"></errPage>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import searchInput from '../../components/tools/inputSearch'
	import myHeader from '../../components/header/myHeader'
	import httpService from '../../common/httpService.js'
	// import filters from '../../filters/filters'
	import errPage from '../../components/tools/err'
	/**
	 * https://github.com/ZZKll/
	 *  .--,       .--,
	 * ( (  \.---./  ) )
	 *  '.__/o   o\__.'
	 *     {=  ^  =}
	 *      >  -  <
	 *     /       \
	 *    //       \\
	 *   //|   .   |\\
	 *   "'\       /'"_.-~^`'-.
	 *      \  _  /--'         `
	 *    ___)( )(___
	 *   (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
	 */
	export default {
		data() {
			return {
				scrollTop: 0,
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png'
				},
				sortRouter: 'home',
				param: {
					name: '我的报价',
					router: 'home'
				},
				router: "/offerDetail",
				// other_router: "revisePurchase",
				other_router: "releaseNeed",
				todos: [],
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					page: 1,
					pageSize: 10,
					accept: '-1'
				},
				status: [{
					name: '全部',
					state: '-1',
					show: true
				}, {
					name: '受理中',
					accept: '3',
					show: false
				}, {
					name: '已采用',
					accept: '1',
					show: false
				}, {
					name: '未采用',
					accept: '2',
					show: false
				}]
			}
		},
		components: {
			searchInput,
			myHeader,
			errPage
		},
		methods: {
			getHttp(back) {
				let _self = this;
				if(_self.httpPraram.page == 1) {
					_self.allLoaded = false;
				}
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionOfferService',
					biz_method: 'htmlMyIntentionOfferList',
					biz_param: {
						accept: _self.httpPraram.accept,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myResource(url, body, function(suc) {
					common.$emit('close-load');
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					let result = suc.data.biz_result.list;
					console.log(result);
					if(suc.data.code == '1c01') {
						for(var i = 0; i < result.length; i++) {
							_self.todos.push(result[i]);
						}
						if(result.length < _self.httpPraram.pageSize) {
							_self.allLoaded = true;
						}
					} else {
						common.$emit('message', suc.data.msg);
					}
					if(back) {
						back();
					}
				}, function(err) {
					common.$emit('close-load');
					if(back) {
						back();
					}
				})
			},
			changeStatus(todo) {
				let _self = this;
				for(var i = 0; i < _self.status.length; i++) {
					_self.status[i].show = false;
				}
				todo.show = true;
				_self.httpPraram.accept = todo.accept;
				_self.getHttp();
			},
			jump: function(router, id) {
				console.log("idddddddddddddddddddd",router,id)
				common.$emit('myOfferToOfferDetail', id);
				this.$router.push(router + '/' + id);
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
			}
		},
		watch: {
			'$route': 'getScrollTop'
		},
		created() {
			let _self = this;
			this.httpPraram.page = 1;
			_self.httpPraram.type = 0;
			//_self.httpPraram.accept = _self.status[common.pageParam.accept].accept;
			if(this.$route.query.type) {
				_self.httpPraram.accept = _self.status[_self.$route.query.type].accept;
				for(let i = 0; i < _self.status.length; i++) {
					_self.status[i].show = false;
				}
				_self.status[_self.$route.query.type].show = true;
			}

			this.getHttp();
			common.$on('inforMyOffer', function(item) {
				_self.httpPraram.accept = _self.status[item].accept;
				_self.httpPraram.page = 1;
				_self.getHttp();
				for(let i = 0; i < _self.status.length; i++) {
					_self.status[i].show = false;
				}
				_self.status[item].show = true;
			});
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}

	}
</script>