<style lang="less" scoped>
.market_nav {
		width: 100vw;
		height: 46px;
		overflow: hidden;
	}
	
	.sort {
		width: 100vw;
		height: 100px;
		text-align: left;
		/*margin: 0 20px;*/
		overflow-y: hidden;
		overflow-x: scroll;
		background-color: #fff;
	}
	.box{
		width: 580px;
	}
	
	.span {
		
		text-align: center;
		display: inline-block;
		/*width: 15vw;*/
		padding: 0 10px;
		line-height: 26px;
		border-radius: 28px;
		margin:7px 5px;
		border: 1px solid #e6e6e6;
		&.active{
		border: 1px solid #ff8201;
		color: #ff8201;
	}
		.inbox{
			
		}
	}
	
</style>
<template>
	<div class="market_nav">
		<div class="sort">
			<div class="box" :style="{width : wrapperWidth + 'px'}">
				<span class="span" v-for="(todo,index) in personArr" @click="select(todo,index)"  v-bind:class="{active:personArr[index].show}">
					<span class="inbox">
						{{todo.name}}
					</span>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	import httpService from '../../common/httpService.js'
	import filters from '../../filters/filters'
	export default {
		data() {
			return {
			}
		},
		props: {
			wrapperWidth: '',
			personArr: '',
			scrollLeft: ''
		},
		components: {

		},
		methods: {
			select(todo, index) {
				let _self = this;
				for(var i = 0; i < _self.personArr.length; i++) {
					_self.personArr[i].show = false;
				}
				_self.personArr[index].show = true;
				this.$emit('selectHttp', todo)
			},
			getScrollTop() {
				this.$refs.wrapper.scrollLeft = this.scrollLeft;
			}
		},
		created() {
		},
		mounted() {
		}
	}
</script>