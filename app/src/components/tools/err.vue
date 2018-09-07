<template>
	<div class="err" :style="{ height: wholeHeight + 'px' }">
		<div class="img">
			<img v-show="!param.addAddress" :src="param.url">
			<img v-show="param.addAddress" :src="param.url">
			<p>{{param.err}}</p>
			<div class="router" @click="jump" v-show="param.router">{{param.next_step}}</div>
			<div class="addAddress" v-on:click="addAddress"  v-show="param.addAddress">添加收货地址</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {

			}
		},
		props: {
			param: {

			}
		},
		methods: {
			jump() {
				let _self = this;
				if(_self.param.router) {
					if(_self.param.router == 'resource') {
						common.$emit('selectRes', 'resource');
						_self.$router.push('home');
					} else {
						_self.$router.push(_self.param.router)
					}
				}

			},
			addAddress: function() {
				common.$emit('newAddress', 1);
				this.$router.push('/addAddress/add');
			},
		}

	}
</script>
<style lang="less" scoped>
	.err {
		width: 100%;
		height: 100%;
		.img {
			width: 200px;
			/*height: 120px;*/
			margin-left: -100px;
			margin-top: -60px;
			position: absolute;
			left: 50%;
			top: 45%;
			p {
				font-size: 1.1rem;
				line-height: 1.5rem;
				color: #999;
			}
			img {
				width: 80px;
				height: 80px;
				margin-bottom: 10px;
			}
			.router {
				padding: 5px;
				width: 80px;
				font-size: 12px;
				color: white;
				background: #ff8201;
				border-radius: 4px;
				margin-left: 60px;
				margin-top: 10px;
			}
			.addAddress {
				display: inline-block;
				width: 140px;
				height: 40px;
				border: 1px solid #ff7500;
				line-height: 40px;
				color: #ff7500;
				border-radius: 40px;
				margin-top: 20px;
			}
		}
	}
</style>