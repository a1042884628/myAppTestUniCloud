<template>
	<view class="container">
		<view class="d-title">{{title}}</view>
		<view class="d-user">
		
			<view class="d-user-info">
				<view class="d-user-name">
					<text>{{add_date}}</text>
					<view style="display: inline-block;text-align: right;" class="d-user-introduce">阅读：{{views}}</view>
				</view>
				
			</view>
		</view>
		<view class="parseView" v-html="detailData">
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				id:"",
				detailData:"",
				title:"",
				add_date:"",
				views:""
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getNetData();
		},
		methods:{
			getNetData(){
				this.$api.article.getarticleDetail({id:this.id}).then(res=>{
					this.title = res.data.title
					this.add_date = res.data.add_date
					this.views = res.data.views
					const regex = new RegExp('<img', 'gi')
					this.detailData =res.data.cont.replace(regex, `<img style="max-width: 100%; height: auto"`);
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: $page-color-base;
		padding: 15upx 0 80upx 0;
		box-sizing: border-box;
		overflow: hidden;
	}
	.d-title {
		display: flex;
		flex-wrap: wrap;
		padding: 30upx 20upx;
		background: #ffffff;
		overflow: hidden;
		font-size: $font-lg;
		font-weight: bold;
		color: $font-color-dark;
	}
	.parseView {
		padding: 10upx 10upx;
	}
	.parseView  img{
		width:100%;
		height:200px;
	}
	.d-user {
		display: flex;
		padding: 20upx 20upx;
		background: #ffffff;
	
		border-bottom: 1px solid $border-color-light;
	}
	.d-user-head {
		width: 100upx;
		float: left;
		overflow: hidden;
		image {
			width: 80upx;
			height: 80upx;
			border-radius: 50px;
			flex-shrink: 0;
			margin-right: 10upx;
		}
	}
	.d-user-info {
		float: left;
		.d-user-name {
			font-size: $font-lg;
			color: $font-color-dark;
			text:nth-child(2) {
				padding: 0 10upx;
				background: #f6c159;
				font-size: $font-sm;
				margin-left: 15upx;
				color: #ffffff;
				border-radius: 10upx;
			}
		}
		.d-user-introduce {
			margin-left: 40rpx;
			font-size: $font-base;
			color: $font-color-light;
			margin-top: 5upx;
		}
	}
</style>
