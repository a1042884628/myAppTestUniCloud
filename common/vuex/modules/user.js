const state = {
	userId: 0,
	nickname: "",
	levelname: "",
	realName:"",
	mobile: "",
	avatar: "",
	openId:"",
	salerId:0,
	guid:'',
	token:"",
	reco_project_list: [],
	sale_project_list: [],
	money: 0.00,
	score: 0,
	reco_client_num: 0,
	un_read_num:0,
	saler_un_read_num:0
}
const mutations = {
	SET_Token: (state, token) => {
		state.token = token
	},
	REMOVE_TOKEN: (state) => {
		state.token = "";
	},
	SET_USER: (state, userInfo) => {
		state.userId = userInfo.id
		state.salerId = userInfo.saler_id
		state.nickname = userInfo.nick_name
		state.levelname = userInfo.level_name
		state.realName = userInfo.real_name
		state.mobile = userInfo.mobile
		state.avatar = userInfo.avatar
		state.openId = userInfo.open_id
		state.token = userInfo.token,
		state.guid = userInfo.guid,
		state.reco_project_list = userInfo.reco_project_list
		state.sale_project_list = userInfo.sale_project_list
		uni.setStorageSync("userInfo", JSON.stringify(userInfo))
		uni.setStorageSync("userGuid", userInfo.guid)
	},
	RESET_USER: (state) => {
		state.userId = 0
		state.salerId = 0
		state.nickname = "";
		state.levelname = '';
		state.realName ="",
		state.mobile = "";
		state.avatar = "";
		state.openId = "";
		state.token ="";
		state.guid ="";
		state.reco_project_list = [];
		state.sale_project_list = [];
		uni.removeStorageSync('userInfo')
	},
	SET_WALLET: (state, walletInfo) => {
		state.money = walletInfo.money;
		state.score = walletInfo.score;
		state.reco_client_num = walletInfo.reco_client_num;
		state.realName = walletInfo.real_name;
		state.un_read_num=walletInfo.un_read_num;
		state.saler_un_read_num=walletInfo.saler_un_read_num;
	},
	RESET_WALLET: (state) => {
		state.money = 0.00;
		state.score = 0;
		state.reco_client_num = 0
		state.realName=''
		state.un_read_num=0;
		state.saler_un_read_num=0;
	},
	SET_GUID: (state, guid) => {
		state.guid = guid;
		uni.setStorageSync("userGuid", guid)
	},
}
const actions = {
	login({
		commit
	}, userInfo) {
		// commit('SET_TOKEN',loginInfo.id)
		commit('SET_USER', userInfo)
	},
	logout({
		commit
	}) {
		// commit('REMOVE_TOKEN')
		commit('RESET_USER')
		commit('RESET_WALLET')
	},
	setWallet({
		commit
	}, walletInfo) {
		commit('SET_WALLET',walletInfo)
	},
	setGuid({
		commit
	}, guid) {
		commit('SET_GUID',guid)
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
