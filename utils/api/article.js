import {post,get} from './base.js'
const article = {
	getarticleList(params){ 
		return post('/news/news_list', params)
	},
	geGuideCate(params){ 
		return post('/news/house_buy_news_cata', params)
	},
	getarticleDetail(params){
		return post('/index/news_detail', params)
	}
}
export default {
	...article
}