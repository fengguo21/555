<style lang="less" scoped>
	.need_details {
		background-color: #f3f3f3;
		min-height: 100vh;
		position: relative;
		@media screen {
			.main {
				padding-bottom: 70px;
			}
			/*@media (max-height: 480px) {
				.main {
					padding-bottom: 140px;
				}
			}*/
		}
		.onscroll {
			overflow-y: scroll;
		}
		.static {
			width: 100%;
			height: 67px;
			overflow: hidden;
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			.static_word {
				font-size: 16px;
				color: #EB8545;
				text-align: left;
				padding: 25px;
				z-index: 3000;
			}
		}
		.examine {
			background: #fff url('/static/icon/examine.png') no-repeat;
			background-size: 100% 100%;
		}
		.no_pass {
			background: #fff url('/static/icon/un-pass.png') no-repeat;
			background-size: 100% 100%;
		}
		.over {
			background: #fff url('/static/icon/askover.png') no-repeat;
			background-size: 100% 100%;
		}
		.ask {
			background: #fff url('/static/icon/ask.png') no-repeat;
			background-size: 100% 100%;
		}
		.top {
			background-color: #fff;
			margin: 10px;
			border-radius: 6px;
			box-shadow: 0 1px 0 1px rgba(35, 20, 17, .13);
			.box {
				background-color: #fff;
				height: 48px;
				padding: 0 15px 0 0;
				line-height: 48px;
				display: flex;
				border-bottom: 1px solid #e6e6e6;
				border-radius: 15px 15px 0 0;
				flex-direction: row;
				img {
					height: 20px;
					margin-top: 14px;
				}
				.title {
					font-size: 16px;
					color: #FF8201;
					padding-left: 5px;
				}
				.word {
					color: #999999;
					font-size: 10px;
				}
				.offer_num {
					background: url(../../../static/icon/list/listbac.png) no-repeat;
					background-size: 100% 31px;
					margin: 10px -8px 0 0;
					height: 31px;
					font-size: 12px;
					line-height: 28px;
					color: #fff;
					padding: 0 5px;
					.person {
						vertical-align: top;
						margin: 7px 5px 0 5px;
						width: 20px;
						height: 14px;
					}
				}
			}
			.infor_box {
				padding-left: 15px;
				.infor {
					padding: 0 15px 0 0;
					border-bottom: 1px solid #e6e6e6;
					line-height: 45px;
					display: flex;
					flex-direction: row;
					text-align: left;
					color: #333333;
					.name {
						width: 80px;
						font-size: 15px;
					}
					.content {
						flex: 1;
						font-size: 13px;
					}
				}
				.infor_nor {
					border-bottom: none;
					position: relative;
					&.margin10 {
						padding: 20px;
					}
					.lastday {
						margin-top: 10px;
						background-color: #FF8201;
						position: absolute;
						right: 10px;
						bottom: 10px;
						/*width: 116px;*/
						height: 35px;
						line-height: 35px;
						border-radius: 50px;
						padding: 0 10px;
						border: 0;
						color: #fff;
						img {
							width: 16px;
							height: 16px;
							vertical-align: middle;
							margin-right: 5px;
						}
					}
				}
				.infor_img {
					padding: 0 15px 0 0;
					border-bottom: 1px solid #e6e6e6;
					line-height: 45px;
					text-align: left;
					color: #333333;
					.boxList {
						margin-bottom: 10px;
						
						

						.imgBox {
							float:left;
							// width: 30%;
							// height: 80px;
							// position: relative;
							
							
							// border: 1px solid #000;
							img {
								// position: absolute;
								// top: 50%;
								// transform: translateY(-50%);
								width: 70px;
								margin-right: 10px;
								height: 70px;
							}
						}
					}
				}
			}
			.breed_infor {
				height: 45px;
				margin: 0 0 0 15px;
				border-bottom: 1px solid #e6e6e6;
				display: flex;
				flex-direction: row;
				align-items: center;
				.yaochang {
					height: 16px;
					margin-right: 2px;
				}
				.left {
					font-size: 18px;
					span {
						font-size: 15px;
						color: #FF8201;
						margin-left: 10px;
					}
				}
				.emtry {
					flex: 1;
				}
				.right {
					font-size: 14px;
					display: flex;
					flex-direction: row;
					img {
						height: 15px;
					}
					span {
						color: #ff8201;
						font-size: 15px;
					}
				}
			}
		}
		.mascot {
			position: absolute;
			bottom: 47px;
			padding: 0 0 0 10px;
			display: flex;
			flex-direction: row;
			.cat {
				height: 100px;
			}
			.circle_box {
				padding-top: 20px;
				margin-left: 5px;
				position: relative;
				.circle {
					width: 225px;
				}
				.cancel {
					width: 24px;
					position: absolute;
					right: -8px;
					top: 10px;
				}
				.my_title {
					position: absolute;
					top: 30px;
					padding: 0 8px;
					line-height: 20px;
					z-index: 20;
					text-align: left;
					font-size: 14px;
					text-indent: 1em;
					span {
						font-size: 17px;
						color: #FF0000;
					}
				}
			}
		}
		.share {
			position: absolute;
			z-index: 20;
			bottom: 0;
			height: 50px;
			width: 100%;
			display: flex;
			flex-direction: row;
			color: #fff;
			line-height: 50px;
			font-size: 17px;
			.offer_it {
				flex: 1;
				background-color: #ff8201;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				img {
					height: 20px;
					margin-right: 3px;
				}
			}
			.report {
				background-color: #B5B5B5;
			}
			.send_friend {
				flex: 1;
				background-color: #FFAE00;
			}
			.send_nor {
				width: 75px;
				background-color: #FFF;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 5px;
				img {
					height: 25px;
				}
				div {
					font-size: 12px;
					line-height: 20px;
					color: #666666;
				}
			}
		}
		.black {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.8);
			position: absolute;
			z-index: 30;
		}
		.point {
			position: absolute;
			right: 10px;
			top: 10px;
			width: 49px;
			z-index: 31;
		}
		// .opinion {
		// 	position: absolute;
		// 	z-index: 31;
		// 	margin-left: -127px;
		// 	left: 50%;
		// 	margin-top: 30%;
		// }
		// @media (max-height: 480px) {
		// 	.opinion {
		// 		position: absolute;
		// 		z-index: 31;
		// 		margin-left: -127px;
		// 		left: 50%;
		// 		margin-top: 15%;
		// 	}
		// }
	}
