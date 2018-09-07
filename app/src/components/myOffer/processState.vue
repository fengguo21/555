/*
 * Filename: e:\git-web\H5_new\app\src\components\myOffer\processState.vue
 * Path: e:\git-web\H5_new\app
 * Created Date: Wednesday, April 4th 2018, 5:12:18 pm
 * Author: wxy
 * description:
 */

<style lang="less" scoped>
.process {
  background-color: #fff;
  padding-top: 12px;
  height: 70px;
  /*border-bottom: 1px solid #E6E6E6;*/
  /*margin-bottom: 20px;*/
  .top {
    padding: 0 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 27px;
    .its_ok {
      flex: 1;
      height: 1px;
      background-color: #ed6c5f;
      margin: 0 -3px;
    }
    .its_ok_two {
      flex: 2;
    }
    .its_nor_ok {
      background-color: #e6e6e6;
    }
    .circle {
      margin: 0 3px;
      height: 27px;
      .red_circle {
        margin-top: 4px;
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #d2d2d2;
        border-radius: 50px;
        &.red_c {
          border: 2px solid #ed6c5f;
        }
        &.red_full {
          border: 2px solid #ed6c5f;
          background-color: #ed6c5f;
        }
        &.red_full_green {
          border: 2px solid #7bb157;
          background-color: #7bb157;
        }
      }
      img {
        height: 100%;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    .left {
      flex: 3;
    }
    .word {
      flex: 1;
      font-size: 13px;
      /*color: #6fab47;*/
      height: 25px;
    }
    .word_default {
      color: #666;
    }
    .red {
      color: red;
      font-size: 10px;
    }
  }
}
</style>
<template>
	<!--报价是否接受 accept   0/1/2/3 未处理/接受/不接受/正在跟进   其中accept=1 且 state<=60  为待寄样状态，accept=1且 state>=70 为价格确认状态-->
    <div class="process">
        <div class="top">
            <!--报价-->	
            <div class="circle">
            	<span class="red_circle red_c" ></span>
            </div>

            <!--受理-->	
            <div class="its_ok its_ok_two"></div> 
            <!-- <div class="its_ok its_ok_two its_nor_ok" v-if="todo.state ===0"></div> --> 
            <div class="circle">
            	<span class="red_circle" :class="todo[1].type !== 0? todo[1].type === 1?'red_full':'red_c':''"></span> 
            </div>

            <!--采用-->
            <div class="its_ok its_ok_two" v-show="todo[2].type !== 0"></div>
            <div class="its_ok its_ok_two its_nor_ok" v-if="todo[2].type === 0"></div>
            <div class="circle">
                <span class="red_circle" :class="todo[2].type !== 0? todo[2].type === 1?'red_full':'red_c':''"></span> 
            </div>

            <!--寄样-->
            <div class="its_ok its_ok_two" v-show="todo[3].type !== 0"></div>
            <div class="its_ok its_ok_two its_nor_ok" v-if="todo[3].type === 0"></div>
            <div class="circle">
            		<span class="red_circle" :class="todo[3].type !== 0? todo[3].type === 1?'red_full':'red_c':''"></span> 
            </div>

            <!--成交-->
              <div class="its_ok its_ok_two" v-show="todo[4].type !== 0"></div>
              <div class="its_ok its_ok_two its_nor_ok" v-if="todo[4].type === 0"></div>
              <div class="circle">
                  <span class="red_circle" :class="todo[4].type !== 0? todo[4].type === 1?'red_full':'red_c':''"></span> 
              </div>
            <!-- for循环有点问题，待定 -->
            <!-- <div v-for="(item,index) in todo">
              <div class="its_ok its_ok_two" v-show="item.type !== 0"></div>
              <div class="its_ok its_ok_two its_nor_ok" v-if="item.type === 0"></div>
              <div class="circle">
                  <span class="red_circle" :class="item.type !== 0? item.type === 1?'red_full':'red_c':''"></span> 
                  <span class="red_circle" :class="todo.state > 131 ? 'red_full':''" ></span>
              </div>-->
            <!-- </div>  -->
        </div>

        <!--文字-->
        <div class="bottom">
            <div class="word"  v-for="item in todo">{{item.states}}</div>
        </div>
    </div>
</template>
<script>
import common from "../../common/common.js";
export default {
  data() {
    return {};
  },
  props: {
    todo: {
      type: Array,
      default:function(){
          return  [{type:2}, {type:2}, {type:2}, {type:2}, {type:2}]
      }
    }
  },
  methods: {},
  created() {}
};
</script>