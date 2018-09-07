<template>
	<div id="echartYear">
		<div class="webpBack" :class="change? 'change':''">
			<myHeader :param="param"></myHeader>
			<div id="myChart" :class="change? 'active':''"></div>
		</div>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	export default {
		data() {
			return {
				change: '',
				param: {
					name: '走势图',
					background: true,

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
			var _self = this
			window.onresize = function() {
				var width = document.documentElement.clientWidth;
				var height = document.documentElement.clientHeight;
				if(width < height) {
					_self.change = true;
				} else {
					_self.change = false;
				}
			};

		},
		methods: {
			//通用数据请求
			getHttp() {
				let _self = this;
				common.$emit('show-load');
				_self.timer();
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
			timer() {
				var _self = this;
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
			var _self = this
			var width = document.documentElement.clientWidth;
			var height = document.documentElement.clientHeight;
			if(width < height) {
				_self.change = true;
			}
			let info = _self.$route.params.id;
			_self.goodInfo.endTime = '';
			_self.goodInfo.startTime = '';
			_self.goodInfo.name = info.split(';')[0].split('=')[1];
			_self.goodInfo.location = info.split(';')[1].split('=')[1];
			_self.goodInfo.spec = info.split(';')[2].split('=')[1];
			_self.goodInfo.areaList = [];
			_self.goodInfo.areaList.push(info.split(';')[3].split('=')[1]);
			_self.goodInfo.breedId = info.split(';')[4].split('=')[1];
			_self.getHttp()
			common.$on('echartYear', function() {
				let infos = _self.$route.params.id;
				console.log(_self.$route.params)
				_self.goodInfo.endTime = '';
				_self.goodInfo.startTime = '';
				_self.goodInfo.name = infos.split(';')[0].split('=')[1];
				_self.goodInfo.location = infos.split(';')[1].split('=')[1];
				_self.goodInfo.spec = infos.split(';')[2].split('=')[1];
				_self.goodInfo.areaList = [];
				_self.goodInfo.areaList.push(infos.split(';')[3].split('=')[1]);
				_self.goodInfo.breedId = infos.split(';')[4].split('=')[1];
				_self.getHttp()
			});
		}
	}
</script>

<style lang="less">
	#echartYear {
		height: 100vh;
		width: 100vw;
		position: relative;
		.webpBack {
			position: absolute;
			width: 100%;
			height: 100%;
			&.change {
				height: 100vw;
				width: 100vh;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%) rotate(90deg);
			}
		}
		#myChart {
			width: 100vw;
			height: 87vh;
			/*margin-bottom: -50px;*/
			&.active {
				width: 100vh;
				height: 87vw;
			}
		}
	}
</style>