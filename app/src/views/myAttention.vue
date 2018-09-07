<style lang="less" scoped>
	.page-loadmore-listitem {
		height: 50px;
		border-bottom: solid 1px #eee;
		text-align: center;
		&:first-child {
			border-top: solid 1px #eee;
		}
	}
	
	.mint-load {
		background: #fff;
	}
	
	.mint-spinner {
		display: inline-block;
		vertical-align: middle;
	}
	
	.mint-loadmore-top span {
		display: inline-block;
		transition: .2s linear;
		vertical-align: middle;
	}
	
	.mint-loadmore-bottom span {
		display: inline-block;
		transition: .2s linear;
		vertical-align: middle;
	}
	
	.low_price {}
	
	.my_attention {
		.bg_white {
			background: #f3f3f3;
			.bbox {
				padding: 0px;
				box-sizing: border-box;
				padding: 2px 0 10px;
				li {
					display: flex;
					flex-direction: row;
					height: 110px;
					background-color: #fff;
					box-sizing: border-box;
					padding: 10px;
					border-radius: 4px;
					position: relative;
					margin: 10px 10px 0;
					border-radius: 8px;
					overflow: hidden;
					box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
					.yang {
						position: absolute;
						height: 28px;
						right: 0px;
						top: 0px;
					}
					.images {
						width: 1;
						height: 100%;
						box-sizing: border-box;
						position: relative;
						.my_images {
							width: 80px;
							height: 100%;
						}
						.sampling {
							position: absolute;
							z-index: 200;
							left: 0;
							top: 0;
							img {
								width: 15px;
								margin-right: 1px;
							}
						}
					}
					.main {
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 10px;
						position: relative;
						&>div {
							text-align: left;
							width: 100%;
						}
						.names {
							font-size: 14px;
							line-height: 20px;
							color: #333;
							word-break: keep-all;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							.zheng {
								width: 24px;
								height: 18px;
								margin: 1px 4px 0px 0;
								vertical-align: middle;
								box-shadow: 1px 1px 1px 0px rgba(35, 20, 17, 0.43);
							}
							.its_mine {
								line-height: 20px;
								height: 20px;
								vertical-align: middle;
								margin: 0 4px 0 0px;
							}
						}
						.spec {
							font-size: 15px;
							line-height: 25px;
							color: #000;
							word-break: keep-all;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							&.price {
								color: #fb2c0d;
							}
							img {
								height: 16px;
								vertical-align: middle;
							}
						}
						.times {
							font-size: 12px;
							line-height: 12px;
							margin-top: 10px;
							color: #999;
							position: absolute;
							bottom: 0px;
							z-index: 20;
							white-space: nowrap;
						}
					}
					.rights {
						flex: 1;
						display: flex;
						flex-direction: column;
						.top {
							font-size: 12px;
							width: 100%;
							line-height: 19px;
							color: #ff8201;
							text-align: right;
						}
						.emtry {
							flex: 1;
						}
						.bottom {
							position: absolute;
							padding: 5px 10px;
							border: 1px solid #e6e6e6;
							border-radius: 15px;
							font-size: 12px;
							color: #666;
							right: 16px;
							bottom: 10px;
						}
					}
				}
			}
		}
		
	}
	
	.my_attention .bg_white .page-loadmore-wrapper {
		background-color: #fcfcfc;
		.page-loadmore-list_second {
		margin-top: -10px;
		position: relative;
		.page-loadmore-listitem {
			float: left;
			/*width: 100%;*/
			min-height: 100px;
			padding: 0;
			height: auto;
			background: white;
			/*margin-top: 10px;*/
			/*border-radius: 3px;*/
			/*box-shadow: 0px 0px 20px #F5F5F5;*/
			margin: 10px 10px 0;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
			.bottom {
				float: left;
				width: 100%;
				padding: 0 10px;
				height: 4.18rem;
				display: flex;
				.left {
					line-height: 20px;
					.date {
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						font-size: 13px;
						color: #FF8100;
						padding-right: 15px;
						img {
							width: 12px;
							margin-right: 5px;
						}
					}
					.dates {
						font-size: 12px;
						color: #898989;
					}
					@media screen and (max-width: 320px) {
						.breed {
							font-size: 15px;
							margin-right: 5px;
						}
						.date {
							font-size: 10px;
							padding-right: 10px;
						}
					}
				}
				.emtrys {
					flex: 1;
				}
				.right {
					/*width: 120px;*/
					.detail {
						background-color: #FF8300;
						height: 35px;
						line-height: 35px;
						color: #fff;
						font-size: 16px;
						border-radius: 20px;
						width: 120px;
						margin: 0 15px 10px;
					}
					.mine_color {
						background-color: #FF6060;
					}
					.report {
						background-color: #B5B5B5;
					}
				}
			}
			.center {
				float: left;
				width: 100%;
				padding: 0 10px 1.066rem 10px;
				position: relative;
				.ji {
					position: absolute;
					height: 28px;
					right: 0px;
					top: 0px;
				}
				.title {
					position: relative;
					display: -ms-flexbox;
					display: flex;
					-ms-flex-direction: row;
					flex-direction: row;
					-ms-flex-align: center;
					align-items: center;
					height: 42px;
					/*&>div {
						display: inline-block;
					}*/
					.left {
						.flag {
							width: 24px;
							height: 18px;
							margin: 1px 4px 0px 0;
							vertical-align: middle;
							box-shadow: 1px 1px 1px 0px rgba(35, 20, 17, 0.43);
						}
						.yang{
							width: 14px;
							height: 18px;
							margin: 1px 4px 0px 0;
							vertical-align: middle;
						}
					}
					.empty {
						flex: 1;
					}
					.right {
						padding-right: 15px;
						font-size: 14px;
					}
					.buy_type {
						display: inline-block;
						height: 18px;
						line-height: 18px;
						font-size: 12px;
						color: #fff;
						padding: 0 4px;
						margin: 0px 4px 0px 0;
						border-radius: 1px;
						background-color: #ff8201;
					}
				}
				.detail {
					width: 100%;
					display: flex;
					background-color: #f6f6f6;
					display: -webkit-box;
					display: -webkit-flex;
					display: -ms-flexbox;
					-webkit-box-orient: vertical;
					-webkit-flex-direction: column;
					-ms-flex-direction: column;
					.spec {
						border-right: 1px solid #ebebeb;
						flex: 1;
						p {
							line-height: 25px;
							font-size: 15px;
							&:nth-child(1) {
								color: #999;
								font-size: 13px;
							}
						}
					}
				}
			}
		}
	}
	}

