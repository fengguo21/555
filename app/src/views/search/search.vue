<style lang="less" scoped>
	.search {
		background: #f3f3f3;
		.search_div {
			height: 50px;
			position: fixed;
			background: #fff;
			border-bottom: 1px solid #ccc;
			top: 0;
			width: 100%;
			z-index: 2;
			background: #ff8201;
			.back {
				position: absolute;
				height: 30px;
				bottom: 8px;
				right: 15px;
				width: 55px;
				line-height: 30px;
				color: #fff;
				font-size: 14px;
				font-weight: 400;
			}
			.search_content {
				background: #fff;
				height: 30px;
				margin: 10px 75px 5px 15px;
				border-radius: 10px;
				input {
					background-color: #fff;
					height: 30px;
					position: absolute;
					width: 60%;
					left: 32px;
					border: none;
				}
				img {
					float: right;
					max-height: 20px;
					margin: 5px 10px 0 0;
				}
			}
		}
		.ios_header {
			height: 65px;
			position: fixed;
			background: #fff;
			border-bottom: 1px solid #ccc;
			top: 0;
			width: 100%;
			z-index: 2;
			padding: 20px 0 5px 0;
			background: #ff8201;
			span {
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
			.search_content {
				background: #F1EFEF;
				height: 30px;
				margin: 5px 75px 5px 15px;
				border-radius: 10px;
				input {
					background-color: #F1EFEF;
					height: 30px;
					position: absolute;
					left: 32px;
					border: none;
				}
				img {
					float: right;
					max-height: 20px;
					margin: 5px 10px 0 0;
				}
			}
		}
		.hot_box {
			margin-top: 10px;
		}
		.search_result {
			margin-top: 50px;
			background-color: #fff;
			ul li {
				min-height: 40px;
				border-bottom: 1px solid #ccc;
				margin: 0 15px;
				div {
					font-size: 1.3rem;
					line-height: 40px;
					text-align: left;
					float: left;
					color: #666;
					img {
						max-height: 20px;
						margin-top: 10px;
						float: left;
					}
					p {
						float: left;
						margin-left: 15px;
					}
				}
			}
		}
		.ios_result {
			margin-top: 65px;
			background-color: #fff;
			ul li {
				min-height: 40px;
				border-bottom: 1px solid #ccc;
				margin: 0 15px;
				div {
					font-size: 1.3rem;
					line-height: 40px;
					text-align: left;
					float: left;
					color: #666;
					img {
						max-height: 20px;
						margin-top: 10px;
						float: left;
					}
					p {
						float: left;
						margin-left: 15px;
					}
				}
			}
		}
		.content {
			float: left;
			width: 100%;
			&.hot_div {
				margin-top: 40px;
			}
			.result {
				margin: 15px 15px 0;
				.title {
					text-align: left;
					font-size: 14px;
					color: #989898;
					font-weight: 400;
				}
				.detail {
					background: #fff;
					display: flex;
					flex-wrap: wrap;
					width: 100%;
					margin: 10px 0 0;
					.button {
						color: #333;
						font-size: 15px;
						width: 33.3%;
						border: 1px solid rgba(230, 230, 230, .5);
						border-bottom: 0;
						border-right: 0;
						line-height: 35px;
						&.button_right {
							border-right: 1px solid rgba(230, 230, 230, .5);
						}
						&.button_bottom {
							border-bottom: 1px solid rgba(230, 230, 230, .5);
						}
					}
				}
				.history {
					ul {
						margin-top: 10px;
						background: #fff;
						line-height: 35px;
						li {
							padding: 0 10px;
							border-bottom: 1px solid rgba(230, 230, 230, .5);
							min-height: 35px;
							position: relative;
							&.last {
								border-bottom: 0;
							}
							.his {
								float: left;
								height: 1rem;
								margin-top: 0.9rem;
							}
							p {
								float: left;
								line-height: 35px;
								margin-left: 0.8rem;
								color: #333;
							}
							.arrow {
								position: absolute;
								height: 1rem;
								right: 10px;
								top: 1rem;
							}
						}
					}
					.clear_result {
						margin-top: 10px;
						width: 100%;
						.click_district {
							display: inline-block;
							padding: 5px 10px;
							border-radius: 40px;
							line-height: 25px;
							background-color: #eeeded;
							img {
								max-height: 13px;
								margin: -3px 8px 0 0;
								vertical-align: middle;
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="content search">
		<div v-bind:class="[mytype=='ios' ?  'ios_header' : 'search_div']">
			<div class="search_content">
				<input type="text" placeholder="请输入关键字" v-model="keyword">
				<img src="/static/images/search.png" class="search_image">
			</div>
			<span class="back" @click="back()">取消</span>
		</div>
		<div v-show="!keyword && !this.$route.query.type" class='hot_box'>
			<div class="content hot_div" v-if="searchStatus !== 'address'">
				<div class="result">
					<div class="title">
						热门搜索
					</div>
					<div class="detail">
						<span class="button" v-for="(item,index) in todos" :class="{'button_right':(index+1)%3 ==0 || index==19, 'button_bottom':index==17 ||index==18||index==19}" v-on:click="jumpRes(item)">{{item.keyWord}}</span>
					</div>
				</div>
			</div>

			<div class="content">
				<div class="result">
					<div class="title" v-show="historyArr.length>0">
						历史搜索
					</div>
					<div class="history" v-show="historyArr.length>0">
						<ul>
							<li v-if="item.keyWord" class="button" v-for="(item,index) in historyArr" :class="{'last':(index+1)==historyArr.length}" v-on:click="jumpRes(item)">
								<img class="his" src="/static/icon/list/his.png" />
								<p>{{item.keyWord}}</p>
								<img src="/static/images/right-arrow.png" class="arrow">
							</li>
							<li v-if="item.pinyin" class="button" v-for="(item,index) in historyArr" :class="{'last':(index+1)==historyArr.length}" v-on:click="jumpRes(item)">
								<img class="his" src="/static/icon/list/his.png" />
								<p>{{item.name}}</p>
								<img src="/static/images/right-arrow.png" class="arrow">
							</li>
						</ul>
						<div class="clear_result">
							<div class="click_district" @click="clearResult()"><img src="/static/icon/list/x.png"><span>清空历史搜索</span></div>
						</div>
					</div>
					<!--<div class="detail" v-show="historyArr.length==0">
						暂无记录
					</div>-->
				</div>
			</div>
		</div>
		<div v-show="keyword">
			<div v-bind:class="[mytype=='ios' ?  'ios_result' : 'search_result']">
				<ul class="page-loadmore-list">
					<li v-for="todo in datas" class="page-loadmore-listitem list_content_item" @click="jumpRes(todo)">
						<div>
							<img src="/static/icons/search.png">
							<p v-if="todo.breedName">{{todo.breedName}}<span v-if="searchType!='keyword'">({{todo.breedName}})</span></p>
							<p v-if="todo.pinyin">{{todo.name}}<span>({{todo.pinyin}})</span></p>

						</div>
					</li>
				</ul>
			</div>
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
				mytype: '',
				str: '',
				keyword: '',
				historyArr: [],
				todos: [],
				datas: [],
				customerId: '',
				searchStatus: '', //判断来自哪里的搜索
				searchType: common.searchType,
			}
		},
		methods: {
			back: function() {
				this.$router.go(-1);
			},
			clearResult: function() {
				this.historyArr = [];
			},
			jumpRes(item) {
				console.log(item);
				let _self = this;
				console.log(common.pageParam.router)
				switch(common.pageParam.router) {
					case 'lowPriceRes':
						common.$emit("setParam", 'lowPrice', item);
						common.$emit("lowPriceRes", item);
						break;
					case 'urgentNeed':
						common.$emit("setParam", 'Urgentneed', item);
						common.$emit("Urgentneed", item);
						break;
					case 'need':
						common.$emit("need", item);
						break;
					case 'resource':
						common.$emit("resource", item);
						break;
					case 'myAttention':
						common.$emit("setParam", 'myAttention', item);
						common.$emit("attention", item);
						break;
					case 'needRelease':
						common.$emit("Needrelease", item);
						break;
					case 'provenanceSelection':
						common.$emit("provenanceSelection", item);
						break;
					default:
						common.$emit("setParam", 'lowPrice', item);
						common.$emit("lowPriceRes", item);
						break;
				}

				let count = 1;

				for(let i = 0; i < _self.historyArr.length; i++) {
					if(_self.historyArr[i].id == item.id) {
						count = 0;
					}
				}
				if(count) _self.historyArr.unshift(item);
				let arr = [];
				for(let i = 0; i < _self.historyArr.length; i++) {
					arr[i] = JSON.stringify(_self.historyArr[i]);
				}
				window.localStorage.historyArr = arr.join('},');
				if(common.pageParam.router == 'index') {
					common.$emit("setParam", 'lowPrice', item);
					_self.$router.push('lowPriceRes');
				} else if(common.pageParam.router == 'drugResTable') {
					common.$emit("informdrugDetail", item.keyWord);
					_self.$router.push('/drugResTableDetail/' + common.pageParam.myType + '/' + item.keyWord);
				} else {
					window.history.go(-1);
				}
			},
			hotSearch() {
				let _self = this;
				_self.mytype = common.pageParam.myType;
				if(window.localStorage.historyArr) _self.historyArr = window.localStorage.historyArr.split('},');
				for(let i = 0; i < _self.historyArr.length; i++) {
					_self.historyArr[i] = JSON.parse(_self.historyArr[i]);
				}
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most
				let body = {
					biz_module: 'searchKeywordService',
					biz_method: 'queryHotKeyword',
					biz_param: {
						pn: 1,
						pSize: 9
					}
				}

				httpService.hotSearch(url, body, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result.list;
					if(suc.data.code == '1c01') {
						_self.todos = result;
					} else {
						//					common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			initData(){
				let _self = this;
				_self.datas=[];
				_self.keyword=[]
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
					if(_self.$route.query.type) {
						body.biz_module = 'breedService';
						body.biz_method = 'queryLocationByName';
						body.biz_param = {
							pn: 1,
							pSize: 20,
							name: _self.keyword,
							type:_self.$route.query.type-1,
						}
					}
					httpService.searchWord(common.urlCommon + common.apiUrl.most, body, function(suc) {
						common.$emit('close-load');
						let result = suc.data.biz_result.list;
						if(suc.data.code == '1c01') {
							_self.datas = result;
						} else {
							//							common.$emit('message', suc.data.msg);
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
			_self.hotSearch()
			common.$on('informIosType', function(item) {
				_self.mytype = item;
			})
			common.$on('addressSearch', function(item) {
				_self.initData()
			});
			common.$on('clearSearch', function() {
				_self.keyword = '';
			})

		}
	}
</script>