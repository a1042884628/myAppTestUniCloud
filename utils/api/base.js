import {
	baseUrl,
	uploadUrl
} from '../../global/config.js'
import prompt from '../prompt.js'
// import vuex from './common/vuex'
import vuex from '../../common/vuex/index.js'

const get = (path, data) => {
	return request(path, "GET", data);
}

const post = (path, data) => {
	return request(path, "POST", data);
}

function request(path, method, data, header = {}) {
	console.log("request start",path);
	let platform="";
	// #ifdef MP-WEIXIN
		platform="weixin";
	// #endif
	// #ifdef MP-TOUTIAO
		platform="douyin";
	// #endif
	console.log("platform",platform)
	let _uuid="";
	let _uuidArr=vuex.getters.uuidSetting;
	for (var i = 0; i < _uuidArr.length; i++) {
		if(_uuidArr[i].selected)
		{
			_uuid=_uuidArr[i].uuid;
		}
	} 
	// _uuid="longchengkunyuan";
	let url = baseUrl + path
	let token = vuex.getters.token
	// let version=__wxConfig.envVersion;
	// let is_test=version=="release"?0:1;
	if(data==undefined){
		data={platform:platform,_uuid:_uuid};
	}else{
		// data.is_test=is_test;
		data._uuid=_uuid;
		data.platform=platform;
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				"content-type": "application/x-www-form-urlencoded", // 默认值
				'Authorization' : 'Bearer ' + token
			},
			success: function(res) {
				// console.log('版本：',__wxConfig.envVersion);
				/* if(res.statusCode && res.statusCode == "500"){
					if (path != "/index/errorlog2") postErrLog(url, data, res.statusCode, res.data);
				} */
				
				console.log("request end",path,res);
				if (res.data.statecode == "0") {
					resolve(res.data);
				} else {
					
					if(res.data.statecode == 1){
						prompt.hideToast();
						handleError(res)
						reject(res.data)
						
					}else{
						//console.log('test：',res.data.message);
						handleError(res)
					}
				}
			},
			fail: function(res) {
				if (res.statusCode == '200') {
					handleError(res)
					reject(res.data)
				} else {
					// if (path != "/index/errorlog") postErrLog(url, data, res.statusCode, res.data);
				}
			},
			complete: function() {

			}
		});
	});
}

function handleError(res) {
	console.log("error",res);
	res.data.message ? prompt.showMsg(res.data.message) : prompt.showMsg('网络错误，请稍后重试~')
}

function postErrLog(url, postData, statusCode, resData) {
	prompt.hideToast()
	if(postData instanceof Object){
		postData = JSON.stringify(postData)
	}
	if(resData instanceof Object){
		resData = JSON.stringify(resData)
	}
	let params = {
		url: url, //接口地址
		post_data: postData, //传递参数
		statusCode: statusCode, //状态码
		result: resData //接口返回数据
	}
	return post('/index/errorlog2', params)
}
export  {
	post,
	get
}
