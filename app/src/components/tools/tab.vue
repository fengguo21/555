<template>
    <div class="tab">
          <div  v-bind:class="{ active: param.show, 'left': !param.show }" @click="change">{{param.left_name}}</div>
          <div  v-bind:class="{ active: !param.show, 'right': param.show }"  @click="change">{{param.right_name}}</div>
    </div>
</template>
<script>
export default {
    data() {
            return {}
        },
        props: {
            param:{

            }
        },
        methods:{
             change(){
                   this.param.show = !this.param.show;
                   this.param.left = !this.param.left;
                   this.param.right = !this.param.right;
             }
        }
}
</script>
<style scoped>
.tab{
    width:100%;
    display: flex;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    flex-direction: row;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction:row;
    -ms-flex-direction: row;
    background-color: #fff;
    
}
.tab div{
    flex:1;
    -webkit-box-flex:1;
    -webkit-flex:1;
    -ms-flex:1;

}
.tab .left,
.right{
     width:50%;
     /*border-bottom: 1px solid #CBCBCB;*/
     font-size: 16px;
     color:#666;
     padding: 14px 0;
}

.tab .active{
     width:50%;
     border-bottom: 2px solid #FF0000;
     color:#ff8201; 
     padding: 14px 0;  
     font-size: 16px;
}
</style>
