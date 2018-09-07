<style lang="less" scoped>
	.multiple {
		overflow: hidden;
		position: relative;
		height: 100vh;
		.main {
			overflow-y: scroll;
			padding-bottom: 60px;
			background: #f3f3f3;
			.content {
				background-color: #fff;
				padding: 0 12px;
				.top {
					position: relative;
					text-align: left;
					padding: 12px 0;
					height: 100px;
					border-bottom: 1px solid #e6e6e6;
					.top_left {
						position: absolute;
						.image {
							width: 75px;
							height: 75px;
							position: relative;
							overflow: hidden;
							.breedImg {
								width: 100%;
								min-height: 75px;
								position: absolute;
								top: 50%;
								left: 0;
								transform: translateY(-50%);
							}
							.breedImgs {
								min-width: 75px;
								height: 100%;
								position: absolute;
								top: 0;
								left: 50%;
								transform: translateX(-50%);
							}
						}
					}
					.breed {
						position: absolute;
						padding-left: 85px;
						width: 100%;
						.breed_name {
							margin-bottom: 15px;
							font-size: 16px;
							line-height: 35px;
							img {
								height: 17px;
								margin-right: 3px;
							}
						}
						.local_spc {
							display: flex;
							.spec {
								font-size: 12px;
								color: #545454;
								margin-right: 5px;
								img {
									vertical-align: middle;
									height: 14px;
									margin-right: 4px;
								}
							}
						}
					}
					.number {
						float: right;
						font-size: 16px;
						line-height: 35px;
						text-align: right;
						width: 50%;
						height: 100%;
						.num {
							margin-top: 15px;
							font-size: 15px;
							line-height: 15px;
							color: #999;
						}
					}
				}
				.subtotal {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					padding: 10px 0;
					&.small {
						border-bottom: 1px solid #e6e6e6;
						.title {
							color: #333;
						}
						.price {
							color: #666;
						}
					}
					.title {
						font-size: 16px;
						color: #999;
					}
					.price {
						font-size: 16px;
						color: #ff8201;
					}
				}
			}
		}
		.account {
			position: absolute;
			bottom: 0px;
			width: 100%;
		}
	}
