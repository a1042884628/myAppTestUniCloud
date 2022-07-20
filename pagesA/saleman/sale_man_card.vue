<template>
	<view>
		<view class="cardbox">
			<image class="cardBg" mode="widthFix" :src="dataContent.avatar"></image>
		</view>
		<view class="fixed-right-layer" @click.stop.prevent="toIm()">
			<view class="flex-layer">
				<view class="item">
					<view class="img">
						<image mode="aspectFit" src="/static/icon_zx.png"></image>
					</view>
					<view class="name">咨询</view>
					<!-- <text class="tips">111</text> -->
				</view>
			</view>
		</view>
		<view class="saleManInfo">
			<view class="nameItem">
				<view class="name" v-if="dataContent.real_name">{{dataContent.real_name}}</view>
				<view class="level">{{dataContent.job_name}}</view>
				<view class="flex" style="padding-top: 0;">
					<avatar-group :avatar="dataContent.stars"></avatar-group>
					<view class="look_nums"><span>{{dataContent.views}}人</span>浏览</view>
				</view>
				<view class="tags">
					<view class="titem" v-for="(tag,tagIndex) in dataContent.tags" :key="tag.name">
						{{tag.name}}
					</view>
				</view>
			</view>
			<view class="infoItem">
				<view class="label">电话</view>
				<view class="con">{{dataContent.telephone}}</view>
				<view class="opt">
					<button class="btn" @click="call(dataContent.telephone)">
						拨打
					</button>
				</view>
			</view>
			<view class="infoItem">
				<view class="label">微信号</view>
				<view class="con">{{dataContent.weixin_no}}</view>
				<view class="opt">
					<button v-if="wxQrcodeUrl" class="btn" @click="showWx()">
						查看
					</button>
					<button v-if="!wxQrcodeUrl" class="btn" @click="copyLink(dataContent.weixin_no)">
						复制
					</button>
					
					
				</view>
			</view>
			<view v-show="isOpenMore" >
				<view class="infoItem">
					<view class="label">邮箱</view>
					<view class="con">{{dataContent.email}}</view>
					<view class="opt">
						<button class="btn" @click="copyLink(dataContent.email)">
							复制
						</button>
					</view>
				</view>
				<view class="infoItem" >
					<view class="label">地址</view>
					<view class="con">{{dataContent.sale_address}}</view>
					<view class="opt">
						<button class="btn" @click="copyLink(dataContent.sale_address)">
							复制
						</button>
					</view>
				</view>
			</view>
			<view class="cardMore" @click="isOpenMore = !isOpenMore">
				{{isOpenMore?'收起':'点击查看更多信息'}}
				<text class="cuIcon" :class="'cuIcon-'+ (isOpenMore?'fold':'unfold')"></text>
			</view>
		</view>
		<view class="browseBox">
			<view class="shareBox">
				<button class="cu-btn lines-blue shadow btn" @click="showShare">分享名片</button>
				<button class="cu-btn  bg-blue shadow btn" @click="save2Contacts">存入手机通讯录</button>
			</view>
		</view>
		<share-action ref="shareAction"></share-action>

		<view class="list-container" v-if="dataContent.project_list.length">
			<view class="list-title">
				<text>我的推荐</text>
			</view>
			<property-item :estateList="dataContent.project_list"></property-item>
		</view>
		<view class="list-container" v-if="dataContent.video_list.length">
			<view class="list-title">
				<text>我的视频</text>
			</view>
			<view class="video-list">
				<video class="item" :src="item.goto_url" v-for="(item,index) in dataContent.video_list" :key="index"></video>
			</view>
		</view>
		<view class="list-container" v-if="dataContent.imgList.length">
			<view class="list-title">
				<text>我的图片</text>
			</view>
			<view class="img-list">
				<image @click="viewImage" mode="widthFix" class="item" :src="item" v-for="(item,index) in imgList" :key="index"
				 :data-url="imgList[index]"></image>
			</view>
		</view>
		<view class="list-container" style="margin-bottom: 30rpx;" v-if="dataContent.signature">
			<view class="list-title">
				<text>我的个人简介</text>
			</view>
			<view v-html="dataContent.signature" style="padding: 10rpx 0;font-size: 32rpx;"></view>
		</view>
		
		
		
		<!-- <view class="cu-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">扫一扫（{{dataContent.weixin_no}}）</view>
						<view style="width: 100%; text-align: right;margin-right: 15px;" @click="isShowModal = false">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view style="overflow-y: scroll;">
						<view>
							<image :style="{height:imgHeight+'rpx'}" :src="wxQrcodeUrl" mode="aspectFit"></image>
						</view>
						<view class="padding-xl">
							<button class="add-btn" @click="copyLink(dataContent.weixin_no)">复制微信号</button>
						</view>
					</view>
			</view>
		</view> -->
		<view class="cu-modal" :class="isShowModal?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end" style="background-color: rgb(248, 248, 248);">
					
					<view style="width: 100%; text-align: right;margin-right: 15px; transform: scale(1,0.75); font-size: 40upx; color: #999;" @click="isShowModal = false">
						X
					</view>
				</view>
				<view class="kefu_content">
					<image :src="wxQrcodeUrl"  show-menu-by-longpress mode="aspectFit"></image>
				</view>
				<view style="width: 100%;display: flex;align-items: center;margin: 10px;padding: 0 20px 20px;">
					<image style="width: 100px;height: 100px;" src="../../static/zhiwen.png" mode="widthFix"></image>
					<view style="font-size: 19px;color: #444444;margin-left: 10px;font-weight: 550;">
						<view style="float: left;">长按识别二维码</view>
						<view style="float: left;margin-top: 2px;">添加微信获取专享服务</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import avatarGroup from '@/components/avatarGroup/avatarGroup.vue'
	import propertyItem from '@/components/property/propertyItem.vue'
	import shareAction from '@/components/shareAction/index.vue'
	
	import {dateFormat,getQueryVariable} from '@/utils/index.js'
	import {check_login} from '@/utils/user.js'
	export default {
		components: {
			avatarGroup,
			propertyItem,
			shareAction
		},
		data() {
			return {
				id:0,
				isOpenMore: false,
				dataContent: "",
				imgList: [],
				isShowModal:false,
				imgHeight:0,
				wxQrcodeUrl:"",
				
			}
		},
		mounted() {
			this.caclHeight();
		},
		onLoad(options) {
			if(options.scene){
				let  paramsData = decodeURIComponent(options.scene);
				let id = getQueryVariable(paramsData,"id")
				let user_id = getQueryVariable(paramsData,"user_id")
				id && (this.id = id)
				this.getNetData()
				if(user_id){
					 uni.setStorageSync('reco_mobile', user_id);
				}
			}else{
				this.id = options.id
				this.getNetData()
				if(check_login()){
					this.postVisitedit();
				}
				if(options.reco_mobile){
					 uni.setStorageSync('reco_mobile', options.reco_mobile);
				}
			}
			
		},
		onShareAppMessage(res) {
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			let route = currPage.route+"?id="+this.id
			if(this.$store.getters.userId){
				route = route +"&userId="+this.$store.getters.userId;
			}
			if(check_login()){
				route += "&reco_mobile="+this.$store.getters.mobile;
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
				title: this.dataContent.real_name,
				path: route,
				imageUrl:this.dataContent.avatar
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
				title: this.dataContent.real_name,
				path: route,
				imageUrl:this.dataContent.avatar
			}
		},
		methods: {
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
			showWx(){
				this.isShowModal=true
			},
			async getNetData() {
				this.$prompt.showLoadingMsg()
				let resData = await this.$api.main.getSalemanDetail({
					saler_id: this.id
				})
				this.dataContent = resData.data
				console.log("this.dataContent",this.dataContent);
				this.wxQrcodeUrl = resData.data.weixin_picurl
				this.imgList = this.dataContent.pic_list.map(item => {
					return item.file_url
				})
				this.$prompt.hideToast()
			},
			postVisitedit(){
				this.$api.main.postVisitedit({
					open_id:this.$store.getters.openId,
					visit_time:dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss'),
					leave_time:dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss'),
					url:this.$pages['sale_man_card'],
					para:JSON.stringify({id:this.id}),
					agent:0
				})
			},
			toIm(){
				this.$navTo('chat2employee',{salerId:this.id,userId:this.$store.getters.userId,name:this.dataContent.real_name})
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			copyLink(data) {
				uni.setClipboardData({
					data: data,
					success: function() {
						// this.$prompt.showMsg('复制成功')
					}
				});
			},
			save2Contacts() {
				uni.addPhoneContact({
					firstName: this.dataContent.real_name,
					remark: this.dataContent.memo ? this.dataContent.memo : '',
					mobilePhoneNumber: this.dataContent.mobile,
					weChatNumber: this.dataContent.weixin_no,
					success: function() {
						console.log('success');
					},
					fail: function() {
						console.log('fail');
					}
				});
			},
			showShare() {
				this.$refs.shareAction.isShowAction = true
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			stopPrevent() {} //防止冒泡和滚动穿透
		}
	}
</script>

<style lang="scss">
	.fixed-right-layer {
		position: fixed;
		right: 20rpx;
		bottom: 150rpx;
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

	.cardMore {
		height: 60rpx;
		line-height: 60rpx;
		color: #8d8d8d;
		text-align: center;
		font-size: 24rpx;
	}


	.cardbox {
		width: 90%;
		margin: 40rpx auto;
		border-radius: 26rpx;
		box-shadow: 0 0 36rpx rgba(150, 150, 150, 0.4);
		position: relative;
		overflow: hidden;
		color: #333;
		font-size: 24rpx;
		z-index: 10;
	}

	.cardbox .cardBg {
		width: 100%;
		display: block;
	}

	.saleManInfo {
		font-size: 26rpx;
	}

	.saleManInfo .nameItem {
		width: 100%;
		margin: 20rpx 5%;

		.name {
			font-size: 36rpx;
		}

		.level {
			margin-top: 16rpx;
			margin-bottom: 24rpx;
			font-size: 30rpx;
		}

		.tags {
			padding: 15rpx 0;
			display: table;
		}

		.titem {
			font-size: 24rpx;
			padding: 0 14rpx;
			border-radius: 4rpx;
			text-align: center;
			margin: 0 8rpx 8rpx 0rpx;
			line-height: 44rpx;
			display: table;
			float: left;
			background: rgba(245, 247, 250, 1);
			color: rgba(147, 153, 165, 1);
		}
	}

	.saleManInfo .infoItem {
		width: 90%;
		display: flex;
		line-height: 42rpx;
		margin: 20rpx auto;
		box-sizing: border-box;
	}


	.saleManInfo .label {
		flex: 1;
		color: #8d8d8d;
		flex-shrink: 0;
	}

	.saleManInfo .con {
		flex: 4;
		color: #333;
		word-wrap: break-word;
		word-break: break-all;
	}

	.saleManInfo .opt {
		flex: 1;
		text-align: right;
	}

	.saleManInfo .opt .btn {
		color: #0081ff;
		border: solid 1px #0081ff;
		width: 90rpx;
		height: 54rpx;
		line-height: 50rpx;
		padding: 0;
		font-size: 28rpx;
	}

	.browseBox {
		width: 100%;
		padding: 0 5%;
		font-size: 28rpx;
	}

	.shareBox {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;
	}

	.shareBox .btn {
		width: 40%;
		height: 80rpx;
	}

	.list-container {
		border-top: solid 20rpx #f7f7f7;
		width: 100%;
		padding: 0 5%;

		.list-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 5px 0;

			text {
				color: #333;
				font-size: 38rpx;
				font-weight: 700;
			}
		}
	}

	.look_nums {
		display: flex;
		align-items: flex-end;

		span {
			color: #ff5772;
			font-weight: 600;
			font-size: 32rpx;
		}

		font-size: 26rpx;
	}

	.cu-avatar-group {
		padding: 0 10rpx 0 10rpx;
	}

	.video-list {
		width: 100%;

		.item {
			width: 100%;
			height: 420rpx;
			margin: 10rpx 0;
			border-radius: 20rpx;
		}
	}

	.img-list {
		width: 100%;

		.item {
			margin: 10rpx 0;
		}
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
