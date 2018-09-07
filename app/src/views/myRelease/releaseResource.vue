<style lang="less" scoped>
	.preventScroll {
		height: 100%;
		overflow: hidden;
	}
	
	.release_resource {
		background-color: #F5F5F5;
		.out_box {
			background-color: #fff;
			margin: 10px;
			border-radius: 6px;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
			overflow: hidden;
			.selectAddress {
				padding: 10px 0 10px 10px;
			}
		}
		.img {
			width: 100%;
			background-color: #fff;
			padding: 15px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.img_box {
				display: inline-block;
				position: relative;
				width: 80px;
				margin-bottom: 15px;
				margin: 0 10px 10px 10px;
				.my_img {
					width: 80px;
					height: 80px;
				}
				.delete {
					position: absolute;
					width: 20px;
					height: 20px;
					top: -10px;
					left: -10px;
				}
				margin-bottom:15px;
			}
			.up_load {
				display: inline-block;
				width: 80px;
				margin-bottom: 15px;
				margin: 0 10px 10px 10px;
			}
		}
		.sell_point {
			&.margin_reset {
				margin-top: -10px;
				border-top: 0.0769rem solid #eee;
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
		}
		.title {
			font-size: 15px;
			padding: 0px 15px 6px 15px;
			text-align: left;
		}

		.name {
			padding-bottom: 65px;
		}
		.foot {
			background-color: #F5F5F5;
			padding-bottom: 22px;
			.confirm {
				height: 50px;
				width: 90%;
				border-radius: 25px;
				margin: 13px auto;
				line-height: 50px;
				font-size: 18px;
				color: #fff;
				background-color: #ff8201;
			}
			.other {
				background-color: #FFF9EC;
				color: #D6A100;
				border: 1px solid #F9C956;
			}
			.titles {
				font-size: 12px;
				color: #FF0000;
				text-align: left;
				padding: 12px 8px;
				line-height: 20px;
			}
		}
	}
	
	.black_shade {
		position: absolute;
		top: 0;
		z-index: 3000;
		opacity: 0.6;
		background-color: #000;
		width: 100%;
		height: 100vh;
	}
	
	.box {
		/*height: 3.8461rem;*/
		/*border-bottom: 1px solid #E6E6E6;*/
		/*display: flex;*/
		/*flex-direction: row;*/
		/*align-items: center;*/
		padding-left: 15px;
		background-color: #fff;
		.number_left {
			height: 3.8461rem;
			/*border-bottom: 1px solid #E6E6E6;*/
			display: -ms-flexbox;
			display: flex;
			-ms-flex-direction: row;
			flex-direction: row;
			-ms-flex-align: center;
			align-items: center;
		}
		.select_samples {
			display: flex;
			line-height: 3.8461rem;
			font-size: 16px;
			width: 100%;
			.select_item {
				flex: 1;
				img {
					float: left;
					line-height: 3.8461rem;
					vertical-align: middle;
					width: 16px;
					height: 16px;
					margin: 1.1538rem 0.3846rem 0 0.7692rem;
				}
				.word {
					float: left;
					line-height: 3.8461rem;
				}
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
	
	.box_border {
		border-top: 0.0769rem solid #eee;
	}
	
	.margin10 {
		margin-top: -10px;
	}
	.confirm {
				height: 50px;
				width: 90%;
				border-radius: 25px;
				margin: 13px auto;
				line-height: 50px;
				font-size: 18px;
				color: #fff;
				background-color: #ff8201;
			}

.resource_detail {
		width: 100%;
		
		overflow-y: hidden;
		position: relative;
	}
	
	.need_float {
		float: left;
	}
	
	.resource_detail .shade {
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		z-index: 20;
		opacity: 0.5;
	}
	
	.resource_detail .box {
		float: left;
		width: 100%;
	}
	
	.resource_detail .page-loadmore-wrapper {
		float: left;
		width: 100%;
	}
	
	@keyframes inner {
		0% {
			transform: scale(1, 0);
		}
		100% {
			transform: scale(1, 1);
		}
	}
	
	@keyframes out {
		0% {
			transform: scale(1, 1);
		}
		100% {
			transform: scale(1, 0);
		}
	}
	


.top {
			background-color: #fff;
			margin: 10px;
			border-radius: 6px;
			overflow: hidden;
			box-shadow: 0px 1px 0px 1px rgba(35, 20, 17, 0.13);
			.selectAddress {
				padding: 10px 0px 10px 0px;
				margin-left: 15px;
				border-bottom: 1px solid #e6e6e6;
			}
			
		}
.resource_detail {
		.load_apps {
			width: 100%;
			position: absolute;
			bottom: 50px;
		}
		.load_apps_my {
			bottom: 0px;
		}
		.footer_box {
			width: 100%;
			float: left;
			padding-left: 12px;
			background-color: #fff;
			.list {
				font-size: 16px;
				display: flex;
				flex-direction: row;
				align-items: center;
				line-height: 20px;
				padding: 10px 0;
				border-bottom: 1px solid #e6e6e6;
				text-align: left;
				.left {
					width: 85px;
					color: #808080;
				}
				.right {
					flex: 1;
					color: #333;
				}
			}
			.last {
				border: none;
			}
		}
		/*.padd {
			height: 20px;
			float: left;
			width: 100%;
		}*/
		.cart_box {
			height: 50px;
			background-color: #fff;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 8px 0;
			.carts {
				flex: 1;
				height: 100%;
				line-height: 35px;
				margin-right: 8px;
				border-radius: 16px;
				color: #fff;
			}
			.addcart {
				background-color: #f5c01c;
				margin-left: 8px;
			}
			.buyIt {
				background-color: #ff8201;
			}
		}
	}
	
	.swipe_back {
		padding: 0;
		width: 100%;
		height: 18.8rem;
		position: relative;
		margin: 0 auto;
		overflow: hidden;
		img {
			width: 100%;
			min-height: 200px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
.resource_detail .swipe_height {
		height: 18.8rem;
		position: relative;
	}
.resource_detail {
		width: 100%;
		
		overflow-y: hidden;
		position: relative;
	}
	
	.need_float {
		float: left;
	}
	
	.resource_detail .shade {
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		z-index: 20;
		opacity: 0.5;
	}
	
	.resource_detail .box {
		float: left;
		width: 100%;
	}
	
	.resource_detail .page-loadmore-wrapper {
		float: left;
		width: 100%;
	}
	
	@keyframes inner {
		0% {
			transform: scale(1, 0);
		}
		100% {
			transform: scale(1, 1);
		}
	}
	
	@keyframes out {
		0% {
			transform: scale(1, 1);
		}
		100% {
			transform: scale(1, 0);
		}
	}
	
	.resource_detail .swipe_active {
		transform-origin: 50% 0%;
		animation: inner 0.5s linear forwards;
	}
	
	.resource_detail .swipe_default {
		transform-origin: 50% 0%;
		animation: out 0.5s linear forwards;
	}
	
	.resource_detail .swipe_height {
		height: 18.8rem;
		position: relative;
	}
	
	.resource_detail .swipe_height .index {
		width: 4rem;
		height: 1.6rem;
		background: black;
		z-index: 9000000000;
		position: absolute;
		right: 2rem;
		opacity: 0.5;
		border-radius: 0.8rem;
		bottom: 1.5rem;
		color: white;
		line-height: 1.6rem;
		text-align: center;
		font-size: 1.4rem;
	}
	
	.resource_detail .swipe_height .index span {
		color: #ff8201;
	}
	
	.resource_detail .swipe_height .img_content {
		float: left;
		width: 100%;
		height: 100%;
	}
	
	.resource_detail .swipe_height img {
		width: 100%;
		min-height: 18.8rem;
		margin-top: 0;
	}
	
	.resource_detail .swipe_height .swipe_number {
		position: absolute;
		right: 10px;
		z-index: 99;
		bottom: 10px;
		color: #fff;
		opacity: 0.5;
		background: #000;
		padding: 2px 12px;
		border-radius: 10px;
	}
	
	.resource_detail .swipe_height .swipe_number span {
		color: #ff8201;
		font-size: 14px;
	}
	
	.resource_detail .top2 {
		float: left;
		width: 100%;
		background: #fff;
		
		margin-bottom: 10px;
	}
	
	.resource_detail .top p {
		float: left;
		color: #333;
		font-size: 1.1rem;
		margin-top: 10px;
	}
	
	.resource_detail .top img {
		float: right;
		height: 2rem;
		max-height: 40px;
		margin-right: 10px;
	}
	
	.resource_detail .fix_bottom {
		position: absolute;
		bottom: 0px;
		z-index: 2;
		width: 100%;
		display: flex;
		flex-direction: row;
		box-shadow: 0 0 5px #888888;
	}
	
	.resource_detail .choose {
		width: 100%;
		background: red;
		float: left;
		position: absolute;
		bottom: 0;
		z-index: 30;
	}
	
	.resource_detail .fix_bottom .attention {
		width: 126px;
	}
	
	.resource_detail .fix_bottom .orange_button {
		width: 36%;
		float: left;
		background-color: #EEEEEE;
		border: 1px solid #CDCDCD;
	}
	
	.resource_detail .fix_bottom .disabled_button {
		background: #ff8201;
		width: 32%;
		float: left;
	}
	/*购物车修改*/
	
	.resource_detail .center_box {}
	
	.resource_detail .center {
		padding: 10px;
		position: relative;
		background: #fff;
		float: left;
		width: 100%;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.resource_detail .center_content {
		padding: 20px;
		position: relative;
		background: #fff;
		float: left;
		width: 100%;
	}
	
	.resource_detail .center .choose_type {
		width: 54%;
		float: left;
		margin-left: 23%;
		margin-bottom: 0px;
		border: 1px solid #ff8201;
		border-radius: 5px;
		overflow: hidden;
		font-size: 16px;
		line-height: 16px;
	}
	
	.resource_detail .center .choose_type .large_cargo {
		width: 50%;
		float: left;
		padding: 10px 0;
		color: #F77615;
	}
	
	.resource_detail .center .choose_type .sample_cargo {
		float: right;
		width: 50%;
		padding: 10px 0;
	}
	
	.resource_detail .center .choose_type .active {
		background: #ff8201;
		color: white;
	}
	
	.resource_detail .center .choose_type .default {
		background: white;
		color: #ff8201;
	}
	
	.resource_detail .top .title {
		float: left;
		width: 100%;
	}
	
	.resource_detail .top .title img {
		float: left;
		max-height: 40px;
		height: 1.7rem;
		margin-right: 2px;
		margin-top: 10px;
	}
	
	.resource_detail .top .title p {
		float: left;
		margin-left: 10px;
		font-size: 1.4rem;
		line-height: 1.7rem;
		color: #333;
	}
	
	.resource_detail .top .title .price_right {
		float: right;
		color: #ff8201;
	}
	
	.resource_detail .top .title .price_right span {
		font-size: 1.8rem;
		font-weight: 500;
	}
	
	.resource_detail .detail {
		float: left;
		width: 100%;
		margin-bottom: 15px;
		text-align: left;
		overflow: hidden;
	}
	
	.resource_detail .detail p {
		float: left;
		width: 50%;
		word-break: keep-all;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.resource_detail .detail .sell_point {
		float: left;
	}
	
	.resource_detail .detail .point_content {
		/*display: inline-block;*/
		word-break: break-all;
	}
	
	.resource_detail .detail .point_right {
		/*float: right;*/
	}
	
	.resource_detail .detail span {
		color: #666;
		font-size: 1.1rem;
	}
	
	.resource_detail .detail p span {
		color: #666;
		font-size: 1.1rem;
	}
	
	.resource_detail .detail .right {
		float: right;
		text-align: right;
	}
	
	.resource_detail .detail p .orange_font {
		color: #ff8201;
	}
	
	.resource_detail .tel {
		width: 100%;
		float: left;
		background: #EEEEEE;
		border: 1px solid #ddd;
		padding-left: 0;
		padding-right: 0;
	}
	
	.resource_detail .tel img {
		max-height: 13px;
	}
	
	.resource_detail .tel p {
		font-size: 10px;
		color: #333;
	}
	.tip{
   		position:absolute;
   		top:50%;
   		left:50%;
   		transform:translate(-50%,-50%);
		width:70%;
		border-radius:8px;
		overflow:hidden;
		
		z-index:1000000;
		background-color:white;
		.title{
			text-align:center;
			font-size:1.3em;
			line-height:2.9em;
			color:#fdbc6a;

		}
		.content{
			color:#ababab;
			font-size:1em;
			line-height:2.3em;
		}
		.bottom{
			display:flex;
			margin-top:20px;
			.left{
				flex:1;
				background-color:#ececec;
				line-height:2.9em;
				color:#8e8e8e;



			}
			.right{
				flex:1;
				background-color:#f76721;
				line-height:2.9em;
				color:white;
			}

		}
	}
	

</style>
<template>
	<div class="release_resource" v-bind:class="{preventScroll:obj.sheetVisible || obj.show}">
		<myHeader :param="param" @back='back'></myHeader>
		<div class="page-loadmore-wrapper" v-bind:class="{preventScroll:obj.sheetVisible  || obj.show}" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<div class="top">
				<steps @tostep='tostep' :step = 'step' :steps='steps'></steps>
				
			</div>
			<div class="resource_detail" v-if='step == 3'>
				<mt-loadmore>
					<div class="top">
						<div class="swipe_height" v-if="imgArr">
						<mt-swipe :auto="4000" :show-indicators="false">
							<mt-swipe-item v-for="(item,index) in imgArr">
								<div @click="popUp(index,imgArr)" class="swipe_back">
									<img :src="item">
									<div class="index">
										<span>{{index + 1}}</span>/{{imgArr.length}}
									</div>
								</div>
							</mt-swipe-item>
						</mt-swipe>
					</div>
					<div class="title">
							<img src="/static/icon/square-zheng.png" v-if="obj.especial == 1 && obj.type == 1">
							<img src="/static/icon/square-sampling.png" v-if="obj.sampling == 1 && obj.type == 1">
							<p>{{obj.drug_name}}</p>
							<p class="price_right">
								<span>￥{{obj.sales_price}}</span>/{{obj.number_unit}}
							</p>
						</div>
					</div>
					<div class='top'>
						<div class="center_box">
						<div class="center" v-if="obj.sampling == 1 && obj.type == 1">
							<div class="choose_type">
								<div v-for="(todo,index) in checkbox" class="large_cargo" :class="todo.status==true? 'active' :''" @click="chooseType(index)">
									{{todo.title}}
								</div>
								<!--<div class="large_cargo" :class="{ active: choose.isRed,'default':!choose.isRed }" @click="unchooseType()">大货</div>
								<div class="sample_cargo" :class="{ active: !choose.isRed,'default':choose.isRed }" @click="chooseType()">样品</div>-->
							</div>
						</div>
						<div class="footer_box">
							<div class="list" v-for="(todo,index) in footerArr" v-bind:class="{last:index==7}">
								<div class="left">{{todo.title}}</div>
								<div class="right" v-show="index==0">{{obj.address}}</div>
								<!--产地 -->
								<div class="right" v-show="index==1">{{obj.spec}}</div>
								<!--规格-->
								<div class="right" v-show="index==2 && choose.isRed">{{obj.number}}({{obj.number_unit}})</div>
								<!--产品库存 -->
								<div class="right" v-show="index==3 && choose.isRed">{{Math.ceil(obj.price_N/obj.sales_price)}}({{obj.number_unit}})</div>
								<!--产品起订 -->
								<div class="right" v-show="index==2 && !choose.isRed">{{obj.weight}}份</div>
								<!--样品库存 -->
								<div class="right" v-show="index==3 && !choose.isRed">1份</div>
								<!--样品起订 -->
								<div class="right" v-show="index==4">
									<!--是否供样 -->
									<span v-if="obj.sampling == 1">提供</span>
									<span v-if="obj.sampling == 0">不提供</span>
								</div>
								
								<div class="right" v-show="index==5 ">{{duedatesStr}}</div>
								<!--下架时间-->
								<div class="right" v-show="index==6">{{maidian.choose}}{{ maidian.msg}}</div>
								<!--产品卖点-->
								
								
								
								
							</div>
						</div>
						<div class="padd"></div>
					</div>
					</div>
					
					
					
					
				</mt-loadmore>
			</div>
			
			<!-------------------------------基本信息框--------------------------------------------->
			<div class="out_box" v-if='step == 0'>
				
				<!--基本信息-->
				<div >
					<!-- <titles tab='1'></titles> -->
					<div class="basic_infor">
					<needBasic :obj="obj"></needBasic>
				</div>
				<!--货物所在地-->
				<div class="selectAddress" >
					<selectAddress :obj="obj" style="border-bottom: 1px solid #E6E6E6;padding-bottom:10px;"></selectAddress>
				</div>
				<!--上传图片-->
				<div class="selectAddress" style="float:left">产品图片<span style="color#999;font-size:10px;">(可添加5张图片)</span></div>
				<div class="img">

					<div class="img_box" v-for="(todo,index) in imgArr">
						<img :src="todo" class="my_img">
						<img src="/static/icons/upload-delete.png" class="delete" @click="deletes">
					</div>
					<div class="up_load" v-show="imgArr.length !== 5">

						<imageUpload :param="imgArr" v-on:postUrl="getUrl"></imageUpload>
					</div>
				</div>
				</div>
			</div>
			<!-------------------------------产品信息框--------------------------------------------->
			<div class="out_box" v-if='step == 1'>
				
				
				<!--产品卖点-->
				<div >
					<!-- <titles tab='2'></titles> -->
					<sellingPoints :maidian="maidian"></sellingPoints>

				<!--价格有效期-->
				<expiryDate :dateArr="dateArr" :obj="obj" :duedate="duedate"></expiryDate>
				</div>
				
			</div>

			<!-------------------------------产品信息框--------------------------------------------->
			<div class="out_box" v-if='step == 2'>
				<!--是否供样-->
				<releaseBasic :obj="obj" ></releaseBasic>
				<!--价格补充说明-->
				<div class="supplement" >
					<textarea placeholder="价格补充说明" v-model="obj.description"></textarea>
				</div>
				<!--最小起定金-->
				<div class="box">
					<div class="number_left width100">最小起订金额</div>
					<div class="select_samples">
						<div class="select_item left" v-on:click="judgeValues(index)" v-for="(todo,index) in obj.low_price">
							<img src="/static/images/over-select.png" v-show="todo.vshow">
							<img src="/static/images/no-select.png" v-show="!todo.vshow">
							<span class="word">{{todo.values}}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="foot" v-if="myTypes&&step == 3" >
				<!-- <div class="titles">
					* 通过认证后，您发布的需求将会货的大量的曝光！
				</div> -->
				<div class="confirm other" @click="confirm(1)" v-if="!obj.tshow">
					发布资源并认证
				</div>
				<div class="confirm" @click="confirm(2)" v-if="!obj.tshow">
					发布资源
				</div>
			</div>
			<div class="foot" v-if="!myTypes&&step == 3" >
				<div class="titles" v-if="userInfor.utype == 2 || userInfor.ctype == 2">
					* 您已通过认证，您发布的需求将会大量曝光！
				</div>
				<div class="confirm" @click="confirm(2)" v-if="!obj.tshow">
					发布资源
				</div>
			</div>
			<div class="confirm" @click='next' v-if='step !=3'>下一步</div>
		</div>
		<authenPopUp :param="Titles" @cancel='cancel'></authenPopUp>
		<div class="tip" v-if='beforeback'>
			<div class="title">警告</div>
			<div class="content">
				<p>此时退出您所填写的资料将全部注销</p>
				<p>确认退出？</p>
			</div>
			<div class="bottom">
				<div class="left" @click='continueWrite'>继续填写</div>
				<div class="right" @click='routerBack'>确认退出</div>
			</div>
		</div>
		<div class="black_shade" v-show="Titles.selectType||beforeback" @click="cancelTitle"></div>
	</div>
</template>
<script>
	
	import popUpBigImg from '../../components/tools/popUpBigImg'
	import boxPopUp from '../../components/popUpType/boxPopUp'
	import loadApp from '../../components/user/loadApp'

	import moment from 'moment';
	import steps from '../../components/release/steps'
	import common from '../../common/common.js'
	import validation from '../../validation/validation.js'
	import myHeader from '../../components/header/myHeader'
	import authenPopUp from '../../components/popUpType/authenPopUp'
	import imageUpload from '../../components/release/upLoadImgs' /**/
	import needBasic from '../../components/release/needReleaseBasic'
	import releaseBasic from '../../components/release/resourceReleaseBasic'
	import userInfor from '../../components/release/userInfor'
	import httpService from '../../common/httpService.js'
	import titles from '../../components/release/title'
	import sellingPoints from './sellingPoints'
	import selectAddress from '../../components/popUpType/selectAddress'
	import expiryDate from '../../components/release/expiryDate'
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'
	import {
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				beforeback:false,
				steps:['产品信息','交收要求','详细补充','信息预览'],
				checkbox: [{
					title: '大货',
					status: true,
				}, {
					title: '样品',
					status: false,
				}],
				footerArr: [{
					title: '产品产地'
				}, {
					title: '产品规格'
				}, {
					title: '产品库存'
				}, {
					title: '起订数量'
				}, {
					title: '是否供样'
				},{
					title: '过期时间'
				}, {
					title: '产品卖点'
				}],
				step:0,
				maidian: {
					msg: '',
					choose:'',
					total:'',
					list: [{
						show: false,
						word: '产品包交'
					}, {
						show: false,
						word: '质量优质'
					}, {
						show: false,
						word: '一手货源'
					}, {
						show: false,
						word: '含量较高'
					}, {
						show: false,
						word: '可以加工'
					}],
				},
				dateArr: [{
					show: false,
					one: '3'
				}, {
					show: false,
					one: '5'
				}, {
					show: false,
					one: '7'
				}, {
					show: false,
					one: '15'
				}, {
					show: false,
					one: ''
				}],
				param: {
					name: '我要卖货',
					router: 'home',
					goBack: false
				},
				Titles: {
					myTitle: true,
					selectType: false
				},
				imgs: [],
				img_src: '/static/images/3.jpg',
				drug: '请输入你的药材',
				obj: {
					type:1,
					flag:false,
					description: '', //价格补充说明
					resource: true,
					sample_id: '',
					number_id: 1,
					sampling: 1,
					update: false,
					drug_name: '',
					spec: '',
					place: '',
					place_id: '',
					number: '',
					number_unit: '',
					sample_unit: '',
					sales_price: '',
					weight: '',
					price: '',
					
					name: '',
					phone: '',
					duedate: '',
					duedates: '',
					breedId: '',
					sheetVisible: false,
					show: false,
					type_show: false,
					/////
					address_name: '货物所在地',
					price_data: '价格有效期',
					address: '',
					addressProvince: '',
					addressProvinceId: '',
					addressCity: '',
					addressCityId: '',
					addressDistrict: '',
					addressDistrictId: '',
					detailAddr: '',
					tshow: false,

					low_price: [{
						values: 1000,
						vshow: true
					}, {
						values: 1500,
						vshows: false
					}, {
						values: 2000,
						vshow: false
					}],
					price_N: '', //限制最低价格
					moq: '' //最小起订量
				},
				choose: {
					value: 1, //产品库存
					isRed: true,
					number: '',
					sampleNumber: '',
					push_num: false,
					especial: '',
					type: '',
					approve: '', //企业认证状态
					show: false, //弹窗状态
					type: 2,
					addCar: '', //加入购物车失败（为了弹窗文案使用）
					sampleValue: 0, //按钮点击状态
				},
				imgArr: [],
				selected: '1',
				todos: {},
				id: '',
				typeIndex: 2,

			}
		},
		computed: {

			duedatesStr(){
				let n = parseInt(this.obj.duedate)
				console.log(this.duedate,'===============')
				return moment().add(n,'days').format('YY年MM月DD日')
			},
			userInfor() {
				return this.$store.state.user.userInfor;
			},
			myTypes() {
				let ctype = this.$store.state.user.userInfor.ctype;
				let utype = this.$store.state.user.userInfor.utype;
				if(ctype == 0 && utype == 0) {
					return true
				} else if(ctype == 0 && utype == 3) {
					return true
				} else if(ctype == 3 && utype == 0) {
					return true
				} else if(ctype == 3 && utype == 3) {
					return true
				} else {
					return false
				}
			}
		},
		methods: {
			cancel(){
				console.log('cancel-------------------')
				this.$router.push("/releaseSuccess?type=2&number=2&id=" + this.id);
			},
			routerBack(){
				this.step = 0;
				this.obj.flag = false
				this.beforeback = false
				this.$router.back()

			},
			continueWrite(){
				this.beforeback = false;
			},
			back(){
				console.log('emit back')
				this.beforeback =  true;
			},
			popUp(index, imgArr) {
				this.my_param.url = imgArr;
				this.my_param.index = index;
				this.my_param.show = !this.my_param.show;
				this.my_param.whole_height = document.documentElement.clientHeight;
			},
			chooseType(index) { //选择样品
				console.log(this.obj)
				this.choose.isRed = !this.choose.isRed
				let _self = this;
				if(index == 1) {
					if(!_self.choose.push_num) {
						_self.choose.isRed = false;
					}
				} else {
					if(!_self.choose.push_num) {
						_self.choose.isRed = true;
					}
				}
				for(var i = 0; i < _self.checkbox.length; i++) {
					_self.checkbox[i].status = false
				}
				if(_self.choose.isRed) _self.choose.value = _self.obj.moq;
				if(!_self.choose.isRed) _self.choose.value = 1;
				_self.checkbox[index].status = true
				_self.choose.sampleValue = index;
			},
			tostep(val){
				if(val - 1 > this.step){
					return
				}
				this.step = val - 1
				if(this.step ==3){
					this.obj.flag = true;
					
				}else{
					this.obj.flag = false;
				}
				console.log(1)
				console.log(val)
			},
			next(){
				if(this.step == 0){
					let _self = this;
				var checkArr = [];
				let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种！');
				checkArr.push(checkBreedId);
				let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格！');
				checkArr.push(checkBreedSpec);
				let checkBreedPlace = validation.checkNull(_self.obj.place_id, '请输入产地！');
				checkArr.push(checkBreedPlace);
				let checkAddress = validation.checkNull(_self.obj.address, '请选择货物所在地！');
				checkArr.push(checkAddress);
				let count = '请上传图片';
				for(let i = 0; i < _self.imgArr.length; i++) {
					if(_self.imgArr[i]) {
						count = false;
					}
				}
				if(count) {
					checkArr.push(count);
				}
				
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				}
				else if(this.step ==1){
					let _self = this;
				var checkArr = [];
				
				let checkDuedate = _self.checkDates();
				checkArr.push(checkDuedate);
				let checkDes = validation.checkNull(_self.maidian.choose + _self.maidian.msg, '请输入药材资源卖点');
				checkArr.push(checkDes);
				
				
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				}
				else if(this.step == 2){
					let _self = this
					for(var i = 0; i < _self.obj.low_price.length; i++) {
					if(_self.obj.low_price[i].vshow == true) {
						_self.obj.price_N = _self.obj.low_price[i].values

					}
				}
					
					var checkArr = [];
					let checkNum = validation.checkMaxNum(_self.obj.number, '数量');
				checkArr.push(checkNum);
				let checkPri = validation.checkPrice(_self.obj.sales_price, '价格');
				checkArr.push(checkPri);
				if(_self.obj.sampling) {
					let checkSampleNum = validation.checkMaxNum(_self.obj.weight, '样品');
					checkArr.push(checkSampleNum);
					let checkSamplePri = validation.checkPrice(_self.obj.price, '样品价格');
					checkArr.push(checkSamplePri);
				}
				let checkPrice_N = validation.checkMaxPrice(_self.obj.number, _self.obj.sales_price, _self.obj.price_N, '可供量和裸价不满足最小起订金额');
				checkArr.push(checkPrice_N);
				let checkDes = validation.checkNull(_self.maidian.choose + _self.maidian.msg, '请输入药材资源卖点');
				checkArr.push(checkDes);

				let checkDescription = validation.checkNull(_self.obj.description, '请输入价格补充说明');
				checkArr.push(checkDescription);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}
				}
				if(this.step ==3){
					this.obj.flag = true;
					return
				}
				this.step++
				if(this.step ==3){
					this.obj.flag = true;
					
				}else{
					this.obj.flag = false;
				}
			},
			//最小起定金
			judgeValues(index) {
				for(var i = 0; i < this.obj.low_price.length; i++) {
					this.obj.low_price[i].vshow = false;
				}
				this.obj.low_price[index].vshow = true;
			},
			confirm(index) {
				let _self = this;
				var checkArr = [];
				for(var i = 0; i < _self.obj.low_price.length; i++) {
					if(_self.obj.low_price[i].vshow == true) {
						_self.obj.price_N = _self.obj.low_price[i].values

					}
				}
				let checkBreedId = validation.checkNull(_self.obj.breedId, '请先选择品种');
				checkArr.push(checkBreedId);
				let checkBreedSpec = validation.checkNull(_self.obj.spec, '请输入规格');
				checkArr.push(checkBreedSpec);
				let checkBreedPlace = validation.checkNull(_self.obj.place, '请输入产地');
				checkArr.push(checkBreedPlace);
				let checkAddress = validation.checkNull(_self.obj.address, '请选择货物所在地！');
				checkArr.push(checkAddress);
				let checkDuedate = _self.checkDates();
				checkArr.push(checkDuedate);
				let count = '请上传图片';
				for(let i = 0; i < _self.imgArr.length; i++) {
					if(_self.imgArr[i]) {
						count = false;
					}
				}
				if(count) {
					checkArr.push(count);
				}
				let checkNum = validation.checkMaxNum(_self.obj.number, '数量');
				checkArr.push(checkNum);
				let checkPri = validation.checkPrice(_self.obj.sales_price, '价格');
				checkArr.push(checkPri);
				if(_self.obj.sampling) {
					let checkSampleNum = validation.checkMaxNum(_self.obj.weight, '样品');
					checkArr.push(checkSampleNum);
					let checkSamplePri = validation.checkPrice(_self.obj.price, '样品价格');
					checkArr.push(checkSamplePri);
				}
				let checkPrice_N = validation.checkMaxPrice(_self.obj.number, _self.obj.sales_price, _self.obj.price_N, '可供量和裸价不满足最小起订金额');
				checkArr.push(checkPrice_N);
				let checkDes = validation.checkNull(_self.maidian.choose + _self.maidian.msg, '请输入药材资源卖点');
				checkArr.push(checkDes);

				let checkDescription = validation.checkNull(_self.obj.description, '请输入价格补充说明');
				checkArr.push(checkDescription);
				let checkLookDescription = validation.checkLook(_self.obj.description);
				checkArr.push(checkLookDescription);
				for(var i = 0; i < checkArr.length; i++) {
					if(checkArr[i]) {
						common.$emit('message', checkArr[i]);
						return;
					}
				}

				_self.typeIndex = index;
				let message = '';
				if(_self.obj.type_show) {
					message = '确定修改该资源？'
				} else {
					message = '确定发布资源？'
				}
				_self.$msgBox.showMsgBox({
					title: '提示',
					content: message,
				}).then(async(val) => {

					_self.release();
				}).catch(() => {});
			},
			checkDates() {
				let _self = this;
				let validate = true;
				let msg = '';
				let pattern = /^([12][0-9]|30|[1-9])$/;
				switch(this.obj.duedates) {
					case 0:
						_self.obj.duedate = 3;
						break;
					case 1:
						_self.obj.duedate = 5;
						break;
					case 2:
						_self.obj.duedate = 7;
						break;
					case 3:
						_self.obj.duedate = 15;
						break;
					case 4:
						if(!_self.dateArr[4].one) {
							msg = '请填写截至日期'
							validate = false;
						} else if(!pattern.test(_self.dateArr[4].one)) {
							msg = '截至日期需1~30天';
							validate = false;
						}
						_self.obj.duedate = _self.dateArr[4].one;
						break;
					default:
						msg = '请选择截至日期';
						validate = false;
						_self.obj.duedate = '';
				}
				if(!validate) {
					return msg;
				}
			},
			release() {
				let _self = this;
				console.log('执行')
				common.$emit('show-load');
				let url = common.addSID(common.urlCommon + common.apiUrl.most);
				let body = {};
				if(_self.obj.type_show) {
					body = {
						biz_module: 'intentionService',
						biz_method: 'updateEditSupplyInfo',
						biz_param: {
							customerId: common.customerId,
							breedName: _self.obj.drug_name,
							spec: _self.obj.spec,
							location: _self.obj.place_id,
							number: _self.obj.number,
							price: _self.obj.sales_price,
							sampling: _self.obj.sampling,
							quality: _self.maidian.choose + _self.maidian.msg,
							customerName: _self.userInfor.fullname,
							customerPhone: _self.userInfor.phone,
							editImage: _self.imgArr,
							sampleNumber: _self.obj.weight,
							sampleAmount: _self.obj.price,
							duedate: _self.obj.duedate,
							breedId: _self.obj.breedId,
							unit: _self.obj.number_id,
							sampleUnit: 66,
							id: _self.id,
							priceDescription: _self.obj.description,
							goodsPosition: _self.obj.address,
							moq: Math.ceil(_self.obj.price_N / _self.obj.sales_price) //这里是进一取整
						}
					};
				} else {
					body = {
						biz_module: 'intentionService',
						biz_method: 'editSupplyInfo',
						biz_param: {
							customerId: common.customerId,
							breedName: _self.obj.drug_name,
							spec: _self.obj.spec,
							location: _self.obj.place_id,
							number: _self.obj.number,
							price: _self.obj.sales_price,
							sampling: _self.obj.sampling,
							quality: _self.maidian.choose + _self.maidian.msg,
							customerName: _self.userInfor.fullname,
							customerPhone: _self.userInfor.phone,
							editImage: _self.imgArr,
							sampleNumber: _self.obj.weight,
							sampleAmount: _self.obj.price,
							duedate: _self.obj.duedate,
							breedId: _self.obj.breedId,
							unit: _self.obj.number_id,
							sampleUnit: 66,
							priceDescription: _self.obj.description,
							goodsPosition: _self.obj.address,
							moq: Math.ceil(_self.obj.price_N / _self.obj.sales_price) //这里是进一取整
						}
					}
				}
				body.time = Date.parse(new Date()) + parseInt(common.difTime);
				body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
				httpService.supplyRelease(url, body, function(suc) {
					

					common.$emit('close-load');

				

					if(suc.data.code == '1c01') {
						common.$emit('message', suc.data.msg);
						if(_self.typeIndex == 2) {
							_self.obj.flag = false;
								_self.step = 0;
							if(_self.obj.type_show) {
								//发布成功跳转到发布成功页面，缓存和刷新的情况
								//type==1是修改发布，2是正常发布
								//number==1是资源发布，2是求购发布
								
								common.$emit('inforReleaseSuccess', {
									type: '1',
									number: '1',
									id: _self.id
								})

								_self.$router.push("/releaseSuccess?type=1&number=1&id=" + _self.id);
							} else {
								_self.obj.flag = false;
								_self.step = 0;
								let id = suc.data.biz_result.intentionId;
								common.$emit('inforReleaseSuccess', {
									type: '2',
									number: '1',
									id: id
								})
								_self.$router.push("/releaseSuccess?type=2&number=1&id=" + id);
							}
						} else if(_self.typeIndex == 1) {
							_self.Titles.selectType = true;
						}
						_self.$store.dispatch('getCustomer', {
							name: _self.userInfor.fullname,
							phone: _self.userInfor.phone
						})

					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('close-load');
					common.$emit('message', err.data.msg);
				})
			},
			getResourceDetail(id) {
				let _self = this;
				_self.obj.flag = false;
				_self.step = 0;
				httpService.getIntentionDetails(common.urlCommon + common.apiUrl.most, {
					biz_module: 'intentionService',
					biz_method: 'queryIntentionInfo',
					biz_param: {
						id: id
					}
				}, function(suc) {
					if(suc.data.code == '1c01') {
						let result = suc.data.biz_result;
						let due = result.duedate.split('.')[0];
						if(due) var arr = due.split(/[- : \/]/);
						var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]); /*new Date(result.duedate.split(' ')[0]);*/
						let pub = result.pubdate.split('.')[0];
						if(pub) var arrs = pub.split(/[- : \/]/);
						var pubdateDate = new Date(arrs[0], arrs[1] - 1, arrs[2], arrs[3], arrs[4], arrs[5]);
						var dateValue = duedateDate.getTime() - pubdateDate.getTime();
						var days = Math.floor(dateValue / (24 * 3600 * 1000));

						_self.obj.address = result.goodsPosition;
						_self.obj.addressProvince = result.goodsPosition.split(',')[0];
						_self.obj.addressCity = result.goodsPosition.split(',')[1];
						_self.obj.addressDistrict = result.goodsPosition.split(',')[2];

						_self.obj.description = result.priceDescription;
						
						//处理带过来的卖点匹配
							if(result.quality) {
								result.quality = result.quality.replace(',,',',')
								let qualityArr = result.quality.split(',');
								for(var i = 0; i < qualityArr.length; i++) {
									for(var j = 0; j < _self.maidian.list.length; j++) {
										if(_self.maidian.list[j].word == qualityArr[i]) {
											_self.maidian.choose += qualityArr[i] + ',';
											_self.maidian.list[j].show = true;
											qualityArr.splice(i, 1);
										}
									}
								}
								_self.maidian.msg = qualityArr;
							}

						_self.obj.drug_name = result.breedName;
						_self.obj.spec = result.spec;
						_self.obj.place = result.location;
						_self.obj.place_id = result.locationId;
						_self.obj.number = result.number;
						_self.obj.number_unit = result.unit;
						_self.obj.sales_price = result.price;
						_self.obj.weight = result.sampleNumber;
						_self.obj.price = result.sampleAmount;
						_self.obj.sampling = result.sampling;
						_self.maidian.total = result.quality;
						_self.obj.name = result.customerName;
						_self.obj.phone = result.customerPhone;
						_self.obj.duedate = days;
						_self.obj.id = result.id;
						_self.obj.breedId = result.breedId;
						_self.imgArr = result.image;
						if(days != 3 && days != 5 && days != 7 && days != 15) {
							_self.dateArr[4].show = true;
							_self.obj.duedates = 4;
							if(days > 0) _self.dateArr[4].one = days;
							if(days < 0) _self.dateArr[4].one = 0;
						} else {
							switch(days) {
								case 3:
									_self.dateArr[0].show = true;
									_self.dateArr[0].one = days;
									_self.obj.duedates = 0
									break;
								case 5:
									_self.dateArr[1].show = true;
									_self.dateArr[1].one = days;
									_self.obj.duedates = 1
									break;
								case 7:
									_self.dateArr[2].show = true;
									_self.dateArr[2].one = days;
									_self.obj.duedates = 2
									break;

								case 15:
									_self.dateArr[3].show = true;
									_self.dateArr[3].one = days;
									_self.obj.duedates = 3
									break;
							}
						}

						common.$emit("Needrelease", {
							breedName: result.breedName,
							breedId: result.breedId
						})

					} else {
						common.$emit('message', suc.data.msg);
					}
				}, function(err) {
					common.$emit('message', err.data.msg);
				})
			},
			getUrl(param) {
				console.log(1, param)
				let _self = this;
				if(this.imgArr.length <= 5) {
					if(param.url) _self.imgArr.push(param.url);
					if(_self.imgArr.length == 5) {
						common.$emit('message', '最多只能上传5张图片！')
					}
				}
			},
			deletes(index) {
				let _self = this;
				_self.imgArr.splice(index, 1);
			},
			selectType(id) {
				let _self = this;
				if(id == '1') {
					_self.obj.type_show = false;
					_self.param.goBack = true;
				} else {
					_self.obj.type_show = true;
					_self.param.goBack = false;
					_self.getResourceDetail(id);
				}
			},
			cancelTitle() {
				let _self = this;
				_self.Titles.selectType = false;
			}

		},
		components: {
			steps,
			imageUpload,
			needBasic,
			myHeader,
			releaseBasic,
			userInfor,
			authenPopUp,
			titles,
			selectAddress,
			expiryDate,
			sellingPoints
		},
		created() {
			let _self = this;
			_self.step = 0;
			_self.obj.flag = false;
			this.selectType(_self.$route.params.id);
			this.id = _self.$route.params.id;
			_self.$store.dispatch('getUserInfor');
			common.$on('inforReleases', function(item) {
				_self.obj.drug_name = '';
				_self.obj.spec = '';
				_self.obj.place = '';
				_self.obj.number = '';
				_self.obj.sales_price = '';
				_self.obj.weight = '';
				_self.obj.price = '';
				_self.obj.duedate = '';
				_self.obj.selling_point = '';
				_self.obj.number_unit = '斤';
				_self.obj.number_id = 1;
				_self.imgArr = [];
				_self.obj.type_show = false;
				_self.param.goBack = true; //正常发布返回键回首页
				_self.id = item;
				
				_self.maidian.msg=[];
				
				
				
				_self.obj.address = '';
				_self.obj.addressProvince = '';
				_self.obj.addressProvinceId = '';
				_self.obj.addressCity = '';
				_self.obj.addressCityId = '';
				_self.obj.addressDistrict = '';
				_self.obj.addressDistrictId = '';
				_self.obj.detailAddr = '';
				_self.obj.description = '';
				for(var i = 0; i < 5; i++) {
					_self.dateArr[i].show = false;
					_self.maidian.list[i].show = false;
					if(i == 4) _self.dateArr[i].one = '';
				}
				_self.$store.dispatch('getUserInfor');
			})
			common.$on("res-id", function(item) {
				for(var i = 0; i < 5; i++) {
					_self.dateArr[i].show = false;
					_self.maidian.list[i].show = false;
					if(i == 4) _self.dateArr[i].one = '';
				}

				_self.$store.dispatch('getUserInfor');
				_self.getResourceDetail(item); //来自我的资源
				_self.obj.type_show = true;
				_self.param.goBack = false; //修改资源返回键不回首页
				_self.id = item;
			})
		},
		mounted() {
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		}
	}
</script>