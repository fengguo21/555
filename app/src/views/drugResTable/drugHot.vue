<style lang="less" scoped>
	.items {
		height: 110px;
		padding: 10px 20px 10px 10px;
		position: relative;
		border-bottom: 0.0769rem solid #ddd;
		&>img {
			width: 7.6923rem;
			height: 6.5384rem;
			position: absolute;
			left: 0.7692rem;
		}
		.items_news {
			margin-left: 110px;
			position: absolute;
			p {
				color: #666;
				height: 30px;
				width: 200px;
				line-height: 30px;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:nth-child(1) {
					color: #000;
					span {
						font-size: 10px
					}
				}
				span {
					color: #aaa;
				}
				&>.alias {
					width: 200px;
					display: inline-block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					&>span {
						width: 100px !important;
						display: inline-block;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		.junpGo {
			margin-left: 285px;
			position: absolute;
			right: 30px;
			img {
				margin-top: 35px;
				width: 10px;
			}
		}
	}
</style>

<template>
	<modelPage :title="my_header">
		<div id="drugHot"  slot='contain'>
			<div class="contain">
				<div class="items" v-for="item in obj" @click="jumpDetail(item.name)">
					<img :src="item.icon" />
					<div class="items_news">
						<p>{{item.name}}<span>[{{item.pinyin}}]</span></p>
						<p>英文：{{item.eName}}</p>
						<p><span style="float: left;">别名：</span><span class="alias" v-html="item.alias"></span></p>
					</div>
					<div class="junpGo">
						<img src="/static/icon/new/go_to.png" />
					</div>
				</div>

			</div>
		</div>
	</modelPage>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import modelPage from '../../components/model/modelPage'
	export default {
		data() {
			return {
				my_header: {
					name: '热门药材',
				},
				obj: {}
			}
		},
		components: {
			modelPage
		},
		methods: {
			jumpDetail(name) {
				common.$emit("informdrugDetail", name); //通知药性表详情刷新
				this.$router.push('/drugResTableDetail?name=' + name);
			},
			drugDetail(name) {
				let _self = this;
				common.$emit('show-load');
				httpService.drugResTable(common.urlCommon + common.apiUrl.most, {
					biz_module: 'breedService',
					biz_method: 'hotDrugPropertiesInfo',
					biz_param: {
						pn: 1,
						pSize: 10
					}
				}, function(suc) {
					common.$emit('close-load');
					_self.obj = suc.body.biz_result.list;
				}, function(err) {
					common.$emit('close-load');
				})
			}

		},
		mounted() {

		},
		created() {
			this.drugDetail();
		}
	}
</script>