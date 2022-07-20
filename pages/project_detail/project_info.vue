<template>
	<view class="container">
		<view class="content" v-for="(item,index) in floorInfo" :key="index">
			<view class="title">{{item.title}}</view>
			<view class="content-item" v-for="(contentItem,contentIndex) in item.list" :key="contentItem.name">
				<view class="content-name">{{contentItem.name}}：</view>
				<view class="content-info">{{contentItem.value}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:"",
				floorInfo:[]
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getNetData()
		},
		methods: {
			getNetData(){
				this.$api.main.getProjectBasicInfo({id:this.id}).then(res=>{
					this.floorInfo = res.data
				})
			}
		}
	}
</script>

<style>
	/* page {
		background: #f5f5f5 !important;
	} */
	.content{
		width: 100%;
		margin-top: 20upx;
		padding: 20upx 30upx; 
		background: #fff;
		overflow: hidden;
		border-top: 20upx solid #f6f6f6;
	}
	.title{
		padding: 20upx 0upx 15upx 0;
		color: #333333;
		font-size: 35upx;
		font-weight: bold;
		border-bottom: 2upx solid #f6f6f6;
		margin-bottom: 20upx;
	}
	.content-item{
		width: 100%;
		overflow: hidden;
		display: flex;
		font-size: 30rpx;
		line-height: 1.6;
		padding: 5upx 0;
	}
	.content-name{
		width: 25%;
		color: #999999;
	}
	.content-info {
		flex: 1;
		float: right;
	}
</style>
