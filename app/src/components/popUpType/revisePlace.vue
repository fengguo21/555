<style lang="less" scoped>
.release_need {
    background-color: #fff;
    .address {
        display: flex;
        flex-direction: row;
        box-sizing:border-box;
        padding: 13px 0 13px 0;
        line-height: 20px;
        .left {
            font-size: 15px;
            color: #343434;
            width: 70px;
            text-align: left;
        }
        .content {
            flex: 1;
            text-align: left;
            font-size: 15px;
            color: #666;
            span {
                color: #CDCDCD;
                font-size: 12px
            }
        }
        .img {
            width: 30px;
            padding-top: 0px;
            img {
                height: 18px;
            }
        }
        border-bottom: 1px solid #DADADA;
    }
    .bottom {}
    .address_box {
        position: relative;
        padding-top: 4rem;
        background: white;
    }
    .address_box .left-button {
        position: absolute;
        left: 10%;
        top: 1rem;
        width: 60px;
        height: 30px;
        font-size: 16px;
    }
    .address_box .right-button {
        position: absolute;
        right: 10%;
        top: 1rem;
        width: 60px;
        height: 30px;
        font-size: 16px;
    }
}
</style>
<template>
    <div class="release_need">
        <div class="address" @click="selectPlace">
            <div class="left">所在地区</div>
            <div class="content">
                <span v-show="!obj.addressProvince">请选择</span> {{ obj.addressProvince }}<span v-show="obj.addressCity">,</span>{{ obj.addressCity }}<span v-show="obj.addressDistrict">,</span>{{obj.addressDistrict}}
            </div>
            <div class="img">
                <img src="/static/icons/rele-right.png">
            </div>
        </div>
        <mt-popup v-model="obj.tshow" position="bottom" class="popup_unit" :closeOnClickModal="false" style="width:100%">
            <div class="bottom">
                <div class="address_box">
                    <mt-button type="primary" class="left-button" @click="cancel">取消</mt-button>
                    <mt-button type="primary" class="right-button" @click="confirmIt">确定</mt-button>
                    <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5" class="select-box"></mt-picker>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
import areaJson from '../../common/areaData'
import {
    mapGetters
} from 'vuex'
const addressArr = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾', '香港', '澳门'];
export default {
    data() {
            return {
                areaParam: {
                    addressProvince: '北京',
                    addressProvinceId: 247,
                    addressCity: '东城',
                    addressCityId: 3021,
                    addressDistrict: '城区',
                    addressDistrictId: 5001
                },
                addressSlots: [{
                    flex: 1,
                    values: addressArr,
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['北京'],
                    className: 'slot3',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot4'
                }, {
                    flex: 1,
                    values: ['城区'],
                    className: 'slot5',
                    textAlign: 'center'
                }]
            }
        },
        props: {
            obj: {}
        },
        computed: {
            
        },
        methods: {
            cancel() {
                this.obj.tshow = false;
            },
            confirmIt() {
                this.obj.addressProvince = this.areaParam.addressProvince;
                this.obj.addressCity = this.areaParam.addressCity;
                this.obj.addressDistrict = this.areaParam.addressDistrict;
                this.obj.addressProvinceId = this.areaParam.addressProvinceId;
                this.obj.addressCityId = this.areaParam.addressCityId;
                this.obj.addressDistrictId = this.areaParam.addressDistrictId;
                if (this.obj.addressDistrict) {
                    this.obj.address = this.obj.addressProvince + ',' + this.obj.addressCity + ',' + this.obj.addressDistrict;
                } else {
                    this.obj.address = this.obj.addressProvince + ',' + this.obj.addressCity;
                }
                this.obj.tshow = false;
            },
            selectPlace() {
                this.getAreaJson();
                this.obj.tshow = true;
            },
            onAddressChange(picker, values) {
                if (this.isAddres) {
                    picker.setSlotValues(1, Object.keys(this.addresJson[values[0]]).filter(this.CheckKey));
                    this.areaParam.addressProvince = values[0];
                    this.areaParam.addressProvinceId = this.addresJson[values[0]].id;
                    if (this.addresJson[values[0]][values[1]]) {
                        picker.setSlotValues(2, Object.keys(this.addresJson[values[0]][values[1]]).filter(this.CheckKey));
                        this.areaParam.addressCity = values[1];
                        this.areaParam.addressCityId = this.addresJson[values[0]][values[1]].id;
                        if (this.addresJson[values[0]][values[1]][values[2]]) {
                            this.areaParam.addressDistrict = values[2];
                            this.areaParam.addressDistrictId = this.addresJson[values[0]][values[1]][values[2]].id;
                        } else {
                            this.areaParam.addressDistrict = '';
                            this.areaParam.addressDistrictId = '';
                        }
                    }
                    //console.log(values[2])
                }
            },
            getAreaJson() {
                var _self = this;
                return new Promise((resolve, reject) => {
                    common.$emit('show-load');
                    let url = common.urlCommon + common.apiUrl.most;
                    let body = {
                        biz_module: 'locationService',
                        biz_method: 'queryLocationList'
                    };
                    body.time = Date.parse(new Date()) + parseInt(common.difTime);
                    body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                    httpService.cart(url, body,
                        function(res) {
                            common.$emit('close-load');
                            if (res.data.code == '1c01') {
                                var PCD = {};
                                var result = res.body.biz_result.list;
                                result.forEach(function(p, index) {
                                    //确定省 格式 省名: { 市名: { 区名:区名, id:id } id: id } 
                                    //省名对应的对象 与ID
                                    PCD[p.cname] = {
                                        id: p.id
                                    };
                                    //确定省下面所有 市名对应的对象
                                    p.childList.forEach(function(c, idx) {
                                        PCD[p.cname][c.cname] = {
                                            id: c.id
                                        };
                                        //确定市下面所有的区 及区的id
                                        c.childList.forEach(function(d, i) {
                                            PCD[p.cname][c.cname][d.cname] = {
                                                id: d.id,
                                                name: d.cname
                                            };
                                        })
                                    })
                                })
                                _self.addresJson = PCD;
                                _self.countAddresData(PCD);
                                _self.isAddres = true;
                                console.log(PCD);
                                common.getAddress = false;
                            }
                            resolve(res);
                        },
                        function(err) {
                            common.$emit('close-load');
                            reject(err);
                        })
                })
            },
            countAddresData(addresJson) {
                this.addressSlots[0].values = Object.keys(addresJson).filter(this.CheckKey);
            },
            CheckKey(value) {
                if (value === 'id') {
                    return false;
                } else {
                    return true;
                }
            }
        },
        created() {
            //if(common.getAddress)this.getAreaJson();
        },
        mounted() {

        }
}
</script>
