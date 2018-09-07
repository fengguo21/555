<style lang="less" scoped>
	.need_detail {
		background-color: #F5F5F5;
		position: relative;
		.circle_box {
			background-color: #fff;
			/*overflow: hidden;*/
			margin: 10px;
			border-radius: 7px;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
		}
		.main {
			padding-bottom: 60px;
		}
		.history_arr {
			/*margin-bottom: 10px;*/
		}
		.title_box {
			padding-left: 15px;
			background-color: #fff;
			.inbox {
				display: flex;
				flex-direction: row;
				line-height: 15px;
				text-align: left;
				border-bottom: 1px solid #E6E6E6;
				padding: 15px 15px 15px 0;
				.button_box {
					width: 100%;
					text-align: right;
					padding-bottom: 10px;
					.lastday {
						display: inline-block;
						background-color: #FDC400;
						height: 30px;
						line-height: 30px;
						color: #fff;
						font-size: 14px;
						border-radius: 20px;
						width: 100px;
						margin-top: 7px;
						text-align: center;
						img {
							width: 16px;
							height: 16px;
							vertical-align: middle;
							margin-right: 5px;
						}
					}
				}
			}
			.last {
				border-bottom: none;
				&.nopadding {
					padding: 0 15px 0 0;
				}
			}
			.left {
				font-size: 15px;
				color: #343434;
				width: 80px;
			}
			.right {
				flex: 1;
				font-size: 14px;
				color: #f;
				word-break: break-all;
				.spec{
					color: #f00;
					margin-left: 10px;
				}
				.right_box {
					font-size: 15px;
					text-align: center;
					display: flex;
					flex-direction: row;
					padding-top: 5px;
					line-height: 15px;
					float: right;
					.images {
						height: 15px;
						img {
							height: 100%;
						}
					}
					.time {
						font-size: 11px;
						color: #CDCDCD;
					}
				}
			}
		}
		@media screen {
			.no_pass {
				min-height: 32px;
				padding: 4px 0;
				font-size: 12px;
				text-align: left;
				padding-left: 15px;
				color: #ff0000;
				line-height: 24px;
				.line {
					padding-left: 77px;
				}
			}
			@media (max-width: 320px) {
				.no_pass {
					font-size: 10px;
					.line {
						padding-left: 65px;
					}
				}
			}
		}
		.box {
			padding: 10px 0 0 15px;
			background-color: #fff;
			.inbox {
				border-bottom: 1px solid #E6E6E6;
				padding: 5px 20px 15px 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				position: relative;
				.used {
					position: absolute;
					width: 60px;
					top: 20px;
					right: 24px;
				}
				.left {
					flex: 1;
					margin-left: 19px;
					color: #343434;
					text-align: left;
					@media screen {
						.breed {
							font-size: 17px;
							line-height: 23px;
							color: #000;
							span {
								font-size: 15px;
							}
							margin-bottom:10px;
						}
						.spec {
							font-size: 15px;
							line-height: 15px;
						}
						@media (max-width: 320px) {
							.breed {
								font-size: 14px;
								line-height: 14px;
								color: #000;
								span {
									font-size: 12px;
								}
								margin-bottom:10px;
							}
							.spec {
								font-size: 12px;
								line-height: 12px;
							}
						}
					}
					.first {
						/*margin-top: 20px;*/
					}
					.last {
						margin-top: 6px;
						.red {
							color: #ff8201;
						}
					}
				}
				.top_left {
					margin-left: 0;
				}
				.right {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
				.image {
					width: 80px;
					height: 80px;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					img {
						width: 100%;
						height: 80px;
					}
				}
			}
			.inboxs {
				justify-content: flex-start;
			}
		}
		.tbox {
			padding: 10px 15px;
			margin: 0 10px;
			border-radius: 5px;
			border: 1px solid #E6E6E6;
			background-color: #F8F8F8;
			line-height: 20px;
			font-size: 15px;
			text-align: left;
			position: relative;
			.black {
				color: #333;
			}
			.red {
				color: #E36056;
			}
			.gray {
				color: #999;
			}
			.time {
				font-size: 12px;
				color: #999999;
			}
			.orange{
				color: #FF8201;
			}
			.green{
				color: #77AF52;
			}
		}
		.top_titles {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.button_list {
			display: flex;
			flex-direction: row-reverse;
			// overflow: hidden;
			align-items: center;
			background-color: #fff;
			font-size: 16px;
			width: 100vw;
			// box-shadow:10px 10px 5px #888888;
			// border-top: 1px solid #F5F5F5;
			position: absolute;
			height: 60px;
			bottom: 0;
			& :nth-child(1) {
				background-color: #FF8201;
				color: #FFF;
			}
			& :nth-child(2) {
				background-color: #F1F1F1;
				color: #333333;
			}
			button {
				border: 0;
				border-radius:20px ;
				padding:10px 20px;
				margin: 10px;
			}
		}
		.retract {
			margin-top: 10px;
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			height: 45px;
			background-color: #fff;
			color: #FAB805;
			font-size: 16px;
			img {
				height: 20px;
				margin-left: 10px;
			}
		}
		.no_history {
			color: #999;
			font-size: 15px;
			/*height: 50px;*/
			/*line-height: ;*/
			padding: 50px 0;
			text-align: center;
			padding-left: 15px;
			background-color: #fff;
		}
		.imgs {
			width: 100%;
			position: absolute;
			height: 200px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.period_time {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 15px;
			line-height: 15px;
			padding: 15px 0;
			color: #000;
			/*background-color: #EBEBEB;*/
			.image {
				height: 15px;
				vertical-align: top;
			}
			.over {
				background-color: #BBBBBB;
				color: #fff;
				font-size: 13px;
				padding: 2px 5px;
				border-radius: 8px;
				margin-left: 4px;
			}
		}
		.its_opacity {
			position: relative;
			.white_shades {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				background: url(../../../static/icon/list/loseEfficacy.png) no-repeat rgba(255, 255, 255, 0.6);
				background-size: 32% 29%;
				background-position: 116px 62px;
				z-index: 2000;
			}
		}
	}
	
	.overflowhide {
		border-radius: 0 0 7px 7px;
		overflow: hidden;
	}
	
	.overflowhideAll {
		background-color: #fff;
		overflow: hidden;
		margin: 10px;
		border-radius: 7px;
		box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
	}
	
	.list_button {
		background-color: #fff;
		padding: 0 10px;
		text-align: left;
		line-height: 45px;
		border-bottom: 1px solid #E6E6E6;
		&>span:nth-child(1) {
			display: inline-block;
			text-align: left;
		}
		&>span:nth-child(2) {
			float: right;
			color: #999;
			.shouqi {
				height: 12px;
				width: 8px;
				margin-left: 5px;
				vertical-align: middle;
				margin-top: -3px;
			}
			.xiala {
				width: 12px;
				margin-left: 5px;
				height: 8px;
				margin-top: -3px;
				vertical-align: middle;
			}
		}
	}
</style>
<template>
	<div class="content need_detail">
		<myHeader :param="param" v-show="!my_param.show"></myHeader>
		<div class="boxs" v-show="!my_param.show">
			<div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<!-------------------------------------------求购信息-------------------------------------------------->
				<div class="circle_box">
					<titles tab="8" :obj="obj"></titles>
					<!-----------------------品名----------------------->
					<div class="title_box">
						<div class="inbox">
							<div class="left">品&emsp;&emsp;名</div>
							<div class="right">
								{{obj.content.breedName}}<span class="spec">({{obj.content.number}}{{obj.content.unit}})</span>
							</div>
						</div>
					</div>
					<!-----------------------规&emsp;格----------------------->
					<div class="title_box">
						<div class="inbox">
							<div class="left">规&emsp;&emsp;格</div>
							<div class="right">{{obj.content.spec,20 | filterTxt}}</div>
						</div>
					</div>
					<!-----------------------产地----------------------->
					<div class="title_box">
						<div class="inbox">
							<div class="left">产&emsp;&emsp;地</div>
							<div class="right">{{obj.content.location,4 | filterTxt}}</div>
						</div>
					</div>
					<!-----------------------交货地----------------------->
					<div class="title_box">
						<div class="inbox">
							<div class="left">交&nbsp;货&nbsp;地</div>
							<div class="right">{{obj.content.address}}</div>
						</div>
					</div>
					<!-----------------------有效日期----------------------->
					<div class="title_box">
						<div class="inbox">
							<div class="left">有效日期</div>
							<div class="right">{{obj.content.duedate | timeFormats}}</div>
						</div>
					</div>
					<!-----------------------付款方式----------------------->
					<!--<div class="title_box">
						<div class="inbox">
							<div class="left">付款方式</div>
							<div class="right">{{obj.content.paymentWay}}</div>
						</div>
					</div>-->
					<!------------------备注信息--------------->
					<div class="title_box">
						<div class="inbox last">
							<div class="left">备注信息</div>
							<div class="right">{{obj.content.description}}</div>
						</div>
					</div>
					<div class="title_box overflowhide">
						<div class="inbox last nopadding">
							<div class="button_box">
								<div class="lastday" @click="again(obj.newOffer.state)" v-if="obj.newOffer.state == 0 && sellShow">再次报价</div>
							</div>
						</div>
					</div>

				</div>

				<!-------------------------------------------报价信息-------------------------------------------------->
				<div class="overflowhideAll">
					<titles tab="4" :obj="obj"></titles>
					<!--报价是否接受 accept   0/1/2/3 未处理/接受/不接受/正在跟进   其中accept=1 且 state<=60  为待寄样状态，accept=1且 state>=70 为价格确认状态-->
					<div class="tbox top_titles">
						<div>报价状态:
							<!-- <span class="red" v-if="obj.newOffer.accept == '0' || obj.newOffer.accept == '3'">受理中</span>
							<span class="red" v-if="obj.newOffer.accept == '1' && obj.newOffer.state>=20">待成交</span>
							<span class="red" v-if="obj.newOffer.accept == '2'">未采用</span> -->
							
							<span class="orange" v-if="obj.newOffer.state>=0&&obj.newOffer.state<100&&obj.newOffer.state!==11">受理中</span>
							<span class="green" v-if="obj.newOffer.state>=100&&obj.newOffer.state<114&&obj.newOffer.state!==111" >已采用</span>
							<span class="red" v-if="obj.newOffer.state==11">未采用</span>
							<span class="orange" v-if="obj.newOffer.state==114||obj.newOffer.state==115">待寄样</span>
							<span class="green" v-if="obj.newOffer.state>=116&&obj.newOffer.state<131">已寄样</span>
							<span class="red" v-if="obj.newOffer.state==131">样品不合格</span>
							<span class="orange" v-if="obj.newOffer.state<170&&obj.newOffer.state>131">待成交</span>
							<span class="green" v-if="obj.newOffer.state==170">已成交</span>
							<span class="red" v-if="obj.newOffer.state==111">无法寄样</span>
						</div>
						<div class="time">{{obj.newOffer.otime | timeFormats}}</div>
					</div>
					<div class="no_pass" v-if="obj.newOffer.state == 11">
						未采用理由: {{obj.newOffer.comments | lineTxt}}
						<div class="line">{{obj.newOffer.comments | lineTxtTwo}}</div>
					</div>
					<div style="margin-bottom: 20px;">
						<process-state :todo="obj.newOffer.arrayState"></process-state>
					</div>

					<!--</div>-->
				</div>
				<div class="overflowhideAll">
					<div class="list_button" @click="openDetail(1)">
						<span>查看报价详情</span>
						<span v-if="!showDetail">点击下拉<img class="shouqi" src="../../../static/icon/list/shouqi.png"/></span>
						<span v-if="showDetail">点击收起<img class="xiala" src="../../../static/icon/list/xiala.png"/></span>
						<div class="border"></div>
					</div>
					<div class="its_opacity">
						<div class="white_shades" v-show="obj.newOffer.myovertime"></div>
						<div class="box" v-if="showDetail">
							<div class="inbox">
								<div class="image">
									<img :src="todo" v-for="(todo,index) in obj.newOffer.image" v-show="index == 0" @click="popUp(obj.newOffer.image)">
								</div>
								<div class="left">
									<div class="breed">{{obj.newOffer.breedName}}
										<span>({{obj.newOffer.number}}{{obj.newOffer.unit}})</span>
									</div>
									<div class="spec first">{{obj.newOffer.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{obj.newOffer.spec,4 | filterTxt}}</div>
									<div class="spec last">裸价:
										<span class="red">{{obj.newOffer.price}}</span>元/{{obj.newOffer.unit}}</div>
								</div>
								<img src="/static/icon/used.png" class="used" v-if="obj.newOffer.accept == '1'">
							</div>

						</div>
						<div v-if="showDetail">
							<payMoneyOrRemark :obj="obj" tab='2'></payMoneyOrRemark>
						</div>
						<div class="period_time" v-if="showDetail">
							<div class="time_main">
								<img class="image" src="/static/icon/times.png" /> 报价有效期: {{obj.newOffer.duedate | timeFormats}}
							</div>
							<div class="over" v-show="obj.newOffer.myovertime">失效</div>
						</div>
					</div>

				</div>
				<div class="overflowhideAll">
					<div class="list_button" @click="openDetail(2)">
						<span>查看历史报价</span>
						<span v-if="!showHisDetail">点击下拉<img class="shouqi" src="../../../static/icon/list/shouqi.png"/></span>
						<span v-if="showHisDetail">点击收起<img class="xiala" src="../../../static/icon/list/xiala.png"/></span>
						<div class="border"></div>
					</div>
					<!--<titles tab="5" :obj="obj" v-show="showHisDetail"></titles>-->
					<div class="history_arr" v-for="todo in obj.list" v-if='obj.list.length > 0 && showHisDetail'>
						<div class="its_opacity">
							<div class="white_shades" v-show="todo.myovertime"></div>
							<div class="tbox top_titles" style="margin-top: 10px;">
								<div>报价状态:
									<!-- <span class="red" v-show="todo.accept == '0'">{{todo.accept | myOfferStatus}}</span>
									<span class="red" v-show="todo.accept == '1'">{{todo.accept | myOfferStatus}}</span>
									<span class="red" v-show="todo.accept == '2'">{{todo.accept | myOfferStatus}}</span>
									<span class="red" v-show="todo.accept == '3'">{{todo.accept | myOfferStatus}}</span> -->
									<span class="orange" v-if="obj.newOffer.state>=0&&obj.newOffer.state<100&&obj.newOffer.state!==11">受理中</span>
									<span class="green" v-if="obj.newOffer.state>=100&&obj.newOffer.state<114&&obj.newOffer.state!==111" >已采用</span>
									<span class="red" v-if="obj.newOffer.state==11">未采用</span>
									<span class="orange" v-if="obj.newOffer.state==114||obj.newOffer.state==115">待寄样</span>
									<span class="green" v-if="obj.newOffer.state>=116&&obj.newOffer.state<131">已寄样</span>
									<span class="red" v-if="obj.newOffer.state==131">样品不合格</span>
									<span class="orange" v-if="obj.newOffer.state<170&&obj.newOffer.state>131">待成交</span>
									<span class="green" v-if="obj.newOffer.state==170">已成交</span>
									<span class="red" v-if="obj.newOffer.state==111">无法寄样</span>
								</div>
								<div class="time">报价时间: {{todo.otime | timeFormat}}</div>
							</div>
							<div class="no_pass" v-if="todo.accept == '2'">
								未采用理由: {{todo.comments | lineTxt}}
								<div class="line">{{todo.comments | lineTxtTwo}}</div>
							</div>
							<process-state :todo="todo.arrayState"></process-state>
							<!-- <process :todo="todo"></process> -->
							<div class="box">
								<div class="inbox">
									<div class="image">
										<img :src="item" v-for="(item,index) in todo.image" v-show="index == 0" @click="popUp(todo.image)">
									</div>
									<div class="left">
										<div class="breed">{{todo.breedName}}
											<span>({{todo.number}}{{todo.unit}})</span>
										</div>
										<div class="spec first">{{todo.location,4 | filterTxt}}&nbsp;&nbsp;&nbsp;{{todo.spec,4 | filterTxt}}</div>
										<div class="spec last">裸价:
											<span class="red">{{todo.price}}</span>元/{{todo.unit}}
										</div>
									</div>
									<img src="/static/icon/used.png" class="used" v-show="todo.accept == '1'">
								</div>
							</div>
							<payMoneyOrRemark :obj="todo" tab='3'></payMoneyOrRemark>
						</div>
						<div class="period_time">
							<div class="time_main">
								<img class="image" src="/static/icon/times.png" /> 报价有效期: {{todo.duedate | timeFormats}}
							</div>
							<div class="over" v-show="todo.myovertime">失效</div>
						</div>
					</div>
					<div class="no_history" v-if="obj.list.length == 0 && showHisDetail">暂无历史报价~~~</div>
				</div>

			</div>
			<!-----------------------------------按钮集合----------------------------- -->
			<div class="button_list">
				<button  @click="jumpEntrance('')">立即寄样</button>
				<button @click="jumpEntrance('')">无法寄样</button>
			</div>		
			<!-- <div class="button_list">
				<div class="red" @click="sendSamples()" >立即寄样</div>
				<div class="red" @click="confirmPrice()">价格确认</div>
			</div>		 -->
		</div>
		<popUpBigImg :param="my_param" v-show="my_param.show"></popUpBigImg>
		<boxPopDefault :popshow="boxInfo" v-show="boxInfo.show"></boxPopDefault>

	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import payMoneyOrRemark from '../../components/myOffer/payMoneyOrRemark'
	import process from '../../components/myOffer/process.vue'
	import processState from '../../components/myOffer/processState.vue'
	import popUpBigImg from '../../components/tools/popUpBigImg'
	import boxPopDefault from '../../components/popUpType/boxPopDefault'
	import myHeader from '../../components/header/myHeader'
	import titles from '../../components/release/title'
	import filters from '../../filters/filters'
	export default {
		data() {
			return {
				showDetail: false, //查看报价选择
				//				showDetailName: "点击展开", //查看报价的按钮

				showHisDetail: false, //查看历史报价选择
				//				showHisDetailName: "点击展开", //查看历史报价的按钮

				boxInfo: { //默认的弹窗样式
					show: false,
					type: '',
					offerId: ''
				},

				text: '',
				my_param: {
					url: '',
					show: false,
					whole_height: ''
				},
				obj: {
					data: {
						payMoney: '付款方式',
						remarks: '备注信息',
					},
					content: {
						offer: '111',
						breedName: '',
						number: '',
						location: '',
						spec: '',
						address: ''
					},
					newOffer: {},
					list: [],
					offer: ''

				},
				param: {
					name: '报价详情',
					topissue: true,
				},
				id: '',
				bigImgs: [],
				sellShow: ''
			}
		},
		components: {
			myHeader,
			titles,
			payMoneyOrRemark,
			popUpBigImg,
			process,
			processState,
			boxPopDefault
		},
		methods: {
			//跳到App
			jumpEntrance(path) {
				let _self = this;
				if(!path) {


					_self.$msgBox.showMsgBox({
						title: '温馨提示',
						content: '请下载App后，在App内查看',
						isShowCancelBtn: false,
						confirmBtnText: '去下载'
					}).then(async(val) => {
						window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yaocaimaimai.yaocaimaimai';
					}).catch(() => {});
				} else {
					_self.$router.push(path);
				}
			},
			//寄样方法
			sendSamples() {
				var _self = this;
				_self.boxInfo.show = true;
				_self.boxInfo.type = 1;
			},

			confirmPrice() {
				var _self = this;
				_self.boxInfo.show = true;
				_self.boxInfo.type = 2;
			},

			//点击展开
			openDetail(item) {
				if(item == 1) {
					if(this.showDetail == true) {
						this.showDetail = false;
						this.showDetailName = '点击展开';
					} else {
						this.showDetail = true;
						this.showDetailName = '点击收起';
					}
				} else if(item == 2) {

					if(this.showHisDetail == true) {
						this.showHisDetail = false;
						this.retractHistory();
						this.showHisDetailName = '点击展开';
					} else {
						this.showHisDetail = true;
						this.launchHistory();
						this.showHisDetailName = '点击收起';
					}
				}
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
					//console.log(1, result);
					//console.log(2, result.breedName)
					if(suc.data.code == '1c01') {
						_self.obj.content.breedName = result.breedName;
						_self.obj.content.number = result.number;
						_self.obj.content.location = result.location;
						_self.obj.content.spec = result.spec;
						_self.obj.content.address = result.address;
						_self.obj.content.duedate = result.duedate;
						_self.obj.offer = result.offer;
						_self.obj.content.unit = result.unit;
						_self.obj.content.paymentWay = result.paymentWay;
						_self.obj.content.description = result.description;
						_self.sellShow = _self.sellShows(result.duedate);

						//						console.log(999999999,JSON.stringify(suc))

					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			sellShows(due) {
				let days;
				if(due) {
					due = due.split('.')[0];
					var arr = due.split(/[- : \/]/);
					var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
					var pubdateDate = new Date();
					var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
					days = Math.ceil(dateValue / (24 * 3600 * 1000));

					if(days <= 0) {
						return false;
					} else {
						return true;
					}

				} else {
					return false;
				}
			},
			again(type) {
				let _self = this;
				common.$emit('needToReleaseOffer', {
					id: _self.id,
					accept_type: type
				});
				this.$router.replace('/releaseOffer/' + this.id + '?type=' + type);
			},
			popUp(imgArr) {
				let _self = this;
				this.my_param.url = imgArr;
				this.my_param.show = !this.my_param.show;
				this.my_param.whole_height = document.documentElement.clientHeight;
			},
			overTimes(time) {
				if(time) {
					time = time.split('.')[0];
					var arr = time.split(/[- : \/]/);
					var startTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
					var nowTime = new Date();
					if(nowTime.getTime() > startTime.getTime()) {
						return true
					} else {
						return false
					}
				}
			},
			getOffer(id) {
				let _self = this;
				console.log(id)
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'intentionOfferService',
					biz_method: 'htmlMyIntentionOfferListInfo',
					biz_param: {
						intentionId: id,
						pn: 1,
						pSize: 20
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
					let result = suc.data.biz_result.list;
					console.log(suc)
					_self.boxInfo.offerId = result[0].id;
					for(var i = 0; i < result.length; i++) {
						result[i].myovertime = _self.overTimes(result[i].duedate);
					}
					if(suc.data.code == '1c01') {
						if(!_self.show) _self.obj.newOffer = result[0];
						if(_self.show) {
							result.shift();
							_self.obj.list = result;
							if(_self.obj.list.length == 0) {
								common.$emit('message', '无历史报价~');
							}

						}
					} else {
						common.$emit('message', suc.data.msg);
					}
					//					console.log(JSON.stringify(result));
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})

			},
			launchHistory() {
				this.show = true;
				this.getOffer(this.id);
			},
			retractHistory() {
				this.show = false;
				this.obj.list = [];
			}
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		created() {
			let _self = this;
			let id = _self.$route.params.id;
			console.log(id)
			_self.getHttp(id);
			_self.getOffer(id);
			_self.id = id;

			common.$on("myOfferToOfferDetail", function(item) {
				_self.showDetail = false; //查看报价选择
				_self.showDetailName = "点击展开"; //查看报价的按钮
				_self.showHisDetail = false; //查看报价选择
				_self.showHisDetailName = "点击展开"; //查看报价的按钮
				_self.getHttp(item);
				_self.getOffer(item);
				_self.id = item;
				_self.show = false;
				_self.my_param.show = false;
			});
			common.$on('getInfo', function(item) {
				_self.getHttp(id);
				_self.id = item;
			})
		}

	}
</script>