</style>
<template>
	<div class="need_details">
		<!------------------------------ 发送朋友圈提示 ------------------------------------------------->
		<shareTips :popshow='boxInfo' v-show="boxInfo.show"></shareTips>
		<!------------------------------------- 不报价理由 ------------------------------------------------------>
		<opinion :arr="arr" v-on:cancel="cancel" v-on:selectIt="selectIt" v-show="opinion"></opinion>
		<!-------------------------------------------头部-------------------------------------------->
		<myHeader :param="param" :obj="obj" :overdue="isit_overdue"></myHeader>
		<div :style="{ height: wrapperHeight + 'px' }" ref="wrapper" v-bind:class="{'onscroll':!show || !opinion,'main':obj.isMy!==1}">
			<div class="static examine" v-if="obj.onSell == 1 && obj.isMy==1">
				<div class="static_word">
					受理中
				</div>
			</div>
			<div class="static no_pass" v-if="obj.onSell == -2 && obj.isMy==1">
				<div class="static_word">
					审核未通过
				</div>
			</div>
			<div class="static over" v-if="obj.onSell == 4 && obj.isMy==1">
				<div class="static_word">
					询价结束
				</div>
			</div>
			<div class="static ask" v-if="obj.onSell == 2 && obj.isMy==1">
				<div class="static_word">
					询价中
				</div>
			</div>
			
			<div class="top">
				<titles :obj="obj" tab="8"></titles>
				<div class="breed_infor">
					<img src="/static/icon/urgent-radius.png" alt="" class="yaochang" v-show="obj.especial==1">
					
					<div class="left">
						{{obj.breedName}}
						<span>
                           ({{obj.number}}{{obj.unit}})
                        </span>
					</div>
					<div class="emtry">
					</div>
				</div>
				<div class="infor_box">
					<div class="infor">
						<div class="name">
							规格
						</div>
						<div class="content">
							{{obj.spec}}
						</div>
					</div>
				</div>
				<div class="infor_box">
					<div class="infor">
						<div class="name">
							产地
						</div>
						<div class="content">
							{{obj.location}}
						</div>
					</div>
				</div>
				<div class="infor_box">
					<div class="infor infor_nor">
						<div class="name">
							质量要求
						</div>
						<div class="content">
							{{obj.quality}}
						</div>
					</div>
				</div>
				<div class="infor_box">
					<div class="infor infor_nor margin10">
						<button class="lastday"><img src="/static/icon/list/timer.png" />{{obj.overTime}}</button>
					</div>
				</div>
			</div>

			
			<div class="top sxh-border_radius">
				<titles tab="11"></titles>
				<div class="infor_box">
					<div class="infor">
						<div class="name">交货地址</div>
						<div class="content" v-show="obj.address">{{obj.address}}</div>
						<div class="content" v-show="!obj.address">面议</div>
					</div>
				</div>
				<div class="infor_box">
					<div class="infor">
						<div class="name">有效日期</div>
						<div class="content" v-show="obj.description">{{obj.duedate}}截止</div>
						<div class="content" v-show="!obj.description"></div>
					</div>
				</div>
				<div class="infor_box">
					<div class="infor infor_nor">
						<div class="name">备注信息</div>
						<div class="content" v-show="obj.description">{{obj.description}}</div>
						<div class="content" v-show="!obj.description"></div>
					</div>
				</div>
			</div>
			<div class="top sxh-border_radius">
				<div class="infor_box">
					<div class="infor_img">
						<div class="name">参考图片</div>
						<div class="content" v-show="!judgImage">暂无</div>
						<div class="content" v-show="judgImage">
							<div class="boxList">
								<div v-for="(item,index) in obj.image" >
								<div class="imgBox">
									<img :src="item" alt=""  @click='preview(obj,item)'/>
								</div>
							</div>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="mascot" v-show="mascot && isit_overdue == false">
			<img alt="" class="cat" src="/static/icon/mascot.png">
			<div class="circle_box">
				<img alt="" class="circle" src="/static/icon/circle.png" />
				<img src="/static/icons/upload-delete.png" alt="" class="cancel" @click="cancelMascot">
				<div class="my_title">
					本条求购已有
					<span>
                        {{obj.offer}}
                    </span> 人报价预计很快成交, 不报价会后悔哟
				</div>
			</div>
		</div>
		<div class="share" v-show="obj.isMy !== 1 && isit_overdue == false">
			<div @click="sendNor()" class="send_nor">
				<img src="/static/icon/list/cry.png">
				<div>
					暂不参加
				</div>
				</img>
			</div>
			<div class="offer_it send_friend">
				<img src="/static/icon/offer-price.png">
				<div @click="jump(obj)" v-if="obj.especial == 0 && obj.isOffer == 0">
					抢先报价
				</div>
				<div @click="jump(obj)" v-if="obj.especial == 1 && obj.isOffer == 0">
					抢先报价
				</div>
				<div v-if="obj.isOffer == 1" @click="jumpDetail(obj)">
					查看报价
				</div>
			</div>
			<div @click="sendFriend()" class="offer_it">
				<img src="/static/icon/send-friend.png" />
				<div>
					发给朋友
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import wx from 'weixin-js-sdk'
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import shareTips from './shareTips'
	import titles from '../../components/release/title'
	import opinion from '../../components/popUpType/opinion'
	import filters from '../../filters/filters'
	import * as store  from '../../common/localStore.js'
	export default {
		data() {
			return {
				boxInfo: { //默认的弹窗样式
					show: false,
					type: 3,
					img: '/static/icon/list/miao1.png',
					text: '确定发布求购？'
				},
				obj: '',
				judgImage: false, //判断是不是有图片
				mascot: false,
				param: {
					name: '求购详情',
					topissue: true,
					goBack: false,
				},
				id: '',
				wrapperHeight: '',
				show: false,
				opinion: false,
				arr: {
					title: '请选择您不参加的理由',
					list: [{
						title: '不做这个品种了'
					}, {
						title: '暂时没货/货量不足',
					}, {
						title: '规格不满足'
					}, {
						title: '时间来不及'
					}]
				},
				type: true,
				login: true,
				isit_overdue: false,
			}
		},
		components: {
			myHeader,
			opinion,
			titles,
			shareTips
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		methods: {
			loseData(due) {
				//判断这个求购是否过期
				let _self = this;
				if(due) {
					due = due.split('.')[0];
					var arr = due.split(/[- : \/]/);
					var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
					var pubdateDate = new Date();
					var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
					let days = Math.ceil(dateValue / (24 * 3600 * 1000));
					if(days <= 0) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			resive(id) {
				common.$emit('purchase-id', id);
				this.$router.push('/releaseNeeds/' + id);
			},
			preview(obj,item){
				wx.previewImage({
					current: item, // 当前显示图片的http链接
					urls: obj.image// 需要预览的图片http链接列表
					});
			},
			getHttp(id) {
				let _self = this;
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionService',
					biz_method: 'queryIntentionInfo',
					biz_param: {
						id: id
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
					let result = suc.data.biz_result;
					result.duedate = result.duedate.split(' ')[0]
					console.log(result,'result=======')
					let shareData = common.shareParam;
					if(suc.data.code == '1c01') {
						_self.obj = result;
						if(_self.obj.image.length < 1) {
							_self.judgImage = false;
						} else {
							_self.judgImage = true;
						}
						console.log(_self.judgImage)
						_self.isit_overdue = _self.loseData(result.duedate);
						if(result.isMy == 0 && result.offer >= 3 && result.isOffer == 0 && !_self.isit_overdue) {
							setTimeout(() => {
								_self.mascot = true;
							}, 2000)
						}
						shareData.title = "【紧急求购】" + result.breedName + "-上【药材买卖网】你报价我就要了！";
						shareData.desc = result.breedName + ',规格:' + result.spec + ',需要' + result.number + result.unit + '要求：' + result.quality + '。--买卖药材就上药材买卖网！';
						shareData.link = window.location.href;
						console.log(shareData,'sharedata')
						common.share(shareData);
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			submit(todo) {
				let _self = this;
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionOfferService',
					biz_method: 'notAttendOffer',
					biz_param: {
						intentionId: _self.id,
						breedId: _self.obj.breedId,
						reason: todo.title,
						breedName: _self.obj.breedName
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
					common.$emit('message', suc.data.msg);
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			sendFriend() {
				console.log(this.boxInfo.show)
				if(this.isit_overdue) {
					common.$emit('message', '该商品已过期！')
				} else {
					this.boxInfo.show = true;
				}
			},
			sendNor() {
				let _self = this;
				if(!common.KEY) {
					let origin = location
					window.localStorage.router = origin.href
					function loadApp() {
						common.$emit('setParam', 'backRouter', '/needDetails/' + _self.id);
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
				} else if(_self.isit_overdue) {
					common.$emit('message', '该商品已过期！')
				} else {
					if(store.get('me').userType == '0' ||store.get('me').bizMain == '' || store.get('me').manageType == '-1') {

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
					}
					this.opinion = true;
				}

			},
			cancel() {
				this.show = false;
				this.opinion = false;
			},
			cancelMascot() {
				this.mascot = false;
			},
			selectIt(todo) {
				let _self = this;
				if(todo.title) {
					_self.submit(todo)
				}
				window.history.go(-1);
				this.show = false;
				this.opinion = false;
				
			},
			jumpDetail(obj) {
				let _self = this;
				common.$emit('myOfferToOfferDetail', obj.id);
				_self.$router.push('/offerDetail/' + obj.id);
			},
			jump(obj) {
				let _self = this;
				console.log(_self.userInfor,'===================111')
				if(!common.KEY) {
					let origin = location
					window.localStorage.router = origin.href
					//没有登录先登录
					_self.login = false;

					function loadApp() {
						common.$emit('setParam', 'backRouter', '/needDetails/' + _self.id);
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
				} else if(_self.isit_overdue) {
					common.$emit('message', '该商品已过期！')
				} else {
					console.log(_self.userInfor,'me===========')
					if(store.get('me').userType == '0' || store.get('me').bizMain == '' || store.get('me').manageType == '-1' ) {
						console.log(_self.userInfor,'===================')
						function perfect() {
							_self.$store.dispatch('changeRouter', {
								index: 3,
								id: obj.id
							})
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
					common.$emit('needToReleaseOffer', {
						id: obj.id,
						type: undefined
					});
					_self.$router.push('/releaseOffer/' + obj.id);
				}
			},

		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;;
		},
		created() {
			let _self = this;
			let id = _self.$route.params.id;
			let type = _self.$route.query.type;
			let value = _self.$route.query.value;
			if(type == 'my') {
				_self.param.goBack = false;
				this.type = false;
			} else {
				_self.param.goBack = false;
				this.type = true;
			}
			if(value == 'web') {
				_self.param.goBack = false;
//				_hmt.push(['_setAutoPageview', false]);
//				_hmt.push(['_trackPageview', '/needDetails/*?value=web']);
			} else if(value == 'message') {
				_self.param.goBack = true;
//				_hmt.push(['_setAutoPageview', false]);
//				_hmt.push(['_trackPageview', '/needDetails/*?value=message']);
			}
			_self.mascot = false;
			_self.getHttp(id);
			_self.id = id;
			common.$on("needToDetails", function(item) {
				if(item.type == 'my') {
					_self.type = false;
				} else {
					_self.type = true;
				}
				_self.mascot = false;
				_self.getHttp(item.id);
				_self.id = item.id;
				_self.show = false;
			});
			common.$on("loginToDetails", function(item) {
				_self.mascot = false;
				_self.getHttp(item.id);
			})

		}

	}
</script>