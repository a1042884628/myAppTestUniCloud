<template>
	<view class="container">
		<view class="fixed-right-layer" v-show="showScrollBt">
		    <view class="flex-layer">
		        <view class="item">
		            <view class="img">
		                <image mode="aspectFit" src="../../static/image/card/icon_zx.png"></image>
		            </view>
		        </view>
		    </view>
		</view>
		<scroll-view id="scrollview" scroll-y="true" @scroll="scroll" @scrolltoupper="scrolltoupper" :scroll-top="scrollTop" class="tui-chat-content">
			<load-more  v-show="showLoading" :status="loadingType"></load-more>
			<view class="chat-box">
				<view v-for="(item,index) in dataList" :key="index">
					<view class="tui-chat-center" v-if="item.direction == 3">{{item.cont}}</view>
					<view class="tui-chat-left" v-else-if="item.direction == 1">
						<image :src="item.avatar1" class="tui-user-pic tui-right"></image>
				<view class="tui-chatbox tui-chatbox-left" v-if="item.msg_type=='文本'">{{item.cont}}</view>
				<view class="tui-chatbox tui-chatbox-left tui-chatbox-img" v-if="item.msg_type=='图片'"><image :src="item.cont" show-menu-by-longpress  @click="viewImage(item.cont)" mode="widthFix"></image></view>
				<view class="tui-chatbox tui-chatbox-left tui-chatbox-he" v-if="item.msg_type=='json'"  @click="this.$navTo('project_index',{id:item.cont.id})">
					<view class="tui_he_1"><image :src="item.cont.picurl" mode="widthFix"></image></view>
					<view class="tui_he_2">{{item.cont.project_name}}</view>
					<view class="tui_he_3">{{item.cont.price_about}}</view>
				</view>
					</view>
					<view class="tui-chat-right" v-else-if="item.direction == 2">
						<view class="tui-chatbox tui-chatbox-right" v-if="item.msg_type=='文本'">{{item.cont}}</view>
						<view class="tui-chatbox tui-chatbox-right tui-chatbox-img" v-if="item.msg_type=='图片'"><image :src="item.cont" show-menu-by-longpress  @click="viewImage(item.cont)" mode="widthFix"></image></view>
						<view class="tui-chatbox tui-chatbox-right tui-chatbox-he" v-if="item.msg_type=='json'">
							<view class="tui_he_1"><image :src="item.cont.picurl" mode="widthFix"></image></view>
							<view class="tui_he_2">{{item.cont.project_name}}</view>
							<view class="tui_he_3">{{item.cont.price_about}}</view>
						</view>
						<image :src="item.avatar2" class="tui-user-pic tui-left"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<t-chat-bar :projectId="projectId" @autoReply="autoReply" @sendMsg="sendMsg"></t-chat-bar>
	</view>
</template>

