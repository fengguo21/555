<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
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
	
	.register {
		height: 100vh;
		background-color: #F5F5F5;
		.box {
			height: 92vh;
			overflow-y: auto;
			width: 100%;
			@media screen {
				.logo {
					width: 60%;
					margin: 40px auto;
				}
				@media (max-width: 320px) {
					.logo {
						width: 60%;
						margin: 25px auto;
					}
				}
			}
			.main {
				width: 100%;
				font-size: 14px;
				.cell {
					margin: 10px 0 0 0;
					padding: 0 0 0 20px;
					background-color: #fff;
					.inbox {
						width: 100%;
						background-color: #fff;
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 15px 0;
						border-bottom: 1px solid rgba(230, 230, 230, .5);
						&.verification {
							padding: 5px 10px 5px 0;
							overflow: hidden;
						}
						.text {
							display: inline-block;
							white-space: nowrap;
							font-size: 16px
						}
						.content {
							width: 80%;
							text-align: left;
							input {
								height: 20px;
								margin-left: 10px;
								width: 100%;
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
						}
					}
				}
				.pass_code {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-bottom: 18px;
					.text {
							display: inline-block;
							white-space: nowrap;
							font-size: 16px
						}
					.tbox {
						flex: 1;
						background-color: #fff;
						display: flex;
						flex-direction: row;
						align-items: center;
						padding: 15px 0;
						border-radius: 16px;
						img {
							height: 20px;
						}
						input {
							height: 20px;
							width: 100px;
							margin-left: 10px;
						}
					}
					.fbox {
						width: 100px;
						margin-right: 10px;
						input {
							width: 100%;
							height: 35px;
							text-align: center;
							background-color: #F7C000;
							border-radius: 50px;
						}
						input[disabled] {
							color: #fff;
							opacity: 1;
							-webkit-text-fill-color: #fff;
							-webkit-opacity: 1;
						}
					}
				}
				.confirm {
					width: 86%;
					font-size: 18px;
					background: #FA6804;
					line-height: 4rem;
					color: white;
					border-radius: 100px;
					margin: 20px 7%;
					box-shadow: 0px 0px 3px 3px rgba(130, 65, 0, .21);
				}
				.title {
					font-size: 12px;
					margin-top: 12px;
					span {
						color: #F05050;
					}
				}
			}
		}
	}
	
	.head {
		height: 3.8461rem;
		background-color: #ff8201;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		.go_back {
			position: absolute;
			z-index: 20;
			left: 0;
			top: 0;
			width: 20%;
			height: 100%;
			padding-left: 5%;
			display: flex;
			flex-direction: row;
			align-items: center;
			img {
				height: 20px;
			}
		}
		.title {
			width: 100%;
			text-align: center;
			font-size: 1.7rem;
			color: #fff;
		}
		.revise {
			position: absolute;
			z-index: 20;
			right: 0;
			top: 0;
			width: 20%;
			height: 100%;
			font-size: 0.923rem;
			line-height: 3.8461rem;
			color: #fff;
		}
	}
	
	.eye_status {
		float: right;
		margin-right: 5%;
		input {
			float: left;
		}
		img {
			width: 17px;
			vertical-align: middle;
		}
	}
