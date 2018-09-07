<template>
	<div style="background:white;margin:0;position:absolute;top:0;">
		<div v-for='(item,index) in questions' class="qanda">
			<div class="line">
				<div class="leftline"></div>
				<div class="timetip">
					No.{{index+1}}
				</div>
				<div class="rightline"></div>
			</div>
			<div>
				<div class="questionBox question">
					<div class="avatarBox">
						<img src="/static/icons/question.png" class="avatar">
					</div>
					<div class="contentBox ">
						<div class="content">
						<img src="/static/icons/triangle3.png" class="left">
						{{item.Q}}
					</div>
					</div>
					
				</div>
				<div class="questionBox answer">
					<div class="avatarBox">
						
					</div>
					
					<div class="contentBox">
						<div class="content fac">
						
						{{item.A}}
					</div>
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
				questions:[
				{
					Q:'什么是药贷宝？',
					A:'让药款秒到账，依据与药材买卖网交易订单放款，只要提供的药材，品质检测合格，第二天回款！'	
				},{
					Q:'使用药贷宝有什么好处？',
					A:'打破传统垄长账期! 实现隔天回款，让您的活动资金更充裕，生意一笔接着一笔！当中不间断！'	
				},{
					Q:'如何申请药贷宝？',
					A:'在药材买卖网APP内进行个人认证，提交相关审核资料，认证通过后，便可以申请使用药贷宝！'	
				},{
					Q:'通过药贷宝额度有限制吗？',
					A:'药材买卖网根据目前交易订单详情和历史成交的记录 来审核药贷宝的额度，最高额度50万！心动吗？'	
				},{
					Q:'如何提升药贷宝额度？',
					A:'多使用药材买卖网APP成交，成交越多额度越高！'	
				},{
					Q:'目前药贷宝谁都可以使用吗？',
					A:'不是的，目前只针对于已成交过的用户进行定制版的内测。'	
				},{
					Q:'药贷宝有风险吗？',
					A:'完全没有风险，只要品质合格依照合格订单就可以实现秒回款，不存在任何意外风险！'	
				},{
					Q:'手续繁琐？操作困难？',
					A:'不存在的！ 药材买卖网专业客服一对一解决一切操作问题，简化界面一目了然，操作方便快捷！'	
				},
				
					]

			}
		}
	}
</script>
<style lang="less" scoped>
.qanda{
	margin-bottom:-15px;
}
.qanda:last-child{
	margin-bottom:0;
}
.line{
	display:flex;
	align-items:center;
	margin:5px 85px;
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
		color:#333;
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

	margin:8px 0;
	.avatarBox{
		flex:0 0 40px;
	}
	display:flex;
	align-items:center;
	.avatar{
		height:25px;
		width:25px;
		margin-top:13px;
	}

}
.questionBox.question{
	margin-top:-0px;
}
.questionBox.answer{
	margin-bottom:-15px;
}
.questionBox:last-child{
	margin-bottom:30px;
}
.contentBox{
	
	.left{
		position:absolute;
		left:0;
		bottom:5px;
		width:7px;
		transform:translateX(-100%);
	}
	.right{
		position:absolute;
		right:0;
		bottom:5px;
		width:7px;
		transform:translateX(100%);
	}
	flex:1;
	display:flex;
	justify-content:center;
	
	.content{
		text-align:left;
		position:relative;
		font-size:16px;
		background:#ffedd4;
		width:95%;
		color:#db420f;
		font-size:14px;
		line-height:1.8em;
		border-radius:8px;
		padding:3px 8px;

	}
	.content.fac{
		background:#f6f5f8;
		color:#333;
	}
	img{
		
		
	}
}
</style>