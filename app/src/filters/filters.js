import Vue from 'vue'

Vue.filter('timeFormat', function(val) {
	if(val) val = val.split(' ')[0];
	return val;
});

Vue.filter('timessss', function(val) {
	if(val) {}
	val = val.split(' ')[1].slice(0, 5);

	return val;
});

Vue.filter('timechoose', function(val) { //时间过滤
	if(val) {
		val = val.slice(0, 16);
	}
	//		val = val.data[0].context;

	return val;
});

Vue.filter('source', function(val) { //来源过滤
	if(val == 1) {
		val = '报价';
	} else if((val == 2)) {
		val = '资源';
	}

	return val;
});

Vue.filter('locationName', function(val) { //产地过滤
	if(val == '') {
		val = '不限';
	}
	return val;
});

Vue.filter('userType', function(val) { //用户类型过滤
	val = Number(val);
	switch(val) {
		case 1:
			val = '我是厂家';
			break;
		case 2:
			val = '我是服务商';
			break;
		case 3:
			val = '我是商家';
			break;
		case 4:
			val = '我是种植户';
			break;
		default:
			val = '';
			break;
	}
	return val;
});

Vue.filter('mainType', function(val) { //用户类型过滤
	val = Number(val);
	switch(val) {
		case 1:
			val = '请选择您经常需求的品种';
			break;
		case 2:
			val = '请选择您经常经营的品种';
			break;
		case 3:
			val = '请选择您经常经营的品种';
			break;
		case 4:
			val = '请选择您经常交易的品种';
			break;
		default:
			val = '';
			break;
	}
	return val;
});

Vue.filter('lo_context', function(val) { //物流过滤
	if(val) {}
	val = val.data[0].context;
	return val;
});
Vue.filter('statusGet', function(val) {
	switch(val) {
		case 0:
			val = '初始';
			break;
		case 10:
			val = '申请审核';
			break;
		case 11:
			val = '用户未认证';
			break;
		case 12:
			val = '审核中';
			break;
		case 19:
			val = '审核不通过';
			break;
		case 20:
			val = '正常';
			break;
		case 31:
			val = '冻结';
			break;
		default:
			val = '';
			break;
	}
	return val;
});
Vue.filter('statusContainGet', function(val) {
	if(val) {

		val = val.split(' ')[1];
		val = val.split(':')[0] + ':' + val.split(':')[1];
	}
	return val;
});

Vue.filter('timeTimeGet', function(val) {
	if(val) {

		val = val.split(' ')[1];
		val = val.split(':')[0] + ':' + val.split(':')[1];
	}
	return val;
});

Vue.filter('timeDayGet', function(val) {
	if(val) {
		val = val.split(' ')[0];
		val = val.split('-')[1] + '-' + val.split('-')[2];
	}
	return val;
});

Vue.filter('timeFormats', function(val) {
	if(val) {
		val = val.split(' ')[0];
		val = val.split('-')[0] + '/' + val.split('-')[1] + '/' + val.split('-')[2];
	}
	return val;
});
Vue.filter('timeDays', function(due) {
	let days;
	if(due) {
		due = due.split('.')[0];
		var arr = due.split(/[- : \/]/);
		var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var pubdateDate = new Date();
		var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
		let day = (dateValue / (24 * 3600 * 1000));
		//console.log(45,day)
		days = Math.ceil(dateValue / (24 * 3600 * 1000));

		if(days > 0) {
			days = days + '天'
		} else if(days <= 0) {
			days = '0天';
		}
	} else {
		days = '0天';
	}
	return days;
});

Vue.filter('timeDay', function(due) {
	let days;
	if(due) {
		due = due.split('.')[0];
		var arr = due.split(/[- : \/]/);
		var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var pubdateDate = new Date();
		var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
		days = Math.ceil(dateValue / (24 * 3600 * 1000));

		if(days > 0 && days <= 30) {
			days = days;
		} else if(days > 30) {
			days = 30;
		} else if(days <= 0) {
			days = 0;
		}
	} else {
		days = 0;
	}
	return days;
});

