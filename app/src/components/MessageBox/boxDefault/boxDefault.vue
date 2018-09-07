<template>
	<div class="boxMessage">
		<div class="boxPopUp" :class="{'small':isShowCancelImg}" v-if="isType == 1">
			<div class="cancel" @click="cancel()"></div>
			<div class="tbox">
				<p class="title">{{ title }}</p>
				<div class="background" v-show="isShowCancelImg">
					<img :src="isShowCancelImg" alt="" />
				</div>
				<div class="text">

					<p>{{ content }}</p>
				</div>
				<div class="bottom">
					<div class="call" v-if="!chooseStatus">{{ confirmBtnText }}</div>
					<div class="call color" v-if="chooseStatus" @click="confirm">{{ confirmBtnText }}</div>
				</div>
				<div class="agreement">
					<i :class="{active:chooseStatus}" @click="choose"></i>
					<span>我已同意药贷宝相关协议</span>
				</div>
			</div>
		</div>
		<div class="boxPopUp" :class="{'small':isShowCancelImg}" v-if="isType == 2">
			<div class="cancel" @click="cancel()"></div>
			<div class="tbox">
				<p class="title">{{ title }}</p>
				<div class="background" v-show="isShowCancelImg">
					<img :src="isShowCancelImg" alt="" />
				</div>
				<div class="text">
					<p>{{ content }}</p>
				</div>
				<div class="bottom">
					<div class="call" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</div>
					<div class="call color" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</div>
				</div>
			</div>
		</div>
		<div class="boxPopUp" v-if="isType == 3">
			<div class="cancel" @click="cancel()"></div>
			<div class="tbox isType3" >
				<div class="container">
					<p class="title">邀请码用不用填？</p>
					<p>如果您没有邀请码，不填写也能成功注册。</p>
					<p class="title">邀请码是什么：</p>
					<p>邀请码是我们的采购及质检人员的身份标示，在邀请供应商注册时的供应商可填写邀请码，以证明该供应商是某个采购人员邀请注册的。</p>
					<p class="title">邀请码有什么用：</p>
					<p>方便我们识别哪些供应商是增加注册的，哪些供应商是我们邀请来的。</p>
					<p class="title">如何获取邀请码：</p>
					<p>目前仅能通过采购人员的邀请来获取验证码。</p>
				</div>
				<div class="bottom ">
					<div class="call" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</div>
					<div class="call color" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</div>
				</div>
			</div>
		</div>
		<div class="boxPopUp" v-if="isType == 4">
			<div class="cancel" @click="cancel()"></div>
			<div class="tbox isType3" >
				<p class="title">{{ title }}</p>
				<div class="container" >
					<p style="text-align: center;">所在城市：{{ content }}</p>
				</div>
				<div class="bottom ">
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
    	this.$defaultBox.showDefault({
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
			isType: '',
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
				default: false
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
				chooseStatus: false,
				promise: '' // 保存promise对象
			};
		},
		methods: {
			choose() {
				if(this.chooseStatus) {
					this.chooseStatus = false;
				} else {
					this.chooseStatus = true;
				}
			},
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
			showDefault: function() {
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

<style lang="less" scoped src='./boxDefault.css'></style>