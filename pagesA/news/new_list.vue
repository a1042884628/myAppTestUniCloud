<template>
	<view class="container">
		<scroll-view class="news_list" scroll-y @scrolltolower="loadData">

			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>
			
			<view class="news_list_item" @click="navTo('new_details')">
				<view class="news_list_img">
					<image src="../../static/banner2.png" mode="widthFix"></image>
				</view>
				<view class="news_list_info">
					<view class="news_list_title">
						<text>多家银行加大住房按揭贷款投放规模,最快半天审批、一周放贷</text>
					</view>
					<view class="news_list_other">
						<text>1188人阅读</text>
						<text>2022-03-18</text>
					</view>
				</view>
			</view>



			<loadMore :status="loadingType"></loadMore>
		</scroll-view>


	</view>
</template>

<script>
	//import loadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		methods: {

			navTo(url, param) {
				this.$navTo(url, param);
			},
			dateFormat(datetime, fmt) {
				return this.$jsfun.dateFormat(new Date(datetime), fmt);
			}
		},


	}
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
		}

	.news_list {
		width: 100%;
		margin: 0 auto;
		margin-top: 10upx;
		background: #ffffff;
		border-radius: 15upx;
		overflow: hidden;
		box-sizing: border-box;
	}

	.news_list_item {
		width: 100%;
		display: flex;
		border-bottom: 2upx solid #f2f2f2;
		padding-bottom: 25upx;
		box-sizing: border-box;
		padding: 25upx;
	}

	.news_list_img {
		width: 200upx;
		height: 150upx;
		overflow: hidden;
		margin-right: 30upx;
		margin-top: 6upx;
		border-radius: 0;
	}

	.news_list_img image {
		width: 100%;
		height: auto;
	}

	.news_list_info {
		flex: 1;
	}

	.news_list_title {
		width: 100%;
		line-height: 1.5;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 35upx;
	}

	.news_list_other {
		width: 100%;
		margin-top: 20upx;
		font-size: 26upx;
		color: #bbbbbb;
	}

	.news_list_other text:nth-child(1) {
		display: block;
		float: left;
	}

	.news_list_other text:nth-child(2) {
		display: block;
		float: right;
	}
</style>