Vue.filter('needTimeDay', function(due) {
	let days;
	if(due) {
		due = due.split('.')[0];
		var arr = due.split(/[- : \/]/);
		var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var pubdateDate = new Date();
		var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
		days = Math.ceil(dateValue / (24 * 3600 * 1000));

		if(days > 0 && days <= 30) {
			days = '剩余' + days + '天截止';
		} else if(days > 30) {
			days = '剩余' + 30 + '天截止';
		} else if(days <= 0) {
			days = '已过期';
		}

	} else {
		days = '已过期';
	}
	return days;
});

Vue.filter('needTimeDayButton', function(due) {
	let days;
	if(due) {
		due = due.split('.')[0];
		var arr = due.split(/[- : \/]/);
		var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var pubdateDate = new Date();
		var dateValue = duedateDate.getTime() - pubdateDate.getTime() - 5000;
		days = Math.ceil(dateValue / (24 * 3600 * 1000));

		if(days > 0 && days <= 30) {
			days = '剩余' + days + '天';
		} else if(days > 30) {
			days = '剩余' + 30 + '天';
		} else if(days <= 0) {
			days = '已过期';
		}

	} else {
		days = '已过期';
	}
	return days;
});
Vue.filter('theUnit', function(due) {
	let days;
	if(due) {
		due = due.split('.')[0];
		var arr = due.split(/[- : \/]/);
		var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var pubdateDate = new Date();
		var dateValue = duedateDate.getTime() - pubdateDate.getTime();
		days = Math.ceil(dateValue / (24 * 3600 * 1000));
		if(days < 0) {
			days = 0;
		} else if(days < 10 && days > 0) {
			days = days
		} else if(days > 30) {
			days = 0;
		} else {
			days = days.toString();
			days = days.split('')[1];
		}
	}
	return days;
});
//计算加上截止时间后的日期
Vue.filter('endTime', function(start, overDay) {
	if(start) {
		start = start.split('.')[0];
		var arr = start.split(/[- : \/]/);
		var startTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		startTime = startTime.getTime() + 24 * 3600 * 1000 * overDay;
		var date = new Date(startTime);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() + ' ';
		return Y + M + D;
	}
})
//判断是否失效
Vue.filter('periodTime', function(time) {
	if(time) {
		time = time.split('.')[0];
		var arr = time.split(/[- : \/]/);
		var startTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var nowTime = new Date();
		if(nowTime.getTime() > startTime.getTime()) {
			return '失效'
		} else {
			return ''
		}
	}
})
Vue.filter('decade', function(due) {
	let days;
	if(due) {
		due = due.split('.')[0];
		var arr = due.split(/[- : \/]/);
		var duedateDate = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
		var pubdateDate = new Date();
		var dateValue = duedateDate.getTime() - pubdateDate.getTime();
		days = Math.ceil(dateValue / (24 * 3600 * 1000));

		if(days < 10) {
			days = 0;
		} else if(days > 30) {
			days = 3;
		} else {
			days = days.toString();
			days = days.split('')[0];
		}
	}
	return days;
});

Vue.filter('floatType', function(val) {
	if(val) {
		val = parseFloat(val);
		val = val.toFixed(2);
	} else if(parseInt(val) == 0) {
		val = '--';
	}
	return val;
})

Vue.filter('marketFloatType', function(val) {
	if(val) {
		val = parseFloat(val);
		val = val.toFixed(2);
	}
	return val;
})
Vue.filter('indexFloatType', function(val) {
	if(val) {
		val = parseFloat(val);
		val = val.toFixed(2);
	} else if(parseInt(val) == 0) {
		val = '0.00';
	}

	return val;
})

Vue.filter('percentType', function(val) {
	if(val) {
		val = parseFloat(val);
		val = val.toFixed(2) + '%'; //四舍五入保留几位小数   
	} else if(parseInt(val) == 0) {
		val = '--';
	}
	return val;
})

