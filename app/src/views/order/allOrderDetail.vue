<style lang="less" scoped>
	.circle_box {
		background-color: #fff;
		overflow: hidden;
		margin: 10px;
		border-radius: 7px;
		box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
	}
	
	.all_order_detail {
		height: 100vh;
		overflow: auto;
		padding: 45px 0;
		.title {
			position: absolute;
			top: 0;
			width: 100%;
			height: 45px;
		}
		.main {
			overflow-y: scroll;
			width: 100%;
			background-color: #f3f3f3;
		}
		.box {
			width: 100%;
			float: left;
			position: relative;
			overflow: auto;
			.status {
				float: left;
				width: 100%;
				margin-top: 10px;
			}
			.status_top {
				float: left;
				width: 100%;
				font-size: 14px;
				line-height: 14px;
				padding: 16px 15px;
				background: white;
				text-align: left;
			}
			.address_box {
				float: left;
				width: 100%;
				/*padding-right: 20px;*/
				background: white;
				padding: 17px 15px;
				.content {
					float: left;
					width: 100%;
					font-size: 14px;
					line-height: 25px;
					color: #333;
					div {
						text-align: left;
					}
					span {
						border-right: 1px solid #666;
						padding-right: 3px;
						margin-right: 3px;
					}
					.left_content {
						float: left;
						text-align: left;
						/*min-width: 90px;*/
						img {
							margin-right: 15px;
						}
					}
					img {
						float: left;
						max-height: 20px;
					}
				}
				.address {
					margin-top: 5px;
				}
			}
			.list_header {
				float: left;
				padding: 0px 15px;
				width: 100%;
				background: white;
				margin-top: 10px;
				&>div {
					float: left;
					width: 100%;
					font-size: 14px;
					padding: 11px 0px;
					border-bottom: 1px solid #F5F5F5;
				}
				.time_font {
					float: left;
					line-height: 14px;
				}
				.audit_state {
					float: right;
					line-height: 14px;
					color: #ff8201;
				}
			}
		}
		.logistics {
			float: left;
			width: 100%;
			padding: 0 15px;
			margin-top: 10px;
			background: white;
			&>div {
				float: left;
				padding: 10px 0 0 0;
				color: #050607;
				margin-bottom: 15px;
				width: 100%;
				img {
					float: left;
					width: 20px;
				}
				p {
					float: left;
				}
			}
			ul {
				float: left;
				padding-bottom: 10px;
				li {
					float: left;
					width: 100%;
					height: 90px;
					position: relative;
					&.now {
						color: #ff8201;
					}
					img {
						height: 100%;
						float: left;
					}
					.context {
						float: right;
						width: 93%;
						text-align: left;
						font-size: 14px;
						line-height: 15px;
						margin-top: 5px;
					}
					.time {
						float: right;
						width: 93%;
						text-align: left;
						font-size: 14px;
						position: absolute;
						bottom: 5px;
						left: 7%;
					}
				}
			}
		}
		.box .son_order {
			float: left;
			padding: 0 15px;
			width: 100%;
			background: white;
			li {
				float: left;
				position: relative;
				padding: 15px 0;
				width: 100%;
				border-bottom: 1px solid #F5F5F5;
				position: relative;
				.image {
					width: 88px;
					height: 75px;
					position: relative;
					float: inherit;
					overflow: hidden;
					.fleg {
						position: absolute;
						top: 0;
						left: 0;
						width: 21px;
						z-index: 1;
					}
					.list_image {
						width: 100%;
						min-height: 75px;
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
					}
					.list_images {
						min-width: 88px;
						height: 100%;
						position: absolute;
						top: 0;
						left: 50%;
						transform: translateX(-50%);
					}
				}
				.res_content {
					width: 100%;
					padding-left: 100px;
					top: 0;
					text-align: left;
					position: relative;
					.res_content_left {
						float: left;
						width: 50%;
						.sample_img {
							height: 1.7rem;
							margin-left: 3px;
							float: left;
						}
						&>div {
							font-size: 16px;
							line-height: 16px;
							margin-bottom: 22px;
							float: left;
							.good_name {
								float: left;
							}
						}
						&>p {
							font-size: 14px;
							line-height: 14px;
							margin-bottom: 12px;
							float: left;
						}
						&>.location {
							margin-bottom: 0px;
						}
					}
					.num {
						margin-top: 20px;
						font-size: 15px;
						color: #999;
					}
				}
				.res_content_right {
					float: right;
					font-size: 16px;
					line-height: 16px;
					width: 50%;
				}
			}
		}
		.box .all_price {
			float: left;
			width: 100%;
			background: white;
			border-bottom: 1px solid #F5F5F5;
			font-size: 14px;
			line-height: 14px;
			padding: 13px 0px;
			.transport_price {
				float: left;
				width: 100%;
				padding: 0px 15px;
				margin-bottom: 10px;
				color: #666;
				.transport_price_left {
					float: left;
					color: #666;
				}
				.transport_price_right {
					float: right;
					color: #999;
					&.color {
						color: #ff8201;
					}
				}
			}
			.order_price {
				float: left;
				width: 100%;
				padding: 0px 15px;
				color: #333;
				.order_price_left {
					float: left;
					color: #666;
				}
				.order_price_right {
					float: right;
					color: #ff8201;
				}
			}
		}
	}
	
	.all_order_detail .footer {
		height: 45px;
		position: absolute;
		width: 100%;
		bottom: 0;
		background-color: #fff;
		box-shadow: 0 0 1px 1px #DFDEDD;
		padding-top: 8px;
		text-align: right;
		p {
			height: 30px;
			display: inline-block;
			line-height: 30px;
			padding: 0 10px;
			margin: 0 5px 0 0;
			border: 1px solid rgba(230,230,230,.5);
			border-radius: 50px;
			box-shadow: 0px 2px 1px 0px rgba(0,0,0,.1);
		}
		.special {
			border: 1px solid #ff8201;
			color: #fff;
			background-color: #ff8201;
		}
		.pay-money {
			color: #fff;
			background-color: #FF8201;
			border: 1px solid #ff8201;
		}
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_right {
		float: right;
		font-size: 16px;
		line-height: 16px;
		text-align: right;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_left>div {
		margin-bottom: 22px;
		font-size: 16px;
		line-height: 16px;
		float: left;
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_left .location {
		font-size: 14px;
		line-height: 14px;
		width: 100%;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_left .spec {
		font-size: 14px;
		line-height: 14px;
		width: 150px;
		span {
			margin-right: 5px;
			img {
				vertical-align: middle;
				height: 14px;
				margin-right: 4px;
			}
		}
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_left .time {
		color: #999;
		font-size: 12px;
		width: 150px;
		margin-bottom: 0;
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_left .sample_img {
		height: 1.7rem;
		float: left;
		margin-left: 3px;
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_right {
		float: right;
		font-size: 16px;
		line-height: 16px;
		text-align: right;
		width: 50%;
	}
	
	.all_order_detail .box .son_order li .res_content .res_content_right>p {
		width: 100%;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
<template>
	<div class="all_order_detail">
		<div class="title">
			<myHeader :param="my_header"></myHeader>
		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<div class="box">
					<div class="circle_box">
						<p class="status_top ">
							订单号:{{todo.no}}
						</p>
					</div>
					<div class="circle_box">
						<div class="address_box">
							<div class="content">
								<div class="left_content"><img src="/static/icons/consignee.png">收件人：</div>
								<div><span>{{todo.consignee}}</span>{{todo.consigneePhone}}</div>
							</div>
							<div class="content address">
								<div class="left_content"><img src="/static/icons/receipt_address.png">地址：</div>
								<div class="address_detail">{{todo.consigneeAddr}}</div>
							</div>
						</div>
					</div>

					<div class="circle_box">
						<div class="list_header">
							<div>
								<p class="time_font"><span>{{todo.ctime | timeFormat}}</span></p>
								<p class="audit_state" v-if="todo.type == 0 && todo.pre == 0">{{todo.orderStatus | purchaseStatus}}</p>
								<p class="audit_state" v-if="todo.type == 1 && todo.pre == 0">{{todo.orderStatus | sellStatus}}</p>
								<p class="audit_state" v-if="todo.type == 0 && todo.pre == 1">{{todo.orderStatus | willSell}}</p>
							</div>
						</div>
						<ul class="son_order">
							<li v-for="item in todo.goodsArray">
								<div class="image">
									<img v-bind:src="item.cFlagsPath" class="fleg" v-show="item.cFlagsPath">
									<img v-bind:src="item.image" v-show="item.image" :class="item.imgsize.width>item.imgsize.height?'list_images':'list_image'">
									<img src="/static/icon/default_logo.png" class="list_images" v-show="!item.image">
								</div>

								<div class="res_content">
									<div class="res_content_left">
										<div>
											{{item.goodsName}}
										</div>
										<img src="/static/icons/sample.png" class="sample_img" v-if="item.sample == 1">
										<p class="spec">
											<span><img src="/static/icon/list/local.png">{{item.location}}</span>
											<span><img src="/static/icon/list/spc.png">{{item.spec}}</span>
										</p>
										<p class="time" v-if="todo.pre == 1">预计到港时间：{{item.arriveTime | timeFormat}}</p>
										<!--<p class="location">产地：<span>{{item.location}}</span></p>-->
									</div>
									<div class="res_content_right">
										<p>{{item.price}}<span>元/{{item.unit}}</span></p>
										<p class="num">x<span>{{item.number}}</span></p>
									</div>

								</div>
							</li>
						</ul>
						<div class="all_price">
							<div v-if="todo.pre==0">
								<div class="transport_price">
									<p class="transport_price_left">杂费价格:</p>
									<p class="transport_price_right" v-if="todo.orderStatus==0 || todo.orderStatus==10">待确定</p>
									<p class="transport_price_right" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">￥{{todo.incidentals}}</p>
								</div>
								<div class="transport_price">
									<p class="transport_price_left">运费价格:</p>
									<p class="transport_price_right" v-if="todo.orderStatus==0 || todo.orderStatus==10">待确定</p>
									<p class="transport_price_right" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">￥{{todo.freight}}</p>
								</div>
								<div class="transport_price">
									<p class="transport_price_left">优惠价格:</p>
									<p class="transport_price_right" v-if="todo.orderStatus==0 || todo.orderStatus==10">待确定</p>
									<p class="transport_price_right" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">￥{{todo.preferential}}</p>
								</div>
								<div class="order_price">
									<p class="order_price_left">总计金额:</p>
									<p class="order_price_right">￥<span>{{todo.total | floatType}}</span>元</p>
								</div>
							</div>
							<!----------------------------------------预售部分----------------------------------->
							<div v-if="todo.pre==1">
								<div class="transport_price" v-if="todo.orderStatus !==66">
									<p class="transport_price_left">杂费价格:</p>
									<p class="transport_price_right" v-if="todo.orderStatus==0 || todo.orderStatus==10">待确定</p>
									<p class="transport_price_right" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">￥{{todo.incidentals}}</p>
								</div>
								<div class="transport_price" v-if="todo.orderStatus !==66">
									<p class="transport_price_left">运费价格:</p>
									<p class="transport_price_right" v-if="todo.orderStatus==0 || todo.orderStatus==10">待确定</p>
									<p class="transport_price_right" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">￥{{todo.freight}}</p>
								</div>
								<div class="transport_price" v-if="todo.orderStatus !==66">
									<p class="transport_price_left">优惠价格:</p>
									<p class="transport_price_right" v-if="todo.orderStatus==0 || todo.orderStatus==10">待确定</p>
									<p class="transport_price_right" v-if="todo.orderStatus!==0 && todo.orderStatus!==10">￥{{todo.preferential}}</p>
								</div>
								<div class="transport_price">
									<p class="transport_price_left">已支付定金:</p>
									<p class="transport_price_right color">￥{{todo.preMoney}}</p>
								</div>
								<div class="transport_price">
									<p class="transport_price_left">
										<span v-if="todo.orderStatus !==66 && todo.orderStatus !==20">已支付尾款:</span>
										<span v-if="todo.orderStatus ==66 || todo.orderStatus ==20 ">待支付尾款:</span>
									</p>
									<p class="transport_price_right">￥{{todo.payMentMoney}}</p>
								</div>
								<div class="order_price" v-if="todo.orderStatus !==66 && todo.orderStatus !==10">
									<p class="order_price_left">
										<span v-if="todo.orderStatus !==20">总计金额:</span>
										<span v-if="todo.orderStatus ==20 ">总共应付金额:</span>
										<!--总计金额:-->
									</p>
									<p class="order_price_right">￥<span>{{todo.total | floatType}}</span>元</p>
								</div>
							</div>
						</div>
						<div class="logistics" v-if="todo.orderStatus == 50 && logistics != ''">
							<div>
								<img src="/static/icons/wuliu.png" class="logis_img">
								<p>物流信息</p>
							</div>
							<ul>
								<li v-for="(item,index) in logistics" v-if="index == 0" class="now">
									<img src="/static/icons/oranges.png">
									<div class="context">{{item.context}}</div>
									<div class="time">{{item.time}}</div>
								</li>
								<li v-for="(item,index) in logistics" v-if="index > 0">
									<img src="/static/icons/unoranges.png">
									<div class="context">{{item.context}}</div>
									<div class="time">{{item.time}}</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</mt-loadmore>
		</div>
		<div class="footer" v-if="todo.pre == 0">
			<p @click="call()" >联系我们</p>
			<p @click="prompt('如需发货，')" v-if="todo.orderStatus == 40  && todo.type == 1">我要发货</p>
			<p class="pay-money" v-if="todo.orderStatus == 20 && todo.type == 0" @click="prompt('支付')">立即付款</p>
			<p @click="prompt('如需申请，')" v-if="todo.orderStatus == 60 && todo.type == 0 ">申请售后</p>
			<p @click="boxPopDefault()" v-if="todo.orderStatus == 0 || todo.orderStatus == 10 && todo.type == 0">取消订单</p>
			<p @click="cancelOrder(todo.id,todo.no,todo.type)" v-if="todo.orderStatus == 20 && todo.type == 1">取消订单</p>
			<p @click="prompt('如需确认收货，')" v-if="todo.orderStatus == 50 && todo.type == 0" class="special">确认收货</p>
		</div>
		<div class="footer" v-if="todo.pre == 1">
			<p @click="call()">联系我们</p>
			<p @click="prompt('如需催促发货，')" v-if="todo.orderStatus == 40  || todo.orderStatus == 30" class="special">催促发货</p>
			<p class="pay-money" v-if="todo.orderStatus == 20 || todo.orderStatus == 66" @click="prompt('支付')">立即付款</p>
			<p @click="prompt('如需确认收货，')" v-if="todo.orderStatus == 50" class="special">确认收货</p>
		</div>
		<boxPopDefault :popshow="boxInfo" v-on:agreement='cancelOrder(todo.id,todo.no,todo.type)' v-show="boxInfo.show"></boxPopDefault>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import boxPopDefault from '../../components/popUpType/boxPopDefault'
	import filters from '../../filters/filters'
	export default {
		data() {
			let _self = this;
			return {
				boxInfo: { //默认的弹窗样式
					show: false,
					type: 3,
					img: '/static/icon/list/miao2.png',
					text: '确认取消订单'
				},
				show: true,
				todo: '',
				no: '',
				wrapperHeight: 0,
				phone: common.servicePhone,
				my_header: {
					name: '采购订单',
					status: 0, //订单类型区分：0销售1采购2预售
				},
				logistics: [],

			}
		},
		components: {
			myHeader,
			boxPopDefault,

		},
		created() {
			let _self = this;
			_self.getHttp(_self.$route.params.allOrderId);
			console.log(_self.todo)
			common.$on('post-no', function(item) {
				_self.my_header.name = '';
				_self.getHttp(item.id);
			})
			if(!common.servicePhone) this.getCustomerPhone();
		},
		methods: {
			changeTitle() {
				let _self = this;
				if(_self.todo.pre == 0 && _self.todo.type == 0) {
					_self.my_header.name = '采购订单';
				} else if(_self.todo.pre == 0 && _self.todo.type == 1) {
					_self.my_header.name = '销售订单';
				} else if(_self.todo.pre == 1 && _self.todo.type == 0) {
					_self.my_header.name = '预售订单';
				}
			},
			boxPopDefault() {
				let _self = this;
				_self.boxInfo.show = true;
			},
			prompt(text) {
				function loadApp() {
					window.location.href = common.appUrl;
				}

				this.$msgBox.showMsgBox({
					title: '提示',
					content: text + '请下载App',
				}).then(async(val) => {
					loadApp();
				}).catch(() => {});
			},
			back() {
				window.history.go(-1);
			},
			call() {
				window.location.href = "tel:" + this.phone;
			},
			cancelOrder(id, no) {
				let _self = this;
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
						_self.getHttp(id);
						common.$emit('mineToOrder', 0)
						_self.$router.push('/allOrder')
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getCustomerPhone() {
				let _self = this;
				this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
					if(response.data.code == '1c01') {
						common.servicePhone = response.data.biz_result.serviceMobile;
						_self.phone = response.data.biz_result.serviceMobile;
					}
				}, (err) => {
					common.$emit('message', err.data.msg);
				});
			},
			getHttp(id) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'orderService',
					biz_method: 'queryCartOrderInfo',
					biz_param: {
						id: id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myResource(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						let listObj = suc.data.biz_result;
						for(var i = 0; i < listObj.goodsArray.length; i++) {
							var img = new Image();
							img.src = listObj.goodsArray[i].image;
							var imgSize = {
								width: img.width,
								height: img.height
							};
							listObj.goodsArray[i].imgsize = imgSize;
						}
						_self.todo = listObj;
						_self.changeTitle();
						if(_self.todo.orderStatus == 50) _self.getlogistics(id);
					}

				}, function(err) {
					common.$emit('close-load');
				})
			},
			getlogistics(id) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'logisticsService',
					biz_method: 'queryLogisticsDetails',
					biz_param: {
						orderId: id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myResource(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						//						console.log(suc)
						if(suc.data.biz_result.data) _self.logistics = suc.data.biz_result.data;
						//if (suc.data.biz_result.data) _self.logistics = _self.logistics.reverse();
						//console.log(_self.logistics)
					}
				}, function(err) {
					common.$emit('close-load');
				})
			},
			handleScroll() {
				this.scrollTop = this.$refs.wrapper.scrollTop;
			},
			getScrollTop() {
				this.$refs.wrapper.scrollTop = this.scrollTop;
			}
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 45;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}
	}
</script>