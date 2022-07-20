<template>
	<view class="container">
		<view class="cu-form-group">
			<view class="title">
				活动主题：
			</view>
			<view class="item_main">
				{{title}}
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">
				活动时间：
			</view>
			<view class="item_main">
				{{start_date}} - {{end_date}}
			</view>
		</view>
		<view style="width: 100%;height: 20upx;background-color: #F5F5F5;"></view>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action border-title">
				<text class="cuIcon-title"></text>
				<text class="" style="font-size: 34upx;">基本资料填写</text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">姓名</view>
			<view class="item_main"><input placeholder="请输入姓名" name="input" v-model="real_name"></input></view>
			
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<view class="item_main"><input placeholder="请输入手机号" type="phone" name="input" v-model="mobile"></input></view>
			
		</view>
		<view class="cu-form-group">
			<view class="title">报名人数</view>
			<view class="item_main"><input placeholder="请输入报名人数" type="number" name="input" v-model="person_num"></input></view>
			
		</view>
		
		<view class="cu-form-group align-start">
			<view class="title">备注</view>
			<view class="item_main"><textarea maxlength="-1"  @input="textareaBInput" placeholder="请填写备注"></textarea></view>
			
		</view>
		<view style="width: 100%;height: 20upx;background-color: #F5F5F5;"></view>
		<view class="padding flex flex-direction">
			<button class="cu-btn lg" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				end_date:"",
				start_date:"",
				title:"",
				real_name:"",
				mobile:"",
				person_num:"",
				memo:""
			}
		},
		onLoad(options) {
			let params = JSON.parse(options.params) 
			this.id =decodeURI(params.id) 
			this.end_date =decodeURI(params.end_date) 
			this.start_date =decodeURI(params.start_date) 
			this.title =decodeURI(params.title) 
		},
		methods:{
			textareaBInput(e){
				this.memo = e.detail.value
			},
			submit(){
				if(!this.real_name){
					this.$prompt.showMsg('请填写姓名');
					return
				}
				if(!this.mobile){
					this.$prompt.showMsg('请填写手机号');
					return
				}
				if(!this.person_num){
					this.$prompt.showMsg('请填写参加人数');
					return
				}
				if(!this.memo){
					this.$prompt.showMsg('请填写备注');
					return
				}
				let params = {
					user_id:this.$store.getters.userId,
					active_id:this.id,
					real_name:this.real_name,
					mobile:this.mobile,
					person_num:this.person_num,
					memo:this.memo,
				}
				this.$api.main.newsActiveSignUp(params).then(res=>{
					this.$prompt.showMsg('操作成功');
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.content{
		width: 100%;
		height: 100%;
	}
	.activity-title{
		width: 100%;
		line-height: 50upx;
		background-color: #FFFFFF;
		    padding: 0.5px 15px;
			    min-height: 50px;
				display: flex;
				align-items: center;
				font-size: 14px;
	}
	.cuIcon-title {
		color: #ff9c2a;
	}
	.cu-btn {
		color: #ffffff;
		background-image: -webkit-linear-gradient(#ff9c2a, #ffae51);
		background-image: linear-gradient(#ff9c2a, #ffae51);
	}
	.cu-form-group {
		width: 100%;
		display: flex;
	}
	.cu-form-group .title {
		width: 28%;
	}
	.cu-form-group .item_main {
		flex: 1;
	}
	.cu-bar {
		padding-top: 20upx;
		font-weight: bold;
		color: #000000;
	}
</style>
