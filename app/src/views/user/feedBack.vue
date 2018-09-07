<style lang="less" scoped>
	.feed_back {
		.bg_white {
			margin-top: 0px;
			overflow: scroll;
			width: 100%;
			overflow-y: visible;
			overflow-x: hidden;
			background: #f3f3f3;
			.contain {
				padding-bottom: 120px;
				min-height: 100%;
				position: relative;
				.main {
					padding: 2rem 1.5rem 0 1.5rem;
					background: white;
					margin-bottom: 1rem;
					.title {
						text-align: left;
						font-size: 16px;
						color: #333;
						line-height: 30px;
					}
					.list {
						display: flex;
						margin-bottom: 10px;
						li {
							flex: 1;
							margin-right: 20px;
							height: 35px;
							line-height: 35px;
							&.nomargin {
								margin-right: 0px;
							}
							.item {
								text-align: center;
								border: 1px solid #e6e6e6;
								color: #666;
								&.active {
									border: 1px solid #fff;
									color: #FF8201;
									background: url(/static/icon/list/border.png) no-repeat;
									background-size: 100% 100%;
									background-position: center center
								}
							}
						}
					}
					.text {
						width: 100%;
						height: 120px;
						margin-bottom: 10px;
						position: relative;
						textarea {
							height: 120px;
							width: 100%;
							border: none;
							padding: 10px;
						}
						.record {
							position: absolute;
							bottom: 10px;
							right: 10px;
						}
						.active {
							color: red;
						}
					}
					.img {
						width: 100%;
						background-color: #fff;
						padding: 0 15px 15px;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						.img_box {
							position: relative;
							margin: 0 2.3076rem 1.1538rem 0;
							.my_img {
								width: 6.1538rem;
								height: 6.1538rem;
							}
							.delete {
								position: absolute;
								width: 1.5384rem;
								height: 1.5384rem;
								top: -0.7692rem;
								left: -0.7692rem;
							}
						}
						.up_load {
							width: 80px;
							height: 80px;
						}
					}
				}
				.info_contain {
					overflow: hidden;
					.info {
						width: 100%;
						padding: 0 4%;
						background: white;
						float: left;
						margin-bottom: 1rem;
						.info_top {
							float: left;
							width: 100%;
							background: white;
							p {
								float: left;
								height: 50px;
								line-height: 50px;
							}
							input {
								float: right;
								border: none;
								outline: none;
								height: 50px;
								text-align: right;
							}
						}
						.clear {
							clear: both;
						}
					}
				}
			}
		}
		.confirm_submit {
			height: 70px;
			width: 100%;
			padding: 5px 10px;
			font-size: 1.7rem;
			text-align: center;
			line-height: 50px;
			position: absolute;
			bottom: 0;
			z-index: 99;
			div {
				background-color: #ff8201;
				color: white;
				border-radius: 50px;
			}
		}
	}