<script>
import tChatBar from '@/components/t-chat-bar/t-chat-bar';
import loadMore from '@/components/load-more/load-more.vue'
import {check_login,isEmployee} from '../../utils/user.js'
let interval;
export default {
	components: {
		tChatBar,
		loadMore,
	
	},
	data() {
		return {
			projectId:0,
			showLoading: false,
			loadingType:"loading",
			pagesize:15,
			user_id:0,
			saler_id:0,
			dataList:[],
			showScrollBt:false,
			scrollTop:0,
			scrollHeight:0,
			isEmployee:false
		};
	},
	computed:{
		
	},
	onShow() {
		this.isEmployee = isEmployee()
	},
	onLoad(options) {
		if(options.projectId){
			this.projectId = Number(options.projectId) 
		}
		this.user_id = options.userId
		this.saler_id = options.salerId
		this.getNetData('new')
		this.loopMsg();
		
		if(options.name){
			uni.setNavigationBarTitle({
				title:decodeURIComponent(options.name) 
			})
		}
	},
	methods: {
		viewImage(url) {
			let imgViewList=[];
			imgViewList.push(url);
			uni.previewImage({
				urls: imgViewList,
				current: url
			});
		},
		async getNetData(action){
			const params = {
				pagesize:this.pagesize,
				user_id:this.user_id,
				saler_id:this.saler_id,
				direction : 2,
			}
			if((action == 'new' || action == 'loop') && this.dataList.length > 0){
				let tmIndex;
				for(var i=this.dataList.length-1;i>=0;i--){
				    if(this.dataList[i].id){
						tmIndex = i
						break;
					}
				 }
				params.last_id = this.dataList[tmIndex].id
				params.is_new = 1
			}
			if((action == 'history') && this.dataList.length > 0){
				let tmIndex = this.dataList.findIndex(item=>{
					return item.id
				})
				params.last_id = this.dataList[tmIndex].id
				params.is_new = 0
			}
			let resData =  await this.$api.im.getChatRecordlist(params)
			if(action == 'history'){
				this.showLoading = false
				this.dataList.unshift(...resData.data.rows)
				this.scrollTop = this.scrollHeight
				
			}
			if(action == 'new'){
				this.dataList = this.dataList.concat(resData.data.rows) 
				this.$nextTick(function(){
					this.pageScrollToBottom();
				})
			}
			if(action == 'loop'){
				this.dataList = this.dataList.concat(resData.data.rows) 
			}
			if(resData.data.total - this.pagesize <= 0)  this.loadingType = 'nomore';
		},
		loopMsg(){
			interval  = setInterval(()=>{
				this.getNetData('loop')
			},5000)
		},
		async autoReply(e){
			let params  = {
				direction : 1,
				user_id:this.user_id,
				saler_id:this.saler_id,
				msg_type:"文本",
				cont:e.title
			}
			await this.$api.im.postChatRecord(params)
			params.direction = 2
			params.cont = e.reply
			await this.$api.im.postChatRecord(params)
			this.getNetData('new')
		},
		async sendMsg(type,content){
			if(type == 'text'){
				let params  = {
					direction : 1,
					user_id:this.user_id,
					saler_id:this.saler_id,
					msg_type:"文本",
					cont:content
				}
				params.direction = 2
				await this.$api.im.postChatRecord(params)
				this.getNetData('new');
			}
		},
		pageScrollToBottom () {
			let that =  this
			uni.createSelectorQuery().select('.chat-box').boundingClientRect(function (rect) {
				that.scrollTop = rect.height
			}).exec()
		},
		scrolltoupper(e){
			let  that = this
			if (!this.showLoading && this.loadingType != 'nomore') {
				uni.createSelectorQuery().select('.chat-box').boundingClientRect(function (rect) {
					that.scrollHeight = rect.height
					that.showLoading  = true
					that.getNetData('history')
				}).exec()

			}
		},
		scroll(e){
			this.scrollTop = e.detail.scrollTop
		},

	},
	// onPageScroll(e) {
	// 	if (e.scrollTop == 0  && !this.showLoading && this.loadingType != 'nomore') {
	// 		this.showLoading  = true
	// 		this.getNetData('history')
	// 	}
	// },
	onUnload(){
		clearInterval(interval)
	}

};
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color: #FFFFFF;
	}
	.container {
		height: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 146rpx;
		box-sizing: border-box;   
		background-color: #FFFFFF;
		
	}

/*chatbox*/
.tui-chat-content {
	position: relative;
	width: 100%;
	height: 100%;
}

.tui-chatbox {
	max-width: 66%;
	border-radius: 10rpx;
	position: relative;
	padding: 20rpx 22rpx;
	font-size: 32rpx;
	color: #333;
	word-break: break-all;
	word-wrap: break-word;
}

.tui-chatbox::before {
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	top: 20rpx;
	border: 16rpx solid;
}

.tui-chatbox-left {
	background: #fff;
	border: 1rpx solid #fff;
	display: inline-block;
}

