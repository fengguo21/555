<style lang="less" scoped>
	.revise_password_confirm .bg_white {
		background-color: #f3f3f3;
		text-align: left;
		.fill_in {
			background: white;
			padding-left: 25px;
			width: 100%;
			margin-top: 10px;
			li {
				width: 100%;
				border-radius: 4px;
				height: 45px;
				line-height: 45px;
				position: relative;
				&.border{
					border-bottom: 1px solid rgba(230,230,230,.5);
				}
				.title {
					position: absolute;
					left: 0;
					top: 0;
					z-index: 10;
					display: inline-block;
					margin-right: 20px;
				}
				.eyes{
					position: absolute;
					display: inline-block;
					padding: 0 20px 0 10px;
					right: 10px;
					top: 0;
					img{
						height: 1.4rem;
						vertical-align: middle;
					}
				}
				.top_text {
					width:100%;
					overflow: auto;
					line-height: 24px;
					height: 44px;
					padding: 10px 10px 10px 45px;
					vertical-align: top;
					font-size: 12px;
					border: none;
					outline: none;
					&[disabled]{
						background: white;
						color: #333;
					}
				}
				
			}
		}
		.confirm {
					background: #ff8201;
					font-size: 18px;
					color: #fff;
					line-height: 50px;
					margin: 26px 2rem 2rem;
					border-radius: 50px;
					text-align: center;
				}
	}
</style>


<template>
	<div class="revise_password_confirm">
		<myHeader :param="my_header"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>
					<ul class="fill_in">
						<li class="border">
							<p class="title">手机</p>
							<p class='top_text' >{{param.phone}}</p>
						</li>
						<li>
							<p class="title">密码</p>
							<input type="password" class='top_text input' v-model="param.passWord" placeholder="请输入旧密码" >
							<div class="eyes" @click="changeShow(0)">
								<img v-if="!show[0].show" src="/static/icon/list/closeEye.png"/>
								<img v-if="show[0].show" src="/static/icon/list/openEye.png"/>
							</div>
						</li>
					</ul>
					<ul class="fill_in">
						<li  class="border">
							<p class="title">密码</p>
							<input type="password" class='top_text input' v-model="param.new_passWord" placeholder="请输入新密码">
							<div class="eyes" @click="changeShow(1)">
								<img v-if="!show[1].show"  src="/static/icon/list/closeEye.png"/>
								<img v-if="show[1].show"  src="/static/icon/list/openEye.png"/>
							</div>
						</li>
						<li class="last_li">
							<p class="title">密码</p>
							<input type="password" class='top_text input' v-model="param.again_new_passWord" placeholder="请确认新密码">
							<div class="eyes" @click="changeShow(2)">
								<img v-if="!show[2].show"  src="/static/icon/list/closeEye.png"/>
								<img v-if="show[2].show"  src="/static/icon/list/openEye.png"/>
							</div>
						</li>
					</ul>
					<div v-on:click="confirm" class="confirm">
						确定
					</div>
				</mt-loadmore>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	export default {
		data() {
			return {
				wrapperHeight: '',
				my_header: {
					name: '修改密码'
				},
				show:[{
					show:false,
				},{
					show:false,
				},{
					show:false,
				}],
				param: {
					phone: '',
					new_passWord: '',
					passWord: '',
					again_new_passWord: ''
				}
			}
		},
		components: {
			myHeader
		},
		methods: {
			changeShow(num){
				let _self = this;
				let arr = document.getElementsByClassName('input')
				if (_self.show[num].show == false) {
					arr[num].type ='text'
				} else{
					arr[num].type ='password'
				}
				_self.show[num].show=!_self.show[num].show;
				
			},
			getInfo() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'queryUserInfo',
					biz_param: {},
				};

				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.queryUserInfo(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == "1c01") {
						_self.param.phone = suc.data.biz_result.phone;

					}

				}, function(err) {
					common.$emit('close-load');
				})
			},
			confirm: function() {
				let _self = this;
				let checkArr = [];
				let checkPhone = validation.checkPhone(_self.param.phone);
				checkArr.push(checkPhone);
				let checkNewPassWord = validation.checkNull(_self.param.new_passWord, '请输入新密码！');
				checkArr.push(checkNewPassWord);
				let checkAgainPassWord = validation.checkNull(_self.param.again_new_passWord, '请确认新密码！');
				checkArr.push(checkAgainPassWord);
				let checkCommon = validation.checkCommon(_self.param.new_passWord, _self.param.again_new_passWord);
				checkArr.push(checkCommon);
				let checkPassword = validation.checkNull(_self.param.passWord, '请输入原密码！');
				checkArr.push(checkPassword);
				let checkDifferent = validation.checkDifferent(_self.param.new_passWord, _self.param.passWord);
				checkArr.push(checkDifferent);
				let checkMinNumber = validation.checkMinNumber(_self.param.new_passWord);
				checkArr.push(checkMinNumber);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return
					}
				}
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'updateUserPassword',
					biz_param: {
						password: _self.param.passWord,
						newPassword: _self.param.new_passWord
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.queryEmployeeInfo(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == "1c01") {
						common.customerId = '';
						common.KEY = '';
						common.SID = '';
						window.localStorage.ID = '';
						window.localStorage.KEY = '';
						window.localStorage.SID = '';
						common.$emit('clear_Information');
						common.$emit('setParam', 'backRouter', 'mySet');
						common.$emit('informBackMyself', 'mySet');
						common.$emit('getInfo', 1);
						_self.$router.replace('/login');
						common.$emit('message', suc.data.msg);
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
			let _self = this;
			_self.getInfo();
			common.$on('reviseMyPass', function(item) {
				for (var i=0;i<_self.show.length;i++) {
					_self.show[i].show=false;
				}
				_self.getInfo();
			})
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>

