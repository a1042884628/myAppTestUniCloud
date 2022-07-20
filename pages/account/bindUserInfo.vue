<template>
	<view>
		<view class="cu-form-group margin-top-xs">
			<view class="title" @click="test">手机号</view>
			<input placeholder="请输入您的手机号" v-model="phoneNum" name="input" disabled="true"></input>
		</view>
		<view class="padding-xl">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="getUserInfo">确认</button>
		</view>
	</view>

</template>

<script>
	import utils from '../../utils/index.js'
	export default {
		data(){
			return {
				phoneNum:"",
				userId:""
			}
		},
		onLoad(options) {
			if(options.userId && options.phoneNum){
				this.phoneNum = options.phoneNum
				this.userId = options.userId
			}else{
				this.$prompt.showMsg('数据异常');
				setTimeout(()=>{
					uni.navigateBack();
				},1500)
			}
		},
		methods:{
			test(){
				console.log(utils.checkPh(this.phoneNum));
			},
			getUserInfo(){
				let that =this
				uni.getUserProfile({
					desc:"用户完善会员资料",
					success:(res)=>{
						if(res.rawData){
							let rawData = JSON.parse(res.rawData)
							let avatarUrl = rawData.avatarUrl
							let nickName = rawData.nickName
							let phoneNum = that.phoneNum;
							if(!utils.checkPh(phoneNum)) {
								that.$prompt.showMsg('请输入正确的手机号') 
								return
							}
							that.$prompt.showLoadingMsg()
							let params = {
								nick_name:nickName,
								mobile:phoneNum,
								avatar:avatarUrl,
								user_id:that.userId
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
			}
		}

	}
</script>

<style>
</style>
