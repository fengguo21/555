<style lang="less" scoped>
	.contain {
		height: 100%;
		position: relative;
		.tips {
			padding: 30px 0 10px;
			font-size: 14px;
			line-height: 30px;
			span {
				display: block;
				color: #ff8201;
			}
		}
		.address {
			position: relative;
			input {
				border: 0;
				box-shadow: 0 0 1px 0 #e6e6e6;
				padding: 15px 5px 15px 15%;
				outline: none;
				width: 100%;
			}
			img {
				position: absolute;
				left: 5%;
				width: 5%;
				top: 15px;
			}
		}
		.msgTips {
			font-size: 14px;
			text-align: left;
			padding: 10px 0 0 5%;
			font-size: 10px;
			color: #999;
			line-height: 30px;
		}
		.img {
			width: 100%;
			background-color: #fff;
			padding: 15px;
			.img_box {
				display: inline-block;
				position: relative;
				.my_img {
					width: 190px;
					height: 138px;
					border-radius: 15px;
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
				width: 190px;
				height: 138px;
				overflow: hidden;
			}
			.reference {
				p {
					width: 300px;
					padding: 10px 50px;
					display: inline-block;
					text-align: left;
				}
				img {
					width: 100px;
					&:nth-of-type(odd) {
						margin-right: 20px;
					}
				}
			}
		}
		.button {
			width: 100vw;
			position: absolute;
			bottom: 2vh;
			button {
				width: 92%;
				line-height: 50px;
				background-color: #ccc;
				border: 0;
				border-radius: 50px;
				margin-top: 10px;
				color: #fff;
				font-size: 20px;
				pointer-events: none;
				&.active {
					background-color: #FF8201;
					pointer-events: auto;
				}
			}
			.sign {
				margin-top: 10px;
				.check {
					display: inline-block;
					width: 12px;
					height: 12px;
					border: 1px solid #ccc;
					&.active {
						border: 1px solid #FF8201;
						background: url(/static/icon/list/duihao.png) no-repeat;
						background-size: 100% auto;
						background-position: center center;
					}
				}
				.word {
					color: #ccc;
				}
			}
		}
	}
</style>

<template>
	<modelPage :title="my_header">
		<div class="contain" slot='contain'>
			<p class="tips">
				<span>感谢您申请药贷宝</span>
				<span>请完善以下信息加快我们的审核速度</span>
			</p>
			<p class="msgTips">您的经营地址或您的种植地址</p>
			<p class="address">
				<input v-model="address" placeholder="请输入企业所在地址" type="text" />
				<img src="/static/icon/register/position.png" alt="" @click="getPhoneInfo()" />
				<!--<span @click="getPhoneInfo()">自动获取</span>-->
			</p>
			<p class="msgTips">请上传您的店铺照片或种植地照片</p>
			<div class="img">
				<div class="img_box" v-for="(todo,index) in imgArr">
					<img :src="todo" class="my_img">
					<img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
				</div>
				<div class="up_load" v-show="imgArr.length !== 1">
					<imageUpload :images="loadImage" :param="imgArr" v-on:postUrl="getUrl"></imageUpload>
				</div>
				<div class="reference">
					<p>示例：</p>
					<img src="/static/icon/register/reference2.png" alt="" @click="getPhoneInfo()" />
					<img src="/static/icon/register/reference1.png" alt="" @click="getPhoneInfo()" />
				</div>
			</div>
			<div class="button">
				<p class="sign">
					<i class="check" :class="signStatus?'active':''" @click="checkSign()"></i>
					<span class="word">我已同意《<span  style="color:#FF8201 ;" @click="goProtocol('/protocolForYdb')">药贷宝</span>》相关协议</span>
				</p>
				<button :class="signStatus?'active':''" @click="checkMsg()">申请开通</button>

			</div>
		</div>
	</modelPage>
</template>

<script>
	import modelPage from '../../components/model/modelPage'
	import imageUpload from '../../components/release/upLoadImgs'
	import validation from '../../validation/validation.js'
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				my_header: {
					name: '申请药贷宝',
				},
				signStatus: false,
				imgArr: [],
				loadImage: '/static/icon/register/load-image.png',
				imgString: '',
				address: '',
			}
		},
		components: {
			modelPage,
			imageUpload
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			}
		},
		methods: {
			goProtocol(url) {
				let _self = this;
				_self.$router.push(url);
			},
			deletes(index) {
				let _self = this;
				_self.imgArr.splice(index, 1);
			},
			getUrl(param) {
				console.log(1, param)
				let _self = this;
				if(this.imgArr.length <= 1) {
					if(param.url) _self.imgArr.push(param.url);
				}
			},
			checkSign() {
				let _self = this;
				_self.signStatus = _self.signStatus ? false : true;
			},
			checkMsg() {
				let _self = this;

				_self.imgString = _self.imgArr.toString()
				var checkArr = [];
				let checkaddress = validation.checkNull(_self.address, '请先填写地址！');
				checkArr.push(checkaddress);
				let checkimgArr = validation.checkNull(_self.imgString, '请先上传图片！');
				checkArr.push(checkimgArr);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				_self.openYdb()
			},

			openYdb() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'ydbService',
					biz_method: 'addAccount',
					biz_param: {
						operateImage: _self.imgString,
						address: _self.address,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.queryEmployeeInfo(url, body, function(suc) {
					common.$emit('close-load');
					common.$emit('message', suc.body.msg);
					if(suc.body.code == '1c01') {
						_self.goto();
					}else if(suc.body.msg == '您已申请药贷宝，请勿重复申请'){
							_self.goto();
					}else{
						window.history.go(-1);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			goto() {
				
				let _self = this;
				_self.$store.dispatch('getUserInfor');
				setTimeout(function() {
					console.log(_self.userInfor.ydbStatus)
					if(_self.userInfor.ydbStatus != 20) {
						common.$emit('setParam', 'router', 'applyLendStep')
						common.$emit("applyLendStep", 1)
						_self.$router.replace('applyLendStep');
					} else {
						common.$emit('setParam', 'router', 'lendMoney')
						common.$emit("lendMoney", 1)
						_self.$router.replace('lendMoney');
					}

				}, 0)
			},
			getPhoneInfo() {
				let _self = this;
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						getAddress(r.point);
					}
				});
				//获取地址信息，设置地址label
				function getAddress(point) {
					var gc = new BMap.Geocoder();
					gc.getLocation(point, function(rs) {
						_self.address = rs.address
						console.log(rs.address)
					});
				}
			}
		},
		created() {
			let _self = this;
			common.$on("ydbApply", function() {
				_self.imgArr = [];
			})
			this.getPhoneInfo()
		}
	}
</script>