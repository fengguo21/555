<template>
	<div class="aboutus">
		<myHeader :param="my_header" v-if="show"></myHeader>
		<div class="bg_white" :style="{ height: boxHeight + 'px' }">
			<!--<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>-->
					<div class="contain"  >
						<div class="logo">
							<div class="logo_box">
								<img src="../../../static/icon/list/logo.png" />
								<p>版本号：V{{version}}</p>
							</div>
						</div>
						<div class="list">
							<div class="li" v-for="(item,index) in list" :class="index+1 == list.length? 'noborder':''" @click="jump(item.Url)">
								<span>{{item.name}}</span>
								<img src="/static/images/right-arrow.png" class="arrow">
							</div>
						</div>
						<div style="height: 10px;background: #f3f3f3;"></div>
						<div class="qrcode">
							<div class="box">
								<div class="box_contain">
									<p>扫码下载，分享客户端给你的朋友</p>
									<img src="../../../static/icon/list/qrcode.png" />
								</div>
							</div>
						</div>
						<div class="footer">
							药材买卖网版权所有
						</div>
					</div>
				<!--</mt-loadmore>
			</div>-->
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	export default {
		data() {
			return {
				wrapperHeight: '',
				boxHeight:'',
				show: true,
				version: '',
				list: [{
					name: '版权信息',
					Url: 'copyright',
				}, {
					name: '公司简介',
					Url: 'profile',
				}, {
					name: '去评价',
					Url: '',
				}],
				my_header: {
					name: '关于我们',
				}
			}
		},
		components: {
			myHeader
		},
		methods: {
			jump(val) {
				if(val) {
					let _self = this;
					_self.$router.push('/' + val + '/us');
				} else {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if(isiOS) {
						window.location.href = 'https://itunes.apple.com/cn/app/%E8%8D%AF%E6%9D%90%E4%B9%B0%E5%8D%96%E7%BD%91/id1127754629?mt=8';
					} else {
						window.location.href = 'market://details?id=com.yaocaimaimai.yaocaimaimai';
					}
				}

			},

		},
		created() {
			let from = this.$route.params.from;
			this.version = httpService.version;
			console.log(httpService.version)
			if(from == 'ios') {
				this.show = false;
			}
		},
		mounted() {
//			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
			this.boxHeight = document.documentElement.clientHeight - 50;
		}
	}
</script>
<style lang="less" scoped>
	.aboutus {
		height: 100vh;
		.bg_white {
			overflow: auto;
			background-color: #fff;
			.contain {
				min-height: 100%;
				width: 100%;
				background-color: #fff;
				position: relative;
				padding-bottom: 40px;
				.logo {
					width: 100%;
					height: 11.34rem;
					background-color: #f3f3f3;
					position: relative;
					.logo_box {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-55%, -50%);
						img {
							width: 190px;
							/*							height: 50px;*/
						}
						p {
							font-size: 12px;
							color: #999;
							margin-top: 15px;
							padding-left: 20px;
						}
					}
				}
				.list {
					background-color: #fff;
					text-align: left;
					padding: 0 0 0 30px;
					border-top: 1px solid rgba(230, 230, 230, 0.5);
					border-bottom: 1px solid rgba(230, 230, 230, 0.5);
					.li {
						height: 4.4rem;
						line-height: 4.4rem;
						border-bottom: 1px solid rgba(230, 230, 230, 0.5);
						color: #333;
						min-height: 4.4rem;
						border-bottom: 1px solid #eee;
						position: relative;
						&.noborder {
							border-bottom: 0;
						}
						.arrow {
							position: absolute;
							height: 1rem;
							right: 1rem;
							top: 1.7rem;
						}
					}
				}
				.qrcode {
					position: relative;
					height: 200px;
					width: 100%;
					.box {
						background-color: #fff;
						height: 100%;
						width: 100%;
						position: relative;
						.box_contain {
							width: 100%;
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							p {
								font-size: 14px;
								color: #000;
								margin-bottom: 20px;
							}
							img {
								width: 111px;
								height: 111px;
								margin-bottom: -20px;
							}
						}
					}
				}
				.footer {
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 12px;
				color: #999;
			}
			}
		}
	}
</style>