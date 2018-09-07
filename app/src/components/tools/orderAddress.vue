<style lang="less" scoped>
.address_confirm {
    background-color: #fff;
    font-size: 15px;
    color: #333;
    padding: 17px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .box{
        flex:1;
    }
    .person {
        display: flex;
        flex-direction: row;
        align-items: center;

        .image {
            width: 35px;
            img {
                width: 14px;
            }
        }
        .word {
            line-height: 24px;
            text-align: left;
            flex: 1;
        }
    }
    .my_address {
        margin-top: 10px;
    }
    .right_arrow{
        height:18px;
        padding: 0px 9px 0 20px;
    }
}
</style>
<template>
    <div class="address_confirm">
        <div class="box">
            <div class="person">
                <div class="image">
                    <img src="/static/icons/consignee.png">
                </div>
                <div class="word">
                 	 <span>收货人:</span>  
                    <span v-show="param.contactName">{{param.contactName}}</span>
                    <span v-show="!param.contactName">未填写</span>
                    <span>|</span>
                    <span v-show="param.contactPhone">{{param.contactPhone}}</span>
                    <span v-show="!param.contactPhone">未填写</span>
                </div>
            </div>
            <div class="person my_address">
                <div class="image">
                    <img src="/static/icons/receipt_address.png">
                </div>
                <div class="word">
                    	地址:&nbsp;&nbsp;
                    <span v-show="param.contactName">{{param.address}}</span>
                    <span v-show="!param.contactName">未填写</span>
                </div>
            </div>
        </div>
        <img src="/static/images/right.png" class="right_arrow">
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    props: {
        param: {

        }
    },
    created() {
        let _self = this;
        common.$on('backAddress', function (todo) {
            _self.param.id = todo.id;
            _self.param.address = todo.address;
            _self.param.contactPhone = todo.contactPhone;
            _self.param.contactName = todo.contactName;
        })

        common.$on('edit-Address', function (todo) {
            if (_self.param.id == todo.id) {
                _self.param.address = todo.address;
                _self.param.contactPhone = todo.contactPhone;
                _self.param.contactName = todo.contactName;
            }

        })
    },
    methods: {}
}
</script>

