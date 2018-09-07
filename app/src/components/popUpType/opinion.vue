<style lang="less" scoped>
	.opinion {
		overflow: hidden;
		position: absolute;
		height: 100vh;
		top: 0;
		z-index: 10000;
		width: 100%;
		text-align: center;
		.black {
			width: 100%;
			height: 100vh;
			position: absolute;
			z-index: 999;
			background-color: #000;
			top: 0;
			opacity: 0.6;
		}
		.contain {
			position: absolute;
			width: 300px;
			top: 50%;
			left: 50%;
			border-radius: 15px;
			transform: translate(-50%, -50%);
			background-color: #fff;
			z-index: 3001;
			.title {
				height: 97px;
				background: url(/static/icon/list/back.png);
				background-size: 100%;
				font-size: 19px;
				color: #fff;
				line-height: 97px;
				position: relative;
				.x {
					width: 30px;
					height: 30px;
					background: url(/static/icon/list/close.png);
					background-size: 100%;
					position: absolute;
					top: 0;
					right: 13px;
				}
			}
		}
		.item {
			font-size: 15px;
			line-height: 20px;
			padding: 15px;
			color: #de6718;
		}
		.close {
			display: inline-block;
			line-height: 36px;
			width: 150px;
			height: 36px;
			margin-bottom: 10px;
			background-color: #FF8C3F;
			border-radius: 40px;
			color: #fff;
		}
	}
</style>
<template>
	<div class="opinion">
		<div class="black" @click="cancel(todo)"></div>
		<div class="contain">
			<div class="title">
				<div class="x" @click="cancel(todo)"></div>
				<span>{{arr.title}}</span>
			</div>
			<div class="item" v-for="(todo,index) in arr.list" @click="select(todo)" v-show="index<5">
				{{todo.title}}
			</div>
			<div class="close" @click="cancel(todo)">关闭</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			arr: ''
		},
		methods: {
			select(todo) {
				this.$emit('selectIt', todo)
			},
			cancel(todo) {
				this.$emit('cancel', todo)
			}
		},
		mounted() {

		},
		created() {

		}

	}
</script>