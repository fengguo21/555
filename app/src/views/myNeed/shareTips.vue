<style lang="less" scoped>
	.shareTips {
		position: relative;
		.black {
			width: 100%;
			height: 100vh;
			position: absolute;
			z-index: 999;
			background-color: #000;
			top: 0;
			opacity: 0.6;
		}
		.boxPopUp {
			position: absolute;
			width: 100%;
			padding-top: 30%;
			z-index: 3001;
			.point {
				position: absolute;
				right: 10px;
				top: 10px;
				width: 49px;
				z-index: 31;
			}
			.how_share {
				margin-right: 30%;
				width: 100%;
				color: #fff;
				padding: 0 28px;
				text-align: left;
				.item {
					display: flex;
					flex-direction: row;
					align-items: center;
					.title {
						width: 20px;
						margin-right: 10px;
					}
					.share_title {
						height: 8px;
						margin-left: 10px;
					}
					.share_frined {
						height: 20px;
						margin: 0px 6px;
					}
				}
				.line {
					height: 40px;
					margin-left: 10px;
				}
				.last {
					margin-top: 40px;
				}
			}
		}
	}
</style>
<template>
	<div class="shareTips">
		<!--订单确认-->
		<div class="boxPopUp small">
			<img class="point" src="/static/icon/point.png">
			<div class="how_share">
				<div class="item"><img src="/static/icon/1.png" class="title">
					<div class="word">
						点击右上角
					</div> <img src="/static/icon/share-title.png" class="share_title"></div> <img src="/static/icon/xian.png" class="line">
				<div class="item"><img src="/static/icon/2.png" class="title">
					<div class="word">
						找到
					</div> <img src="/static/icon/send-friends.png" class="share_frined">
					<div class="word">
						发送给朋友 或
					</div> <img src="/static/icon/share-friend.png" class="share_frined">
					<div class="word">
						分享到朋友圈
					</div>
				</div>
				<div class="item last">
					<div class="word">
						把这个采购单分享给你的朋友，他们会感激您的哟
					</div>
				</div>
			</div>
		</div>

		<div @click="cancel()" class="black"></div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				priceChange: [{
					name: '价格未变',
					status: true,
				}, {
					name: '价格上涨',
					status: false,
				}, {
					name: '价格下跌',
					status: false,
				}]
			}
		},
		props: {
			popshow: {},
		},
		computed: {},
		methods: {
			cancel() {
				this.popshow.show = false;
				for(var i = 0; i < this.priceChange.length; i++) {
					this.priceChange[i].status = false;
					this.priceChange[0].status = true;
				}
			},
		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>