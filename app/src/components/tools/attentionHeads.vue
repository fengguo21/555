<template>
	<div class="attention-header">
		<div class="main_content">
			<div class="go-back" @click="jumpBack()">
				<img src="/static/images/go-back.png">
			</div>
			<div class="title-name">
				<div class="title" :class="todo.status==true ? 'active':''" v-for="(todo,index) in param.list" @click="change(index)">
					{{todo.name}}
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
			}
		},
		props: {
			param: {

			}
		},
		methods: {
			jumpBack() {
				let _self = this;

				if(common.pageParam.router == 'orderSuccess') { //通过购物车提交订单，来到订单列表页，返回会购物车
					common.pageParam.router = '';
					common.$emit('setParam', 'skipPer', true); //返回页如果不这样处理，要点击两次
					_self.$router.replace('cart');
				} else if(common.pageParam.clickEvent) { //从详情页通过点击立即购买的时候来到订单列表页，返回回资源详情页
					let id = common.pageParam.clickEvent;
					common.pageParam.clickEvent = '';
					common.$emit('setParam', 'skipLogin', true);
					_self.$router.replace('resourceDetail/' + id);
				} else { //正常情况，返回首页
					console.log(11)
					this.$router.push(this.param.router);
				}

			},
			change(index) {
				let _self = this;
				for(var i = 0; i < _self.param.list.length; i++) {
					_self.param.list[i].status = false;
				}
				_self.param.list[index].status = true;
				this.param.status = index;
				common.$emit("landscapeScroll", index);
				this.$emit("tab", index);
			}
		}
	}
</script>
<style lang="less" scoped>
	.attention-header {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #ccc;
		position: fixed;
		z-index: 2000000;
		.main_content {
			position: relative;
		}
		.title-name {
			width: 100%;
			height: 50px;
			background: #ff8201;
			font-size: 1.7rem;
			line-height: 50px;
			color: white;
			.title {
				display: inline-block;
				padding: 0 10px;
				color: #FFC99D;
				&.active {
					color: #fff;
				}
			}
		}
		.go-back {
			position: absolute;
			width: 15%;
			padding-right: 5%;
			height: 50px;
			z-index: 20000;
			background: #ff8201;
			img {
				margin-top: 15px;
				height: 20px;
			}
		}
	}
</style>