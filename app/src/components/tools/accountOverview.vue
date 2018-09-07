<style lang="less" scoped>
	.account_overview .header {
		height: 10.2307rem;
		width: 100%;
		background: url(/static/icon/new/bg.png) no-repeat;
		background-size: 100% auto;
		margin: 0;
		padding: 0;
		position: relative;
		padding-top: 4.8461rem;
		.image_box {
			height: 5.3846rem;
			float: left;
			line-height: 5.3846rem;
			width: 6.1346rem;
			/*transform:scale()：*/
			position: relative;
			.img_big {
				transform: scale(1.2);
			}
			&>img {
				width: 3.8461rem;
				height: 3.8461rem;
				vertical-align: middle;
				margin: 0 15px;
				border-radius: 50%;
				position: absolute;
				left: 0;
				/*box-shadow: 0 0 0 3px #f27f05;*/
			}
		}
		&>img {
			margin-bottom: 0.7692rem;
			width: 5.119rem;
			height: 5.119rem;
			border-radius: 50%;
			overflow: hidden;
		}
		.cerifis {
			float: left;
			margin-top: 0.7692rem;
			.user_name {
				text-align: left;
				color: #fff;
				font-size: 1.2307rem;
				line-height: 2.1538rem;
				height: 2.1538rem;
			}
		}
	}
	
	.account_overview .header .cerifi {
		flex-direction: row;
		box-sizing: border-box;
		margin: auto;
		margin-bottom: 0.3846rem;
		text-align: left;
	}
	
	.account_overview .header .loginbutton {
		line-height: 5.3846rem;
		float: left;
		color: #fff;
		font-size: 1.2307rem
	}
	
	.account_overview .header .cerifi>img {
		flex: 1;
		width: 5rem;
		height: 1.3846rem;
	}
	
	.account_overview .header .cerifi>.left_img {
		margin-right: 0.7692rem;
	}
	
	.account_overview .header>p {
		font-size: 1.279rem;
		line-height: 1.279rem;
		color: #333333;
	}
	
	.account_overview .login {
		font-size: 1.0769rem;
		width: 6.1538rem;
		padding: 0.2307rem;
		background: #ff8201;
		border-radius: 0.2307rem;
		color: white;
		margin: auto;
	}
	
	.account_overview .header .company-name {
		font-size: 1.0769rem;
		line-height: 1.0769rem;
		color: white;
		margin-top: 0.7692rem;
	}
</style>

<template>
	<div class="account_overview">
		<div class="header" style="">
			<div class="image_box">
				<img v-if="param.avatar" :src="param.avatar">
				<img v-if="param.avatar" class="img_big" src="/static/icon/new/head_pendant.png" @click="jump('/account')">
				<img src="/static/icon/new/nophoto.png" @click="jump('/login')" v-if="!param.avatar && !userInfor.phone ">
				<img src="/static/icon/new/nophoto.png" @click="jump('/account')" v-if="!param.avatar && userInfor.phone">
			</div>
			<div class="loginbutton" v-if='!userInfor.phone' @click="jump('/login')">登录/注册</div>
			<div class="cerifis" v-if='userInfor.phone'>
				<div class="user_name">
					<span v-show="userInfor.utype !== 2">{{param.fullname}}</span>
					<span v-show="userInfor.utype == 2 && userInfor.name">{{userInfor.name}}</span>
				</div>
				<div class="cerifi" v-if='userInfor.phone'>
					<img src="/static/icon/new/unperson.png" class="left_img" v-if="param.utype !== 2">
					<img src="/static/icon/new/person.png" class="left_img" v-if="param.utype == 2">
					<img src="/static/icon/new/unversion.png" v-if="param.ctype !== 2">
					<img src="/static/icon/new/version.png" v-if="param.ctype == 2">

				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import filters from '../../filters/filters'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				login_show: '',
				perfect: {
					name: '',
					bizMain: ''
				},
				show: true
			}
		},
		props: {

		},
		computed: {
			param() {
				return this.$store.state.user.userInfor;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			},
		},
		methods: {
			jump(index) {
				if(common.wxshow) {
					common.getWxUrl();
				} else {
					this.$router.push(index);
				}
			},
			open() {
				this.show = false;
			},
			close() {
				this.show = true;
			}
		},
		created() {
			let _self = this;

			if(!common.KEY) {
				_self.login_show = true;
				_self.$store.dispatch('clearUserInfor');
			} else {
				_self.login_show = false;
			}
			common.$on('getInfo', function(item) {
				if(!common.KEY) {
					_self.login_show = true;
					_self.$store.dispatch('clearUserInfor');
				} else {
					_self.login_show = false;

				}
			})

		}

	}
</script>