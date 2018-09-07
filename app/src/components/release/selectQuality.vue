<style lang="less" scoped>
input[type="text"],
input[type="submit"],
input[type="reset"],
select,
textarea {
    -webkit-appearance: none;
    border-radius: 0;
}

textarea::-webkit-input-placeholder {
    color: #ADADAD;
}

textarea:-moz-placeholder {
    color: #ADADAD;
}

textarea::-moz-placeholder {
    color: #ADADAD;
}

textarea:-ms-input-placeholder {
    color: #ADADAD;
}

input {
    border: none;
    background-color: #fff;
}

.select_quality {
    padding: 15px 0;
    border-top: 1px solid #E6E6E6;
    background-color: #fff;
    /*margin-bottom: 10px;*/
    .top {
        padding: 0 15px;
        text-align: left;
        font-size: 15px;
        color: #000;
        span {
            color: #999999;
            font-size: 12px;
        }
    }
    .inbox {
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .name {
            height: 30px;
            line-height: 30px;
            width: 88px;
            border-radius: 15px;
            color: #7E7E7E;
            background-color: #F4F4F4;
        }
        @media screen {
            .name {
                font-size: 12px;
                margin: 8px 8px 8px 0;
            }
            @media (max-width: 320px) {
                .name {
                    font-size: 10px;
                    margin: 8px 5px 8px 0;
                }
            }
        }
        .active {
            border-radius: 15px;
            background-color: #FAA105;
            color: #fff;
        }
        @media screen {
            .active {
                font-size: 12px;
                margin: 8px 8px 8px 0;
            }
            @media (max-width: 320px) {
                .active {
                    font-size: 10px;
                    margin: 8px 5px 8px 0;
                }
            }
        }
    }
    .supplement {
			text-align: center;
			width: 100%;
			font-size: 14px;
			div {
				color: #ADADAD;
				text-align: left;
			}
			.content {
				padding:10px;
				width: 85vw;
				min-height: 90px;
				border: 1px solid #e6e6e6;
				color: #000;
				background-color: #FDFDFD
			}
		}
}
</style>
<template>
    <div class="select_quality">
        <div class="top">产品卖点
            <span>(点击可多选哦)</span>
        </div>
        <div class="inbox">
            <div class="name" v-bind:class="{name:!todo.show,'active':todo.show}" v-for="(todo,index) in obj.sell" @click="select(todo,index)">{{todo.name}}</div>
        </div>
        <div class="supplement">
            <!--<div>请简单阐述您的产品信息</div>-->
            <textarea class='content' placeholder="请简单阐述您的产品信息  示例:年生草本，高50-100厘米主根肥厚，木质，长分枝，白色。茎自立，上部多分枝。" v-model="obj.descriptions"></textarea>
        </div>
    </div>
</template>
<script>
import common from '../../common/common.js'
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
        select(todo, index) {
            let _self = this;
            todo.show = !todo.show;
            _self.obj.sell_point = [];
            let select_content = '';
            let arr = _self.obj.descriptions.split(',');
            for (var i = 0; i < _self.obj.sell.length; i++) {
                if (_self.obj.sell[i].show) {
                    _self.obj.sell_point.push(_self.obj.sell[i].name);
                    if (select_content !== '') select_content = select_content + ',' + _self.obj.sell[i].name;
                    if (select_content == '') select_content = _self.obj.sell[i].name;
                }
            }
            
            //console.log(222,_self.obj.descriptions.split(','))
            //let last = _self.obj.descriptions.split(',')
            _self.obj.descriptions = '';
            if(select_content)_self.obj.descriptions = select_content + ',';

        }

    },
    components: {

    },
    created() {

    },
    mounted() {

    }
}
</script>
