<style lang="less" scoped>
	.page-tabbar {
		overflow: hidden;
		height: 100vh;
		position: relative;
		.mint-tab-item-icon {
			height: 100px !important;
			.active {
				width: 46px;
				height: 46px;
				margin-top: 0px;
			}
			.smallAct {
				width: auto;
				height: 39px;
				margin-top: 5px;
			}
		}
		.mint-tabbar {
			box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
			z-index: 2;
		}
	}
	
	.page-wrap {
		/*overflow: auto;*/
		height: 100%; //padding-bottom: 60px;
	}
	
	.load_apps {
		width: 100%;
		position: absolute;
		bottom: 55px;
		z-index: 1;
	}
	
	.mint-tabbar>.mint-tab-item.is-selected {
		background-color: #F9F9F9;
		color: #FA6750;
	}
</style>
<template>
	<div class="page-tabbar">
		<div class="page-wrap" v-bind:class="{mine:selected=='mine'}">
			<mt-tab-container class="page-tabbar-container" v-model="selected">
				<mt-tab-container-item id="index">
					<index></index>
				</mt-tab-container-item>
				<mt-tab-container-item id="resource">
					<resource></resource>
				</mt-tab-container-item>
				<mt-tab-container-item id="purchase">
					<need></need>
				</mt-tab-container-item>
				<mt-tab-container-item id="mine">
					<mine :popshow="popshow"></mine>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<mt-tabbar v-model="selected">
			<mt-tab-item id="index">
				<img slot="icon" :class="{'active': listImg.type}" :src="listImg.list[0]" v-if="selected=='index'">
				<img slot="icon" :class="{'smallAct': listImg.type}" :src="listImg.list[1]" v-else> 首页
			</mt-tab-item>
			<mt-tab-item id="resource">
				<img slot="icon" :class="{'active': listImg.type}" :src="listImg.list[2]" v-if="selected=='resource'">
				<img slot="icon" :class="{'smallAct': listImg.type}" :src="listImg.list[3]" v-else> 资源
			</mt-tab-item>
			<mt-tab-item id="purchase">
				<img slot="icon" :class="{'active': listImg.type}" :src="listImg.list[4]" v-if="selected=='purchase'">
				<img slot="icon" :class="{'smallAct': listImg.type}" :src="listImg.list[5]" v-else> 求购
			</mt-tab-item>
			<mt-tab-item id="mine">
				<img slot="icon" :class="{'active': listImg.type}" :src="listImg.list[6]" v-if="selected=='mine'">
				<img slot="icon" :class="{'smallAct': listImg.type}" :src="listImg.list[7]" v-else> 我的
			</mt-tab-item>
		</mt-tabbar>

		<loadApp :loadApps="loadApps" class="load_apps" v-show="loadApps.show"></loadApp>
		<customPopUp :popshow="popshow" v-show="selected=='mine' && popshow.show"></customPopUp>
	</div>
</template>
<script>

	import queryString from 'query-string'
	import httpService from '../common/httpService.js'
	import index from '../components/index/index'
	import resource from '../components/index/resource'
	import need from '../components/index/need'
	import mine from '../components/index/mine'
	import common from '../common/common.js'
	import loadApp from '../components/user/loadApp.vue'
	import customPopUp from '../components/popUpType/customPopUp'
	import * as store  from '../common/localStore.js'
	export default {
		data() {
			return {
				selected: 'index',
				loadApps: {
					show: true
				},
				listImg: {
					list: [
						"/static/icon/index_selected.png",
						"/static/icon/index.png",
						"/static/icon/resource_selected.png",
						"/static/icon/resource.png",
						"/static/icon/buys_selected.png",
						"/static/icon/buys.png",
						"/static/icon/mine_selected.png",
						"/static/icon/mine.png"
					],
					type: 0,
				},
				popshow: {
					show: false,
					type: 1
				}
			}
		},
		components: {
			index,
			resource,
			need,
			mine,
			loadApp,
			customPopUp,
			mine
		},
		watch: {
			selected: function(newValue, oldValue) {
				let _self = this;
				switch(newValue) { //为了清除资源和求购原搜索
					case 'resource':
						common.$emit('clearResourceSearch', 1);
						_self.shareResource();
						break;
					case 'purchase':
						common.$emit('clearNeedSearch', 1)
						_self.shareNeed();
						break;
					case 'mine':
						common.$emit('clearorder', 1)
						break;
				}
			}
		},
		methods: {
			shareResource() {
				let shareData = common.shareParam;
				shareData.title = "【药材买卖网】 低价资源";
				shareData.desc = "药农资源、产地资源的聚集地，就算是冷备品，药材买卖网也一应俱全，而且全网比价哦！赶紧进入资源专区进行抢购";
				shareData.link = window.location.href;
				common.share(shareData);
				console.log(1, shareData.title)
			},
			shareNeed() {
				let shareData = common.shareParam;
				shareData.title = "【药材买卖网】 紧急求购";
				shareData.desc = "药厂、提取物厂、保健品厂的求购需求实在是太多了！快来药材买卖网的求购专区进行报价抢单！手慢则无哦！";
				shareData.link = window.location.href;
				common.share(shareData);
				console.log(2, shareData.title)
			},
			getHomeImg() {
				var _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'filesService',
					biz_method: 'showIconImage',
					biz_param: {
						fileType: 0
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.commonPost(url, body, function(suc) {
					if(suc.body.biz_result.list.length) {
						if(suc.body.biz_result.list[0].path.length == 8){
							_self.listImg.list = suc.body.biz_result.list[0].path;
						_self.listImg.type = suc.body.biz_result.list[0].type;
						}
					}
				}, function(err) {

				})
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
			  			  let origin = location
						  // window.localStorage.router = origin.href
			}
			},
			autoLogin(){
				let _self = this
				if(!store.get('SID')){
			const code = queryString.parse(location.search).code;
			if(code){
				if( code !=window.localStorage.lastCode){
			let body = {
					biz_module: 'userSignLoginService',
					biz_method: 'unionIdHTMLLogin',
					biz_param: {wcode:code}
				};
			body.time = Date.parse(new Date()) + parseInt(common.difTime);
			body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
			httpService.commonPost(common.urlCommon + common.apiUrl.most,body,
			function(res){
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
					} else {
						common.$emit('message', response.data.msg);
					}
					_self.delLocal()
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
				this.delLocal()
			}
			}
		}else{
			this.delLocal()	
			}
			}
		},
		created() {
			let self  = this
			self.autoLogin()
			

			// if(window.localStorage.unionId && window.localStorage.unionId) return
			// let self =this
			// let _self = this
			
			this.getHomeImg();
			//console.log(this.$route.query);
			//如果有this.$route.query.type，对应上四个切换
			if(this.$route.query.type) {
				_self.selected = this.$route.query.type;
			}

			common.$on('go_home', function(item) {
				_self.selected = 'index';
			})
			common.$on('selectRes', function(selected) {
				console.log(selected)
				_self.selected = selected;
			})
		}

	}
</script>