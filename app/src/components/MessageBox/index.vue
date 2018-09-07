<template>
	<div class="boxMessage">
		<div class="boxPopUp" :class="{'small':isShowCancelImg}">
			<div class="cancel" @click="cancel()"></div>
			<div class="tbox">
				<div class="background" v-show="isShowCancelImg">
					<img :src="isShowCancelImg" alt="" />
				</div>
				<div class="text">
					<p>{{ title }}</p>
					<p>{{ content }}</p>
				</div>
				<div class="bottom">
					<div class="call" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</div>
					<div class="call color" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</div>
				</div>
			</div>
		</div>
		<p class="mask" @click="cancel"></p>
	</div>

	<!--
    	作者：361789874@qq.com
    	时间：2017-12-14
    	描述：
    	用法：
    	this.$msgBox.showMsgBox({
						title: '温馨提示',
						content: '请下载App后，在App内查看',
						isShowCancelBtn: true,
						isShowCancelImg: '/static/icon/list/miao1.png',
					}).then(async(val) => {
						this.loadApp
					}).catch(() => {
						// ...
					});
    -->
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '标题'
			},
			content: {
				type: String,
				default: '这是弹框内容'
			},
			isShowCancelImg: '/static/icon/list/miao1.png',
			isShowCancelBtn: {
				type: Boolean,
				default: true
			},
			isShowConfimrBtn: {
				type: Boolean,
				default: true
			},
			cancelBtnText: {
				type: String,
				default: '取消'
			},
			confirmBtnText: {
				type: String,
				default: '确定'
			}
		},
		data() {
			return {
				isShowMessageBox: false,
				resolve: '',
				reject: '',
				promise: '' // 保存promise对象
			};
		},
		methods: {
			// 确定,将promise断定为resolve状态
			confirm: function() {
				this.isShowMessageBox = false;
				if(this.isShowInput) {
					this.resolve(this.inputValue);
				} else {
					this.resolve('confirm');
				}
				this.remove();
			},
			// 取消,将promise断定为reject状态
			cancel: function() {
				this.isShowMessageBox = false;
				this.reject('cancel');
				this.remove();
			},
			// 弹出messageBox,并创建promise对象
			showMsgBox: function() {
				this.isShowMessageBox = true;
				this.promise = new Promise((resolve, reject) => {
					this.resolve = resolve;
					this.reject = reject;
				});
				// 返回promise对象
				return this.promise;
			},
			remove: function() {
				setTimeout(() => {
					this.destroy();
				}, 0);
			},
			destroy: function() {
				this.$destroy();
				document.body.removeChild(this.$el);
			}
		}
	};
</script>

<style lang="less" scoped>
	.boxMessage {
		overflow: hidden;
		position: absolute;
		height: 100vh;
		top: 0;
		z-index: 10000;
		width: 100%;
		text-align: center;
		.boxPopUp {
			position: absolute;
			width: 300px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 3001;
			&.small {
				width: 240px;
			}
			.cancel {
				width: 24px;
				height: 24px;
				position: absolute;
				right: -10px;
				background: #fff;
				top: -10px;
				z-index: 10;
				border-radius: 50px;
				background: url(/static/icon/list/x2.png) no-repeat;
				background-size: 100% 100%;
			}
			.tbox {
				background-color: #fff;
				padding-bottom: 0.1px;
				position: relative;
				border-radius: 14px;
				overflow: hidden;
				.background {
					margin: 20px 0 -10px;
					text-align: center;
					img {
						width: 85px;
					}
				}
				.text {
					margin: 20px 0;
					&>p:nth-child(1) {
						color: #FFAE00;
						font-size: 18px;
						line-height: 30px;
					}
					&>p:nth-child(2) {
						color: #999;
						font-size: 14px;
						line-height: 20px;
						padding:10px 10px;
					}
				}
				.bottom {
					height: 45px;
					display: flex;
					div {
						flex: 1;
						line-height: 45px;
						background-color: #f2f2f2;
						&.color {
							background-color: #fb8902;
							color: #fff;
						}
					}
				}
			}
		}
		.mask {
			width: 100%;
			height: 100vh;
			position: absolute;
			z-index: 1;
			background-color: rgba(0, 0, 0, .5);
			top: 0;
		}
	}
</style>