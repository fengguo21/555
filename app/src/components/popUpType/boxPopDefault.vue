<style lang="less" scoped>
	.black {
		width: 100%;
		height: 100vh;
		position: absolute;
		z-index: 999;
		background-color: #000;
		top: 0;
		opacity: 0.6;
	}
	
	.boxPopUp {
		position: absolute;
		width: 300px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 3001;
		&.small {
			width: 230px;
		}
		.cancel {
			width: 24px;
			height: 24px;
			position: absolute;
			right: -10px;
			background: #fff;
			top: -10px;
			z-index: 10;
			border-radius: 50px;
			background: url(/static/icon/list/x2.png) no-repeat;
			background-size: 100% 100%;
		}
		.tbox {
			background-color: #fff;
			padding-bottom: 0.1px;
			position: relative;
			border-radius: 14px;
			overflow: hidden;
			/*quxiao*/
			.title {
				color: #333;
				height: 55px;
				line-height: 55px;
				font-size: 18px;
				border-bottom: 0.5px solid #ccc;
			}
			.background {
				padding: 20px 0;
				text-align: center;
				img {
					width: 85px;
				}
			}
			.content {
				padding: 0 17px;
				text-align: center;
				font-size: 14px;
				color: #666;
				line-height: 25px;
				.call {
					width: 214px;
					border: 1px solid #84BF51;
					margin: 22px auto;
					color: #fff;
					font-size: 17px;
					line-height: 44px;
					background-color: #84BF51;
					border-radius: 50px;
				}
				.other {
					background-color: #fff;
					color: #84BF51;
				}
				.price_box {
					line-height: 40px;
					text-align: left;
					font-size: 16px;
					color: #666;
					.image_box {
						vertical-align: middle;
						margin-right: 10px;
					}
					.input_box {
						width: 60px;
						border: 0;
						height: 20px;
						border-bottom: 1px solid #e6e6e6;
					}
				}
				.tips {
					text-align: left;
					color: #f00;
					line-height: 40px;
					font-size: 12px
				}
			}
			.text {
				margin-bottom: 20px;
				&>p:nth-child(1) {
					color: #FFAE00;
					font-size: 17px;
					line-height: 30px;
				}
				&>p:not(:first-child) {
					color: #999;
					font-size: 14px;
					line-height: 30px;
				}
			}
			.bottom {
				height: 45px;
				display: flex;
				div {
					flex: 1;
					line-height: 45px;
					background-color: #f2f2f2;
					&.color {
						background-color: #fb8902;
						color: #fff;
					}
				}
			}
		}
	}
	
	.ydb {
		padding: 0 15px 20px;
		background-color: #fff;
		border-radius: 8px;
		.title {
			color: #fb8902;
			font-size: 20px;
			line-height: 50px;
		}
		.background {
			img {
				height: 100px;
			}
		}
		.text {
			padding: 10px 0;
			p {
				color: #999;
				font-size: 14px;
				line-height: 25px;
			}
		}
		.bottom {
			.call {
				display: inline-block;
				line-height: 40px;
				background-color: #ccc;
				width: 180px;
				border-radius: 20px;
				color: #fff;
				cursor: not-allowed;
				&.active {
					background-color: #fb8902;
				}
			}
		}
		.choose {
			padding: 5px 0;
			i {
				display: inline-block;
				width: 12px;
				height: 12px;
				border: 1px solid #999;
				margin-right: 5px;
				color: #999;
				vertical-align: middle;
				&.active {
					border: 1px solid #FB8B05;
					background: url(/static/icon/list/duihao.png) no-repeat;
					background-size: 100% auto;
					background-position: center center;
				}
			}
			span {
				font-size: 12px;
				span {
					color: #EF4444;
				}
			}
		}
	}
