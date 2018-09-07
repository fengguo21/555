<template>
	<div class="find_password">
		<myHeader :param="myHeader"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>
					<ul class="fill_in">
						<li>
							<p><img src="/static/icons/my-phone.png"></p>
							<input type="text" class='top_text' v-model="param.phone" placeholder="请输入手机号码">
						</li>
						<li class="box">
							<p><img src="/static/icons/my-password.png"></p>
							<verificationCode :params='verificationCode' v-on:changeCode="changeCode"></verificationCode>
						</li>
						<li>
							<p><img src="/static/icons/my-password.png"></p>
							<input type="text" class='top_text' v-model="param.code" placeholder="请输入验证码">
							<div v-bind:class="{ my_code: !buttonDisabled, 'my_code_nor': buttonDisabled }">
								<p>
									<input :value="code" type="button" :disabled='buttonDisabled' v-on:click="getCode">
								</p>
							</div>
						</li>
						<li>
							<p><img src="/static/icons/my-password.png"></p>
							<input type="password" class='top_text' v-model="param.passWord" placeholder="请输入新密码">
						</li>
						<li v-on:click="confirm" class="confirm">确定</li>
					</ul>
				</mt-loadmore>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import myHeader from '../../components/header/myHeader'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import verificationCode from '../../components/qrcode/verificationCode'
	export default {
		data() {
			return {
				buttonDisabled: false,
				wrapperHeight: '',
				myHeader: {
					name: '找回密码'
				},
				code: '获取验证码',
				myShow: {
					show: 0,
					setTime: '',
				},
				verificationCode: {
					value: '',
					codeImg: ''
				},
				param: {
					phone: '',
					code: '',
					passWord: ''
				}
			}
		},
		components: {
			myHeader,
			verificationCode
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
					if(suc.body.code == '1c01') {
						_self.verificationCode.codeImg = suc.body.biz_result.codeImage;
					} else {
						common.$emit('message', suc.body.msg);
					}

				}, function(err) {

				})
			},
			getCode() {
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
//				common.$emit('show-load');
				httpService.register(common.urlCommon + common.apiUrl.most, {
					biz_module: 'userSmsService',
					biz_method: 'getRePwdCode',
					biz_param: {
						mobile: _self.param.phone,
						code: _self.verificationCode.value,
						url: _self.verificationCode.codeImg,
					}
				}, function(response) {
					if(response.body.code == '1c01') {
						_self.buttonDisabled = true;
						var wait = 60;
						_self.myShow.setTime = setInterval(function() {
							wait--;
							_self.code = wait;
							if(wait == 0) {
								clearInterval(_self.myShow.setTime);
								_self.code = '获取验证码';
								_self.buttonDisabled = false;
							}
						}, 1000);
					}
					if(response.data.code == '1c01') {} else {
						common.$emit('message', response.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			confirm() {
				let _self = this;
				let checkArr = [];
				let checkPhone = validation.checkPhone(_self.param.phone);
				checkArr.push(checkPhone);
				let checkMinNumber = validation.checkMinNumber(_self.param.passWord);
				checkArr.push(checkMinNumber);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				common.$emit('show-load');
				httpService.findPassWord(common.urlCommon + common.apiUrl.most, {
					biz_module: 'userSmsService',
					biz_method: 'findUserPassword',
					biz_param: {
						phone: _self.param.phone,
						code: _self.param.code,
						newPassword: _self.param.passWord
					}
				}, function(response) {
					common.$emit('close-load');
					if(response.data.code == '1c01') {
						common.$emit('message', response.data.msg);
						_self.$router.push("login")
					} else {
						common.$emit('message', response.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			}
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		created() {
			let _self = this;
			this.changeCode()
			common.$on('loginToFind', function(item) {
				_self.param.phone = '';
				_self.param.code = '';
				_self.param.passWord = '';
			})
		}
	}
</script>
<style lang="less" scoped>
	.find_password .bg_white {
		background-color: #F0F0F0;
	}
	
	.find_password .bg_white .fill_in {
		padding: 0 15px;
		float: left;
		width: 100%;
		.box {
			position: relative;
			border-radius: 3px;
			height: 4rem;
			line-height: 17px;
			position: relative;
			height: 4rem;
			p {
				height: 38px;
				position: absolute;
				img {
					margin: 1rem 0 0 0.8rem;
				}
			}
		}
	}
	
	.find_password .bg_white .fill_in li {
		background: white;
		float: left;
		width: 100%;
		margin-top: 1.5rem;
		border-radius: 4px;
		position: relative;
		overflow: hidden;
	}
	
	.find_password .bg_white .fill_in li p {
		float: left;
		height: 4rem;
	}
	
	.find_password .bg_white .fill_in li p img {
		height: 2rem;
		margin: 1rem 0 0 0.8rem;
	}
	
	.find_password .bg_white .fill_in li input {
		float: left;
		margin-top: 1rem;
		height: 2rem;
		line-height: 2rem;
		border: none;
		outline: none;
		margin-left: 25px;
		width: 125px;
	}
	
	.find_password .bg_white .fill_in .confirm {
		background: #ff8201;
		color: white;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
	}
	
	.find_password .bg_white .fill_in .my_code {
		float: right;
		right: 0;
		width: 35%;
		color: #ff8201;
		padding: 1rem 10px;
		height: 4rem;
		text-align: center;
		line-height: 2rem;
		text-align: center;
	}
	
	.find_password .bg_white .fill_in .my_code>p {
		border-left: 1px solid #333333;
		height: 2rem;
		text-align: center;
		width: 100%;
	}
	
	.find_password .bg_white .fill_in .my_code>p input {
		height: 100%;
		width: 100%;
		padding: 0;
		margin-left: 10px;
		line-height: 2rem;
		background: white;
		margin-top: 0;
	}
	
	.find_password .bg_white .fill_in .my_code_nor {
		float: right;
		right: 0;
		width: 33%;
		color: #CECEBF;
		padding: 1rem 10px;
		height: 4rem;
		text-align: center;
		line-height: 2rem;
	}
	
	.find_password .bg_white .fill_in .my_code_nor input {
		height: 100%;
		width: 100%;
		padding: 0;
		margin-left: 10px;
		line-height: 2rem;
		background: white;
		margin-top: 0;
	}
	
	.find_password .bg_white .fill_in .my_code_nor>p {
		border-left: 1px solid #333333;
		height: 2rem;
		width: 100%;
	}
</style>