<template>
	<view class="container">

		<header-banner :bannerDataList="banner_list" :projectId="id" :views_num="basicData.views"></header-banner>
		
		<view class="blank20"></view>
		
		<basic-info :basicData="basicData"  :projectId="id"></basic-info>
		
		<view class="h_blank" v-if="house_type.list.length>0"></view>
		
		<house-type :house_type="house_type" :projectId="id" v-if="house_type.list.length>0"></house-type>
		
		<view class="h_blank" v-if="saler_list.list.length>0"></view>

		<sale-man :saler_list="saler_list" :projectId="id" v-if="saler_list.list.length>0"></sale-man>


		<view class="h_blank" v-if="special_house_list.list.length>0"></view>

		<special-house :special_house_list="special_house_list" :projectId="id" v-if="special_house_list.list.length>0"></special-house>


		<view class="h_blank"></view>

		<around :basicData="basicData" :projectId="id"></around>


		<view class="h_blank"></view>

		<price-trend :price_list="price_list"  :projectId="id"></price-trend>

		<!--楼盘资讯-->
		<view class="h_blank" v-if="news_list.list.length>0"></view>
		<news-list :news_list="news_list"  :projectId="id" v-if="news_list.list.length>0"></news-list>
		
		<!--楼盘资讯-->
		
		
		

		<view class="h_blank" v-if="comment_list.list.length>0"></view>

		<comment :comment_list="comment_list"  :projectId="id" v-if="comment_list.list.length>0"></comment>


		<view class="h_bt_k"></view>


		<bottom :projectId="id" :isFavorite="isFavorite" :project_name="basicData.project_name"></bottom>



	</view>
</template>

<script>
	import headerBanner from './components/header-banner.vue'
	import basicInfo from './components/basic-info.vue'
	import houseType from './components/house-type.vue'
	import saleMan from './components/sale-man.vue'
	import specialHouse from './components/special-house.vue'
	import around from './components/around.vue'
	import priceTrend from './components/price-trend.vue'
	import comment from './components/comment.vue'
	import bottom from './components/bottom.vue'
	import newsList from './components/news-list.vue'
		
	import {dateFormat,getQueryVariable} from '../../utils/index.js'
	import {check_login} from '../../utils/user.js'
	export default {
		components: {
			headerBanner,
			basicInfo,
			houseType,
			saleMan,
			specialHouse,
			around,
			priceTrend,
			comment,
			bottom,
			newsList
			
		},
		data() {
			return {
				loading:true,
				id: "",
				isFavorite:0,
				banner_list: {},
				basicData:{},
				house_type:{},
				saler_list:{},
				special_house_list:{},
				price_list:{},
				comment_list:{},
				news_list:{}
			}
		},
		onLoad(options) {
			if(options.scene){
				let paramsData = decodeURIComponent(options.scene);
				
				let id = getQueryVariable(paramsData,"id");
				let user_id = getQueryVariable(paramsData,"user_id");
				this.id = id;
				console.log("scene",this.id)
				this.getBasicNetData();
				this.getExtraNetData();
				if(user_id){
					uni.setStorageSync('reco_mobile', user_id);
				}
			}else{
				this.id = options.id;
				this.getBasicNetData();
				this.getExtraNetData();
				if(check_login()){
					this.postVisitedit();
				}
				if(options.reco_mobile){
					uni.setStorageSync('reco_mobile', options.reco_mobile);
				}
			}
			console.log("onload")
		},
		onShareAppMessage(res) {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			let route = currPage.route+"?id="+this.id;
			if(check_login()){
				route += "&reco_mobile="+this.$store.getters.mobile;
			}
			if(this.$store.getters.userId){
				route = route  +"&userId="+this.$store.getters.userId;
			}
			
			return {
				title: this.basicData.project_name,
				path: route,
				imageUrl:this.basicData.picurl
			}
		},
		onShareTimeline(res) {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			let route = currPage.route+"?id="+this.id;
			if(check_login()){
				route += "&reco_mobile="+this.$store.getters.mobile;
			}
			if(this.$store.getters.userId){
				route = route +"&userId="+this.$store.getters.userId;
			}

			return {
				title: this.basicData.project_name,
				path: route,
				imageUrl:this.basicData.picurl
			}
		},
		methods: {
			getBasicNetData() {
				this.$prompt.showLoadingMsg()
				this.$api.main.getProjectBasicDetail({
					id: this.id,
					user_id: this.$store.getters.userId
				}).then(res => {
				
					this.$prompt.hideToast()
					this.banner_list=res.data.banner_list;
					this.initBasicData(res.data)
					this.isFavorite = res.data.is_favourate
					
					console.log("getBasicNetData",res)
				})
			},
			getExtraNetData() {
				this.$api.main.getProjectExtraDetail({
					id: this.id,
					user_id: this.$store.getters.userId
				}).then(res => {
					 this.house_type = res.data.house_type
					 this.saler_list = res.data.saler_list
					 this.comment_list = res.data.comment_list
					 this.special_house_list = res.data.room_list
					this.news_list=res.data.project_news_list
					this.price_list=res.data.price_list
					console.log("getExtraNetData",res)
				})
			},
			postVisitedit(){
				this.$api.main.postVisitedit({
					open_id:this.$store.getters.openId,
					visit_time:dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss'),
					leave_time:dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss'),
					url:this.$pages['project_index'],
					para:JSON.stringify({id:this.id}),
					agent:0
				})
			},

			initBasicData(data) {
				
				this.$api.main.getProjectBasicInfo({id:this.id}).then(res=>{
					let basicData = {}
					basicData = data.detail
					basicData.stars = data.stars
					basicData.tags = data.tags
					
					
					basicData.extendInfo = res.data
					
					this.basicData = basicData
				})
				
			},
			
		},
	}
</script>

<style>
.mask-content {
	z-index: 9991 !important;
}
</style>
