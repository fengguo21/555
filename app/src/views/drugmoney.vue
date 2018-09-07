<style lang="less" scoped>
	.drugmoney {
		height: 100vh;
		padding-bottom: 1.5384rem;
		.head_content {
			width: 100%;
			height: 3.8461rem;
			border-bottom: 1px solid #ccc;
			background-color: #ff8201;
			.go-back {
				float: left;
				width: 15%;
				padding-right: 5%;
				height: 50px;
				img {
					margin-top: 15px;
					height: 20px;
				}
			}
			.title-name {
				float: left;
				width: 70%;
				height: 50px;
				font-size: 1.7rem;
				line-height: 50px;
				color: white;
				.text {
					float: left;
					width: 100%;
					background-color: #fff;
					height: 30px;
					margin: 10px 0;
					border-radius: 30px;
					.clear {
						float: right;
						height: 30px;
						line-height: 30px;
						padding: 0 10px;
					}
				}
			}
		}
		.contain {
			margin-top: 1.5384rem;
			text-align: center;
			.box {
				background-color: #fff;
				display: inline-block;
				width: 90%;
				border-radius: 0.7692rem;
				box-shadow: 0 0.2307rem 1.3846rem 0 #ccc;
				.box_titles {
					padding-bottom: 0.7692rem;
					border-bottom: 0.0769rem solid #eee;
					.box_title {
						margin: 1.1538rem 0;
						display: inline-block;
						font-size: 1.3076rem;
						color: #333;
						width: 7.7692rem;
						img {
							width: 1.923rem;
							height: 1.923rem;
							float: left;
						}
					}
					.bankcard {
						flex-direction: row;
						img {
							height: 2.3076rem;
						}
					}
				}
				.drug_money {
					position: relative;
					margin-top: 1.1538rem;
					padding-bottom: 0.7692rem;
					border-bottom: 0.0769rem solid #eee;
					.eyes {
						position: absolute;
						right: 0;
						width: 3.8461rem;
						height: 2.6923rem;
					}
					.drug_n {
						color: #fe6a6a;
						font-size: 2.3076rem
					}
					.drug_t {
						color: #333;
						font-size: 1.1538rem
					}
				}
				.quota {
					display: flex;
					flex-direction: row;
					padding-bottom: 0.7692rem;
					.item {
						flex: 1;
						height: 3.8461rem;
						.item_n {
							color: #333;
							line-height: 2.3076rem;
							font-size: 1.1538rem
						}
						.item_t {
							color: #999;
							font-size: 1.0769rem
						}
					}
				}
				.drug_button {
					display: flex;
					flex-direction: row;
					.drug_b {
						flex: 1;
						height: 3.6923rem;
						background-color: #ff9601;
						line-height: 3.6923rem;
						color: #fff;
						border-radius: 0 0 0 10px;
					}
					.right_b {
						background-color: #ffc001;
						border-radius: 0 0 10px 0;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="drugmoney">
		<my-header :param="my_header"></my-header>
		<wallet :param='massage'></wallet>
	</div>
</template>

<script>
	import common from '../common/common.js'
	import myHeader from '../components/header/myHeader'
	import wallet from '../components/list/wallet.vue'
	export default {
		data() {
			return {
				my_header: {
					name: '药款宝',
				},
				massage: {
					//					title: '药款宝',
					//					leftbutton: '充值',
					//					rightbutton: '提现',
					//					tip: '药款宝总额',
					//					show: true,
					//					msg: {
					//						total: '', //总数
					//						available: '', //可用
					//						freeze: '', //冻结
					//					},
					title: '药款宝钱包',
					leftbutton: {
						url: '',
						word: '充值',
					},
					rightbutton: {
						url: '',
						word: '提现',
					},
					total: {
						num: '',
						word: '药款宝总额',
					}, //总数
					minLeft: {
						num: '',
						word: '可用额度',
					}, //可用
					minRight: {
						num: '',
						word: '冻结额度',
					}, //冻结
					show: true,
				}
			}
		},
		computed: {
			param() {
				return this.$store.state.user.userInfor;
			}

		},
		components: {
			myHeader,
			wallet
		},
		created() {
			let _self = this;
			_self.massage.total.num = _self.param.normalMoney;
			_self.massage.minLeft.num = _self.param.normalMoney;
			_self.massage.minRight.num = _self.param.freezeMoney;
		},
		methods: {}
	}
</script>