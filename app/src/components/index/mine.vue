<style lang="less" scoped>
	.mines {
		position: relative;
		background-color: #f3f3f3;
		overflow-x: hidden;
		.big_box {
			overflow-y: scroll;
		}
		@keyframes goups {
			0% {
				background-color: rgba(255, 117, 0, 0);
			}
			100% {
				background-color: rgba(255, 117, 0, 1);
			}
		}
		@keyframes godowns {
			0% {
				background-color: rgba(255, 117, 0, 1);
			}
			100% {
				background-color: rgba(255, 117, 0, 0);
			}
		}
		.search {
			position: fixed;
			z-index: 1;
			top: 0px;
			width: 100%;
			height: 3.6923rem;
			line-height: 3.6923rem;
			animation: goups 0.5s linear forwards;
			display: flex;
			flex-direction: row;
			.left {
				padding: 5px 0 0 ;
				width: 15%;
				img {
					width: 1.5384rem;
				}
				.left_word {
					color: #fff;
					font-size: 0.923rem;
				}
			}
			.center {
				width: 70%;
				.company-name {
					font-size: 1.3846rem;
					color: #fff;
					vertical-align: middle;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
			.right {
				padding: 5px 0 0 ;
				width: 15%;
				position: relative;
				img {
					vertival-align: middle;
					width: 1.5384rem;
				}
			}
		}
		.header_nav {
			background-color: rgba(255, 117, 0, 0);
			animation: godowns 0.5s linear forwards;
		}
	}
</style>
<template>
	<div class="mines" id="mine">
		<div class="search" v-bind:class="{header_nav:scrollTop<=90}">
			<div class="left" @click="fromIndex">
				<img src="/static/icon/new/setting.png">
			</div>
			<div class="center">
				<p class="company-name" v-if="param.company">{{param.company}}</p>
				<p class="company-name" v-if="!param.company">个人中心</p>
			</div>
			<div class="right" @click="call()">
				<img src="/static/icon/new/phone.png">
			</div>
		</div>
		<div class="big_box" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<accountOverview :param="param"></accountOverview>
			<myInformation :param="lendMoney" :popshow="popshow"></myInformation>
			<listMine :param="list[0]"></listMine>
			<listMine :param="list[1]"></listMine>
			<listMine :param="list[2]"></listMine>
			<listMine :param="list[3]"></listMine>
		</div>
		<customPopUp v-show="popshow.show" :popshow="popshow" :type="type" :number="number"></customPopUp>
		<boxPopDefault   v-show="lendMoney.show"  :popshow="lendMoney" ></boxPopDefault>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import accountOverview from '../../components/tools/accountOverview'
	import myInformation from '../../components/tools/myInformation'
	import listMine from '../../components/tools/listMine'
	import customPopUp from '../../components/popUpType/customPopUp'
	import boxPopDefault from '../../components/popUpType/boxPopDefault'
	import filters from '../../filters/filters'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				scrollTop: 0,
				seversPhone: '',
				popshow: {
					show: false,
					type: 1
				},
				lendMoney: {
					show: false,
					type: 4,
					img:'/static/icon/list/miao2.png',
					text1:'抱歉，您还未开通药贷宝',
					text2:'申请开通药贷宝',
					status:false,
				},
				list: [{
					title: '全部订单',
					contain: '查看全部订单',
					status: 1,
					entrance: [{
						name: '受理中',
						router: 'myOrder',
						img_src: '/static/icon/new/pending.png',
						total: ''
					}, {
						name: '待付款',
						router: '',
						img_src: '/static/images/Pending-payment.png',
						total: ''
					}, {
						name: '待发货',
						router: '',
						img_src: '/static/icons/out-goods.png',
						total: ''
					}, {
						name: '待收货',
						router: '',
						img_src: '/static/icons/receipt.png',
						total: ''
					}]
				}, {
					title: '我的求购',
					contain: '查看全部求购',
					status: 2,
					entrance: [{
						name: '未上架',
						router: 'myResource',
						img_src: '/static/icon/new/upper2.png'
					}, {
						name: '受理中',
						router: 'myNeeds',
						img_src: '/static/icon/new/accepting.png'
					}, {
						name: '审核未通过',
						img_src: '/static/icon/new/butongguo.png',
						router: 'myOffer'
					}, {
						name: '询价中',
						router: 'myAttention',
						img_src: '/static/icon/new/xunjiazhong.png'
					}, { //         
						name: '询价结束',
						img_src: '/static/icon/new/end.png',
						router: 'app'
					}]
				}, {
					title: '我的报价',
					contain: '查看全部报价',
					status: 3,
					entrance: [{
						name: '受理中',
						img_src: '/static/icon/new/shoulizhong.png',
						router: 'myResource'
					}, {
						name: '已采用',
						img_src: '/static/icon/new/yicaiyong.png',
						router: 'myNeeds'
					}, {
						name: '未采用',
						img_src: '/static/icon/new/weicaiyong.png',
						router: 'myOffer'
					}]
				}, {
					title: '我的资源',
					contain: '查看全部资源',
					status: 4,
					entrance: [{
						name: '未上架',
						router: 'myResource',
						img_src: '/static/icon/new/resourceweishangjia.png'
					}, {
						name: '上架受理中',
						router: 'myNeeds',
						img_src: '/static/icon/new/resourceshoulizhong.png'
					}, {
						name: '已上架',
						router: 'myAttention',
						img_src: '/static/icon/new/resourceshangjia.png'
					}, {
						name: '上架失败',
						img_src: '/static/icon/new/resourceshibai.png',
						router: 'myOffer'
					}, { //         
						name: '已下架',
						img_src: '/static/icon/new/resourcexiajia.png',
						router: 'app'
					}]
				}]
			}
		},
		components: {
			accountOverview,
			myInformation,
			listMine,
			customPopUp,
			boxPopDefault
		},
		computed: {
			logistics() {
				return this.$store.state.address.logistics;
			},
			param() {
				return this.$store.state.user.userInfor;
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		methods: {
			salesmanData() {
				let _self = this;
				common.$emit('show-load');
				let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
				let otherbody = {
					biz_module: 'userService',
					biz_method: 'queryEmployeeInfo',
					biz_param: {}
				};
				otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
				otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
				httpService.queryEmployeeInfo(otherurl, otherbody, function(suc) {
					common.$emit('close-load');
					if(suc.data.code = "1c01") {} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			fromIndex() {
				this.$router.push("/mySet");
			},
			call() {
				let _self = this;
				if(!common.KEY || !this.userInfor.phone) {
					function loadApp() {
						common.$emit('setParam', 'backRouter', '/home');
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
					_self.popshow.show = true;
					_self.$store.dispatch('getCustom')
				}
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
			getCustomerPhone() {
				let _self = this;
				this.$http.get(common.urlCommon + common.apiUrl.getDate).then((response) => {
					if(response.data.code == '1c01') {
						_self.seversPhone = response.data.biz_result.serviceMobile;
					}
				}, (err) => {});
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
		},
		watch: {
			'$route': 'getScrollTop',
			scrollTop: function(newValue, oldValue) {
				if(newValue > 90) {
					this.show = false;
				}
				if(newValue < 90) {
					this.show = true;
				}
			}
		},
		created() {
			let _self = this;
			if(!_self.seversPhone) this.getCustomerPhone();
			
		},
		mounted() {
			let _self = this;
			this.$refs.wrapper.addEventListener('scroll', this.handleScroll);
			_self.wrapperHeight = document.body.offsetHeight - _self.$refs.wrapper.getBoundingClientRect().top - 55;

		}
	}
</script>