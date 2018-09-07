<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

input {
    border: none;
    background-color: #fff;
}

.popup_unit {
    width: 250px;
    border-radius: 15px;
    .pop_box {
        width: 100%;
        background-color: #fff;
        min-height: 300px;
        border-radius: 15px;
        .title {
            padding: 15px 13px 15px 20px;
            display: flex;
            flex-direction: row;
            line-height: 15px;
            justify-content: space-between;
            border-bottom: 1px solid #E6E6E6;
            .left {
                font-size: 15px;
                color: #000;
            }
            .right {
                font-size: 12px;
                color: #999;
            }
        }
        .main {
            height: 220px;
            overflow: scroll;
            .selects {
                float: left;
                width: 50%;
                padding: 8px 10px 8px 15px;
                .inbox {
                    font-size: 15px;
                    color: #909090;
                    background-color: #F7F7F7;
                    padding: 6px 0;
                    border-radius: 8px;
                }
                .inbox_select {
                    font-size: 15px;
                    color: #fff;
                    background-color: #FAA105;
                    padding: 6px 0;
                    border-radius: 8px;
                }
            }
        }
        .confirm {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-top: 1px solid #E6E6E6;
            box-sizing: border-box;
            div {
                flex: 1;
                padding: 14px 0;
            }
            .left {
                border-right: 1px solid #E6E6E6;
                color: #A1A1A1;
            }
            .right {
                color: #FF6600;
            }
        }
    }
}
</style>
<template>
    <div class="pop_spec">      
        <mt-popup v-model="obj.sheetVisible" position="center" class="popup_unit" :closeOnClickModal="false">
            <div class="pop_box">
                <div class="title">
                    <div class="left">请选择</div>
                </div>
                <div class="main">
                    <div v-for="item in obj.actions" class="selects" @click="setObj(item.key,item.name,item.id_key,item.id)">
                        <div class="inbox"> {{item.name}}</div>
                    </div>
                </div>
                <div class="confirm">
                    <div class="right" @click="cancel()">取消</div>
                    <!-- <div class="right" @click="confirm()">确定</div> -->
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import common from '../../common/common.js'
import validation from '../../validation/validation.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                

            }
        },
        props: {
            obj: {

            }
        },
        methods: {
            setObj(key, value, id_key, id, index) {
                this.obj[key] = value;
                this.obj[id_key] = id;
                this.obj.sheetVisible = false;
            },
            cancel() {
                let _self = this;
                this.obj.sheetVisible = false;
            },
            confirm() {
                let _self = this;
                this.obj.sheetVisible = false;
            },
        },
        components: {


        },
        created() {
           //this.getBreedInformation(this.obj.breedName);

        },
        mounted() {

        }
}
</script>
