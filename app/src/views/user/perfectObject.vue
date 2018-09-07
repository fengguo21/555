<style lang="less" scoped>
	input,
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
		&::-webkit-input-placeholder {
			/* WebKit browsers */
			font-size: 16px !important;
		}
		&:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			font-size: 16px !important;
		}
		&::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			font-size: 16px !important;
		}
		&:-ms-input-placeholder {
			/* Internet Explorer 10+ */
			font-size: 16px !important;
		}
	}
	
	input {
		border: none;
	}
	
	.perfect_obj {
		background-color: #f3f3f3;
		position: relative;
		height: 100vh;
		.title {
			float: left;
			width: 100%;
		}
		.box {
			padding-top: 50px;
			height: 100vh;
			.contianer {
				height: 100%;
				overflow: auto;
				.main {
					width: 100%;
					font-size: 16px;
					background-color: #fff;
					.inbox {
						/*width: 100%;*/
						display: flex;
						flex-direction: row;
						align-items: center;
						margin: 0 0 0 18px;
						padding: 15px 0;
						border-bottom: 1px solid rgba(230, 230, 230, .5);
						&.last {
							margin-bottom: 0px;
							border-bottom: 0;
						}
						.text {
							white-space: nowrap;
							padding-right: 10px;
						}
						.content {
							width: 100%;
							text-align: left;
							input {
								/*line-height: 26px;*/
								&.no_touch {
									background: #fff;
								}
							}
						}
					}
				}
				.tipBox {
					text-align: right;
					line-height: 30px;
					.tips {
						display: inline-block;
						text-align: right;
						padding-right: 20px;
						color: #FD4B4B;
					}
				}
				.title_1 {
					padding-top: 40px;
					font-size: 18px;
					color: #ff8200;
					line-height: 17px;
				}
				.title_2 {
					font-size: 14px;
					line-height: 14px;
					color: #999;
					margin: 10px 0 5px 0;
					padding-bottom: 20px;
					border-bottom: 1px solid #d5d5d5;
				}
				.perfect_box {
					/*display: flex;*/
					.select {
						display: inline-block;
						width: 40%;
						padding: 15px 0 0;
						img {
							width: 80px;
							height: 80px;
						}
						.fullname {
							font-size: 15px;
							line-height: 15px;
							margin-top: 10px;
						}
					}
				}
				.confirm {
					width: 90%;
					display: inline-block;
					height: 38px;
					line-height: 38px;
					text-align: center;
					background-color: #ff8201;
					color: #fff;
					border-radius: 19px;
					margin: 37px 0 20px 0;
				}
			}
		}
	}
