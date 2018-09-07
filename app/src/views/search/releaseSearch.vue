<template>
	<div class="content release_search">
		<div v-bind:class="[mytype=='ios' ?  'ios_header' : 'search_div']">
			<div class="search_content">
				<input type="text" placeholder="请输入关键字" v-model="keyword">
				<img src="/static/images/search.png" class="search_image">
			</div>
			<span @click="back()">取消</span>
		</div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore>
				<div v-show="!keyword" class='hot_box' v-if="!$route.query.list">
					<div class="listsearch-box">
						<p class="listsearch" v-for="item in listsearch" v-on:click="jumpRes(item)">{{item.keyWord}}</p>
					</div>
				</div>
				<div v-show="keyword">
					<div v-bind:class="[mytype=='ios' ?  'ios_result' : 'search_result']">
						<ul class="page-loadmore-list">
							<li v-for="todo in datas" class="page-loadmore-listitem list_content_item" @click="jumpRes(todo)">
								<div>
									<img src="/static/icons/search.png">
									<p>{{todo.breedName}}
										<span v-if="searchType!='keyword'">({{todo.keyWord}})</span>
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</mt-loadmore>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import imageUpload from '../../components/tools/imageUpload'
	import httpService from '../../common/httpService.js'
	export default {
		data() {
			return {
				param: {
					name: '药材百科',
					router: 'home',
					appBack: true,
					type: 'my',
					search: '1'
				},
				mytype: '',
				str: '',
				keyword: '',
				historyArrs: [],
				todos: [],
				datas: [],
				listsearch: [],
				customerId: '',
				searchType: common.searchType,
				searchArr: [{
					"name": "人参",
					"spec": "统货",
					"place": "东北",
					"price": "98.9元/kg",
					"up_price": "9元/kg",
					"down_price": "9元/kg",
					"phone": "15301546832",
					"time": "12:26"
				}, {
					"name": "人参",
					"spec": "统货",
					"place": "东北",
					"price": "98.9元/kg",
					"up_price": "9元/kg",
					"down_price": "9元/kg",
					"phone": "15301546832",
					"time": "12:26"
				}, {
					"name": "人参",
					"spec": "统货",
					"place": "东北",
					"price": "98.9元/kg",
					"up_price": "9元/kg",
					"down_price": "9元/kg",
					"phone": "15301546832",
					"time": "12:26"
				}]
			}
		},
		methods: {
			back: function() {
				this.$router.go(-1);
			},
			clearResult: function() {
				this.historyArrs = [];
			},
			addsearch() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'searchKeywordService',
					biz_method: 'queryHotKeyword',
					biz_param: {
						pn: 1,
						pSize: 20
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addCart(url, body, function(suc) {
					_self.listsearch = suc.body.biz_result.list
					common.$emit('close-load');
				}, function(err) {
					common.$emit('close-load');
				})
			},
			jumpRes(item) {
				console.log(item);
				let _self = this;
				switch(common.pageParam.router) {
					case 'supplyRelease':
						common.$emit("setParam", 'supplyRelease', item);
						common.$emit("supplyRelease", item);
						break;
					case 'needRelease':
						common.$emit("Needrelease", item);
						break;
					case 'marketQuotation':
						common.$emit("marketQuotation", item);
						break;
					default:
						common.$emit("setParam", 'lowPrice', item);
						common.$emit("lowPriceRes", item);
						break;
				}

				let count = 1;
				for(let i = 0; i < _self.historyArrs.length; i++) {
					if(_self.historyArrs[i].id == item.id) {
						count = 0;
					}
				}
				if(count) _self.historyArrs.unshift(item);
				let arr = [];
				for(let i = 0; i < _self.historyArrs.length; i++) {
					arr[i] = JSON.stringify(_self.historyArrs[i]);
				}
				window.localStorage.historyArrs = arr.join('},');
				if(common.pageParam.router == 'index') {
					common.$emit("setParam", 'lowPrice', item);
					_self.$router.push('lowPriceRes');
				} else if(common.pageParam.router == 'drugResTable' || _self.$route.query.from == 'erp') {
					common.$emit("informdrugDetail", item.keyWord);
					_self.$router.push('/drugResTableDetail?name='+ item.keyWord);
				} else {
					window.history.go(-1);
				}
			}
		},
		watch: {
			keyword: function(newValue, oldValue) {
				let _self = this;
				this.searchType = common.searchType;
				window.clearTimeout(this.time);
				this.time = setTimeout(() => {
					common.$emit('show-load');
					let body = {
						biz_module: 'searchKeywordService',
						biz_method: 'querySearchKeywordBreed',
						biz_param: {
							keyWord: _self.keyword,
							pn: 1,
							pSize: 20
						}
					}
					if(common.searchType == 'keyword') {
						body.biz_module = 'searchKeywordService';
						body.biz_method = 'querySearchKeywordBreed';
					} else {
						body.biz_module = 'searchKeywordService';
						body.biz_method = 'querySearchKeywordBreed';
					}
					httpService.searchWord(common.urlCommon + common.apiUrl.most, body, function(suc) {
						common.$emit('close-load');
						let result = suc.data.biz_result.list;
						if(suc.data.code == '1c01') {
							_self.datas = result;
						} else {
							common.$emit('message', suc.data.msg);
						}
					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				}, 300)
			}
		},
		created() {
			let _self = this;
			_self.addsearch()
			common.$on('informIosType', function(item) {
				console.log(item)
				_self.mytype = item;
			})
			_self.mytype = common.pageParam.myType;
			if(window.localStorage.historyArrs) _self.historyArrs = window.localStorage.historyArrs.split('},');
			for(let i = 0; i < _self.historyArrs.length; i++) {
				_self.historyArrs[i] = JSON.parse(_self.historyArrs[i]);
			}
			common.$emit('show-load');
			httpService.hotSearch(common.urlCommon + common.apiUrl.most, {
				biz_module: 'searchKeywordService',
				biz_method: 'queryHotKeyword',
				biz_param: {
					pn: 1,
					pSize: 20
				}
			}, function(suc) {
				common.$emit('close-load');
				let result = suc.data.biz_result.list;
				if(suc.data.code == '1c01') {
					_self.todos = result;
				} else {
					common.$emit('message', suc.data.msg);
				}

			}, function(err) {
				common.$emit('close-load');
				common.$emit('message', err.data.msg);
			})

		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>
<style scoped>
	.release_search {
		background: #F1EFEF;
	}
	
	.release_search .search_div {
		height: 50px;
		position: fixed;
		background: #fff;
		border-bottom: 1px solid #ccc;
		top: 0;
		width: 100%;
		z-index: 2;
		background: #ff8201;
	}
	
	.release_search .ios_header {
		height: 65px;
		position: fixed;
		background: #fff;
		border-bottom: 1px solid #ccc;
		top: 0;
		width: 100%;
		z-index: 2;
		padding: 20px 0 5px 0;
		background: #ff8201;
	}
	
	.release_search .hot_box {
		margin-top: 10px;
	}
	
	.release_search .search_result {
		margin-top: 50px;
		background-color: #fff;
	}
	
	.release_search .ios_result {
		margin-top: 65px;
		background-color: #fff;
	}
	
	.release_search .search_result ul li {
		min-height: 40px;
		border-bottom: 1px solid #ccc;
		margin: 0 15px;
	}
	
	.release_search .ios_result ul li {
		min-height: 40px;
		border-bottom: 1px solid #ccc;
		margin: 0 15px;
	}
	
	.release_search .search_result ul li div {
		font-size: 1.3rem;
		line-height: 40px;
		text-align: left;
		float: left;
		color: #666;
	}
	
	.release_search .ios_result ul li div {
		font-size: 1.3rem;
		line-height: 40px;
		text-align: left;
		float: left;
		color: #666;
	}
	
	.release_search .search_result ul li div img {
		max-height: 20px;
		margin-top: 10px;
		float: left;
	}
	
	.release_search .ios_result ul li div img {
		max-height: 20px;
		margin-top: 10px;
		float: left;
	}
	
	.release_search .search_result ul li div p {
		float: left;
		margin-left: 15px;
	}
	
	.release_search .ios_result ul li div p {
		float: left;
		margin-left: 15px;
	}
	
	.release_search .search_div .search_content {
		background: #F1EFEF;
		height: 30px;
		margin: 10px 65px 5px 15px;
		border-radius: 10px;
	}
	
	.release_search .ios_header .search_content {
		background: #F1EFEF;
		height: 30px;
		margin: 5px 65px 5px 15px;
		border-radius: 10px;
	}
	
	.release_search .search_div .search_content input {
		background-color: #F1EFEF;
		height: 30px;
		position: absolute;
		left: 32px;
		border: none;
	}
	
	.release_search .ios_header .search_content input {
		background-color: #F1EFEF;
		height: 30px;
		position: absolute;
		left: 32px;
		border: none;
	}
	
	.release_search .search_div span {
		position: absolute;
		height: 30px;
		bottom: 8px;
		right: 15px;
		width: 40px;
		line-height: 30px;
		color: #333;
		font-size: 14px;
		font-weight: 400;
	}
	
	.release_search .ios_header span {
		position: absolute;
		height: 30px;
		bottom: 8px;
		right: 15px;
		width: 40px;
		line-height: 30px;
		color: #333;
		font-size: 14px;
		font-weight: 400;
	}
	
	.release_search .search_div .search_content img {
		float: right;
		max-height: 20px;
		margin: 5px 10px 0 0;
	}
	
	.release_search .ios_header .search_content img {
		float: right;
		max-height: 20px;
		margin: 5px 10px 0 0;
	}
	
	.release_search .history_search_content {
		margin-top: 40px;
		float: left;
		width: 100%;
		background: #fff;
		padding-bottom: 10px;
	}
	
	.release_search .hot_div {
		margin-top: 40px;
	}
	
	.release_search .history_search_content .history_search_content_result {
		margin: 15px;
	}
	
	.release_search .history_search_content .history_search_content_result .history_search_content_result_title {
		text-align: left;
		font-size: 1.6rem;
		color: #333;
		font-weight: 400;
	}
	
	.release_search .history_search_content .history_search_content_result .history_search_content_result_detail {
		float: left;
		width: 100%;
		padding: 10px;
	}
	
	.release_search .history_search_content .history_search_content_result .history_search_content_result_detail .clear_result {
		margin-top: 20px;
		float: left;
		width: 100%;
		text-align: right;
	}
	
	.release_search .history_search_content .history_search_content_result .history_search_content_result_detail .clear_result .click_district {
		float: right;
		padding: 5px;
	}
	
	.release_search .history_search_content .history_search_content_result .history_search_content_result_detail .clear_result img {
		max-height: 15px;
		margin-right: 8px;
	}
	
	.release_search .history_search_content .history_search_content_result .history_search_content_result_detail button {
		float: left;
		margin: 20px 10px 0 0;
	}
	.listsearch-box{
		padding-top: 60px;
		padding-bottom: 20px;
		background-color: #fff;
		text-align: left;
	}
	.listsearch{
		display: inline-block;
		padding:0 20px;
		margin: 5px  0.7692rem;
		line-height: 30px;
		border: 1px solid #eee;
	}
</style>