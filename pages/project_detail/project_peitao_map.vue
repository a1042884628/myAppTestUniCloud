<template>
	<view class="map-content-layer">
		<view class="map-layer">
			<map  id="map" ref="map" class="map-info" @markertap="markertap"  :latitude="latitude" :longitude="longitude" scale="15" :markers="markers"></map>
		</view>
		<view class="head">
			<view class="address">
				<view class="name">{{name}}</view>
				<!-- <view class="info">22222</view> -->
			</view>
			<cover-view class="go-address" @click="gotoAddress">
				<cover-view class="icon">
					<cover-image mode="aspectFit" src="/static/goaddress.png"></cover-image>
				</cover-view>
				<cover-view>到这去</cover-view>
			</cover-view>
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: activiIndex == index }"
				 @click="tabClick(index)">{{ item.text }}</view>
			</view>
		</view>
		<swiper :current="activiIndex" class="swiper-box"  duration="300" @change="changeTab">
			<swiper-item  v-for="(tabItem, tabIndex) in navList" :key="tabIndex">
				<scroll-view class="address-list"  scrollY="true" :scroll-top="scrollTop">
				    <view  class="item" :class="tabItem.selectedIndex == index ? 'action':''" v-for="(item,index) in tabItem.dataList" :key="item.id" @click="addressItemTab(index)">
				        <view class="index">{{index + 1}}</view>
				        <view class="poi-name">{{item.title}}</view>
				    </view>
				</scroll-view>
			</swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				activiIndex:0,
				latitude:0,
				longitude:0,
				name:"",
				navList: [{
					text:"交通",
					dataList:[],
					markers:[],
					loaded:false,
					selectedIndex:-1
				},{
					text:"教育",
					dataList:[],
					markers:[],
					loaded:false,
					selectedIndex:-1
				},{
					text:"医疗",
					dataList:[],
					markers:[],
					loaded:false,
					selectedIndex:-1
				},{
					text:"商业",
					dataList:[],
					markers:[],
					loaded:false,
					selectedIndex:-1
				}],
				markers:[],
				scrollTop:0,
				map:''
			}
		},
		onLoad(options) {
			this.map = uni.createMapContext("map", this);
			this.id = options.id;
			this.latitude = options.latitude;
			this.longitude = options.longitude;
			if(options.activiIndex){
				this.activiIndex = options.activiIndex;
			}
			if(options.name){
				this.name = decodeURIComponent(options.name);
			}
			this.getNetData();
		},
		methods: {
			async getNetData(){
				console.log(this.navList);
				if(this.navList[this.activiIndex].loaded){
					this.markers = this.navList[this.activiIndex].markers
					return;
				} 
				this.$prompt.showLoadingMsg()	
				let params = {
					project_id:this.id,
					key_word:this.navList[this.activiIndex].text
				}
				let resData = await this.$api.main.getAroundList(params);
				this.navList[this.activiIndex].dataList = resData.data
				let markers = []
				markers.push({
					 id:0,
					latitude:this.latitude,
					longitude:this.longitude,
					iconPath:'',
					width:30,
					height:35,
					callout:{
						content: this.name,
						borderRadius: 20,
						borderWidth: 1,
						borderColor: "#fff",
						bgColor: '#038cff',
						padding: 10,
						display: "ALWAYS",
						textAlign: "center"
					}
				})
				for(let index in resData.data){
					let item =  resData.data[index]
					markers.push({
						id:Number(item.id),
						latitude:item.location.lat,
						longitude:item.location.lng,
						iconPath:'',
						"aria-label":item.title,
						width:30,
						height:35,
						// title:item.title,
						// callout:{
						// 	content: item.title,
						// 	borderRadius: 10,
						// 	borderWidth: 1,
						// 	borderColor: "#fff",
						// 	bgColor: "#fff",
						// 	padding: 5,
						// 	display: "ALWAYS",
						// 	textAlign: "center"
						// }
					})
				}
				this.markers = markers
				this.navList[this.activiIndex].markers = markers
				this.navList[this.activiIndex].loaded = true
				this.$prompt.hideToast()	
			},
			tabClick(index) {
				this.activiIndex = index
				this.getNetData()
			},
			changeTab(e) {
				this.activiIndex = e.target.current;
				this.getNetData()
			},
			addressItemTab(index){
				this.navList[this.activiIndex].selectedIndex = index
				this.showCallout(index+1,true);
				
			},
			markertap(e){
				let tempIndex = this.navList[this.activiIndex].markers.findIndex((item)=>{
					return item.id == e.detail.markerId
				})
				
				this.navList[this.activiIndex].selectedIndex = tempIndex - 1
				let itemPX = 100 / 750 * uni.getSystemInfoSync().windowWidth;
				this.scrollTop = itemPX * (tempIndex - 1)
				
				this.showCallout(tempIndex);
			},
			
			showCallout(index,move=false)
			{
				for (var i = 1; i < this.markers.length; i++) {
					delete this.markers[i].callout;
					if(i==index)
					{
						this.markers[i].callout={
							content: this.markers[i]["aria-label"],
							borderRadius: 10,
							borderWidth: 1,
							borderColor: "#fff",
							bgColor: "#fff",
							padding: 5,
							display: "ALWAYS",
							textAlign: "center"
						};
						if(move)
						{
							this.map.moveToLocation({
								latitude:this.markers[i].latitude,
								longitude:this.markers[i].longitude	
							});
							// this.latitude=this.markers[i].latitude;
							// this.longitude=this.markers[i].longitude;							
						}

					}
				}
			},
			gotoAddress(){
				let params ={
					scale:13
				}
				let currIndex = this.navList[this.activiIndex].selectedIndex
				if( currIndex != -1){
					let item = this.navList[this.activiIndex].dataList[currIndex]
					params.latitude = Number(item.location.lat) 
					params.longitude =Number(item.location.lng) 
					params.name = item.title
				}else{
					params.latitude = Number(this.latitude)
					params.longitude =Number(this.longitude) 
					params.name = this.name
				}
				uni.openLocation(params);
			}
		}
	}
