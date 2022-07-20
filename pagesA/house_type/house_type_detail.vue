<template>
	<view>
		<view class="banner-box border-box">
			<swiper :autoplay="autoplay" @change="handleSwiperChange" circular="false" class="swiper-box border-box" :duration="swiperDuration" :interval="swiperInterval">
				<swiper-item v-for="(item,index) in bannerData"  :key="index" @click="viewImage"  :data-url="item.file_url">
					<image  class="swiper-img border-box"  lazyLoad="true" mode="aspectFit" :src="item.file_url"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="body-layer">
			<view class="content-layer">
				<view class="info">
					<view class="name">
					{{detail.name}}
					<view style="float: right;" @click="doFavorite"><image style="width: 50rpx; height: 50rpx;margin-left: 10rpx;" :src="favorite?'/static/favorite-s.png':'/static/favorite.png'  "></image></view>
					<view style="float: right;" @click="showShare"><image style="width: 50rpx; height: 50rpx;" src="/static/bottom-share.png"></image></view>
					</view>
					<view class="tags" v-if="detail.tags">
						<view class="itag" v-for="(item,index) in detail.tags" :key="index">{{item.name}}</view>
					</view>
					<view class="price" v-if="detail.price_about">
						<view class="left-price">
							<view class="price-join">{{detail.price_about}}元/m²</view>
							<view class="price-key">参考均价</view>
						</view>
					</view>
				</view>
				<view class="info moreinfo">
					<view class="area">
						<span>建筑面积</span>{{detail.area}}㎡</view>
					<!-- <view class="tnarea">
						<span>套内面积</span>22222</view> -->
				</view>
				<view class="description-info" v-if="detail.about">
					<view class="h1">户型解析</view>
					<view class="rich">
						{{detail.about}}
					</view>
				</view>
				<view class="recommend-huxing">
					<view class="h1">户型推荐</view>
					<view class="apartment-list">
			
						<view>
							<view  class="sc_h_type_item" v-for="(item,index) in detail.house_type_list" :key="item.id" @click="this.$navTo('house_type_detail',{id:item.id})">
							    <view class="sc_h_type_img">
							        <image alt class="image"  mode="aspectFit" :src="item.pic_url"></image>
							    </view>
							    <view class="sc_h_type_text">
							       <view class="sc_h_type_1">
							       	<text>{{item.name}}</text>
							       </view>
							       <view class="sc_h_type_2">
							       	<text>{{item.area}}m²</text>
							       	<text>{{item.towards}}</text>
							       </view>
							       <view class="sc_h_tags">
							           <text class="sc_h_itag" v-for="(tag,tagIndex) in item.tags" :key="tag.name">{{tag.name}}</text>
							       </view>
							       <view class="sc_h_type_3">
							       	<text>￥{{item.price_about}}/m²</text>
							       </view>
							    </view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-mask-layer"></view>
			</view>
		</view>
		<share-action ref="shareAction"></share-action>
	</view>
</template>

