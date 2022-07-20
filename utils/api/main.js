import {get,post} from "./base.js"
const main = {
	getHomeData(params) {//获取首页数据
		return post('/index/index_show', params)
	},
	getProjectBasicDetail(params){//项目主详情
		return post('/project/project_main_data', params)
	},
	getProjectBasicInfo(params){//项目基础资料
		return post('/project/project_info_detail', params)
	},
	getProjectExtraDetail(params){//项目扩展详情
		return post('/project/project_detail', params)
	},
	getProjectImgRes(params){//项目vr视频图片数据
		return post('/project/project_pic_list', params)
	},
	getApartmentList(params){//户型列表
		return post('/project/project_house_type_list', params)
	},
	getApartmentDetail(params){//户型详情
		return post('/project/project_house_type_detail', params)
	},
	getSalemanDetail(params){//销售顾问名片
		return post('/Aicard/saler_card_detail', params)
	},
	getProjectList(params){//项目列表
		return post('/project/project_list', params)
	},	
	getLandlist(params){//土拍列表
		return post('/buss/landlist', params)
	},	
	getLandDetail(params){//土拍详情
		return post('/buss/landview', params)
	},
	getSalemanList(params){//所有销售顾问
		return post('/project/saler_list', params)
	},
	getSystemConfig(params){//获取单独配置项
		return post('/index/system_config', params)
	},
	identityAuth(params){//员工、经纪人认证
		return post('/user/user_role_applyedit', params)
	},
	getIdentityState(params){//员工、经纪人认证状态
		return post('/user/user_role_applystatus', params)
	},
	getAroundList(params){//项目周边
		return post('/weixin/get_lbs_address', params)
	},
	getHelplist(params){//im常见问题
		return post('/news/news_helplist', params)
	},
	getActivityList(params){//活动列表
		return post('/news/news_active_list', params)
	},
	getActivityDetail(params){//活动详情
		return post('/news/news_active_detail', params)
	},
	postVisitedit(params){//用户浏览记录
		return post('/user/user_page_visitedit', params)
	},
	getPosterUrl(params){//获取海报Url
		return post('/WeiXin/get_poster', params)
	},
	shareCallbackadd(params){//分享回调记录添加
		return post('/weixin/share_callbackadd', params)
	},
	getStoreList(params){//获取门店列表
		return post('/agent/agent_companylist', params)
	},
	getSystemSettings(params){//系统配置
		return post('/index/system_settings', params)
	},
	newsActiveSignUp(params){//活动报名
		return post('/news/news_active_sign_up', params)
	},
	uuidCheck(params){//uuid 检查
		return post('/index/uuid_check', params)
	},
	getCommentList(params){//获取项目评论
		return post('/news/project_commentlist', params)
	},
	commentAdd(params){//添加评论
		return post('/news/project_commentadd', params)
	},
	getProjectTags(params){//项目标签
		return post('/project/project_tags', params)
	},	
	sub_weixin_msg(params){//订阅消息成功
		return post('/index/sub_weixin_msg', params)
	},	
	has_valid_sub_weixin_msg(params){//是否订阅
		return post('/index/has_valid_sub_weixin_msg', params)
	},
}
export default {
	...main
}