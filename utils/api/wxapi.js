import {post,get} from './base.js'
const wxapi = {
	wxLogin(params){ 
		return post('/weixin/get_open_id', params)
	},
	wxLogin2(params){
		return post('/weixin/wx_login', params)
	},
	decryptData(params){
		return post('/weixin/decrypt_data', params)
	},
	bindUserInfo(params){
		return post('/weixin/useredit', params)
	}
}
export default {
	...wxapi
}