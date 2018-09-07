<!--http://192.168.1.188:8082/#/qrcode/59e74891d95e0923f92ca34b-->

<template>
	<div id="qrcode">
		<div v-show="!my_param.show">
			<div class="header">{{header.title}}</div>
			<ul>
				<li class="last"><span>发布日期</span><span v-if="obj">{{obj.ctime | timechoose}}</span></li>
			</ul>
			<ul>
				<li><span>样品名称</span><span v-if="obj">{{obj.breedName}}</span></li>
				<li><span>样品ID</span><span v-if="obj">{{obj.id}}</span></li>
				<li><span>产地</span><span v-if="obj">{{obj.locationName | locationName}}</span></li>
				<li><span>样品所在地</span><span v-if="obj">{{obj.currentSampleLocation}}</span></li>
				<li><span>货物所在地</span><span v-if="obj">{{obj.sampleLocation}}</span></li>
				<li><span>样品来源</span><span v-if="obj">{{obj.source | source}}</span></li>
				<li><span>样品规格</span><span v-if="obj">{{obj.spec}}</span></li>
				<li><span>供应商ID</span><span v-if="obj">{{obj.supplerId}}</span></li>
				<li class="last"><span>供应商名称</span><span v-if="obj">{{obj.supplerName}}</span></li>
			</ul>
			<ul>
				<li class="last"><span>样品图片：</span><span></span></li>
				<div v-if="obj" class="image-box">
					<div class="image" v-for="(item,index) in obj.imageArray">
						<img :src="obj.imageArray[index]" @click="popUp(obj.imageArray[index])" />
					</div>

				</div>

			</ul>
			<ul>
				<li class="last"><span>操作记录：</span><span></span></li>
				<div v-if="obj" class="record" v-for="(item , index) in record">
					<div class="time">{{item.ctime | timechoose}}</div>
					<div class="done">{{item.description}}</div>
				</div>

			</ul>
		</div>
		<popUpBigImg :param="my_param" v-show="my_param.show"></popUpBigImg>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import popUpBigImg from '../tools/popUpBigImg'
	export default {
		data() {
			return {
				header: {
					title: '样品详情'
				},
				my_param: {
					url: '',
					show: false,
					whole_height: ''
				},
				obj: '',
				record: [],
			}
		},
		methods: {
			getHttp(id) {
				//				erpOfferSampleService queryOfferSampleList
				var _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'erpOfferSampleService',
					biz_method: 'queryOfferSampleList',
					biz_param: {
						id: id
					}
				};
//				body.time = Date.parse(new Date()) + parseInt(common.difTime);
//				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addCart(url, body, function(suc) {
					if(suc.body.code == '1c01') {
						if (suc.body.biz_result.list.length !== 0) {
							_self.obj = suc.body.biz_result.list[0];
						} else{
							common.$emit('message', '暂无该样品信息');
						}
						
					} else {
						common.$emit('message', suc.body.msg);
					}

				}, function(err) {

				})
			},
			getRecord(id) {
				//				erpOfferSampleService queryOfferSampleList
				var _self = this;
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'erpBusinessTrackingService',
					biz_method: 'queryBusinessTrackingList',
					biz_param: {
						serviceId: id,
						type: 3,
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addCart(url, body, function(suc) {
					if(suc.body.code == '1c01') {
						_self.record = suc.body.biz_result.list;
					} else {
						common.$emit('message', suc.body.msg);
					}

				}, function(err) {

				})
			},
			popUp(imgArr) {
				let _self = this;
				let imagesArr = [];
				imagesArr.push(imgArr)
				this.my_param.url = imagesArr;
				this.my_param.show = !this.my_param.show;
				this.my_param.whole_height = document.documentElement.clientHeight;
			},

		},
		components: {
			popUpBigImg
		},
		created() {
			var _self = this;
			_self.obj = [];
			let id = _self.$route.params.id;
			_self.getHttp(id);
			_self.getRecord(id)
		},
		mounted() {

		}
	}
</script>

<style lang="less">
	#qrcode {
		position: relative;
		.header {
			height: 48px;
			background-color: #FF8200;
			font-size: 16px;
			line-height: 48px;
			font-weight: bold;
			color: #fff;
		}
		ul {
			border: 1px solid #e6e6e6;
			margin: 10px;
			border-radius: 10px;
			li {
				display: flex;
				-ms-flex-direction: row;
				flex-direction: row;
				line-height: 15px;
				text-align: left;
				border-bottom: 1px solid #E6E6E6;
				padding: 10px;
				&.last {
					border-bottom: 0;
				}
				span {
					&:nth-child(1) {
						font-size: 15px;
						color: #343434;
						width: 100px;
					}
					&:nth-child(2) {
						flex: 1;
						font-size: 13px;
						color: #494949;
						word-break: break-all;
					}
				}
			}
			.image-box {
				text-align: left;
				padding: 0px 10px 10px;
				.image {
					display: inline-block;
					/*width: 100px;

					vertical-align: middle;*/
					width: 100px;
					height: 100px;
					position: relative;
					margin: 0 auto;
					overflow: hidden;
				}
				img {
					width: 100%;
					min-height: 100px;
					position: absolute;
					left: 50%;
					top: 50%;
					margin: 5px;
					transform: translate(-50%, -50%);
				}
			}
			.record {
				padding: 0px 10px 10px;
				text-align: left;
			}
		}
	}
</style>