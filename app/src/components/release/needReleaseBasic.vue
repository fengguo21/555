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

.input {
    text-align: right;
    width: 100%;
    font-size: 15px;
}

.basic_need_release {
    background-color: #fff;
    padding-left:15px ;
    .popup_unit {
        width: 250px;
        border-radius: 15px;
        .pop_box {
            width: 100%;
            background-color: #fff;
            min-height: 300px;
            border-radius: 15px;
            overflow: hidden;
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
                    color: #F84646;
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
                        border-radius: 50px;
                    }
                    .inbox_select {
                        font-size: 15px;
                        color: #fff;
                        background-color: #FAA105;
                        padding: 6px 0;
                        border-radius: 50px;
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
                    padding: 10px 0;
                }
                .left {
                	background-color: #EBEBEB;
                    border-right: 1px solid #E6E6E6;
                    color: #333;
                }
                .right {
                	background-color: #F8A20D;
                    color: #fff;
                }
            }
        }
    }
    .the_last {
        margin-bottom: 10px;
    }
    .breed_quality{
         padding-bottom:1rem;
        background-color: #fff;
       
        width: 100%; 
        .main {
               

               
                .selects {
                    float: left;
                    width: 20%;
                    height:30px;
                    font-size:14px;
                    margin-right:3.5%;
                    margin-top:15px;
                    
                   
                    .inbox {
                        
                        color: #909090;
                        background-color: #F7F7F7;
                        padding: 6px 0;
                        border-radius: 50px;
                    }
                    .inbox_select {
                       
                        color: #fff;
                        background-color: #FAA105;
                        padding: 6px 0;
                        border-radius: 50px;
                    }
                }
                .selects:last-child{
                         margin-bottom:30px;
                    }
            }
        .breed_left {
                font-size: 15px;
                color: #343434;
                width: 80px;
                text-align: left;
            }
    }
    .breed_name {
        background-color: #fff;
        box-sizing: border-box;
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
                width: 80px;
                text-align: left;
            }
            .breed_center {
                flex: 1;
                text-align: right;
                input{
                	text-align: right;
                }
                .title {
                    width: 100%;
                    color: #8E97A1;
                    text-align: left;
                }
            }
            .img {
                width: 30px;
                img {
                    height: 18px;
                }
            }
        }
        .last {
            padding: 14px 0;
            /*margin-top: 10px;*/
            border-bottom: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            .breed_left {
                font-size: 15px;
                color: #343434;
                width: 80px;
                text-align: left;
            }
            .breed_center {
                flex: 1;
                .title {
                    width: 100%;
                    color: #c6c6c6;
                    text-align: right;
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
        background-color: #FBFBF6;
        box-sizing: border-box;
        width: 100%;
        .box {
            background-color: #fff;
            height: 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
      		border-bottom: 1px solid #E6E6E6;
            
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
                    text-align: right;
                    font-size: 15px;
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
                    text-align: right;
                    margin-right: 10px;
                    color: #7CB159;
                }
                .green {
                    color: #7CB159;
                }
                div {
                    .select {
                        width: 18px;
                        right: 15px;
                        margin-top: 6px;
                        margin-right: 15px;
                    }
                }
            }
        }
    }
}
input[disabled]{
	color: #000 !important;
	opacity: 1 !important;
}
</style>
<template>
    <div class="basic_need_release">
        <div class="breed_name">
            <div class="inbox" @click="jumpSearch('/search')" v-show="!obj.type_show">
                <div class="breed_left">品名</div>
                <div v-if='obj.flag'>{{obj.drug_name}}<span style="font-size: 15px;color: #FF8201; margin-left: 10px;">({{obj.number}}{{obj.number_unit}})</span></div>
                <div class="breed_center"  v-if='!obj.flag'>
                    <input type="text" placeholder="请选择您的产品名称" :readonly="false" v-model="obj.drug_name">
                </div>
                <div class="img" v-if='!obj.flag'>
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
            <div class="inbox"  v-show="obj.type_show">
                <div class="breed_left">品名</div>
                <div v-if='obj.flag'>{{obj.drug_name}}<span style="font-size: 15px;color: #FF8201; margin-left: 10px;">({{obj.number}}{{obj.number_unit}})</span></div>
                <div class="breed_center" v-if='!obj.flag'>
                    <input type="text" placeholder="请选择您的产品名称" disabled="disabled" v-model="obj.drug_name">
                </div>
                <div class="img">
                    <!-- <img src="/static/icons/rele-right.png"> -->
                </div>
            </div>
        </div>
        <div class="breed_name">
            <div class="inbox" @click="showAction('spec')">
                <div class="breed_left">规格</div>
                 <div v-if='obj.flag'>{{obj.spec}}</div>
                <div class="breed_center" v-if='!obj.flag'>
                    <input type="text" placeholder="请选择您的产品规格" disabled="disabled" v-model="obj.spec">
                </div>
                <div class="img" v-if='!obj.flag'>
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
        <div class="breed_name">
            <div class="inbox" @click="showAction('place')">
                <div class="breed_left">产地</div>
                 <div v-if='obj.flag'>{{obj.place}}</div>
                <div class="breed_center" v-if='!obj.flag'>
                    <input type="text" placeholder="请选择您的产品产地" disabled="disabled" v-model="obj.place">
                </div>
                <div class="img" v-if='!obj.flag'>
                    <img src="/static/icons/rele-right.png">
                </div>
            </div>
        </div>
        <div class="number" v-show="obj.need" v-if='!obj.flag'>
            <div class="box">
                <div class="number_left">需求数量</div>
                <div class="number_center">
                    <input type="number" v-model="obj.number" placeholder="请输入">
                </div>
                <div class="number_right" @click="showAction('unit')">
                    <div class="word">{{obj.number_unit}}</div>
                    <div><img src="/static/icons/green-jian.png" class="select"></div>
                </div>
            </div>
        </div>
        <div class="breed_quality" v-show="obj.need">
            <div class="last" >
                <div class="breed_left" style="margin-top:10px;">质量要求</div>{{qualitys}}
                <div class="main" v-if='!obj.flag'>

                    <div v-for="(item,index) in quality" class="selects" @click="select(item,index)">
                        <div v-bind:class="{inbox:item.show,'inbox_select':!item.show}"> {{item.name}}</div>
                    </div>
                </div>
                <div class="main" v-else>
                    <div v-for="(item,index) in quality" class="selects" @click="select(item,index)" v-if='!item.show'>
                        <div v-bind:class="{inbox:item.show,'inbox_select':!item.show}"> {{item.name}}</div>
                    </div>
                </div>
            </div>
            
        </div>
        <mt-popup v-model="obj.sheetVisible" position="center" class="popup_unit" :closeOnClickModal="false">
            <div class="pop_box" v-show="actions_show">
                <div class="title">
                    <div class="left">请选择</div>
                </div>
                <div class="main">
                    <div v-for="item in actions" class="selects" @click="setObj(item.key,item.name,item.id_key,item.id)">
                        <div class="inbox"> {{item.name}}</div>
                    </div>
                </div>
                <div class="confirm">
                    <div class="left" @click="cancel()">取消</div>
                </div>
            </div>
            <div class="pop_box" v-show="quality_show">
                <div class="title">
                    <div class="left">请选择</div>
                    <div class="right">*此为多选项</div>
                </div>
                <div class="main">
                    <div v-for="(item,index) in quality" class="selects" @click="select(item,index)">
                        <div v-bind:class="{inbox:item.show,'inbox_select':!item.show}"> {{item.name}}</div>
                    </div>
                </div>
                <div class="confirm">
                    <div class="left" @click="cancel()">取消</div>
                    <div class="right" @click="confirm()">确定</div>
                </div>
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
                value:[],
                breedLocation: [],
                breedSpec: [],
                sheetVisible: false,
                actions: [],
                
                qualityArr: [],
                quality_show: false,
                actions_show: false,
                unit: [{
                    id: 1,
                    name: 'g'
                }, {
                    id: 2,
                    name: 'kg'
                }]
            }
        },
        props: {
            quality:[],
            obj: {
                sheetVisible: false
            }
        },
       

        methods: {
            jumpSearch(router) {
              if(this.obj.flag){
                return
              }
                let _self = this;

                common.searchType = 'breed';
                common.$emit("setParam", "router", "needRelease");
                this.$router.push(router);


            },
            showQuality() {
                if(this.obj){
                    console.log('flag true')
                }
                this.obj.sheetVisible = true;
                this.quality_show = true;
                this.obj.quality = '';
            },
            setObj(key, value, id_key, id, index) {
                this.obj[key] = value;
                this.obj[id_key] = id;
                console.log(id)
                this.actions_show = false;
                this.obj.sheetVisible = false;
            },
            select(item) {
                let _self = this;
                item.show = !item.show;
                // if (this.obj.quality) this.obj.quality = this.obj.quality + ',' + item.name;
                // if (!this.obj.quality) this.obj.quality = item.name;
                _self.qualityArr = [];
                for (var i = 0; i < _self.quality.length; i++) {
                    if (!_self.quality[i].show) {
                        _self.qualityArr.push(i);
                    }
                }

               this.$emit('select',_self.qualityArr)
                console.log( _self.qualityArr)

            },
            cancel() {
                let _self = this;
                this.obj.sheetVisible = false;
                this.quality_show = false;
                this.actions_show = false;
                for (var key in _self.quality) {
                    _self.quality[key].show = true;
                }
                this.obj.quality = '';
            },
            confirm() {
                let _self = this;
                // this.obj.sheetVisible = false;
                // this.quality_show = false;
                for (var key in _self.quality) {
                    _self.quality[key].show = true;
                }
                for (var i = 0; i < _self.qualityArr.length; i++) {
                    if (i == 0) {
                        _self.obj.quality = _self.quality[_self.qualityArr[0]].name;
                    } else {
                        _self.obj.quality = _self.obj.quality + ',' + _self.quality[_self.qualityArr[i]].name;
                    }
                }
                //console.log(_self.obj.quality)
            },
            showAction(param) {
                if(this.obj.flag){
                return
              }
            	console.log(this.obj.flag)
                let _self = this;
                if (_self.obj.drug_name) {
                    _self.actions_show = true;
                    _self.obj.sheetVisible = true;
                    _self.actions = [];
                    if (param == "spec") {
                        for (var i = 0; i < _self.breedSpec.length; i++) {
                            _self.actions.push({
                                name: _self.breedSpec[i].name,
                                id: _self.breedSpec[i].id,
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
                                id_key: 'place_id'
                            });
                        }
                    }
                }
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
                        console.log(suc.data.biz_result,'=============----------')
                        _self.breedLocation = suc.data.biz_result.localList;
                        _self.breedSpec = suc.data.biz_result.specList;
                         if (_self.breedSpec.length > 0) _self.obj.breedId = _self.breedSpec[0].breedId;
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
                            _self.obj.number_unit = _self.unit[2].name;
                            _self.obj.number_id = _self.unit[2].id;
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
            common.$on("Needrelease", function(item) {
                
                _self.getUnit();
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
            // common.$on('inforReleases', function(item) {
            //     console.log(231)
            //     _self.getUnit();
            // })


        },
       
}
</script>
