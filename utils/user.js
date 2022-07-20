import store from '../common/vuex/index.js'

const check_login = ()=>{
	return store.getters.userId ? true :false
}
// const isBroker = ()=>{//是否经纪人根据登陆返回的reco_project_list数组判断
// 	return store.getters.reco_project_list.length ? true :false
// }
const isEmployee = ()=>{//是否员工/顾问根据登陆返回的sale_project_list数组判断
	return store.getters.salerId != 0
}
export {
	check_login,
	isEmployee,
	// isBroker
}