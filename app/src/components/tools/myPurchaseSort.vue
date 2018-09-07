<template>
	<div class="content mypurchase_sort">
		<div aria-label="关闭弹层" class="bg" v-show="selectShow" @click="cancel()"></div>
		<div class="sort_content">
			<div v-bind:class="item.class" v-for="(item,index) in paramArr" @click="showTable(item,index)">
				{{item.name}}<img v-bind:src="item.url">
			</div>
			<div class="sort_cell" v-show="selectShow">
				<a v-for="item in selectArr" @click="getAsc(item)">
					<mt-cell>
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
				selectIndex: 0,
			}
		},
		props: {
			sortRouter: {
				type: String,
				default: '/home'
			},
			paramArr: [Array]
		},
		methods: {
			cancel() {
				this.selectShow = !this.selectShow;
			},
			showTable: function(item, index) {
				let _self = this;
				if(item.asc == 'location') {
					this.$router.push('provenanceSelection');
				} else {
					this.selectShow = !this.selectShow;
					this.selectIndex = index;
					this.selectArr = item.sortArr;
				}
			},
			getAsc: function(item) {
				console.log(item);
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
			this.selectArr = this.paramArr[0].sortArr;
			var arg = '';
			if(this.$route.query.type) {
				for(var i = 0; i < _self.paramArr.length; i++) {
					_self.paramArr[i].name = _self.paramArr[i].saveName;
					_self.paramArr[i].url = '/static/icons/drop_down.png';
					_self.paramArr[i].class = 'sort_content_detail';
				}
				arg = _self.paramArr[3].sortArr[this.$route.query.type];
				_self.selectIndex = 3;
				_self.getAsc(arg);
			}

			common.$on('informMyPurchase', function(item) {

				for(var i = 0; i < _self.paramArr.length; i++) {
					_self.paramArr[i].name = _self.paramArr[i].saveName;
					_self.paramArr[i].url = '/static/icons/drop_down.png';
					_self.paramArr[i].class = 'sort_content_detail';
				}
				arg = _self.paramArr[3].sortArr[item];
				_self.selectIndex = 3;
				_self.getAsc(arg);
			});

			common.$on('informMyRes', function(item) {
				for(var i = 0; i < _self.paramArr.length; i++) {
					_self.paramArr[i].name = _self.paramArr[i].saveName;
					_self.paramArr[i].url = '/static/icons/drop_down.png';
					_self.paramArr[i].class = 'sort_content_detail';
				}
				arg = _self.paramArr[3].sortArr[item];
				_self.selectIndex = 3;
				_self.getAsc(arg);
			});
		}
	}
</script>
<style lang="less" scoped>
	.mypurchase_sort {
		float: left;
		width: 100%;
		.bg {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 1;
		}
		.sort_content {
			width: 100%;
			float: left;
			border-bottom: 1px solid #ddd;
			background: white;
			position: relative;
			z-index: 2;
			.sort_content_detail {
				float: left;
				width: 25%;
				min-height: 40px;
				line-height: 40px;
				color: #666;
				font-size: 1.1rem;
			}
		}
	}
	/*.mypurchase_sort*/
	/*.mypurchase_sort .sort_content*/
	
	.mypurchase_sort .sort_content .sort_content_detail_select {
		float: left;
		width: 25%;
		min-height: 40px;
		line-height: 40px;
		color: #ff8201;
		font-size: 1.1rem;
	}
	
	.mypurchase_sort .sort_content .sort_content_detail_select img {
		max-height: 5px;
		margin-left: 5px;
		margin-top: 5px;
	}
	
	.mypurchase_sort .sort_content .sort_content_detail img {
		max-height: 5px;
		margin-left: 5px;
		margin-top: 5px;
	}
	
	.mypurchase_sort .sort_content .sort_cell {
		width: 100%;
		float: left;
		position: absolute;
		z-index: 2;
		margin-top: 40px;
	}
	
	.mypurchase_sort .sort_content .sort_cell .cell_p {
		position: absolute;
		left: 10px;
		font-size: 1.1rem;
	}
	
	.mypurchase_sort .sort_content .sort_cell .cell_img {
		max-height: 15px;
		float: right;
	}
</style>