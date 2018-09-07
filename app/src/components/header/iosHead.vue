<template>
	<div class="iosHead">
		<div class="my-header" :class="$route.query.from == 'erp'?'erp-header':''">

			<div class="header_content">
				<div class="side" @click="jumpBack()">
					<img src="/static/images/go-back.png">
				</div>
				<div class="title-name">
					<p>{{param.name}}</p>
				</div>
				<div class="side" v-if="param.search=='1'" @click="jumpSearch()">
					<img src="/static/icon/new/search.png">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'

	export default {
		data() {
			return {
				type: ''
			}
		},
		props: {
			param: {}
		},
		methods: {
			jumpSearch() {
				let _self = this;
				common.searchType = 'breed';
				common.$emit('setParam', 'router', 'drugResTable');
				common.$emit('setParam', 'myType', _self.param.type);
				common.$emit('informIosType', _self.param.type);
				_self.$router.push('/releaseSearch');
			},
			jumpBack: function() {
				let _self = this;
				window.history.go(-1);
			},
		},
		created() {

		},
		mounted() {
			let _self = this;
			setTimeout(function() {
				window.goback = function() {
					try {
						if(_self.param.appBack) {
							window.webkit.messageHandlers.AppModel.postMessage({
								body: 'iosResult'
							});
						} else {
							window.Android.back();
						}
					} catch(e) {
						window.history.go(-1);
					}
				}
				var iframe = document.createElement('iframe')
				iframe.style.visibility = 'hidden'
				iframe.style.width = '1px'
				iframe.style.height = '1px'
				iframe.onload = function() {
					setTimeout(function() {
						document.body.removeChild(iframe)
					}, 0)
				}
				document.body.appendChild(iframe)
			}, 0)
		}
	}
</script>
<style lang="less" scoped>
	.iosHead {
		position: relative;
		.my-header {
			width: 100%;
			height: 50px;
			background: #ff8201;
			
			.header_content {
				width: 100%;
				height: 50px;
				z-index: 2000;
				overflow: hidden;
				.title-name {
					width: 70%;
					height: 50px;
					float: left;
					font-size: 1.7rem;
					line-height: 50px;
					color: white;
				}
				.side {
					float: left;
					width: 15%;
					padding-right: 5%;
					height: 50px;
					z-index: 20000;
					img {
						margin-top: 15px;
						height: 20px;
					}
				}
			}
			&.erp-header{
				background: #fff;
				border-bottom:1px solid #E6E6E6;
				.title-name{
					color: #000;
				}
				.side{
					img{
						filter: invert(100%);
					}
				}
			}
		}
	}
</style>