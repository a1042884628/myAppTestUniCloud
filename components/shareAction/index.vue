<template>
	<view>
		<view v-if="isShowAction" @touchmove.stop.prevent="stopPrevent">
			<view class="mask">
				
			</view>
			<view class="mask-content">
				<view class="mask-content" @click.stop.prevent="stopPrevent">
					<scroll-view class="view-content" scroll-y>
						<view class="share-header">
							分享至
						</view>
						<view class="share-list">
							<button class="share-item no-border" open-type="share">
								<image src="@/static/wxmini.png" mode=""></image>
								<text>朋友</text>
							</button>
							<button class="share-item no-border" v-if="isShowPosterItem" @click.stop.prevent="showPosterModal">
								<image src="@/static/haibao.png" mode=""></image>
								<text>海报</text>
							</button>
						</view>
					</scroll-view>
					<view class="bottom b-t" @click.stop.prevent="isShowAction = false">取消</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="isShowModal?'show':''">
				<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">海报</view>
							<view style="width: 100%; text-align: right;margin-right: 15px;" @click="isShowModal = false">
								<text class="cuIcon-close"></text>
							</view>
						</view>
						<view style="overflow-y: scroll;">
							<view>
								<image :style="{height:imgHeight+'rpx'}" :src="posterUrl" mode="aspectFit"></image>
							</view>
							<view class="padding-xl">
								<button class="add-btn" @click="saveImg">保存至手机</button>
							</view>
						</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {check_login} from '../../utils/user.js'
    import {dateFormat,getQueryVariable} from '../../utils/index.js'
	export default{
		props:{
		},
		data(){
			return {
				isShowAction:false,
				isShowPosterItem:false,
				pageUrl:"",
				poster_type:"",
				posterUrl:"",
				isShowModal:false,
				imgHeight:0,
				currPageOptions:"",
				id:0,
			}
		},
		computed:{
			userId(){
				return this.$store.getters.userId
			}
		},
		watch:{
			userId(val) {
			  this.getPosterUrl()
			}
		},
		mounted() {
			this.caclHeight();
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			this.currPageOptions = currPage.options
			if(this.currPageOptions.scene){
				let paramsData = decodeURIComponent(this.currPageOptions.scene);
				let id = getQueryVariable(paramsData,"id");
				this.id = id;

			}else{
				this.id = this.currPageOptions.id;
			}
			
			let route = '/'+currPage.route;
			this.isShowPosterItem = true
			this.pageUrl = currPage.route
			switch (route){
				case  this.$pages['project_index']:
					this.poster_type = "项目"
					break;
				case  this.$pages['sale_man_card']:
					this.poster_type = "置业顾问"
					break;
				case  this.$pages['house_type_detail']:
					this.poster_type = "户型"
					break;
				default:
					break;
			}
			if(check_login()){
				this.getPosterUrl()
			}
		},
		methods:{
			caclHeight(){
				let that = this
				uni.getSystemInfo({
				       success: function (res) {
				        let clientHeight = res.windowHeight,
				        clientWidth = res.windowWidth,
				        rpxR = 750 / clientWidth;
				        var calc = clientHeight * rpxR - 400;
						that.imgHeight = calc
				       }
				    });
			},
			getPosterUrl(){
				let params = {
					user_id:this.$store.getters.userId,
					page:this.pageUrl,
					poster_type:this.poster_type,
					id:this.id
				}
				this.$api.main.getPosterUrl(params).then(res=>{
					this.posterUrl = res.data
					console.log(this.posterUrl)
				})
			},
			stopPrevent (){},
			showPosterModal(){
				console.log("111");
				if(check_login()){
					if(this.posterUrl){
						this.isShowModal = true
					}
				}else{
					this.$navTo('login')
				}
			},
			saveImg() {
				let that = this
				this.$prompt.showLoadingMsg('正在保存')
				uni.downloadFile({
					url: this.posterUrl,
					success: (res) => {
						if (res.statusCode === 200) {
							that.savePosterPath(res.tempFilePath);
						}
					},
					complete: (data) => {
						that.$prompt.hideToast()
					}
				})
			},
			
			savePosterPath(url){
				let that = this
				//获取用户的当前设置。获取相册权限
				uni.getSetting({
					success: (res) => {
						//如果没有相册权限
						if (!res.authSetting["scope.writePhotosAlbum"]) {
							//向用户发起授权请求
							uni.authorize({
								scope: "scope.writePhotosAlbum",
								success: () => {
									//授权成功保存图片到系统相册
									uni.saveImageToPhotosAlbum({
										//图片路径，不支持网络图片路径
										filePath: url,
										success: (res) => {
											that.$prompt.hideToast();
											that.$prompt.showMsg('保存成功')
										},
										fail: (res) => {
											that.$prompt.hideToast();
											console.log(res.errMsg);
											that.$prompt.showMsg('保存失败'+res.errMsg)
										},
										complete: (res) => {},
									});
								},
								//授权失败
								fail: () => {
									that.$prompt.hideToast();
									uni.showModal({
										title: "您已拒绝获取相册权限",
										content: "是否进入权限管理，调整授权？",
										success: (res) => {
											if (res.confirm) {
						//调起客户端小程序设置界面，返回用户设置的操作结果。（重新让用户授权）
												uni.openSetting({
													success: (res) => {
													console.log(res.authSetting);
													},
												});
											} else if (res.cancel) {
												that.$prompt.showMsg('已取消！')
											}
										},
									});
								},
							});
						} else {
							//如果已有相册权限，直接保存图片到系统相册
							uni.saveImageToPhotosAlbum({
								filePath: url,
								success: (res) => {
									that.$prompt.hideToast();
									that.$prompt.showMsg('保存成功')
								},
								fail: (res) => {
									console.log(res.errMsg);
									that.$prompt.hideToast();
									that.$prompt.showMsg('保存失败'+res.errMsg)
								},
								//无论成功失败都走的回调
								complete: (res) => {},
							});
						}
					},
					fail: (res) => {that.$prompt.hideToast();},
					complete: (res) => {},
				});
			}
		}
	}