.my_attention{
	.fixed_box{
		.fixed {
			margin-top: 50px;
			float: left;
			width: 100%;
			background-color: #f3f3f3;
		}
	}
	.bg_white{
		
	}
	
}


</style>

<template>
	<div class="my_attention">
		<div class="fixed_box">
			<attentionHead :param="param" v-on:tab="tabAttention"></attentionHead>
			<div @click="jumpSearch" class="fixed">
				<longSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" :param="myShow"></longSearch>
			</div>
		</div>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
				<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="bbox" v-show="param.show">
						<li v-for="todo in todos" @click="jump(todo.id)">
							<img src="/static/icon/homesample.png" v-show="todo.sampling == 1" class="yang">
							<div class="images">
								<img :src="todo.image[0]" class="my_images">
							</div>
							<div class="main">
								<div class="names">
									<img class="zheng" :src="todo.cFlagsPath" v-show="todo.cFlagsPath && todo.isMy==0" />
									<img src="/static/icon/list/zheng.png" class="its_mine" v-show="todo.especial == 1"> {{todo.breedName}}
								</div>
								<div class="spec">
									<img src="/static/icon/list/local.png" />
									<span>{{todo.location}}</span>
								</div>
								<div class="spec">
									<img src="/static/icon/list/spc.png" />
									<span>{{todo.spec}}</span>
								</div>
								<div class="spec price">
									￥{{todo.price}}/
									<span>{{todo.unit}}</span>
								</div>
							</div>
							<div class="rights">
								<div class="emtry"></div>
								<div class="bottom">
									查看详情
								</div>
							</div>
						</li>
					</ul>

					<!------------------------------------------------------求购----------------------------------------->

					<ul class="page-loadmore-list_second" v-show="!param.show">
						<li v-for="todo in todos" class="page-loadmore-listitem list_content_item" v-on:click="jumpNeed(todo.id)">
							<div class="center">
								<img class="ji" src="/static/icon/list/ji.png" v-if="todo.especial == 1 && todo.type == 0">
								<div class="title">
									<div class="left">
										<img src="https://ojic8qd7z.qnssl.com/contry_icon/zhongguo.png" class="flag">

										<!--<img src="/static/icons/sample.png" class="yang" v-if="todo.sampling == 1 && todo.type == 0">-->
										<div class="buy_type" v-show="todo.indentTypeName">{{todo.indentTypeName}}</div>
										<span>{{todo.breedName}}</span>

									</div>
									<div class="empty"></div>
									<div class="right">
										<p>已报价<span>{{todo.offer}}</span>人</p>
									</div>
								</div>
								<div class="detail">
									<div class="spec">
										<p>规格</p>
										<p>{{todo.spec}}</p>
									</div>
									<div class="spec">
										<p>产地</p>
										<p>{{todo.location}}</p>
									</div>
									<div class="spec">
										<p>交货地址</p>
										<p>{{todo.province,8 | filterTxt}}</p>
									</div>
									<div class="spec">
										<p>需求数量</p>
										<p>{{todo.number}}
											<span>({{todo.unit}})</span>
										</p>
									</div>
								</div>
							</div>
							<div class="bottom">
								<div class="left">
									<div class="date"><img src="/static/icon/list/time.png" />{{todo.duedate | needTimeDay}}</div>
									<p class="dates">上架时间：{{todo.shelveTime | timeFormats}}</p>
								</div>
								<div class="emtrys"></div>
								<div class="right">
									<div class="detail" v-if="todo.especial == 0 && todo.isMy == 0 && todo.isOffer == 0">
										抢先报价
									</div>
									<div class="detail" v-if="todo.especial == 1 && todo.isMy == 0 && todo.isOffer == 0">
										抢先报价
									</div>
									<div class="detail mine_color" v-if="todo.isMy == 1 && todo.isOffer == 0">
										我的求购
									</div>
									<div class="detail report" v-if="todo.isOffer == 1">
										已报价
									</div>
								</div>

							</div>
						</li>
					</ul>
					<div slot="top" class="mint-loadmore-top">
						<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
						<span v-show="topStatus === 'loading'">
                            <mt-spinner type="snake"></mt-spinner>
                        </span>
					</div>
					<div slot="bottom" class="mint-loadmore-bottom">
						<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
						<span v-show="bottomStatus === 'loading'">
                            <mt-spinner type="snake"></mt-spinner>
                        </span>
					</div>
				</mt-loadmore>
			</div>
		</div>
		<errPage :param="err" v-show="todos.length==0"></errPage>
	</div>
