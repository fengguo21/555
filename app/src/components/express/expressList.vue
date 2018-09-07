<style lang="less">
#expressList{
	ul{
		li{
			height: 45px;
			border-bottom: 0.5px solid #ccc;
			line-height: 45px;
			text-align: left;
			padding: 0 10px;
		}
	}
}
</style>

<template>
	<div id="expressList">
		<myHeader :param="param"></myHeader>
		<ul>
			<li v-for="(todo, index) in expressList" @click="chooseExpress(todo)">{{todo.name}}({{todo.code}})</li>
		</ul>
	</div>
</template>

<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import myHeader from '../../components/header/myHeader'
	import imageUpload from '../../components/release/upLoadImgs'
	export default {
		data() {
			return {
				param: {
					name: '选择快递',
				},
				expressList:[],
			}
		},
		props: {},
		computed: {},
		components: {
			myHeader
		},
		methods: {
			getHttp() {
				let _self = this;
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {
					biz_module: 'logisticsService',
					biz_method: 'queryExpressList',
					biz_param: {}
				};
				httpService.begBuyList(url, body, function(suc) {
					common.$emit('close-load');
					_self.expressList=suc.body.biz_result.list;
				}, function(err) {
					common.$emit('close-load');

				})

			},
			chooseExpress(item){
				common.$emit("express", item);
				window.history.go(-1);
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {
			this.getHttp()
		}
	}
</script>

