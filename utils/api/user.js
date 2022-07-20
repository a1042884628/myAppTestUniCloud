import {post,get} from './base.js'
const user = {
	getUserWallet(params){ 
		return post('/user/user_wallet', params)
	},
	getMyAppointment(params){//我的预约列表
		return post('/user/user_visit_orderlist', params)
	},
	appointmentKnafang(params){//预约看房
		return post('/user/user_visit_orderedit', params)
	},
	getUserMoneyLogList(params){//用户佣金明细列表
		return post('/user/user_money_loglist', params)
	},
	getUserScoreLogList(params){//用户积分明细列表
		return post('/user/user_score_loglist', params)
	},
	reportedCustomer(params){//经纪人报备客户
		return post('/agent/clientedit', params)
	},
	client_mobile_complete(params){//隐号补全
		return post('/agent/client_mobile_complete', params)
	},
	getRereportedCustomerStatus(params){//经纪人客户状态统计
		return post('/agent/clientstat', params)
	},
	getCustomerList(params){//经纪人客户列表
		return post('/agent/clientlist', params)
	},
	getMoneyList(params){//经纪人佣金结算状态
		return post('/agent/commissionlist', params)
	},
	getMoneyList(params){//经纪人佣金结算状态
		return post('/agent/commissionlist', params)
	},
	favorite(params){//收藏
		return post('/user/user_favourateedit', params)
	},
	getFavoriteList(params){//收藏
		return post('/project/user_project_house_type_list', params)
	},
	getShareList(params){
		return post('/weixin/share_callbacklist', params)
	},
	accountLogin(params){
		return post('/weixin/passwd_login', params)
	},
	hide_mobile_check(params){
		return post('/agent/hide_mobile_check', params)
	}
	,
	user_sign_in(params){
		return post('/user/user_sign_in', params)
	}	,
	channel_person_list(params){
		return post('/user/channel_person_list', params)
	}	,
	recent_search_key_words(params){
		return post('/user/recent_search_key_words', params)
	}
}
export default {
	...user
}