Vue.filter('successTimeFormat', function(val) {
	if(val) {
		var date = new Date(val);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() + ' ';
		/*let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds(); */
		val = Y + M + D;
	}
	return val;
});

Vue.filter('successTimeday', function(val) {
	if(val) {
		var date = new Date(val);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() + ' ';
		/*let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds(); */
		val = D;
	}
	return val;
});

Vue.filter('successTimeMonth', function(val) {
	if(val) {
		var date = new Date(val);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate() + ' ';
		/*let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds(); */
		val = Y + M;
	}
	return val;
});

Vue.filter('successTimeFormats', function(val) {
	if(val) {
		var date = new Date(val);
		let Y = date.getFullYear();
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		// let s = date.getSeconds(); 
		val = Y + '年' + M + '月' + D + '日' + ' ' + h + ':' + m;
	}
	return val;
});
Vue.filter('birthdayTime', function(val) {
	if(val) {
		var date = new Date(val * 1000);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
		/*let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds(); */
		val = Y + M + D;
	} else {
		val = "请选择"
	}
	return val;
});
Vue.filter('successTime', function(val) {
	if(val) {
		var date = new Date(val);
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() + ' ';
		let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds();
		val = h + m + s;
	}
	return val;
});

Vue.filter('shellStatus', function(val) {
	switch(val) {
		case 0:
			val = '未上架';
			break;
		case 1:
			val = '上架受理中';
			break;
		case -2:
			val = '上架失败';
			break;
		case 2:
			val = '已上架';
			break;
		case 3:
			val = '已下架';
			break;
		case 4:
			val = '已下架';
			break;
		default:
			val = '';
			break;
	}
	return val;
});
Vue.filter('myStatus', function(val) {
	switch(val) {
		case 0:
			val = '未上架';
			break;
		case 1:
			val = '受理中';
			break;
		case 2:
			val = '询价中';
			break;
		case -2:
			val = '未通过';
			break;
		case 3:
			val = '询价结束';
			break;
		case 4:
			val = '询价结束';
			break;
		default:
			val = '';
			break;
	}
	return val;
});
Vue.filter('myOfferStatus', function(val) {
	switch(val) {
		case 0:
			val = '受理中';
			break;
		case 1:
			val = '已采用';
			break;
		case 2:
			val = '未采用';
			break;
		case 3:
			val = '受理中';
			break;
		default:
			val = '';
			break;
	}
	return val;
});

//认证类别
Vue.filter('myAuthStatus', function(val) {
	switch(val) {
		case 0:
			val = '';
			break;
		case 1:
			val = '个人认证';
			break;
		case 2:
			val = '三证合一';
			break;
		case 3:
			val = '传统三证';
			break;
	}
	return val;
});
Vue.filter('purchaseStatus', function(val) {
	switch(val) {
		case -2:
			val = '已过期';
			break;
		case -1:
			val = '已取消';
			break;
		case 0:
			val = '受理中';
			break;
		case 10:
			val = '受理中';
			break;
		case 20:
			val = '待付款';
			break;
		case 30:
			val = '待卖家发货';
			break;
		case 40:
			val = '待卖家发货';
			break;
		case 50:
			val = '待收货';
			break;
		case 60:
			val = '已完成';
			break;
		case 70:
			val = '已完成';
			break;
	}
	return val;
});
Vue.filter('sellStatus', function(val) {
	switch(val) {
		case -2:
			val = '已过期';
			break;
		case -1:
			val = '已取消';
			break;
		case 0:
			val = '受理中';
			break;
		case 10:
			val = '受理中';
			break;
		case 20:
			val = '待买家付款';
			break;
		case 30:
			val = '待收款';
			break;
		case 40:
			val = '待发货';
			break;
		case 50:
			val = '待买家收货';
			break;
		case 60:
			val = '已完成';
			break;
		case 70:
			val = '已完成';
			break;
	}
	return val;
});

