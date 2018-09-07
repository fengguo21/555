<template>
	<div class="verificationCode">
		<input type="text" :class="{biz:this.$route.name == 'findPassWord'}"  v-model="params.value" placeholder="请输入图形验证码" />
		<img :src='params.codeImg' @click="changeOne" />
	</div>
</template>

<script>
	//	import common from '../../common/common.js'
	export default {
		data() {
			return {}
		},
		props: {
			params: {}
		},
		computed: {},
		components: {},
		methods: {
			changeOne() {
				this.$emit("changeCode", 1);
			}
		},
		watch: {

		},
		mounted() {

		},
		created() {
			console.log(this.$route)
		}
	}
</script>

<style lang="less">
	.verificationCode {
		width: 100%;
		height: 100%;
		position: relative;
		input {
			display: inline-block;
			width: 100%;
			height: 100%;
			border: 0;
			padding: 10px 100px 10px 10px;
			outline: none;
			background-color: transparent;
			&.biz{
				padding-left: 50px;
			}
			&::-webkit-input-placeholder {
				/* WebKit browsers */
				font-size: 16px !important;
			}
			&:-moz-placeholder {
				/* Mozilla Firefox 4 to 18 */
				font-size: 16px !important;
			}
			&::-moz-placeholder {
				/* Mozilla Firefox 19+ */
				font-size: 16px !important;
			}
			&:-ms-input-placeholder {
				/* Internet Explorer 10+ */
				font-size: 16px !important;
			}
		}
		img {
			width: 100px;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
		}
	}
</style>