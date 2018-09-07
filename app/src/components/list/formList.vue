<style lang="less">
	.formList {
		margin-left: 15px;
		padding: 10px 10px 10px 0;
		border-bottom: 1px solid #e6e6e6;
		.select {
			font-size: 15px;
			height: 30px;
			position: relative;
			line-height: 30px;
			display: flex;
			flex-direction: row;
			align-items: center;
			.number_left {
				flex: 1;
				text-align: left;
			}
			/*select部分*/
			.boxAll {
				width: 160px;
				display: flex;
				flex-direction: row;
				.chooseBox {
					flex: 1;
					img {
						width: 15px;
					}
				}
			}
			/*list部分*/
			.number_center {
				flex: 1;
				padding-right: 10px;
				text-align: right;
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
		.choose {
			flex-direction: row;
			line-height: 30px;
			position: relative;
			background: #fff;
			.choose_left {
				display: inline-block;
				position: absolute;
				left: 0px;
				font-size: 15px;
				color: #333333;
			}
			.choose_center {
				padding: 0 30px 0 70px;
				text-align: right;
				width: 100%;
				border: none;
				outline: none;
				font-size: 15px;
				height: 30px;
				color: #666;
				position: relative;
				.placeholder {
					font-size: 12px;
					color: #ccc;
					padding-left: 20px;
				}
			}
			.img {
				display: inline-block;
				width: 30px;
				padding-top: 0px;
				text-align: center;
				position: absolute;
				right: 0;
				top: 0;
				img {
					margin-top: 5px;
					height: 18px;
				}
			}
		}
	}
</style>

<template>
	<div class="formList">
		<div class="select" v-if="formInfo.type == 'select'">
			<div class="number_left">{{formInfo.title}}</div>
			<div class="boxAll">
				<div v-for="(item,index) in formInfo.option" class="chooseBox" @click="chooseBoxs(index)">
					<img src="/static/images/no-select.png" v-if="!item.status">
					<img src="/static/images/over-select.png" v-if="item.status"> {{item.name}}
				</div>
			</div>
		</div>
		<div class="select" v-if="formInfo.type == 'list'">
			<div class="number_left">{{formInfo.title}}</div>
			<div class="number_center">
				<input type="number" maxlength="3" v-model="formInfo.value" onKeyUp="this.value=this.value.replace(/\D/g,'')" onpaste="return false" :placeholder="formInfo.placeholder">
			</div>
			<div class="number_right">
				<div class="green">{{formInfo.right}}</div>
			</div>
		</div>
		<div class="select choose" v-if="formInfo.type == 'choose'">
			<div class="choose_left">{{formInfo.title}}</div>
			<div class="choose_center" @click="chooseArg">
				<div class="ads">
					<span class="placeholder" v-if="!formInfo.value">{{formInfo.placeholder}}</span>
					<span v-if="formInfo.value">{{formInfo.value}}</span>
				</div>
				<div class="img">
					<img src="/static/icons/rele-right.png">
				</div>
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
			formInfo: {}
		},
		computed: {},
		components: {},
		methods: {
			chooseArg(){
				this.$emit('accordFunc', 1)
			},
			chooseBoxs(index) {
				for(var i = 0; i < this.formInfo.option.length; i++) {
					this.formInfo.option[i].status = false;
				}
				this.formInfo.option[index].status = true;
				if (index) {
					this.formInfo.returnGoods=1
				} else{
					this.formInfo.returnGoods=0
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