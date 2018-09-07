<template>
	<div class="resourceList">
		<!--列表部分-->
		<ul class="list" id="list">
			<li class="li" v-for="(todo,index) in param" @click="jumpDetail(todo.id)">
				<img src="/static/icon/homesample.png" v-show="todo.sampling == 1" class="sampling">
				<div class="content">
					<div class="images">
						<img :src="todo.image[0]" :class="todo.imgsize.width>todo.imgsize.height?'breedImgs':'breedImg'">
					</div>
					<div class="center">
						<div class="breed">
							<div class="its_mine" v-show="todo.isMy==1">我的</div>
							<img :src="todo.cFlagsPath" class="zheng" v-show="todo.cFlagsPath && todo.isMy==0">
							<img src="/static/icon/list/zheng.png" class="its_zheng" v-show="todo.especial == 1">
							<div class="breed_name">
								{{todo.breedName,8 | filterTxt}}
							</div>
						</div>
						<div class="spec">
							<img src="/static/icon/list/local.png" />
							<span>{{todo.location}}</span>
						</div>
						<div class="spec">
							<img src="/static/icon/list/spc.png" />
							<span>{{todo.spec}}</span>
						</div>
						<div class="price">￥{{todo.price}}/
							<span>{{todo.unit}}</span>
						</div>
						<div class="collected">查看详情</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	import sort from '../../components/tools/sort'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	export default {
		data() {
			return {
			}
		},
		props: {
			param:{},
			httpPraram:{}
		},
		computed: {},
		components: {
		},
		methods: {
			jumpDetail(id) {
				common.$emit("resourceDetail", id);
				this.$router.push('resourceDetail/' + id);
			},
		},
		watch: {

		},
		mounted() {

		},
		created() {
		}
	}
</script>
	
<style lang="less" scoped>
	.resourceList{
		.list {
			.li {
				padding-left: 10px;
				background-color: #fff;
				position: relative;
				margin: 15px 10px;
				border-radius: 8px;
				overflow: hidden;
				box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
				.sampling {
					position: absolute;
					width: 38px;
					right: 0;
					top: 0;
				}
				.content {
					position: relative;
					display: flex;
					flex-direction: row;
					padding: 10px 10px 10px 0;
					.images {
						width: 95px;
						height: 90px;
						position: relative;
						overflow: hidden;
						.breedImg {
							width: 100%;
							min-height: 90px;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
						.breedImgs {
							min-width: 95px;
							height: 100%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
						}
					}
					.collect {
						position: absolute;
						width: 30px;
						right: 16px;
						bottom: 10px;
					}
					.collected {
						position: absolute;
						padding: 5px 10px;
						border: 1px solid #e6e6e6;
						border-radius: 15px;
						font-size: 12px;
						color: #666;
						right: 16px;
						bottom: 10px;
					}
					.center {
						margin-left: 11px;
						text-align: left;
						.breed {
							font-size: 16px;
							color: #333;
							line-height: 20px;
							margin-bottom: 7px;
							display: flex;
							flex-direction: row;
							.its_zheng {
								line-height: 20px;
								height: 20px;
								float: left;
								vertical-align: middle;
								margin: 0 4px 0 0px;
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
							.zheng {
								float: left;
								width: 24px;
								height: 18px;
								margin: 1px 4px 0px 0;
								vertical-align: middle;
								box-shadow: 1px 1px 1px 0px rgba(35, 20, 17, 0.43);
							}
						}
						.spec {
							font-size: 13px;
							color: #666;
							line-height: 13px;
							margin-bottom: 5px;
							&.price {
								color: #fb2c0d;
							}
							img {
								height: 16px;
								vertical-align: middle;
							}
						}
						.location {
							margin-top: 8px;
						}
						.price {
							font-size: 16px;
							color: #FF4541;
							span {
								font-size: 14px;
							}
						}
					}
				}
			}
		}
	}
</style>