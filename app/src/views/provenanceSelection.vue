<style lang="less" scoped>
	.provenance {
		.index_name {
			text-align: left;
			.cell_a {
				.show {
					background: url(../../static/icon/list/duihao.png) #fff no-repeat;
					background-position: right center;
					background-size: 20px 20px;
				}
			}
		}
	}
	
	.provenance .select_box {
		width: 100%;
		background-color: white;
		padding: 1rem;
	}
	
	.provenance .mint-navbar {
		width: 70%;
		margin-left: 15%;
	}
	
	.provenance .mint-navbar .mint-tab-item {
		padding: 1.2rem 0;
		line-height: 0 !important;
		border: 1px solid #ff8201;
	}
	
	.provenance .mint-navbar .mint-tab-item.is-selected {
		background-color: #ff8201;
		color: white;
		margin: 0;
	}
	
	.provenance {
		.header {
			position: relative;
			width: 100%;
			height: 50px;
			color: white;
			background-color: #ff8201;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.go_back {
				padding: 15px;
				position: absolute;
				height: 50px;
				left: 0;
				img {
					height: 20px;
				}
			}
			.title {
				font-size: 18px;
			}
			.button {
				position: absolute;
				padding: 15px;
				height: 50px;
				right: 0;
				font-size: 16px;
			}
		}
		.search {
			padding: 5px 10px;
			height: 45px;
			span {
				background-color: #fff;
				border: 1px solid #e6e6e6;
				border-radius: 50px;
				display: inline-block;
				padding: 5px;
				width: 100%;
				img {
					display: inline-block;
					height: 20px;
					vertical-align: middle;
					margin-right: 5px;
				}
				input {
					outline: none;
					border: 0;
					width: 50%;
					height: 100%;
				}
			}
		}
		.history_box {
			width: 100%;
			background: white;
			margin-bottom: 10px;
			.history {
				/*width: 100%;
				padding: 0 10px 10px 10px;
				background: white;
				text-align: left;
				border-bottom: 1px solid #DFDFDF;
				color: #f00;*/
				text-align: left;
				color: #f00;
				padding: 10px 10px 0;
				overflow: hidden;
				&>div {
					text-align: center;
					display: inline-block;
					border: 1px solid #f00;
					min-width: 22%;
					line-height: 30px;
					padding: 0 10px;
					margin: 0 10px 10px 0;
					position: relative;
					border-radius: 4px;
					img {
						width: 1.024rem;
						height: 1.024rem;
						position: absolute;
						margin-left: 0.8533rem;
						top: -0.5rem;
						right: -0.5rem;
					}
				}
			}
		}
		.hot_search {
			margin: 0 0 10px;
			background-color: #fff;
			padding: 0 0 10px;
			.position {
				line-height: 40px;
				border-bottom: 1px solid #e9e9e9;
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
				&>span:first-child {
					font-size: 16px;
					color: #eb4621;
					img {
						height: 16px;
						vertical-align: middle;
						margin-right: 5px;
					}
				}
				&>span:last-child {
					font-size: 12px;
					color: #ccc;
				}
			}
			ul {
				text-align: left;
				padding: 0 10px;
				overflow: hidden;
				li {
					float: left;
					display: inline-block;
					text-align: center;
					width: 22%;
					display: inline-block;
					padding: 5px 10px;
					border: 1px solid #e9e9e9;
					margin: 10px 10px 0 0;
					&.active {
						border: 1px solid #eb4621;
						color: #eb4621;
					}
				}
				.clear {
					clear: both;
				}
			}
		}
	}
</style>
<template>
	<div class="provenance">
		<div class="header">
			<div class="go_back" @click="back()">
				<img src="/static/images/go-back.png">
			</div>
			<div class="title">{{title}}</div>
			<div class="button" @click="save()">确定</div>
		</div>
		<!--搜索区-->
		<div class="search">
			<span @click="addSearch()">
				<img src="/static/icon/list/search.png"/>
				<input type="text"  readonly="readonly" placeholder="输入你要查询的城市名称或拼音" />
			</span>
		</div>
		<!--选中区-->
		<div class="history_box" v-show="selectArr.length>0" ref="heightChoose">
			<div class="history">
				<div v-for="(item,index) in selectArr">
					<span>{{item.name}}</span>
					<img src="../../static/icon/list/quxiao.png" @click="delItem(index,item)">
				</div>
			</div>
		</div>
		<!--备选区-->
		<div class="hot_search">
			<div class="position">
				<span @click="choosePosition(localtion)"><img src="/static/icon/new/position.png"/>{{localtion.name}}</span>
				<span @click="getPhoneInfo()">{{localtion.refresh}}</span>
			</div>
			<ul>
				<!--<li>热门</li>-->
				<li v-for="item in hot_search" :class="{'active':item.status}" @click="selectPlaceHot(item)">
					{{item.name}}
				</li>
				<span class="clear"></span>
			</ul>
		</div>
		<div ref="wrapper">
			<mt-index-list>
				<div class="list" v-for="(todo, index) in list" v-if="selected==1">
					<mt-index-section :index="todo.key" class="index_name">
						<a class="cell_a" @click="selectPlace(item,index,num)" v-for="(item , num) in todo.value">
							<mt-cell :title="item.name">
								<img class="cell_image" src="/static/icons/selected.png" style="max-height:10px" v-show="item.show">
							</mt-cell>
						</a>
					</mt-index-section>
				</div>
			</mt-index-list>
		</div>

	</div>
