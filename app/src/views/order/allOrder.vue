<style lang="less" scoped>
	.mint-spinner {
		display: inline-block;
		vertical-align: middle;
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
	/*.mint-loadmore{
		height: 100%;
	}*/
	
	.my_order {
		position: relative;
		height: 100vh;
		overflow: hidden;
		.fixed {
			.box {
				padding-top: 50px;
			}
		}
		.main {
			overflow-y: scroll;
			width: 100%;
			background-color: #f3f3f3;
			.list {
				.li {
					/*padding: 0 15px;*/
					background-color: #fff;
					margin: 10px;
					border-radius: 10px;
					overflow: hidden;
					box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
					.top {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						padding: 10px 15px;
						align-items: center;
						border-bottom: 1px solid #e6e6e6;
						.time {
							color: #999;
							font-size: 14px;
						}
						.states {
							color: #ff8201;
							font-size: 14px;
						}
					}
					.content {
						.in_list {
							display: flex;
							flex-direction: row;
							align-items: center;
							padding: 10px 15px;
							border-bottom: 1px solid #e6e6e6;
							.image {
								width: 88px;
								height: 75px;
								position: relative;
								margin: 0 auto;
								overflow: hidden;
								.list_images {
									width: 100%;
									min-height: 78px;
									position: absolute;
									top: 50%;
									left: 0;
									transform: translateY(-50%);
								}
								.list_imagess {
									min-width: 88px;
									height: 100%;
									position: absolute;
									top: 0;
									left: 50%;
									transform: translateX(-50%);
								}
								.contry {
									position: absolute;
									top: 0;
									left: 0;
									width: 25px;
									z-index: 1;
									min-height: 0px;
								}
							}
							.center {
								flex: 1;
								margin-left: 10px;
								text-align: left;
								height: 77px;
								.breed {
									font-size: 16px;
									display: flex;
									flex-direction: row;
									align-items: center;
									.sample {
										height: 18px;
										margin-right: 3px;
									}
								}
								.b_top {
									margin-top: 13px;
									margin-bottom: 2px;
									&.nomargin {
										margin-top: 5px;
									}
									&.color {
										color: #999;
									}
									img {
										height: 16px;
										vertical-align: middle;
									}
								}
								.spec {
									font-size: 14px;
									.ff8201 {
										color: #FE0000;
									}
								}
								@media screen and (max-width:320px) {
									.b_top {
										margin-bottom: 5px;
									}
									.spec {
										font-size: 12px;
									}
								}
							}
							.right {
								width: 110px;
								@media screen and (max-width: 320px) {
									width: 80px;
								}
								height:78px;
								text-align: right;
								/*display: flex;*/
								flex-direction: column;
								justify-content: space-between;
								.price {
									font-size: 15px;
									width: 100%;
									word-break: keep-all;
									white-space: nowrap;
									overflow: hidden;
									text-overflow: ellipsis;
									margin-bottom: 10px;
								}
							}
						}
					}
					.bottom {
						/*display: flex;*/
						/*flex-direction: row;*/
						font-size: 14px;
						color: #000;
						padding: 10px 0;
						align-items: center;
						.bottom_left {
							width: 100%;
							text-align: right;
							/*flex: 1;*/
							.tbc {
								width: 98%;
								word-break: keep-all;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								line-height: 30px;
								span {
									color: #999;
								}
							}
						}
						.title {
							text-align: right;
							button {
								margin: 0px 10px 0 0;
								border: 1px solid #ff8201;
								height: 30px;
								line-height: 30px;
								color: #fff;
								padding: 0 15px;
								border-radius: 50px;
								background-color: #FF8201;
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="my_order">
		<div class="fixed">
			<attentionHeads :param="param" v-on:tab="tabOrder"></attentionHeads>
			<div class="box">
				<landscapeScrolls :param="data" :myshow='param.show' v-on:postData="changeOrderStatus"></landscapeScrolls>
			</div>
		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<div class="list">
					<div class="li" v-for="todo in todos" @click="jump(todo.id)" v-if="param.status!==2">
						<div class="top">
							<div class="time">{{todo.ctime | timeFormat}}</div>
							<div class="states" v-show="param.show">{{todo.orderStatus | purchaseStatus}}</div>
							<div class="states" v-show="!param.show">{{todo.orderStatus | sellStatus}}</div>
						</div>
						<div class="content">
							<div class="in_list" v-for="item in todo.goodsArray">
								<div class="image">
									<img v-bind:src="item.image" :class="item.imgsize.width>item.imgsize.height?'list_imagess':'list_images'" v-show="item.image">
									<img src="/static/icon/default_logo.png" class="list_images" v-show="!item.image">
								</div>
								<div class="center">
									<div class="breed">
										<img src="/static/icons/sample.png" class="sample" v-if="item.sample == 1">
										<div class="breed_name">{{item.goodsName,6 | filterTxt}}</div>
									</div>
									<div class="spec b_top">
										<img src="/static/icon/list/local.png" /> {{item.location,4 | filterTxt}}<br />
										<img src="/static/icon/list/spc.png" /> {{item.spec,4 | filterTxt}} <br />

									</div>
								</div>
								<div class="right">
									<div class="price">{{item.price}}元/{{item.unit}}</div>
									<div class="price">x {{item.number}}</div>
								</div>
							</div>
						</div>
						<div class="bottom">
							<div class="bottom_left">
								<div class="tbc" v-if="todo.orderStatus==0 || todo.orderStatus==10">
									订单总价: ￥{{todo.amount}}<span>(运费杂费待确认)</span>
								</div>
								<div class="tbc" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">
									订单总价: ￥{{todo.total}}<span>(含运费杂费)</span>
								</div>
							</div>
							<div class="title">
								<button v-if="'success' ==judgeOrderStatus(todo.orderStatus)" @click.stop="jump(todo.id)">查看订单</button>
								<button v-if="'send' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" class="special" @click.stop="prompt('确认收货')">确认收货</button>
								<button v-if="'waitsend' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" @click.stop="prompt('催促发货')">催促发货</button>
								<button v-if="'pay' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==0" @click.stop="prompt('支付')">立即支付</button>
								<button v-if="'collectmoney' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==1" @click.stop="collectMoney(todo.id,todo.no)">确认收款</button>
							</div>
						</div>
					</div>

					<!--预售资源-->
					<div class="li" v-for="todo in todos" @click="jump(todo.id)" v-if="param.status ==2">
						<div class="top">
							<div class="time">{{todo.ctime | timeFormat}}</div>
							<div class="states">{{todo.orderStatus | willSell}}</div>
						</div>
						<div class="content">
							<div class="in_list">
								<div class="image">
									<img v-bind:src="todo.image" :class="todo.imgsize.width>todo.imgsize.height?'list_imagess':'list_images'" v-show="todo.image">
									<img src="/static/icon/default_logo.png" class="list_images" v-show="!todo.image">
									<img class="contry" :src="todo.cFlagsPath" />
								</div>
								<div class="center">
									<div class="breed">
										<img src="/static/icons/sample.png" class="sample" v-if="todo.sample == 1">
										<div class="breed_name">{{todo.goodsName,6 | filterTxt}}</div>
									</div>
									<div class="spec b_top nomargin">{{todo.breedName}}</div>
									<div class="spec b_top nomargin" v-if="todo.unpaid=='0.000'">规格：{{todo.spec}}</div>
									<div class="spec b_top nomargin" v-if="todo.unpaid !=='0.000' && todo.orderStatus==66">预付定金：<span class="ff8201">{{todo.preMoney | floatType}}</span></div>
									<div class="spec b_top nomargin" v-if="todo.unpaid !=='0.000' && todo.orderStatus !==66">已付定金：<span class="ff8201">{{todo.preMoney | floatType}}</span></div>
									<div class="spec b_top nomargin color">预计到港时间：{{todo.arriveTime | timeFormat}}</div>
								</div>
							</div>
						</div>
						<div class="bottom">
							<div class="title">
								<button v-if="todo.orderStatus==60 ||todo.orderStatus==10 ||todo.orderStatus==70" @click.stop="jump(todo.id)">去查看</button>
								<button v-if="todo.orderStatus==50" class="special" @click.stop="prompt('确认收货')">确认收货</button>
								<button v-if="todo.orderStatus==40 || todo.orderStatus==30" @click.stop="prompt('催促发货')">催促发货</button>
								<button v-if="todo.orderStatus==20" @click.stop="prompt('支付')">去付尾款</button>
								<button v-if="todo.orderStatus==66" @click.stop="prompt('支付')">去付定金</button>
								<button v-if="'collectmoney' ==judgeOrderStatus(todo.orderStatus)&&httpPraram.type==1" @click.stop="collectMoney(todo.id,todo.no)">确认收款</button>
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
					<span v-show="bottomStatus !== 'loading' && todos.length >= 10" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
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
	import httpService from '../../common/httpService.js'
	import landscapeScrolls from '../../components/tools/landscapeScrolls'
	import sellLandscape from '../../components/tools/sellLandscape'
	import attentionHeads from '../../components/tools/attentionHeads'
	import filters from '../../filters/filters'
	import errPage from '../../components/tools/err'
	export default {
		data() {
			return {
				scrollTop: 0,
				err: {
					err: "很抱歉，没有找到相关订单",
					url: '/static/icons/order-point.png',
				},
				param: {
					status: 0,
					show: true,
					router: "home",
					list: [{
						name: '采购',
						status: true
					}, {
						name: '销售',
						status: false
					}, {
						name: '预售',
						status: false
					}]
				},
				more: '采购订单',
				title: '销售订单',
				show: false,
				todos: [],
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',

				//这里是导航栏
				data: [{
					name: '全部订单',
					back_id: 0,
					show: true
				}, {
					name: '受理中',
					back_id: 10,
					show: false
				}, {
					name: '待付款',
					back_id: 20,
					show: false
				}, {
					name: '待发货',
					back_id: 40,
					show: false
				}, {
					name: '待收货',
					back_id: 50,
					show: false
				}, {
					name: '已完成',
					back_id: 60,
					show: false
				}, {
					name: '已取消',
					back_id: -1,
					show: false
				}],
				buttonStatus: [{

				}],
				httpPraram: { //用来识别销售和采购的参数，预购不需要
					type: 1,
					orderstatus: 0,
					page: 1,
					pageSize: 10
				}
			}
		},
		methods: {
			judgeOrderStatus(val) {
				let status = ''
				switch(val) {
					case -2:
						status = '';
						break;
					case -1:
						status = '';
						break;
					case 0:
						status = 'cancel';
						break;
					case 10:
						status = 'cancel';
						break;
					case 20:
						status = 'pay';
						break;
					case 30:
						status = 'collectmoney';
						break;
					case 40:
						status = 'waitsend';
						break;
					case 50:
						status = 'send';
						break;
					case 60:
						status = 'success';
						break;
					case 70:
						status = 'success';
						break;
				}
				return status;
			},
			changeOrderStatus(item) {
				this.httpPraram.type = item.index;
				this.httpPraram.orderstatus = item.id;
				this.httpPraram.page = 1;
				this.todos = [];
				this.getHttp();
			},
			cancelOrder(id, no, type) {
				let _self = this;

				function cancelOrder() {
					common.$emit('show-load');
					let url = common.addSID(common.urlCommon + common.apiUrl.most);
					let body = {
						biz_module: 'orderService',
						biz_method: 'cancelOrder',
						biz_param: {
							id: id,
							no: no
						}
					};
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
					httpService.myResource(url, body, function(suc) {
						common.$emit('close-load');
						if(suc.data.code == '1c01') {
							common.$emit('message', suc.data.msg);
							_self.todos.splice(0, _self.todos.length);
							_self.httpPraram.page = 1;
							_self.getHttp();
						} else {
							common.$emit('message', suc.data.msg);
						}
					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				}
				_self.$msgBox.showMsgBox({
					title: '提示',
					content: '确定取消订单？',
				}).then(async(val) => {
					cancelOrder();
				}).catch(() => {});
			},
			collectMoney(id, no) {
				function collectMoney() {
					common.$emit('show-load');
					let url = common.addSID(common.urlCommon + common.apiUrl.most);
					let body = {
						biz_module: 'orderService',
						biz_method: 'confirmOrderPaySuccess',
						biz_param: {
							id: id,
							no: no
						}
					};
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
					httpService.myResource(url, body, function(suc) {
						common.$emit('close-load');
						if(suc.data.code == '1c01') {
							common.$emit('message', suc.data.msg);
							_self.todos.splice(0, _self.todos.length);
							_self.httpPraram.page = 1;
							_self.getHttp();
						} else {
							common.$emit('message', suc.data.msg);
						}
					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				}
				this.$msgBox.showMsgBox({
					title: '提示',
					content: '确定确认收款？',
					isShowCancelImg: '/static/icon/list/miao1.png',
					isShowCancelBtn: false,
				}).then(async(val) => {
					collectMoney()
				}).catch(() => {});
			},

			getHttp(back) {
				let _self = this;
				if(_self.httpPraram.page == 1) {
					this.allLoaded = false;
					common.$emit('show-load');
				}
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'orderService',
					biz_method: 'queryCartOrderList',
					biz_param: {
						orderStatus: _self.httpPraram.orderstatus,
						type: _self.httpPraram.type,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize
					}
				};
				if(_self.param.status == 2) {
					body.biz_method = 'queryPreOrderList'
				}
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myResource(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						if(_self.httpPraram.page == 1) {
							_self.todos.splice(0, _self.todos.length);
						}
						let listArr = suc.data.biz_result.list;

						if(listArr.length < _self.httpPraram.pageSize) {
							_self.allLoaded = true;
						}
						for(let i = 0; i < listArr.length; i++) {
							if(listArr[i].goodsArray) {
								for(let j = 0; j < listArr[i].goodsArray.length; j++) {
									var img = new Image();
									var imgSize = [];
									img.src = listArr[i].goodsArray[j].image;
									img.onload = function() {}
									imgSize = {
										width: img.width,
										height: img.height
									};
									listArr[i].goodsArray[j].imgsize = imgSize;
								}
								_self.todos.push(listArr[i]);
							} else {
								var imgs = new Image();
								imgs.src = listArr[i].image;
								var imgSizes = {
									width: imgs.width,
									height: imgs.height
								};
								listArr[i].imgsize = imgSizes;
								_self.todos.push(listArr[i]);

							}

						}

					} else {
						common.$emit('message', suc.data.msg);
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
			tabOrder(param) {
				let _self = this;
				if(param == 0) {
					_self.data = [{
						name: '全部订单',
						back_id: 0,
						show: true
					}, {
						name: '受理中',
						back_id: 10,
						show: false
					}, {
						name: '待付款',
						back_id: 20,
						show: false
					}, {
						name: '待发货',
						back_id: 40,
						show: false
					}, {
						name: '待收货',
						back_id: 50,
						show: false
					}, {
						name: '已完成',
						back_id: 60,
						show: false
					}, {
						name: '已取消',
						back_id: -1,
						show: false
					}]

				} else if(param == 1) { //采购
					_self.data = [{ //销售
						name: '全部订单',
						back_id: 0,
						show: true
					}, {
						name: '受理中',
						back_id: 10,
						show: false
					}, {
						name: '待买家付款',
						back_id: 20,
						show: false
					}, {
						name: '待收款',
						back_id: 30,
						show: false
					}, {
						name: '待发货',
						back_id: 40,
						show: false
					}, {
						name: '待买家收货',
						back_id: 50,
						show: false
					}, {
						name: '已完成',
						back_id: 60,
						show: false
					}, {
						name: '已取消',
						back_id: -1,
						show: false
					}]
				}
				if(param == 2) {
					_self.data = [{
						name: '全部订单',
						back_id: 0,
						show: true
					}, {
						name: '待付定金',
						back_id: 66,
						show: false
					}, {
						name: '受理中',
						back_id: 10,
						show: false
					}, {
						name: '待付尾款',
						back_id: 20,
						show: false
					}, {
						name: '待发货',
						back_id: 40,
						show: false
					}, {
						name: '待收货',
						back_id: 50,
						show: false
					}, {
						name: '已完成',
						back_id: 60,
						show: false
					}]
				}
				//				this.allLoaded = false;
				//				_self.httpPraram.type = param;
				//				this.httpPraram.page = 1;
				//				_self.getHttp();
			},
			jump: function(id) {
				this.$router.push('allOrderDetail/' + id);
				common.$emit('post-no', {
					id: id
				});
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
			prompt(text) {
				function loadApp() {
					window.location.href = common.appUrl;
				}
				_self.$msgBox.showMsgBox({
					title: '温馨提示',
					content: text + '请下载App',
				}).then(async(val) => {
					this.loadApp()
				}).catch(() => {});
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
		filters: (filters, {

		}),
		components: {
			landscapeScrolls,
			sellLandscape,
			attentionHeads,
			errPage
		},
		created() {
			let _self = this;
			this.httpPraram.page = 1;
			_self.httpPraram.type = 0;
			_self.httpPraram.orderstatus = _self.data[common.pageParam.orderStatus].back_id;
			for(let i = 0; i < _self.data.length; i++) {
				_self.data[i].show = false;
			}
			_self.data[common.pageParam.orderStatus].show = true;
			this.getHttp();
			common.$on('mineToOrder', function(index) {
				_self.httpPraram.orderstatus = _self.data[index].back_id;
				_self.httpPraram.type = 0;
				_self.httpPraram.page = 1;
				_self.param.show = true;
				_self.param.status = 0;
				_self.data = [{
					name: '全部订单',
					back_id: 0,
					show: true
				}, {
					name: '受理中',
					back_id: 10,
					show: false
				}, {
					name: '待付款',
					back_id: 20,
					show: false
				}, {
					name: '待发货',
					back_id: 40,
					show: false
				}, {
					name: '待收货',
					back_id: 50,
					show: false
				}, {
					name: '已完成',
					back_id: 60,
					show: false
				}, {
					name: '已取消',
					back_id: -1,
					show: false
				}]
				for(var i = 0; i < _self.data.length; i++) {
					_self.data[i].show = false;
				}
				for(var i = 0; i < _self.param.list.length; i++) {
					_self.param.list[i].status = false;
					if(i == 0) _self.param.list[i].status = true;
				}
				_self.data[index].show = true;
				_self.getHttp();
			});
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}

	}
</script>