.tui-chatbox-left::before {
	right: 100%;
	border-color: transparent #fff transparent transparent;
}

.tui-chatbox-right {
	background: #a0d5f3;
	border: 1rpx solid #a0d5f3;
}

.tui-chatbox-right::before {
	left: 100%;
	border-color: transparent transparent transparent #a0d5f3;
}

/*chatbox*/

.tui-chat-left,
.tui-chat-right {
	display: flex;
	align-items: flex-start;
	padding-top: 36rpx;
}

.tui-user-pic {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
	border-radius: 50%;
	display: block;
}

.tui-left {
	margin-left: 26rpx;
}

.tui-right {
	margin-right: 26rpx;
}

.tui-chat-right {
	justify-content: flex-end;
}

.tui-chat-center {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 28rpx;
	font-size: 28rpx;
	color: #666;
	padding-top: 36rpx;
}

.tui-label {
	display: inline-block;
	background: rgba(0, 0, 0, 0.4);
	color: #fff;
	font-size: 24rpx;
	line-height: 24rpx;
	margin-top: 36rpx;
	padding: 12rpx 16rpx;
	text-align: center;
	border-radius: 8rpx;
	margin-left: 50%;
	transform: translateX(-50%);
}

.tui-img-chatbox {
	position: relative;
}

.tui-img-chatbox::after {
	content: '';
	position: absolute;
	height: 200%;
	width: 200%;
	border: 1rpx solid #eaeef1;
	transform-origin: 0 0;
	-webkit-transform-origin: 0 0;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	left: 0;
	top: 0;
	border-radius: 20rpx;
}

.tui-chat-img {
	max-width: 200rpx;
	/* min-height: 80rpx; */
	display: block;
	border-radius: 10rpx;
}

.tui-chat-flex {
	display: flex;
	align-items: center;
}

.tui-flex-center {
	display: flex;
	align-items: center;
}

.tui-chat-voice {
	width: 40rpx;
	height: 40rpx;
	display: block;
	flex-shrink: 0;
}

.tui-rotate {
	transform: rotate(180deg);
}

.tui-chat-fail {
	width: 50rpx;
	height: 50rpx;
	display: block;
	flex-shrink: 0;
}

.tui-mr {
	margin-right: 16rpx;
}

.tui-ml {
	margin-left: 16rpx;
}

.tui-flex-end {
	justify-content: flex-end;
}

.tui-flex-reverse {
	flex-direction: row-reverse;
}

	.fixed-right-layer {
	    position: fixed;
	    right: 20rpx;
	    bottom: 230rpx;
	    z-index: 990;
	}
	
	.fixed-right-layer .flex-layer {
	    display: flex;
	    flex-direction: column;
	}
	
	.fixed-right-layer .flex-layer .item {
	    border: 1px solid #BCBCBC;
	    width: 100rpx;
	    height: 100rpx;
	    margin-bottom: 20rpx;
	    border-radius: 100%;
	    text-align: center;
	    background-color: #FFF;
	    position: relative;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    flex-direction: column;
	}
	
	.fixed-right-layer .flex-layer .item .img {
	    width: 45rpx;
	}
	
	.fixed-right-layer .flex-layer .item .img image {
	    width: 45rpx;
	    height: 45rpx;
	    margin-top: 15rpx;
	}
	
	.fixed-right-layer .flex-layer .item .name {
	    color: #888888;
	    font-size: 22rpx;
	    margin-top: -15rpx;
	}
	
	.fixed-right-layer .flex-layer .item .tips {
	    position: absolute;
	    top: -16rpx;
	    right: 0rpx;
	    font-size: 27rpx;
	    color: #fff;
	    background-color: #ff5653;
	    z-index: 11;
	    border-radius: 50rpx;
	    padding: 0 3rpx;
	    min-width: 37rpx;
	    height: 37rpx;
	    text-align: center;
	}
</style>
