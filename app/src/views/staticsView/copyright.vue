<template>
	<div class="aboutus">
		<myHeader :param="my_header" v-if="show"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>
					<div class="contain">
						<p>
							1、药材买卖网拥有药材买卖网平台网站内所有信息内容（除药材买卖网商户发布的商品信息外，包括但不限于文字、图片、软件、音频、视频）的版权。
						</p>
						<p>
							2、任何被授权的浏览、复制、打印和传播属于药材买卖网内信息内容都不得用于商业目的，且所有信息内容及其任何部分的使用都必须包括此版权声明。
						</p>
						<p>
							3、药材买卖网所有的产品、技术与所有程序均属于药材买卖网识产权。服务名称及相关图形、标识等为上海冕冠电子商务有限公司注册商标。未经上海冕冠电子商务有限公司许可，任何人不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使用。否则，本网站将依法追究法律责任。
						</p>
					</div>
					
				</mt-loadmore>

			</div>
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
				show: true,
				version: '',
				
				my_header: {
					name: '版权说明',
				}
			}
		},
		components: {
			myHeader
		},
		methods: {
			

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
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>
<style lang="less" scoped>
	.aboutus {
		.bg_white {
			background-color: #fff;
			.contain {
				padding: 25px 20px 40px 33px;
				p{
					text-align: left;
					text-indent: -1.5em;
					margin: 0 0 40px;
					line-height: 2.55rem;
					font-size: 1.2rem;
				}
			}
			
		}
	}
</style>