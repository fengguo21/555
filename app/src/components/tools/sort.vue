<style lang="less" scoped>
	.sort {
		position: relative;
		z-index: 1;
		.bg {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 1;
			height: 100vh;
		}
		.sort_content {
			width: 100%;
			border-bottom: 1px solid rgba(230, 230, 230, 0.5);
			background: white;
			position: relative;
			display: flex;
			z-index: 2;
			.box {
				flex: 1;
				line-height: 40px;
				&.sort_content_detail_select {
					color: #ff8201;
				}
				.overlist{
					display: inline-block;
				}
				.img {
					max-height: 6px;
					margin-left: 5px;
					vertical-align: middle;
					&.bigImg {
						max-height: 11px;
					}
				}
			}
			.sort_cell {
				background-color: #fff;
				width: 100%;
				position: absolute;
				z-index: 2;
				margin-top: 41px;
				text-align: left;
				.cell_p {
					position: absolute;
					left: 10px;
					font-size: 1.1rem;
				}
			}
		}
	}
</style>
<template>
	<div class="content sort">
		<div aria-label="关闭弹层" class="bg" v-show="selectShow" @click="cancel()"></div>
		<div class="sort_content">
			<div class="box" v-bind:class="item.class" v-for="(item,index) in paramArr" @click="showTable(item,index)">
				<p class="overlist">{{item.name}}</p>
				<img class="img" :class="{bigImg:index == paramArr.length-1}" v-bind:src="item.url">
			</div>
			<div class="sort_cell" v-show="selectShow">
				<a v-for="(item,index) in selectArr" @click="getAsc(item,index)">

					<mt-cell class="cells" v-bind:class="{last:index==selectArr.length - 1}">
						<p class="cell_p">{{item.name}}</p>
						<img class="cell_image" src="/static/icons/selected.png" style="max-height:10px" v-show="item.show">
					</mt-cell>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				selectShow: false,
				selectArr: [],
				selectIndex: 0
			}
		},
		props: {
			sortRouter: {
				type: String,
				default: '/home'
			},
			paramArr: [Array],
			addressSele: ''
		},
		methods: {
			cancel() {
				this.selectShow = !this.selectShow;
			},
			showTable: function(item, index) {
				let _self = this;
				if(item.asc == 'location') {
					if(_self.addressSele) {
						_self.$router.push('/provenanceSelection/' + this.sortRouter + '?type=0');
					} else {
						_self.$router.push('/provenanceSelection/' + this.sortRouter + '?type=1');
					}
					common.$emit('addressSelect', '选择地址')
					this.selectShow = false;
				} else {
					if(item.asc == 'comprehensive') {
						console.log(2, this.paramArr[this.selectIndex].select)
						if(!this.paramArr[this.selectIndex].select || this.paramArr[this.selectIndex].select == 'undefined') {
							console.log(1231, _self.paramArr[this.selectIndex].select)
							//_self.paramArr[_self.selectIndex].class = 'sort_content_detail_select';
							//处罚综合筛选,让其他的class回归原来的样子,选择产地的页面地区清空      
							_self.$emit('initial', _self.paramArr[this.selectIndex].select);
							console.log(66, !this.paramArr[this.selectIndex].select)
						}

					} else {
						this.selectShow = !this.selectShow;
						this.selectIndex = index;
						this.selectArr = item.sortArr;
					}
				}

			},
			getAsc: function(item, index) {
				if(!item.asc) {
					this.paramArr[this.selectIndex].name = this.paramArr[this.selectIndex].saveName;
					this.paramArr[this.selectIndex].url = '/static/icons/drop_down.png';
					this.paramArr[this.selectIndex].class = 'sort_content_detail';
				} else {
					this.paramArr[this.selectIndex].class = 'sort_content_detail_select';
					this.paramArr[this.selectIndex].name = item.name;
					if(item.asc == 'low') {
						this.paramArr[this.selectIndex].url = '/static/icons/drop_down_selected.png';
					} else if(item.asc == 'top') {
						this.paramArr[this.selectIndex].url = '/static/icons/take_back.png';
					}
				}
				console.log(this.paramArr[this.selectIndex].sortArr)
				for(var i = 0; i < this.paramArr[this.selectIndex].sortArr.length; i++) {
					this.paramArr[this.selectIndex].sortArr[i].show = false;
				}
				item.show = true;
				this.selectShow = false;

				let _self = this;
				_self.$emit("postId", item);
			}
		},
		created() {
			let _self = this;
			_self.selectArr = _self.paramArr[0].sortArr;
		}
	}
</script>