</style>
<style></style>
<template>
	<div class="register">
		<userHead :param="paramHead"></userHead>
		<div class="box">
			<!--<img src="static/icon/logo_net.png" class="logo">-->
			<div class="main">
				<div class="cell">
					<div class="inbox">
						<span class="text">手机</span>
						<div class="content">
							<input type="text" placeholder="请输入您的手机号" v-model="param.phone">
						</div>
					</div>
					<!-- <div class="inbox">
						<span class="text">密码</span>
						<div class="content">
							<input type="password" id="password" placeholder="请设置您的密码" v-model="param.password">
						</div>
						<span class="eye_status">
                        	<img v-if="eye_status == 0" src="/static/icon/new/eye_close.png" @click="password_open()" />
                        	<img v-if="eye_status == 1"  src="/static/icon/new/eye_open.png" @click="password_open()"/>
                    </span>
					</div> -->
					<!-- <div class="inbox">
						<span class="text">密码</span>
						<div class="content">
							<input type="password" id="passwords" placeholder="请再次输入您设置的密码" v-model="param.againPassword">
						</div>
						<span class="eye_status">
                        	<img v-if="eye_status2 == 0" src="/static/icon/new/eye_close.png" @click="password_open2()" />
                        	<img v-if="eye_status2 == 1"  src="/static/icon/new/eye_open.png" @click="password_open2()"/>
                    </span>
					</div> -->
				</div>
				<div class="cell">
					<div class="inbox verification">
						<span class="text">验证码</span>
						<verificationCode :params='verificationCode' v-on:changeCode="changeCode"></verificationCode>
					</div>
					<div class="pass_code">
						<div class="tbox">
							<span class="text">验证码</span>
							<div class="content">
								<div>
									<input type="text" placeholder="请输入验证码" v-model="param.code">
								</div>
							</div>
						</div>
						<div class="fbox" @click="confirm">
							<input type="text" :disabled="true" v-model="code">
						</div>
					</div>
				</div>

				<div class="confirm" @click="register">确认绑定</div>
				<div class="title" @click="goProtocol('/protocol/test')">* 注册代表您同意《<span>药材买卖网用户协议</span>》</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import userHead from '../../components/user/userHead'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import verificationCode from '../../components/qrcode/verificationCode'
	export default {
		data() {
			return {
				verificationCode: {
					value: '',
					codeImg: ''
				},
				paramHead: {
					name: '绑定手机号码',
				},
				buttonDisabled: false,
				eye_status: 0,
				eye_status2: 0,
				param: {
					phone: '',
					password: '',
					name: '',
					// againPassword: ''
				},
				code: '获取验证码',
				setTime: '',
			}
		},
		components: {
			userHead,
			verificationCode
		},
		created() {
			console.log(window.localStorage.uninId)
			let _self = this;
			_self.changeCode()
			common.$on('loginToRegister', function(item) {
				clearInterval(_self.setTime);
				_self.param.phone = '';
				_self.param.password = '';
				_self.param.name = '';
				_self.param.code = '';
				// _self.param.againPassword = '';
				_self.buttonDisabled = false;
				_self.code = '获取验证码';

			})
		},
		beforeRouteLeave (to, from, next) {
			clearInterval(this.setTime)
			this.code = '获取验证码';
			this.buttonDisabled = false;
			next()
		   console.log('beforeRouteLeave')

		  },
		methods: {
			changeCode() {
				var _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'codeService',
					biz_method: 'getImageCode',
					biz_param: {}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addCart(url, body, function(suc) {
					console.log(suc)
					if(suc.body.code == '1c01') {
						_self.verificationCode.codeImg = suc.body.biz_result.codeImage;
					} else {
						common.$emit('message', suc.body.msg);
					}

				}, function(err) {

				})
			},
			password_open() {
				let _self = this;
				let eyes = document.getElementById('password');
				if(_self.eye_status == 0) {
					eyes.type = "text";
					_self.eye_status = 1;
				} else {
					eyes.type = "password";
					_self.eye_status = 0;
				}
			},
			password_open2() {
				let _self = this;
				let eyes = document.getElementById('passwords');
				if(_self.eye_status2 == 0) {
					eyes.type = "text";
					_self.eye_status2 = 1;
				} else {
					eyes.type = "password";
					_self.eye_status2 = 0;
				}
			},
			goProtocol(router) {
				this.$router.push(router)
			},
			confirm: function() {
				console.log('click')
				let _self = this;
				var checkArr = [];

				let checkPhone = validation.checkPhone(_self.param.phone);
				checkArr.push(checkPhone);
				let checkCode = validation.checkNull(_self.verificationCode.value, '请输入图形验证码');
				checkArr.push(checkCode);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				if(!_self.buttonDisabled) {
					httpService.register(common.urlCommon + common.apiUrl.most, {
						biz_module: 'userSmsService',
						biz_method: 'getBindingCode',
						biz_param: {
							mobile: _self.param.phone,
							code: _self.verificationCode.value,
							url: _self.verificationCode.codeImg,
						}
					}, function(response) {
						if(response.data.code == '1c01') {
							common.$emit('message', '验证码发送成功');
							_self.buttonDisabled = true;
							let wait = 60;
							_self.setTime = setInterval(function() {
								wait--;
								_self.code = wait;
								if(wait == 0) {
									clearInterval(_self.setTime);
									_self.code = '重新获取';
									_self.buttonDisabled = false;
								}
							}, 1000);
						} else {
							common.$emit('message', response.data.msg);
						}
					}, function(err) {
						common.$emit('message', err.data.msg);
					})

				}

			},
			jumpBack() {
				let _self = this;
				if(_self.param.message) {
					common.$emit('indexToMessage', 1)
				} else if(_self.param.index) {
					common.$emit('messageBack', 1)
				}
				window.history.go(-1);
			},
			login() {
				let _self = this;
				common.$emit('show-load');
				httpService.login(common.urlCommon + common.apiUrl.login, {
					biz_param: {
						phone: _self.param.phone,
						password: _self.param.password
					}
				}, function(response) {
					common.$emit('close-load');
					if(response.data.code == '1c01') {
						window.localStorage.KEY = response.data.biz_result.KEY;
						window.localStorage.SID = response.data.biz_result.SID;
						common.KEY = window.localStorage.KEY;
						common.SID = window.localStorage.SID;
						common.getDate();
						common.$emit('getInfo', 1);
						_self.$router.push('/perfectObject')
						// common.$emit('nextRegister', 1);

						// _self.$router.replace('perfectInfo');
					} else {
						//common.$emit('message', response.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					//common.$emit('message', err.data.msg);
				})
			},
			register() {
				var checkArr = [];
				let _self = this;
				//				let checkName = validation.checkNull(_self.param.name, '请输入姓名！');
				//				checkArr.push(checkName);
				let checkPhone = validation.checkPhone(_self.param.phone);
				checkArr.push(checkPhone);
				// let checkPassword = validation.checkNull(_self.param.password, '请输入密码！');
				// checkArr.push(checkPassword);
				// let checkagainPassword = validation.checkAgain(_self.param.againPassword, _self.param.password, '请确认两次输入的密码是否一致！');
				// checkArr.push(checkagainPassword);
				// let checkMinNumber = validation.checkMinNumber(_self.param.password);
				// checkArr.push(checkMinNumber);

				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				_self.confirmRegister()

			},
			confirmRegister() {
				let _self = this;
				common.$emit('show-load');
				httpService.register(common.urlCommon + common.apiUrl.most, {
					biz_module: 'userSmsService',
					biz_method: 'unionIdBinding',
					biz_param: {
						mobile: _self.param.phone,
						code: _self.param.code,
						unionDateId: window.localStorage.unionId,
					}
				}, function(response) {
					console.log('test load')
					common.$emit('close-load');
					console.log(response)
					if(response.body.biz_result.token){
					httpService.commonPost(common.urlCommon + common.apiUrl.token_login,{
						biz_param: {
						token:response.body.biz_result.token
					}
					},function(response){
						
						_self.$router.replace('home');
					if(response.data.code == '1c01') {
						window.localStorage.KEY = response.data.biz_result.KEY;
						window.localStorage.SID = response.data.biz_result.SID;
						common.KEY = window.localStorage.KEY;
						common.SID = window.localStorage.SID;
						_self.$store.dispatch('getUserInfor');
						common.$emit('getInfo', 1);
						common.$emit('toMine');
						common.$emit('getLocation');
						if(common.pageParam.backRouter.split('/')[0] == 'resourceDetail') {
							if(_self.id) {
								common.$emit('resourceDetail', _self.id); //点击购买时未登录，登陆成功之后提醒商品那个详情页面刷新
								common.$emit('setParam', 'skipLogin', true);
								_self.$router.replace('resourceDetail/' + _self.id);
							} else {
								common.$emit('resourceDetail', common.pageParam.backRouter.split('/')[1]); //没有_self.id的时候
								common.$emit('setParam', 'skipLogin', true);
								_self.$router.replace('resourceDetail/' + common.pageParam.backRouter.split('/')[1]);
							}
						} else if(common.pageParam.backRouter == 'lowPriceRes') {
							_self.$router.replace('cart')
						} else if(common.pageParam.backRouter == 'message') { //消息返回到下一个动作
							_self.$router.replace('/message')
						} else if(common.pageParam.backRouter.split('/')[1] == 'needDetails') {
							_self.$router.replace(common.pageParam.backRouter);
							common.$emit("loginToDetails", {
								id: common.pageParam.backRouter.split('/')[2],
								type: ''
							});
							common.$emit('setParam', 'skipLogin', true);
						} else {
							common.$emit('go_home', 1);
							_self.$router.replace('home');
						}
					} else {
						common.$emit('message', response.data.msg);
					}
					},function(err){

					})
				}
					common.$emit('close-load');
					if(response.data.code == '1c01') {
						common.$emit('message', response.data.msg);
						// _self.login();
					} else {
						common.$emit('message', response.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			}
		},
		mounted() {}
	}
</script>