<style lang="less" scoped>
	.my_needs {
		.bg_white {
			background-color: #f3f3f3;
		}
		/*.mint-loadmore{
			height: 100%;
		}*/
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
		.page-loadmore-wrapper{
			background-color: #f3f3f3;
		}
		.main {
			background-color: #f3f3f3;
			li {
				background-color: #fff;
				margin: 10px 10px 5px;
				border-radius: 10px;
				box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
				.box {
					.top {
						padding: 10px 20px;
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
							color: #dfdfdf;
						}
						.green {
							color: #438200;
						}
						.yellow {
							color: #ECBB26;
						}
						.left {
							flex: 1;
							text-align: left;
							font-size: 15px;
						}
						.right {
							flex: 1;
							text-align: right;
							color: #CACACA;
							font-size: 14px;
						}
					}
					.content {
						padding: 10px 25px;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						.left {
							.breed_name {
								text-align: left;
								font-size: 19px;
								color: #000;
								width: 160px;
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
							}
						}
						.right {
							width: 120px;
							.detail {
								width: 135px;
								text-align: right;
								flex-direction: row;
								margin-top: 35px;
								align-items: flex-end;
								.go_sale {
									font-size: 15px;
									color: #fff;
									padding: 6px 14px;
									background-color: #ff8201;
									margin-right: 6px;
									border-radius: 19px;
								}
								.revise {
									background-color: #fff;
									border: 1px solid #E7E7E7;
									color: #999;
								}
								.goDetail {
									background-color: #FFC600;
									color: #fff;
									font-size: 15px;
									line-height: 16px;
									padding: 8px 14px;
									border-radius: 16px;
									display: inline-block;
								}
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
	
	.my_needs {
		height: 100vh;
		overflow: hidden;
	}
</style>
<template>
	<div class="my_needs">
		<div>
			<myHeader :param="param"></myHeader>
			<myPurchaseSort v-on:postId="getId" :sort="sortRouter" :paramArr="sortArr"></myPurchaseSort>
		</div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul class="main">
					<li v-for="todo in todos" @click="jump(router,todo.id)">
						<div class="box">
							<div class="top">
								<!--
                                	描述：onshell-2 红 onshell2 绿 onshell1黄 onshell0 灰 onshell3蓝色
                                -->
								<img class="tag" src="../../../static/icon/list/onshell-2.png" v-show="todo.onSell == -2" />
								<img class="tag" src="../../../static/icon/list/onshell3.png" v-show="todo.onSell ==  3 || todo.onSell ==  4" />
								<img class="tag" src="../../../static/icon/list/onshell2.png" v-show="todo.onSell == 2" />
								<img class="tag" src="../../../static/icon/list/onsell1.png" v-show="todo.onSell == 1" />
								<img class="tag" src="../../../static/icon/list/onshell0.png" v-show="todo.onSell == 0" />

								<!--
                                	描述：onShell状态：onShell==1 受理中;onShell==2 询价中;onShell==-2 上架失败;onShell==0 查询全部; onShell==4 下架
                                -->
								<div class="left">求购状态:
									<span class="red" v-show="todo.onSell == -2">{{todo.onSell | myStatus}}</span>
									<span class="black" v-show="todo.onSell ==  3 || todo.onSell ==  4">{{todo.onSell | myStatus}}</span>
									<span class="green" v-show="todo.onSell == 2">{{todo.onSell | myStatus}}</span>
									<span class="yellow" v-show="todo.onSell == 1">{{todo.onSell | myStatus}}</span>
									<span class="gray" v-show="todo.onSell == 0">{{todo.onSell | myStatus}}</span>
								</div>
								<div class="right">{{todo.pubdate | timeFormats}}</div>
							</div>
							<div class="content">
								<div class="left">
									<div class="breed_name">{{todo.breedName}}</div>
									<div class="spec"><img src="/static/icon/list/local.png">{{todo.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;<img src="/static/icon/list/spc.png">{{todo.spec,4 | filterTxt}}</div>
									<div class="spec"><img src="/static/icon/list/num.png"><span class="num">{{todo.number}}</span>({{todo.unit}})</div>
								</div>
								<div class="right">

									<div class="detail" v-show="todo.onSell==0 || todo.onSell==-2 || todo.onSell==4 || todo.onSell==3">
										<div class="goDetail" @click.stop="atOnceSale(todo.id)">立即上架</div>
										<!--<div class="go_sale revise" @click.stop="jumpRevise(todo.id)">编辑</div>-->
									</div>
									<div class="detail" v-show="todo.onSell==1 || todo.onSell==2">
										<div class="goDetail">查看详情</div>
									</div>
								</div>
							</div>
							<div class="footer">
								<div class="date">
									<span>
											<img src="/static/icon/times.png">
										</span>
									<span>{{todo.duedate | needTimeDay}}</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
					<span v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
					<span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
				</div>
			</mt-loadmore>
		</div>
		<errPage :param="err" v-show="todos.length==0"></errPage>
		<customPopUp v-show="popshow.show" :popshow="popshow" :type="type" :number="number"></customPopUp>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import searchInput from '../../components/tools/inputSearch'
	import myHeader from '../../components/header/myHeader'
	import myPurchaseSort from '../../components/tools/myPurchaseSort'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	import errPage from '../../components/tools/err'
	import customPopUp from '../../components/popUpType/customPopUp'
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
					name: '我的求购',
					router: 'home'
				},
				popshow: {
					show: false,
					type: 2
				},
				type: 2,
				number: 2,
				sortArr: [{
					name: '发布日期',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '发布日期',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						pubdate: 0,
						key: 'pubdate'
					}, {
						name: '由新到旧',
						asc: 'low',
						show: false,
						pubdate: 2,
						key: 'pubdate'
					}, {
						name: '由旧到新',
						asc: 'top',
						show: false,
						pubdate: 1,
						key: 'pubdate'
					}]
				}, {
					name: '报价人数',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '报价人数',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						offer: 0,
						key: 'offer'
					}, {
						name: '由少到多',
						asc: 'low',
						show: false,
						offer: 1,
						key: 'offer'
					}, {
						name: '由多到少',
						asc: 'top',
						show: false,
						offer: 2,
						key: 'offer'
					}]
				}, {
					name: '剩余时间',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '剩余时间',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						duedate: '',
						key: 'duedate'
					}, {
						name: '由短到长',
						asc: 'low',
						show: false,
						duedate: 1,
						key: 'duedate'
					}, {
						name: '由长到短',
						asc: 'top',
						show: false,
						duedate: 0,
						key: 'duedate'
					}]
				}, {
					name: '上架状态',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '上架状态',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						testing: '',
						key: 'testing'
					}, {
						name: '未上架',
						asc: 'low',
						show: false,
						testing: 0,
						key: 'testing'
					}, {
						name: '受理中',
						asc: 'low',
						show: false,
						testing: 1,
						key: 'testing'
					}, {
						name: '审核未通过',
						asc: 'low',
						show: false,
						testing: -2,
						key: 'testing'
					}, {
						name: '询价中',
						asc: 'top',
						show: false,
						testing: 2,
						key: 'testing'
					}, {

						name: '询价结束',
						asc: 'low',
						show: false,
						testing: 4,
						key: 'testing'
					}]
				}],
				router: "/needDetails",
				// other_router: "revisePurchase",
				other_router: "releaseNeed",
				todos: [],
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					pubdate: 0,
					offer: 0,
					duedate: 0,
					testing: '',
					page: 1,
					pageSize: 10
				}
			}
		},
		components: {
			searchInput,
			myPurchaseSort,
			myHeader,
			errPage,
			customPopUp
		},
		computed: {
			myTypes() {
				let ctype = this.$store.state.user.userInfor.ctype;
				let utype = this.$store.state.user.userInfor.utype;
				if(ctype == 0 && utype == 0) {
					return true
				} else if(ctype == 0 && utype == 3) {
					return true
				} else if(ctype == 3 && utype == 0) {
					return true
				} else if(ctype == 3 && utype == 3) {
					return true
				} else {
					return false
				}
			}
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
					biz_module: 'intentionService',
					biz_method: 'myBegIntentionList',
					biz_param: {
						sort: {
							"offer": _self.httpPraram.offer,
							"pubdate": _self.httpPraram.pubdate,
							"duedate": _self.httpPraram.duedate
						},
						onSell: _self.httpPraram.testing,
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
					//console.log(result);
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
			atOnceSale(id) {
				let _self = this;
				_self.goSale(id)
//				if(_self.myTypes) {
//					_self.popshow.show = true;
//				} else {
//					_self.goSale(id)
//				}
			},
			goSale(id) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionService',
					biz_method: 'applyOnSell',
					biz_param: {
						intentionId: id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.supplyRelease(url, body, function(suc) {
					common.$emit('close-load');
					console.log(suc);
					if(suc.data.code == '1c01') {
						common.$emit('message', suc.data.msg);
						_self.getHttp();
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			jumpRevise(id) {
				common.$emit('purchase-id', id);
				this.$router.push('/releaseNeeds/' + id);
			},
			getId(param) {
				let _self = this;
				_self.httpPraram.page = 1;
				_self.httpPraram[param.key] = param[param.key];
				_self.getHttp()
			},
			jump: function(router, id) {
				common.$emit("needToDetails", {
					id: id,
					type: 'my'
				});
				this.$router.push(router + '/' + id + '?type=my');
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
			disTime: function(duedate) {
				var now = new Date().getTime();
				console.log(now);
				var endDate = new Date(duedate).getTime();
				console.log(endDate);
				var dis = now - endDate;
				console.log(dis);
				if(dis < 0) {
					return true;
				} else {
					return false;
				}
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
			_self.httpPraram.page = 1;
			_self.httpPraram.type = 0;
			if(this.$route.query.type) {
				_self.httpPraram.testing = _self.sortArr[3].sortArr[_self.$route.query.type].testing;
			}
			for(let i = 0; i < _self.sortArr[3].sortArr.length; i++) {
				_self.sortArr[3].sortArr[i].show = false;
			}
			_self.getHttp();
			if(common.KEY) _self.$store.dispatch('getUserInfor'); //刷新之后需要调用户信息接口
			common.$on('informMyPurchase', function(item) {
				_self.httpPraram.testing = _self.sortArr[3].sortArr[item].testing;
				_self.httpPraram.page = 1;
				_self.httpPraram.offer = 0;
				_self.httpPraram.pubdate = 0;
				_self.httpPraram.duedate = 1;
				for(let i = 0; i < _self.sortArr[3].sortArr.length; i++) {
					_self.sortArr[3].sortArr[i].show = false;
				}
				_self.sortArr[3].sortArr[item].show = true;
			});
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}

	}
</script>