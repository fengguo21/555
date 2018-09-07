<template>
	<div id="trendChart">
		<myHeader :param="param"></myHeader>
		<div class="ceng">
			<div class="background">
				<div class="box" :class="item.active?'active':''" v-for=" (item,index) in change" @click="changeActive(index)">{{item.name}}</div>
			</div>
		</div>

		<div id="myChart" style="width: 100%;height: 300px;"></div>
		<div class="infoBox">
			<div class="infor">
				<p>品名</p>
				<p>{{goodInfo.name}}</p>
			</div>
			<div class="infor">
				<p>规格</p>
				<p>{{goodInfo.spec}}</p>
			</div>
			<div class="infor">
				<p>产地</p>
				<p>{{goodInfo.location}}</p>
			</div>
			<div class="infor last">
				<p>市场</p>
				<p>{{goodInfo.areaList[0]}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	export default {
		name: 'hello',
		data() {
			return {
				change: [{
					name: '周走势',
					active: true,
				}, {
					name: '月走势',
					active: false,
				},{
					name: '年走势',
					active: false,
				}],
				param: {
					name: '走势图',
					background: true,
					bigImg:true,
				},
				goodInfo: {
					name: '',
					breedId: '',
					location: '',
					areaList: [],
					endTime: '',
					startTime: '',
				},
				option: {
					backgroundColor: 'linear-gradient(to right, #ff5b27, #fd7652)', //背景色
					title: {
						text: '元/公斤',
						textStyle: {
							color: '#fff',
							fontSize: '10'
						}
					},
					tooltip: {
						// trigger: 'axis'
					},
					legend: {
						// data:['邮件营销']
					},
					grid: {
						top: '15%',
						left: '5%',
						right: '5%',
						bottom: '5%',
						containLabel: true
					},
					xAxis: {
						//  改变x轴颜色
						axisLine: {
							show: true,
							lineStyle: {
								color: '#ff5d2a',
								//                            width:8,//这里是为了突出显示加上的，可以去掉
							}
						},
						splitLine: {
							show: false,
						},
						//  改变x轴字体颜色和大小
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize: '10'
							},
						},
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},

					yAxis: {

						type: 'value',
						name: '元/公斤',
						splitLine: {
							show: false,
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#ff5d2a',
								//                            width:8,//这里是为了突出显示加上的，可以去掉
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize: '10'
							},
						},
					},
					series: [{
						name: '元/公斤',
						type: 'line',
						stack: '',
						symbol: 'none', //隐藏圆点
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#fff'
								}
							}
						},
						data: []
					}]
				},
			}
		},
		components: {
			myHeader,
		},
		mounted() {

		},
		methods: {
			//通用数据请求
			getHttp() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'breedService',
					biz_method: 'breedPriceChat',
					biz_param: _self.goodInfo
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.begBuyList(url, body, function(suc) {
					let result = suc.body.biz_result.list;
					_self.option.xAxis.data = [];
					_self.option.series[0].data = [];
					let data = [];
					for(var i = 0; i < result.length; i++) {
						let date = result[i].pricaDate
						let pricaDate = result[i].pricaDate.split('-')[1] + '/' + result[i].pricaDate.split('-')[2]
						_self.option.xAxis.data.unshift(pricaDate);
						_self.option.series[0].data.unshift(result[i].showDate[0].unitprice)
					}

					_self.drawLine();
				}, function(err) {

				})
			},
			changeActive(index) {
				var _self = this;
				for(var i = 0; i < _self.change.length; i++) {
					_self.change[i].active = false;
				}
				if(index == 1) {
					var myDate = new Date();
					var nowY = myDate.getFullYear();
					var nowM = myDate.getMonth() + 1;
					var nowD = myDate.getDate();
					var enddate = nowY + "-" + (nowM < 10 ? "0" + nowM : nowM) + "-" + (nowD < 10 ? "0" + nowD : nowD); //当前日期
					_self.goodInfo.endTime = enddate.replace(/-/g, '');
					var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30); //最后一个数字30可改，30天的意思
					var lastY = lw.getFullYear();
					var lastM = lw.getMonth() + 1;
					var lastD = lw.getDate();
					var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
					_self.goodInfo.startTime = startdate.replace(/-/g, '');
				} else if(index == 2) {
					var myDate = new Date();
					var nowY = myDate.getFullYear();
					var nowM = myDate.getMonth() + 1;
					var nowD = myDate.getDate();
					var enddate = nowY + "-" + (nowM < 10 ? "0" + nowM : nowM) + "-" + (nowD < 10 ? "0" + nowD : nowD); //当前日期
					_self.goodInfo.endTime = enddate.replace(/-/g, '');
					var lw = new Date(myDate - 1000 * 60 * 60 * 24 * 365); //最后一个数字30可改，30天的意思
					var lastY = lw.getFullYear();
					var lastM = lw.getMonth() + 1;
					var lastD = lw.getDate();
					var startdate = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
					_self.goodInfo.startTime = startdate.replace(/-/g, '');
				} else {
					_self.goodInfo.endTime = '';
					_self.goodInfo.startTime = '';
				}
				_self.option.xAxis.data = [];
				_self.option.series[0].data = [];
				//				console.log(_self.goodInfo)
				_self.change[index].active = true;
				_self.getHttp()
			},
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption(this.option);
				common.$emit('close-load');
			}
		},
		created() {
			var _self = this;
			let info = this.$route.params.id;
			_self.goodInfo.endTime = '';
			_self.goodInfo.startTime = '';
			_self.goodInfo.name = info.split(';')[0].split('=')[1];
			_self.goodInfo.location = info.split(';')[1].split('=')[1];
			_self.goodInfo.spec = info.split(';')[2].split('=')[1];
			_self.goodInfo.areaList = [];
			_self.goodInfo.areaList.push(info.split(';')[3].split('=')[1]);
			_self.goodInfo.breedId = info.split(';')[4].split('=')[1];
			_self.getHttp()
			common.$on('trendChart', function(todo) {
				_self.goodInfo.endTime = '';
				_self.goodInfo.startTime = '';
				_self.goodInfo.areaList = [];
				_self.goodInfo.name = todo.name;
				_self.goodInfo.location = todo.location;
				_self.goodInfo.spec = todo.spec;
				_self.goodInfo.areaList.push(todo.area);
				_self.goodInfo.breedId = todo.breedId;
				for(var i = 0; i < _self.change.length; i++) {
					_self.change[i].active = false;
				}
				_self.change[0].active = true;
				_self.getHttp()
			});

			//			this.getHttp()
			//			var myChart = echarts.init(document.getElementById('myChart'));
			//			myChart.setOption(this.option);
		}
	}
</script>

<style lang="less">
	#trendChart {
		height: 100vh;
		.ceng {
			height: 60px;
			text-align: center;
			background: linear-gradient(to right, #ff5b27, #fd7652);
			padding: 15px 0;
			.background {
				display: inline-flex;
				line-height: 30px;
				.box {
					padding: 0 15px;
					border: 1px solid #fff;
					color: #fff;
					&.active {
						background-color: #fff;
						border: 1px solid #fff;
						color: #fe6638;
					}
				}
				.box:nth-child(1) {
					border-radius: 50px 0 0 50px;
				}
				.box:nth-child(3) {
					border-radius: 0 50px 50px 0;
				}
			}
		}
		.infoBox {
			padding: 20px 0;
			display: flex;
			box-shadow: 0 0 15px 5px #e6e6e6;
			.infor {
				flex: 1;
				border-right: 1px solid #d4d4d4;
				&>p:nth-child(1) {
					color: #999;
					margin-bottom: 10px;
					font-size: 12px
				}
				&>p:nth-child(2) {
					color: #000;
					font-size: 14px
				}
				&.last {
					border-right: 0;
				}
			}
		}
	}
</style>