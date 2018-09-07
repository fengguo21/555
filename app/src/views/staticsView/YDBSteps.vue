<!--YDBSteps.vue  药贷宝流程-->

<template>
	<modelPage :title="my_header">
		<div slot="contain" class="contain">
			<p> 
                <span id="boxArr" slot="contain">第1步</span>
                <span class="circle">
                    <div class="line" ></div>
                </span>
                <span class="text">
                  "去药贷"查看可药贷订单
                </span>
            </p>
			<p> 
                <span id="boxArr" slot="contain">第2步</span>
                <span class="circle">
                    <div class="line" ></div>
                </span>
                <span class="text">
                 "查看详情"了解药贷订单详情
                </span>
            </p>
			<p> 
                <span id="boxArr" slot="contain">第3步</span>
                <span class="circle">
                    <div class="line" ></div>
                </span>
                <span class="text">
                 "申请药贷"申请提取药贷现款
                </span>
            </p>
			<p> 
                <span id="boxArr" slot="contain">第4步</span>
                <span class="circle">
                    <div class="line"></div>
                </span>
                <span class="text">
                  "签署合同"确认提取药贷现款
                </span>
            </p>
			<p> 
                <span id="boxArr" slot="contain">第5步</span>
                <span class="circle">
                    <!-- <div class="line" v-if=""></div> -->
                </span>
                <span class="text">
                  "等待放款"等待药贷现款到绑定银行卡
                </span>
            </p>
		</div>
   
	</modelPage>
</template>

<script>
import modelPage from "../../components/model/modelPage.vue";
export default {
  data() {
    return {
      my_header: {
        name: "药贷宝流程"
      },
    //   steps: [
    //     '"去药贷"查看可药贷订单',
    //     '"查看详情"了解药贷订单详情',

    //     '"申请药贷"申请提取药贷现款',

    //     '"签署合同"确认提取药贷现款',

    //     '"等待放款"等待药贷现款到绑定银行卡'
    //   ]
    };
  },
  props: {},
  computed: {},
  components: {
    modelPage
  },
  methods: {},
  watch: {},
  mounted() {},
  created() {}
};
</script>

<style lang="less" scoped>
.contain {
  padding: 30px 0px 10px 20px;
  text-align: left;
  text-align: left;
  .text {
    display: inline-block;
    margin-top: 10px;
    margin: 10px 0 50px 10px;
    margin-bottom: 50px;
    background-color: #fff;
    padding: 13px;
    padding-right: 0px;
    border-radius: 5px;
    font-size: 14px;
    font-family: "微软雅黑";
    width: 260px;
  }
}
#boxArr {
  display: inline-block;
  font-size: 10px;
  margin: 3px;
  padding: 3px;
  width: 40px;
  height: 20px;
  border: 2px #fd9d39 solid;
  border-radius: 5px;
  background-color: #fff;
  position: relative;
  color: #fd9d39;
}
#boxArr:before {
  width: 0px;
  height: 0px;
  border: 9px transparent solid;
  border-left-color: #fd9d39;
  position: absolute;
  top: -1px;
  left: 100%;
  content: "";
}
#boxArr:after {
  width: 0px;
  height: 0px;
  border: 8px transparent solid;
  border-left-color: #fff;
  position: absolute;
  top: 0px;
  left: 94.5%;
  content: "";
}
.circle {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #fd9d39;
  border-radius: 4px;
  top: -1px;
  left: 4px;
  .line {
    position: relative;
    background-color: #f7d8b7;
    height: 103px;
    width: 1px;
    top: 8px;
    left: 3.5px;
  }
}
</style>