<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	input,
	textarea {
		border: none;
		background-color: #fff;
	}
	
	.release_offer {
		position: relative;
		height: 100vh;
		.goodsInfo {
			margin: 10px;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
			background-color: #fff;
			.selectAddress {
				padding: 10px 10px 10px 0;
				margin-left: 15px;
				border-bottom: 1px solid #e6e6e6;
			}
			.supplement {
				text-align: left;
				width: 100%;
				padding-left: 15px;
				font-size: 14px;
				div {
					color: #ADADAD;
					text-align: left;
				}
				.content {
					padding: 10px;
					width: 85vw;
					min-height: 90px;
					border: 1px solid #e6e6e6;
					color: #000;
					/*margin: 10px 10px 0 0px;*/
					background-color: #FDFDFD
				}
			}
		}
		.image_box {
			margin: 10px;
			border-radius: 8px;
			overflow: hidden;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
		}
		.killScroll {
			overflow: hidden;
		}
		.box {
			padding: 20px 15px;
			background-color: #fff;
			.images {
				width: 80px;
			}
		}
		.img {
			width: 100%;
			background-color: #fff;
			padding: 20px 15px;
			text-align: left;
			.img_box {
				display: inline-block;
				position: relative;
				width: 80px;
				margin-bottom: 15px;
				margin: 0 10px 10px 10px;
				.photo_box {
					width: 80px;
					height: 80px;
					position: relative;
					margin: 0 auto;
					overflow: hidden;
					.my_img {
						width: 100%;
						min-height: 80px;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}
				.delete {
					position: absolute;
					width: 20px;
					height: 20px;
					top: -10px;
					left: -10px;
				}
			}
			.up_load {
				display: inline-block;
				width: 80px;
				height: 80px;
				margin: 0 10px;
				margin-bottom: 15px;
			}
		}
		.confirm {
			height: 50px;
			width: 100%;
			background-color: #ff8201;
			font-size: 17px;
			line-height: 50px;
			text-align: center;
			color: #fff;
		}
		.margin_10 {
			margin-bottom: -10px;
		}
		.border_set {
			margin-left: 15px;
			border-bottom: 1px solid #ddd;
		}
	}
</style>
<template>
	<div class="release_offer">
		<myHeader :param="param" :obj="objs" :overdue="isit_overdue"></myHeader>
		<div class="page-loadmore-wrapper main" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-bind:class="{killScroll:message.show}">
			<!--头部固定信息-->
			<basicTop :obj="obj" v-on:showAction="showAction"></basicTop>

			<div class="goodsInfo">
				<!--样品数量-->
				<releaseBasic :obj="obj"></releaseBasic>

				<!--可供量-->
				<priceOrNumber :obj="obj" v-on:showAction="showAction"></priceOrNumber>

				<!--货物所在地-->
				<div class="selectAddress">
					<selectAddress :obj="obj"></selectAddress>
				</div>
				<formList :formInfo="accordWth" v-on:accordFunc="accordFunc()"></formList>

				<!--是否包教包退-->
				<formList :formInfo="saleReturn"></formList>

				<!--账期-->
				<paymentDays :obj="obj"></paymentDays>

				<!--价格补充说明-->
				<div class="supplement">
					<textarea class='content' placeholder="价格补充说明" v-model="obj.priceDescription"></textarea>
				</div>

				<!--价格有效期-->
				<expiryDate :dateArr="dateArr" :obj="obj" :duedate="duedate"></expiryDate>
			</div>

			<!--图片信息-->
			<div class="image_box">
				<titles tab="7"></titles>
				<!--上传图片-->
				<div class="img">
					<div class="img_box" v-for="(todo,index) in imgArr">
						<div class="photo_box"><img :src="todo" class="my_img"></div>
						<img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
					</div>
					<div class="up_load" v-show="imgArr.length !== 5">
						<imageUpload :param="imgArr" v-on:postUrl="getUrl"></imageUpload>
					</div>
				</div>
				<!--产品卖点-->
				<sellingPoints :maidian="maidian"></sellingPoints>
				<!--<selectQuality :obj="obj"></selectQuality>-->
			</div>
			<div class="confirm" @click="confirm">提交报价</div>
		</div>
		<messageBoxs :message="message" v-show="message.show" v-on:mySure="mySure" v-on:myCancel="myCancel"></messageBoxs>
		<popReleaseOffer :popshow="popshow" v-show="popshow.show"></popReleaseOffer>
		<opinion :arr="arr" v-on:cancel="cancel" v-on:selectIt="selectIt" v-show="arr.show"></opinion>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import myHeader from '../../components/header/myHeader'
	import popSpec from '../../components/popUpType/popSpec'
	import basicTop from '../../components/release/basicInTop'
	import titles from '../../components/release/title'
	import paymentDays from './paymentDays'
	import sellingPoints from './sellingPoints'
	import imageUpload from '../../components/release/upLoadImgs' /**/
	import specialImgs from '../../components/release/specialImgs'
	import formList from '../../components/list/formList'
	import priceOrNumber from '../../components/release/priceOrNumber'
	import selectQuality from '../../components/release/selectQuality'
	import releaseBasic from '../../components/release/resourceReleaseBasic'
	import messageBoxs from '../../components/popUpType/messageBoxs'
	import expiryDate from '../../components/release/expiryDate'
	import popReleaseOffer from '../../components/popUpType/popReleaseOffer'
	import httpService from '../../common/httpService.js'
	import selectAddress from '../../components/popUpType/selectAddress'
	import opinion from '../../components/popUpType/opinion'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				maidian: {
					msg: '',
					choose: '',
					total: '',
					list: [{
						show: false,
						word: '产品包交'
					}, {
						show: false,
						word: '质量优质'
					}, {
						show: false,
						word: '一手货源'
					}, {
						show: false,
						word: '含量较高'
					}, {
						show: false,
						word: '可以加工'
					}],
				},
				arr: {
					show: false,
					title: '是否符合药典',
					list: [{
						title: '有出口经验'
					}, {
						title: '达到2015药典标准',
					}, {
						title: '达到药典标准且有出口经验'
					}, {
						title: '不确定'
					}]
				},
				//是否包交包退
				saleReturn: {
					type: 'select',
					title: '是否包交包退',
					returnGoods: 1,
					option: [{
						name: '是',
						status: true,
					}, {
						name: '否',
						status: false,
					}]
				},
				//是否符合药典
				accordWth: {
					type: 'choose',
					title: '是否符合药典',
					placeholder: '请选择质量标准',
					value: '',
				},
				isit_overdue: '', //是否超期
				popshow: {
					show: false,
					offerId: ''
				},
				dateArr: [{
					show: false,
					one: '7'
				}, {
					show: false,
					one: '15'
				}, {
					show: false,
					one: '30'
				}, {
					show: false,
					one: ''
				}],
				duedate: '',
				message: {
					title: '修改报价',
					content: '确定修改报价信息后将等待审核！',
					canceltext: '再想想',
					confirmtext: '确认',
					show: false,
				},
				param: {
					name: '正在报价',
					router: 'home',
					collect: 0,
				},
				handPhoto: '',
				Type0: '0',
				detailsPhoto: '',
				Type1: '1',
				cargoPhoto: '',
				Type2: '2',
				wrapperHeight: '',
				obj: {
					myoffer: true,
					sampling: 1,
					indentType: '',
					weight: '',
					price: '',
					duedates: '',
					breedName: '天麻',
					need_number: '',
					need_unit: '',
					spec: '',
					place: '',
					place_id: '',
					sheetVisible: false,
					breedLocation: [],
					breedSpec: [],
					//

					first_spec: '', //初始化规格,未选择状态
					first_city: '',
					payAddress: '', //交货地址
					msgQuility: '', //质量要求
					description: '', //备注信息
					offer: '', //报价人数
					isAttention: '', //是否收藏
					isMy: '', //是否是自己的

					address_name: '货物所在地', //货物所在地',
					address: '',
					addressProvince: '',
					addressProvinceId: '',
					addressCity: '',
					addressCityId: '',
					addressDistrict: '',
					addressDistrictId: '',
					detailAddr: '',
					tshow: false,
					unit: [{
						id: 1,
						name: 'g'
					}, {
						id: 2,
						name: 'kg'
					}],

					actions: [],
					sell_point: [],
					number_name: '可供量',
					price_name: '成本价',
					//new
					payMethodList: [{
						name: '现款',
						status: false,
					}, {
						name: '账期',
						status: true,
					}],
					payMethod: 1, //付钱方式，0现款，1账期
					advance: '', //预付百分比
					paymentDay: '', //账期天数

					sale_price: '',
					number: '',
					number_unit: '',
					number_id: '',
					quality: '',
					priceDescription: '',
					descriptions: '',
					intentionId: ''
				},
				objs: [], //所有的求购信息
				imgArr: [],
				imageArrs: [],
				accept_type: '',
				report_id: '',
				lastPrice: ''
			}
		},
		methods: {
			cancel() {
				this.arr.show = false;
			},
			selectIt(todo) {
				let _self = this;
				this.accordWth.value = todo.title;
				this.arr.show = false;
			},
			accordFunc() {
				this.arr.show = true;
			},
			mySure() {
				this.message.show = false;
				this.release()
			},
			myCancel() {
				this.message.show = false;
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
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				}
				httpService.myAttention(url, body, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result;
					let shareData = common.shareParam;
					if(suc.data.code == '1c01') {
						_self.objs = result;
						_self.obj.isAttention = result.isAttention; //是否收藏
						_self.obj.isMy = result.isMy; //是否是自己的
						_self.obj.offer = result.offer;
						_self.obj.description = result.description;
						_self.obj.msgQuility = result.quality;
						_self.obj.payAddress = result.address;
						_self.getBreedInformation(result.breedName);
						_self.obj.breedName = result.breedName;
						_self.obj.duedate = result.duedate;
						_self.obj.need_number = result.number;
						_self.obj.need_unit = result.unit;
						_self.obj.spec = result.spec;
						_self.obj.first_spec = result.spec;
						_self.obj.first_city = result.location;
						_self.obj.place = result.location;
						_self.obj.place_id = result.locationId;
						_self.obj.number_unit = result.unit;
						_self.obj.number_id = result.unitId;
						_self.obj.indentType = result.indentType;
						_self.obj.especial = result.especial;
						shareData.title = "【紧急求购】" + result.breedName + "-上【药材买卖网】你报价我就要了！";
						shareData.desc = result.breedName + ',规格:' + result.spec + ',需要' + result.number + result.unit + '要求：' + result.quality + '。--买卖药材就上药材买卖网！';
						shareData.link = 'http://apps.yaocaimaimai.com/htm5/#/needDetails/' + result.id;
						common.share(shareData);
						console.log(shareData)
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getOffer(id) {
				let _self = this;
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
					if(suc.data.code == '1c01') {
						let result = [];
						if(suc.data.biz_result.list.length > 0) {
							result = suc.data.biz_result.list[0];
							_self.obj.payMethod = result.payMethod;
							for(var i = 0; i < _self.obj.payMethodList.length; i++) {
								_self.obj.payMethodList[i].status = false;
								if(_self.obj.payMethod == 0) _self.obj.payMethodList[_self.obj.payMethod].status = true;
								if(_self.obj.payMethod == 1) _self.obj.payMethodList[_self.obj.payMethod].status = true;
								if(_self.obj.payMethod == '') _self.obj.payMethodList[0].status = true;
							}
							_self.obj.addressProvince = result.goodsPosition;
							_self.obj.address = _self.obj.addressProvince;
							if(_self.obj.payMethod == 1) {
								_self.obj.advance = result.advance; //预付百分比
								_self.obj.paymentDay = result.paymentDay; //账期天数
							}
							_self.report_id = result.id;
						}

						if(result !== []) {
							//处理带过来的图片匹配  
							for(var i = 0; i < result.image.length; i++) {
								_self.imgArr.push(result.image[i]);
							}
							_self.saleReturn.returnGoods = result.returnGoods;
							if(result.returnGoods == 0) {
								_self.saleReturn.option[1].status = true;
							} else {
								_self.saleReturn.option[0].status = true;
							}
							//处理带过来的卖点匹配
							if(result.productPoint) {
								result.productPoint = result.productPoint.replace(',,',',')
								let qualityArr = result.productPoint.split(',');
								for(var i = 0; i < qualityArr.length; i++) {
									for(var j = 0; j < _self.maidian.list.length; j++) {
										if(_self.maidian.list[j].word == qualityArr[i]) {
											_self.maidian.choose += qualityArr[i] + ',';
											_self.maidian.list[j].show = true;
											qualityArr.splice(i, 1);
										}
									}
								}
								_self.maidian.msg = qualityArr;
							}

							//处理是否有样品
							_self.obj.sampling = result.sampling;
							if(result.sampling == 1) {
								_self.obj.weight = result.sampleNumber;
								_self.obj.price = result.sampleAmount;
							}
							//处理价格和供应量
							_self.obj.number = result.number;
							//_self.obj.sale_price = result.price;
							//价格说明
							_self.obj.priceDescription = result.priceDescription;
							//是否符合药典要求
							_self.accordWth.value = result.quality;
							//产地
							_self.obj.place = result.location;
							_self.obj.place_id = result.locationId;
							//规格
							_self.obj.spec = result.spec;
							//上一次报价的价格
							_self.lastPrice = result.price;
							let date = _self.getDate(result.duedate);

							if(date !== 7 && date !== 15 && date !== 30) {

								if(date > 0) _self.dateArr[3].one = date;
								if(date < 0) _self.dateArr[3].one = 0;
							} else {
								switch(date) {
									case 7:
										_self.dateArr[0].one = date;
										break;
									case 15:
										_self.dateArr[1].one = date;
										break;
									case 30:
										_self.dateArr[2].one = date;
										break;
								}
							}
						}

					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getDate(myDate) {
				let _self = this;
				myDate = myDate.split('.')[0];
				//处理iphone时间格式不兼容问题
				let arr = myDate.split(/[- : \/]/);
				let toDay = new Date();
				toDay = toDay.getTime();

				let due = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
				let duedate = due.getTime();

				let time = duedate - toDay;
				let day = Math.ceil(time / (1000 * 3600 * 24));

				for(var i = 0; i < _self.dateArr.length; i++) {
					_self.dateArr[i].show = false;
				}
				switch(day) {
					case 7:
						_self.dateArr[0].show = true;
						_self.obj.duedates = 0;
						break;
					case 15:
						_self.dateArr[1].show = true;
						_self.obj.duedates = 1;
						break;
					case 30:
						_self.dateArr[2].show = true;
						_self.obj.duedates = 2;
						break;
					default:
						_self.dateArr[3].show = true;
						_self.obj.duedates = 3;
				}
				return day;
			},
			checkDates() {
				let _self = this;
				let validate = true;
				_self.duedate = _self.objs.duedate;
				let msg = '';
				let pattern = /^([12][0-9]|30|[1-9])$/;
				console.log(_self.dateArr[3])
				switch(this.obj.duedates) {
					case 0:
						_self.duedate = '7';
						break;
					case 1:
						_self.duedate = '15';
						break;
					case 2:
						_self.duedate = '30';
						break;
					case 3:
						if(!_self.dateArr[3].one) {
							msg = '请填写截至日期'
							validate = false;
						} else if(!pattern.test(_self.dateArr[3].one)) {
							msg = '截至日期需1~30天';
							validate = false;
						}
						_self.duedate = _self.dateArr[3].one;
						break;
					default:
						msg = '请选择截至日期';
						validate = false;
						_self.duedate = '';
				}
				if(!validate) {
					return msg;
				}
			},
			confirm() {

				let _self = this;
				console.log(_self.maidian.choose + _self.maidian.msg)
				_self.imageArrs = [];
				if(_self.handPhoto) {
					_self.imageArrs.unshift(_self.handPhoto)
				}
				if(_self.detailsPhoto) {
					_self.imageArrs.unshift(_self.detailsPhoto)
				}
				if(_self.cargoPhoto) {
					_self.imageArrs.unshift(_self.cargoPhoto)
				}
				for(var i = 0; i < _self.imgArr.length; i++) {
					_self.imageArrs.unshift(_self.imgArr[i])
				}
				var checkArr = [];
				let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格');
				checkArr.push(checkBreedSpec);
				let checkBreedPlace = validation.checkNull(_self.obj.place, '请输入产地');
				checkArr.push(checkBreedPlace);
				let checkAddress = validation.checkNull(_self.obj.address, '请选择货物所在地！');
				checkArr.push(checkAddress);
				let checkPayMethod = validation.checkAllNumberNull(_self.obj.payMethod, _self.obj.advance, _self.obj.paymentDay, '请输入');
				checkArr.push(checkPayMethod);
				let count = '请上传图片';
				for(let i = 0; i < _self.imageArrs.length; i++) {
					if(_self.imageArrs[i]) {
						count = false;
					}
				}
				if(count) {
					checkArr.push(count);
				}
				let checkQuality = validation.checkNull(_self.maidian.choose + _self.maidian.msg + ',', '请选择产品卖点');
				checkArr.push(checkQuality);
				let checkDrugInfor = validation.checkNull(_self.accordWth.value, '请选择是否符合药典标准');
				checkArr.push(checkDrugInfor);
				let checkDuedate = _self.checkDates();
				checkArr.push(checkDuedate);
				if(_self.obj.sampling == 1) {
					let checkSampleNum = validation.checkMaxNum(_self.obj.weight, '样品数量');
					checkArr.push(checkSampleNum);
					let checkSamplePrice = validation.checkPrice(_self.obj.price, '样品价格');
					checkArr.push(checkSamplePrice);
				}
				let checkNum = validation.checkMaxNum(_self.obj.number, '可供量');
				checkArr.push(checkNum);
				let checkPri = validation.checkPrice(_self.obj.sale_price, '裸价');
				checkArr.push(checkPri);
				let checkPriDescription = validation.checkNull(_self.obj.priceDescription, '请填写价格说明');
				checkArr.push(checkPriDescription);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				//修改报价的情况
				if(_self.accept_type !== undefined) {
					if(Number(_self.obj.sale_price) > Number(_self.lastPrice)) {
						_self.message.content = '您报的价格比上次还高，可能会影响成交概率，是否确认'
					} else if(Number(_self.obj.sale_price) == Number(_self.lastPrice)) {
						_self.message.content = '您报的价格与上次相同，可能会影响成交概率，是否确认';
					} else {
						_self.message.content = '确定修改报价信息后将等待审核！'
						_self.message.title = '发布报价';
					}
					_self.$msgBox.showMsgBox({
						title: '提示',
						content: _self.message.content,
					}).then(async(val) => {
						_self.release();
					}).catch(() => {});
				} else {
					//发布报价的情况
					_self.$msgBox.showMsgBox({
						title: '提示',
						content: '确定发布报价？',
					}).then(async(val) => {
						_self.release();
					}).catch(() => {});
				}

			},
			showAction(param) {
				console.log(11, this.accept_type)
				if(this.accept_type !== undefined && param == "unit") {
					common.$emit('message', '再次报价单位不可更改')
					this.obj.sheetVisible = false;
				} else {
					this.obj.sheetVisible = true;
				}
				this.obj.actions = [];
				let _self = this;
				if(param == "unit") {
					for(var i = 0; i < _self.obj.unit.length; i++) {
						_self.obj.actions.push({
							name: _self.obj.unit[i].name,
							key: 'number_unit',
							id: _self.obj.unit[i].id,
							id_key: 'number_id'
						});
					}
				} else if(param == "spec") {
					for(var i = 0; i < _self.obj.breedSpec.length; i++) {
						_self.obj.actions.push({
							name: _self.obj.breedSpec[i].name,
							id: _self.obj.breedSpec[i].id,
							key: 'spec'
						});
					}
				} else {
					for(var i = 0; i < _self.obj.breedLocation.length; i++) {
						_self.obj.actions.push({
							name: _self.obj.breedLocation[i].name,
							id: _self.obj.breedLocation[i].locationId,
							key: 'place',
							id_key: 'place_id'
						});
					}
				}
				if(this.obj.actions.length > 1) {
					this.obj.actions = this.obj.actions.slice(0, this.obj.actions.length - 1);
				}
			},
			getBreedInformation(name) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'breedService',
					biz_method: 'queryLocalSpecList',
					biz_param: {
						name: name
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.commonPost(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						_self.obj.breedLocation = suc.data.biz_result.localList;
						_self.obj.breedSpec = suc.data.biz_result.specList;
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getUnit() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'enumService',
					biz_method: 'queryEnumList',
					biz_param: {
						type: 'MU'
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.commonPost(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						_self.obj.unit = suc.data.biz_result.list;
						if(!_self.obj.number_unit) {} else {
							for(var i = 0; i < _self.obj.unit.length; i++) {
								if(_self.obj.number_unit == _self.obj.unit[i].name) {
									_self.obj.number_id = _self.obj.unit[i].id;
								}
							}
						}

					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getUrl(param) {
				console.log(1, param)
				let _self = this;
				if(this.imgArr.length <= 5) {
					if(param.url) _self.imgArr.push(param.url);
					if(_self.imgArr.length == 5) {
						common.$emit('message', '最多只能上传5张图片！')
					}
				}
			},
			getUrlOne(param) {
				if(param.url) {
					this.handPhoto = param.url;
				}
			},
			getUrlTwo(param) {
				if(param.url) {
					this.detailsPhoto = param.url;
				}
			},
			getUrlThree(param) {
				if(param.url) {
					this.cargoPhoto = param.url;
				}
			},
			deletes(index) {
				let _self = this;
				_self.imgArr.splice(index, 1);
			},
			deletecargoPhoto() {
				this.cargoPhoto = '';
			},
			deletes(index) {
				let _self = this;
				_self.imgArr.splice(index, 1);
			},
			select(todo, index) {
				let _self = this;
				todo.show = !todo.show;
				_self.sell_point = [];
				for(var i = 0; i < _self.sell.length; i++) {
					if(_self.sell[i].show) {
						_self.sell_point.push(_self.sell[i].name)
					}
				}
			},
			release() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'intentionOfferService',
					biz_method: 'newAppIntentionOffer',
					biz_param: {
						customerId: common.customerId, //用户ID
						breedName: _self.obj.breedName, //用户名
						spec: _self.obj.spec, //规格
						location: _self.obj.place_id, //产地ID
						breedImage: _self.imageArrs, //图片
						productPoint: _self.maidian.choose + _self.maidian.msg, //产品卖点

						number: _self.obj.number, //数量
						unit: _self.obj.number_id, //单位
						price: _self.obj.sale_price, //价格
						priceDescription: _self.obj.priceDescription, //价格补充说明
						intentionId: _self.obj.intentionId, //意向id
						sampleNumber: _self.obj.weight, //样品数量
						sampling: _self.obj.sampling, //是否供样
						sampleAmount: _self.obj.price, //样品价格
						duedate: _self.duedate, //截止日期
						goodsPosition: _self.obj.address, //物品所在地
						payMethod: _self.obj.payMethod, //付款方式
						advance: _self.obj.advance, //预付比例
						paymentDay: _self.obj.paymentDay, //尾款日期
						quality: _self.accordWth.value, //是否符合药典
						returnGoods: _self.saleReturn.returnGoods,
					}
				};
				if(_self.accept_type == 0) {
					body.biz_method = 'updateIntentionOffer'
					body.biz_param.id = _self.report_id;
				}
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.needRelease(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						let offerId = suc.data.biz_result.offerId;
						_self.popshow.show = true;
						_self.popshow.offerId = offerId;
						_self.popshow.breedName = _self.obj.breedName;
						_self.$store.dispatch('getSelectOffer', offerId);
						common.$emit('message', suc.data.msg);
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			}

		},
		components: {
			myHeader,
			popSpec,
			basicTop,
			titles,
			formList,
			paymentDays,
			imageUpload,
			priceOrNumber,
			selectQuality,
			specialImgs,
			releaseBasic,
			messageBoxs,
			expiryDate,
			popReleaseOffer,
			selectAddress,
			opinion,
			sellingPoints
		},
		created() {
			let _self = this;
			if(!common.KEY) {
				_self.$router.push('/login')
			}
			let id = _self.$route.params.id;
			_self.accept_type = _self.$route.query.type;
			_self.getHttp(id);
			if(_self.accept_type !== undefined) _self.getOffer(id);
			_self.obj.intentionId = id;
			_self.getUnit();
			common.$on('needToReleaseOffer', function(item) {
				_self.obj.payAddress = ''; //交货地址
				_self.obj.msgQuility = ''; //质量要求
				_self.obj.description = ''; //备注信息
				_self.obj.first_spec = ''; //初始化规格为选择状态
				_self.obj.first_city = ''; //初始化产地为选择状态
				_self.objs = []; //所有的求购信息

				_self.saleReturn.returnGoods = 1; //初始化包教包退
				for(var i = 0; i < _self.saleReturn.option.length; i++) {
					_self.saleReturn.option[i].status = false;
					if(i == 0) {
						_self.saleReturn.option[0].status = true;
					}
				}

				_self.obj.breedName = '';
				_self.obj.spec = '';
				_self.obj.location = '';
				_self.imgArr = [];
				_self.handPhoto = '';
				_self.detailsPhoto = '';
				_self.cargoPhoto = '';

				_self.imageArrs = [];
				_self.obj.quality = '';
				_self.obj.sell_point = [];
				_self.obj.number = '';
				_self.obj.number_id = '';
				_self.obj.price = '';
				_self.obj.sale_price = '';
				_self.obj.weight = '';
				_self.obj.descriptions = '';
				_self.obj.priceDescription = '';
				_self.obj.duedates = 4;
				_self.duedate = '';
				_self.accordWth.value = '';
				_self.obj.payMethod = 1;
				_self.obj.advance = ''; //预付百分比
				_self.obj.paymentDay = ''; //账期天数

				_self.obj.address = '';
				_self.obj.addressProvince = '';
				_self.obj.addressProvinceId = '';
				_self.obj.addressCity = '';
				_self.obj.addressCityId = '';
				_self.obj.addressDistrict = '';
				_self.obj.addressDistrictId = '';
				_self.obj.detailAddr = '';
				for(var i = 0; i < _self.obj.payMethodList.length; i++) {
					_self.obj.payMethodList[i].status = false;
					if(i == 0) _self.obj.payMethodList[i].status = true;
				}
				for(var i = 0; i < 4; i++) {
					_self.dateArr[i].show = false;
					if(i == 3) _self.dateArr[i].one = '';
				}
				_self.lastPrice = '';
				_self.maidian.msg = '';
				_self.maidian.choose = '';
				for(var i = 0; i < _self.maidian.list.length; i++) {
					_self.maidian.list[i].show = false;
				}
				_self.obj.intentionId = item.id;
				_self.accept_type = item.accept_type;
				_self.getHttp(item.id);
				if(_self.accept_type !== undefined) {
					_self.getOffer(item.id);
				}
				_self.getUnit();
			});
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>