</script>

<style lang="scss">
	.map-content-layer {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.map-content-layer .map-layer {
		width: 100%;
		height: 600rpx;
		flex: 1;
		display: block;
	}

	.map-content-layer .map-layer map {
		width: 100%;
		height: 600rpx;
	}

	.head {
		position: relative;
		width: 100%;
		background-color: #FFF;
		flex: 1;
		box-shadow: 0 2px 4px 2px #F6F6F6;
		display: table;
	}

	.head .go-address {
		position: absolute;
		top: -50rpx;
		right: 50rpx;
		width: 140rpx;
		height: 140rpx;
		display: block;
		background-color: #4399fc;
		color: #FFF;
		border-radius: 100%;
		font-size: 24rpx;
		text-align: center;
		z-index: 999;
	}

	.head .go-address .icon {
		width: 50rpx;
		height: 50rpx;
		border-radius: 100%;
		background-color: #FFF;
		text-align: center;
		margin: 30rpx auto 15rpx;
		display: flex;
		align-items: center;
	}

	.head .go-address .icon cover-image {
		width: 30rpx;
		height: 30rpx;
		margin: 0 auto;
	}

	.head .address {
		width: 90%;
		height: 100rpx;
		margin-left: 5%;
	}

	.head .address .name {
		font-size: 38rpx;
		font-weight: bold;
		padding: 10rpx 0;
	}

	.head .address .info {
		font-size: 26rpx;
		color: #9F9F9F;
		height: 40rpx;
		overflow: hidden;
	}

	.head .tab-layer {
		width: 100%;
		padding-top: 20rpx;
		display: table;
	}

	.head .tab-layer .li {
		width: 25%;
		float: left;
		text-align: center;
		font-size: 28rpx;
		position: relative;
		height: 60rpx;
	}

	.head .tab-layer .li.action {
		color: #4399fc;
		font-weight: bold;
	}

	.head .tab-layer .li.action:before {
		content: '';
		border: 3rpx solid #4399fc;
		width: 30rpx;
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		margin-left: -15rpx;
	}

	.address-list {
		height: 100%;
		overflow-y: scroll;
		-webkit-tap-highlight-color: rgba(0, 0, 0, .5);
		-webkit-overflow-scrolling: touch;
		flex: 2;
	}

	.address-list .item {
		width: 100%;
		color: #878787;
		height: 100rpx;
		align-items: center;
		font-size: 28rpx;
		display: flex;
		padding-left: 5%;
		position: relative;
		background-color: #FFFFFF;
	}

	.address-list .item:after {
		content: '';
		border-bottom: 1px solid #F6F6F6;
		left: 5%;
		width: 95%;
		bottom: 0;
		position: absolute;
	}

	.address-list .item.action {
		background-color: #4399fc;
		color: #FFF;
	}

	.address-list .item.action:after {
		border-bottom: 1px solid #4399fc;
	}

	.address-list .item.action .index {
		border: 1px solid #F3F3F3;
		background-color: #4399fc;
		color: #FFF;
	}

	.address-list .item .index {
		background-color: #F3F3F3;
		color: #A1A1A1;
		text-align: center;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 100%;
		margin-right: 10rpx;
		font-size: 20rpx;
		border: 1px solid #F3F3F3;
		float: left;
	}

	.navbar {
		display: flex;
		height: 80rpx;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: #d9603e;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid #d9603e;
				}
			}
		}
	}
	.swiper-box{
		height: calc(100% - (600rpx + 100rpx + 80rpx));
	}
</style>