//orderStatus 10:受理中 20：待支付尾款 66：待支付定金 30/40待发货 50待收货 60/70 已完成
Vue.filter('willSell', function(val) {
	switch(val) {
		case 0:
			val = '受理中';
			break;
		case 10:
			val = '受理中';
			break;
		case 20:
			val = '待支付尾款';
			break;
		case 30:
			val = '待发货';
			break;
		case 40:
			val = '待发货';
			break;
		case 50:
			val = '待收货';
			break;
		case 66:
			val = '待支付定金';
			break;
		case 60:
			val = '已完成';
			break;
		case 70:
			val = '已完成';
			break;
	}
	return val;
});

Vue.filter('normalMoney', function(normal, freeze) {
	let normalMoney = 0;
	let freezeMoney = 0;
	if(Number(normal)) normalMoney = Number(normal);
	if(Number(freeze)) freezeMoney = Number(freeze);
	let all_money = normalMoney + freezeMoney;
	all_money = all_money.toFixed(2);
	return all_money
})
Vue.filter('money', function(money) {
	let val = 0;

	if(Number(money)) val = Number(money);

	val = val.toFixed(2);
	return val
})

Vue.filter('sex', function(val) {
	switch(val) {
		case 1:
			val = '男';
			break;
		case 2:
			val = '女';
			break;
	}
	return val;
})

//过滤文字长度
Vue.filter('filterTxt', function(txt, num) {
	if(txt && txt.length > num && num && num != 0) {
		return txt.substring(0, num) + '...';
	} else {
		return txt
	}
})

//遇到；换行
Vue.filter('lineTxt', function(txt) {
	if(txt.indexOf('；') !== -1) {
		let arr = txt.split('');
		let val1 = arr.splice(0, txt.indexOf('；') + 1).join('');
		//let val2 = arr.splice(txt.indexOf('；') + 1, txt.length).join('');
		return val1;
	} else {
		return txt;
	}
	// if(txt){
	//     var arr = txt.split('')
	// }
})

Vue.filter('lineTxtTwo', function(txt) {
	if(txt.indexOf('；') !== -1) {
		let arr = txt.split('');
		//let val1 = arr.splice(0, txt.indexOf('；') + 1).join('');
		let val2 = arr.splice(txt.indexOf('；') + 1, txt.length).join('');
		return val2;
	}
})

//买卖性质
Vue.filter('userTypes', function(val) {
	switch(val) {
		case 0:
			val = '';
			break;
		case 1:
			val = '买方';
			break;
		case 2:
			val = '卖方';
			break;
		case 3:
			val = '买卖方';
			break;
	}
	return val;
})

//对应照片
Vue.filter('selectPhoto', function(val) {
	switch(val) {
		case 0:
			val = '手持身份证照';
			break;
		case 1:
			val = '身份证正面';
			break;
		case 2:
			val = '身份证反面';
			break;
		case 3:
			val = '工商营业执照';
			break;
		case 4:
			val = '组织机构代码证';
			break;
		case 5:
			val = '税务登记证';
			break;
		case 6:
			val = '银行开户许可证';
			break;
		case 7:
			val = 'GMP资质证书';
			break;
		case 8:
			val = 'GSP资质证书';
			break;
		case 9:
			val = '三证合一';
			break;
		case 10:
			val = '银行开户许可证';
			break;
		case 11:
			val = 'GMP资质证书';
			break;
		case 12:
			val = 'GSP资质证书';
			break;
		case 13:
			val = '生产许可证';
			break;
		case 14:
			val = '生产许可证';
			break;
	}
	return val;
})

//报价
Vue.filter('offerState', function(val) {
	switch(val) {
		case 0:
			val = '受理中';
			break;
		case 1:
			val = '已采纳';
			break;
		case 2:
			val = '未采用';
			break;
		case 3:
			val = '待寄样';
			break;
		case 4:
			val = '已寄样';
			break;
	}
	return val;
})