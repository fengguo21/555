<style lang="less" scoped>
.container{
    background-color: #fff;
    position:relative;
    .topBox{
        margin:0 7%;
        height:56px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        .circle{
            height:31px;
            width:31px;
            border-radius:50%;
            background-color:#f7f7f7;
            border:1px solid #e3e3e3;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:17px;
            color:#999;
        }
        .active{
             background-color:#ff9c01;
             color:white;
        }

    }
    .botBox{
        height:32px;
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin:0 10px;
        color:#999;
        font-size:15px;
        .active{
            color:#ff9c01;
        }
    }
    .lineBox{
         padding:0 4%;
        position:absolute;
        display:flex;
        align-items:center;
       width:86%;
        justify-content:space-around;
       .line{
            width:40px;
           img{
            width:40px;
            
            
           }
        } 
    }
        
   

}
</style>
<template>
    <div class="container">
       <div class="topBox">
        <div  v-for='i in 4' style='display:flex;align-items:center;justify-content:space-between;z-index:1000' @click='tostep(i)'>
           <div  class="circle" v-bind:class="{ active: step >= i -1 }">
              {{i}}

          </div> 
        </div>
        <div class="lineBox">
           <div class="line" v-for='i in 3'>
             <img src="/static/images/line2.png" v-if='step >= i'>
              <img src="/static/images/line.png" v-else>

          </div>  
        </div>
        
          
          
       </div>
       <div class="botBox"  >
           <div v-for='(item,index) in steps' v-bind:class="{ active: step >= index }">
               {{item}}
           </div>
       </div>
    </div>
</template>
<script>
// import '../../common/rem.js';

export default {
    data() {
            return {
                
                }
        },
        props: {
           step:0,
           steps:[],
        },
        methods: {
          tostep(i){
            this.$emit('tostep',i)
          }  
        },
        components: {
        },
        created() {
            
       }
}
</script>