</style>
<template>
	<div class="feed_back">
		<myHeader :param="my_header"></myHeader>
		<div class="bg_white" :style="{ height: wrapperHeight + 'px' }">

			<div class="contain">
				<div class="main">
					<p class="title">您的反馈是</p>
					<ul class="list">
						<li v-for="(item,index) in list" :class="index==2? 'nomargin':''" @click="change(index)">
							<p class="item" :class="item.status ? 'active':''">{{item.name}}</p>
						</li>
					</ul>
					<div class="text">
						<textarea placeholder="致力于为您提供专业、高效、高品质的服务，欢迎您提供宝贵的意见和建议" v-model="content"></textarea>
					</div>
					<div class="img">
						<div class="img_box" v-for="(todo,index) in imgArr">
							<img :src="todo" class="my_img">
							<img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
						</div>
						<div class="up_load" v-show="imgArr.length !== 3">
							<imageUpload :param="imgArr" :keyName="keyName" v-on:postUrl="getUrl"></imageUpload>
						</div>
					</div>
				</div>
				<div class="info_contain">
					<div class="info">
						<div class="info_top info_bottom">
							<p>姓名</p>
							<input type="text" placeholder="请输入" v-model="param.name">
						</div>
					</div>
					<div class="info">
						<div class="info_top">
							<p>联系方式</p>
							<input type="text" placeholder="请输入" v-model="param.phone">
						</div>
					</div>
					<div class="clear"></div>
				</div>

				<div class="confirm_submit" v-on:click="confirmSubmit">
					<div>确认提交</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import imageUpload from '../../components/release/upLoadImgs'
	export default {
		data() {
			return {
				keyName: 'user',
				wrapperHeight: '',
				my_header: {
					name: '意见反馈'

				},
				list: [{
					name: '咨询',
					type: 1,
					status: false
				}, {
					name: '建议',
					type: 2,
					status: false
				}, {
					name: '其他',
					type: 0,
					status: true
				}],
				param: {
					content: '',
					name: '',
					phone: ''
				},
				content: '',
				content_length: 0,
				show: false,
				img_src: '/static/images/3.jpg',
				imgArr: [],
				todos: {},
				feedType: 0,

			}
		},
		components: {
			myHeader,
			imageUpload
		},
		watch: {
			content: function(newValue, oldValue) {
				console.log(newValue.length);
				let _self = this;
				_self.content_length = newValue.length;
				if(newValue.length >= 200) {
					//					_self.show = true;
					this.$toast('内容限制200字以内')

				} else {
					_self.show = false;
				}
			}
		},
		methods: {
			confirmSubmit: function() {
				let _self = this;
				let checkArr = [];
				let checkContent = validation.checkNull(_self.content, '反馈内容为空！');
				checkArr.push(checkContent);
				let checkLookContent = validation.checkLook(_self.content);
				checkArr.push(checkLookContent);
				let checkName = validation.checkNull(_self.param.name, '姓名为空！');
				checkArr.push(checkName);
				let checkLookName = validation.checkLook(_self.param.name);
				checkArr.push(checkLookName);
				let checkPhone = validation.checkPhone(_self.param.phone);
				checkArr.push(checkPhone);

				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return
					}
				}
				this.$msgBox.showMsgBox({
					title: '意见反馈',
					content: '确认提交以上信息',
					isShowCancelImg: '/static/icon/list/miao4.png',
				}).then(async(val) => {
					submit()
				}).catch(() => {});

				function submit() {
					common.$emit('show-load');
					let url = common.addSID(common.urlCommon + common.apiUrl.most);
					let body = {
						biz_module: 'userSuggestService',
						biz_method: 'submitSuggest',
						biz_param: {
							name: _self.param.name,
							content: _self.content,
							suggestImage: _self.imgArr,
							phone: _self.param.phone,
							suggestType: _self.feedType
						}
					};
					console.log(body.biz_param)
					body.time = Date.parse(new Date()) + parseInt(common.difTime);
					body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
					httpService.queryUserInfo(url, body, function(response) {
						common.$emit('close-load');
						if(response.data.code == '1c01') {
							window.history.go(-1);
							common.$emit('message', response.data.msg);
						} else {
							common.$emit('message', response.data.msg);
						}
					}, function(err) {
						common.$emit('close-load');
						common.$emit('message', err.data.msg);
					})
				}

			},
			getUrl(param) {
				console.log(1, param)
				//this.imgArr.push(param.url);
				let _self = this;
				if(this.imgArr.length <= 3) {
					if(param.url) _self.imgArr.push(param.url);
					if(_self.imgArr.length == 3) {
						common.$emit('message', '最多只能上传3张图片！')
					}
				}
			},
			change(index) {
				let _self = this;
				for(var i = 0; i < _self.list.length; i++) {
					_self.list[i].status = false;
				}
				_self.list[index].status = true;
				_self.feedType = _self.list[index].type;

			},
			deletes(index) {
				let _self = this;

				// function deletImgs() {
				_self.imgArr.splice(index, 1);
				// }
				// common.$emit("confirm", {
				//     message: '确定删除？',
				//     title: '提示',
				//     ensure: deletImgs
				// });

			},
			getInfo() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'queryUserInfo',
					biz_param: {}
				};

				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				console.log(common.difTime);
				console.log(body.time);
				console.log('sssss');
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.queryUserInfo(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == "1c01") {
						_self.param.name = suc.data.biz_result.fullname;
						_self.param.phone = suc.data.biz_result.phone;

					} else {
						console.log('cuowusasdada')
					}

				}, function(err) {
					common.$emit('close-load');
				})
			}
		},
		created() {
			let _self = this;
			if(common.KEY) _self.getInfo();
			common.$on('informFeedBack', function(item) {
				_self.content = '';
				_self.imgArr = [];
				for(var i = 0; i < _self.list.length; i++) {
					_self.list[i].status = false;
					if(i == 2) _self.list[i].status = true;
				}

				if(common.KEY) _self.getInfo();

			})
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - 50;
		}
	}
</script>