</style>
<template>
	<div class="multiple">
		<myHeader :param="param"></myHeader>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<div class="sxh-border_radius" @click="jumpAddress">
				<orderAddress :param="person"></orderAddress>
			</div>
			<div class="sxh-border_radius">
				<div class="content" v-for="todo in cart">
					<div class="top">
						<div class="top_left">
							<div class="image">
								<img :src="todo.image[0]" :class="todo.imgsize.width>todo.imgsize.height?'breedImgs':'breedImg'">
							</div>
						</div>
						<div class="breed">
							<div class="breed_name">
								<img src="/static/icon/square-sampling.png" v-if="todo.cartSample == 1 && todo.onSell == 2">
								<div>{{todo.breedName,7 | filterTxt}}</div>
							</div>
							<div class="local_spc">
								<div class="spec"><img src="/static/icon/list/local.png"> {{todo.spec}}</div>
								<div class="spec"><img src="/static/icon/list/spc.png">{{todo.location}}</div>
							</div>
						</div>
						<div class="number">
							<div class="price" v-show="todo.cartSample==0">￥{{todo.price}}/{{todo.unit}}</div>
							<div class="price" v-show="todo.cartSample==1">￥{{todo.sampleAmount}}/份</div>
							<div class="sxh-width num">x{{todo.cartNumber}}</div>
						</div>
					</div>
					<div class="subtotal small" v-for="(item,index) in centerArr">
						<div class="title">{{item.title}}</div>
						<div class="price" v-show="index == 0">
							待定
						</div>
					</div>
					<div class="subtotal">
						<div class="title" v-if="todo.cartSample == 0">大货订单</div>
						<div class="title" v-if="todo.cartSample == 1">样品订单</div>
						<div class="price" v-if="todo.cartSample == 0">小计: ￥{{Number(todo.price)*Number(todo.cartNumber) | floatType}}</div>
						<div class="price" v-if="todo.cartSample == 1">小计: ￥{{Number(todo.sampleAmount)*Number(todo.cartNumber) | floatType}}</div>
					</div>
				</div>
			</div>

		</div>
		<placeOrder class="account" :popshow="boxInfo" v-on:submitCartOrder="boxPop"></placeOrder>
		<boxPopDefault :popshow="boxInfo" v-on:agreement='confirm' v-show="boxInfo.show"></boxPopDefault>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import placeOrder from '../../components/tools/placeOrder'
	import orderAddress from '../../components/tools/orderAddress'
	import boxPopDefault from '../../components/popUpType/boxPopDefault'
	import validation from '../../validation/validation.js'
	import filters from '../../filters/filters'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				boxInfo: { //默认的弹窗样式
					show: false,
					type: 3,
					img:'/static/icon/list/miao1.png',
					text:'请确认提交订单'
				},
				addressId: '',
				cart: [], 
				centerArr: [{
					title: '运输费用'
				}],
				param: {
					name: '订单确认'

				},
				cart_data: {
					show: true,
					t_show: false
				},
				person: {

				},
				todos: [1, 2, 3, 4, 5, 6, 7],
				list: [],
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
			}
		},
		components: {
			myHeader,
			placeOrder,
			orderAddress,
			boxPopDefault
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			},

		},
		methods: {
			subtraction(todo) {
				let _self = this;
				//if()
			},
			addition() {
				let _self = this;

			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			cartContent() {
				let _self = this;
				var cart = localStorage.getItem('cartContent');
				cart = JSON.parse(cart);
				_self.cart = [];
				for(let i = 0; i < cart.length; i++) {
					var img = new Image();
					img.src = cart[i].image[0];
					var imgSize = {
						width: img.width,
						height: img.height
					};
					cart[i].imgsize = imgSize;
					_self.cart.push(cart[i]);
				}
			},
			loadBottom(id) {
				setTimeout(() => {
					let lastValue = this.list[this.list.length - 1];
					if(lastValue < 20) {
						for(let i = 1; i <= 10; i++) {
							this.list.push(lastValue + i);
						}
					} else {
						this.allLoaded = true;
					}
					this.$refs.loadmore.onBottomLoaded(id);
				}, 500);
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadTop(id) {
				setTimeout(() => {
					let firstValue = this.list[0];
					for(let i = 1; i <= 10; i++) {
						this.list.unshift(firstValue - i);
					}
					this.$refs.loadmore.onTopLoaded(id);
				}, 500);
			},
			getAddress() {
				let _self = this;
				common.$emit('show-load');
				let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
				let otherbody = {
					biz_module: 'userAddressService',
					biz_method: 'queryDefaultAddress',
					biz_param: {}
				};
				otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
				otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
				httpService.addressManage(otherurl, otherbody, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result;
					if(suc.data.code == "1c01") {
						_self.person = result;
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			
			boxPop(){
				let _self = this;
				_self.boxInfo.show=true;
			},
			confirm() {
				let _self = this;
				let arr = [];
				let obj = {};
				let sampleArr = [];
				let sampleObj = {};
				console.log(_self.cart)
				for(var i = 0; i < _self.cart.length; i++) {
					if(_self.cart[i].cartSample == 0) {
						obj.number = _self.cart[i].cartNumber;
						obj.intentionId = _self.cart[i].id;
						obj.cartId = _self.cart[i].cartId;
						obj.sample = 0;
						arr.unshift(obj);
					} else if(_self.cart[i].cartSample == 1) {
						sampleObj.number = _self.cart[i].cartNumber;
						sampleObj.intentionId = _self.cart[i].id;
						sampleObj.cartId = _self.cart[i].cartId;
						sampleObj.sample = 1;
						sampleArr.unshift(sampleObj);
					}

					console.log(arr);
					console.log(sampleArr);
					obj = {};
					sampleObj = {};
				}
				arr = JSON.stringify(arr);
				sampleArr = JSON.stringify(sampleArr);
				console.log(arr)
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionService',
					biz_method: 'submitCartOrder',
					biz_param: {
						goods: arr,
						goodsSample: sampleArr,
						addressId: _self.person.id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.cart(url, body,
					function(res) {
						common.$emit('close-load');
						if(res.data.code == '1c01') {
							common.$emit("getInfo", 1);
							common.$emit("mineToOrder", 0);
							_self.$router.replace('/allOrder');
							if(!common.pageParam.clickEvent) {
								common.$emit('setParam', 'router', 'orderSuccess');
							}
							_self.$store.dispatch('getHttp');
							//_self.$store.dispatch('')
							_self.$store.dispatch('hideAllShow')
						} else {
							common.$emit('message', res.data.msg);
						}
					},
					function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
			},
			jumpAddress() {
				common.$emit('setParam', 'router', 'multipleOrders');
				common.$emit("informAddress", 1);
				this.$router.push("/addressManage");
			}
		},
		watch: {
			param: {
				handler: function(newVal, oldVal) {
					let _self = this;
					console.log(newVal, oldVal)
					if(newVal.show != _self.cart_data.show) {
						_self.cart_data.show = newVal.show;
					}
					if(newVal.t_show != _self.cart_data.t_show) {
						_self.cart_data.t_show = newVal.t_show;
					}
				},
				deep: true
			}
		},
		mounted() {
			let _self = this;
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		created() {
			let _self = this;
			for(let i = 1; i <= 10; i++) {
				this.list.push(i);
			}
			_self.boxInfo.show=false;
			_self.getAddress();
			_self.cartContent();
			common.$on('cartContent', function(item) {
				_self.boxInfo.show=false;
				_self.getAddress();
				_self.cartContent();
			})
			common.$on('backAddress', function(todo) {
				_self.person.id = todo.id;
				_self.boxInfo.show=false;
				_self.person.address = todo.address;
				_self.person.contactPhone = todo.contactPhone;
				_self.person.contactName = todo.contactName;
				if(todo == 1) {
					_self.getAddress();
				}

			})
		}

	}
</script>