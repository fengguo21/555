<style lang="less" scoped>
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
	
	.my_resource {
		height: 100vh;
		width: 100%;
		overflow: hidden;
		position: relative;
		.main {
			width: 100%;
			overflow-y: scroll;
			.list {
				.item {
					/*background-color: #fff;
					margin-top: 10px;
					padding-left: 10px;*/
					background-color: #fff;
					margin: 10px;
					border-radius: 10px;
					overflow: hidden;
					box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
					.top {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						line-height: 15px;
						padding: 10px 20px 10px 15px;
						border-bottom: 1px solid #e6e6e6;
						.left {
							font-size: 13px;
							color: #000;
						}
						.right {
							font-size: 15px;
							color: #ff8201;
						}
					}
					.content {
						padding: 10px 0 15px 15px;
						position: relative;
						height: 124px;
						/*display: flex;*/
						/*flex-direction: row;*/
						align-items: center;
						.image {
							/*display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;*/
							width: 90px;
							height: 94px;
							position: absolute;
							overflow: hidden;
							img {
								width: 90px;
								min-height: 94px;
							}
						}
						.center {
							width: 100%;
							margin-left: 12px;
							text-align: left;
							float: left;
							padding: 0 0 0 90px;
							.breed {
								display: flex;
								flex-direction: row;
								align-items: center;
								line-height: 17px;
								font-size: 17px;
								color: #000;
								img {
									width: 17px;
									margin-right: 2px;
								}
							}
							.spec {
								margin-top: 12px;
								font-size: 13px;
								line-height: 13px;
								color: #9A9A9A;
							}
							.location {
								margin-top: 10px;
							}
							.price {
								color: #FF4343;
								font-size: 13px;
								margin-top: 10px;
								/*width: 90px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;*/
								span {
									font-size: 15px;
								}
							}
						}
						.right {
							width: 135px;
							/*display: flex;
							flex-direction: row;*/
							height: 94px;
							/*align-items: flex-end;*/
							/*float: right;*/
							position: absolute;
							right: 10px;
							.go_sale {
								font-size: 15px;
								color: #fff;
								padding: 6px 14px;
								background-color: #ff8201;
								margin-right: 6px;
								border-radius: 19px;
							}
							
							.goDetail {
								position: absolute;
								bottom: 0px;
								right: 10px;
								background-color: #ff8201;
								color: #fff;
								width: 88px;
								font-size: 15px;
								line-height: 16px;
								padding: 8px 14px;
								border-radius: 16px;
								margin: 0 auto;
							}
							.revise {
								background-color: #fff;
								border: 1px solid #E7E7E7;
								color: #999;
								width: 88px;
								text-align: center;
								bottom: 40px;
							}
						}
						@media screen and (max-width: 320px) {
							.right {
								width: 110px;
								display: flex;
								flex-direction: row;
								height: 94px;
								align-items: flex-end;
								.go_sale {
									font-size: 13px;
									color: #fff;
									padding: 4px 9px;
									background-color: #ff8201;
									margin-right: 6px;
									border-radius: 19px;
								}
								
								.goDetail {
									background-color: #ff8201;
									color: #fff;
									width: 50px;
									font-size: 10px;
									line-height: 13px;
									padding: 4px 7px;
									border-radius: 16px;
									margin: 0 auto;
								}
								.revise {
								background-color: #fff;
								border: 1px solid #E7E7E7;
								color: #999;
								width: 50px;
								text-align: center;
								bottom: 30px;
							}
							}
						}
					}
				}
			}
		}
	}
