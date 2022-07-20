import {post,get} from './base.js'
const im = {
	getChatRecordlist(params){ 
		return post('/news/chat_recordlist', params)
	},
	postChatRecord(params){
		return post('/news/chat_recordedit', params)
	},
	getContactsForSale(params){
		return post('/news/recent_userlist', params)
	},
	getContactsForUser(params){
		return post('/news/recent_salerlist', params)
	}
}
export default {
	...im
}