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

.basic_need_release {
    .popup_unit {
        height: 400px;
        overflow: scroll;
    }
    padding-top: 15px;
    .the_last {
        margin-bottom: 15px;
    }
    .breed_name {
        background-color: #fff;
        box-sizing: border-box;
        padding-left: 15px;
        width: 100%;
        .inbox {
            height: 50px;
            border-bottom: 1px solid #E6E6E6;
            display: flex;
            flex-direction: row;
            align-items: center;
            .breed_left {
                font-size: 15px;
                color: #343434;
                width: 50px;
                text-align: left;
            }
            .breed_center {
                flex: 1;
                input {
                    width: 100%;
                    height: 30px;
                    font-size: 15px;
                }
            }
            .img {
                width: 30px;
                img {
                    height: 18px;
                }
            }
        }
    }
    .number {
        background-color: #fff;
        box-sizing: border-box;
        padding-left: 15px;
        width: 100%;
        .box {
            height: 50px;
            border-bottom: 1px solid #E6E6E6;
            display: flex;
            flex-direction: row;
            align-items: center;
            .number_left {
                font-size: 15px;
                color: #343434;
                width: 85px;
                text-align: left;
            }
            .number_center {
                flex: 1;
                input {
                    width: 100%;
                    height: 30px;
                    font-size: 15px;
                    text-align: right;
                }
                padding-right:10px;
            }
            .number_right {
                width: 100px;
                border-left: 1px solid #E6E6E6;
                height: 40px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                position: relative;
                .word {
                    flex: 1;
                    text-align: left;
                    margin-left: 10px;
                    color: #7CB159;
                }
                div {
                    .select {
                        width: 18px;
                        position: absolute;
                        right: 15px;
                        top: 11px;
                    }
                }
                .day {
                    width: 100%;
                    height: 100%;
                    background: #fff url('/static/icons/rele-quan.png') no-repeat center center;
                    background-size: 30px 30px;
                    .today {
                        position: absolute;
                        font-size: 15px;
                        color: #7CB159;
                        left: 42px;
                        top: 10px;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="basic_need_release">
        <div class="breed_name">
            <div class="inbox" @click="jumpSearch('/releaseSearch')">
                <div class="breed_left">品名</div>
                <div class="breed_center">
                    <input type="text" placeholder="请选择您的产品名称" disabled="false" v-model="obj.drug_name">
                </div>
                <div class="img">
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
        <div class="breed_name">
            <div class="inbox" @click="showAction('spec')">
                <div class="breed_left">规格</div>
                <div class="breed_center">
                    <input type="text" placeholder="请选择您的产品规格" disabled="false" v-model="obj.spec">
                </div>
                <div class="img">
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
        <div class="breed_name the_last">
            <div class="inbox" @click="showAction('place')">
                <div class="breed_left">产地</div>
                <div class="breed_center">
                    <input type="text" placeholder="请选择您的产品规格" disabled="false" v-model="obj.place">
                </div>
                <div class="img">
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
        <mt-popup v-model="obj.sheetVisibles" position="center" class="mint-popup-1 popup_unit" style="width:60%">
            <div v-for="item in actions">
                <div style="color: #656b79;background-color: #f6f8fa;box-shadow: 0 0 1px #b8bbbf;padding:10px 0" @click="setObj(item.key,item.name,item.id_key,item.id)">{{item.name}}</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import common from '../../common/common.js'
import httpService from '../../common/httpService.js'
export default {
    data() {
            return {
                breedLocation: [],
                breedSpec: [],
                sheetVisibles: false,
                actions: [],
                unit: [{
                    id: 1,
                    name: 'g'
                }, {
                    id: 2,
                    name: 'kg'
                }],
            }
        },
        props: {
            obj: {
                sheetVisibles: false
            }
        },
        methods: {
            jumpSearch(router) {
                common.searchType = 'breed';
                common.$emit("setParam", "router", "supplyRelease");
                this.$router.push(router);
            },
            setObj(key, value, id_key, id) {
                this.obj.sheetVisibles = false;
                this.obj[key] = value;
                this.obj[id_key] = id;
                //console.log(id)
                
            },
            showAction(param) {
                this.obj.sheetVisibles = true;
                this.actions = [];
                let _self = this;
                if (param == "spec") {
                    for (var i = 0; i < _self.breedSpec.length; i++) {
                        _self.actions.push({
                            name: _self.breedSpec[i].name,
                            id:_self.breedSpec[i].id,
                            key: 'spec'
                        });
                    }
                } else if (param == "unit") {
                    for (var i = 0; i < _self.unit.length; i++) {
                        _self.actions.push({
                            name: _self.unit[i].name,
                            key: 'number_unit',
                            id: _self.unit[i].id,
                            id_key: 'number_id'
                        });
                    }
                } else {
                    for (var i = 0; i < _self.breedLocation.length; i++) {
                        _self.actions.push({
                            name: _self.breedLocation[i].name,
                            id: _self.breedLocation[i].locationId,
                            key: 'place',
                            id_key:'place_id'
                        });
                    }
                }
                console.log(22,this.actions)
            },
            getBreedInformation(name) {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'breedService',
                    biz_method: 'queryLocalSpecList',
                    biz_param: {
                        name: name
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.commonPost(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.obj.spec = '';
                        _self.obj.place = '';
                        _self.breedLocation = suc.data.biz_result.localList;
                        _self.breedSpec = suc.data.biz_result.specList;
                        if (_self.breedSpec.length > 0) _self.obj.spec = _self.breedSpec[0].name;
                        if (_self.breedLocation.length > 0) _self.obj.place = _self.breedLocation[0].name;
                        if (_self.breedLocation.length > 0) _self.obj.place_id = _self.breedLocation[0].locationId;
                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
            getUnit() {
                let _self = this;
                common.$emit('show-load');
                let url = common.addSID(common.urlCommon + common.apiUrl.most);
                let body = {
                    biz_module: 'enumService',
                    biz_method: 'queryEnumList',
                    biz_param: {
                        type: 'MU'
                    }
                };
                body.time = Date.parse(new Date()) + parseInt(common.difTime);
                body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
                httpService.commonPost(url, body, function(suc) {
                    common.$emit('close-load');
                    if (suc.data.code == '1c01') {
                        _self.unit = suc.data.biz_result.list;
                        if (!_self.obj.number_unit) {
                            _self.obj.number_unit = _self.unit[0].name;
                            _self.obj.number_id = _self.unit[0].id;
                        } else {
                            for (var i = 0; i < _self.unit.length; i++) {
                                if (_self.obj.number_unit == _self.unit[i].name) {
                                    _self.obj.number_id = _self.unit[i].id;
                                }
                            }
                        }

                    } else {
                        common.$emit('message', suc.data.msg);
                    }
                }, function(err) {
                    common.$emit('close-load');
                    common.$emit('message', err.data.msg);
                })
            },
        },
        components: {

        },
        created() {
            let _self = this;
            this.getUnit();
            common.$on("supplyRelease", function(item) {
                console.log(11,item)
                if (item.breedName) {
                    _self.getBreedInformation(item.breedName);
                    _self.obj.drug_name = item.breedName;
                    _self.obj.breedId = item.breedId;
                } else {
                    _self.getBreedInformation(item.keyWord);
                    _self.obj.drug_name = item.keyWord;
                    _self.obj.breedId = item.id;
                }
            });
           
        },
        mounted() {

        }
}
</script>
