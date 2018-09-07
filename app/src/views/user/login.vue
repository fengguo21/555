<style lang="less" scoped>
	.page-loadmore-wrapper {
		overflow-x: hidden;
	}
	
	.login {
		width: 100%;
		height: 100%;
		position: relative;
		.bg_white {
			background-size: 100% 100%;
			.my-logo {
				width: 100px;
			}
			.my_title {
				color: #FF7200;
				font-size: 16px;
				margin-bottom: 20px;
			}
			.password {
				.box {
					width: 86%;
					border-bottom: 1px solid #f4c58e;
					padding: 1rem 0 1rem 0;
					margin: 10px 0 0 7%;
					line-height: 17px;
					position: relative;
					&.verifi {
						padding: .4rem 0;
					}
				}
				.text {
					outline: none;
					border: none;
					background-color: transparent;
					text-align: left;
					width: 100%;
					padding: 0 0 0 5px;
					font-size: 16px;
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
				.eye_status {
					position: absolute;
					display: inline-block;
					padding: 0 20px 0 10px;
					height: 100%;
					line-height: 38px;
					right: 0px;
					top: 0;
					img {
						width: 17px;
						vertical-align: middle;
					}
				}
				.phone {
					.text {
						padding-left: 20%;
					}
					.tel {
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						margin-top: 10px;
						span {
							padding: 0 1rem;
							border-right: 1px solid #333333;
						}
					}
				}
				.pass-name {
					.my_code {
						position: absolute;
						top: 0;
						right: 0;
						width: 100px;
						padding: 6px 0;
						margin: 6px 0;
						color: #fff;
						background-color: #FFBA00;
						border-radius: 50px;
						.button {
							background: rgba(0, 0, 0, 0);
							outline: none;
							border: none;
							width: 100%;
							height: 16px;
							line-height: 16px;
							font-size: 12px;
							border-radius: 0;
							&.gray {
								// background-color: #cecebf;
							}
						}
					}
					.my_code_nor {
						float: right;
						width: 40%;
						border-left: 1px solid #333333;
						color: #CECEBF;
						text-align: center;
					}
				}
			}
			.prompt {
				width: 86%;
				margin: 0 0 2.7rem 7%;
				padding: 0 10px;
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				line-height: 35px;
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
			.wechat{
				width:60%;
				height: 4rem;
				background: #f3f3f3;
				border-radius: 2rem;
				margin-left: 50%;
				transform: translateX(-50%);
				display: flex;
				align-items: center;
				color: #666;
				
			}
			
			.wechat img{
				width:3rem;
				height: 3rem;
				margin-left:1.4rem;
				margin-right: 1rem;
				display: inline-block;
			}
		}
	}
</style>

<template>
	<div class="login">
		<loginHeader :param="my_header"></loginHeader>
		<div id='login_container'></div>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>
					<img src="/static/icon/register/logo@3x.png" class="my-logo">
					<p class="my_title">药材买卖网</p>
					<myTab :param="myShow"></myTab>
					<!--密码登陆-->
					<div class="password" v-show="myShow.show == 0">
						<div class="box">
							<input class="text" type="text" placeholder="请输入手机号" v-model="param.phone">
						</div>
						<div class="box">
							<input class="text" type="password" id="password" placeholder="请输入密码" v-model="param.password" @keyup="show($event)">
							<span class="eye_status" @click="password_open()">
                            	<img v-if="!eye_status" src="/static/icon/list/closeEye.png"/>
                            	<img v-if="eye_status"  src="/static/icon/list/openEye.png"/>
                            </span>
						</div>
					</div>
					<!--短信登陆-->
					<div class="password" v-show="myShow.show ==1">
						<div class="box">
							<!--<p class="tel"><span>+86</span></p>-->
							<input class="text" type="text" placeholder="请输入手机号" v-model="param.phone">
						</div>
						<div class="box verifi">
							<verificationCode :params='verificationCode' v-on:changeCode="changeCode"></verificationCode>
						</div>
						<div class="box pass-name">
							<input class="text" type="text" placeholder="请输入验证码" v-model="param.code">
							<div class="my_code">
								<input class="button" v-on:click="confirmLogin()" :value='code' type="button" :disabled="buttonDisabled" :class="buttonDisabled?'gray':''">
							</div>
						</div>
					</div>
					<div class="prompt" id="prompt">
						<p @click="jump('findPassWord')"  v-if="myShow.show ==0">找回密码</p>
						<p style="color:#FF7200" @click="jump('register')">立即注册</p>
					</div>
					<div class="confirm" @click="login()">登录</div>
					<div class="wechat" @click="wechatlogin()">
						<img src="/static/icon/register/wechat.png" >
						<span>微信账号快速登录</span>
					</div>
				</mt-loadmore>
			</div>
		</div>
	</div>
</template>
<script>
	import queryString from 'query-string'
	import common from '../../common/common.js'
	import myTab from '../../components/tools/tabLogin'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import loginHeader from '../../components/header/loginHeader'
	import verificationCode from '../../components/qrcode/verificationCode'
	import * as store  from '../../common/localStore.js'

	export default {
		data() {
			return {
				id: '',
				isMy: '',
				wrapperHeight: '',
				my_header: {
					name: '登录',
					router: ''
				},
				verificationCode: {
					value: '',
					codeImg: ''
				},
				eye_status: false,
				phoneInfo: {
					longitude: '',
					latitude: '',
				},
				myShow: {
					show: 0,
					setTime: '',
					tab: [{
						name: '密码登录',
						active: true,
					}, {
						name: '短信登录',
						active: false,
					}]
				},
				selected: 'identiCode',
				identify_code: '',
				code: '获取验证码',
				setTime: '',
				buttonDisabled: false,
				param: {
					phone: '',
					code: '',
					imageCode: '',
					password: ''
				}
			}
		},
		created() {
			let _self = this;
			let self = this
			_self.wechatloginhandle()
			
			
			_self.changeCode()
			common.$on('back_login', function(item) {
				_self.id = item.id;
			})
			common.getDate();
		},
		components: {
			myTab,
			loginHeader,
			verificationCode
		},
		beforeRouteLeave (to, from, next) {
			clearInterval(this.myShow.setTime)
			this.code = '获取验证码';
			this.buttonDisabled = false;
			next()
		   console.log('beforeRouteLeave')

		  },
		methods: {
			
			wechatloginhandle(){
				let self =this
				let _self = this
				console.log('enter loginhandle')
			const code = queryString.parse(location.search).code;
			console.log(code,'code==========')
		
			if(code){
				if(code != window.localStorage.lastCode){
					let body = {
						
					biz_module: 'userSignLoginService',
					biz_method: 'unionIdHTMLLogin',
					biz_param: {wcode:code}
				};
			
			httpService.commonPost(common.urlCommon + common.apiUrl.most,body,
			function(res){
				window.localStorage.lastCode = code
				console.log(res.body.biz_result.token)
				if(res.body.biz_result.token){
					
					console.log(res.body.biz_result.token,'token')
					httpService.commonPost(common.urlCommon + common.apiUrl.token_login,{
						biz_param: {
						token:res.body.biz_result.token
					}
					},function(response){
						
						common.$emit('close-load');
					if(response.data.code == '1c01') {
						window.localStorage.KEY = response.data.biz_result.KEY;
						window.localStorage.SID = response.data.biz_result.SID;
						common.KEY = window.localStorage.KEY;
						common.SID = window.localStorage.SID;
						self.$store.dispatch('getUserInfor');
						console.log('getUserInfor')
						
						common.$emit('getInfo', 1);
						common.$emit('toMine');
						common.$emit('getLocation');
						
					} else {
						common.$emit('message', response.data.msg);
					}

					const reLocal = window.location.href;
					console.log(reLocal,'reLocal===')
			  			const reLocalArr = reLocal.split('?');
			  			console.log(reLocalArr.length);
			  			if (reLocalArr.length >= 2 && reLocalArr[1].match(/#/g)) {

			  				
			  			  const hashRoute = reLocalArr[1].split('#')[1];
			  			  const queryRoute = reLocalArr[2] ? `?${reLocalArr[2]}` : '';
			  			  console.log('new href========', `${reLocalArr[0]}#${hashRoute}${queryRoute}`);
			  			  if(window.localStorage.router){
			  			  	window.location.replace(window.localStorage.router);
			  			  }else{
			  			  	self.$router.push('home')
			  			  }
			  			  
			  			  // store.remove('router')
			  			  // window.location.href = window.localStorage.router
			  			}
					},function(err){

					})
				}
				else{
					console.log(res)
					if(res.body.biz_result.unionDateId){
						window.localStorage.unionId = res.body.biz_result.unionDateId
					}
					
					self.$router.push('bindphone')
				}
			},
			function(err){

			})
			}
			else{
				console.log('codexiangtong')
				const reLocal = window.location.href;
					console.log(reLocal,'reLocal===')
			  			const reLocalArr = reLocal.split('?');
			  			console.log(reLocalArr.length);
			  			if (reLocalArr.length >= 2 && reLocalArr[1].match(/#/g)) {
			  			  const hashRoute = reLocalArr[1].split('#')[1];
			  			  const queryRoute = reLocalArr[2] ? `?${reLocalArr[2]}` : '';
			  			  console.log('new href========', `${reLocalArr[0]}#${hashRoute}${queryRoute}`);
			  			  window.location.replace(`${reLocalArr[0]}#${hashRoute}${queryRoute}`);
			}
				}
			

				}
				
			
			},
			wechatlogin(){
				var _self = this;
				// if(store.get('SID')){
				// 	_self.$router.push('home')
				// }
				const code = queryString.parse(location.search).code;
				if(code){
					_self.wechatloginhandle()
				}else{
					let body = {
					biz_module: 'weiXinService',
					biz_method: 'getWeiXinCodeUrl',
					biz_param: {url:location.href}
				};
				
				httpService.commonPost(common.urlCommon + common.apiUrl.most,body,
					function(response){
						console.log(response.body.biz_result.wxUrl)
						 window.location.replace( response.body.biz_result.wxUrl)
					},function(){

					})
				}
				
				
			},
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
			jump(router) {
				if(router == 'findPassWord') {
					common.$emit('loginToFind', 1)
					this.$router.push(router);
				} else {
					common.$emit('loginToRegister', 1)
					this.$router.push(router);
				}
			},
			show: function(ev) {{

				if(ev.keyCode == 13) 					this.login();
				}
			},
			getOpenId() {
				var obj = new window.WxLogin({
					id: "login_container",
					appid: "wx34acea56da2ccf8f",
					scope: "snsapi_login",
					redirect_uri: "/home",
					state: "",
					style: "",
					href: ""
				});
			},
			passWordLogin() {
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
						common.$emit('getInfo', 1);
						common.$emit('toMine');
						_self.$store.dispatch('getUserInfor');
						common.$emit('getLocation');
						if(common.pageParam.backRouter.split('/')[1] == 'releaseOffer') {
							if(_self.id) {
								common.$emit('releaseOffer', _self.id); //点击购买时未登录，登陆成功之后提醒商品那个详情页面刷新
								common.$emit('setParam', 'skipLogin', true);
								common.$emit('inforCartPop', 1); //通知购物车弹出
								_self.$router.replace('releaseOffer/' + _self.id);
							} else {
								common.$emit('releaseOffer', common.pageParam.backRouter.split('/')[2]); //没有_self.id的时候
								common.$emit('setParam', 'skipLogin', true);
								common.$emit('inforCartPop', 1);
								common.$emit('needToReleaseOffer', {
									id: common.pageParam.backRouter.split('/')[2],
									type: undefined
								});
								_self.$router.replace('releaseOffer/' + common.pageParam.backRouter.split('/')[2]);
							}
						} else {
							common.$emit('go_home', 1);
							_self.$router.replace('home');
						}
					} else {
						common.$emit('message', response.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			codeLogin() {
				let _self = this;
				common.$emit('show-load');
				httpService.login(common.urlCommon + common.apiUrl.code_login, {
					biz_param: {
						phone: _self.param.phone,
						code: _self.param.code
					}
				}, function(response) {
					common.$emit('close-load');
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

							// common.$emit('go_home', 1);
							_self.$router.replace('home');
						}
					} else {
						common.$emit('message', response.data.msg);
					}

				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			confirmLogin: function() {
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
				httpService.register(common.urlCommon + common.apiUrl.most, {
					biz_module: 'userSmsService',
					biz_method: 'getLoginCode',
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
					common.$emit('message', response.data.msg);
				}, function(err) {
					common.$emit('message', err.data.msg);
				})

			},
			login() {
				var checkArr = [];
				let _self = this;

				let checkPhone = validation.checkPhone(_self.param.phone);
				checkArr.push(checkPhone);
				if(_self.myShow.show == 0) {
					let checkPassword = validation.checkNull(_self.param.password, '请输入密码！');
					checkArr.push(checkPassword);
				} else {
					let checkCode = validation.checkNull(_self.param.code, '请输入验证码！');
					checkArr.push(checkCode);
				}
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				if(_self.myShow.show == 1) {
					_self.codeLogin();
				} else if(_self.myShow.show == 0) {
					_self.passWordLogin();
				}
			},
			password_open() {
				let _self = this;
				let eyes = document.getElementById('password');
				if(_self.eye_status == false) {
					eyes.type = 'text'
				} else {
					eyes.type = 'password'
				}
				_self.eye_status = !_self.eye_status;
			}

		},
		beforeDestroy(){
			sotre.remove('router')
		},
		destroyed(){
			console.log('des')
		},

		
		mounted() {
			console.log('mounter')
			this.myShow.setTime = null
			this.code = '获取验证码';
			//this.getOpenId();
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>