<script>
	import {check_login} from '@/utils/user.js'
	import shareAction from '@/components/shareAction/index.vue'
	import {getQueryVariable} from '../../utils/index.js'
	export default {
		components:{
			shareAction
		},
		data(){
			return {
				autoplay:true,
				swiperDuration:500,
				swiperInterval:5000,
				id:"",
				bannerData:[],
				detail:{
					name:"",
					price_about:"",
					area:"",
					about:""
					
				},
				favorite:0,
				imgList:[]
			}
		},
		onLoad(options){
			if(options.scene){
				this.id = getQueryVariable(decodeURIComponent(options.scene),'id' )
			}else{
				this.id= options.id;
			}
			this.getNetData()
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
			
			let _uuid="";
			let _uuidArr=this.$store.getters.uuidSetting;
			for (var i = 0; i < _uuidArr.length; i++) {
				if(_uuidArr[i].selected)
				{
					_uuid=_uuidArr[i].uuid;
				}
			}
			route = route  +"&uuid="+_uuid;
			return {
				title: this.detail.name,
				path: route,
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
				route = route  +"&userId="+this.$store.getters.userId;
			}
			
			let _uuid="";
			let _uuidArr=this.$store.getters.uuidSetting;
			for (var i = 0; i < _uuidArr.length; i++) {
				if(_uuidArr[i].selected)
				{
					_uuid=_uuidArr[i].uuid;
				}
			}
			route = route  +"&uuid="+_uuid;
			return {
				title: this.detail.name,
				path: route,
			}
		},
		methods:{
			showShare() {
				this.$refs.shareAction.isShowAction = true
			},
			getNetData(){
				this.$api.main.getApartmentDetail({id:this.id,user_id: this.$store.getters.userId}).then(res=>{
					this.bannerData = res.data.pic_list
					this.favorite = res.data.is_favourate
					this.detail = res.data
					let imgList = []
					for(let index in this.bannerData){
						imgList.push(this.bannerData[index].file_url)
					}
					this.imgList = imgList
				})
			},
			handleSwiperChange(e){
				
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			doFavorite(){	
				if(!check_login()){
					this.$navTo('login')
					return 
				}
				let params = {
					ty:'户型',
					user_id:this.$store.getters.userId,
					record_id:this.id,
					is_cancel:this.favorite
				}
				this.$api.user.favorite(params).then(res=>{
					if(this.favorite == 0){
						this.favorite = 1
					}else{
						this.favorite = 0
					}
				})
				
			}
		}
	}
</script>

<style>
	.border-box {
	    box-sizing: border-box;
	}
	
	.detail-margin {
	    margin-left: 40rpx;
	    margin-right: 40rpx;
	}
	
	.banner-box {
	    position: fixed;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 530rpx;
	    background: rgba(245,247,250,1);
	}
	
	.swiper-block {
	    position: relative;
	    width: 100%;
	    height: 530rpx;
	    z-index: -1;
	}
	
	.swiper-box {
	    width: 100%;
	    height: 100%;
	}
	
	.swiper-img {
	    width: 100%;
	    height: 100%;
	    padding: 0;
	    margin: 0;
	}
	
	.swiper-type {
	    position: absolute;
	    left: 0;
	    bottom: 68rpx;
	    display: flex;
	    justify-content: center;
	    width: 100%;
	}
	
	.swiper-bottom-btn-box,.swiper-dots {
	    position: absolute;
	    left: 50%;
	    bottom: 60rpx;
	    display: flex;
	    transform: translateX(-50%);
	}
	
	.swiper-dots-item {
	    width: 8rpx;
	    height: 8rpx;
	    margin-right: 12rpx;
	    background: rgba(255,255,255,0.6);
	    border-radius: 4px;
	    transition: width 0.2s;
	}
	
	.swiper-dots-item.active {
	    width: 24rpx;
	    background: rgba(255,255,255,1);
	}
	
	.swiper-dots-item:last-child {
	    margin-right: 0;
	}
	
	.swiper-center-btn {
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate(-50%,-50%);
	    width: 120rpx;
	    height: 120rpx;
	    background: rgba(0,0,0,0.3);
	    border: 1px solid rgba(255,255,255,1);
	    border-radius: 50%;
	    display: flex;
	}
	
	.swiper-center-img {
	    width: 48rpx;
	    height: 52rpx;
	}
	
	.swiper-label {
	    position: absolute;
	    left: 37rpx;
	    top: 128rpx;
	    font-size: 24rpx;
	    line-height: 33rpx;
	    padding: 6rpx 32rpx;
	    background: rgba(255,255,255,0.8);
	    border-radius: 22px;
	}
	
	.swiper-center-vedio {
	    justify-content: center;
	    align-items: center;
	}
	
	.swiper-center-panorama {
	    padding-top: 18rpx;
	    justify-content: center;
	}
	
	.swiper-btn {
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    color: #FFFFFF;
	    font-size: 22rpx;
	    width: 94rpx;
	    height: 46rpx;
	    background: rgba(0,0,0,0.3);
	    border-radius: 44rpx;
	    border: 1px solid rgba(255,255,255,0.5);
	}
	
	.swiper-btn.active {
	    color: #19193E;
	    background: rgba(255,255,255,0.8);
	    border: 1px solid transparent;
	}
	
	.swiper-btn.look-more {
	    position: absolute;
	    right: 20rpx;
	    bottom: 92rpx;
	}
	
	.swiper-bottom-btn-box {
	    bottom: 92rpx;
	}
	
	.swiper-bottom-btn-box .swiper-btn {
	    margin-right: 24rpx;
	    white-space: nowrap;
	}
	
	.swiper-bottom-btn-box .swiper-btn:last-child {
	    margin-right: 0;
	}
	
	.body-layer {
	    position: relative;
	    margin-top: 490rpx;
	    padding-top: 40rpx;
	    background: #fff;
	    border-radius: 40rpx 40rpx 0 0;
	    z-index: 2;
	    width: 100%;
	}
	
	.content-layer {
	    width: 90%;
	    margin-left: 5%;
	}
	
	.info .name {
	    color: #19193E;
	    font-weight: bold;
	    font-size: 42rpx;
	}
	
	.info .tags {
	    display: table;
	}
	
	.info .itag {
	    background: rgba(245,247,250,1);
	    border-radius: 4px;
	    margin: 10rpx 10rpx 10rpx 0;
	    float: left;
	    height: 50rpx;
	    line-height: 50rpx;
	    padding: 0 10rpx;
	    color: #9399A5;
	    font-size: 26rpx;
	}
	
	.info .price {
	    display: flex;
	    padding: 20rpx 0;
	}
	
	.info .left-price {
	    flex: 1;
	}
	
	.info .price-join {
	    color: #FF5772;
	    font-size: 40rpx;
	    font-weight: bold;
	}
	
	.info .price-key {
	    color: #66727F;
	    font-size: 24rpx;
	}
	
	.info .count {
	    color: #19193E;
	    text-align: center;
	    font-size: 24rpx;
	}
	
	.info .fhyfont {
	    color: #3D7EFF;
	    font-size: 40rpx;
	}
	
	.content-layer .info.moreinfo {
	    border-top: 1px solid rgba(239,239,239,1);
	    border-bottom: 1px solid rgba(239,239,239,1);
	    padding: 20rpx 0;
	    font-size: 35rpx;
	}
	
	.content-layer .info.moreinfo view {
	    height: 70rpx;
	    line-height: 70rpx;
	    display: flex;
	    color: #000;
	}
	
	.content-layer .info.moreinfo span {
	    color: #66727F;
	    min-width: 170rpx;
	    text-align: left;
	}
	
	.description-info .rich {
	    white-space: pre-line;
	    word-break: break-word;
	    color: #19193E;
	    font-size: 36rpx;
	    line-height: 60rpx;
	    width: 100%;
	}
	
	.recommend-huxing,.description-info {
	    padding-top: 40rpx;
	}
	
	.recommend-huxing .h1,.description-info .h1 {
	    padding-bottom: 20rpx;
	    color: #19193E;
	    font-weight: bold;
	    font-size: 40rpx;
	}
	
	.bottom-mask-layer {
	    width: 100%;
	    height: 100rpx;
	}
	
	.bottom-float-layer {
	    position: fixed;
	    width: 100%;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    background-color: #FFF;
	    z-index: 1000;
	}
	
	.bottom-float-layer .bottom-content {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    padding: 10rpx;
	}
	
	.bottom-float-layer .btn.icon {
	    padding: 0 30rpx;
	    text-align: center;
	}
	
	.bottom-float-layer .btn .tel-text {
	    font-size: 25rpx;
	    color: #333;
	    margin-top: -10rpx;
	}
	
	.bottom-float-layer .fhyfont {
	    font-size: 50rpx;
	}
	
	.bottom-float-layer .btn.text {
	    background-color: #00E293;
	    color: #FFF;
	    font-size: 32rpx;
	    border-radius: 10rpx;
	    text-align: center;
	    flex: 1;
	    height: 80rpx;
	    line-height: 80rpx;
	}
	
	.bottom-float-layer .btn.text.blue {
	    background-color: #3D7EFF;
	    margin-left: 20rpx;
	}
	
	
	.sc_h_type_item {
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding: 35upx 0;
		display: flex;
		border-bottom: 2upx solid #f2f2f2;
	}
	.sc_h_type_img {
		width: 230upx;
		height: 175upx;
		display: block;
		margin-right: 30upx;
		border-radius: 10upx;
		overflow: hidden;
		position:relative;
	
	}
	.sc_h_type_img image {
		width:100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10upx;
	}
	.sc_h_type_text {
		flex: 1;
		overflow: hidden;
	}
	.sc_h_type_1 {
		width: 100%;
		height: 40upx;
		font-size: 35upx;
		line-height: 46upx;
		font-weight: bold;
		overflow: hidden;
	}
	.sc_h_type_2 {
		width: 100%;
		overflow: hidden;
		color: #9399A5;
		font-size: 30upx;
		margin-top: 6upx;
	}
	.sc_h_type_2 text {
		margin-right: 20upx;
	}
	.sc_h_type_3 {
		width: 100%;
		overflow: hidden;
		color: #f34b1f;
		margin-top: 6upx;
	}
	.sc_h_tags {
	    display: table;
	}
	
	.sc_h_itag {
	    background: rgba(245,247,250,1);
	    border-radius: 10upx;
	    margin: 6upx 6upx 6upx 0;
	    float: left;
	    height: 40upx;
	    line-height: 40upx;
	    padding: 0 10upx;
	    color: #9399A5;
	    font-size: 22upx;
	}
</style>
