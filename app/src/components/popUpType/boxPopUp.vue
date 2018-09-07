<style lang="less" scoped>
	.black {
		width: 100%;
		height: 100vh;
		position: absolute;
		z-index: 3000;
		background-color: #000;
		top: 0;
		opacity: 0.6;
	}
	
	.boxPopUp {
		position: absolute;
		width: 288px;
		margin-left: -144px;
		margin-top: -177px;
		left: 50%;
		z-index: 3001;
		top: 50%;
		border-radius: 14px;
		overflow: hidden;
		.custom_box {
			position: relative;
			background-color: #fff;
			.custom {
				width: 288px;
			}
		}
		.close {
			position: absolute;
			top: 0;
			right: 10px;
			width: 30px;
		}
		.tbox {
			background-color: #fff;
			padding-bottom: 20px;
			.title {
				font-size: 18px;
				color: #333;
				line-height: 35px;
			}
			.content {
				padding: 0 17px;
				/*text-indent: 2em;*/
				text-align: center;
				font-size: 14px;
				color: #666;
				line-height: 25px;
				span {
					span {
						color: #ff8201;
					}
				}
				.go_sale {
					span {
						color: #999999;
					}
				}
			}
			.call {
				width: 70%;
				/*border: 1px solid #ffbc48;*/
				margin: 14px auto;
				color: #fff;
				font-size: 17px;
				line-height: 16px;
				padding: 10px 0;
				background-color: #ffbc48;
				border-radius: 18px;
			}
			.other {
				background-color: #84BF51;
				color: #fff;
			}
		}
	}
</style>
<template>
	<div>
		<div class="boxPopUp">
			<div class="custom_box">
				<img src="/static/icon/pop-custom1.png" alt="" class="custom" v-show='popshow.type == 1'>
				<img src="/static/icon/guanbi.png" class="close" alt="" @click="cancel()" v-show='popshow.type == 1'>
			</div>
			<div class="tbox">
				<div class="title">
					<span v-if="popshow.addCar == false">加入购物车失败</span>
					<span v-if="popshow.addCar !== false">购买失败</span>
				</div>
				<div class="content">
					<span>只要完成企业认证就能购买样品</span>
				</div>
				<div class="call" @click="goApprove()">进行企业认证</div>
				<div class="call other" @click="cancel()">我再看看</div>
			</div>

		</div>
		<div class="black"  @click="cancel()">

		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	export default {
		data() {
			return {
				phone: common.servicePhone
			}
		},
		props: {
			popshow: {
				//			default:function(){
				//				return{
				//					addCar:'',
				//				}
				//			}
			},
			type: '',
			number: ''
		},
		computed: {
			customInfor() {
				return this.$store.state.user.customInfor;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			},
		},
		methods: {
			goApprove() {
				if(this.popshow.approve == 1 || this.popshow.approve == 3) {
					this.popshow.show = false;
					this.$router.push('/authResult?authen=1')
				} else if(this.popshow.approve == 0) {
					this.popshow.show = false;
					this.$router.push('/companyAuth')
				}
			},
			//      '/authResult?authen=1'
			cancel() {
				this.popshow.show = false;
			},

		},
		watch: {

		},
		mounted() {

		},
		created() {
			//      if (!common.servicePhone) this.getCustomerPhone();
		}
	}
</script>