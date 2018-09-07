<template>
	<div class="my_set">
		<myHeader :param="my_header"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>
					<ul class="mylist">
						<li v-for="(todo,index) in address" @click="jump(todo)">
							<img :src="todo.first_img" class="herder">
							<p>{{todo.left_word}}</p>
							<!--<p class="last_word">{{todo.right_word}}</p>-->
							<img :src="todo.second_img" class="arrow">
						</li>
					</ul>
					<ul class="mylist">
						<li v-for="(todo,index) in password" @click="jump(todo)">
							<img :src="todo.first_img" class="herder">
							<p>{{todo.left_word}}</p>
							<!--<p class="last_word">{{todo.right_word}}</p>-->
							<img :src="todo.second_img" class="arrow">
						</li>
					</ul>

					<ul class="mylist">
						<li v-for="(todo,index) in todos" @click="jump(todo)">
							<img :src="todo.first_img" class="herder">
							<p>{{todo.left_word}}</p>
							<p class="last_word" v-if="todo.right_word">{{todo.right_word}}</p>
							<img :src="todo.second_img" class="arrow">
						</li>
					</ul>
					<div class="quit" @click="quit" v-show="userInfor.phone">退出当前账号</div>
				</mt-loadmore>
			</div>

		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import * as store  from '../../common/localStore.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				wxshow: true,
				wrapperHeight: '',
				my_header: {
					name: '我的设置',
					router: 'home'
				},
				address: [{
					first_img: '/static/images/address_administration.png',
					left_word: '我的收货地址',
					router: 'addressManage',
					second_img: '/static/images/right-arrow.png'
				}],
				password: [{
					first_img: '/static/images/password-modification.png',
					left_word: '登录密码修改',
					router: 'revisePassWordConfirm',
					second_img: '/static/images/right-arrow.png'
				}],

				todos: [{
					first_img: '/static/images/about.png',
					left_word: '关于我们',
					router: 'aboutus/us',
					second_img: '/static/images/right-arrow.png'
				}, {
					first_img: '/static/images/ider.png',
					left_word: '意见反馈',
					router: 'feedBack',
					second_img: '/static/images/right-arrow.png'
				}, {
					first_img: '/static/images/customer-service.png',
					left_word: '联系客服',
					right_word: common.servicePhone,
					func: function() {
						window.location.href = "tel:" + common.servicePhone;
					}
				}, {
					first_img: '/static/images/version.png',
					left_word: '当前版本',
					right_word: 'V' + httpService.version,
					func: function() {
						//						window.location.href = "tel:" + common.servicePhone;
					}
				}],
			}
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		components: {
			myHeader
		},
		methods: {
			quit() {
				let _self = this;

				function quitApp() {
					common.customerId = '';
					common.KEY = '';
					common.SID = '';
					store.remove('ID')
					store.remove('KEY')
					store.remove('SID')
					store.remove('me')
					common.$emit('clear_Information');
					common.$emit('setParam', 'backRouter', 'mySet');
					common.$emit('informBackMyself', 'mySet');
					common.$emit('getInfo', 2);
					_self.$router.replace('/login');
				}
				_self.$msgBox.showMsgBox({
					title: '主人',
					content: '您确定要退出登录吗~',
					isShowCancelImg: '/static/icon/list/miao2.png',
				}).then(async(val) => {
					quitApp();
				}).catch(() => {});
			},
			getCustomerPhone() {
				let _self = this;
				this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
					if(response.data.code == '1c01') {
						common.servicePhone = response.data.biz_result.serviceMobile;
						_self.todos[2].right_word = response.data.biz_result.serviceMobile;
					}
				}, (err) => {
					common.$emit('message', err.data.msg);
				});
			},
			jump: function(item) {
				let _self = this;
				console.log(item)
				if(item.func) {
					item.func();
				} else {
					if(item.router == 'addressManage') {
						common.$emit("informAddress", 1);
					} else if(item.router == 'feedBack') {
						common.$emit('informFeedBack', 1);
					} else if(item.router == 'revisePassWordConfirm') {
						common.$emit('reviseMyPass', 1)
					}
					if(item.router !== 'aboutus/us') {
						if(!common.KEY) {
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
						} else {
							this.$router.push(item.router);
						}
					} else {
						this.$router.push(item.router);
					}

				}
			}
		},
		created() {
			if(common.KEY) this.$store.dispatch('getUserInfor');
			if(!common.servicePhone) this.getCustomerPhone();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}

	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.page-loadmore-wrapper {
		overflow-x: hidden;
	}
	
	.my_set .bg_white {
		background-color: #F0F0F0;
		.mylist {
			padding: 0 4.7%;
			margin-bottom: 10px;
			background: white;
			li {
				min-height: 4.2rem;
				border-bottom: 1px solid #eee;
				position: relative;
				&:last-child {
					min-height: 4.2rem;
					border-bottom: 0;
					position: relative;
				}
				.herder {
					float: left;
					height: 1.5rem;
					margin-top: 1.3rem;
				}
				.arrow {
					position: absolute;
					height: 1rem;
					right: 0;
					top: 1.7rem;
				}
				p {
					float: left;
					line-height: 4.2rem;
					margin-left: 1.2rem;
					color: #333333;
				}
				.word_right {
					float: right;
					margin-right: 1.5rem;
					color: #666666;
					span {
						color: #ff8201;
					}
				}
				.last_word {
					float: right;
					line-height: 4.2rem;
					/*margin-left: 1.2rem;*/
					color: #666666;
				}
			}
		}
		.quit {
			background: #ff8201;
			font-size: 1.7rem;
			color: white;
			line-height: 50px;
			margin: 2rem 1rem;
			border-radius: 5px;
		}
	}
</style>