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
	}
	
	.perfect_id {
		background-color: #f3f3f3;
		position: relative;
		min-height: 100vh;
		.perfect_box {
			overflow: auto;
		}
		.boxs {
			width: 100%;
			background-color: #f3f3f3;
			position: relative;
			padding-bottom: 60px;
			&.choose{
				padding-bottom: 10px;
			}
			&.type1 {
				padding-top: 2rem;
				min-height: 100%;
			}
			&.type2 {
				padding-top: 5rem;
				min-height: 100%;
			}
			&.type3 {
				padding-top: 3rem;
				min-height: 100%;
			}
			.line_active {
				margin: 0 30px;
				border-bottom: 1px solid #d5d5d5;
				margin-top: 20px;
			}
			#titles {
				padding: 10px 0 30px;
				.title_1 {
					font-size: 17px;
					color: #ff8201;
					line-height: 17px;
				}
				.title_2 {
					font-size: 14px;
					line-height: 14px;
					color: #808080;
					margin-top: 10px;
					margin-bottom: 5px;
				}
			}
			.list {
				width: 100%;
				padding: 0 30px;
				text-align: left;
				.item {
					text-align: center;
					text-align: center;
					display: inline-block;
					&.type1 {
						width: 50%;
					}
					&.type2 {
						width: 33%;
					}
					.active {
						color: #ffd201;
					}
					.tbox {
						margin: 30px auto;
						width: 120px;
						height: 120px;
						border-radius: 50px;
						background: url('/static/icon/push-button.png') no-repeat;
						background-size: 100% 100%;
						line-height: 120px;
						font-size: 15px;
						color: #000;
					}
					.selected_tbox {
						margin: 30px auto;
						width: 120px;
						height: 120px;
						border-radius: 50px;
						background: url('/static/icon/push-button-selected.png') no-repeat;
						background-size: 100% 100%;
						line-height: 120px;
						font-size: 15px;
						color: #fff;
					}
					.inbox {
						height: 10.2307rem;
						line-height: 20px;
						color: #000;
						font-size: 1.1538rem;
						img {
							width: 6.3rem;
							height: 6.3rem;
						}
					}
					.inboxs {
						height: 10.2307rem;
						line-height: 20px;
						color: #000;
						display: inline-block;
						font-size: 1.1538rem;
						/*float: left;*/
						img {
							width: 82px;
							height: 82px;
						}
					}
				}
			}
		}
		.footer {
			position: absolute;
			bottom: 5px;
			text-align: center;
			width: 100%;
			.confirm {
				width: 90%;
				height: 38px;
				line-height: 38px;
				text-align: center;
				background-color: #ff8201;
				color: #fff;
				border-radius: 19px;
				margin: 7px 5%;
				border: 0;
				&.black {
					background-color: #fff;
					border: 1px solid #d5d5d5;
					color: #666;
				}
				&.cursor {
					pointer-events: none;
					cursor: default;
					opacity: 0.6;
				}
			}
		}
	}
	
	.choose_style {
		display: flex;
		.item {
			text-align: center;
			flex: 1;
			.inbox {
				padding: 20px 0 10px;
				img {
					width: 6.15rem;
				}
				p {
					line-height: 20px;
				}
			}
			.choose_new {
				display: inline-block;
				width: 10.3076rem;
				height: 2.1538rem;
				line-height: 2.1538rem;
				color: #FF8201;
				border: 1px solid #ff8201;
				border-radius: 15px;
				background-color: #fff;
				/*margin-bottom: 20px;*/
			}
		}
	}