</script>

<style lang="scss">
	.mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 400rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		z-index: 998;
		transition: .3s;
		background-color:#000000; 
		opacity:0.5; 
		-moz-opacity:0.5;
	

	}
	
	.mask-content {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 400upx;
		transition: .3s;
		background: #fff;
		z-index: 999;
		&.has-bottom {
			padding-bottom: 90upx;
		}
	
		.view-content {
			height: 100%;
		}
		.bottom {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 90upx;
			background: #fff;
			z-index: 9;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
		}
	}
	
	.share-header {
		height: 110upx;
		font-size: $font-base+2upx;
		color: font-color-dark;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 10upx;
	
		&:before,
		&:after {
			content: '';
			width: 240upx;
			heighg: 0;
			border-top: 1px solid $border-color-base;
			transform: scaleY(.5);
			margin-right: 30upx;
		}
	
		&:after {
			margin-left: 30upx;
			margin-right: 0;
		}
	}
	
	.share-list {
		display: flex;
		flex-wrap: wrap;
	}
	
	.share-item {
		min-width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 180upx;
	
		image {
			width: 80upx;
			height: 80upx;
			margin-bottom: 16upx;
		}
	
		text {
			font-size: $font-base;
			color: $font-color-base;
		}
	}
	
	.share-list button {
		background-color: #fff;
		border: 0px solid rgba(0, 0, 0, .2);
		margin: 0px;
		padding: 0px;
	}
	
	.share-list button :after {
	
		border: 0px solid rgba(0, 0, 0, .2) !important;
		margin: 0px;
		padding: 0px;
	}
	.add-btn {
	
		height: 80upx;
		margin: 0upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
