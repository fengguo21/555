<style lang="less" scoped>
	input[type="text"],
	input[type="submit"],
	input[type="reset"],
	select,
	textarea {
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	input,
	textarea {
		border: none;
		background-color: #fff;
	}
	
	.basic_top {
		background-color: #fff;
		margin: 10px;
		border-radius: 8px;
		box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
		.breed_name {
			background-color: #fff;
			box-sizing: border-box;
			padding-left: 15px;
			width: 100%;
			border-bottom: 1px solid #E6E6E6;
			height: 50px;
			&.the_last {
				border-bottom: none;
				border-radius: 0 0 15px 15px;
			}
			.inbox {
				/*height: 50px;
				display: flex;
				flex-direction: row;
				align-items: center;*/
				position: relative;
				padding: 12px 15px 12px 0;
				/*border-bottom: 1px solid #e6e6e6;*/
				line-height: 21px;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-direction: row;
				flex-direction: row;
				text-align: left;
				color: #333333;
				&.margin10 {
					padding: 20px;
				}
				.lastday {
					margin-top: 10px;
					background-color: #FF8201;
					position: absolute;
					right: 10px;
					bottom: -10px;
					/*width: 116px;*/
					padding: 0 20px;
					height: 35px;
					border-radius: 50px;
					border: 0;
					color: #fff;
					img {
						width: 16px;
						height: 16px;
						vertical-align: middle;
						margin-right: 5px;
					}
				}
				.breed_left {
					font-size: 15px;
					color: #343434;
					width: 70px;
					text-align: left;
				}
				.breed_center {
					flex: 1;
					text-align: left;
					/*padding: 10px;*/
					.red {
						color: red !important;
					}
					.title {
						width: 100%;
						color: #8E97A1;
						text-align: left;
					}
					input {
						color: #333333;
						opacity: 1;
					}
					.my_spec {
						width: 150px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					textarea {
						color: #333333;
						opacity: 1;
						height: 18px;
					}
				}
				.img {
					width: 30px;
					img {
						height: 18px;
					}
				}
			}
			.head {
				justify-content: space-between;
				padding-right: 15px;
				.left {
					color: #333;
					font-size: 17px;
					display: flex;
					flex-direction: row;
					align-items: center;
					.yaochang {
						height: 16px;
						margin-right: 2px;
					}
					span {
						color: #ff8201;
						font-size: 13px;
					}
				}
				.right {
					display: flex;
					flex-direction: row;
					.time {
						height: 19px;
						margin-right: 4px;
						img {
							height: 100%;
						}
					}
					span {
						color: #ff8201;
					}
				}
			}
			input[disabled] {
				color: #000 !important;
				opacity: 1 !important;
				width: 100%;
			}
		}
	}
</style>
<template>
	<div class="basic_top">
		<titles tab="8" :obj="obj"></titles>
		<div class="breed_name">
			<div class="inbox head">
				<!-- <div class="breed_left">品名</div>
                        <div class="breed_center">
                            {{obj.breedName}}
                        </div> -->
				<div class="left">
					<!--<img src="/static/icon/yaochang.png" class="yaochang" v-show="obj.indentType==0">-->
					<img src="/static/icon/urgent-radius.png" alt="" class="yaochang" v-show="obj.especial==1"> {{obj.breedName}}
					<span> {{obj.need_number}}({{obj.need_unit}})</span>
				</div>
				<!--<div class="right">
					<div class="time">
						<img src="/static/icon/times.png">
					</div>
					<div>{{obj.duedate | needTimeDay}}</div>
				</div>-->
			</div>
		</div>
		<div class="breed_name"> <!--@click="showAction('spec')"-->
			<div class="inbox">
				<div class="breed_left">规格</div>
				<div class="breed_center">
					<input type="text" class="my_spec" :class="obj.first_spec==obj.spec?'':'red'" placeholder="请选择您的产品规格" disabled="disabled" v-model="obj.spec">

					<!-- <textarea placeholder="请选择您的产品规格" disabled="false" v-model="obj.spec"></textarea> -->
				</div>
				<!--<div class="img">
					<img src="/static/icons/rele-right.png">
				</div>-->
			</div>
		</div>
		<div class="breed_name"> <!--@click="showAction('place')"-->
			<div class="inbox">
				<div class="breed_left">产地</div>
				<div class="breed_center">
					<input type="text" :class="obj.first_city==obj.place?'':'red'" placeholder="请选择您的产品规格" disabled="disabled" v-model="obj.place">
				</div>
				<!--<div class="img">
					<img src="/static/icons/rele-right.png">
				</div>-->
			</div>
		</div>
		<div class="breed_name ">
			<div class="inbox">
				<div class="breed_left">质量要求</div>
				<div class="breed_center">
					<input type="text" disabled="disabled" v-model="obj.msgQuility">
				</div>

			</div>
		</div>
		<!--<titles tab="6"></titles>-->
		<div class="breed_name ">
			<div class="inbox">
				<div class="breed_left">交货地址</div>
				<div class="breed_center">
					<input type="text" disabled="disabled" style="" v-model="obj.payAddress">
				</div>

			</div>
		</div>
		<div class="breed_name" style="border: 0;height: auto !important;">
			<div class="inbox" style="height: auto !important;">
				<div class="breed_left">备注信息</div>
				<div class="breed_center">
					{{obj.description}}
				</div>
			</div>
		</div>
		<div class="breed_name  the_last ">
			<div class="inbox">
				<button class="lastday"><img src="/static/icon/list/timer.png" />{{obj.duedate | needTimeDayButton}}</button>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
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
			showAction(param) {
				this.$emit('showAction', param);
			}
		},
		components: {
			titles
		},
		created() {

		},
		mounted() {

		}
	}
</script>