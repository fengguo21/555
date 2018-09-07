<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	input {
		border: none;
		background-color: #fff;
	}
	
	.release_needs {

		background-color: #FBFBF6;
		position: relative;
		.top {
			background-color: #fff;
			margin: 10px;
			border-radius: 6px;
			overflow: hidden;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
			.selectAddress {
				padding: 10px 0px 10px 0px;
				margin-left: 15px;
				border-bottom: 1px solid #e6e6e6;
			}
			.img {
				width: 100%;
				background-color: #fff;
				margin-bottom: 10px;
				padding: 15px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.img_box {
					display: inline-block;
					position: relative;
					width: 80px;
					margin-bottom: 15px;
					margin: 0 10px 10px 10px;
					.my_img {
						width: 80px;
						height: 80px;
					}
					.delete {
						position: absolute;
						width: 20px;
						height: 20px;
						top: -10px;
						left: -10px;
					}
					margin-bottom:15px;
				}
				.up_load {
					display: inline-block;
					width: 80px;
					margin-bottom: 15px;
					margin: 0 10px 10px 10px;
				}
				.tips{
					margin-top:80px;
					font-size: 14px;
					color: #f00;
					line-height:2em;
					text-align: left;
				}
			}
			.box {
				background-color: #FBFBF6;
				height: 44px;
				padding: 0 15px;
				line-height: 44px;
				display: flex;
				flex-direction: row;
				img {
					height: 20px;
					margin-top: 12px;
				}
				.title {
					font-size: 16px;
					color: #7BB157;
					padding-left: 5px;
				}
			}
			.outbox_nor {
				background-color: #fff;
				margin-bottom: 20px;
			}
			.pay {
				border-top: 1px solid #E6E6E6;
				background-color: #fff;
				margin-left: 15px;
				.inbox {
					height: 50px;
					line-height: 50px;
					flex-direction: row;
					justify-content: space-between;
					padding-right: 15px;
					.left {
						font-size: 15px;
						text-align: left;
					}
					.right {
						color: #999999;
						font-size: 12px;
					}
				}
				.inboxs {
					height: 50px;
					line-height: 50px;
					display: flex;
					flex-direction: row;
					padding-right: 15px;
					.left {
						font-size: 15px;
					}
					.right {
						color: #999999;
						font-size: 12px;
					}
					.radio {
						height: 20px;
						margin-top: 15px;
						margin-right: 10px;
					}
					.content {
						display: flex;
						flex-direction: row;
						width: 100%;
						line-height: 30px;
						margin: 10px;
						padding: 0 10px;
						border: 1px solid #e6e6e6;
						background-color: #f5f5f5;
						border-radius: 10px;
						&.active {
							background-color: #FFF6EC;
							color: #F37B00;
							border: 1px solid #FFDCB6;
						}
						.fill_box {
							height: 40px;
							border-bottom: 1px solid #CBCBCB;
							.fill_in {
								width: 60px;
								height: 25px;
								line-height: 25px;
								text-align: center;
								border-radius: 0;
							}
						}
					}
				}
				.inboxs_nor {
					border-bottom: none;
				}
			}
			.pay_nor {
				border-top: none;
				.other {
					width: 100%;
					padding: 0 15px 10px 30px;
					textarea {
						width: 100%;
						padding: 8px;
						border: 1px solid #D8D8D8;
						border-radius: 3px;
						font-size: 13px;
					}
				}
			}
			.select {
				width: 100%;
				text-align: left;
			}
		}
		.foot {
			padding-bottom: 22px;
			.confirm {
				height: 50px;
				width: 90%;
				border-radius: 25px;
				margin: 13px auto;
				line-height: 50px;
				font-size: 18px;
				color: #fff;
				background-color: #ff8201;
			}
			.other {
				background-color: #FFF9EC;
				color: #D6A100;
				border: 1px solid #F9C956;
			}
			.titles {
				font-size: 12px;
				color: #FF0000;
				text-align: left;
				padding: 12px 8px;
				line-height: 20px;
			}
		}
	}
	
	.black_shade {
		position: absolute;
		top: 0;
		z-index: 3000;
		opacity: 0.6;
		background-color: #000;
		width: 100%;
		height: 100vh;
	}
	
	.preventScroll {
		height: 100%;
		overflow: hidden;
	}
	.skip{
		font-size:15px;
		color:#999;
		display:flex;
		align-items:flex-end;
		justify-content:center;
		width:100%;
		height:70px;
	}
	.confirm {
				height: 50px;
				width: 90%;
				border-radius: 25px;
				margin: 13px auto;
				line-height: 50px;
				font-size: 18px;
				color: #fff;
				background-color: #ff8201;
			}
	
	.page-loadmore-wrapper {}
