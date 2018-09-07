<style lang="less" scoped>
	.urgent_need .fixed {
		position: fixed;
		width: 100%;
		z-index: 2000;
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
	
	@keyframes mymove {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	.urgent_need {
		overflow: hidden;
		height: 100vh;
		/*.fixed .search_content {
			float: left;
			width: 100%;
			background: #ff8201;
		}*/
		.newAdd {
			position: absolute;
			width: 100%;
			top: 50px;
			height: 20px;
			background-color: #E9F2FA;
			color: #3D7DB8;
			font-size: 13px;
			line-height: 20px;
			z-index: 300;
		}
		.emtry {
			position: static;
			height: 10px;
			background-color: #F7F7F7;
		}
		.change_opcaity {
			animation: mymove 1s;
		}
		.main {
			width: 100%;
			padding-bottom: 122px;
			overflow-y: scroll;
			width: 100%;
			.newAdd_p {
				height: 20px;
				width: 100%;
				background-color: #F7F7F7;
			}
		}
		.have_title {
			padding-bottom: 152px;
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
			padding-top: 0px;
		}
	}
	
	.black_shade {
		position: absolute;
		top: 0;
		z-index: 2000;
		opacity: 0.6;
		background-color: #000;
		width: 100%;
		height: 100vh;
	}
</style>
<template>
	<div class="urgent_need">
		<div class="fixed">
			<div @click="jumpSearch" class="search_content">
				<longSearch :keyword="httpPraram.keyword" v-on:clearSearch="clearKeyword" :param="myShow"></longSearch>
			</div>
			<perfectTitle :param="Titles" v-if="myTypes"></perfectTitle>
			<div class="nav" v-bind:class="{nav_nor:Titles.myTitle && myTypes}">
				<ul class="listBar">
					<li v-for="(item,index) in sortArray" v-if="index<5" :class="{'active': index == active}" @click="getType(item, index)">{{item.name}}</li>
				</ul>
			</div>
			<sort v-on:postId="getId" v-on:initial="initial" :sortRouter="sortRouter" :paramArr="sortArr" :addressSele='address_select'></sort>
			<!--<div class="nav" v-bind:class="{nav_nor:Titles.myTitle && myTypes}">
				<needNav :wrapperWidth="wrapperWidth" :personArr="personArr" @selectHttp="selectHttp"></needNav>
			</div>-->
		</div>
		<div class="main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-show="todos.length!=0" v-bind:class="{have_title:myTypes}">
			<div class="newAdd" v-bind:class="{emtry:!newAdd,emtry_before:'change_opcaity'}" v-show="titleMessage">
				<span v-show="titleMessage && newAdd">{{titleMessage}}</span>
			</div>
			<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">

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
	import queryString from 'query-string'
	import common from '../../common/common.js'
	import headFix from '../../components/header/head'
	import longSearch from '../../components/tools/longSearch'
	import sort from '../../components/tools/sort'
	import httpService from '../../common/httpService.js'
	import errPage from '../../components/tools/err'
	import perfectTitle from '../../components/popUpType/perfectTitle'
	import authenPopUp from '../../components/popUpType/authenPopUp'
	import needNav from '../../components/user/needNav'
	import filters from '../../filters/filters'
	import needList from './needList'
	import * as store  from '../../common/localStore.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				sortArray: [],
				Titles: {
					myTitle: true,
					selectType: false
				},
				myShow: {
					myShow: false,
					mycart: false,
					resource: true,
					myMessage: true,
					back: true,
					goBack: false
				},
				address_select: true,
				scrollTop: 0,
				newAdd: '',
				titleMessage: '',
				err: {
					err: "很抱歉，没有找到相关资源",
					url: '/static/icons/maomao.png',
				},
				sortRouter: 'urgentNeed',
				wrapperWidth: 0,
				personArr: [],
				sortArr: [ {
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
						asc: 'low',
						show: false,
						offer: 1,
						key: 'offer'
					}, {
						name: '由多到少',
						asc: 'top',
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
						asc: 'low',
						show: false,
						duedate: 1,
						key: 'duedate'
					}, {
						name: '由长到短',
						asc: 'top',
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
				keyword: '',
				topStatus: '',
				wrapperHeight: 0,
				allLoaded: false,
				bottomStatus: '',
				httpPraram: {
					time: 0,
					offer: 0,
					duedate: 0,
					location: [],
					indentType: -1,
					keyword: '',
					page: 1,
					pageSize: 10,
					keyWordList: [],

				},
				headParam: {
					title: '紧急求购',
					keyword: '',
					router: 'urgentNeed'
				}
			}
		},
		components: {
			headFix,
			sort,
			errPage,
			perfectTitle,
			authenPopUp,
			longSearch,
			needNav,
			needList
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
				if(this.httpPraram.page == 1) {
					this.allLoaded = false;
					common.$emit('show-load');
				}
				let _self = this;
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionService',
					biz_method: 'queryBegBuyList',
					biz_param: {
						keyWord: _self.httpPraram.keyword,
						keyWordList: _self.httpPraram.keyWordList,
						sort: {
							"shelve_time": _self.httpPraram.time,
							"offer": _self.httpPraram.offer,
							"duedate": _self.httpPraram.duedate
						},
						province: _self.httpPraram.location,
						indentType: _self.httpPraram.indentType,
						pn: _self.httpPraram.page,
						pSize: _self.httpPraram.pageSize
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
					let result = suc.data.biz_result.list[index].array;
					_self.sortArray = suc.data.biz_result.list;
					for(var i = 0; i < result.length; i++) {
						result[i].show = false;
						result[i].name = result[i].indentName
						result[0].show = true;
					}
					_self.personArr = result;
					_self.wrapperWidth = 75 * (_self.personArr.length);
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
			jumpSearch() {
				common.searchType = 'keyword';
				common.$emit('setParam', 'router', 'urgentNeed')
				this.$router.push('search');
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
							_self.sortArr[3].name = '产地';
							_self.sortArr[3].class = "sort_content_detail";
							_self.sortArr[3].url = "/static/icons/screen.png";
							common.$emit('initial', 1)
						}
					}
					_self.getHttp();
				}
			},
			indentType(num) {
				let _self = this;
				this.httpPraram.page = 1;
				_self.httpPraram.indentType = num;
				_self.getHttp();
			},
			clearKeyword() {
				let _self = this;
				this.httpPraram.page = 1;
				this.httpPraram.keyword = '';
				_self.httpPraram.keyWordList = [];
				this.getHttp();
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
			jump(router) {
				this.$router.push(router);
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
			},
			funcUrlDel(name){
				console.log('name','=============')
			    var loca = window.location;
			    var baseUrl = loca.origin + loca.pathname + "?";
			    var query = loca.search.substr(1);
			    if (query.indexOf(name)>-1) {
			        var obj = {}
			        var arr = query.split("&");
			        for (var i = 0; i < arr.length; i++) {
			            arr[i] = arr[i].split("=");
			            obj[arr[i][0]] = arr[i][1];
			        };
			        delete obj[name];
			        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
			        console.log(url)
			        return url
			    };
			},
			delLocal(){
				const reLocal = window.location.href;
					console.log(reLocal,'reLocal===')
			  			const reLocalArr = reLocal.split('?');
			  			console.log(reLocalArr.length);
			  			if (reLocalArr.length >= 2 && reLocalArr[1].match(/#/g)) {
			  			  const hashRoute = reLocalArr[1].split('#')[1];
			  			  const queryRoute = reLocalArr[2] ? `?${reLocalArr[2]}` : '';
			  			  console.log('new href========', `${reLocalArr[0]}#${hashRoute}${queryRoute}`);
			  			  window.location.replace(`${reLocalArr[0]}#${hashRoute}${queryRoute}`);
			  			}
			  			 
			},
			autoLogin(){
				let self =this
				let _self = this
				if(!store.get('SID')){

			const code = queryString.parse(location.search).code;
			if(code ){
				if(code != window.localStorage.lastCode){
					console.log(code,'code')
			let body = {
					biz_module: 'userSignLoginService',
					biz_method: 'unionIdHTMLLogin',
					biz_param: {wcode:code}
				};
			body.time = Date.parse(new Date()) + parseInt(common.difTime);
			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
			httpService.commonPost(common.urlCommon + common.apiUrl.most,body,
			function(res){
				console.log(res,'=====')
				window.localStorage.lastCode = code
				console.log(res.body.biz_result.token)
				if(res.body.biz_result.token){
					httpService.commonPost(common.urlCommon + common.apiUrl.token_login,{
						biz_param: {
						token:res.body.biz_result.token
					}
					},function(response){
						common.$emit('close-load');
					if(response.data.code == '1c01') {
						window.localStorage.KEY = response.data.biz_result.KEY;
						window.localStorage.SID = response.data.biz_result.SID;
						common.KEY = window.localStorage.KEY;
						common.SID = window.localStorage.SID;
						_self.$store.dispatch('getUserInfor');
						common.$emit('getInfo', 1);
						common.$emit('toMine');
						common.$emit('getLocation');

						
					} else if(!res.body.biz_result.token) {
						common.$emit('message', response.data.msg);
					}
					self.delLocal()
					},function(err){

					})
				}
				else{
					console.log(res)
					if(res.body.biz_result.unionDateId){
						window.localStorage.unionId = res.body.biz_result.unionDateId
					}
					_self.$router.push('bindphone')
				}
			},
			function(err){

			})
				}
				else{
					self.delLocal()
				}
				
			}

		}else{
			self.delLocal()
			}
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
			this.autoLogin()
			
			let _self = this;
			let type = _self.$route.query.value;
			if(type == 'web') {
				_self.myShow.goBack = true;
			} else {
				_self.myShow.goBack = false;
			}
			let arr = '';
			let keyString = '';
			if(this.$route.query.type && common.pageParam.majorBusiness == 'urgent') {
				arr = this.$route.query.type;
				arr = arr.split(',');
				_self.httpPraram.keyWordList = arr;
				for(var i = 0; i < arr.length; i++) {
					if(i == 0) keyString = arr[0];
					if(i == 1) keyString = keyString + ',' + arr[1];
					if(i >= 2) keyString = keyString + '...';
				}
				_self.httpPraram.keyword = keyString;
				common.pageParam.majorBusiness == '';
			}
			_self.headParam.keyword = common.pageParam.Urgentneed;
			_self.getBuyType(0);
			_self.getHttp();

			if(common.KEY) _self.$store.dispatch('getUserInfor');
			common.$on('Urgentneed', function(item) {
				_self.headParam.keyword = item.keyWord;
				_self.httpPraram.keyword = item.keyWord;
				if(item.listShow) {
					_self.httpPraram.keyWordList = item.keyWordList;
					_self.httpPraram.keyword = item.keyWordString;
				}
				_self.httpPraram.page = 1;
				_self.getHttp();
			});
			common.$on('clearThisSearch', function(item) {
				_self.httpPraram.page = 1;
				_self.headParam.keyword = '';
				_self.httpPraram.keyword = '';
				_self.httpPraram.keyWordList = [];
				if(common.KEY) _self.$store.dispatch('getUserInfor');
				_self.getHttp();
			})
			common.$on('urgentNeed-sort', function(item) {
				_self.httpPraram.location = item.idArr;
				_self.sortArr[_self.sortArr.length - 1].name = item.areaArr[0];
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
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
		}
	}
</script>