</template>
<script>
	import common from '../common/common.js'
	import longSearch from '../components/tools/longSearch'
	import attentionHead from '../components/tools/attentionHead'
	import validation from '../validation/validation.js'
	import httpService from '../common/httpService.js'
	import filters from '../filters/filters'
	import errPage from '../components/tools/err'
	export default {
		data() {
			return {
				scrollTop: 0,
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png',

				},
				myShow: {
					myShow: true
				},
				param: {
					name: '资源收藏',
					other_name: '求购收藏',
					show: true,
					router: "home"
				},
				show: true,
				selected: "1",
				resourceArr: [],
				needArr: [],
				keyword: '',
				todos: [],
				topStatus: '',
				wrapperHeight: 0,
				ttwrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					keyword: '',
					intentionType: 1,
					page: 1,
					pageSize: 10
				}
			}
		},
		components: {
			longSearch,
			attentionHead,
			errPage
		},
		methods: {
			jumpSearch() {
				common.$emit('setParam', 'router', 'myAttention')
				this.$router.push('search');
			},
			jump(id) {
				common.$emit('resourceDetail', id);
				common.$emit('formPopUpBack', id);
				this.$router.push('resourceDetail/' + id);
			},
			jumpNeed(id) {
				common.$emit('needToDetails', {
					id: id,
					type: ''
				});
				this.$router.push('/needDetails/' + id);
			},
			resorceHttp(back) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionService',
					biz_method: 'attentionIntentionList',
					biz_param: {
						breedName: _self.httpPraram.keyword,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize,
						intentionType: _self.httpPraram.intentionType
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myAttention(url, body, function(suc) {
					common.$emit('close-load');
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					let result = suc.data.biz_result.list;
					for(let i = 0; i < result.length; i++) {
						_self.todos.push(result[i]);
					}
					if(back) {
						back();
					}

				}, function(err) {
					common.$emit('close-load');
					if(back) {
						back();
					}
				})
			},
			clearKeyword() {
				let _self = this;
				this.httpPraram.page = 1;

				this.httpPraram.keyword = '';
				this.resorceHttp();
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
			loadBottom(id) {
				let _self = this;
				setTimeout(() => {
					if(this.todos.length < this.httpPraram.page * this.httpPraram.pageSize) {
						this.allLoaded = true;
					} else {
						this.httpPraram.page++;
						this.resorceHttp(function() {
							_self.$refs.loadmore.onBottomLoaded(id);
						});
					}
				}, 500);
			},

			handleTopChange(status) {
				this.topStatus = status;
			},
			loadTop(id) {
				let _self = this;
				setTimeout(() => {
					_self.httpPraram.page = 1;
					_self.resorceHttp(function() {
						_self.$refs.loadmore.onTopLoaded(id);
					});

				}, 500);
			},
			tabAttention(param) {
				let _self = this;
				if(param == 0) {
					_self.httpPraram.intentionType = 1;
					_self.resorceHttp();
				} else if(param == 1) {
					_self.httpPraram.intentionType = 0;
					_self.resorceHttp();
				}
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
		created() {
			let _self = this;
			_self.resorceHttp();
			common.$on("informResAttention", function(id) {
				_self.httpPraram.page = 1;
				_self.resorceHttp();
			});
			common.$on('attention', function(item) {
				_self.httpPraram.keyword = item.keyWord;
				_self.httpPraram.page = 1;
				_self.resorceHttp();
			});
		},

		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 100;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}

	}
</script>