.breed_name {
		padding-left:15px;
        background-color: #fff;
        box-sizing: border-box;
        width: 100%;
        .inbox {
            height: 50px;
            border-bottom: 1px solid #E6E6E6;
            display: flex;
            flex-direction: row;
            align-items: center;
            .breed_left {
                font-size: 15px;
                color: #343434;
                width: 80px;
                text-align: left;
            }
            .breed_center {
                flex: 1;
                text-align: right;
                input{
                	text-align: right;
                }
                .title {
                    width: 100%;
                    color: #8E97A1;
                    text-align: left;
                }
            }
            .img {
                width: 30px;
                img {
                    height: 18px;
                }
            }
        }
        .last {
            padding: 14px 0;
            /*margin-top: 10px;*/
            border-bottom: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            .breed_left {
                font-size: 15px;
                color: #343434;
                width: 80px;
                text-align: left;
            }
            .breed_center {
                flex: 1;
                .title {
                    width: 100%;
                    color: #c6c6c6;
                    text-align: right;
                }
            }
            .img {
                width: 30px;
                img {
                    height: 18px;
                }
            }
        }
    }
  .img {
				width: 100%;
				background-color: #fff;
				margin-bottom: 10px;
				padding: 15px;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.img_box {
					display: inline-block;
					position: relative;
					width: 80px;
					margin-bottom: 15px;
					margin: 0 10px 10px 10px;
					.my_img {
						width: 80px;
						height: 80px;
					}
					.delete {
						position: absolute;
						width: 20px;
						height: 20px;
						top: -10px;
						left: -10px;
					}
					margin-bottom:15px;
				}
				.up_load {
					display: inline-block;
					width: 80px;
					margin-bottom: 15px;
					margin: 0 10px 10px 10px;
				}
				.tips{
					font-size: 10px;
					color: #f00;
					text-align: left;
				}
			}
   .tip{
   		position:absolute;
   		top:50%;
   		left:50%;
   		transform:translate(-50%,-50%);
		width:70%;
		border-radius:8px;
		overflow:hidden;
		
		z-index:1000000;
		background-color:white;
		.title{
			font-size:1.3em;
			line-height:2.9em;
			color:#fdbc6a;

		}
		.content{
			color:#ababab;
			font-size:1em;
			line-height:2.3em;
		}
		.bottom{
			display:flex;
			margin-top:20px;
			.left{
				flex:1;
				background-color:#ececec;
				line-height:2.9em;
				color:#8e8e8e;



			}
			.right{
				flex:1;
				background-color:#f76721;
				line-height:2.9em;
				color:white;
			}

		}
	}
