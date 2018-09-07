<template>
	<div class="tab">
		<div class="box">
			<div class="item" :class="{'active':item.active}" v-for="(item,index) in param.tab" @click="change(index)">
				{{item.name}}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {}
		},
		props: {
			param: {

			}
		},
		methods: {
			
			change(index) {
				let _self = this;
				for (var i=0;i<_self.param.tab.length;i++) {
					_self.param.tab[i].active = false;
				}
				_self.param.tab[index].active = true;
				this.param.show = index;
				console.log(index)
			}
		}
	}
</script>
<style lang="less" scoped>
	.tab {
		width: 100%;
		padding: 0 2.3076rem;
		.box {
			display: flex;
			.item {
				flex: 1;
				line-height: 50px;
				border-bottom: 1px solid #eee;
				font-size: 18px;
				&.active {
					border-bottom: 1px solid #ec6817;
					color: #ec6817;
				}
			}
		}
	}
</style>