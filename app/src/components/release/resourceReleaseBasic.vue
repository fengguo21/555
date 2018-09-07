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
	
	.release_basic {
		.popup_unit {
			height: 400px;
			overflow: scroll;
		}
		.other {
			margin-top: 15px;
		}
		.number {
			background-color: #fff;
			box-sizing: border-box;
			padding-left: 15px;
			width: 100%;
			&.margin10{
				margin-bottom: 10px;
			}
			.top {
				font-size: 15px;
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #E6E6E6;
				display: flex;
				flex-direction: row;
				.top_left {
					flex: 1;
					text-align: left;
				}
				.select_sample {
					width: 145px;
					display: flex;
					flex-direction: row;
					.left {
						margin-right: 30px;
					}
					div {
						margin-right: 15px;
						img {
							margin-right: 5px;
							width: 14px;
							height: 14px;
						}
						display: flex;
						flex-direction: row;
						align-items: center;
					}
				}
			}
			.box {
				height: 3.8461rem;
				border-bottom: 1px solid #E6E6E6;
				display: flex;
				flex-direction: row;
				align-items: center;
				&.last{
					border-bottom: 0
				}
				.number_left {
					font-size: 1.1538rem;
					color: #343434;
					width: 6.5384rem;
					text-align: left;
				}
				.width100 {
					width: 7.6923rem;
				}
				.number_center {
					flex: 1;
					input {
						width: 100%;
						height: 30px;
						font-size: 15px;
						text-align: right;
					}
					padding-right:10px;
				}
				.number_right {
					width: 100px;
					border-left: 1px solid #E6E6E6;
					height: 40px;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					position: relative;
					.word {
						flex: 1;
						text-align: right;
						margin-right: 10px;
						color: #7CB159;
					}
					.green {
						color: #7CB159;
					}
					div {
						.select {
							width: 18px;
							right: 15px;
							margin-top: 6px;
							margin-right: 15px;
						}
					}
				}
			}
		}
	}
	
	.select_samples {
		display: flex;
		line-height: 3.8461rem;
		font-size: 1.1538rem;
		img {
			vertical-align: middle;
			width: 1.0769rem;
			height: 1.0769rem;
			margin: 0 0.3846rem 0 0.7692rem;
		}
	}
</style>
<template>
	<div class="release_basic">

		<div class="number">
			<div class="top">
				<div class="top_left">是否提供样品</div>
				<div class="select_sample">
					<div class="left" v-on:click="judgeValue(1)">
						<img src="/static/images/no-select.png" v-show="!obj.sampling">
						<img src="/static/images/over-select.png" v-show="obj.sampling">
						<div class="word">是</div>
					</div>
					<div class="right" v-on:click="judgeValue(0)">
						<img src="/static/images/no-select.png" v-show="obj.sampling">
						<img src="/static/images/over-select.png" v-show="!obj.sampling">
						<div class="word">否</div>
					</div>
				</div>
			</div>
			<div class="box" v-show="obj.sampling">
				<div class="number_left">样品数量</div>
				<div class="number_center">
					<input type="number" v-model="obj.weight" placeholder="请输入">
				</div>
				<div class="number_right">
					<div class="green">份</div>
				</div>
			</div>
			<div class="box" v-show="obj.sampling">
				<div class="number_left">样品价格</div>
				<div class="number_center">
					<input type="number" v-model="obj.price" placeholder="请输入">
				</div>
				<div class="number_right">
					<div class="green">元/份</div>
				</div>
			</div>
		</div>
		
		
		<div class="number" v-show="!obj.myoffer">
			<div class="box">
				<div class="number_left">可供数量</div>
				<div class="number_center">
					<input type="number" v-model="obj.number" placeholder="请输入">
				</div>
				<div class="number_right" @click="showAction('unit')">
					<div class="word">{{obj.number_unit}}</div>
					<div><img src="/static/icons/green-jian.png" class="select"></div>
				</div>
			</div>
			<div class="box last">
				<div class="number_left">裸&emsp;&emsp;价</div>
				<div class="number_center">
					<input type="number" v-model="obj.sales_price" placeholder="请输入">
				</div>
				<div class="number_right">
					<div class="green">元/{{obj.number_unit}}</div>
				</div>
			</div>
		</div>
		
		<mt-popup v-model="obj.show" position="center" class="mint-popup-1 popup_unit" style="width:60%">
			<div v-for="item in actions">
				<div style="color: #656b79;background-color: #f6f8fa;box-shadow: 0 0 1px #b8bbbf;padding:10px 0" @click="setObj(item.key,item.name,item.id_key,item.id)">{{item.name}}</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import titles from './title'
	export default {
		data() {
			return {
				
			}
		},
		props: {
			obj: {
				
			}
		},
		methods: {
			judgeValue(param) {
				this.obj.sampling = param;
			},
			
			showAction(param) {
				this.actions = [];
				let _self = this;
				if(param == "unit") {
					for(var i = 0; i < _self.unit.length; i++) {
						_self.actions.push({
							name: _self.unit[i].name,
							key: 'number_unit',
							id: _self.unit[i].id,
							id_key: 'number_id'
						});
					}
				}
				this.obj.show = true;
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
						_self.unit = suc.data.biz_result.list;
						if(!_self.obj.number_unit) {
							_self.obj.number_unit = _self.unit[0].name;
							_self.obj.number_id = _self.unit[0].id;
						} else {
							for(var i = 0; i < _self.unit.length; i++) {
								if(_self.obj.number_unit == _self.unit[i].name) {
									_self.obj.number_id = _self.unit[i].id;
								}
							}
						}
						if(!_self.obj.sample_unit) {
							_self.obj.sample_unit = _self.unit[0].name;
							_self.obj.sample_id = _self.unit[0].id;
						} else {
							for(var i = 0; i < _self.unit.length; i++) {
								if(_self.obj.sample_unit == _self.unit[i].name) {
									_self.obj.sample_id = _self.unit[i].id;
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
			setObj(key, value, id_key, id) {
				console.log(id)
				this.obj[key] = value;
				this.obj[id_key] = id;
				this.obj.show = false;
			},

		},
		components: {
			titles
		},
		created() {
			let _self = this;
			this.getUnit();
		},
		mounted() {

		}
	}
</script>