</style>
<template>
	<div class="release_needs" v-bind:class="{preventScroll:obj.sheetVisible || obj.show || obj.tshow}">
		<myHeader :param="param" @back='back'></myHeader>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }" v-bind:class="{preventScroll:obj.sheetVisible  || obj.show || obj.tshow}">
			<div class="top">
				<steps @tostep='tostep' :step = 'step' :steps='steps'></steps>
			</div>
			
			<!-----------------------------产品信息-------------------------->
			<div class="top" v-if='step == 0 || step == 3'>
				<!-- <titles tab="9"></titles> -->
				<needBasic :obj="obj" @select='qualitySelect'  :quality.sync='quality'></needBasic>
			</div>
			<!-----------------------------交货要求-------------------------->
			<div class="top" v-if='step == 1 || step == 3'>
				<!-- <titles tab="6"></titles> -->
				<!---------交货地---------->
				<div class="selectAddress" v-if='!obj.flag'>
					<selectAddress :obj="obj"></selectAddress>
				</div>
				<div class="breed_name" v-else>
		            <div class="inbox" >
		                <div class="breed_left">{{obj.address_name}}</div>
		                 <div >{{obj.address}}</div>
		                
		            </div>
		        </div>

				<!---------截止时间---------->
				<expiryDate :dateArr="dateArr" :obj="obj" :duedate="duedate" v-if='!obj.flag'></expiryDate>
				<div class="breed_name" v-else>
		            <div class="inbox" >
		                <div class="breed_left">截止时间</div>
		                 <div >{{duedatesStr}} {{obj.duedate}}</div>
		                
		            </div>
		        </div>

		        <div class="outbox outbox_nor" v-if='obj.flag' style="margin-bottom:0;">
					
					
					<div class="breed_name">
			            <div class="inbox" >
			                <div class="breed_left">备注信息</div>
			                 <div v-if='obj.flag' style="text-align:left;">{{remarks}}</div>
			                
			            </div>
			        </div>
				</div>
				<div class="breed_name" v-if='obj.flag' style="margin-bottom:-20px;">
			            <div class="inbox" style="border-bottom:none;margin-bottom:0;">
			                <div class="breed_left">参考图片</div>
			                 
			                
			            </div>
			            <div v-if='!imgArr' style="text-align:lefta;margin-left:50px;margin-bottom:25px">暂无</div>
			            <div v-else class="img" style="margin:0;padding:0;">
			            	<div class="img_box" v-for="(todo,index) in imgArr" style="marign:0;padding:0">
								<img :src="todo" class="my_img" style="float:left">
								<img src="/static/icons/upload-delete.png" class="delete" @click="deletes(index)" v-show='!obj.flag'>
							</div>
			            </div>
			            
			        </div>
				<!---------备注信息---------->
				<div class="outbox outbox_nor" >
					
					<div v-if='!obj.flag'>
						<div class="pay">
						<div class="inbox">
							<div class="left">备注信息 <span class='right'>(此为多选)</span></div>
						</div>
					</div>
					<div class="pay pay_nor">
						<div class="inboxs" v-for="(item,index) in remarksArr" @click="description(index)">
							<img src="/static/images/over-select.png" class="radio" v-show="item.show">
							<img src="/static/images/no-select.png" class="radio" v-show="!item.show">
							<div class="content" v-bind:class="item.show ? 'active':''">{{remarksArr[index].one}}</div>
						</div>
					</div>
					</div>
					

				</div>


				
			</div>
			<div class="top" v-if='step == 2'>
				<!-- <titles tab="10"></titles> -->
				<!--上传图片-->
				<div class="selectAddress" style="float:left;width:100%;text-align:left;border-bottom:none;">产品图片<span style="color#999;font-size:10px;">(可添加5张图片)</span></div>
				<div class="img">
					<div class="img_box" v-for="(todo,index) in imgArr">
						<img :src="todo" class="my_img">
						<img src="/static/icons/upload-delete.png" class="delete" @click="deletes(index)" >
					</div>
					<div class="up_load" v-show="imgArr.length !== 5">
						<imageUpload :param="imgArr" v-on:postUrl="getUrl"></imageUpload>
					</div>
					<p class="tips">
						*如果您对您想要购买的药材不是很了解，您可以上传该类型的药材图片，方便您尽快找到货源。
					</p>
					<div class="skip" @click='skip'>跳过》</div>
				</div>
			</div>
			<div class="foot" v-if="myTypes && step == 3">
				<div class="titles">
					* 通过认证后，您发布的需求将会货的大量的曝光！
				</div>
				<div class="confirm other" @click="confirm(1)" v-if="!obj.tshow">
					发布求购并认证
				</div>
				<div class="confirm" @click="confirm(2)" v-if="!obj.tshow">
					发布求购
				</div>
			</div>
			<div class="foot" v-if="!myTypes && step ==3">
				<div class="titles" v-if="userInfor.utype == 2 || userInfor.ctype == 2">
					* 您已通过认证，您发布的需求将会大量曝光！
				</div>
				<div class="confirm" @click="confirm(2)" v-if="!obj.tshow">
					发布求购
				</div>
			</div>
			<div class="confirm" @click='next' v-if='step !=3'>下一步</div>
		</div>
		<authenPopUp :param="Titles" @cancel='cancel'></authenPopUp>
		<div class="tip" v-if='beforeback'>
			<div class="title">警告</div>
			<div class="content">
				<p>此时退出您所填写的资料将全部注销</p>
				<p>确认退出？</p>
			</div>
			<div class="bottom">
				<div class="left" @click='continueWrite'>继续填写</div>
				<div class="right" @click='routerBack'>确认退出</div>
			</div>
		</div>
		<div class="black_shade" v-show="Titles.selectType||beforeback" >
			
		</div>
	</div>
