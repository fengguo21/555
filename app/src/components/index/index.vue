<style lang="less" scoped>
	.home {
		position: relative;
		background-color: #f3f3f3;
		overflow-x: hidden;
		.big_box {
			overflow-y: scroll;
		}
		@keyframes goup {
			0% {
				background-color: rgba(255, 117, 0, 0);
			}
			100% {
				background-color: rgba(255, 117, 0, 1);
			}
		}
		@keyframes godown {
			0% {
				background-color: rgba(255, 117, 0, 1);
			}
			100% {
				background-color: rgba(255, 117, 0, 0);
			}
		}
		.search {
			position: fixed;
			z-index: 10000;
			top: 0px;
			width: 100%;
			height: 48px; //background-color: rgba(255, 117, 0, 1);
			animation: goup 0.5s linear forwards;
			display: flex;
			flex-direction: row;
			.left {
				padding: 5px 15px 0 15px;
				img {
					width: 20px;
				}
				.left_word {
					color: #fff;
					font-size: 12px;
				}
			}
			.center {
				flex: 1;
				.inbox {
					width: 100%;
					height: 26px;
					padding-left: 13px;
					background-color: rgba(255, 255, 255, 0.2);
					margin-top: 11px;
					border-radius: 13px;
					display: flex;
					flex-direction: row;
					img {
						width: 16px;
						height: 16px;
						margin-top: 5px;
					}
					.center_word {
						color: #fff;
						font-size: 13px;
						line-height: 26px;
						margin-left: 5px;
					}
				}
			}
			.right {
				padding: 5px 15px 0 15px;
				position: relative;
				.red_img {
					position: absolute;
					width: 9px;
					height: 9px;
					right: 13px;
					top: 4px;
				}
				.img {
					width: 20px;
				}
				.right_word {
					color: #fff;
					font-size: 12px;
				}
			}
		}
		.searchs {
			//background-color: rgba(255, 117, 0, 0);
			animation: godown 0.5s linear forwards;
		}
		.swiper {
			height: 19.16rem;
			width: 100%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.release {
			padding: 5px 5px 5px 0;
			width: 100%;
			display: flex;
			height: 100px;
			flex-direction: row;
			box-sizing: border-box;
			margin-bottom: 3px;
			.left {
				flex: 1;
				background-color: #fff;
				/*border: 1px solid #f5f5f5;*/
				margin-left: 5px;
				position: relative;
				box-shadow: 0px 3px 3px 0px rgba(72, 72, 72, 0.32);
				position: relative;
				/*margin: 0 auto;*/
				overflow: hidden;
				.contian {
					width: 100%;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					padding-left: 10px;
					img {
						margin-top: 8px;
						width: 24px;
						float: left;
					}
					.word {
						margin-left: 30px;
						text-align: left;
						.word_top {
							font-size: 16px;
							margin-bottom: 4px;
						}
						@media screen {
							.word_bottom {
								font-size: 12px;
							}
							@media (max-width: 320px) {
								.word_bottom {
									font-size: 10px;
								}
							}
						}
						.green {
							color: #A4C88F;
						}
						.orgrance {
							color: #FF8862;
						}
					}
				}
				.buy {
					margin: 0;
					position: absolute;
					right: 0px;
					top: 0px;
					width: 37px;
				}
			}
		}
		@media (max-width: 320px) {
			.release {
				height: 80px;
			}
		}
		.entrance {
			width: 100%;
			height: 82px;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			border-top: 1px solid #e;
			.box {
				flex: 1;
				background-color: #fff;
				img {
					height: 40px;
					margin: 8px 0 3px 0;
					&.active {
						height: 50px;
						margin: 7px 0 0px 0;
					}
				}
				.title {
					font-size: 12px;
					color: #999;
				}
			}
			.tbox {
				border-right: none;
			}
		}
		.pre_sell {
			margin: 10px 0;
			img {
				width: 100%;
			}
		}
		.guide_price,
		.recommend {
			width: 100%;
			margin-bottom: 10px;
			background-color: #fff;
			.top {
				padding: 0 15px;
				height: 44px;
				font-size: 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
				.center {
					flex: 1;
				}
				img {
					height: 14px;
				}
			}
			.content {
				border-top: 1px solid #e6e6e6;
				padding-left: 15px;
				.item {
					padding: 20px 0;
					.left {
						.image {
							width: 82px;
							height: 65px;
							overflow: hidden;
							img {
								width: 100%;
								min-height: 68px;
							}
						}
					}
				}
				.items {
					padding: 10px 0;
				}
				.first {
					border-bottom: 1px solid #e6e6e6;
					padding: 20px 0;
				}
				.firsts {
					border-bottom: 1px solid #e6e6e6;
					padding: 10px 0;
				}
			}
		}
		.urgent {
			width: 100%;
			margin-bottom: 10px;
			background-color: #fff;
			.top {
				padding: 0 15px;
				height: 44px;
				font-size: 15px;
				display: flex;
				flex-direction: row;
				align-items: center;
				.center {
					flex: 1;
				}
				img {
					height: 14px;
				}
			}
			.content {
				border-top: 1px solid #e6e6e6;
				padding-left: 15px;
				.item {
					min-height: 100px;
					display: flex;
					flex-direction: row;
					align-items: center;
					padding-left: 4px;
					position: relative;
					.urgent_img {
						position: absolute;
						height: 28px;
						right: 5px;
						top: 0px;
					}
				}
				.first {
					border-bottom: 1px solid #e6e6e6;
				}
				.left {
					flex: 1;
					text-align: left;
					position: relative;
					.top {
						position: absolute;
						width: 94px;
						height: 34px;
						font-size: 12px;
						top: 0;
						left: 0;
						background: #fff url('/static/icon/loaback.png') no-repeat;
						background-size: 94px 34px;
						color: #fff;
						.word {
							margin: auto;
						}
					}
					.center {
						margin-top: 15px;
						.breed_name {
							font-size: 15px;
							color: #000;
							margin-bottom: 3px;
							display: flex;
							flex-direction: row;
							align-items: center;
							.buy_type {
								height: 16px;
								line-height: 16px;
								font-size: 12px;
								color: #fff;
								padding: 0 2px;
								border-radius: 1px;
								background-color: #ff8201;
								margin-left: 5px;
							}
							/*// img {
							//     height: 15px;
							//     margin-right: 4px;
							// }*/
						}
						.box {
							display: flex;
							flex-direction: row;
							.left {
								flex: 2;
							}
							.right {
								flex: 5;
							}
							@media screen {
								.left,
								.right {
									font-size: 12px;
									color: #A9A9A9;
								}
								@media (max-width: 320px) {
									.left,
									.right {
										font-size: 10px;
										color: #A9A9A9;
									}
								}
							}
						}
					}
					.footer {
						margin-top: 8px;
						display: flex;
						flex-direction: row;
						.word {
							line-height: 40px;
							margin-right: 4px;
							font-size: 12px;
						}
						.date {
							position: relative;
							width: 20px;
							margin-right: 4px;
							img {
								width: 100%;
							}
							.num {
								width: 20px;
								position: absolute;
								font-size: 18px;
								line-height: 28px;
								text-align: center;
								color: #ff8201;
							}
						}
					}
				}
				.right {
					width: 130px;
					.report_pri {
						margin: 20px auto 0 auto;
						width: 100px;
						height: 32px;
						background-color: #7BB157;
						font-size: 16px;
						color: #fff;
						border-radius: 16px;
						line-height: 32px;
					}
					.dates {
						padding-top: 15px;
						margin-right: 15px;
						color: #A9A9A9;
					}
					.reported {
						font-size: 12px;
						margin-top: 5px;
						span {
							color: #7BB157;
						}
					}
					.mine_color {
						background-color: #FF6060;
					}
					.report {
						background-color: #B5B5B5;
					}
				}
			}
		}
		.recommend {
			width: 100%;
			background-color: #fff;
			.items {
				display: flex;
				flex-direction: row;
				position: relative;
				.left {
					flex: 1;
					display: flex;
					flex-direction: row;
					.image {
						width: 82px;
						height: 65px;
						padding: 0;
						position: relative;
						margin: 0 auto;
						overflow: hidden;
						.left_img {
							width: 100%;
							min-height: 65px;
							position: absolute;
							top: 50%;
							left: 0;
							transform: translateY(-50%);
						}
						position: relative;
						.flag {
							position: absolute;
							top: 0;
							left: 0;
							width: 25px;
							z-index: 1;
						}
					}
					.center {
						text-align: left;
						margin-left: 10px;
						.center_top {
							font-size: 15px;
							line-height: 22px;
							display: flex;
							flex-direction: row;
							align-items: center;
							.its_mine {
								height: 16px;
								margin: 0 4px 0 -2px;
							}
						}
						.center_box {
							display: flex;
							flex-direction: row;
							.specail_spec {
								width: 66px;
							}
							@media screen {
								.spec {
									font-size: 12px;
									color: #A9A9A9;
								}
								@media (max-width: 320px) {
									.spec {
										font-size: 10px;
										color: #A9A9A9;
									}
								}
							}
						}
						.center_bottom {
							font-size: 16px;
							line-height: 16px;
							color: #FB3F24;
							margin-top: 10px;
						}
					}
				}
				.right {
					width: 130px;
					position: relative;
					width: 100%;
					img {
						position: absolute;
						top: -10px;
						width: 38px;
						right: 0px;
					}
					.report_pri {
						position: absolute;
						bottom: 0;
						right: 5px;
						/*margin: 30px auto 0 auto;*/
						padding: 0 20px;
						height: 32px;
						background-color: #FF7500;
						font-size: 16px;
						color: #fff;
						border-radius: 16px;
						line-height: 32px;
					}
					@media screen and (max-width: 320px) {
						.report_pri {
							padding: 0 10px;
							line-height: 24px;
							font-size: 12px;
							height: 24px;
						}
					}
					.mine_color {
						background-color: #FF6060;
					}
					.report {
						background-color: #B5B5B5;
					}
					.reported {
						font-size: 12px;
						margin-top: 5px;
						span {
							color: #FF670C;
						}
					}
				}
			}
		}
		.guide_price {
			.content {
				.item {
					display: flex;
					flex-direction: row;
					.left {
						display: flex;
						flex: 1;
						flex-direction: row;
						.center {
							font-size: 14px;
							line-height: 14px;
							text-align: left;
							margin-left: 10px;
							.center_top {
								color: #000;
								line-height: 20px;
								margin-bottom: 10px;
							}
							.spec {
								color: #747474;
								margin-bottom: 10px;
							}
							.location {
								margin-bottom: 0px;
							}
						}
					}
					.right {
						width: 135px;
						padding-right: 20px;
						text-align: left;
						.red {
							line-height: 20px;
							margin-bottom: 10px;
							color: #ff8201;
						}
						.black {
							line-height: 20px;
							margin-bottom: 10px;
							color: #000;
						}
						.green {
							line-height: 20px;
							margin-bottom: 10px;
							color: green;
						}
						.spec {
							color: #747474;
							line-height: 14px;
							margin-bottom: 10px;
							display: flex;
							flex-direction: row;
							div {
								img {
									height: 14px;
									margin: 0 4px;
								}
							}
						}
						.location {
							margin-bottom: 0px;
						}
					}
				}
			}
		}
	}
	
	#myNeed {
		position: relative;
		height: 65px;
		.image {
			position: absolute;
		}
		.center {
			position: absolute;
			padding-left: 83px;
			.center_title {
				width: 15.3846rem;
				height: 22px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
<template>
	<div class="home" id="home">
		<div class="search" v-bind:class="{searchs:scrollTop<=200}">
			<div class="left" @click="jump('/cart')">
				<img src="/static/icon/shopping.png">
				<div class="left_word">购物车</div>
			</div>
			<div class="center" @click="fromIndex">
				<div class="inbox">
					<img src="/static/icon/enlarge.png">
					<div class="center_word">请输入你想要的资源</div>
				</div>
			</div>
			<div class="right" @click="message">
				<img src="/static/icon/i-red.png" class="red_img" v-show="isRead == '0'">
				<img src="/static/icon/message.png" class="img">
				<div class="right_word">消息</div>
			</div>
		</div>
		<div class="big_box" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
				<!--swiper广告-->
				<div class="swiper">
					<mt-swipe :auto="4000" :prevent="false">
						<mt-swipe-item v-for="(item,index) in imgArray">
							<img v-bind:src="item.htmlImg" @click="jumpLink(item.htmlUrl,imgArray.length,index)">
						</mt-swipe-item>
					</mt-swipe>
				</div>
				<!--入口-->
				<div class="entrance">
					<div class="box" v-for="(todo,index) in entrance" v-bind:class="{tbox:index == 3}" @click="jumpEntrance(todo.router)">
						<img :class="{'active':entranceImgList.type}" :src="todo.url">
						<div class="title">{{todo.text}}</div>
					</div>
				</div>
				<!--买卖按钮-->
				<div class="release">
					<div class="left" @click="loginJump('/releaseNeeds/1')">
						<div class="contian">
							<img src="/static/icon/home-buy.png">
							<div class="word">
								<div class="word_top">我要买货</div>
								<div class="word_bottom orgrance">为您要买的货全网比价</div>
							</div>
						</div>

						<img src="/static/icon/buy.png" class="buy">
					</div>
					<div class="left" @click="loginJump('/releaseResource/1')">
						<div class="contian">
							<img src="/static/icon/home-sell.png" class="sell_img">
							<div class="word">
								<div class="word_top">我要卖货</div>
								<div class="word_bottom green">为您扩张更多销售渠道</div>
							</div>
						</div>

						<img src="/static/icon/sell.png" class="buy">
					</div>
				</div>

				<!-----------------------------------------------以下是推荐资源-------------------------------------------->
				<div class="recommend">
					<div class="top" @click="jumpEntrance('/lowPriceRes')">
						<div class='left'>推荐资源</div>
						<div class="center"></div>
						<img src="/static/icon/right-arrow.png">
					</div>
					<div class="content">
						<div class="items" v-for="(todo,index) in resourceArr" v-bind:class="{firsts: index !== 2}" @click="jumpRes('resourceDetail/',todo.id)">
							<div class="left" id="myNeed">
								<div class="image">
									<img :src="todo.image[0]" class="left_img">
									<img :src="todo.cFlagsPath" class="flag" v-show="todo.cFlagsPath">
									<img src="/static/icon/zhongguo.png" class="flag" v-show="!todo.cFlagsPath">
								</div>
								<div class="center">
									<div class="center_top">
										<img src="/static/icon/auth-icon.png" class="its_mine" v-show="todo.especial == 1">
										<div class="center_title">{{todo.breedName}}</div>

									</div>
									<div class="center_box">
										<div class="spec specail_spec">规格:{{todo.spec,2 | filterTxt}}</div>&nbsp;&nbsp;
										<div class="spec">产地:{{todo.location,3 | filterTxt}}</div>
									</div>
									<div class="center_bottom">
										{{todo.price}}元/{{todo.unit}}
									</div>
								</div>
								<div class="right">
									<img src="/static/icon/homesample.png" v-show="todo.sampling == 1">
									<div class="report_pri" v-if="todo.especial !== 1">我要购买</div>
									<div class="report_pri" v-if="todo.especial == 1">立即抢购</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-----------------------------------------------紧急求购-------------------------------------------->
				<div class="urgent">
					<div class="top" @click="jumpEntrance('/urgentNeed')">
						<div class='left'>紧急求购</div>
						<div class="center"></div>
						<img src="/static/icon/right-arrow.png">
					</div>
					<div class="content">
						<div class="item" v-for="(todo,index) in urgentArr" v-bind:class="{first: index !== 2}" @click="jumpNeed(todo)">
							<img src="/static/icon/urgent-2.png" class="urgent_img">
							<div class="left">
								<div class="center">
									<div class="breed_name">

										<div>{{todo.breedName}}</div>
										<!-- <img src="/static/icon/yaochang.png"> -->
										<div class="buy_type" v-show="todo.indentTypeName">{{todo.indentTypeName}}</div>
									</div>
									<div class="box">
										<div class="left">规格:{{todo.spec,2 | filterTxt}}</div>
										<div class="right">{{todo.location,4 | filterTxt}}</div>
										<!-- 发布时间:{{todo.pubdate | timeFormat}} -->
									</div>
								</div>
								<div class="footer">
									<div class="word">剩余</div>
									<div class="date">
										<div class="num">{{todo.duedate | decade}}</div>
										<img src="/static/icon/date.png">
									</div>
									<div class="date">
										<div class="num">{{todo.duedate | theUnit}}</div>
										<img src="/static/icon/date.png">
									</div>
									<div class="word">天</div>
								</div>
							</div>
							<div class="right">
								<!-- <div class="reported dates">发布日期:{{todo.pubdate | timeFormat}}</div> -->
								<div class="report_pri" v-if="todo.especial == 0 && todo.isMy == 0 && todo.isOffer == 0">
									抢先报价
								</div>
								<div class="report_pri" v-if="todo.especial == 1 && todo.isMy == 0 && todo.isOffer == 0">
									抢先报价
								</div>
								<div class="report_pri mine_color" v-if="todo.isMy == 1 && todo.isOffer == 0">
									我的求购
								</div>
								<div class="report_pri report" v-if="todo.isOffer == 1">
									已报价
								</div>
								<div class="reported">已报价
									<span>{{todo.offer}}</span>人</div>
							</div>
						</div>
					</div>
				</div>
				<!-----------------------------------------------以下是药材指导价-------------------------------------------->
				<div class="guide_price">
					<div class="top" @click="jumpEntrance('/marketQuotation')">
						<div class='left'>药材指导价</div>
						<div class="center"></div>
						<img src="/static/icon/right-arrow.png">
					</div>
					<div class="content" @click="jumpEntrance('/marketQuotation')">
						<div v-for="(todo,index) in drugGuidePrices" class="item" v-bind:class="{first:index !== 1}">
							<div class="left">
								<div class="image">
									<img :src="todo.image">
								</div>
								<div class="center">
									<div class="center_top">{{todo.name}}</div>
									<div class="spec">规格:{{todo.spec,2 | filterTxt}}</div>
									<div class="spec location">产地:{{todo.location,2 | filterTxt}}</div>
								</div>
							</div>
							<div class="right">
								<div class='red' v-if="todo.dayDowns > 0">{{todo.unitprice}}元/</div>
								<div class='black' v-if="todo.dayDowns == 0">{{todo.unitprice}}元</div>
								<div class='green' v-if="todo.dayDowns < 0">{{todo.unitprice}}元</div>
								<div class="spec" v-if="todo.dayDowns > 0">
									<div>跌涨价格:</div>
									<div>
										<img src="/static/icons/up.png">
									</div>
									<div> +{{todo.dayMoney,5 | filterTxt}}元</div>
								</div>
								<div class="spec" v-if="todo.dayDowns == 0">
									跌涨价格: {{todo.dayMoney,5 | filterTxt}}元
								</div>
								<div class="spec" v-if="todo.dayDowns < 0">
									<div>跌涨价格:</div>
									<div>
										<img src="/static/icons/down.png">
									</div>
									<div> -{{todo.dayMoney,5 | filterTxt}}元</div>
								</div>
								<div class="spec location" v-if="todo.dayDowns > 0">跌涨幅度: +{{todo.dayDowns | indexFloatType}}%</div>
								<div class="spec location" v-if="todo.dayDowns == 0">跌涨幅度: {{todo.dayDowns | indexFloatType}}%</div>
								<div class="spec location" v-if="todo.dayDowns < 0">跌涨幅度: -{{todo.dayDowns | indexFloatType}}%</div>
							</div>
						</div>
					</div>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import longSearch from '../../components/tools/longSearch'
	import filters from '../../filters/filters'
	import * as store  from '../../common/localStore.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				phoneInfo: {
					longitude: '',
					latitude: '',
				},
				phone: common.servicePhone,
				imgArray: [],
				perfect: {
					name: '',
					manageType: '',
					userType: '',
					bizMain: ''
				},
				scrollTop: 0,
				show: true,
				drugGuidePrices: [],
				urgentArr: [],
				resourceArr: [],
				loca: '黑龙江黑龙江',
				time: '11111.00',
				entrance: [{
					url: '/static/icon/pre-sell.png',
					router: '',
					text: '预售专区'
				}, {
					url: '/static/icon/real-time.png',
					router: '/transaction',
					text: '实时成交'
				}, {
					url: '/static/icon/my-main-sell.png',
					router: '/majorBusiness',
					text: '我的主营'
				}, {
					url: '/static/icon/market.png',
					router: '/marketQuotation',
					text: '市场行情'
				}, {
					url: '/static/icon/encyclopedia.png',
					router: '/drugResTable?from=web',
					text: '药材百科'
				}],
				entranceImgList: {
					list: [],
					type: 0,
				},
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				isMessage: '',
			}
		},
		components: {
			longSearch
		},
		computed: {
			areaJson() {
				return this.$store.state.user.areaJson;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			},
			isRead() {
				return this.$store.state.user.isRead;
			}
		},
		methods: {
			getHomeImg() {
				var _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'filesService',
					biz_method: 'showIconImage',
					biz_param: {
						fileType: 1
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.commonPost(url, body, function(suc) {
					if(suc.body.biz_result.list.length) {
						if(suc.body.biz_result.list[0].path.length == 5){
							_self.entranceImgList.list = suc.body.biz_result.list[0].path;
						_self.entranceImgList.type = suc.body.biz_result.list[0].type;
						for(var i = 0; i < _self.entrance.length; i++) {
							_self.entrance[i].url = _self.entranceImgList.list[i];
						}
						}
					}

				}, function(err) {

				})
			},
			getInfo() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'queryUserInfo',
					biz_param: {},
				};

				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.queryUserInfo(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == "1c01") {
						_self.perfect.name = suc.data.biz_result.fullname;
						_self.perfect.manageType = suc.data.biz_result.manageType;
						_self.perfect.userType = suc.data.biz_result.userType;
						_self.perfect.bizMain = suc.data.biz_result.bizMain;
						let myInfo = suc.data.biz_result; //传给mine
						common.customerId = suc.data.biz_result.customerId;
						window.localStorage.ID = suc.data.biz_result.customerId;
						console.log(myInfo)
						common.$emit('myInfo', myInfo);
					} else {

					}
				}, function(err) {
					common.$emit('close-load');
				})
			},
			drugGuidePrice() {
				let _self = this;
				httpService.commonPost(common.urlCommon + common.apiUrl.most, {
					biz_module: 'breedService',
					biz_method: 'breedPriceGuide',
					biz_param: {
						pn: 1,
						pSize: 2
					}
				}, function(suc) {
					let result = suc.data.biz_result.list;
					_self.drugGuidePrices = result;
				}, function(err) {
					common.$emit('message', err.data.msg);

				})
			},
			resourceHttp() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionService',
					biz_method: 'reconnendList',
					biz_param: {
						pn: 1,
						pSize: 3
					}
				};
				if(common.KEY) {
					url = common.addSID(common.urlCommon + common.apiUrl.most);
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				}
				httpService.begBuyList(url, body, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result;
					let begBuyList = result.begBuyList;
					let supplyList = result.supplyList;
					_self.urgentArr = begBuyList;
					_self.resourceArr = supplyList;
					common.$emit('post-revise-address', _self.obj);

				}, function(err) {
					common.$emit('close-load');

				})
			},
			fromIndex() {
				common.searchType = 'keyword';
				common.$emit('setParam', 'router', 'index');
				this.$router.push("/search");
			},
			jump(path) {
				let _self = this;
				if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
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
				}
				if(path == "/cart") {
					this.$store.dispatch('getHttp');
				}
				this.$router.push(path);
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

				}

				if(path) {
					if(path == '/majorBusiness') {
						if(!common.KEY || !this.userInfor.phone) {
							function loadApp() {
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
						} else if(_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
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
							_self.$store.dispatch('getMainBusiness', {
								router: '/account',
								main: _self.$store.state.user.userInfor.bizMain
							});
							common.$emit('accountTomajorBusiness', this.$store.state.user.userInfor.bizMain)
							_self.$router.push('/majorBusiness?value=' + this.$store.state.user.userInfor.bizMain)
						}
					} else {
						common.$emit('clearThisSearch', 1);
						this.$router.push(path);
					}

				}
			},
			jumpNeed(obj) {
				let _self = this;
				common.$emit('needToDetails', {
					id: obj.id,
					type: ''
				});
				this.$router.push('/needDetails/' + obj.id);
			},
			jumpRes(router, id) {
				common.$emit('resourceDetail', id);
				this.$router.push(router + id);
			},
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
			message() {
				let _self = this;
				if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
						common.$emit('setParam', 'backRouter', 'message');
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
				}
				common.$emit('indexToMessage', 1)
				this.$router.push('/message')
			},
			getImgArr() {
				let _self = this;
				httpService.commonPost(common.urlCommon + common.apiUrl.most, {
					biz_module: 'activityService',
					biz_method: 'queryActivityList',
					biz_param: {
						type: 4
					}
				}, function(suc) {
					let result = suc.data.biz_result.list;
					_self.imgArray = result;
				}, function(err) {
					common.$emit('message', err.data.msg);

				})
			},
			jumpLink(url, myLength, index) {
				let _self = this;
				if(index == myLength - 1) {
					if(!common.KEY || !this.userInfor.phone) {
						function loadApp() {
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
						window.location.href = url;
					}
				} else {
					if(url) {
						window.location.href = url;
					}

				}
			},
			loginJump(router) {
				let _self = this;
				if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
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
				} else if(_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
					function perfect() {
						if(router == '/releaseNeeds/1') {
							_self.$store.dispatch('changeRouter', {
								index: 1,
								id: ''
							})
						} else if(router == '/releaseResource/1') {
							_self.$store.dispatch('changeRouter', {
								index: 2,
								id: ''
							})
						}
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
				}
				common.$emit('inforReleases', 1);

				this.$router.push(router);
			},
			handleScroll() {
				this.scrollTop = this.$refs.wrapper.scrollTop;
			},
			getScrollTop() {
				this.$refs.wrapper.scrollTop = this.scrollTop;
			},
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadTop(id) {
				let _self = this;
				setTimeout(() => {
					_self.drugGuidePrice();
					_self.resourceHttp();
					_self.getImgArr();
					if(common.KEY && this.userInfor.phone) _self.$store.dispatch('getMessage');
					_self.$refs.loadmore.onTopLoaded(id);
				}, 500);
			},
			getPhoneInfo() {
				let _self = this;
				var geolocation = new BMap.Geolocation();
				
				geolocation.getCurrentPosition(function(r) {
					console.log('pos test=====2')
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						getAddress(r.point);
					}
				});
				//获取地址信息，设置地址label
				function getAddress(point) {
					var gc = new BMap.Geocoder();
					gc.getLocation(point, function(rs) {
						upDate(rs)
					});
				}

				function upDate(rs) {
					_self.phoneInfo.longitude = rs.point.lng;
					_self.phoneInfo.latitude = rs.point.lat;
					store.set('location',rs)

					let url = common.addSID(common.urlCommon + common.apiUrl.most);
					let body = {
						biz_module: 'userService',
						biz_method: 'savePosition',
						biz_param: {
							longitude: _self.phoneInfo.longitude,
							latitude: _self.phoneInfo.latitude
						}
					};
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
					httpService.addCart(url, body, function(suc) {}, function(err) {})
				}
			}

		},
		watch: {
			'$route': 'getScrollTop',
			scrollTop: function(newValue, oldValue) {
				if(newValue > 200) {
					this.show = false;
				}
				if(newValue < 200) {
					this.show = true;
				}
			}
		},
		created() {
			let _self = this;
			_self.getHomeImg();
			if(!common.servicePhone) this.getCustomerPhone();
			//console.log(99,common.KEY)
			if(common.KEY) {
				_self.$store.dispatch('getUserInfor');
			}
			if(common.KEY) _self.$store.dispatch('getMessage');
			if(common.KEY&&!store.get('location')) {
				console.log('loca test===')
				_self.getPhoneInfo()
				setInterval(function() {
					_self.getPhoneInfo()
				}, 3600000)
			}

			common.$on('getLocation', function() {
				_self.getPhoneInfo()
				setInterval(function() {
					_self.getPhoneInfo()
				}, 3600)
			});
			common.$on('messageBack', function(item) { //由消息列表回来，处理缓存问题
				if(common.KEY) _self.$store.dispatch('getMessage');
			})
			common.$on('toMine', function(item) {
				if(common.KEY) _self.$store.dispatch('getUserInfor');
				if(common.KEY) _self.$store.dispatch('getMessage');
			})
			common.$on('perfectOldCustomer', function(item) { //完善老客户信息，处理缓存问题
				if(common.KEY) _self.$store.dispatch('getUserInfor');
			})
			common.$on('getInfo', function(item) {
				_self.resourceHttp();
				_self.$store.dispatch('defaultMessage');
				if(common.KEY) _self.$store.dispatch('getMessage');
			})
			this.resourceHttp();
			this.drugGuidePrice();
			this.getImgArr();

		},
		mounted() {
			let _self = this;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
			_self.wrapperHeight = document.body.offsetHeight - _self.$refs.wrapper.getBoundingClientRect().top - 55;

		}
	}
</script>