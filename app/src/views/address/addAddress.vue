<style lang="less" scoped>
	.add_address {
		height: 100vh;
		background-color: #f3f3f3;
		.bg_white {
			background-color: #f3f3f3;
			.active {
				height: 100%;
				overflow: hidden;
			}
			.page-loadmore-wrapper {
				margin-bottom: 0px;
			}
			ul {
				margin: 10px 0 0;
				padding: 0 1.5rem;
				background: white;
				width: 100%;
				color: #333333;
				&.point {
					padding: 10px 1.5rem;
					border: 0;
					line-height: 32px;
					display: flex;
					justify-content: space-between;
				}
				li {
					padding: 10px 0;
					border-bottom: 1px solid #DADADA;
					position: relative;
					text-align: left;
					line-height: 30px;
					p {
						display: inline-block;
						position: absolute;
						left: 0;
						font-size: 15px;
						color: #333333;
					}
					input {
						padding-left: 70px;
						text-align: left;
						width: 100%;
						border: none;
						outline: none;
						font-size: 15px;
						height: 30px;
						color: #666;
					}
				}
				.last {
					height: 50px;
					color: #666666;
					font-size: 15px;
					border-bottom: none;
					textarea {
						padding-left: 70px;
						width: 100%;
						overflow-y: visible;
						border: 0;
						color: #666;
						margin: 13px 0;
						line-height: 26px;
					}
				}
			}
			.confirm {
				background: #ff8201;
				font-size: 1.7rem;
				color: #fff;
				line-height: 50px;
				margin: 50px 2rem 2rem;
				border-radius: 50px;
			}
		}
	}
</style>
<template>
	<div class="add_address">
		<myHeader :param="my_header"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" v-bind:class="{active:obj.tshow}" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<ul>
					<li>
						<p>收件人</p>
						<input type="text" placeholder="请输入您的名字" v-model="obj.name" maxlength="10">
					</li>
					<li>
						<p>手机号码</p>
						<input type="text" placeholder="请输入您的联系电话" v-model="obj.phone">
					</li>
					<li class="no_border">
						<selectAddress :obj="obj"></selectAddress>
					</li>
					<li class="last">
						<p>详细地址</p>
						<input placeholder="详细地址" v-model="obj.detailAddr"></input>
					</li>
				</ul>
				<ul class="point">
					<p>设为默认地址</p>
					<div class="right">
						<mt-switch v-model="obj.status" @change="handleChange"></mt-switch>
					</div>
				</ul>
				<div class="confirm" v-on:click="confirm">保存并使用</div>

			</div>

		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import selectAddress from '../../components/popUpType/selectAddress'
	import validation from '../../validation/validation.js'
	import areaJson from '../../common/areaData'
	export default {
		data() {
			return {
				my_header: {
					name: '增加地址',
					topissue: true
				},
				obj: {
					addAddress: true, //判断是不是新增地址进去的
					name: '',
					phone: '',
					status: true,
					type: '',
					address_name: '所在地区',
					addressProvince: '',
					addressProvinceId: '',
					addressCity: '',
					addressCityId: '',
					addressDistrict: '',
					addressDistrictId: '',
					detailAddr: '',
					tshow: false
				},
			}
		},
		components: {
			myHeader,
			selectAddress
		},
		methods: {
			handleChange() {
				console.log(this.obj.status)
			},
			confirm() {
				let _self = this;
				var checkArr = [];
				let checkName = validation.checkNull(_self.obj.name, '请输入姓名！');
				checkArr.push(checkName);
				let checkLookName = validation.checkLook(_self.obj.name);
				checkArr.push(checkLookName);
				let checkPhone = validation.checkPhone(_self.obj.phone);
				checkArr.push(checkPhone);
				let checkdetailAddr = validation.checkNull(_self.obj.detailAddr, '请输入详细信息！');
				checkArr.push(checkdetailAddr);
				let checkCity = validation.checkNull(_self.obj.addressCity, '请选择所在地区！');
				checkArr.push(checkCity);

				let checkLookDes = validation.checkLook(_self.obj.detailAddr);
				checkArr.push(checkLookDes);
				if(_self.obj.status == false) {
					_self.obj.type = 0;
				} else {
					_self.obj.type = 1;
				}
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userAddressService',
					biz_method: 'addUserAddress',
					biz_param: {
						contactName: _self.obj.name,
						contactPhone: _self.obj.phone,
						province: _self.obj.addressProvinceId,
						city: _self.obj.addressCityId,
						district: _self.obj.addressDistrictId,
						detailAddr: _self.obj.detailAddr,
						type: _self.obj.type,
					}
				};
				console.log(_self.$route.params.addreId)
				if(_self.$route.params.addreId !== 'add') {
					body.biz_module = 'userAddressService';
					body.biz_method = 'updateUserAddressInfo';
					body.biz_param.id = _self.$route.params.addreId;
					body.biz_param.address = _self.obj.addressProvince + _self.obj.addressCity + _self.obj.addressDistrict + _self.obj.detailAddr
				}

				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addAddress(url, body, function(suc) {
					common.$emit('close-load');
					if(suc.data.code == '1c01') {
						common.$emit('informAddress', 'refurbish');
						window.history.go(-1);
					}
					common.$emit('message', suc.data.msg);

				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getAddress(id) {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'userAddressService',
					biz_method: 'queryAddressById',
					biz_param: {
						id: id
					}
				};
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.addressRevise(url, body, function(suc) {
					common.$emit('close-load');
					let result = suc.data.biz_result;
					_self.obj.detailAddr = result.detailAddr;
					_self.obj.name = result.contactName;
					_self.obj.phone = result.contactPhone;
					_self.obj.status = true;
				}, function(err) {
					common.$emit('close-load');
				})
			},
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		created() {
			let _self = this;
			if(_self.$route.params.addreId !== 'add') {
				var id = _self.$route.params.addreId;
				let type = _self.$route.query.value;
				console.log(_self.$route)
				if(type) {
					_self.obj.addressProvince = type.split(':')[0];
					_self.obj.addressCity = type.split(':')[1];
					_self.obj.addressDistrict = type.split(':')[2];
					_self.obj.addressProvinceId = type.split(':')[3];
					_self.obj.addressCityId = type.split(':')[4];
					_self.obj.addressDistrictId = type.split(':')[5];
				}
				_self.getAddress(id);
			}

			common.$on('newAddress', function() {
				_self.obj.name = '';
				_self.obj.phone = '';
				_self.obj.status = true;
				_self.obj.type = '';

				_self.obj.addressProvince = '';
				_self.obj.addressProvinceId = '';
				_self.obj.addressCity = '';
				_self.obj.addressCityId = '';
				_self.obj.addressDistrict = '';
				_self.obj.addressDistrictId = '';
				_self.obj.detailAddr = '';
				_self.obj.tshow = false;
			})
			common.$on('revise-address', function(item) {
				_self.getAddress(item.id);
				_self.obj.addressProvince = item.province;
				_self.obj.addressCity = item.city;
				_self.obj.addressDistrict = item.district;
				_self.obj.addressProvinceId = item.provinceId;
				_self.obj.addressCityId = item.cityId;
				_self.obj.addressDistrictId = item.districtId;
			})
		}

	}
</script>