</template>
<script>
	import moment from 'moment';
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import myHeader from '../../components/header/myHeader'
	import authenPopUp from '../../components/popUpType/authenPopUp'
	import imageUpload from '../../components/release/upLoadImgs' /**/
	import httpService from '../../common/httpService.js'
	import needBasic from '../../components/release/needReleaseBasic'
	import steps from '../../components/release/steps'
	import titles from '../../components/release/title'
	import areaJson from '../../common/areaData'
	import selectAddress from '../../components/popUpType/selectAddress'
	import expiryDate from '../../components/release/expiryDate'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				steps:['产品信息','交收要求','需求提示','信息预览'],
				step:0,
				boxInfo: { //默认的弹窗样式
					show: false,
					type: 3,
					img: '/static/icon/list/miao1.png',
					text: '确定发布求购？'
				},
				beforeback:false,
				imgArr: [],
				param: {
					name: '我要买货',
					router: 'home',
					goBack: false
				},
				Titles: {
					myTitle: true,
					selectType: false
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
				remarksArr: [{
					show: false,
					one: '时间紧'
				}, {
					show: false,
					one: '价格适合，立即合作'
				}, {
					show: false,
					one: '现款无账期'
				}, {
					show: false,
					one: '常年有需求，可建立稳固渠道'
				}],
				content: '',
				quality: [{
                    name: '符合药典',
                  show:true,
                }, {
                    name: '硫不超标',
                   show:true,
                }, {
                    name: '无虫蛀',
                    show:true,
                }, {
                    name: '无霉',
                    show:true,
                }, {
                    name: '无变色',
                    show:true,
                }, {
                    name: '无走油',
                   show:true,
                }, {
                    name: '干度好',
                   show:true,
                }, {
                    name: '杂质少',
                   show:true,
                }, {
                    name: '含量够',
                    show:true,
                }],
				obj: {
					flag:false,
					need: true,
					number_id: '',
					update: false,
					drug_name: '',
					spec: '',
					place: '',
					place_id: '',
					number: '',
					number_unit: '',
					selling_point: [],
					name: '',
					phone: '',
					duedates: '',
					duedate:'',
					breedId: '',
					quality: '',
					address: '',
					paymentWay: '',
					paymentWay_index: '',
					sheetVisible: false,
					address_name: '交货地',
					addressProvince: '',
					addressProvinceId: '',
					addressCity: '',
					addressCityId: '',
					addressDistrict: '',
					addressDistrictId: '',
					detailAddr: '',
					tshow: false,
					type_show: false
				},

				id: '',
				payment: '',
				paymentWay: '',
				duedate: '',
				typeIndex: 2,

			}
		},
		computed: {

			
			duedatesStr(){
				let n = parseInt(this.duedate)
				console.log(this.duedate,'===============')
				return moment().add(n,'days').format('YY年MM月DD日')
			},
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
			routerBack(){
				this.step = 0;
				this.beforeback = false
				this.obj.flag = false
				this.quality.forEach((item)=>{
					item.show = true
				})
				this.$router.back()
			},
			continueWrite(){
				this.beforeback = false;
			},
			back(){
				console.log('emit back')
				this.beforeback =  true;
				
			},
			skip(){
				this.obj.flag = true
				this.imgArr = []
				this.step++
				
			},
			qualitySelect(val){
				console.log(val,'/////////////////')
				console.log(this.obj.quality,'--11111111111-------------------')
				// console.log(val,'-------------------------')
				// this.obj.quality = val
			},
			
			tostep(val){
				if(val - 1 > this.step){
					return
				}
				this.step = val - 1
				if(this.step ==3){
					this.obj.flag = true;
					
				}else{
					this.obj.flag = false;
				}
				console.log(1)
				console.log(val)
			},
			next(){
				if(this.step == 0){

					let _self = this;
					let qualityStr = ''
				this.quality.forEach((item)=>{
					if(item.show == false){
						qualityStr += item.name
						qualityStr += ','
					}
				})
				this.obj.quality = qualityStr
				var checkArr = [];
				let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种！');
				checkArr.push(checkBreedId);
				let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格！');
				checkArr.push(checkBreedSpec);
				let checkBreedPlace = validation.checkNull(_self.obj.place_id, '请输入产地！');
				checkArr.push(checkBreedPlace);
				let checkNumber = validation.checkMaxNum(_self.obj.number, '需求数量');
				checkArr.push(checkNumber);
				// let checkUnit = validation.checkMaxNum(_self.obj.number_id, '数量单位');
				// checkArr.push(checkUnit);
				let checkQuality = validation.checkNull(_self.obj.quality, '请选择质量要求！');
				checkArr.push(checkQuality);
				// let checkAddress = validation.checkNull(_self.obj.address, '请选择交货地！');
				// checkArr.push(checkAddress);
				// let checkDuedate = _self.checkDates();
				// checkArr.push(checkDuedate);
				// let checkRemarks = _self.RemarkSelect();
				// checkArr.push(checkRemarks);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				
				console.log(this.obj.quality,'..........................',123)
				}
				else if(this.step ==1){
					let _self = this;
				var checkArr = [];
				
				
				
				let checkAddress = validation.checkNull(_self.obj.address, '请选择交货地！');
				checkArr.push(checkAddress);
				let checkDuedate = _self.checkDates();
				checkArr.push(checkDuedate);
				let checkRemarks = _self.RemarkSelect();
				checkArr.push(checkRemarks);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				}
				if(this.step ==3){
					// this.obj.flag = true;
					return
				}
				this.step++
				if(this.step ==3){
					console.log(3333)
					this.obj.flag = true;
					
				}else{
					this.obj.flag = false;
				}
			},
			deletes(index) {
				let _self = this;
				_self.imgArr.splice(index, 1);
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
			getInfo() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'queryUserInfo',
					biz_param: {},
				};

				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.queryUserInfo(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == "1c01") {
						_self.obj.name = suc.data.biz_result.fullname;
						_self.obj.phone = suc.data.biz_result.phone;
					} else {
						//console.log('cuowusasdada')
					}
				}, function(err) {
					common.$emit('close-load');
				})
			},
			confirm(index) {
				let _self = this;
				var checkArr = [];
				let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种！');
				checkArr.push(checkBreedId);
				let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格！');
				checkArr.push(checkBreedSpec);
				let checkBreedPlace = validation.checkNull(_self.obj.place_id, '请输入产地！');
				checkArr.push(checkBreedPlace);
				let checkNumber = validation.checkMaxNum(_self.obj.number, '需求数量');
				checkArr.push(checkNumber);
				let checkUnit = validation.checkMaxNum(_self.obj.number_id, '数量单位');
				checkArr.push(checkUnit);
				let checkQuality = validation.checkNull(_self.obj.quality, '请选择质量要求！');
				checkArr.push(checkQuality);
				let checkAddress = validation.checkNull(_self.obj.address, '请选择交货地！');
				checkArr.push(checkAddress);
				let checkDuedate = _self.checkDates();
				checkArr.push(checkDuedate);
				let checkRemarks = _self.RemarkSelect();
				checkArr.push(checkRemarks);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				_self.typeIndex = index;

				this.$msgBox.showMsgBox({
					title: '确认发布',
					content: '确定发布该条求购信息',
					isShowCancelImg: '/static/icon/list/miao1.png',
				}).then(async(val) => {
					
					this.release()
				}).catch(() => {});
				_self.boxInfo.show = true;
			},
			description(index) {
				let _self = this;
				if(_self.remarksArr[index].show == false) {
					this.remarksArr[index].show = true;
					this.obj.selling_point.push(index);
				} else {
					this.remarksArr[index].show = false;
					for(var i = 0; i < _self.obj.selling_point.length; i++) {
						if(_self.obj.selling_point[i] == index) {
							_self.obj.selling_point.splice(i, 1);
						}

					}
				}
				console.log(_self.obj.selling_point)
			},
			checkDates() {
				let _self = this;
				let validate = true;
				_self.duedate = '';
				let msg = '';
				let pattern = /^([12][0-9]|30|[1-9])$/;
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
			RemarkSelect() {
				let _self = this;
				_self.remarks = '';
				for(var i = 0; i < _self.obj.selling_point.length; i++) {
					if(i == 0) {
						_self.remarks = _self.remarksArr[_self.obj.selling_point[i]].one;
					} else {
						_self.remarks = _self.remarks + ',' + _self.remarksArr[_self.obj.selling_point[i]].one;
					}
				}
				if(!_self.remarks) {
					return '请选择备注信息';
				}
			},
			cancel(){
				console.log('cancel-------------------')
				this.$router.push("/releaseSuccess?type=2&number=2&id=" + this.id);
			},
			release() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {};
				if(_self.obj.type_show) {
					body = {
						biz_module: 'intentionService',
						biz_method: 'updatehtmlEditBegBuyInfo',
						biz_param: {
							customerId: common.customerId,
							breedName: _self.obj.drug_name,
							spec: _self.obj.spec,
							location: _self.obj.place_id,
							number: _self.obj.number,
							duedate: _self.duedate,
							description: _self.remarks,
							breedId: _self.obj.breedId,
							unit: _self.obj.number_id,
							quality: _self.obj.quality,
							address: _self.obj.address,
							province: _self.obj.addressProvinceId,
							city: _self.obj.addressCityId,
							district: _self.obj.addressDistrictId,
							id: _self.id,
							editImage: _self.imgArr,
						}
					}
				} else {
					body = {
						biz_module: 'intentionService',
						biz_method: 'htmlEditBegBuyInfo',
						biz_param: {
							customerId: common.customerId,
							breedName: _self.obj.drug_name,
							spec: _self.obj.spec,
							location: _self.obj.place_id,
							number: _self.obj.number,
							duedate: _self.duedate,
							description: _self.remarks,
							breedId: _self.obj.breedId,
							unit: _self.obj.number_id,
							quality: _self.obj.quality,
							address: _self.obj.address,
							province: _self.obj.addressProvinceId,
							city: _self.obj.addressCityId,
							district: _self.obj.addressDistrictId,
							editImage: _self.imgArr,
						}
					};
				}
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.needRelease(url, body, function(suc) {
					common.$emit('close-load');
					
					_self.quality.forEach((item)=>{
						item.show = true
					})
					if(suc.data.code == '1c01') {
						common.$emit('message', suc.data.msg);
						common.$emit('informMyPurchase', 'refurbish');
						if(_self.typeIndex == 2) {
							
							_self.obj.flag = false;
								_self.step = 0;
							if(_self.obj.type_show) {
								//发布成功跳转到发布成功页面，缓存和刷新的情况
								//type==1是修改发布，2是正常发布
								//number==1是资源发布，2是求购发布
								common.$emit('inforReleaseSuccess', {
									type: '1',
									number: '2',
									id: _self.id
								})
								_self.$router.push("/releaseSuccess?type=1&number=2&id=" + _self.id);
							} else {
								let id = suc.data.biz_result.intentionId;
								common.$emit('inforReleaseSuccess', {
									type: '2',
									number: '2',
									id: id
								})
								_self.$router.push("/releaseSuccess?type=2&number=2&id=" + id);

							}
						} else if(_self.typeIndex == 1) {
							_self.Titles.selectType = true;
						}

					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getNeedDetail(id) {

				let _self = this;
				_self.obj.flag = false;
				_self.step = 0;
				httpService.getIntentionDetails(common.urlCommon + common.apiUrl.most, {
							biz_module: 'intentionService',
							biz_method: 'queryIntentionInfo',
							biz_param: {
								id: id
							}
						}, function(suc) {
							if(suc.data.code == '1c01') {
								let result = suc.data.biz_result;
								_self.obj.drug_name = result.breedName;
								_self.obj.spec = result.spec;
								_self.obj.place = result.location;
								_self.obj.place_id = result.locationId;
								_self.obj.number = result.number;
								_self.obj.number_unit = result.unit;
								if(result.address) {
									_self.obj.addressProvince = result.address.split(',')[0];
									_self.obj.addressCity = result.address.split(',')[1];
									_self.obj.addressDistrict = result.address.split(',')[2];
								}
								_self.obj.address = result.address;
								_self.obj.quality = result.quality;
								let temp = result.quality.split(',')
								console.log(temp,'temp=================')
								temp.forEach((item)=>{
									_self.quality.forEach((i)=>{
										if(i.name == item){
											i.show = false
										}
									})
								})
								_self.imgArr = [];
//								if(result.image[0].indexOf('yaocaimaimai.png') < 0) {
									for(var i = 0; i < result.image.length; i++) {
										_self.imgArr.push(result.image[i]);
									}
//								}
									let due = result.duedate.split('.')[0];
									if(due) var arr = due.split(/[- : \/]/);
									var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]); /*new Date(result.duedate.split(' ')[0]);*/
									let pub = result.pubdate.split('.')[0];
									if(pub) var arrs = pub.split(/[- : \/]/);
									var pubdateDate = new Date(arrs[0], arrs[1] - 1, arrs[2], arrs[3], arrs[4], arrs[5]);
									var dateValue = duedateDate.getTime() - pubdateDate.getTime();
									var days = Math.floor(dateValue / (24 * 3600 * 1000));
									if(days != 7 && days != 15 && days != 30) {
										_self.dateArr[3].show = true;
										if(days > 0) _self.dateArr[3].one = days;
										if(days < 0) _self.dateArr[3].one = 0;
									} else {
										switch(days) {
											case 7:
												_self.dateArr[0].one = days;
												_self.dateArr[0].show = true;
												break;
											case 15:
												_self.dateArr[1].one = days;
												_self.dateArr[1].show = true;
												break;
											case 30:
												_self.dateArr[2].one = days;
												_self.dateArr[2].show = true;
												break;
										}
									}
									if(result.description) _self.getRemark(result.description);
									_self.id = result.id;
									_self.obj.breedId = result.breedId;
									common.$emit("Needrelease", {
										breedName: result.breedName,
										breedId: result.breedId
									})

								} else {
									common.$emit('message', suc.data.msg);
								}

							},
							function(err) {
								common.$emit('message', err.data.msg);
							})

					},
					getDate(myDate) {
						let _self = this;
						myDate = myDate.split('.')[0];
						let toDay = new Date();
						toDay = toDay.getTime();

						let due = new Date(myDate);
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
					getRemark(remark) {
						let _self = this;
						_self.obj.selling_point = [];
						let remarks = remark.split(',')
						for(var i = 0; i < remarks.length; i++) {
							switch(remarks[i]) {
								case '时间紧':
									_self.remarksArr[0].show = true;
									break;
								case '价格适合，立即合作':
									_self.remarksArr[1].show = true;
									break;
								case '现款无账期':
									_self.remarksArr[2].show = true;
									break;
								case '常年有需求，可建立稳固渠道':
									_self.remarksArr[3].show = true;
									break;
							}
							_self.obj.selling_point.push(i);
						}
					},
					selectType(id) {
						let _self = this;
						if(id == '1') {
							_self.obj.type_show = false;
							_self.param.goBack = true;
						} else {
							_self.obj.type_show = true;
							_self.param.goBack = false;
							_self.getNeedDetail(id);
						}
					},
					cancelTitle() {
						let _self = this;
						_self.Titles.selectType = false;
					}

			},
			components: {
				myHeader,
				needBasic,
				selectAddress,
				authenPopUp,
				expiryDate,
				titles,
				imageUpload,
				steps,
			},
			created() {
				let _self = this;
				_self.step = 0;
				console.log(this.step,'11111111111111111111111111')
				
				if(_self.$route.params.id) {
					this.id = _self.$route.params.id;
					this.selectType(this.id);
				}
				_self.$store.dispatch('getUserInfor');
				common.$on('inforReleases', function(item) {
					_self.obj.drug_name = '';
					_self.obj.spec = '';
					_self.obj.place = '';
					_self.obj.number = '';
					_self.obj.number_unit = '公斤';
					_self.obj.duedate = '';
					_self.obj.quality = '';
					_self.obj.address = '';
					_self.obj.addressProvince = '';
					_self.obj.addressCity = '';
					_self.obj.addressDistrict = '';
					_self.id = '1';
					_self.imgArr = [];
					_self.obj.paymentWay = '';
					_self.obj.duedate = '';
					_self.obj.type_show = false;
					_self.param.goBack = true; //正常发布返回键回首页
					_self.obj.selling_point = [];
					for(var i = 0; i < 4; i++) {
						_self.dateArr[i].show = false;
						if(i == 3) _self.dateArr[i].one = '';
						_self.remarksArr[i].show = false;
					}
					_self.$store.dispatch('getUserInfor');
				})
				common.$on("purchase-id", function(item) {
					for(var i = 0; i < 4; i++) {
						_self.dateArr[i].show = false;
						if(i == 3) _self.dateArr[i].one = '';
						_self.remarksArr[i].show = false;
					}

					_self.getNeedDetail(item);
					_self.$store.dispatch('getUserInfor');
					_self.obj.type_show = true;
					_self.param.goBack = false; //修改求购返回键不回首页
					_self.id = item;
				})

			},
			destroyed(){
				console.log('destroyed=====================')
			},
			mounted() {
				this.step = 0
				this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			}
		}
</script>