</style>
<template>
	<div class="my_resource">
		<div class="fixed">
			<myHeader :param="param"></myHeader>
			<myPurchaseSort v-on:postId="getId" :sort="sortRouter" :paramArr="sortArr"></myPurchaseSort>
		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0">
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
				<div class="list">
					<div class="item" v-for="(todo,index) in todos" @click="jumpDetail(todo.id)">
						<div class="top">
							<div class="left">{{todo.pubdate | timeFormat}}</div>
							<div class="right">{{todo.onSell | shellStatus}}</div>
						</div>
						<div class="content">
							<div class="image">
								<img :src="todo.image[0]">
							</div>
							<div class="center">
								<div class="breed">
									<img src="/static/icon/square-zheng.png" class="zheng" v-if="todo.especial == 1 && todo.type == 1">
									<img src="/static/icon/square-sampling.png" class="sampling" v-if="todo.sampling == 1 && todo.type == 1">
									<div class="breed_name">{{todo.breedName}}</div>
								</div>
								<div class="spec">规格: {{todo.spec,4 | filterTxt}}</div>
								<div class="spec location">规格: {{todo.location,4 | filterTxt}}</div>
								<div class="price">￥
									<span>{{todo.price}}/</span>{{todo.unit}}</div>
							</div>
							<div class="right" v-show="todo.onSell==0 || todo.onSell==-2 || todo.onSell==4 || todo.onSell==3">
								<div class="goDetail" @click.stop="atOnceSale(todo.id)">上架</div>
								<div class="goDetail revise" @click.stop="jump(todo.id,index)">编辑</div>
							</div>
							<div class="right" v-show="todo.onSell==1 || todo.onSell==2">
								<div class="goDetail">查看详情</div>
							</div>
						</div>
					</div>
				</div>
				<div slot="top" class="mint-loadmore-top">
					<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
					<span v-show="topStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
				</div>
				<div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"></span>
					<span v-show="bottomStatus === 'loading'">
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
				</div>
			</mt-loadmore>
		</div>
		<errPage :param="err" v-show="todos.length==0"></errPage>
		<customPopUp v-show="popshow.show" :popshow="popshow" :type="type" :number="number"></customPopUp>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import searchInput from '../../components/tools/inputSearch'
	import myHeader from '../../components/header/myHeader'
	import myPurchaseSort from '../../components/tools/myPurchaseSort'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	import errPage from '../../components/tools/err'
	import customPopUp from '../../components/popUpType/customPopUp'
	export default {
		data() {
			return {
				scrollTop: 0,
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png',

				},
				popshow: {
					show: false,
					type: 2
				},
				type: 2,
				number: 1,
				sortRouter: 'home',
				param: {
					name: '我的资源',
					router: "home"
				},
				sortArr: [{
					name: '发布日期',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '发布日期',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						pubdate: 0,
						key: 'pubdate'
					}, {
						name: '由新到旧',
						asc: 'low',
						show: false,
						pubdate: 2,
						key: 'pubdate'
					}, {
						name: '由旧到新',
						asc: 'top',
						show: false,
						pubdate: 1,
						key: 'pubdate'
					}]
				}, {
					name: '剩余时间',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '剩余时间',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						duedate: '',
						key: 'duedate'
					}, {
						name: '由短到长',
						asc: 'low',
						show: false,
						duedate: 2,
						key: 'duedate'
					}, {
						name: '由长到短',
						asc: 'top',
						show: false,
						duedate: 1,
						key: 'duedate'
					}]
				}, {
					name: '可否供样',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '可否样品',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						sample: '',
						key: 'sample'
					}, {
						name: '可供样',
						asc: 'low',
						show: false,
						sample: 1,
						key: 'sample'
					}, {
						name: '不供样',
						asc: 'top',
						show: false,
						sample: 0,
						key: 'sample'
					}]
				}, {
					name: '上架状态',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '上架状态',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						testing: '',
						key: 'testing'
					}, {
						name: '未上架',
						asc: 'low',
						show: false,
						testing: 0,
						key: 'testing'
					}, {
						name: '上架受理中',
						asc: 'low',
						show: false,
						testing: 1,
						key: 'testing'
					}, {
						name: '已上架',
						asc: 'top',
						show: false,
						testing: 2,
						key: 'testing'
					}, {
						name: '上架失败',
						asc: 'low',
						show: false,
						testing: -2,
						key: 'testing'
					}, {
						name: '已下架',
						asc: 'low',
						show: false,
						testing: 4,
						key: 'testing'
					}]
				}],
				todos: [],
				obj: {},
				index: '',
				topStatus: '',
				wrapperHeight: '',
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					pubdate: 0,
					duedate: 0,
					sample: '',
					testing: '',
					page: 1,
					pageSize: 10
				}
			}
		},
		components: {
			searchInput,
			myPurchaseSort,
			myHeader,
			errPage,
			customPopUp
		},
		computed: {
			myTypes() {
				let ctype = this.$store.state.user.userInfor.ctype;
				let utype = this.$store.state.user.userInfor.utype;
				if(ctype == 0 && utype == 0) {
					return true
				} else if(ctype == 0 && utype == 3) {
					return true
				} else if(ctype == 3 && utype == 0) {
					return true
				} else if(ctype == 3 && utype == 3) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			getHttp(back) {
				let _self = this;
				if(_self.httpPraram.page == 1) {
					_self.allLoaded = false;
				}
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionService',
					biz_method: 'mySupplyIntentionList',
					biz_param: {
						sort: {
							"pubdate": _self.httpPraram.pubdate,
							"duedate": _self.httpPraram.duedate
						},
						onSell: _self.httpPraram.testing,
						sampling: _self.httpPraram.sample,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myResource(url, body, function(suc) {
					common.$emit('close-load');
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					let result = suc.data.biz_result.list;
					if(suc.data.code == '1c01') {
						if(result.length < _self.httpPraram.pageSize) {
							_self.allLoaded = true;
						}
						for(var i = 0; i < result.length; i++) {
							_self.todos.push(result[i]);
						}
					} else {
						common.$emit('message', suc.data.msg);
					}
					if(back) {
						back();
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
					if(back) {
						back();
					}
				})
			},
			atOnceSale(id) {
				let _self = this;
				//          if (_self.myTypes) {
				//              _self.popshow.show = true;
				//              //console.log(9989)
				//          } else {
				//              //console.log(12)
				_self.goSale(id);

				//          }
			},
			goSale(id) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionService',
					biz_method: 'applyOnSell',
					biz_param: {
						intentionId: id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.supplyRelease(url, body, function(suc) {
					common.$emit('close-load');
					console.log(suc);
					if(suc.data.code == '1c01') {

						common.$emit('message', suc.data.msg);
						_self.getHttp();
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getId(param) {
				let _self = this;
				_self.httpPraram.page = 1;
				_self.httpPraram[param.key] = param[param.key];
				_self.getHttp();
			},
			jumpDetail(id) {
				common.$emit("resourceDetail", id);
				this.$router.push('resourceDetail/' + id);
			},
			jump: function(id, index) {
				this.index = index;
				common.$emit("res-id", id);
				common.$emit('setParam', 'resourceId', id);
				this.$router.push('releaseResource/' + id);
			},
			delet(id) {
				let _self = this;

				function beforeDelet() {
					common.$emit('show-load');
					let url = common.addSID(common.urlCommon + common.apiUrl.most);
					let body = {
						biz_module: 'intentionService',
						biz_method: 'deleteIntentionInfo',
						biz_param: {
							id: id
						}
					};
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
					httpService.myResource(url, body, function(suc) {
						common.$emit('close-load');
						if(suc.data.code == '1c01') {
							_self.getHttp();
						} else {
							common.$emit('message', suc.data.msg);
						}

					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				}

				common.$emit("confirm", {
					message: '确认删除？',
					title: '提示',
					ensure: beforeDelet
				});
			},
			jumpBack(router) {
				this.$router.push(router)
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
						this.getHttp(function() {
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
					_self.getHttp(function() {
						_self.$refs.loadmore.onTopLoaded(id);
					});

				}, 500);
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
			if(common.KEY) _self.$store.dispatch('getUserInfor'); //刷新之后需要调用户信息接口
			_self.httpPraram.page = 1;
			_self.httpPraram.type = 0;
			if(this.$route.query.type) {
				_self.httpPraram.testing = _self.sortArr[3].sortArr[_self.$route.query.type].testing;
			}
			//console.log()
			//_self.httpPraram.testing = _self.sortArr[3].sortArr[common.pageParam.testing].testing;
			for(let i = 0; i < _self.sortArr[3].sortArr.length; i++) {
				_self.sortArr[3].sortArr[i].show = false;
			}
			this.getHttp();
			common.$on("informMyRes", function(id) {
				_self.httpPraram.testing = _self.sortArr[3].sortArr[id].testing;
				_self.httpPraram.page = 1;
				_self.httpPraram.pubdate = 0;
				_self.httpPraram.duedate = 0;
				_self.httpPraram.sample = '';

				//				_self.getHttp();
				for(let i = 0; i < _self.sortArr[3].sortArr.length; i++) {
					_self.sortArr[3].sortArr[i].show = false;
				}
				_self.sortArr[3].sortArr[id].show = true;
				//				_self.getHttp();
			});
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 90;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}
	}
</script>