</style>
<template>
	<div class="perfect_obj">
		<div class="title">
			<userHead :param="param"></userHead>
		</div>
		<!--<div class="title">完善信息</div>-->
		<div class="box">
			<div class="contianer">
				<div class="main">
					<!--如果之前没有输入-->
					<div class="inbox">
						<span class="text">用户名</span>
						<div class="content">
							<input type="text" placeholder="请设置一个用户名" v-model="param.fullname" v-if="!userInfor.fullname">
							<input type="text" class="no_touch" placeholder="请设置一个用户名" v-model="userInfor.fullname" v-if="userInfor.fullname" disabled="disabled">
						</div>
					</div>

					<!--如果之前没有输入-->
					<div class="inbox last">
						<span class="text">邀请码</span>
						<div class="content">
							<input type="text" placeholder="请输入邀请码(可不填)" v-model="param.referralCode" v-if="!userInfor.referralCode">
							<input type="text" class="no_touch" placeholder="请输入邀请码(可不填)" v-model="userInfor.referralCode" v-if="userInfor.referralCode" disabled="disabled">
						</div>
					</div>
				</div>
				<div class="tipBox">
					<p class="tips" @click="gocodeExplain('/codeExplain/test')"> >>什么是邀请码?</p>
				</div>
				<div class="title_1">请让我们了解您的身份</div>
				<div class="title_2">以便更好地为您提供服务</div>
				<div class="perfect_box">
					<div class="select" v-for="(todo,index) in arr" @click="choosrUser(index)">
						<img v-if="!todo.active" :src="todo.url">
						<img v-if="todo.active" :src="todo.url2">
						<div class="fullname">{{todo.fullname}}</div>
					</div>
				</div>
				<div class="confirm" @click="nextStep()">下一步</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import userHead from '../../components/user/userHead'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				param: {
					name: '完善资料',
					fullname: '',
					referralCode: '',
					userType: '',
					goback: false
				},
				arr: [{
					url: '/static/icon/register/1.png',
					url2: '/static/icon/register/1s.png',
					fullname: '我是服务商',
					userType: '2',
					active: false
				}, {
					url: '/static/icon/register/2.png',
					url2: '/static/icon/register/2s.png',

					fullname: '我是商家',
					userType: '3',
					active: false
				}, {
					url: '/static/icon/register/3.png',
					url2: '/static/icon/register/3s.png',
					fullname: '我是种植户',
					userType: '4',
					active: false
				}, {
					url: '/static/icon/register/4.png',
					url2: '/static/icon/register/4s.png',
					fullname: '我是厂家',
					userType: '1',
					active: false
				}],
			}
		},
		components: {
			userHead
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		created() {
			var _self = this;
			_self.$store.dispatch('getUserInfor');
			common.$on('perfect_obj', function() {
				for(var i = 0; i < _self.arr.length; i++) {
					_self.arr[i].active = false;
				}
				_self.param.userType = '';
				_self.param.fullname = "";
				_self.param.referralCode = "";
			});
			common.$on('getInfo', function() {
				for(var i = 0; i < _self.arr.length; i++) {
					_self.arr[i].active = false;
				}
				_self.param.userType = '';
				_self.param.fullname = "";
				_self.param.referralCode = "";
			});
		},
		methods: {
			//			选择用户类型
			choosrUser(index) {
				var _self = this;
				for(var i = 0; i < _self.arr.length; i++) {
					_self.arr[i].active = false;
				}
				_self.arr[index].active = true;
				_self.param.userType = _self.arr[index].userType;
			},
			//			选择下一步+验证
			nextStep() {
				var _self = this;
				var checkArr = [];
				if(_self.userInfor.fullname) {
					_self.param.fullname = _self.userInfor.fullname
				}
				if(_self.userInfor.referralCode) {
					_self.param.referralCode = _self.userInfor.referralCode
				}
				let checkName = validation.checkNull(_self.param.fullname, '请设置一个用户名！');
				checkArr.push(checkName);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				_self.referral()

			},
			//			判断邀请码是否正确
			referral() {
				var _self = this;
				if(_self.param.referralCode !== '') {
					httpService.register(common.urlCommon + common.apiUrl.most, {
						biz_module: 'employService',
						biz_method: 'queryInviteCodeInfo',
						biz_param: {
							referralCode: _self.param.referralCode
						}
					}, function(response) {
						if(response.body.biz_result.status == '0') {
							common.$emit('message', response.body.biz_result.message);
						} else if(response.body.biz_result.status == '1') {
							_self.addname()
						}

					}, function(err) {
						common.$emit('message', err.body.biz_result.message);

					})
				} else {
					_self.addname()
				}

			},

			addname() {
				let _self = this;
				if(!_self.param.userType == '') {
					_self.$store.dispatch('checkName', _self.param.fullname).then(res => {
						if(res.body.code == 0e00) {
							common.$emit('message', res.body.msg);
						} else {
							let obj = {
								fullname: _self.param.fullname,
								referralCode: _self.param.referralCode,
								userType: _self.param.userType
							}
							console.log(_self.param.referralCode)
							_self.$store.dispatch('upDataInfor', obj).then(res => {
								if(res.body.code == 0e00) {
									common.$emit('message', res.body.msg);
								} else {
									_self.jump()
								}
							}), (() => {
								common.$emit('message', '更新失败');
							})
						}
					}), (() => {
						common.$emit('message', '更新失败');
					})
				} else {
					_self.$toast('请选择用户身份')
				}

			},
			gocodeExplain(router) {
				this.$defaultBox.showDefault({
					isType: 3,
					confirmBtnText: '我知道了'
				}).then(async(val) => {

				}).catch(() => {});
			},
			jump() {
				let _self = this;
				let datas = _self.param.fullname + '-' + _self.param.referralCode + '-' + _self.param.userType
				localStorage.setItem('userType', _self.param.userType);
				common.$emit('go_perfectId', datas);
				this.$router.push({
					path: '/perfectId?type=' + _self.param.userType
				})
			},
		},
		mounted() {

		}
	}
</script>