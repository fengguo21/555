<style lang="less">
	.paymentDays {
		margin-left: 15px;
		.paymentDays-box {
			height: 50px;
			line-height: 50px;
			display: flex;
			flex-direction: row;
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
			&.noborder {
				border-bottom: 0;
			}
			.number_left {
				flex: 1;
				text-align: left;
			}
			.boxAll {
				width: 160px;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-direction: row;
				flex-direction: row;
				.chooseBox {
					margin-right: 30px;
				}
			}
			.number_center {
				flex: 1;
				padding-right: 10px;
				input {
					width: 100%;
					height: 30px;
					font-size: 15px;
					text-align: right;
					border: thin;
				}
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
</style>

<template>
	<div class="paymentDays">
		<div class="paymentDays-box" v-bind:class=" obj.payMethod ? '':'noborder'">
			<div class="number_left">此价格为</div>
			<div class="boxAll">
				<div v-for="(item,index) in obj.payMethodList" class="chooseBox" @click="chooseBoxs(index)">
					<img style="width: 15px;" src="/static/images/no-select.png" v-if="!item.status">
					<img style="width: 15px;" src="/static/images/over-select.png" v-if="item.status"> {{item.name}}
				</div>
			</div>
		</div>
		<div class="paymentDays-box" v-show="obj.payMethod">
			<div class="number_left">预付</div>
			<div class="number_center">
				<input type="number" maxlength="3" v-model="obj.advance" onKeyUp="this.value=this.value.replace(/\D/g,'')" onpaste="return false" placeholder="请填写百分比">
			</div>
			<div class="number_right">
				<div class="green">%定金</div>
			</div>
		</div>
		<div class="paymentDays-box" v-show="obj.payMethod" v-bind:class=" obj.payMethod ? 'noborder':''">
			<div class="number_left">余款账期为</div>
			<div class="number_center">
				<input type="number" v-model="obj.paymentDay" onKeyUp="this.value=this.value.replace(/\D/g,'')" onpaste="return false" placeholder="请填写天数">
			</div>
			<div class="number_right">
				<div class="green">天</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			obj: {}
		},
		computed: {},
		components: {},
		methods: {
			chooseBoxs(index) {
				for(var i = 0; i < this.obj.payMethodList.length; i++) {
					this.obj.payMethodList[i].status = false;
				}
				this.obj.payMethodList[index].status = true;
				this.obj.payMethod = index;
				if(index == 0) {
					this.obj.advance = '';
					this.obj.paymentDay = '';
				}
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>