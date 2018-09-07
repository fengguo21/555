<!--protocolForYdb.vue-->

<template>
	<modelPage :title="my_header">
		<div slot='contain' class="contain">
			<p class="title">药贷宝服务协议</p>
			<p class="word">
				感谢您使用药贷宝，药贷宝是药材买卖网、微弘商业保理（深圳）有限公司（下称“服务商”）和雁阵科技（北京）有限公司（下称“服务商”）共同推出的一款产品。
			</p>
			<p class="h2">特别说明：</p>
			<p class="word">
				您在使用药贷宝之前，请您务必仔细认真阅读本协议所有条款，特别是以粗体标注的条款。一旦您选择使用药贷宝，即意味着您已充分理解本协议内容所有条款的含义及相应的法律后果。如果您对本协议的条款有疑问，您可直接致电客服电话021-55502736进行咨询。
			</p>
			<p class="word" style="font-weight: 700;"> 
				您同意，药材买卖网有权根据需要不时修订、修改、调整本协议内容，已修订、修改、调整的内容自公示或通知发布之日起立即生效。
			</p>
			
			<p class="word" style="font-weight: 700;text-decoration: underline;">
				您应当及时关注和了解本协议内容调整、修改、修订情况，如果您不同意调整、修改、修订后的内容，您应立即停止使用药贷宝，反之，若您继续使用，则将视同您同意并完全接受调整、修改、修订后的内容。
			</p>
			
			<p class="h2">第一条  药贷宝的使用</p>
			<p class="word">
				1、首先您必须成为药材买卖网注册用户，才能使用药贷宝功能。
			</p>
			<p class="word"  style="font-weight: 700;">
				2、您应妥善保管您药贷宝的相关信息，不得将您的药材买卖网账户和药贷宝的使用权限随意转让以及泄露他人。
			</p>
			<p class="word" style="font-weight: 700;" >
				3、通过您的账户在药材买卖网以及药贷宝进行的任何操作，药材买卖网均视为您本人行为，由此所产生的一切后果都由您承担。
			</p>
			<p class="word">
				4、您承诺并保证，您通过药贷宝提供的身份、银行卡等信息真实、合法、有效、完整、准确。药材买卖网以及服务商均有权对您提供的信息进行审查并予以核实，若有理由怀疑您提供的资料错误、不实、过期或不完整等，药材买卖网或服务商均有权向您发出问询或要求您进行更正。
			</p>
			<p class="word">
				5、药材买卖网或服务商审核过程中，发现您所提供的信息不符合要求或未按要求及时更正的，药材买卖网或服务商有权中止、终止对您提供部分或全部服务事项，并不承担任何责任。
			</p>
			<p class="word">
				6、您的身份、银行卡信息等发生变更、注销、吊销、过期等情况时，您应当立即通知药材买卖网，因您的反馈不及时，导致您在使用药贷宝的过程中给您或他人以及药材买卖网造成损失的，您应承担赔偿责任。
			</p>
			<p class="h2">第二条  药贷宝的相关定义</p>
			<p class="word">
				1、总额度：指您向服务商发出申请后，由服务商结合您与药材买卖网以及关联公司的历史成交记录和成交量等，授予您的总额度。
			</p>
			<p class="word">
				2、可使用额度：指您可向服务商申请支付的额度。<span style="font-weight: 700;">上述额度的展示，均以虚拟数字呈现，仅作为您参考的依据，不具有任何效力。</span>
			</p>
			<p class="h2">第三条  药贷宝为您提供的服务内容</p>
			<p class="word">
				1、药贷宝会向您展示服务商授予您的总额度。
			</p>
			<p class="word">
				2、药贷宝会向您展示您可以向服务商申请支付的额度。
			</p>
			<p class="word">
				3、您可通过药贷宝向服务商发出支付款项的申请。
			</p>
			<p class="h2">第四条  免责声明</p>
			<p class="word">
				1、由您本人自行提供给药贷宝的信息，药贷宝无法保证该信息之准确、有效和完整。若因您提供的信息不准确等，造成药材买卖网或第三方损失的，药材买卖网保留向您追偿的权利。
			</p>
			<p class="word"  style="font-weight: 700;">
				2、因您在使用药贷宝的过程中，造成您财产损失的，药材买卖网将协助您处理相关事宜，但因您与服务商产生的纠纷，药材买卖网不承担任何赔偿责任。
			</p>
			<p class="word"  style="font-weight: 700;">
				3、您通过使用药贷宝而提供给药材买卖网的信息，药材买卖网应妥善保管，若非因药材买卖网原因导致您信息泄露的，药材买卖网不承担任何赔偿责任。
			</p>
			<p class="word"  style="font-weight: 700;">
				4、为帮助服务商完成对您额度授予的评估，您同意药材买卖网有权应服务商要求向服务商提供您和药材买卖网以及其关联公司历史成交记录和成交量等数据，并不承担因服务商对您信息保管不善，而给您带来的所有损失。
			</p>
		</div>
	</modelPage>
</template>

<script>
	import modelPage from '../../components/model/modelPage'
	export default {
		data() {
			return {
				my_header: {
					name: '药贷宝服务协议',
				},
			}
		},
		props: {},
		computed: {},
		components: {
			modelPage
		},
		methods: {

		},
		watch: {

		},
		mounted() {

		},
		created() {}
	}
</script>

<style lang="less" scoped>
	.contain {
		padding: 0 20px;
		text-align: left;
		.title{
			text-align: center;
			line-height: 50px;
			font-size: 20px;
			font-weight: bold;
			font-family: SimHei;
		}
		.word {
			text-indent: 25px;
			margin-bottom: 10px;
		}
		.h2{
			font-size: 16px;
			font-weight: 700;
		}
	}
</style>