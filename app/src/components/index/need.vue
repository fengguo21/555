<style lang="less" scoped>
	.need {
		overflow-y: scroll;
		position: relative;
		height: 100vh;
	}
	
	.need .fixed {
		width: 100%;
		z-index: 2;
		background: #fff;
		position: relative;
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
	
	.need .fixed .certification {
		position: relative;
		z-index: 2;
		.horn {
			width: 17px;
			height: 16px;
			position: absolute;
			left: 10px;
			top: 7px;
		}
		@media screen {
			.titles {
				font-size: 12px;
				color: #F64F00;
				text-align: left;
				line-height: 30px;
				margin-left: 33px;
			}
			@media (max-width: 320px) {
				.titles {
					font-size: 10px;
					color: #F64F00;
					text-align: left;
					line-height: 30px;
					margin-left: 33px;
				}
			}
		}
		.close {
			width: 14px;
			height: 14px;
			position: absolute;
			right: 10px;
			top: 8px;
		}
	}
	
	.need .go-back {
		position: absolute;
		width: 15%;
		padding-right: 5%;
		height: 50px;
		border-bottom: 1px solid #ccc;
		background: #ff8201;
	}
	
	@keyframes mymove {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.need {
		overflow: hidden;
		.newAdd {
			height: 20px;
			background-color: #E9F2FA;
			color: #3D7DB8;
			font-size: 13px;
			line-height: 20px;
			z-index: 300;
		}
		.emtry {
			position: static;
			height: 0px;
			background-color: #F7F7F7;
		}
		.change_opcaity {
			animation: mymove 1s;
		}
		.main {
			width: 100%;
			padding-bottom: 132px;
			overflow-y: scroll;
			position: relative;
			background-color: #f3f3f3;
			width: 100%;
		}
		.have_title {
			padding-bottom: 156px;
		}
		.nav {
			/*padding-top: 50px;*/
			height: 43px;
			border-bottom: 1px solid rgba(230, 230, 230, .5);
			.listBar {
				display: flex;
				li {
					flex: 1;
					line-height: 43px;
					&.active {
						color: #FF8201;
						border-bottom: 1px solid #FF8201;
						line-height: 42px;
					}
				}
			}
		}
		.nav_nor {
			margin-top: 0px;
		}
	}
	
	.black_shade {
		position: absolute;
		top: 0;
		z-index: 150;
		opacity: 0.6;
		background-color: #000;
		width: 100%;
		height: 100vh;
	}
</style>
<template>
	<div class="need">
		<div class="fixed">
			<div @click="jumpSearch" class="search_content">
				<longSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" :param="myShow"></longSearch>
			</div>
			<perfectTitle :param="Titles" v-if="myTypes"></perfectTitle>
			<div class="nav" v-bind:class="{nav_nor:Titles.myTitle && myTypes}">
				<!--<needNav :wrapperWidth="wrapperWidth" :personArr="personArr" @selectHttp="selectHttp"></needNav>-->
				<ul class="listBar">
					<li v-for="(item,index) in sortArray" v-if="index<5" :class="{'active': index == active}" @click="getType(item, index)">{{item.name}}</li>
				</ul>
			</div>
			<sort v-on:postId="getId" v-on:initial="initial" :sortRouter="sortRouter" :paramArr="sortArr" :addressSele='address_select'></sort>

		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0" v-bind:class="{have_title:myTypes}">
			<div class="newAdd" v-bind:class="{emtry:!newAdd,emtry_before:'change_opcaity'}">
				<!-- <span v-show="newAdd">今日新增{{newAdd}}条工厂求购信息</span> -->
				<span v-show="titleMessage && newAdd">{{titleMessage}}</span>
			</div>
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">

				<!--<div class="newAdd_p" v-show="titleMessage && newAdd"></div>-->
				<needList :todos='todos' v-on:jumpDetail='jumpDetail'></needList>
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
		<errPage :param="err" v-show="todos.length==0"></errPage>
		<authenPopUp :param="Titles"></authenPopUp>
		<div class="black_shade" v-show="Titles.selectType" @click="cancelTitle">
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import longSearch from '../../components/tools/longSearch'
	import sort from '../../components/tools/sort'
	import errPage from '../../components/tools/err'
	import needList from '../../views/myNeed/needList'
	import perfectTitle from '../../components/popUpType/perfectTitle'
	import authenPopUp from '../../components/popUpType/authenPopUp'
	import needNav from '../../components/user/needNav'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				sortArray: [],
				Titles: { //
					myTitle: true,
					selectType: false
				},
				address_select: true,
				newAdd: '',
				titleMessage: '',
				scrollTop: 0,
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png',
				},
				myShow: {
					myShow: false,
					myMessage: true,
				},
				sortRouter: 'need',
				wrapperWidth: 0,
				personArr: [],
				sortArr: [{
					name: '报价人数',
					asc: 'top',
					url: '/static/icons/drop_down.png',
					saveName: '报价人数',
					class: 'sort_content_detail',
					sortArr: [{
						name: '默认',
						asc: '',
						show: false,
						offer: 0,
						key: 'offer'
					}, {
						name: '由少到多',
						asc: 'top',
						show: false,
						offer: 1,
						key: 'offer'
					}, {
						name: '由多到少',
						asc: 'low',
						show: false,
						offer: 2,
						key: 'offer'
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
						duedate: 0,
						key: 'duedate'
					}, {
						name: '由短到长',
						asc: 'top',
						show: false,
						duedate: 1,
						key: 'duedate'
					}, {
						name: '由长到短',
						asc: 'low',
						show: false,
						duedate: 2,
						key: 'duedate'
					}]
				}, {
					name: '交货地',
					asc: 'location',
					url: '/static/icons/screen.png',
					class: 'sort_content_detail',
				}],
				todos: [],
				active: 0,
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					time: 0,
					offer: 0,
					duedate: 0,
					location: [],
					keyword: '',
					indentType: -1,
					page: 1,
					pageSize: 10
				},

			}
		},
		components: {
			longSearch,
			sort,
			errPage,
			needList,
			perfectTitle,
			authenPopUp,
			needNav
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			},
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
					this.allLoaded = false;
					common.$emit('show-load');
				}
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionService',
					biz_method: 'queryBegBuyList',
					biz_param: {
						keyWord: _self.httpPraram.keyword, //搜索关键词
						sort: {
							"shelve_time": _self.httpPraram.time, //剩余时间
							"offer": _self.httpPraram.offer, //报价人数
							"duedate": _self.httpPraram.duedate //截至日期
						},
						province: _self.httpPraram.location, //交货地
						indentType: _self.httpPraram.indentType, // 求购放类型
						pn: _self.httpPraram.page, //页数
						pSize: _self.httpPraram.pageSize // 页请求数
					}
				}
				if(common.KEY) {
					url = common.addSID(common.urlCommon + common.apiUrl.most);
					body.version = 1;
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				}
				httpService.myAttention(url, body, function(suc) {
					common.$emit('close-load');
					if(_self.httpPraram.page == 1) {
						_self.todos.splice(0, _self.todos.length);
					}
					let result = suc.data.biz_result.list;
					_self.newAdd = suc.data.biz_result.newAdd;
					_self.titleMessage = suc.data.biz_result.titleMessage;
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
			getBuyType(index) {
				let _self = this;
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionService',
					biz_method: 'queryAllFactoryTypeInfo',
					biz_param: {

					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.myAttention(url, body, function(suc) {
					if(suc.data.code == '1c01') {
						let result = suc.data.biz_result.list[index].array;
						_self.sortArray = suc.data.biz_result.list;
						for(var i = 0; i < result.length; i++) {
							result[i].show = false;
							result[i].name = result[i].indentName
							result[0].show = true;
						}
						_self.personArr = result;
						_self.wrapperWidth = 75 * (_self.personArr.length);
					} else {

					}

					common.$emit('close-load');
				}, function(err) {
					common.$emit('close-load');
				})
			},
			getType(item, index) {
				let _self = this;
				_self.active = index;
				_self.httpPraram.indentType = item.id;
				_self.getHttp();
			},
			getId(param) {
				let _self = this;
				_self.httpPraram.page = 1;
				_self.httpPraram[param.key] = param[param.key];
				_self.getHttp();

			},
			selectHttp(todo) {
				console.log(99878, todo);
				let _self = this;
				_self.httpPraram.indentType = todo.indentType;
				_self.getHttp();
			},
			initial(param) {
				let _self = this;
				if(!param) {
					_self.httpPraram.time = 0;
					_self.httpPraram.offer = 0;
					_self.httpPraram.duedate = 0;
					_self.httpPraram.keyword = '';
					_self.httpPraram.location = [];
					_self.httpPraram.indentType = -1;
					_self.httpPraram.page = 1;
					for(var i = 1; i < _self.sortArr.length; i++) {
						if(i < 3) {
							_self.sortArr[i].name = _self.sortArr[i].saveName;
							_self.sortArr[i].url = '/static/icons/drop_down.png';
							_self.sortArr[i].class = 'sort_content_detail';
						}
						if(i == 3) {
							_self.sortArr[3].name = '交货地';
							_self.sortArr[3].class = "sort_content_detail";
							_self.sortArr[3].url = "/static/icons/screen.png";
							common.$emit('initial', 1)
						}
					}
					_self.getHttp();
				}
			},
			clearKeyword() {
				let _self = this;
				this.httpPraram.page = 1;
				this.httpPraram.keyword = '';
				this.getHttp();
			},
			jumpSearch() {
				common.searchType = 'keyword';
				common.$emit('setParam', 'router', 'need')
				this.$router.push('search');
			},
			jumpDetail(id) {
				common.$emit('needToDetails', {
					id: id,
					type: ''
				});
				this.$router.push('/needDetails/' + id);
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
			},
			cancelTitle() {
				let _self = this;
				_self.Titles.selectType = false;
			}
		},
		watch: {
			'$route': 'getScrollTop',
			scrollTop: function(val, oldVal) {
				if(val > 50) {
					this.newAdd = '';
				} else {

				}
			}
		},
		created() {
			let _self = this;
			_self.httpPraram.page = 1;
			_self.getBuyType(0);
			_self.getHttp();
			common.$on('need', function(item) {
				console.log(item);
				_self.httpPraram.keyword = item.keyWord;
				_self.httpPraram.page = 1;
				_self.getHttp();
			});
			common.$on('clearNeedSearch', function(item) {
				_self.httpPraram.page = 1;
				_self.httpPraram.keyword = '';
				// _self.getBuyType(0);
				_self.getHttp();
			})
			common.$on('need-sort', function(item) {
				_self.httpPraram.location = item.idArr;
				let name = item.areaArr;
				if(name.length>0){
					name = name[0]
				}else{
					name = ""
				}
				_self.sortArr[_self.sortArr.length - 1].name = name.length>3?name.slice(0,3)+'...':name;
				_self.sortArr[_self.sortArr.length - 1].class = "sort_content_detail_select";
				_self.sortArr[_self.sortArr.length - 1].url = "/static/icons/screen_selected.png";
				if(item.length > 1) {
					_self.sortArr[_self.sortArr.length - 1].name += '...';
				} else if(!_self.sortArr[_self.sortArr.length - 1].name) {
					_self.sortArr[_self.sortArr.length - 1].name = '交货地';
					_self.sortArr[_self.sortArr.length - 1].class = "sort_content_detail";
					_self.sortArr[_self.sortArr.length - 1].url = "/static/icons/screen.png";
				}
				_self.httpPraram.page = 1;
				_self.getHttp();
			});
			common.$on('getInfo', function(item) {
				_self.getBuyType(0);
				_self.getHttp();
			})
		},
		mounted() {
			let _self = this;
			this.wrapperHeight = document.body.offsetHeight - this.$refs.wrapper.getBoundingClientRect().top - 55;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}
	}
</script>