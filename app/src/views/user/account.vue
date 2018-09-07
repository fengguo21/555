<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	.killAccScroll {
		height: 100%;
		overflow: hidden;
	}
	
	.account {
		background-color: #F5F5F5;
		position: relative;
		.main {
			padding-bottom: 40px;
		}
		.have_border {
			border-bottom: 1px solid #E6E6E6;
		}
		.top_border {
			border-top: 1px solid #E6E6E6;
		}
		.distance {
			margin-top: 10px;
		}
		.basic {
			.title {
				padding: 12px 0;
				padding-left: 15px;
				background-color: #F5F5F5;
				color: #AEAEAE;
				font-size: 13px;
				text-align: left;
				border-bottom: 1px solid #E6E6E6;
			}
			.box {
				width: 100%;
				background-color: #fff;
				padding-left: 18px;
				.inbox {
					padding: 15px 0;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.left {
						font-size: 17px;
						line-height: 17px;
					}
					.right {
						display: flex;
						flex-direction: row;
						align-items: center;
						.photo {
							width: 60px;
							height: 60px;
							overflow: hidden;
							border-radius: 30px;
						}
						.content {
							color: #666;
							font-size: 14px;
						}
						.image {
							padding: 0 15px;
							.right_dir {
								height: 12px;
								width: 8px;
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<div class="account">
		<myHeader :param="head"></myHeader>
		<div class="page-loadmore-wrapper main" ref="wrapper" v-bind:class="{killAccScroll:visible}" :style="{ height: wrapperHeight + 'px' }">
			<div class="basic">
				<div class="title">基础信息</div>
				<div class="box">
					<div class="inbox have_border">
						<div class="left">头像</div>
						<div class="right">
							<div class="photo">
								<imageUpload :param="param" v-on:postUrl="getUrl"></imageUpload>
							</div>
							<div class="image">
								<img src="/static/images/jiantou.png" class="right_dir">
							</div>
						</div>
					</div>
				</div>
				<div class="box have_border" @click="change(userInfor.fullname,1)" v-show="userInfor.utype !== 2">
					<div class="inbox">
						<div class="left">姓名</div>
						<div class="right">
							<div class="content">{{userInfor.fullname}}</div>
							<div class="image">
								<img src="/static/images/jiantou.png" class="right_dir">
							</div>
						</div>
					</div>
				</div>
				<div class="box" v-show="userInfor.name && userInfor.utype == 2">
					<div class="inbox have_border">
						<div class="left">姓名</div>
						<div class="right">
							<div class="image content">
								{{userInfor.name}}
							</div>
						</div>
					</div>
				</div>
				<div class="box top_border distance" @click="open('picker')">
					<div class="inbox have_border">
						<div class="left">生日</div>
						<div class="right">
							<div class="content">{{userInfor.birthday | birthdayTime}}</div>
							<div class="image">
								<img src="/static/images/jiantou.png" class="right_dir">
							</div>
						</div>
					</div>
				</div>
				<div class="box" @click="change(userInfor.gender,2)">
					<div class="inbox have_border">
						<div class="left">性别</div>
						<div class="right">
							<div class="content">{{userInfor.gender}}</div>
							<div class="image">
								<img src="/static/images/jiantou.png" class="right_dir">
							</div>
						</div>
					</div>
				</div>
				<div class="box have_border">
					<div class="inbox">
						<div class="left">手机</div>
						<div class="right">
							<div class="image content">
								{{userInfor.phone}}
							</div>
						</div>
					</div>
				</div>
				<div class="box top_border distance" @click="change(userInfor.bizMain,6)">
					<div class="inbox have_border">
						<div class="left">主营品种</div>
						<div class="right">
							<div class="content">{{userInfor.bizMain,6 | filterTxt}}</div>
							<div class="image">
								<img src="/static/images/jiantou.png" class="right_dir">
							</div>
						</div>
					</div>
				</div>
				<!--<div class="box">
					<div class="inbox have_border">
						<div class="left">买卖性质</div>
						<div class="right">
							<div class="image content">
								{{userInfor.userType | userTypes}}
							</div>
						</div>
					</div>
				</div>-->
				<div class="box">
					<div class="inbox have_border">
						<div class="left">经营类型</div>
						<div class="right">
							<div class="image content">
								{{userInfor.manageTypeName}}
							</div>
						</div>
					</div>
				</div>
				<div class="box have_border" @click="jumpPerson(userInfor.utype)">
					<div class="inbox">
						<div class="left">个人认证</div>
						<div class="right">
							<div class="content">
								<span v-if="userInfor.utype == 0">未认证</span>
								<span v-if="userInfor.utype == 1">待审核</span>
								<span v-if="userInfor.utype == 2">已认证</span>
								<span v-if="userInfor.utype == 3">未通过</span>
							</div>
							<div class="image">
								<img src="/static/images/jiantou.png" class="right_dir">
							</div>
						</div>
					</div>
				</div>
				<div class="title">企业信息</div>
				<div class="basic">
					<div class="box" @click="change(userInfor.company,3)" v-show="userInfor.ctype == 0 || userInfor.ctype == 1 || userInfor.ctype == 3">
						<div class="inbox have_border">
							<div class="left">公司</div>
							<div class="right">
								<div class="content">
									{{userInfor.company,13 | filterTxt}}
								</div>
								<div class="image">
									<img src="/static/images/jiantou.png" class="right_dir">
								</div>
							</div>
						</div>
					</div>
					<div class="box" v-show="userInfor.ctype == 2 ">
						<div class="inbox have_border">
							<div class="left">公司</div>
							<div class="right">
								<div class="image content">
									{{userInfor.company,13 | filterTxt}}
								</div>
							</div>
						</div>
					</div>
					<div class="box have_border" @click="jumpCompany(userInfor.ctype)">
						<div class="inbox">
							<div class="left">企业认证</div>
							<div class="right">
								<div class="content">
									<span v-if="userInfor.ctype == 0">未认证</span>
									<span v-if="userInfor.ctype == 1">待审核</span>
									<span v-if="userInfor.ctype == 2">已认证</span>
									<span v-if="userInfor.ctype == 3">未通过</span>
								</div>
								<div class="image">
									<img src="/static/images/jiantou.png" class="right_dir">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<mt-datetime-picker ref="picker" type="date" v-model="pickerValue" :startDate="start" :endDate="end" @confirm="handleConfirm">
		</mt-datetime-picker>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import imageUpload from '../../components/tools/imageUpload'
	import validation from '../../validation/validation.js'
	// import filters from '../../filters/filters.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				head: {
					name: '账户信息'
				},
				param: {
					name: 'intention',
					index: 0,
					header_url: '',
					tall: true,
					url: '/static/images/my-header.png'
				},
				pickerValue: '',
				start: '',
				end: '',
				upDataInfor: {
					gender: '',
					fullname: '',
					phone: '',
					birthday: '',
					company: '',
					companyShort: '',
					bizMain: '',
					avatar: '',
					companyJob: '',
					invoice: '',
					userType: '',
					manageType: ''
				},
				item: '',
				show: false,
				ishead: true

			}
		},
		components: {
			imageUpload,
			myHeader
		},
		computed: {
			userInfor() {
				if(this.$store.state.user.userInfor.avatar) {
					this.param.url = this.$store.state.user.userInfor.avatar;
				} else {
					this.param.url = '/static/images/my-header.png'
				}
				return this.$store.state.user.userInfor;
			}
		},
		methods: {
			getUrl(param) {
				console.log(param);
				let _self = this;
				this.upDataInfor.avatar = param.url;
				for(var key in _self.upDataInfor) {
					if(key !== 'avatar') {
						_self.upDataInfor[key] = _self.userInfor[key]
					}
				}
				this.$store.dispatch('upDataInfor', this.upDataInfor).then(res => {
					common.$emit('message', res.data.msg);
				}), (() => {});
			},
			jumpPerson(type) {
				let _self = this;
				if(_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
					function perfect() {
						_self.$router.push('/perfectObject');
					}
					this.$msgBox.showMsgBox({
						title: '信息完善',
						content: '您的信息还未完善，现在去完善吗？',
						isShowCancelImg: '/static/icon/list/miao1.png',
						isShowCancelBtn: false,
						confirmBtnText: '去完善'
					}).then(async(val) => {
						perfect()
					}).catch(() => {});
					return;
				}
				if(type == 0) {
					_self.$router.push('/personalStep1');
				} else {
					common.$emit("toAuthResult", 0);
					_self.$router.push('/authResult?authen=0');
				}
			},
			jumpCompany(type) {
				let _self = this;
				if(_self.userInfor.userType == '0' || _self.userInfor.bizMain == '' || _self.userInfor.manageType == '-1') {
					function perfect() {
						//common.$emit('setParam','authRouter','account');
						_self.$router.push('/perfectObject');
					}
					this.$msgBox.showMsgBox({
						title: '信息完善',
						content: '您的信息还未完善，现在去完善吗？',
						isShowCancelImg: '/static/icon/list/miao1.png',
						isShowCancelBtn: false,
						confirmBtnText: '去完善'
					}).then(async(val) => {
						perfect()
					}).catch(() => {});
					return;
				}
				if(type == 0) {
					common.$emit('toCompanyAuth', 1) //去判断是不是药厂和饮片厂
					_self.$router.push('/companyAuth');
				} else {
					common.$emit("toAuthResult", 1);
					_self.$router.push('/authResult?authen=1');
				}

			},
			getTimeStamp(str) {
				str = str.replace(/-/g, '/');
				var date = new Date(str);
				return date.getTime();
			},
			handleConfirm(value) {
				let _self = this;
				_self.upDataInfor.birthday = value.getTime() / 1000;
				for(var key in _self.upDataInfor) {
					if(key !== 'birthday') {
						_self.upDataInfor[key] = _self.userInfor[key]
					}
				}
				this.$store.dispatch('upDataInfor', this.upDataInfor).then(res => {
					common.$emit('message', res.data.msg);
				}), (() => {})
			},
			open(picker) {
				this.$refs[picker].open();
			},
			change(val, index) {
				let _self = this;
				let obj = {};
				switch(index) {
					case 1:
						obj = {
							val: val,
							name: '姓名',
							type: 'fullname'
						}
						break;
					case 2:
						obj = {
							val: val,
							name: '性别',
							type: 'gender'
						}
						break;
					case 3:
						obj = {
							val: val,
							name: '公司',
							type: 'company'
						}
						break;
					case 4:
						obj = {
							val: val,
							name: '简称',
							type: 'companyShort'
						}
						break;
					case 5:
						obj = {
							val: val,
							name: '职位',
							type: 'companyJob'
						}
						break;
					case 6:
						obj = {
							val: val,
							name: '主营品类',
							type: 'bizMain'
						}
						break;
					case 7:
						obj = {
							val: val,
							name: '开票信息',
							type: 'invoice'
						}
						break;
				}
				if(obj.type !== 'bizMain') {
					common.$emit('postUsers', obj);
					let str = 'val=' + obj.val + ';name=' + obj.name + ';type=' + obj.type;
					_self.$router.push('accountRevise/' + str);
				} else {
					_self.$store.dispatch('getMainBusiness', {
						router: '/account',
						main: _self.$store.state.user.userInfor.bizMain
					});
					common.$emit('accountTo', _self.ishead)
					common.$emit('accountTomajorBusiness', this.$store.state.user.userInfor.bizMain)
					_self.$router.push('/majorBusiness?value=' + this.$store.state.user.userInfor.bizMain)
				}
			}
		},
		created() {
			let _self = this;
			_self.$store.dispatch('getUserInfor');
			_self.start = new Date("1900-01-01");
			_self.end = new Date();
			let type = '';
			let ua = navigator.userAgent.toLowerCase();
			if(/iphone|ipad|ipod/.test(ua)) {
				type = 'ios';
			}
			if(type == 'ios') {
				_self.start = new Date("1900/01/01");
				_self.end = new Date();
				_self.pickerValue = new Date();
			}
		},
		mounted() {
			console.log(888, this.$refs.wrapper)
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>