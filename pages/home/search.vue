<template>
	<view class="container">
		<view class="list_search">
			<view class="search_box">
				<input class="search_input" type="text" placeholder="输入搜索内容" v-model="key_word"/>
			</view>
			<view class="search_btn" @click="confirm">
				搜索
			</view>
		</view>
		
		
		<view class="search_history">
<!-- 			<view class="sh_empty">
				<text>清空</text>
			</view> -->
			<view class="sh_title">
				<text>历史搜索</text>
			</view>
			<view class="sh_nothing " v-if="searchKeyWordList.length==0">
				没有任何搜索记录
			</view>
			<view class="sh_list">
				<text v-for="(item,index) in searchKeyWordList" :key="item" @click="selectKeyWord(item.key_words)">{{item.key_words}}</text>
			</view>
		</view>
		
		
		<view class="search_hot">
			<view class="sh_change" @click="getProject()">
				<text>换一批</text>
			</view>
			<view class="sh_title">
				<text>热门搜索</text>
			</view>
			<view class="hot_s_list">
				<view class="hot_s_item" v-for="(item,index) in projectList" :key="item.id" @click="this.$navTo('project_index',{id:item.id})">
					<view class="hot_s_title">
						{{item.project_name}}
					</view>
					<view class="hot_s_tag">
						<text v-for="(tag,i) in item.tags" :key="tag">{{tag.name}}</text>
					</view>
					<view class="hot_s_location">
						<text>济南市{{item.region_name}}</text>
						<text>{{item.room_area_about}}m²</text>
					</view>
					<view class="hot_s_price">
						<text>￥{{item.price_about}}</text>
						<!-- <text>m²</text> -->
					</view>
				</view>
			
			
			</view>
		</view>	

	</view>
</template>

<script>
	import {
		webHost
	} from '../../global/config.js'
	export default {
		data() {
			return {
				key_word:'',
				projectList:[],
				searchKeyWordList:[]
			}
		},
		onLoad(options) {
			if(!this.$store.getters.guid)
			{
				this.$store.dispatch('user/setGuid', this.newguid());
			}
			
			this.getProject();
			this.getSearchKeyWords();
		},
		computed:{
		},

		methods: {
			confirm()
			{
				this.$navTo('search_list',{key_word:this.key_word})
			},
			selectKeyWord(keyword)
			{
				this.$navTo('search_list',{key_word:keyword})
			},
			getSearchKeyWords()
			{
				const params = {
					pageindex: 1,
					pagesize: 10,
					guid: this.$store.getters.guid,
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				this.$api.user.recent_search_key_words(params).then(resData => {
					this.searchKeyWordList = resData.data;	
				})
			},
			getProject() {
				const params = {
					pageindex: 1,
					pagesize: 4,
					channel: 'hot_search',
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				this.$api.main.getProjectList(params).then(resData => {
					this.projectList = resData.data.rows;
			
				})
			},
			newguid() {
			            return ('xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
			        }
		},		
		
	}
</script>

<style>
	.hot_s_item {
		width: 48%;
		float: left;
		box-shadow: 0 0 15upx rgba(0,0,0,0.1);
		margin-bottom: 30upx;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 25upx;
	}
	.hot_s_item:nth-child(2n) {
		float: right;
	}
	.hot_s_title {
		width: 100%;
	}
.hot_s_tag {
	width: 100%;
	height: 50upx;
	padding-top: 6upx;
	overflow: hidden;
}
.hot_s_tag text {
	display: inline-block;
	margin-right: 10upx;
	margin-bottom: 10upx;
	padding: 0 8upx;
	background: #f2f2f2;
	border-radius: 6upx;
	font-size: 20upx;
	height: 35upx;
	line-height: 35upx;
	color: #666666;
}


.hot_s_location {
	width: 100%;
	height: 40upx;
	overflow: hidden;
	color: #aaaaaa;
	font-size: 22upx;
	line-height: 30upx;
	margin-top: 6upx;
	display: flex;
}
.hot_s_location text {
	margin-right: 20upx;
	flex: 1;
}
.hot_s_location text:nth-child(2) {
	margin-right: 0;
	line-height: 30upx;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	flex: 1;
}

.hot_s_price {
	width: 100%;
	overflow: hidden;
	color: #f34b1f;
	margin-top: 5upx;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
.hot_s_price text:nth-child(1) {
	font-size: 30upx;
	
}
.hot_s_price text:nth-child(2) {
	font-size: 22upx;
}
</style>
