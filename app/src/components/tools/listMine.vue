<style lang="less" scoped>
	.list {
		margin-bottom: 0.8rem;
		.all_order {
			height: 3.6rem;
			line-height: 3.6rem;
			background: white;
			border-bottom: 1px solid #eee;
			margin: 0;
			position: relative;
			&.platform {
				margin-top: 10px;
			}
			.title {
				float: left;
				font-size: 1.3rem;
				color: #333333;
				margin-left: 4%;
			}
			.contain {
				position: relative;
				font-size: 1.3rem;
				color: #999999;
				margin-right: 4%;
				right: 0;
				height: 3.6rem;
				p {
					float: right;
					margin-right: 1rem;
					font-size: 0.923rem;
				}
				img {
					position: absolute;
					height: 1rem;
					right: 0;
					top: 1.2rem;
				}
			}
		}
	}
	
	.list .entrance {
		display: flex;
		flex-direction: row;
		background: white;
		width: 100%;
		margin: 0;
		padding: 1.3846rem 0 10px;
		.entrance_box {
			flex: 1;
			box-sizing: border-box;
			position: relative;
			color: #333;
			font-size: 1.0769rem;
			&.noFlex {
				flex: inherit;
				width: 20%;
			}
			.box_img{
				height: 1.6rem;
				.entrance_img {
				width: 1.4rem;
			}
			}
			
			.circle {
				min-width: 1.0769rem;
				height: 1.0769rem;
				border-radius: 50px 50px 50px 50px;
				background: #fff;
				box-shadow: 0 0 0 1px #ff6f3e;
				display: inline-block;
				position: absolute;
				left: 4.1rem;
				top: -0.3846rem;
				font-size: 0.923rem;
				color: #ff6f3e;
				line-height: 1.3076rem;
				padding: 0 0.1538rem;
				z-index: 1;
			}
		}
	}
	
	.logistics {
		height: 4.2307rem;
		background: #fff;
		border-top: 0.0769rem solid #eee;
		border-bottom: 0.0769rem solid #eee;
		position: relative;
		.left_title {
			width: 5.2307rem;
			height: 4.2307rem;
			border-right: 0.0769rem solid #eee;
			position: absolute;
			i {
				display: inline-block;
				width: 0.923rem;
				height: 0.923rem;
				background: #eee;
				border-radius: 50%;
				position: absolute;
				right: -0.4615rem;
				top: 1.5384rem;
			}
			p {
				font-size: 0.8461rem;
				margin-top: 1rem;
				color: #999;
				span {
					font-size: 0.7692rem;
				}
			}
		}
		.right_box {
			padding: 0.7692rem 0 0.7692rem 1rem;
			margin-left: 5.3846rem;
			height: 3.8461rem;
			width: 4.0769rem;
			position: absolute;
			.store {
				width: 2.5384rem;
				height: 2.5384rem;
			}
		}
		.massage {
			margin-left: 9.6153rem;
			text-align: left;
			padding: 0.7692rem;
			.m_title {
				font-size: 12px;
				line-height: 15px;
				color: #1887d8;
				img {
					width: 1.1538rem;
					height: 1.1538rem;
					margin-right: 0.3846rem;
					float: left;
				}
			}
			.m_msg {
				color: #999;
				font-size: 0.923rem;
				line-height: 2.5384rem;
				/*width: 19.6153rem;*/
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>

<template>
	<div class="list">
		<div class="all_order" @click="jumpOrder(-1)">
			<p class="title">{{param.title}}</p>
			<div class="contain">
				<p>{{param.contain}}</p>
				<img src="/static/images/right-arrow.png">
			</div>
		</div>
		<div class="entrance">
			<div class="entrance_box" v-for="(todo,index) in param.entrance" @click="jumpOrder(index)" :class="param.status == 3?'noFlex':''">
				<span class="circle" v-if="userInfor.phone && param.status == 1 && todo.total > 0 && todo.total< 100 ">{{todo.total}}</span>
				<span class="circle" v-if="userInfor.phone && param.status == 1 && todo.total>100">99+</span>
				<div class="box_img">
				<img :src="todo.img_src" class="entrance_img">
				</div>
				<p>{{todo.name}}</p>
			</div>
		</div>

		<div class="logistics" v-if='userInfor.phone && logistics.nu && param.status == 1' @click="goProtocol('code')">
			<div class="left_title">
				<i></i>
				<p>最新物流<br/><span>{{logistics.data[0].time | timessss}}</span></p>
			</div>
			<div class="right_box">
				<img class="store" :src="logistics.goodsImage" alt="" />
			</div>
			<div class="massage">
				<!--<p class="m_title">
					<img src="/static/icon/new/cache.png" alt="" />{{logistics.goodsStatus}}
				</p>-->
				<p class="m_msg">{{logistics | lo_context}}</p>
			</div>
		</div>

		<div v-if="param.status == 4">
			<div class="all_order" :class="param.status == 4?'platform':''" @click="goProtocol('message')">
				<p class="title">消息中心</p>
				<div class="contain">
					<img src="/static/images/right-arrow.png">
				</div>
			</div>

			<div class="all_order" :class="param.status == 4?'platform':''" @click="goProtocol('mySet')">
				<p class="title">设置</p>
				<div class="contain">
					<img src="/static/images/right-arrow.png">
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			//			获取用户信息
			logistics() {
				return this.$store.state.address.logistics;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			},
		},
		props: {
			param: {

			}
		},
		watch: {

		},
		methods: {
			getInfo() {
				let _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'orderService',
					biz_method: 'queryCountOrderStatus',
					biz_param: {

					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.cart(url, body,
					function(suc) {
						let result = suc.body.biz_result.list;
						for(var i = 0; i < _self.param.entrance.length; i++) {
							_self.param.entrance[i].total = result[i].total;
						}
					},
					function(err) {})
			},
			//			跳转物流页面
			goProtocol(router) {
				let _self = this;
				if(router == 'mySet') {
					this.$router.push('/mySet')
				} else if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
						common.$emit('setParam', 'backRouter', 'message');
						if(common.wxshow) {
							common.getWxUrl();
						} else {
							_self.$router.push('/login');
						}
					}
					this.$msgBox.showMsgBox({
						title: '主人',
						content: '您还未登录，请登录后继续哦~',
						isShowCancelImg: '/static/icon/list/miao1.png',
						isShowCancelBtn: false,
						confirmBtnText: '去登录'
					}).then(async(val) => {
						loadApp()
					}).catch(() => {});
					return;
				} else if(router == 'message') {
					common.$emit('indexToMessage', 1)
					this.$router.push('/message')
				} else if(router == 'code') {
					//					common.searchType = 'keyword';
					//					common.$emit('setParam', 'router', 'index');
					this.$router.push("/code");
				}

			},
			//  	账单跳转到方法
			jumpOrder(index) {
				let _self = this;
				if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
						common.$emit('setParam', 'backRouter', '/home');
						if(common.wxshow) {
							common.getWxUrl();
						} else {
							_self.$router.push('/login');
						}
					}
					this.$msgBox.showMsgBox({
						title: '主人',
						content: '您还未登录，请登录后继续哦~',
						isShowCancelImg: '/static/icon/list/miao1.png',
						isShowCancelBtn: false,
						confirmBtnText: '去登录'
					}).then(async(val) => {
						loadApp()
					}).catch(() => {});
					return;
				} else if(_self.param.status == 1) {
					var index = index + 1;
					common.$emit('setParam', 'orderStatus', index);
					common.$emit('mineToOrder', index);
					_self.$router.push('/allOrder');
				} else if(_self.param.status == 2) {
					var index = index + 1;
					//					common.$emit('setParam', 'testing', index);
					common.$emit('informMyPurchase', index);
					_self.$router.push('/myNeeds?type=' + index);
				} else if(_self.param.status == 3) {
					var index = index + 1;
					//common.$emit('setParam', 'accept', index);
					common.$emit('inforMyOffer', index);
					_self.$router.push('/myOffer?type=' + index);
				} else if(_self.param.status == 4) {
					var index = index + 1;
					//common.$emit('setParam', 'testing', index);
					common.$emit('informMyRes', index);
					_self.$router.push('/myResource?type=' + index);
				}

			}
		},
		created() {
			let _self = this;
			if(_self.param.status == 1) {
				if(common.KEY) {
					_self.$store.dispatch('getLogistics');
					_self.getInfo()
				}
				//登陆或者退出登陆执行任务/id=1的时候，登陆执行操作，id=2的时候，退出操作
				common.$on('getInfo', function(id) {
					if(id == 1) {
						if(common.KEY) _self.$store.dispatch('getLogistics');
						_self.getInfo()
					}

				});
				//				common.$on('getInfo', function(id) {
				//					if(common.KEY) _self.$store.dispatch('getLogistics');
				//					_self.getInfo();
				//				});
			}
		}
	}
</script>