<template>
	<div class="needList">
		<ul class="list">
			<li v-for="todo in todos" @click="jumpDetail(todo.id)" class="li sxh-border_radius">
				<div class="top">
					<img :src="todo.cFlagsPath" class="flag" v-show="todo.cFlagsPath && todo.isMy==0">
					<img src="/static/icon/zhongguo.png" class="flag" v-show="!todo.cFlagsPath && todo.isMy==0">
					<div class="its_mine" v-show="todo.isMy==1">我的</div>
					<div class="buy_type" v-show="todo.indentTypeName">{{todo.indentTypeName}}</div>
					<div class="breed">{{todo.breedName,4 | filterTxt}}</div>

					<div class="emtrys"></div>

					<div class="offerNum">已报价
						<span>{{todo.offer}}</span>人
					</div>
					<img src="/static/icon/list/ji.png" class="urgent" v-show="todo.especial == 1">
				</div>
				<div class="content">
					<div class="left">
						<div class="spec one">
							<div>规格</div>
							<div>{{todo.spec,4 | filterTxt}}</div>
						</div>
						<div class="spec">
							<div>产地</div>
							<div>{{todo.location,4 | filterTxt}}</div>
						</div>
						<div class="spec" v-show="todo.province">
							<div>交货地址</div>
							<div>{{todo.province,8 | filterTxt}}</div>
						</div>
						<div class="spec" v-show="!todo.province">
							<div>交货地址</div>
							<div>面议</div>
						</div>
						<div class="spec last">
							<div>需求数量</div>
							<div>{{todo.number,5 | filterTxt}}({{todo.unit}})</div>
						</div>

					</div>

				</div>
				<div class="bottom">
					<div class="left">
						<div class="date"><img src="/static/icon/list/time.png" />{{todo.overTime}}</div>
						<div class="dates">发布日期: {{todo.shelveTime | timeFormats}}</div>
					</div>
					<div class="emtrys"></div>
					<div class="right">
						<div class="detail" v-if="todo.especial == 0 && todo.isMy == 0 && todo.isOffer == 0">
							抢先报价
						</div>
						<div class="detail" v-if="todo.especial == 1 && todo.isMy == 0 && todo.isOffer == 0">
							抢先报价
						</div>
						<div class="detail mine_color" v-if="todo.isMy == 1 && todo.isOffer == 0">
							我的求购
						</div>
						<div class="detail report" v-if="todo.isOffer == 1">
							已报价
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			todos: ''
		},
		computed: {},
		components: {},
		methods: {
			jumpDetail(item){
				this.$emit('jumpDetail',item)
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>

<style lang="less">
	.needList {
		.list {
			margin-top: 15px;
			background-color: #f3f3f3;
			.li {
				.top {
					padding-left: 15px;
					position: relative;
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 42px;
					.offerNum {
						font-size: 14px;
						margin-top: 2px;
						margin: 0 20px 0 0;
						span {
							color: #ff8201;
						}
					}
					.flag {
						width: 25px;
						height: 20px;
						margin: 0px 4px 0px 0;
						vertical-align: middle;
						box-shadow: 1px 1px 1px 0px rgba(35, 20, 17, 0.43);
					}
					.buy_type {
						height: 20px;
						line-height: 20px;
						float: left;
						font-size: 12px;
						padding: 0 4px;
						color: #fff;
						vertical-align: middle;
						margin: 0 4px 0 0px;
						box-shadow: 1px 1px 1px 0px rgba(35, 20, 17, 0.43);
						background-color: #ff8201;
					}
					.drug_factory {
						width: 40px;
						font-size: 12px;
						line-height: 16px;
						height: 16px;
						background-color: #FF7600;
						color: #fff;
						margin: 0 0 0 4px;
					}
					.its_mine {
						background-color: #F76467;
						height: 20px;
						line-height: 20px;
						float: left;
						font-size: 12px;
						padding: 0 4px;
						color: #fff;
						vertical-align: middle;
						margin: 0 4px 0 0px;
						box-shadow: 1px 1px 1px 0px rgba(35, 20, 17, 0.43);
					}
					.breed {
						font-size: 17px;
						margin-right: 5px;
					}
					.emtrys {
						flex: 1;
					}
					.urgent {
						position: absolute;
						height: 28px;
						right: 0px;
						top: 0px;
					}
				}
				.content {
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 1px;
					.left {
						background-color: #f6f6f6;
						display: flex;
						padding: 2px 0 0;
						font-size: 15px;
						height: 55px;
						line-height: 25px;
						color: #333;
						text-align: center;
						.spec {
							border-right: 1px solid #ebebeb;
							flex: 1;
							div:nth-child(1) {
								color: #999999;
								font-size: 13px
							}
							div:nth-child(2) {
								color: #000;
								font-size: 15px;
								/*width: 91px;*/
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							&.last {
								border-right: 0;
							}
						}
					}
				}
				.bottom {
					padding-left: 15px;
					display: flex;
					height: 55px;
					.left {
						line-height: 20px;
						padding: 5px 0 0 0;
						.date {
							display: flex;
							flex-direction: row;
							justify-content: center;
							align-items: center;
							font-size: 13px;
							color: #FF8100;
							padding-right: 15px;
							img {
								width: 12px;
								margin-right: 5px;
							}
						}
						.dates {
							font-size: 12px;
							color: #898989;
						}
						@media screen and (max-width: 320px) {
							.breed {
								font-size: 15px;
								margin-right: 5px;
							}
							.date {
								font-size: 10px;
								padding-right: 10px;
							}
						}
					}
					.emtrys {
						flex: 1;
					}
					.right {
						.detail {
							background-color: #FF8300;
							height: 35px;
							line-height: 35px;
							color: #fff;
							font-size: 16px;
							border-radius: 20px;
							width: 120px;
							margin: 10px 15px;
						}
						.mine_color {
							background-color: #FF6060;
						}
						.report {
							background-color: #B5B5B5;
						}
					}
				}
			}
		}
	}
</style>