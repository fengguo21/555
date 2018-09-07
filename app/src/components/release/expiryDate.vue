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
	
	.outbox_nor {
		padding: 0 0 0 15px;
		background-color: #fff;
	}
	
	.pay {
		/*border-top: 1px solid #E6E6E6;*/
		background-color: #fff;
		/*padding-left: 15px;*/
		.inbox {
			height: 50px;
			line-height: 50px;
			text-align: left;
			padding-right: 15px;
			.left {
				font-size: 15px;
				display: inline-block;
			}
			.right {
				color: #999999;
				display: inline-block;
				font-size: 12px;
			}
		}
		.inboxs {
			height: 35px;
			line-height: 35px;
			display: flex;
			flex-direction: row;
			padding-right: 10px;
			.left {
				font-size: 15px;
			}
			.right {
				color: #999999;
				font-size: 12px;
			}
			.radio {
				height: 20px;
				margin-top: 5px;
				margin-right: 10px;
			}
			.content {
				display: flex;
				flex-direction: row;
				span {
					font-size: 10px;
					color: #999;
					padding-left: 10px;
				}
			}
			.fill_box {
				height: 30px;
				
				.fill_in {
					width: 40px;
					height: 20px;
					line-height: 20px;
					text-align: center;
					margin: 0 5px 0 0;
					border-bottom: 1px solid #CBCBCB;
				}
			}
		}
		.inboxs_nor {
			border-bottom: none;
		}
	}
	
	.inline_box {
		text-align: left;
		.pay_nor {
			border-top: none;
			display: inline-block;
		}
	}
	
	.tips_box {
		text-align: left;
		margin: 10px 0 20px;
		.tips {
			padding: 0 10px;
			display: inline-block;
			font-size: 12px;
			color: #FE0000;
			background-color: #FFF8EB;
			line-height: 20px;
			border: 1px solid #FFECCB;
		}
	}
</style>
<template>
	<div class="outbox outbox_nor">
		<div class="pay">
			<div class="inbox">
				<div class="left" v-if="!obj.price_data">截止时间</div>
				<!--不指定名字通用-->
				<div class="left" v-if="obj.price_data">{{obj.price_data}}</div>
				<!--指定名字-->
				<div class='right'>(此为单选)</div>
			</div>
		</div>
		<div class="inline_box">
			<div class="pay pay_nor" v-for="(item,index) in dateArr">
				<div class="inboxs">
					<img src="/static/images/over-select.png" class="radio" v-show="item.show">
					<img src="/static/images/no-select.png" class="radio" v-show="!item.show" @click="selectDate(index)">
					<div class="content" v-if="index !==dateArr.length-1 ">{{item.one}}天</div>
					<div class="fill_box" v-if="index ==dateArr.length-1 "><input type="number" v-model="item.one" class="fill_in">天</div>
				</div>
			</div>
		</div>

		<div class="tips_box" v-if="obj.price_data">
			<div class="tips">*&nbsp;药材价格是波动的，要经常更新哦~</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import authenPopUp from '../../components/popUpType/authenPopUp'
	import httpService from '../../common/httpService.js'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		props: {
			dateArr: '',
			obj: {

			}
		},
		computed: {
			userInfor() {
				return this.$store.state.user.userInfor;
			},
		},
		methods: {
			selectDate(index) {
				let _self = this;
				for(var key in this.dateArr) {
					_self.dateArr[key].show = false;
				}
				this.dateArr[index].show = true;
				this.obj.duedates = index;
			},
		},
		created() {

		},
		mounted() {}
	}
</script>