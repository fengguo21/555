let validation = {};

validation.checkPhone = (phone) => {
	let pattern = /^1[3456789]\d{9}$/;
	if(!phone) {
		return '请输入手机号码！';
	} else if(!pattern.test(phone)) {
		return '手机号码有误！';
	} else {
		return false;
	}

}
validation.checkIdCard = (code) => {
	// let pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
	// if(!val){
	//     return '请输入身份证号码'
	// }else if(!pattern.test(val)){
	//     return '请输入正确的身份证号码'
	// }else{
	//     return false
	//function IdentityCodeValid(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;

	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "请输入正确的身份证号码";
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		tip = "请输入正确的身份证号码";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]) {
				tip = "请输入正确的身份证号码";
				pass = false;
			}
		}
	}
	if(!pass) return tip;
	return false;
	//}
}
validation.checkMaxNum = (val, name) => {
	let pattern = /^[1-9]\d{0,7}$/;
	if(!val) {
		return '请输入' + name
	} else if(!pattern.test(val)) {
		return name + '需为8位以内正整数'
	} else {
		return false;
	}
}

//验证两个数是否相等
validation.checkAgain = (val, val2, name) => {
	if(val == val2) {
		return false;
	} else {
		return name;
	}
}

validation.checkMaxPrice = (val1, val2, val3, name) => {
	console.log(val1, val2, val3, name)
	if(val1 * val2 < val3) {
		return name
	} else {
		return false;
	}
}

validation.checkAllNumberNull = (val1, val2, val3, name) => {
//	console.log(val1, val2, val3, name)
	if(val1==1) {
		if(val2==''){
			return name+'预付比例';
		}
		if(val3==''){
			return name+'账期天数';
		}
	} else {
		return false;
	}
}


//验证用户名是否可用
validation.checkLong = (val, name) => {
	var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
		regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im,
		strExp = /^[A-Za-z]+$/,
		han = /^[\u4e00-\u9fa5]+$/,
		shuzi = /[0-9]/,
		kongge =/\s/g,
		saveField =["冕冠", "药王谷", "东壁", "药材买卖网", "yaocaimaimai", "mianguan", "药材买卖", "东璧", "郭冕","于莎莎"],
		save = [];
	for (var i=0;i<saveField.length;i++) {
		if (val.indexOf(saveField[i])>=0) {
			save.push(i);
		}
	}
		
	if(shuzi.test(val)|| regEn.test(val) || regCn.test(val)) {
		return "用户名不可以出现数字或特殊字符"
	}  else if(strExp.test(val)) {
		if(val.length > 30) {
			return '英文字符不可以超过30个';
		} else {
			return false;
		}
	} else if(han.test(val)) {
		if(val.length > 15) {
			return '中文字符不可以超过15个';
		} else {
			return false;
		}
	}else if(kongge.test(val)){
		return '用户名不可以包含空格';
	}else if(val.length>15){
		return name;
	}else if(save.length>0) {
		save = [];
		return "亲,该名称已被占用了,请换个名字试试哟！";
	}else {
		return false;
	}
}

validation.checkPrice = (val, name) => {
	let pattern = /^[0-9]\d{0,6}([.][0-9]{1,2}){0,1}$/;
	if(!val) {
		return '请输入' + name
	} else if(!pattern.test(val)) {
		return name + '格式不对'
	} else {
		return false
	}
}
validation.checkLook = (look) => {
	//let pattern = /[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]/
	let pattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
	//let pattern = /[^\\u0020-\\u007E\\u00A0-\\u00BE\\u2E80-\\uA4CF\\uF900-\\uFAFF\\uFE30-\\uFE4F\\uFF00-\\uFFEF\\u0080-\\u009F\\u2000-\\u201f\r\n]/
	if(pattern.test(look)) {
		return '不可以输入表情'
	} else {
		return false
	}
}
validation.checkMinNumber = (password) => {
	let pattern = /^(?=.{6,16})(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]*$/
	if(!pattern.test(password)) {
		return '密码必须为6~16位数字和字母'
	} else {
		return false
	}
}

validation.checkPhoneTrue = (phone) => {
	let pattern = /^1[34578]\d{9}$/;
	if(!pattern.test(phone) || phone == '') {
		return '手机号码有误'
	} else {
		return false;
	}
}
validation.checkNameTrue = (name) => {
	let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
	if(!pattern.test(name) || name == '') {
		return '姓名请输入汉字或字母！'
	} else {
		return false;
	}
}
validation.checkCode = (code, confirmCode) => {
	console.log(code)
	console.log(confirmCode)
	if(!code) {
		return '请输入验证码！';
	} else if(code != confirmCode) {
		return '验证码有误！';
	} else {
		return false;
	}
}

validation.checkNull = (param, show) => {
	if(!param) {
		return show;
	} else {
		return false;
	}
}

validation.checkArrayNull = (param, show) => {
	if(param.length<=0) {
		return show;
	} else {
		return false;
	}
}

validation.checkCommon = (newName, oldName) => {
	if(newName !== oldName) {
		return '新密码不一致'
	} else {
		return false;
	}
}
validation.checkNumber = (value) => {
	if(parseInt(value)) {
		return true
	} else {
		return false
	}
}
validation.checkDifferent = (newName, oldName) => {
	if(newName == oldName) {
		return '与原密码不能相同'
	} else {
		return false;
	}
}
validation.checkAddress = (val) => {
	if(val == '请选择地址') {
		return '请选择交货地址'
	}
}

module.exports = validation;