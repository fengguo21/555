<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	textarea::-webkit-input-placeholder {
		color: #ADADAD;
	}
	
	textarea:-moz-placeholder {
		color: #ADADAD;
	}
	
	textarea::-moz-placeholder {
		color: #ADADAD;
	}
	
	textarea:-ms-input-placeholder {
		color: #ADADAD;
	}
	
	input {
		border: none;
		background-color: #fff;
	}
	
	.price_number {
		background-color: #fff;
		box-sizing: border-box;
		padding-left: 15px;
		width: 100%;
		.box {
			height: 50px;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			flex-direction: row;
			align-items: center;
			&.noborder{
				border-bottom: 0;
			}
			.number_left {
				flex: 1;
				text-align: left;
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
		.chooseBox {
			margin-right: 30px;
			/*width: 20%;*/
			/*float: right;*/
		}
		.border_set {
			border-bottom: 1px solid #bbb;
		}
		.border_set.box {
			width: 100px;
			height: 30px;
			text-align: center;
		}
	}
</style>
<template>
	<div class="price_number">
		<div class="box">
			<div class="number_left">{{obj.number_name}}</div>
			<div class="number_center">
				<input type="number" v-model="obj.number" placeholder="请输入">
			</div>
			<div class="number_right" >
				<div class="green">{{obj.number_unit}}</div>
			</div>
		</div>
		<div class="box">
			<div class="number_left">{{obj.price_name}}</div>
			<div class="number_center">
				<input type="number" v-model="obj.sale_price" placeholder="请输入">
			</div>
			<div class="number_right">
				<div class="green">元/{{obj.number_unit}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	export default {
		data() {
			return {}
		},
		props: {
			obj: {

			}
		},
		methods: {
			showAction(param) {
				this.$emit('showAction', param)
			},

			chooseBoxs(index) {
				for(var i = 0; i < this.obj.payMethodList.length; i++) {
					this.obj.payMethodList[i].status = false;
				}
				this.obj.payMethodList[index].status = true;
				this.obj.payMethod = index;
				if(index==0){
					this.obj.advance='';
					this.obj.paymentDay='';
				}
			}
		},
		components: {

		},
		created() {

		},
		mounted() {

		}
	}
</script>