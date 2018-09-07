<template>
	<div class="loginHeader">
		<div class="go_back" @click="jumpBack()">
			<img src="/static/icon/register/goback3x.png">
		</div>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {}
		},
		props: {
			param:'',
		},
		computed: {},
		components: {
			
		},
		methods: {
			jumpBack() {
				let _self = this;
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
		},
		watch: {

		},
		mounted() {

		},
		created() {
		}
	}
</script>

<style lang="less">
	.loginHeader {
			height: 50px;
			background-color: #fff;
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
				display: -ms-flexbox;
				display: flex;
				flex-direction: row;
				align-items: center;
				img {
					height: 20px;
				}
			}
		}
</style>