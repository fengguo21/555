<template>
	<div class="wallet">
		<div class="contain">
			<div class="box">
				<div class="box_titles">
					<p class="box_title">
						<img src="/static/icon/new/miao.png" />
						<span>{{param.title}}</span>
					</p>
					<div class="bankcard" @click="" v-if="this.$route.name == 'drugmoney'">
						<img src="/static/icon/new/app.png" @click="jumpEntrance('')" />
					</div>
				</div>
				<div class="drug_money">
					<img src="/static/icon/new/eyes.png" class="eyes" v-if="param.show" @click="open">
					<img src="/static/icon/new/closeeyes.png" class="eyes" v-if="!param.show" @click="open">
					<p class="drug_n">
						<span v-show="param.show">{{param.total.num | money}}</span>
						<span v-show="!param.show">****</span>
					</p>
					<p class="drug_t">{{param.total.word}}</p>
				</div>
				<div class="quota">
					<div class="item">
						<p class="item_n" v-show="param.show">{{param.minLeft.num |money}}</p>
						<p class="item_n" v-show="!param.show">****</p>
						<p class="item_t">{{param.minLeft.word}}</p>
					</div>
					<div class="item">
						<p class="item_n" v-show="param.show">{{param.minRight.num | money}}</p>
						<p class="item_n" v-show="!param.show">****</p>
						<p class="item_t">{{param.minRight.word}}</p>
					</div>
				</div>
				<div class="drug_button">
					<p class="drug_b" @click="jumpEntrance(param.leftbutton.url)">{{param.leftbutton.word}}</p>
					<p class="drug_b right_b" @click="jumpEntrance()">{{param.rightbutton.word}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true
			}
		},
		props: {
			param: {
				default: function() {
					return {
						title: '钱包',
						leftbutton: {
							url: '',
							word: '左侧按钮',
						},
						rightbutton: {
							url: '',
							word: '右侧按钮',
						},

						total: {
							num: '',
							word: '总数',
						}, //总数
						minLeft: {
							num: '',
							word: '可用',
						}, //可用
						minRight: {
							num: '',
							word: '冻结',
						}, //冻结
						show: true,

					}
				}
			}
		},
		computed: {},
		components: {},
		methods: {
			open() {
				let _self = this;
				_self.param.show = _self.param.show ? false : true;
			},
			loadApp() {
				window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
			},
			jumpEntrance(path) {
				let _self = this;
				if(!path) {
					_self.$msgBox.showMsgBox({
						title: '温馨提示',
						content: '请下载App后，在App内查看',
						isShowCancelBtn: false,
						confirmBtnText: '去下载'
					}).then(async(val) => {
						this.loadApp()
					}).catch(() => {});
				} else {
					_self.$router.push(path);
				}
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>

<style lang="less">
	.wallet {
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
					border-bottom: 0.0769rem solid #eee;
					.box_title {
						display: inline-block;
						font-size: 1.3076rem;
						color: #333;
						line-height: 50px;
						img {
							width: 1.923rem;
							height: 1.923rem;
							vertical-align: sub;
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