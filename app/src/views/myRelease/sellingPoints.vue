<template>
	<div class="selling_point">
		<!--产品卖点-->
		<div class="sell_point margin_reset">
			<div class="header_point">
				<p>产品卖点<span>(多选)</span></p>
				<div class="maidian">
					<p :class="item.show ? 'active':''" v-for="(item,index) in maidian.list" @click="choose(index)">{{item.word}}</p>
				</div>
			</div>
			<div class="supplement">
				<textarea placeholder="请简单阐述您的产品信息  示例:年生草本，高50-100厘米主根肥厚，木质，长分枝，白色。茎自立，上部多分枝。" v-model="maidian.msg"></textarea>
			</div>

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
			maidian: {}
		},
		computed: {},
		components: {},
		methods: {
			choose(index) {
				let _self = this;
				if(_self.maidian.list[index].show == true) {
					_self.maidian.list[index].show = false;
				} else {
					_self.maidian.list[index].show = true;
				}
				_self.maidian.choose=[];
				for(var i = 0; i < _self.maidian.list.length; i++) {
					if(_self.maidian.list[i].show == true) {
						_self.maidian.choose += (_self.maidian.list[i].word + ',')
					}
				}
				console.log(_self.maidian.choose)
			},
			
		},
		watch: {

		},
		mounted() {

		},
		created() {
		}
	}
</script>

<style lang="less">
	.selling_point {
		border-top: 0.0769rem solid #eee;
		&.margin_reset {
			margin-top: -10px;
			
			padding-top: 0;
		}
		&.height_reset {
			height: 100px;
		}
		width: 100%;
		padding: 15px;
		background-color: #fff;
		.header_point {
			padding-bottom: 10px;
			.maidian {
				display: -ms-flexbox;
				display: flex;
				-ms-flex-direction: row;
				flex-direction: row;
				-ms-flex-wrap: wrap;
				flex-wrap: wrap;
				&>p {
					font-size: 12px;
					margin: 8px 8px 8px 0;
					height: 30px;
					padding: 0 20px;
					line-height: 30px;
					border-radius: 15px;
					color: #7E7E7E;
					background-color: #F4F4F4;
					&.active {
						background-color: #faa105;
						color: #fff;
					}
				}
			}
			&>p {
				line-height: 48px;
				height: 48px;
				font-size: 16px;
				padding-left: 5px;
				width: 100%;
				text-align: left;
				span {
					color: #999999;
					font-size: 10px;
				}
			}
		}
		.supplement {
			text-align: center;
			width: 100%;
			font-size: 14px;
			textarea {
				padding: 10px;
				width: 85vw;
				min-height: 90px;
				border: 1px solid #e6e6e6;
				color: #000;
				background-color: #FDFDFD;
			}
		}
	}
</style>