</template>
<script>
	import common from '../common/common.js'
	import httpService from '../common/httpService.js'
	export default {
		data() {
			return {
				selected: '1',
				list: [],
				selectArr: [],
				localtion: {
					name: '定位中...',
					id:'',
					refresh: '当前定位',
					status:false,
				},

				listHeight: 100,
				title: this.$route.query.type == 1 ? '产地选择' : '交货地选择',
				hot_search: [{
					name: '亳州',
					id: "亳州",
					status: false,
				}, {
					name: '云南',
					id: "云南",
					status: false,
				}, {
					name: '四川',
					id: "四川",
					status: false,
				}, {
					name: '玉林',
					id: "玉林",
					status: false,
				}, {
					name: '安国',
					id: "安国",
					status: false,
				}, {
					name: '西安',
					id: "西安",
					status: false,
				}]

			}
		},

		methods: {
			choosePosition(item) {
				if(this.localtion.status == 1) {
					this.selectPlaceHot(item)
				}
			},
			addSearch() {
				let _self = this;
				common.$emit('addressSearch', 1);
				common.searchType = 'keyword';
				common.$emit('setParam', 'router', 'provenanceSelection')
				let type = Number(this.$route.query.type) + 1
				_self.$router.push('/search?type=' + type)
			},
			getHttp() { //产地
				let _self = this;
				common.$emit('show-load');
				let url = common.urlCommon + common.apiUrl.most;
				let body = {
					biz_module: 'breedService',
					biz_method: 'queryBreedLocalList',
					biz_param: {
						breedId: 0,
					}
				}
				if(this.$route.query.type == 1) {
					body.biz_module = 'locationService';
					body.biz_method = 'queryProvinceByChina';
				}
				httpService.specifiedPlace(url, body, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result.list;
					for(let i of result) {
						for(let j of i.value) {
							j.show = false;
							for(let z of _self.selectArr) {
								if(z.name == j.name) {
									j.show = true;
								}
							}

						}
					}
					_self.list = result;
					_self.changelistHeight();
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getPhoneInfo() {
				let _self = this;
				_self.localtion.name = "定位中..."
				var geolocation = new BMap.Geolocation();
				geolocation.getCurrentPosition(function(r) {
					if(this.getStatus() == BMAP_STATUS_SUCCESS) {
						if(r.accuracy == null) {
							_self.localtion.name = '定位失败';
							_self.localtion.refresh = '重新获取定位'
							_self.localtion.status = false;
							common.$emit('message','您已拒绝地理位置授权')
							return;
						}else{
							getAddress(r.point);
						}
					}
				});
				//获取地址信息，设置地址label
				function getAddress(point) {
					var gc = new BMap.Geocoder();
					gc.getLocation(point, function(rs) {
						if(rs.addressComponents.city) {
							_self.localtion.name = rs.addressComponents.city.replace('市', '');
							_self.localtion.id = rs.addressComponents.city.replace('市', '');
							_self.localtion.refresh = '重新获取定位';
							_self.localtion.status = true;
						} else {
							_self.localtion.name = '定位失败';
							_self.localtion.refresh = '重新获取定位'
							_self.localtion.status = false;
						}
					});
				}
			},
			selectPlace: function(item, index, num) {
				let _self = this;
				let count = 1;
				for(let i = 0; i < this.selectArr.length; i++) {
					if(this.selectArr[i].name == item.name) {
						for(let j = 0; j < _self.hot_search.length; j++) {
							if(item.name == _self.hot_search[j].name) {
								_self.hot_search[j].status = false;
							}
						}
						this.selectArr.splice(i, 1);
						count = 0;
					}
				}
				if(this.list[index].value[num].show) { //如果已经点了
					this.list[index].value[num].show = false;
				} else { //如果没点
					if(count) {
						if(this.selectArr.length < 5) {
							item.show = true;
							item.first = index;
							item.second = num;
							this.selectArr.push(item);

						} else {
							this.$toast({
								message: '最多只能选5个',
								position: 'bottom',
								duration: 500
							});
						}
					};
				}
				_self.changelistHeight();
			},
			selectPlaceHot: function(item) {
				console.log(item)
				let _self = this;
				let count = 1;
				for(let k = 0; k < _self.selectArr.length; k++) {
					if(_self.selectArr[k].name == item.name) {
						for(var i = 0; i < _self.list.length; i++) {
							for(var j = 0; j < _self.list[i].value.length; j++) {
								if(_self.list[i].value[j].name == item.name) {
									_self.list[i].value[j].show = false;
								}

							}
						}
						item.status = false;
						this.selectArr.splice(k, 1);
						count = 0;
					}
				}
				if(count) {
					if(_self.selectArr.length < 5) {
						for(var i = 0; i < _self.list.length; i++) {
							for(var j = 0; j < _self.list[i].value.length; j++) {
								if(_self.list[i].value[j].name == item.name) {
									_self.list[i].value[j].show = true;
								}

							}
						}
						for(let j = 0; j < _self.hot_search.length; j++) {
							if(item.name == _self.hot_search[j].name) {
								_self.hot_search[j].status = true;
							}
						}
						this.selectArr.push(item);
					} else {
						_self.$toast({
							message: '最多只能选5个',
							position: 'bottom',
							duration: 500
						});
					}
				}
				_self.changelistHeight();
			},
			delItem: function(index, item) {
				let _self = this;
				for(var i = 0; i < _self.list.length; i++) {
					for(var j = 0; j < _self.list[i].value.length; j++) {
						if(_self.list[i].value[j].name == item.name) {
							_self.list[i].value[j].show = false;
						}

					}
				}
				for(let j = 0; j < _self.hot_search.length; j++) {
					if(item.name == _self.hot_search[j].name) {
						_self.hot_search[j].status = false;
					}
				}
				_self.selectArr.splice(index, 1);
				_self.changelistHeight();
			},
			back: function() {
				let _self = this;
				if(window.history.length == 1) {
					_self.$router.push('/home');
				} else {
					window.history.go(-1);
				}
			},
			changelistHeight: function() {
				let _self = this;
				setTimeout(function() {
					document.querySelector('.mint-indexlist-content').style.height = document.documentElement.clientHeight - _self.$refs.wrapper.getBoundingClientRect().top + "px";
				}, 0)
			},
			save: function() {
				let areaArr = [];
				let idArr = [];
				for(var i = 0; i < this.selectArr.length; i++) {
					areaArr.push(this.selectArr[i].name);
					if(this.selectArr[i].locationId) {
						idArr.push(this.selectArr[i].locationId);
					} else {
						idArr.push(this.selectArr[i].id);
					}

				}
				switch(this.$route.params.from) {
					case 'need':
						common.$emit('need-sort', {
							areaArr: areaArr,
							idArr: idArr
						});
						break;
					case 'resource':
						common.$emit('resource-sort', {
							areaArr: areaArr,
							idArr: idArr
						});
						break;
					case 'lowRes':
						common.$emit('lowRes-sort', {
							areaArr: areaArr,
							idArr: idArr
						});
						break;
					case 'urgentNeed':
						common.$emit('urgentNeed-sort', {
							areaArr: areaArr,
							idArr: idArr
						});
						break;
					default:
						break;

				}
				this.$router.go(-1);
			}
		},
		mounted() {
			let _self = this;
			_self.listHeight = document.documentElement.clientHeight - _self.$refs.wrapper.getBoundingClientRect().top
			let list = document.querySelector('.mint-indexlist-content')

		},
		created() {
			console.log(this.$route.query.type)
			let _self = this;

			_self.getPhoneInfo()
			let type = this.$route.query.type;
			_self.getHttp();
			common.$on("provenanceSelection", function(item) {
				if(item.name) {
					for(let j = 0; j < _self.hot_search.length; j++) {
						if(item.name == _self.hot_search[j].name) {
							_self.hot_search[j].status = false;
						}
					}
					_self.selectPlaceHot(item)
				}
			});
			common.$on('addressSelect', function(item) {
				_self.list = [];
				_self.selectArr = [];
				for(let j = 0; j < _self.hot_search.length; j++) {
					_self.hot_search[j].status = false;
				}
				_self.getPhoneInfo();
				_self.getHttp()
				if(_self.$route.query.type == 1) {
					_self.title = '产地选择 '
				} else {
					_self.title = '交货地选择 '
				}
			})
			common.$on('initial', function(id) {
				_self.selectArr = []
			})
		}
	}
</script>