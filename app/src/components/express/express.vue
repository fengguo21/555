<style lang="less">
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: #ccc !important;
		opacity: 1 !important;
		font-size: 12px !important;
	}
	
	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: #ccc !important;
		opacity: 1 !important;
		font-size: 12px !important;
	}
	
	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: #ccc !important;
		opacity: 1 !important;
		font-size: 12px !important;
	}
	
	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: #ccc !important;
		opacity: 1 !important;
		font-size: 12px !important;
	}
	
	#express {
		height: 100vh;
		.list_box {
			padding: 20px 0;
			.list {
				padding: 0 10px;
				height: 45px;
				font-size: 18px;
				line-height: 45px;
				display: flex;
				background-color: #fff;
				border-top: 1px solid #e6e6e6;
				&.last {
					border-bottom: 1px solid #e6e6e6;
					.express_num {
						text-align: right;
						border: 0;
						font-size: 16px;
						line-height: 20px;
					}
				}
				span {
					flex: 1;
					&.company {
						color: #333;
						font-size: 16px;
					}
					&:nth-child(1) {
						text-align: left;
					}
					&:nth-child(2) {
						text-align: right;
						font-size: 12px;
						color: #ccc;
						.to {
							color: #000;
							margin-left: 10px;
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
					position: relative;
					margin-right: 30px;
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
					width: 80px;
					height: 80px;
				}
			}
		}
		.buttom {
			height: 45px;
			background-color: #FF8201;
			width: 100%;
			line-height: 45px;
			position: absolute;
			bottom: 0;
		}
	}
</style>

<template>
	<div id="express">
		<myHeader :param="param"></myHeader>
		<div class="list_box">
			<div class="list">
				<span>快递公司</span>
				<span @click="choosExpress()">
					<span v-if="!expressInfo.name">选择快递公司<span class="to">></span></span>
				<span v-if="expressInfo.name" class="company">{{expressInfo.name}}({{expressInfo.code}})</span>
				</span>
			</div>
			<div class="list last">
				<span>快递公司</span>
				<input class="express_num" type="number" v-model="expressId" placeholder="请输入单号" />
			</div>
		</div>
		<div class="list_box">
			<div class="list">
				<span>发票单号</span>
				<span>请上传发货凭证&emsp;</span>
			</div>
			<!--上传图片-->
			<div class="img">
				<div class="img_box" v-for="(todo,index) in imgArr">
					<img :src="todo" class="my_img">
					<img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
				</div>
				<div class="up_load" v-show="imgArr.length !== 3">
					<imageUpload :param="imgArr" v-on:postUrl="getUrl"></imageUpload>
				</div>
			</div>
		</div>
		<div class="buttom" @click="comfirm">确认寄样</div>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import imageUpload from '../../components/release/upLoadImgs'
	import validation from '../../validation/validation.js'
	export default {
		data() {
			return {
				imgArr: [],
				param: {
					name: '立即寄样',
				},
				expressInfo: [],
				expressId: '',
				offerId: '',
			}
		},
		props: {},
		computed: {},
		components: {
			myHeader,
			imageUpload
		},
		methods: {
			deletes(index) {
				let _self = this;
				_self.imgArr.splice(index, 1);

			},
			getUrl(param) {
				let _self = this;
				if(this.imgArr.length <= 3) {
					if(param.url) _self.imgArr.push(param.url);
					if(_self.imgArr.length == 3) {
						common.$emit('message', '最多可上传3张图片！')
					}
				}
			},
			choosExpress() {
				let _self = this;
				_self.$router.push('/expressList');
			},
			//			确认寄样
			comfirm() {
				let _self = this;
				var checkArr = [];
				let checkExpressName = validation.checkNull(_self.expressInfo.name, '请先选择快递公司');
				checkArr.push(checkExpressName);
				let checkExpressId = validation.checkNull(_self.expressId, '请先填写快递单号');
				checkArr.push(checkExpressId);
				let count = '请上传图片';
				for(let i = 0; i < _self.imgArr.length; i++) {
					if(_self.imgArr[i]) {
						count = false;
					}
				}
				if(count) {
					checkArr.push(count);
				}

				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				this.uploading()

			},
			uploading() {
				let _self = this;
				let id = _self.$route.params.id;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'sendSampleLogisticsService',
					biz_method: 'submitSampleExpressInfo',
					biz_param: {
						offerId: id,
						logistics: _self.expressInfo.name,
						expressNumber: _self.expressId,
						deliverImage: _self.imgArr
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.begBuyList(url, body, function(suc) {
					common.$emit('close-load');
					common.$emit('myOfferToOfferDetail');
					window.history.go(-1);
				}, function(err) {
					common.$emit('close-load');

				})
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {
			var _self = this;

			common.$on("express", function(item) {
				_self.expressInfo = item;
			});
		}
	}
</script>