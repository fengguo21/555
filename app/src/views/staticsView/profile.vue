<template>
	<div class="profile">
		<myHeader :param="my_header" v-if="show"></myHeader>
		<div class="bg_white">
			<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
				<mt-loadmore>
					<div class="contain">
						<div class="logo">
							<img src="/static/icon/list/green_logo.png" />
						</div>
						<div class="text">
							<div class="title">
								药材买卖网简介
							</div>
							<p>
								 药材买卖网2015年7月于上海成立，隶属于上海冕冠电子商务有限公司。是一家专门做中药材交易的电商平台，成立之初获得了知名天使投资人王刚（曾投资滴滴打车）近千万元人民币的投资。于2017年3月获得由上海健康医疗产业基金的2000万元人民币A轮融资。
							</p>
							<p>
								药材买卖网通过Saas和仓储物流体系，省去中间环节，为药材产业链中的客户提供一站式交易。在B2B的基础上，首推F2F模式，让农民和药商通过云端指尖把产品卖到全世界，旨在打造全球专业互联网药材交易平台，为产业链中的客户提供真实有效的一站式交易,是一个从农民到终端厂家的国内L型和国际L型双重结构的交易平台。
							</p>
							<p>
								目前药材买卖网平台上线了包括全草类、花类、果实籽仁类、根茎类等多个类目的近900种中药材，聚集了来自云南、广西、甘肃、贵州、四川、湖北、湖南、河南、安徽、山东、内蒙以及东北等多个地区的药农和合作社。 平台已经建立了一个专业的数据库，包含药材的图片、类别、等级、产地、学名、别名、英文名、拉丁语名等。
							</p>
							<p>
								而平台的采购方主要是国内的批发商和国外的饮片厂、药厂、中医院、食品饮料厂以及批发商，甚至亚马逊等电商平台的卖家。目前其合作的海外企业有来自美国、加拿大、哥伦比亚、迪拜、日本、韩国、法国、荷兰、比利时等40多个国家的上百家企业。
							</p>
							
						</div>

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
					name: '公司简介',
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
	.profile {
		.bg_white {
			background-color: #fff;
			.contain {
				.logo {
					background: url(/static/icon/list/probg.png) no-repeat;
					width: 100%;
					height: 14.7rem;
					background-size: 100% 100%;
					position: relative;
					img{
						width: 15.6rem;
						/*height: 3.7rem;*/
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-55%, -50%);
					}
				}
				.text {
					padding: 20px;
					.title{
						line-height: 50px;
						border-top: 1px dashed #cfcfcf;
						border-bottom: 1px dashed #cfcfcf;
						margin: 0 0 10px;
					}
					p {
						text-align: left;
						text-indent: 1.5em;
						font-size: 1.2rem;
						line-height: 2.55rem;
					}
				}
			}
		}
	}
</style>