<style lang="less" scoped>
	.modelPage{
		height:100vh;
		max-height:100vh ;
		background-color: #F7F7F7;
		position: relative;
		overflow: hidden;
		.headerModel{
			width: 100%;
			height: 50px;
			position: absolute;
		}
		.containModel{
			width: 100%;
			height:100vh;
			padding-top: 50px;
			overflow: auto;
			&.notWeb{
				padding-top: 0;
			}
		}
	}
</style>

<template>
	<div class="modelPage">
		<div class="headerModel" v-if="isHeader">
			<my-header :param="title"></my-header>
		</div>
		<div class="containModel" :class="{notWeb:!isHeader}">
				<slot name='contain'></slot>
		</div>
		
	</div>
</template>

<script>
	import myHeader from '../header/myHeader'
	export default {
		data() {
			return {
				isHeader:true,
			}
		},
		props: {
			title: {
				
			},
		},
		computed: {},
		components: {
			myHeader,
		},
		methods: {

		},
		created() {
			let _self = this;
			if(_self.$route.query.from){
				if(_self.$route.query.from !== 'web'){
					_self.isHeader = false;
				}
			}
		}
	}
</script>