</style>
<template>
	<div class="perfect_id">
		<!--<div class="head_title">-->
		<userHead :param="param"></userHead>
		<!--</div>-->
		<div class="perfect_box" :style="{ height: wrapperHeight + 'px' }">
			<div class="boxs" v-bind:class="choose?'choose':type == 1?'type1':type==2?'type2':type==3?'type3':''">		
				<div class="returnButton">
					<div id="titles" v-if="!choose">
						<div class="title_1">{{ type | userType }}</div>
						<div class="title_2">根据您的身份，我们可以更有针对性的为您服务</div>
						<div v-bind:class="!choose?'line_active':''"></div>
					</div>
					<div class="list" v-if="!choose">
						<div class="item type1" v-for="(todo,index) in arr" v-if="arr.length%2 ==0 || arr.length%4==0 ">
							<div class="inbox" @click="select(todo)">
								<img :src="todo.normalImage" v-if="!todo.show" />
								<img :src="todo.selectedImage" v-if="todo.show" />
								<p v-bind:class="todo.show?'active':''">{{todo.name}}</p>
							</div>
						</div>
						<div class="item type2" v-for="(todo,index) in arr" v-if="arr.length%2 !==0 && arr.length%4 !==0 ">
							<div class="inbox" @click="select(todo)">
								<img :src="todo.normalImage" v-if="!todo.show" />
								<img :src="todo.selectedImage" v-if="todo.show" />
								<p v-bind:class="todo.show?'active':''">{{todo.name}}</p>
							</div>
						</div>
					</div>
					<div class="choose_style" v-if="choose">
						<div class="item">
							<div class="inbox">
								<img :src="choose_status.image" />
								<p class="active">{{choose_status.name}}</p>
							</div>
							<p class="choose_new" @click="choosenew()">重新选择</p>
						</div>
					</div>
				</div>
				<div v-bind:class="choose?'line_active':''"></div>
				<div class="footer" v-if="!choose">
					<button class="confirm black" @click="back">返回上一步</button>
				</div>
			</div>
			<div v-if="choose">
				<majorBusiness :choose_status="choose_status"></majorBusiness>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	import userHead from '../../components/user/userHead'
	import majorBusiness from './majorBusiness'
	//	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				arr: [],
				manageType: '',
				choose: '',
				type: '',
				param: {
					name: '完善信息',
					cleargo_back: true
				},
				wrapperHeight: "",
				choose_status: {
					name: '',
					image: '',
					status: true,
					notitle: true,
					username: '',
					referralCode: '',
					userType: '',
					manageType: ''

				}
			}
		},
		components: {
			userHead,
			majorBusiness
		},
		created() {
			let _self = this;
			_self.type = this.$route.query.type;
			_self.manageType = ''; //用户身份类型id
			this.getHttp();
			common.$on('go_perfectId', function(id) {
				_self.type = id.split('-')[2];
				_self.choose_status.userType = _self.type;
				_self.choose_status.username = id.split('-')[0];
				_self.choose_status.referralCode = id.split('-')[1];
				_self.manageType = '';
				_self.choose = '';
				_self.getHttp();
				_self.param.name = "完善信息";
				_self.choose_status.name = "";
				_self.choose_status.image = "";
			})
		},
		methods: {
			select(todo) {
				let _self = this;
				for(var i = 0; i < _self.arr.length; i++) {
					_self.arr[i].show = false;
				}
				todo.show = true;
				_self.manageType = todo;
				_self.choose = todo.name;
				_self.addname(todo);
				//				localStorage.setItem('manageType', todo.id);
				_self.choose_status.name = todo.name;
				_self.choose_status.image = todo.selectedImage;
				if(_self.type == 1) {
					_self.param.name = "我是厂家"
				} else if(_self.type == 2) {
					_self.param.name = " 我是服务商"
				} else if(_self.type == 3) {
					_self.param.name = " 我是商家"
				} else if(_self.type == 0) {
					_self.param.name = " 我是种植户"
				}

			},
			addname(todo) {
				let _self = this;
				let obj = {
					manageType: todo.id
				}
				_self.$store.dispatch('upDataInfor', obj).then(res => {
				}), (() => {
					common.$emit('message', '更新失败');
				})
			},
			choosenew() {
				let _self = this;
				_self.choose = "";
				for(var i = 0; i < _self.arr.length; i++) {
					_self.arr[i].show = false;
				}
				_self.choose_status.name = "";
				_self.choose_status.image = "";
				_self.param.name = "完善信息";
			},
			back() {
				common.$emit('perfect_obj');
				this.$router.push('/perfectObject')
			},
			next() {
				let _self = this;
				if(_self.manageType || _self.manageType === 0) {
					localStorage.setItem('manageType', this.manageType);
					common.$emit('perfectidToMajorBusiness', 1)
					_self.$router.push('/majorBusiness')
				} else {
					common.$emit('message', '请选择类型');
					return
				}
			},
			getHttp() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userService',
					biz_method: 'queryCustomerTypeMap',
					biz_param: {
						userType: _self.type
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addAddress(url, body, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result.list;
					console.log(_self.type,'result')
					if(suc.data.code == '1c01') {
						for(var i = 0; i < result.length; i++) {
							result[i].show = false;
						}
						_self.arr = result;
					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			}
		},
		mounted() {
			let _self = this;
			_self.wrapperHeight = document.body.offsetHeight - 50;
			//			console.log(_self.wrapperHeight);
		}
	}
</script>