</style>
<template>
	<div>
		<!--
        	作者：361789874@qq.com
        	时间：2017-10-18
        	描述：
        	type=1;选择寄样方式；
        	type=2;选择价格是否发生改变
        	type=3;订单确认；id=multipleOrders
        -->

		<!--选择寄样方式-->
		<div class="boxPopUp" v-if="popshow.type==1">
			<div class="tbox">
				<div class="title">
					<span>样品检测方式</span>
				</div>
				<div class="content">
					<div class="call" @click="dropIn()">上门看样</div>
					<div class="call other" @click="confirmSamples()">寄样</div>
				</div>
			</div>
		</div>
		<!--选择价格是否发生改变-->
		<div class="boxPopUp" v-if='popshow.type==2'>
			<div class="tbox">
				<div class="title">
					<span>价格是否发生改变</span>
				</div>
				<div class="content">
					<div v-for="(todo,index) in priceChange" class="price_box">
						<div v-if="index==0" @click="chooseprice(index)">
							<img class="image_box" src="/static/images/no-select.png" v-if="!todo.status">
							<img class="image_box" src="/static/images/over-select.png" v-if="todo.status"> {{todo.name}}
						</div>
						<div v-if="index==1" @click="chooseprice(index)">
							<img class="image_box" src="/static/images/no-select.png" v-if="!todo.status">
							<img class="image_box" src="/static/images/over-select.png" v-if="todo.status"> {{todo.name}}
							<input class="input_box" type="number" name="" id="" value="" />元
						</div>
						<div v-if="index==2" @click="chooseprice(index)">
							<img class="image_box" src="/static/images/no-select.png" v-if="!todo.status">
							<img class="image_box" src="/static/images/over-select.png" v-if="todo.status"> {{todo.name}}
							<input class="input_box" type="number" name="" id="" value="" />元
						</div>
					</div>
					<div class="tips">价格变动可能会影响到成交哦</div>
				</div>
				<div class="bottom">
					<div @click="cancel()">取消</div>
					<div class="color" @click="confirmPrice()">确认</div>
				</div>
			</div>
		</div>
		<!--订单确认-->
		<div class="boxPopUp small" v-if="popshow.type==3">
			<div class="cancel" @click="cancel()"></div>
			<div class="tbox">
				<div class="background">
					<img :src="popshow.img" alt="" />
				</div>
				<div class="text">
					<p>温馨提示</p>
					<p>{{popshow.text}}</p>
				</div>
				<div class="bottom">
					<div class="call color" @click="submit3()">确认</div>
				</div>
			</div>
		</div>
		<!--开通药贷宝-->
		<div class="boxPopUp small" v-if="popshow.type==4">
			<div class="cancel" @click="cancel()"></div>
			<div class="ydb">
				<p class="title">温馨提示</p>
				<div class="background">
					<img :src="popshow.img" alt="" />
				</div>
				<div class="text">
					<p>{{popshow.text1}}</p>
					<p>{{popshow.text2}}</p>
				</div>
				<div class="bottom">
					<div class="call" :class="{active:popshow.status}" @click="submit4()">开通药贷宝</div>
				</div>
				<div class="choose" @click="submit4_1()">
					<i :class="{active:popshow.status}"></i><span>我已同意《<span>药贷宝</span>》相关协议</span>
				</div>
			</div>
		</div>
		<!--开启个人认证-->
		<div class="boxPopUp small" v-if="popshow.type==5">
			<div class="cancel" @click="cancel()"></div>
			<div class="ydb">
				<p class="title">温馨提示</p>
				<div class="background">
					<img :src="popshow.img" alt="" />
				</div>
				<div class="text">
					<p>抱歉，开通药贷宝需要完成个人认证并审核哦~</p>
				</div>
				<div class="bottom">
					<div class="call active" @click="submit5()">开通个人认证</div>
				</div>
			</div>
		</div>

		<div @click="cancel()" class="black"></div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				priceChange: [{
					name: '价格未变',
					status: true,
				}, {
					name: '价格上涨',
					status: false,
				}, {
					name: '价格下跌',
					status: false,
				}]
			}
		},
		props: {
			popshow: {},
		},
		computed: {},
		methods: {
			cancel() {
				this.popshow.show = false;
				for(var i = 0; i < this.priceChange.length; i++) {
					this.priceChange[i].status = false;
					this.priceChange[0].status = true;
				}
			},
			chooseprice(index) {
				for(var i = 0; i < this.priceChange.length; i++) {
					this.priceChange[i].status = false;
				}
				this.priceChange[index].status = true;

			},
			confirmPrice() {
				this.cancel();
			},
			//确定上门看样
			dropIn() {
				let _self = this;
				_self.$toast({
					message: '此功能暂未开放',
					position: 'bottom',
					duration: 2000
				})
			},
			confirmSamples() {
				let _self = this;
				this.$router.push('/express/' + _self.popshow.offerId);
				this.cancel();
			},
			submit3() {
				this.popshow.show = false;
				this.$emit('agreement');
			},
			submit4_1() {
				if(this.popshow.status) {
					this.popshow.status = false;
				} else {
					this.popshow.status = true;
				}
			},
			submit4() {
				let _self = this;
				if(this.popshow.status) {
					let _self = this;
					let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
					let otherbody = {
						biz_module: 'ydbService',
						biz_method: 'addAccount',
						biz_param: {}
					};
					otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
					otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
					httpService.queryEmployeeInfo(otherurl, otherbody, function(suc) {
						if(suc.code == '1c01') {
							this.popshow.show = false;
							common.$emit("gotoRouter", 0)
							this.$router.push(router);
							common.$emit('message', suc.body.msg);

						} else {
							_self.popshow.type = 5;
							_self.popshow.type1 = '抱歉，开通药贷宝需要完成个人认证并审核哦~'
							_self.popshow.type2 = '';
						}
					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				} else {
					_self.$toast({
						message: '请查看药贷宝相关协议',
						position: 'bottom',
						duration: 1000
					})
				}
			}

		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>