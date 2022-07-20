<template>
	<view class="container">
		<form>
			<view class="cu-form-group margin-top-sm">
				<view class="title">昵称</view>
				<text>{{nickname}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title">电话</view>
				<text>{{mobile}}</text>
			</view>
			<view class="cu-form-group"  @click="this.$navTo('my_yonghuxieyi')">
				<view class="title">用户服务协议</view>
				<view><text class="cuIcon-right"></text></view>
			</view>
			<view class="cu-form-group"  @click="this.$navTo('my_yinsizengce')">
				<view class="title">隐私协议</view>
				<view><text class="cuIcon-right"></text></view>
			</view>
			<view class="cu-form-group"  @click="this.$navTo('my_mianzeshengming')">
				<view class="title">免责声明</view>
				<view><text class="cuIcon-right"></text></view>
			</view>
			<view class="logout margin-top-lg" @click="logout">退出登录</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmployee:false,
				isBroker:false,
				agent_company_can_login:1,
				allow_pwd_login:1
			}
		},
		onLoad() {

		},
		onShow() {

		},
		computed:{
			nickname(){return this.$store.getters.nickname},
			mobile(){return this.$store.getters.mobile},
		},
		methods: {
			logout(){
				uni.showModal({
					title:"退出登录",
					content:"是否确认退出登录?",
					success:(res)=>{
						if(res.confirm){
							this.$store.dispatch('user/logout')
							uni.navigateBack()
						}
					}
				})
			},
			navTo(path){
				this.$navTo(path)
			},
			
			toWeb(){ 
				this.$navTo('web',{path:"index",openId:this.$store.getters.openId})
			},
			toArtcle(id){
				this.$navTo('web',{path:"articleDetail",id})
			}
		}
	}
</script>

<style lang="scss">
	.logout{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #007AFF;
		background-color: #FFFFFF;
	}
</style>
