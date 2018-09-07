<style lang="less" scoped>
	.head {
		height: 50px;
		background-color: #ff8201;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		.go_back {
			position: absolute;
			z-index: 20;
			left: 0;
			top: 0;
			width: 20%;
			height: 100%;
			padding-left: 5%;
			display: flex;
			flex-direction: row;
			align-items: center;
			img {
				height: 20px;
			}
		}
		.title {
			width: 100%;
			text-align: center;
			font-size: 1.7rem;
			color: #fff;
		}
		.revise {
			position: absolute;
			z-index: 20;
			right: 0;
			top: 0;
			width: 20%;
			height: 100%;
			font-size: 1.3rem;
			line-height: 50px;
			color: #fff;
		}
	}
</style>
<template>
	<div class="head">
		<div class="go_back" @click="jumpBack()"v-if="param.goback !==false" >
			<img src="/static/images/go-back.png">
		</div>
		<div class="title" v-if="param.name">{{param.name}}</div>
		<div class="revise" v-if="param.revise && !param.show" @click="revise">编辑</div>
		<div class="revise" v-if="param.revise && param.show" @click="over">完成</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import httpService from '../../common/httpService.js'
	export default {
		data() {
			return {

			}
		},
		props: {
			param: {
				default: function() {
					return {
						goback: true
					}
				}
			}
		},
		created() {

		},
		methods: {
			jumpBack() {
				let _self = this;
				if(_self.param.message) {
					common.$emit('indexToMessage', 1)
				} else if(_self.param.index) {
					common.$emit('messageBack', 1)
				} else if(_self.param.cleargo_back) {
					common.$emit('perfect_obj')
				}
				window.history.go(-1);
			},
			revise() {
				this.param.show = true;
			},
			over() {
				this.param.show = false;
			},
		},

	}
</script>