<template>
    <view class="login-container">
        <view class="bg-wrap"></view>
		<!-- #ifdef MP-WEIXIN -->
				<button v-if="userStatus==0" class="login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
					<text class="wxicon cuIcon cuIcon-weixin text-xxl"></text>微信授权登录
				</button>
				<button v-if="userStatus!=0" class="login-btn" @click="toLogin">
					<text class="wxicon cuIcon cuIcon-weixin text-xxl"></text>微信授权登录
				</button>
		<!-- #endif -->
		<!-- #ifdef MP-TOUTIAO -->
				<button v-if="userStatus==0" class="login-btn" @click="getUserInfo">
					<text class="wxicon cuIcon cuIcon-weixin text-xxl"></text>抖音授权登录
				</button>
				<button v-if="userStatus!=0"  class="login-btn" @click="toLogin">
					<text class="wxicon cuIcon  cuIcon-douyin text-xxl"></text>抖音授权登录
				</button>				

		<!-- #endif -->
        <view  class="login-btn cancel-btn" @click="back">暂不登录</view>
    </view>
</template>


<script>
	import utils from '../../utils/index.js'
	import {site_name,site_title,site_desc} from '../../global/config.js'
	export default {
		data(){
			return {
				session_key:"",
				userStatus:0,
				site_name:"",site_title:"",site_desc:"",
				userInfo:''
			}
		},
		onLoad() {
			this.initWxLogin();
			//console.log("settinmg",this.$store.getters.setting)
			this.site_name=this.$store.getters.setting.platform_name;
			this.site_title=site_title;
			this.site_desc=site_desc;
		},
		methods:{
			initWxLogin(){
				let that = this
				uni.login({
				  success (res) {
				    if (res.code) {
						// 发起网络请求
						console.log("code",res.code)
						that.$prompt.showLoadingMsg()
						that.$api.wxapi.wxLogin({code:res.code}).then(res=>{
							that.$prompt.hideToast()
							that.userInfo =  res.data
							that.userStatus = res.data.status
							if(that.userStatus == 0){
								that.session_key = res.data.session_key;
							}
						})
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				})
			},
			toLogin(){
				this.$store.dispatch('user/login',this.userInfo)

				uni.navigateBack()
			},
			getPhoneNumber(e){
				console.log(e);
				if(e.detail.errMsg != "getPhoneNumber:ok") return;
				let that  = this
				const params  = {
					encrypted_data : e.detail.encryptedData,
					session_key:that.session_key,
					iv:e.detail.iv
				}
				that.$api.wxapi.decryptData(params).then(res=>{
					let phoneNum = JSON.parse(res.data).purePhoneNumber
					let userId = that.userInfo.id
					that.$navTo('bindUserInfo',{phoneNum,userId},null,2)
				})
			},
			getUserInfo(){
				let that =this
				uni.getUserProfile({
					desc:"用户完善会员资料",
					withCredentials:true,
					success:(res)=>{
						if(res.rawData){
							console.log("res",res)
							let rawData = JSON.parse(res.rawData)
							let avatarUrl = rawData.avatarUrl
							let nickName = rawData.nickName
							let phoneNum = "";
								
							that.$prompt.showLoadingMsg()
							let params = {
								nick_name:nickName,
								mobile:phoneNum,
								avatar:avatarUrl,
								user_id:that.userInfo.id
							}
							if(uni.getStorageSync("reco_mobile")){
								params.reco_mobile = uni.getStorageSync("reco_mobile");
							}
							that.$api.wxapi.bindUserInfo(params).then(res=>{
								that.$prompt.hideToast()
								that.$store.dispatch('user/login',res.data)
								that.$prompt.showMsg('操作成功')
								setTimeout(()=>{
									uni.navigateBack()
								},1500)
							})
						}else{
							that.$prompt.showMsg('操作失败')
						}
					},
					fail: res=>{
						console.log("fail",res);
					}
				})
			},
			back(){
				// if(process.env.NODE_ENV === 'development'){
				// 	console.log(tempLoginInfo);
				// 	this.$store.dispatch('user/login',tempLoginInfo.data)
				// }
				uni.navigateBack()
			}
		},
		
	}
</script>

<style>
.login-container {
	width: 100vw;
	height: 100vh;
	background: #fff;
	box-sizing: border-box;
	padding-top: 1rpx;
	overflow: hidden;
	position: relative;
	background: url(../../static/login_img.png) no-repeat;
	background-size: 100% auto;
}

.login-container .login-btn {
	position: absolute;
	bottom: 245rpx;
	left: 0;
	right: 0;
	z-index: 31;
	margin: 0 auto;
	text-align: center;
	background: #25b07e;
	width: 500rpx;
	height: 88rpx;
	line-height: 88rpx;
	color: #fff;
	font-size: 34rpx;
	border-radius: 50rpx;
	font-weight: 400;

}

.login-container .login-btn .wxicon {
	margin-right: 10rpx;
}

.login-container .cancel-btn {
	background-color: transparent;
	font-size: 30rpx;
	border: none;
	color: #000000;
	bottom: 140rpx;
	opacity: 0.3;

}



</style>
