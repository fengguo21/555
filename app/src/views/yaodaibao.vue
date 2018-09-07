<template>
	<div style="background:white;height:100%;margin:0;position:absolute;top:0;">
		<div>
			<div class="qanda">
				<div class="questionBox">
					<div class="avatarBox">
						<img src="/static/icons/farmer.png" class="avatar">
					</div>
					<div class="contentBox">
						<div class="content">
						<img src="/static/icons/triganle2.png" class="left">
						药农：回款慢，着急用钱做下一笔生意怎么办？
					</div>
					</div>
					
				</div>
				<div class="questionBox">
					
					<div class="contentBox r">
						<div class="content fac">
						<img src="/static/icons/triganle.png" class="right">
						药商：没办法，再等等，我也在等对方给我结款呢，最多二个月！
					</div>
					</div>
					<div class="avatarBox">
						<img src="/static/icons/factoryer.png" class="avatar">
						
					</div>
					
				</div>
			</div>

			<div class="line">
				<div class="leftline"></div>
				<div class="timetip">
					二个月后...
				</div>
				<div class="rightline"></div>
			</div>

			<div>
				<div class="questionBox">
					<div class="avatarBox">
						<img src="/static/icons/farmer.png" class="avatar">
					</div>
					<div class="contentBox">
						<div class="content">
						<img src="/static/icons/triganle2.png" class="left">
						药农:什么时候能打款已经二个月了！已经没有资金周转了！
					</div>
					</div>
					
				</div>
				<div class="questionBox">
					
					<div class="contentBox r">
						<div class="content fac">
						<img src="/static/icons/triganle.png" class="right">
						药商:对不起！再等等！我也压着好多货，快了 真的快了！再给我10天！
					</div>
					</div>
					<div class="avatarBox">
						<img src="/static/icons/factoryer.png" class="avatar">
					</div>
					
				</div>
			</div>

			<div class="line">
				<div class="leftline"></div>
				<div class="timetip2">
					10天后...打款了
				</div>
				<div class="rightline"></div>
			</div>

			<div>
				<div class="questionBox">
					
					<div class="contentBox r">
						<div class="content  fac">
						<img src="/static/icons/triganle.png" class="right">
						药商：期待下次合作！这次账期稍微长了点，见谅！
					</div>
					</div>
					<div class="avatarBox">
						<img src="/static/icons/factoryer.png" class="avatar">
					</div>
					
				</div>
				<div class="questionBox">
					<div class="avatarBox">
						<img src="/static/icons/farmer.png" class="avatar">
					</div>
					<div class="contentBox">
						<div class="content">
						<img src="/static/icons/triganle2.png" class="left">
						药农：没有下次了，我已经破产了！T-T
					</div>
					</div>
					
				</div>
				<div class="questionBox">
					
					<div class="contentBox r" style="text-align:left">
						<div class="content  fac">
						<img src="/static/icons/triganle.png" class="right">
						药商：.......
					</div>
					</div>
					<div class="avatarBox">
						<img src="/static/icons/factoryer.png" class="avatar">
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>
<style lang="less" scoped>

.line{
	display:flex;
	align-items:center;
	margin:18px;
	.rightline{
		flex:1;
		border-bottom:1px solid #ccc;
	}
	.leftline{
		flex:1;
		border-bottom:1px solid #ccc;
	}
	.timetip{
		flex:0 0 25%;
		color:#ff622e;
		font-size:14px;
		line-height:2em;
	}
	.timetip2{
		flex:0 0 35%;
		color:#ff622e;
		font-size:14px;
		line-height:2em;
	}
}
.questionBox{
	margin:15px 0;
	.avatarBox{
		flex:0 0 60px;
	}
	display:flex;
	align-items:center;
	.avatar{
		height:40px;
		width:40px;
	}

}
.questionBox:last-child{
	margin-bottom:30px;
}
.contentBox{
	
	.left{
		position:absolute;
		left:0;
		bottom:8px;
		width:7px;
		transform:translateX(-100%);
	}
	.right{
		position:absolute;
		right:0;
		bottom:8px;
		width:7px;
		transform:translateX(100%);
	}
	flex:1;
	margin-left:-15px;
	display:flex;
	justify-content:center;
	min-height:40px;
	.content{
		position:relative;
		text-align:left;
		padding:3px 8px;
		background:#f6f5f8;
		width:90%;
		color:#333;
		font-size:14px;
		line-height:2em;
		border-radius:8px;
		

	}
	.content.fac{
		background:#ffedd4;
	}
	img{
		
		
	}
}
.contentBox.r{
	margin-left:0;
	margin-right:-15px;
}
</style>