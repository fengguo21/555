<style lang="less" scoped>
	.header {
		height: 50px;
		width: 100%;
		background: #ff8201;
		display: flex;
		.header_side {
			position: relative;
			width: 10%;
			.img {
				margin-top: 12px;
				height: 25px;
				width: auto;
			}
			.red_img {
				position: absolute;
				width: 9px;
				height: 9px;
				right: 24px;
				top: 12px;
			}
		}
		.header_center {
			width: 80%;
			position: relative;
			margin: 10px 5px;
			background-color: #fff;
			border-radius: 50px;
			overflow: hidden;
			&.big_search {
				width: 90%;
				padding-left: 20px;
			}
			&.super_search{
				width: 100%;
				padding-left: 20px;
			}
			.img_box {
				position: absolute;
				right: 0px;
				z-index: 2;
				height: 26px;
				width: 50px;
				.search_image {
					margin-top: 4px;
					height: 20px;
				}
			}
			.input {
				width: 100%;
				height: 30px;
				background-color: #fff;
				border: 0;
				outline: 0;
				padding-left: 15px;
			}
		}
	}
</style>
<template>
	<div class="header">
		<div class="header_side" v-if="param.mycart || (param.resource && param.back)">
			<img class="img" src="/static/images/resource-detail-cart.png" v-show="param.mycart" @click.stop.prevent="jump('/cart')">
			<img class="img" src="/static/images/go-back.png" @click.stop="back()" v-show="param.resource && param.back">
		</div>
		<div class="header_center" :class="{big_search:!(param.mycart || (param.resource && param.back)),super_search:(!param.myMessage && !(param.mycart || (param.resource && param.back)))}" >
			<div class="img_box" @click.stop.prevent="clearWord()">
				<img class="search_image" src="/static/images/search.png" v-show="!keyword">
				<img class="search_image" src="/static/images/false.png" v-show="keyword">
			</div>
			<input class="input" type="text" v-bind:class="{ search_active: keyword }" placeholder="请输入您想要的货物资源" disabled="true" v-model="keyword">
		</div>
		<div class="header_side" v-if="param.myMessage">
			<img src="/static/icon/i-red.png" class="red_img" v-if="isRead == '0'" v-show="param.myMessage">
			<img class="img" src="/static/icon/message.png" @click.stop.prevent="jump('/message')" v-show="param.myMessage">
		</div>
	</div>
</template>
<script>
	import httpService from '../../common/httpService.js'
	import common from '../../common/common.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				value: ''
			}
		},
		props: {
			keyword: {},
			param: {

			}
		},
		computed: {
			isRead() {
				return this.$store.state.user.isRead;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			},
		},
		methods: {
			clearWord() {
				this.$emit("clearSearch");
			},
			back() {
				if(common.pageParam.backHome) {
					common.pageParam.backHome = false;
					this.$router.push('/home');
				} else if(this.param.goBack) {
					this.$router.push('/home');
				} else if(window.history.length == 1) {
					this.$router.push('/home');
				} else if(this.param.gohome) {
					this.$router.push('/home');
				} else {
					window.history.go(-1)
				}

			},
			jump(router) {
				if(!common.KEY || !this.userInfor.phone) {
					let _self = this;

					function loadApp() {
						if(router == '/cart') common.$emit('setParam', 'backRouter', 'lowPriceRes');
						if(router == '/message') common.$emit('setParam', 'backRouter', 'message');
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
				this.$router.push(router)
			}
		}
	}
</script>