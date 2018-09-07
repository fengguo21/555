<style lang="less" scoped>
	.my_information {
		.information {
			background: white;
			margin-bottom: 0.8rem;
			ul {
				display: flex;
				flex-direction: row;
				li {
					flex: 1;
					padding: 10px 0;
					img {
						height: 1.7066rem;
						/*vertical-align: bottom;*/
					}
					p {
						/*display: inline-block;*/
						font-size: 1.19rem;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="my_information">
		<div class="information">
			<ul>
				<li v-for="todo in todos" @click="jump(todo.router)">
					<img :src="todo.url">
					<p>{{todo.name}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				todos: [{
					url: '../../../static/icon/new/collect.png',
					name: '我的收藏',
					router: 'myAttention',
				}, {
					url: '../../../static/icon/new/yaokuanbao.png',
					name: '药款宝',
					router: 'drugmoney'
				}, {
					url: '../../../static/icon/new/yaodaibao.png',
					name: '药贷宝',
					router: 'lendMoney',
				}],
				phone: common.servicePhone

			}
		},
		props: {
			param: {

			},
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		created() {
			if(!common.servicePhone) this.getCustomerPhone();
		},
		methods: {
			getCustomerPhone() {
				let _self = this;
				this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
					if(response.data.code == '1c01') {
						common.servicePhone = response.data.biz_result.serviceMobile;
						_self.phone = response.data.biz_result.serviceMobile;
					}
				}, (err) => {
					common.$emit('message', err.data.msg);
				});
			},
			call() {
				window.location.href = "tel:" + this.phone;
			},
			getInfo() {
				let _self = this;
				let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
				let otherbody = {
					biz_module: 'ydbService',
					biz_method: 'addAccount',
					biz_param: {}
				};
				otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
				otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
				httpService.queryEmployeeInfo(otherurl, otherbody, function(suc) {
					if(suc.body.code == '1c01') {
						common.$emit("applyLendStep", 1)
						_self.$router.push('applyLendStep');
						_self.$store.dispatch('getUserInfor');
					} else {
						_self.$defaultBox.showDefault({
							isType: 2,
							title: '申请开通',
							isShowCancelImg: '/static/icon/list/miao2.png',
							content: '抱歉，开通药贷宝需要完成个人认证并审核哦~',
							confirmBtnText: '进行个人认证'
						}).then(async(val) => {
							if(_self.userInfor.utype == 0) {
								_self.$router.push('personalStep1');
							} else {
								_self.$router.push('/authResult?authen=0');
							}
						}).catch(() => {
							// ...
						});
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			isOpenYdb(router) {
				let _self = this;
				if(this.userInfor.isOpenYdb == 0) { // 没开通
					this.$defaultBox.showDefault({
						isType: 1,
						title: '开通药贷宝',
						isShowCancelImg: '/static/icon/list/miao2.png',
						content: '抱歉，您还未开通药贷宝，请申请开通药贷宝',
						confirmBtnText: '开通药贷宝'
					}).then(async(val) => {
						this.getInfo();
					}).catch(() => {});

				} else {
					if(_self.userInfor.isPassYdb == 0) {
						common.$emit('setParam', 'router', 'applyLendStep')
						common.$emit("applyLendStep", 1)
						this.$router.push('applyLendStep');
					} else {
						common.$emit('setParam', 'router', 'lendMoney')
						common.$emit("lendMoney", 1)
						this.$router.push('lendMoney');
					}
				}
			},
			jump(router) {
				let _self = this;
				if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
						common.$emit('setParam', 'backRouter', '/home');
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
				} else if(router !== 'myAttention') {
					if(_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
						function perfect() {
							_self.$router.push('/perfectObject');
						}
						this.$msgBox.showMsgBox({
							title: '信息完善',
							content: '您的信息还未完善，现在去完善吗？',
							isShowCancelImg: '/static/icon/list/miao1.png',
							isShowCancelBtn: false,
							confirmBtnText: '去完善'
						}).then(async(val) => {
							perfect()
						}).catch(() => {});
						return;
					} else {
						if(router == 'lendMoney') {
							_self.$store.dispatch('getUserInfor');
							setTimeout(function() {
								_self.isOpenYdb(router);
							}, 0)
						} else {
							console.log(router)
							common.$emit("gotoRouter", 0)
							this.$router.push(router);
						}
					}
				} else {
					common.$emit("gotoRouter", 0)
					this.$router.push(router);
				}
			}
		}
	}
</script>