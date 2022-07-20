import safety_router from './modules/safety_router.js';
import permission_router from './modules/permission_router.js'
import {check_login} from '../../utils/user.js'

const pages = {
	...safety_router,/* 需要登录才能访问的路由 */
	...permission_router,/* 需要权限才能访问的路由 */
	index:'/pages/home/index', //首页
	search:'/pages/home/search', //搜索
	login:"/pages/account/login",//登录
	bindUserInfo:"/pages/account/bindUserInfo",//绑定手机号
	web:"/pages/web/index",//webview params:[`path]
	map_list:"/pages/project_list/map_list",//map
	tupai_list:"/pages/project_list/tupai_list",//济南土拍
	tupai_details:"/pages/project_list/tupai_details",//济南土拍
	tejia_list:"/pages/project_list/tejia_list",//特价房源
	vr_list:"/pages/project_list/vr_list",//vr看房
	search_list:"/pages/project_list/search_list",//搜索楼盘
	jingpin_list:"/pages/project_list/jingpin_list",//精品推荐
	
	project_album:"/pages/project_detail/project_album",//更多图片
	project_saleman:"/pages/project_detail/project_saleman",//联系顾问
	project_info:"/pages/project_detail/project_info",//楼盘信息
	project_comment:"/pages/project_detail/project_comment",//楼盘评论
	project_peitao_map:"/pages/project_detail/project_peitao_map",//楼盘配套
	new_list:"/pagesA/news/new_list",//楼市资讯
	new_details:"/pagesA/news/new_details",//楼市资讯
	my_collection:"/pages/my/my_collection",//我的收藏
	my_history:"/pages/my/my_history",//我的浏览
	my_appointment:"/pages/my/my_appointment",//我的预约
	my_score:"/pages/my/my_score",//我的积分
	my_aboutus:"/pages/my/my_aboutus",//关于房e点
	my_yonghuxieyi:"/pages/my/my_yonghuxieyi",//用户服务协议
	my_mianzeshengming:"/pages/my/my_mianzeshengming",//免责声明
	my_yinsizengce:"/pages/my/my_yinsizengce",//隐私政策
	my_setting:"/pages/my/my_setting",//设置中心
	my_guanzhu:"/pages/my/my_guanzhu",//关注公众号
	my_zhaofang:"/pages/my/my_zhaofang",//帮我找房
	calculator:"/pages/calculator/index/index",//购房计算器
	activityList:"/pages/activity/index",
	activityDetail:"/pages/activity/detail",
	house_type_detail:"/pagesA/house_type/house_type_detail",
	sale_man_card:"/pagesA/saleman/sale_man_card",

	h5:"/pagesA/h5/index",
}

/**
 * 跳转封装 - 默认根据页面路径跳转
* @param {Object} url 路由地址
* @param {Object} type 跳转类型 1保留当前页面 2关闭当前页面 3关闭所有页面 4跳转到tabBar内置页面  5返回页面
* @param {Object} acg 跳转动画
* @param {Object} fun 跳转后执行方法
* @param {Object} last 跳转后 默认跳转后执行 改为false 执行完方法在执行跳转
*/
const goto_fun = (url,type,acg,fun,last) => {
	if (!last){//先执行函数,后执行跳转
		typeof fun === "function" ? fun() : false
		goto_fun(url,type,acg,fun,true)
		return
	}
	const obj = {url: url,animationType: acg}
	if (type === 1) uni.navigateTo(obj)
	if (type === 2) uni.redirectTo(obj)
	if (type === 3) uni.reLaunch(obj)
	if (type === 4) uni.switchTab(obj)
	if (last) typeof fun === "function" ? fun() : false
}
//根据配置的路由名字跳转
const gotoPage = (name,query = '',fun,type = 1,acg = 'pop-in',last = true) => {
	if(!pages[name])
	{
		console.error("未找到路由配置:" +name);
		return;
	}
	let router = pages[name],url = query != '' ? router + transParams(query) : router;
	if(safety_router[name] && !check_login()){
		gotoPage('login')
		return
	}
	goto_fun(url,type,acg,fun,last)
	
}
const transParams = (obj)=>{
		let params =   Object.keys(obj).map(function (key) {
	        return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
	    }).join("&");
		return  params ? '?'+params : ''
}

export {
	pages,
	gotoPage
}