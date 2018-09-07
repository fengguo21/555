<template>
	<div class="address_manage">
		<myHeader :param="my_header"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
				<mt-loadmore>
					<ul>
						<li v-for="(todo,index) in todos" v-show="todo.show">
							<div class="address_top" @click="jumpBack(todo,todos.length)">
								<div class="receiver">
									<span>{{todo.contactName}}</span>
									<span>{{todo.contactPhone}}</span>
								</div>
								<div class="address">
									<span>{{todo.address}}</span>
								</div>
							</div>
							<div class="address_bottom">
								<span class="top_p">
									<img :src="todo.first_img"v-on:click="changeColor(todos,todo,index)">
									<span v-if="todo.first_img == '/static/icon/list/gou.png'" class="active">默认地址</span>
								<span v-if="todo.first_img !== '/static/icon/list/gou.png'">设为默认</span>
								</span>
								<span class="address_box">
									<span class="center_p">
										<img src="/static/icon/list/edit.png" >
										<span v-on:click="revise(todo)">修改</span>
								</span>
								<span class="bottom_p">
										<img src="/static/icon/list/dele.png" >
										<span v-on:click="delet(index)">删除</span>
								</span>
								</span>
							</div>
						</li>
					</ul>
				</mt-loadmore>
			</div>
		</div>
		<div class="add_address" v-on:click="addAddress" v-show="todos.length>0">
			<span><img src="/static/icon/list/plus.png"/>添加新地址</span>
		</div>
		<errPage :param="err" v-show="todos.length==0"></errPage>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import errPage from '../../components/tools/err'
	export default {
		data() {
			return {
				scrollTop: 0,
				err: {
					err: "您还没有添加收货地址",
					url: '/static/icon/list/map.png',
					addAddress: true,
				},
				wrapperHeight: '',
				my_header: {
					name: '地址管理',
					go_where: true,
					topissue: true

				},
				id: '',
				index: '',
				todos: [],
				obj: {}
			}
		},
		created() {
			let _self = this;
			_self.listHttp();
			common.$on("informAddress", function(id) {
				_self.listHttp();
			})
		},
		components: {
			myHeader,
			errPage
		},
		methods: {
			back() {
				common.$emit('backAddress', 1);
				window.history.go(-1);
			},
			jumpBack(todo, index) {
				let _self = this;
				if(common.pageParam.router == 'orderConfirm') {
					common.$emit('backAddress', todo);
					window.history.go(-1);
				} else if(common.pageParam.router == 'multipleOrders') {
					if(index == 1) {
						common.$emit('backAddress', 1);
						window.history.go(-1);
					} else {
						common.$emit('backAddress', todo);
						window.history.go(-1);
					}

				}

			},
			listHttp() {
				//本页面列表刷新接口
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userAddressService',
					biz_method: 'queryUserAddressList',
					version: 1,
					time: 0,
					sign: '',
					biz_param: {
						pn: '',
						pSize: ''
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addressManage(url, body, function(suc) {
					common.$emit('close-load');
					let listArr = suc.data.biz_result.list;
					if(suc.data.code == "1c01") {
						for(var item in listArr) {
							listArr[item].show = true;
							listArr[item].reviseShow = false;
							listArr[item].first_img = '/static/images/no-select.png';
							listArr[item].second_img = '/static/icon/list/edit.png';
							listArr[item].last_img = '/static/icon/list/dele.png';
							listArr[item].router = 'addressRevise';
							if(listArr[item].type == 1) {
								listArr[item].first_img = '/static/icon/list/gou.png';
							}
						}
						if(listArr.length == 1) listArr[0].first_img = '/static/icon/list/gou.png';
						_self.todos = listArr;
					} else {
						if(suc.data.msg) {
							common.$emit('message', suc.data.msg);
						}
					}
				}, function(err) {
					common.$emit('close-load');
					if(err.data.msg) common.$emit('message', err.data.msg);
				})
			},
			delet: function(index) {
				let _self = this;
				function beforeDelet() {
					let todo = _self.todos[index];
					common.$emit('show-load');
					let url = common.addSID(common.urlCommon + common.apiUrl.most);
					let body = {
						biz_module: 'userAddressService',
						biz_method: 'deleteUserAddress',
						version: 1,
						time: 0,
						sign: '',
						biz_param: {
							id: todo.id
						}
					};
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
					httpService.addressManage(url, body, function(suc) {
						common.$emit('close-load');
						if(suc.data.code == '1c01') {
							_self.todos.splice(index, 1);
							common.$emit('clearAddress', todo);

						} else {
							common.$emit('message', suc.data.msg);
						}
					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				}
				this.$msgBox.showMsgBox({
					title: '删除地址',
					content: '您确定要删除这条地址吗？',
				}).then(async(val) => {
					beforeDelet()
				}).catch(() => {});

			},
			changeColor: function(todos, todo, index) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userAddressService',
					biz_method: 'setDefaultAddress',
					biz_param: {
						id: todo.id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addressManage(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						common.$emit('message', suc.data.msg);
						_self.id = suc.data.biz_result.id;
						for(var item in todos) {
							todos[item].first_img = '/static/images/no-select.png';
							todos[index].first_img = '/static/icon/list/gou.png';
						}
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			addAddress: function() {
				common.$emit('newAddress', 1);
				this.$router.push('/addAddress/add');
			},
			revise: function(item) {
				let _self = this;
				//跳转到修改地址
				common.$emit('setParam', 'addressId', item.id);
				common.$emit('revise-address', item);
				let address = item.province + ':' + item.city + ':' + item.district;
				let addressId = item.provinceId + ':' + item.cityId + ':' + item.districtId;
				_self.$router.push('/addAddress/' + item.id + '?value=' + address + ':' + addressId);
			},
			handleScroll() {
				this.scrollTop = this.$refs.wrapper.scrollTop;
			},
			getScrollTop() {
				this.$refs.wrapper.scrollTop = this.scrollTop;
			}
		},
		watch: {
			'$route': 'getScrollTop'
		},
		mounted() {

			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 50;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}

	}
</script>
<style lang="less" scoped>
	.address_manage {
		.bg_white {
			background-color: #F0F0F0;
			text-align: left;
			.page-loadmore-wrapper {
				margin-bottom: 0;
				ul {
					margin-bottom: 100px;
					li {
						position: relative;
						background: white;
						margin-top: 1rem;
						padding: 0 15px;
						.address_top {
							padding: 10px 0;
							font-size: 16px;
							color: #333;
							.receiver {
								line-height: 35px;
								&>span:nth-child(2) {
									float: right;
								}
							}
							.address {
								line-height: 25px;
							}
						}
						.address_bottom {
							border-top: 1px solid rgba(230, 230, 230, 0.5);
							height: 3.7rem;
							line-height: 3.7rem;
							color: #666;
							img {
								vertical-align: middle;
								height: 1.4rem;
								margin-top: -4px;
							}
							.top_p {
								.active {
									color: #FF8201;
								}
							}
							.address_box {
								float: right;
								.center_p {
									margin-right: 20px;
								}
							}
						}
					}
				}
			}
		}
		.add_address {
			width: 100%;
			color: #ff8201;
			background-color: #fff;
			font-size: 1.7rem;
			line-height: 50px;
			position: absolute;
			bottom: 0;
			box-shadow: 0 0 13px 0px rgba(0, 0, 0, 0.2);
			img {
				height: 1.9rem;
				vertical-align: middle;
				margin: -2px 10px 0 0;
			}
		}
	}
</style>