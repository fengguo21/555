<style lang="less" scoped>
	.my-header {
		width: 100%;
		height: 50px;
		background: #ff8201;
		position: relative;
		z-index: 2;
		&.change {
			background: linear-gradient(to right, #ff5b27, #fd7652);
		}
		.follow {
			height: 20px;
			position: absolute;
			top: 15px;
		}
	}
	
	.my-header .header_content {
		/*background: #ff8201;*/
		position: absolute;
		top: 0;
		width: 100%;
		height: 50px;
		z-index: 150;
	}
	
	.my-header .header_contentt {
		/*background: #ff8201;*/
		width: 100%;
		height: 50px;
	}
	
	.my-header .header_contentt .mycart>img {
		width: 26px;
		margin-top: 12px;
	}
	
	.my-header .title-name {
		width: 60%;
		height: 50px;
		float: left;
		font-size: 18px;
		line-height: 50px;
		color: white;
	}
	
	.my-header .go-back {
		float: left;
		width: 20%;
		padding-right: 5%;
		height: 50px;
		z-index: 151;
		/*background: #ff8201;*/
	}
	
	.my-header .go-back img {
		margin-top: 15px;
		height: 20px;
	}
	
	.my-header .header_content>p {
		position: absolute;
		right: 0;
		font-size: 14px;
		top: 0;
		padding: 16px 1.5rem;
		color: white;
	}
	
	.my-header .header_contentt>p {
		position: absolute;
		right: 0;
		font-size: 14px;
		top: 0;
		padding: 0 1.5rem;
		color: white;
	}
	
	.my-header .active {
		color: #ff8201;
	}
	
	.my-header {
		.header_contentt {
			.mycart {
				.resource_cart {
					margin-top: 14px;
				}
			}
		}
	}
	
	.edit {
		height: 50px;
		font-size: 14px;
		line-height: 50px;
		color: white;
		&.opcity {
			opacity: 0.8;
		}
	}
	
	
</style>
<template>
	<div class="my-header" :class="param.background?'change':''">
		<div v-bind:class="{ header_content: !param.topissue, 'header_contentt': param.topissue }">
			<div class="go-back" @click="jumpBack()">
				<img src="/static/images/go-back.png">
			</div>
			<div class="title-name">
				<p>{{param.name}}</p>
			</div>
			<p class="edit" v-show="param.show" @click="jumpRevise">编辑</p>
			<p v-show="param.t_show" @click="jumpRevise">完成</p>
			<!--<p v-if="param.bigImg"  @click="jumpBig()">全屏</p>-->
			<p class="edit" v-show="obj.isMy==1 && param.name=='求购详情'" @click="resive(obj.id)">编辑</p>
			<div class="mycart" v-show="param.mycart" @click="jump(param)">
				<img src="/static/icons/cart.png">
			</div>

			<div class="mycart" v-show="param.resourceCart" @click="jump(param)">
				<img src="/static/images/resource-detail-cart.png" class="resource_cart">
			</div>
			<div v-if="this.$route.name=='releaseOffer' || this.$route.name=='needDetails'">
				<img src="/static/icon/follow.png" class="follow" v-on:click="myAttention(0)" v-if="obj && obj.isAttention && obj.isMy==0 && !overdue">
				<img src="/static/icon/unfollow.png" class="follow" v-on:click="myAttention(1)" v-if="obj && !obj.isAttention && obj.isMy==0 && !overdue">
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
		props: {
			param: {},
			obj: {
				default: function() {
					return {
						isMy: '',
					}
				}
			},
			overdue: ''
		},
		computed: {
			backRouter() {
				return this.$store.state.user.backRouter.back;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		methods: {
			//			//全屏走势图
			//			jumpBig(){
			//				let _self = this;
			//				common.$emit('echartYear', 1);
			//				_self.$router.replace('/echartYear/'+this.$route.params.id);
			//			},
			//  	编辑详情页
			resive(id) {
				console.log('---------', id)
				common.$emit('purchase-id', id);
				this.$router.push('/releaseNeeds/' + id);
			},
			jumpBack() {
				let _self = this;
				if(this.param.name == '我要卖货' || this.param.name == '我要买货'){

					this.$emit('back')
					return
				}
				if(this.param.name == '订单确认') { //如果是订单确认页返回，取消购物车选中
					this.$store.dispatch('getHttp');
				}
				common.$emit('infor_choose', 1);
				if(this.param.goBack) {
					_self.$router.push('/home');
				} else {
					if(window.history.length == 1) {
						_self.$router.push('/home');
					} else {
						if(_self.param.goSecond) {
							common.$emit('getInfo', 1);
							window.history.go(-2)
						} else if(_self.param.go_where) {
							common.$emit('backAddress', 1); //对于地址列表退回订单页
							window.history.go(-1);
						} else if(common.pageParam.skipLogin == true) {
							common.pageParam.skipLogin = false;
							window.history.go(-2);
						} else if(common.pageParam.skipPer == true) {
							common.pageParam.skipPer = false;
							window.history.go(-3)
						} else {
							window.history.go(-1);
						}
					}
				}

			},
			jumpRevise() {
				let _self = this;
				if(_self.param.t_show == true) {
					_self.$emit('myUpData', 'genxin');

				} else if(_self.param.tt == true) {
					common.$emit("informAccountFinish", "refurbish");
					_self.$router.push(_self.param.reviseRouter);
				} else {
					common.$emit("res-id", this.param.item);
					_self.$router.push(_self.param.reviseRouter); //跳转到修改资源
				}
			},
			fillIn() {
				let _self = this;
				_self.$router.push('requestCode');
			},
			fillInBack() {
				let _self = this;
				this.$emit("confirmFill", 1);
			},
			jump(param) {
				let _self = this;
				if(!common.KEY) {
					function loadApp() {
						common.$emit('back_login', {
							id: param.id,
							isMy: param.isMy
						});
						common.$emit('setParam', 'backRouter', 'lowPriceRes');
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
				}
				this.$store.dispatch('getHttp');
				this.$router.push('/cart')
			},
			myAttention(type) {
				let _self = this;
				if(!common.KEY) {
					let _self = this;
					let origin = location
					window.localStorage.router = origin.href
					console.log(origin,'test===========')
					function loadApp() {
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
				} else if(_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
					function perfect() {
						_self.$router.push('/perfectObject');
					}
					this.$msgBox.showMsgBox({
						title: '信息完善',
						content: '您的信息还未完善，现在去完善吗？',
						isShowCancelImg: '/static/icon/list/miao1.png',
						isShowCancelBtn: false,
						confirmBtnText: '去完善'
					}).then(async(val) => {
						perfect()
					}).catch(() => {});
					return;
				}
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'userAttention',
					biz_param: {
						intentionId: _self.obj.id,
						type: type,
						breedName: _self.obj.breedName,
						intentionType: _self.obj.type
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addAddress(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						common.$emit('message', suc.data.msg);
						common.$emit("informResAttention", _self.obj.type);
						if(type) {
							_self.obj.isAttention = 1;
						} else {
							_self.obj.isAttention = 0;
						}
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			}
		},
		created() {
			console.log(this.$route.name)
		}
	}
</script>