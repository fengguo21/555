<style lang="less" scoped>
	.select_type {
		position: absolute;
		left: 50%;
		top: 50%;
		background-color: #fff;
		border-radius: 15px;
		z-index: 3001;
		width: 270px;
		transform: translate(-50%,-50%);
		.name {
			height: 127px;
			background: url(/static/icon/list/miaoBack.png) no-repeat;
			background-size: 100%;
			font-size: 19px;
			color: #fff;
			line-height: 97px;
			position: relative;
			.x {
				width: 30px;
				height: 30px;
				background: url(/static/icon/list/close.png) no-repeat;
				background-size: 100%;
				position: absolute;
				top: 0;
				right: 13px;
			}
		}
		.titile{
			margin: 10px 0;
			&>p:nth-child(1){
				color: #ff8a00;
				font-size: 18px;
				line-height: 30px;
			}
			&>p:nth-child(2){
				color: #333;
				font-size: 13px;
				line-height: 30px;
			}
		}
		.bottom {
			margin-bottom: 20px;
			.button {
				display: inline-block;
				height: 40px;
				font-size: 18px;
				line-height: 40px;
				text-align: center;
				width: 112px;
				height: 40px;
				margin: 0 auto;
				border-radius: 20px;
				color: #fff;
				background:#FFC000; 
				&.bgc{
					background: #F59D11;
				}
			}
		}
	}
</style>
<template>
	<div class="select_type" v-show="param.selectType">
		<div class="name">
			<div class="x" @click="concel"></div>
		</div>
		<div class="titile">
			<p>身份认证</p>
			<p>我们将为您提供更好更优质的服务</p>
		</div>
		<div class="bottom">
			<div class="button" @click="person">个人认证</div>
			<div class="button bgc" @click="company">企业认证</div>
		</div>

	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	export default {
		data() {
			return {

			}
		},
		props: {
			param: {

			}
		},
		methods: {
			concel(){
				let _self = this;
				_self.param.selectType = false;
				this.$emit('cancel')
			},
			person() {
				let _self = this;
				_self.$router.push('/personalStep1');
			},
			company() {
				let _self = this;
				_self.$router.push('/companyAuth');
			}
		},
		created() {
			let _self = this;

		}
	}
</script>