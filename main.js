import Vue from 'vue'
import App from './App'

import vuex from './common/vuex'
import {pages,gotoPage} from './common/router'
import prompt from 'utils/prompt.js'

import api from "utils/api/index.js"
import globalData from 'global/globalData.js'

Vue.prototype.$navTo = gotoPage
Vue.prototype.$pages = pages
Vue.prototype.$prompt = prompt
Vue.prototype.$api = api
Vue.prototype.$globalData = globalData

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.$store = vuex;
const app = new Vue({
	vuex,
    ...App
})
app.$mount()
