<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.page-loadmore-listitem {
		height: 90px;
		line-height: 45px;
		text-align: center;
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
	
	.transaction {}
	
	.transaction_title {
		text-align: center;
		color: #ff8201;
		font-size: 1.1rem;
		height: 60px;
		line-height: 60px;
	}
	
	.transaction .bg_white .list_head {
		border-bottom: 1px solid rgba(230, 230, 230, 0.5);
		height: 45px;
		line-height: 45px;
		font-size: 1.3rem;
		color: #333;
		font-weight: 400;
		display: flex;
		.list_font {
			flex: 1;
			span {
				display: inline-block;
				height: 45px;
				line-height: 45px;
				&.active {
					color: #F77615;
					border-bottom: 3px solid #F77615;
				}
			}
		}
	}
	
	.transaction .bg_white .list_font {
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
	}
	
	.page-loadmore-list {
		background-color: #fafafa;
	}
	
	.transaction .bg_white .list_content_item {
		font-size: 1.1rem;
		color: #666;
		/*display: flex;*/
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		flex-direction: row;
		-webkit-box-orient: horizontal;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		border-top: 1px solid rgba(230, 230, 230, 0.5);
		border-bottom: 1px solid rgba(230, 230, 230, 0.5);
		margin-top: 10px;
		.item {
			float: left;
			display: inline-block;
			text-align: left;
			width: 38vw;
			height: 100%;
			background-color: #fff;
			.list_font {
				padding-left: 20px;
				border-bottom: 1px solid rgba(230, 230, 230, 0.5);
				span:nth-child(1) {
					color: #4c4c4c;
				}
				span:nth-child(2) {
					color: #333;
				}
				&:nth-child(2) {
					border-bottom: 0;
				}
			}
			&.first {
				width: 24vw;
				text-align: center;
				background-color: #FAFAFA;
				padding-left: 0px;
				.list_font {
					border-bottom: 0;
					padding-left: 0px;
					&:nth-child(1) {
						color: #333;
						font-size: 18px;
						line-height: 30px;
						margin-top: 15px;
					}
					&:nth-child(2) {
						color: #666;
						font-size: 14px;
						line-height: 30px;
						margin-bottom: 15px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="transaction">
		<myHeader :param="param"></myHeader>
		<div class="bg_white">
			<!--<div class="list_head">
				<div class="list_font" v-for="(item,index) in changeButton"><span :class="item.active?'active':''">{{item.name}}</span></div>
			</div>-->
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<!--<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">-->
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
					<ul class="page-loadmore-list">
						<li v-for="todo in todos" class="page-loadmore-listitem list_content_item">
							<div class="item first">
								<p class="list_font">{{todo.successTime | successTimeday}}</p>
								<p class="list_font">{{todo.successTime | successTimeMonth}}</p>

							</div>
							<div class="item">
								<p class="list_font"><span>品名：</span><span>{{todo.breedName}}</span></p>
								<p class="list_font"><span>规格：</span><span>{{todo.breedSpec}}</span></p>
							</div>
							<div class="item">
								<p class="list_font"><span>数量：</span><span>{{todo.number}}{{todo.unit}}</span></p>
								<p class="list_font"><span>产地：</span><span>{{todo.location}}</span></p>
							</div>

						</li>
					</ul>
					<div slot="top" class="mint-loadmore-top">
						<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
						<span v-show="topStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
					</div>
					<div slot="bottom" class="mint-loadmore-bottom">
						<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
						<span v-show="bottomStatus === 'loading'"><mt-spinner type="snake"></mt-spinner></span>
					</div>
				</mt-loadmore>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../common/common.js'
	import myHeader from '../components/header/myHeader'
	import httpService from '../common/httpService.js'
	import filters from '../filters/filters'
	export default {
		data() {
			return {
				param: {
					name: '实时成交'
				},
				changeButton: [{
					name: '全部',
					active: true,
				}, {
					name: '日成交量',
					active: false,
				}, {
					name: '周成交量',
					active: false,
				}, {
					name: '月成交量',
					active: false,
				}],
				todos: [],
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					page: 1,
					pageSize: 20
				},
			}
		},
		methods: {
			getHttp(back) {
				let _self = this;
				if(this.httpPraram.page == 1) {
					this.allLoaded = false;
				}
				if(_self.httpPraram.page == 1) common.$emit('show-load');
				httpService.realTimeTurnover(common.urlCommon + common.apiUrl.most, {
					biz_module: 'tradeNewService',
					biz_method: 'currentTradeList',
					biz_param: {
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize
					}
				}, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result.list;
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					if(suc.data.code == '1c01') {

						for(var i = 0; i < result.length; i++) {
							_self.todos.push(result[i]);
						}
					} else {
						common.$emit('message', suc.data.msg);
					}
					if(result.length < _self.httpPraram.pageSize) {
						_self.allLoaded = true;
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
			}
		},
		components: {
			myHeader
		},
		created() {
			let _self = this;
			_self.getHttp();
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}

	}
</script>