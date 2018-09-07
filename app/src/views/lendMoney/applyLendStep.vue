<style lang="less">
	.applyLendStep {
		height: 100%;
		.main {
			float: left;
			width: 100%;
			background-color: #fff;
			padding: 10px 0;
			margin: 0 0 10px;
			img {
				height: 60px;
			}
			.status {
				font-size: 17px;
				color: #ff8201;
				line-height: 37px;
			}
		}
		.contain {
			height: 100vh;
			padding-top: 180px;
			.box_contain {
				width: 100%;
				overflow-x: auto;
				background-color: #fff;
				height: 100%;
				padding: 20px 0;
				.item {
					min-height: 100px;
					display: flex;
					color: #ccc;
					&.other {
						color: #fa851b;
						.center {
							i {
								background: #fa851b url(/static/icon/new/jiantou3x.png) no-repeat;
								background-size: 100% 100%;
							}
						}
					}
					.left {
						float: left;
						width: 20vw;
						font-size: 17px;
					}
					.center {
						width: 15px;
						margin-right: 5vw;
						i {
							display: block;
							width: 15px;
							height: 15px;
							float: left;
							background-color: #ccc;
							border-radius: 100px;
						}
						span {
							display: block;
							width: 2px;
							background-color: #ccc;
							height: 100%;
							margin-left: 7px;
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="applyLendStep">
		<div style="float: left;height: 50px;width: 100%;">
			<my-header :param="my_header"></my-header>
		</div>
		<div class="main">
			<img src="/static/icon/new/computer.png" alt="" />
			<p class="status">{{status | statusGet}}</p>
		</div>
		<div class="contain">
			<div class="box_contain">
				<div class="item other" v-for="(item,index) in list" v-if="index == 0">
					<div class="left">
						<p>{{item.ctime | timeDayGet}}</p>
						<p>{{item.ctime | timeTimeGet}}</p>
					</div>
					<div class="center">
						<i></i>
						<span></span>
					</div>
					<div class="right">
						<p>{{item.status | statusGet}}</p>
						<p>{{item.ctime | statusContainGet}}</p>
					</div>
				</div>
				<div class="item" v-for="(item,index) in list" v-if="index !== 0">
					<div class="left">
						<p>{{item.ctime | timeDayGet}}</p>
						<p>{{item.ctime | timeTimeGet}}</p>
					</div>
					<div class="center">
						<i></i>
						<span></span>
					</div>
					<div class="right">
						<p>{{item.status | statusGet}}</p>
						<p>{{item.ctime | statusContainGet}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import myHeader from '../../components/header/myHeader'
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	export default {
		data() {
			return {
				my_header: {
					name: '申请详情',
				},
				status: '',
				list: [],
			}
		},
		props: {},
		computed: {},
		components: {
			myHeader
		},
		methods: {
			//通用数据请求
			getHttp() {
				let _self = this;
				let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
				let otherbody = {
					biz_module: 'ydbService',
					biz_method: 'queryYdbAccountTrack',
					biz_param: {}
				};
				otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
				otherbody.sign = common.getSign('biz_module=' + otherbody.biz_module + '&biz_method=' + otherbody.biz_method + '&time=' + otherbody.time);
				httpService.queryEmployeeInfo(otherurl, otherbody, function(suc) {
					console.log(suc)
					if(suc.body.code == '1c01') {
						_self.list = suc.body.biz_result.list;
						_self.status = _self.list[0].status
					} else {

					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {
			let _self = this;
			_self.getHttp();
			common.$on("applyLendStep", function(item) {
					_self.getHttp();
			})
		}
	}
</script>