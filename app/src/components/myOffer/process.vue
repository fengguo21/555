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
            .red_circle{
            	margin-top: 4px;
            	display: inline-block;
            	width: 20px;
            	height: 20px;
            	border: 2px solid #d2d2d2;
            	border-radius: 50px;
            	&.red_c{
            		border: 2px solid #ed6c5f;
            	}
            	&.red_full{
            		border: 2px solid #ed6c5f;
            		background-color: #ed6c5f;
            	}
            	&.red_full_green{
            		border: 2px solid #7BB157;
            		background-color: #7BB157;
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
        .left{
            flex:3;
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
        .red{
            color:red;
            font-size:10px;
        }
    }
}
</style>
<template>
	<!--报价是否接受 accept   0/1/2/3 未处理/接受/不接受/正在跟进   其中accept=1 且 state<=60  为待寄样状态，accept=1且 state>=70 为价格确认状态-->
    <div class="process">
        <div class="top">
            <div class="circle"><!--报价-->	
            	<span class="red_circle red_c"></span>
            </div>

            <div class="its_ok its_ok_two"></div>
            <div class="circle"><!--受理-->	
            	<span class="red_circle" :class="todo.accept !==0 ? 'red_c':'red_full'" ></span>
            </div>
            <div class="its_ok its_ok_two" v-show="todo.accept !== 0"></div>
            <div class="its_ok its_ok_two its_nor_ok" v-if="todo.accept == '0'"></div>
            <div class="circle"><!--采用-->
            	<!--<span class="red_circle" :class="todo.accept==1 ? 'red_c':todo.accept == '2'? 'red_full':''" ></span>-->
            	<span class="red_circle" :class="todo.accept==1 ? 'red_full':todo.accept == '2'? 'red_full':''" ></span>
            </div>
            
            <!--<div class="its_ok its_ok_two"  v-if="todo.accept == 1"></div>
            <div class="its_ok its_ok_two its_nor_ok" v-if="todo.accept !== 1"></div>
            <div class="circle"><!--寄样-->
            		<!--<span class="red_circle" :class="todo.state < 20 && todo.accept  == 1 ? 'red_full':todo.accept  == 1 ? 'red_c':''"></span>-->
            <!--</div>
             <div class="its_ok its_ok_two"  v-if="todo.state >= 20"></div>
            <div class="its_ok its_ok_two its_nor_ok" v-if="todo.state < 20"></div>-->
            <!--<div class="circle"><!--成交-->
            	<!--<span class="red_circle" :class="todo.state >=20 && todo.accept  == 1 ? 'red_full':''"></span>
            </div>-->
            
            <div class="its_ok its_ok_two its_nor_ok"></div>
            <div class="circle"><!--寄样-->
            		<span class="red_circle"></span>
            </div>
             <div class="its_ok its_ok_two its_nor_ok"></div>
            <div class="circle"><!--成交-->
            		<span class="red_circle"></span>
            </div>
        </div>
        <div class="bottom">
            <div class="word">已报价</div>
            
            <div class="word" v-show="todo.accept !== 0">受理中</div>
            <div class="word word_default" v-show="todo.accept == 0">受理中</div>
            
            <div class="word" v-show="todo.accept == '1'">已采用</div>
            <div class="word word_default" v-show="todo.accept == '2'">未采用</div>
            <div class="word word_default" v-show="todo.accept == '0' || todo.accept == '3'">待采用</div>
            
            <!--<div class="word word_default" v-show="todo.accept == '0' || todo.accept == '2' || todo.accept == '3'">待寄样</div>
            <div class="word" v-show="todo.accept == '1' && todo.state<20">待寄样</div>
            <div class="word" v-show="todo.accept == '1' && todo.state>=20">已寄样</div>
            
            <div class="word word_default" v-show="todo.state<20">待成交</div>
             <div class="word" v-show="todo.state>=20 && todo.state!==120">待成交</div>
             <div class="word" v-show="todo.state==120">已成交</div>-->
             
            <div class="word red">(即将上线)</div>
            <div class="word red">(即将上线)</div>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
export default {
    data() {
        return {

        }
    },
    props: {
        todo:{

        }
    },
    methods: {

    },
    created() {

    }


}
</script>