<template>
	<div class="lendMoney">
		<my-header :param="my_header"></my-header>
		<wallet :param="massage"></wallet>
	</div>
</template>

<script>
import myHeader from "../../components/header/myHeader.vue";
import wallet from "../../components/list/wallet.vue";
import common from "../../common/common.js";
import httpService from "../../common/httpService.js";
export default {
  data() {
    return {
      my_header: {
        name: "药贷宝"
      },
      massage: {
        title: "药贷宝钱包",
        leftbutton: {
          url: "/YDBSteps",
          word: "药贷宝流程"
        },
        rightbutton: {
          url: "",
          word: "去药贷"
        },
        total: {
          num: "",
          word: "可用额度"
        }, //总数
        minLeft: {
          num: "",
          word: "冻结额度"
        }, //冻结
        minRight: {
          num: "",
          word: "已用额度"
        }, //可用
        show: true
      }
    };
  },
  props: {},
  computed: {},
  components: {
    myHeader,
    wallet
  },
  methods: {
    //通用数据请求
    getHttp() {
      let _self = this;
      let otherurl = common.addSID(common.urlCommon + common.apiUrl.most);
      let otherbody = {
        biz_module: "ydbService",
        biz_method: "queryMyAccount",
        biz_param: {}
      };
      otherbody.time = Date.parse(new Date()) + parseInt(common.difTime);
      otherbody.sign = common.getSign(
        "biz_module=" +
          otherbody.biz_module +
          "&biz_method=" +
          otherbody.biz_method +
          "&time=" +
          otherbody.time
      );
      httpService.queryEmployeeInfo(
        otherurl,
        otherbody,
        function(suc) {
          if (suc.body.code == "1c01") {
            let result = suc.body.biz_result;
            _self.massage.total.num = result.creditSurplus ;
            _self.massage.minRight.num = result.creditUsed;
            _self.massage.minLeft.num = result.allCreditFreeze;
          } else {
            common.$emit("message", suc.body.msg);
          }
        },
        function(err) {
          common.$emit("close-load");
          common.$emit("message", err.data.msg);
        }
      );
    }
  },
  created() {
    let _self = this;
    _self.getHttp();
    //			_self.jumpEntrance()
    common.$on("lendMoney", function() {
      //				_self.jumpEntrance()
      _self.getHttp();
    });
  }
};
</script>

<style>

</style>