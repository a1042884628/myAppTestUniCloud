<template>
	<view class="content">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center ">
					<view  v-for="(item,index) in tabArr" :key="index" class="cu-item flex-sub" :class="currentTab==index?'text-orange cur-sort':''" @click="currentTab = index">
						{{item.name}} ({{item.num}})</view>
			</view>
		</scroll-view>
		<view class="swiper">
			<swiper :current="currentTab" @change="swiperChange">
				<swiper-item class="vrList" v-if="vrData.length>0">
					<scroll-view class="swiper-item" scrollY="true">
						<view class="scroll-container">
							<view class="imgWrap" v-for="(item,index) in vrData" :key="index" @click="showVR(item)">
								<image class="micImg" lazyLoad="true" mode="aspectFill" :src="item.file_url"></image>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="videoList"  v-if="videoData.length>0">
					<scroll-view class="swiper-item" scrollY="true">
						<view class="scroll-container">
							<!-- <view class="imgWrap" v-for="(item,index) in videoData" :key="index" @click="showVideo(item)" >
								<view v-if="item.cata == '项目视频'" class="center-btn"><text class="cuIcon-videofill" style="font-size: 60rpx;"></text></view>
				               <image   class="micImg"   mode="aspectFill" :src="item.file_url"></image>
				            </view> -->
							<view class="imgWrap" v-for="(imgItem,imgIndex) in videoData" :key="imgItem.id"
								@click="viewImage($event,imgList2)" :data-url="imgItem.file_url">
								<image class="micImg" mode="aspectFill" :src="imgItem.file_url"></image>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="imgList"  v-if="imgCount>0">
					<scroll-view class="swiper-item" scrollY="true">
						<view class="scroll-container">
							<view class="imgContainer" v-for="(item,index) in imageData" :key="index">
								<view class="imgTitle" v-if="item.cont">{{item.cont}}</view>
								<view class="imgWrap" v-for="(imgItem,imgIndex) in item.image_list" :key="imgItem.id"
									@click="viewImage($event,imgList)" :data-url="imgItem.file_url">
									<image class="micImg" mode="aspectFill" :src="imgItem.file_url"></image>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<video v-show="isShowVideo" autoplay="true" @fullscreenchange="fullScreen" id="myVideo" :src="videoUrl"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				tabArr:[],
				currentTab: 0,
				vrData: [],
				videoData: [],
				imgCount: 0,
				imageData: [],
				imgList: [],
				imgList2: [], //规划图
				isShowVideo: false,
				videoUrl: "",
				videoContext: "",
				selectType:0,
			}
		},
		onLoad(options) {
			this.id = options.projectId
			this.selectType=options.selectType;
			
			
			
			this.getNetData()
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo');
		},
		methods: {
			getNetData() {
				this.$prompt.showLoadingMsg();
				this.$api.main.getProjectImgRes({
					project_id: this.id
				}).then(res => {
					this.$prompt.hideToast();
					this.vrData = res.data.vr
					this.videoData = res.data.video
					this.imageData = res.data.image
					if(this.vrData.length>0)
					{
						this.tabArr.push({name:"VR",num:this.vrData.length,index:1});
					}
					if(this.videoData.length>0)
					{
						this.tabArr.push({name:"规划图",num:this.videoData.length,index:2});
					}

					
					let imgCount = 0
					let imgList = []
					for (let index in this.imageData) {
						let item = this.imageData[index];
						imgCount += item.image_list.length
						for (let imgListIndex in item.image_list) {
							imgList.push(item.image_list[imgListIndex].file_url)
						}
					}
					this.imgList = imgList
					this.imgCount = imgCount
					
					if(this.imgCount>0)
					{
						this.tabArr.push({name:"图片",num:this.imgCount,index:3});
					}
					
					
					let imgList2 = [];
					for (let index in this.videoData) {
						imgList2.push(this.videoData[index].file_url)
					}
					this.imgList2 = imgList2;

					for (var i = 0; i < this.tabArr.length; i++) {
						if(this.tabArr[i].index==this.selectType)
						{
							this.currentTab =i;
							break;
						}
					}
				})
			},
			swiperChange(e) {
				this.currentTab = e.detail.current
			},
			viewImage(e, imgList) {
				uni.previewImage({
					urls: imgList,
					current: e.currentTarget.dataset.url
				});
			},
			fullScreen(e) {
				this.isShowVideo = e.detail.fullScreen;
			},
			showVideo(item) {
				console.log("das");
				this.videoUrl = item.goto_url
				this.videoContext.requestFullScreen();
				this.isShowVideo = true
			},
			showVR(item) {
				console.log("das");
				this.$navTo("h5", {
					url: item.goto_url
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		height: 100%;
	}

	.swiper {
		height: calc(100% - 90rpx);
	}

	.swiper>swiper {
		height: 100%;
	}

	.swiper-item {
		height: 100%;
		width: 100%;
	}

	.scroll-container {
		padding: 40rpx 40rpx;
		box-sizing: border-box;
	}

	.imgWrap {
		display: block;
		width: 48%;
		height: 220upx;
		float: left;
		margin-bottom: 30rpx;
		position: relative;
	}
	.imgWrap:nth-child(2n) {
		float: right;
	}

	.poster-imgWrap {
		width: 100%;
	}

	// .imgWrap:nth-child(2n-1) {
	// 	margin-right: 30rpx;
	// }

	// .imgContainer>.imgWrap:nth-child(2n-1) {
	// 	margin-left: 30rpx;
	// 	margin-right: 0rpx;
	// }

	.micImg {
		width: 100%;
		height: 100%;
	}

	.posterImg {
		width: 100%;
	}

	.imgTitle {
		height: 40rpx;
		font-size: 40rpx;
		font-weight: 500;
		color: rgba(25, 25, 62, 1);
		line-height: 40rpx;
		margin-bottom: 24rpx;
	}

	.center-btn {
		position: absolute;
		margin-left: 130rpx;
		margin-top: 88rpx;
		z-index: 99;

		image {
			height: 60rpx;
			width: 60rpx;
		}
	}
</style>
