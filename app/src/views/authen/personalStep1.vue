<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	input {
		border: none;
	}
	
	.personal {
		.top {
			padding: 25px 15px;
			font-size: 14px;
			color: red;
			text-align: left;
		}
		.next {
			width: 90%;
			margin: 30px auto;
			background-color: #ff8201;
			color: #fff;
			height: 50px;
			border-radius: 25px;
			line-height: 50px;
			font-size: 18px;
		}
	}
</style>
<template>
	<div class="personal">
		<myHeader :param="head"></myHeader>
		<div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<div class="top">
				* 请确保您的身份证信息真实有效
			</div>
			<div class="step1">
				<nameAndId :param="param"></nameAndId>
				<div class="next" @click="loadName()">下一步</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import nameAndId from '../../components/authen/nameAndId'
	import imageUpLoad from '../../components/authen/imageUpLoad'
	import validation from '../../validation/validation.js'
	import filters from '../../filters/filters.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				head: {
					name: '个人认证'
				},
				param: {
					fullname: '',
					idnumber: ''
				},
			}
		},
		components: {
			myHeader,
			nameAndId,
			imageUpLoad
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			},
		},
		methods: {
			loadName(){
				let _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'updateCheckUserName',
					biz_param: {
						name: _self.param.fullname
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.cart(url, body,function(suc) {
						let result = suc.body;
						if(result.msg !== '验证成功') {
							common.$emit('message', result.msg);
						} else {
							_self.valId();
						}
					},
					function(err) {})
			},
			valId() {
				let _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'confirmCardNumber',
					biz_param: {
						idnumber: _self.param.idnumber
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.cart(url, body,
					function(suc) {
						let result = suc.body;
						if(result.msg !== '操作成功') {
							common.$emit('message', result.msg);
						} else {
							
							_self.next();
						}
					},
					function(err) {})
			},
			next() {
				let _self = this;
				let checkArr = [];
				let checkName = validation.checkNull(_self.param.fullname, '请输入姓名');
				checkArr.push(checkName);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return
					}
				}
				let val = 'fullname=' + _self.param.fullname + ';' + 'idnumber=' + _self.param.idnumber;
				common.$emit('personStep1To2', _self.param);
				_self.$router.push('/personalStep2?val=' + val);
			}
		},
		created() {

		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>