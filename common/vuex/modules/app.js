let uuidSetting=[];//{uuid:'',uuid_name:'',selected:0}
if(uni.getStorageSync("uuidSetting"))
{
	uuidSetting=JSON.parse(uni.getStorageSync("uuidSetting"));
}

const state = {
	pageCur: "clientHome",
	setting:"",
	uuidSetting:uuidSetting,
}

const mutations = {
	TOGGLE_FOOTBAR: (state, page) => {
		state.pageCur = page
	},
	SET_SETTING: (state, setting) => {
		state.setting = setting
	},
	SET_UUIDSETTING: (state, uuidSetting) => {
		state.uuidSetting = uuidSetting
		uni.setStorageSync("uuidSetting", JSON.stringify(uuidSetting))
	}
}
const actions = {
	setSetting({
		commit
	}, setting) {
		commit('SET_SETTING',setting)
	},
	setuuidSetting({
		commit
	}, uuidSetting) {
		commit('SET_UUIDSETTING',uuidSetting)
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
