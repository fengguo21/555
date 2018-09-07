<style lang="less" scoped>
	.code {
		height: 100vh;
		.overflowhide {
			background-color: #f3f3f3;
			overflow: auto;
			.circle_box {
				background-color: #fff;
				overflow: hidden;
				margin: 10px 10px 15px;
				border-radius: 7px;
				box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
			}
			.logistics_n {
				float: left;
				width: 100%;
				font-size: 14px;
				line-height: 14px;
				padding: 16px 15px;
				background: white;
				text-align: left;
			}
			.shop_message {
				margin-top: 0.7692rem;
			}
			.logistics {
				float: left;
				width: 100%;
				padding: 0 15px;
				margin-top: 10px;
				background: white;
				&>div {
					float: left;
					padding: 10px 0 0 0;
					color: #050607;
					margin-bottom: 15px;
					width: 100%;
					img {
						float: left;
						width: 20px;
					}
					p {
						float: left;
					}
				}
				ul {
					float: left;
					padding-bottom: 10px;
					li {
						float: left;
						width: 100%;
						/*min-height: 70px;*/
						padding-bottom: 15px;
						padding-left: 20px;
						position: relative;
						background: url(/static/icons/unoranges.png) no-repeat;
						background-size: 5px 100%;
						&.now {
							color: #ff8201;
							background: url(/static/icons/oranges.png) no-repeat;
							background-size: 5px 100%;
							.time {
								color: #ff8201;
							}
						}
						.context {
							width: 93%;
							text-align: left;
							font-size: 14px;
							line-height: 15px;
							margin-top: 5px;
						}
						.time {
							width: 93%;
							text-align: left;
							font-size: 14px;
							margin-top: 15px;
							color: #ccc;
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="code">
		<myHeader :param="param"></myHeader>
		<!--<mt-loadmore :top-method="loadTop" :top-status.sync="topStatus">-->
		<!--<ul>
				<li v-for="item in list">{{ item }}</li>
			</ul>
			<div slot="top" class="mint-loadmore-top">
				<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
				<span v-show="topStatus === 'loading'">Loading...</span>
			</div>
		</mt-loadmore>-->
		<div class="overflowhide" :style="{ height: boxHeight + 'px' }">
			<div class="circle_box">
				<div class="logistics_n">
					运单号：{{logistics.nu}}
				</div>
			</div>

			<!--<div class="circle_box">
				<div class="logistics_n shop_message" @click="jumpDetail(logistics.orderId)">
					我是商品详情：“点我啊”
				</div>
			</div>-->
			<div class="circle_box">
				<div class="logistics">
					<div>
						<img src="/static/icons/wuliu.png" class="logis_img">
						<p>物流信息</p>
					</div>
					<ul>
						<li v-for="(item,index) in logistics.data" :class="index == 0? 'now':''">
							<!--<img src="/static/icons/oranges.png">-->
							<div class="context">{{item.context}}</div>
							<div class="time">{{item.time}}</div>
						</li>
						<!--<li v-for="(item,index) in logistics.data" v-if="index > 0">
							<!--<img src="/static/icons/unoranges.png">-->
						<!--<div class="context">{{item.context}}</div>
							<div class="time">{{item.time}}</div>
						</li>-->
					</ul>
				</div>
			</div>
			<!--<div style="height: 10px;"></div>-->
		</div>

	</div>
</template>

<script>
	import common from '../../common/common.js'
	import myHeader from '../../components/header/myHeader'
	import httpService from '../../common/httpService.js'
	import {
		mapGetters
	} from 'vuex'
	import { Loadmore } from 'mint-ui';
	export default {
		data() {
			return {
				boxHeight: '',
				param: {
					name: '物流详情',
					goBack: true
				},
			}
		},
		components: {
			myHeader
		},
		computed: {
			logistics() {
				return this.$store.state.address.logistics;
			}
		},
		methods: {
			jumpDetail(id) {
				this.$router.push('/allOrderDetail/' + id);
			},
		},
		mounted() {
			this.boxHeight = document.documentElement.clientHeight - 50;
		},
		created() {
			let _self = this;
			if(common.KEY) {
				_self.$store.dispatch('getLogistics');
			}
			common.$on('getInfo', function(id) {
				if(common.KEY) _self.$store.dispatch('getLogistics');
			});

			//			
		}

	}
</script>