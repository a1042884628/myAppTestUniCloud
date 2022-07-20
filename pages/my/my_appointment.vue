<template>
    <view class="container">
        <scroll-view scrollY class="list-container" @scrolltolower="loadMore">
			<view class="order-containar">
				<empty v-if="dataList.length <= 0" :fixed="true" imgUrl="../../static/img_nodata.png"></empty>
				<view class="order-item" v-for="(item,index) in dataList" :key="item.id">
				    <view class="prop-item">
						<view class="title">预约项目：</view>
						<view class="content">
							{{item.project_name}}
						</view>
					</view>
<!-- 					<view class="prop-item">
						<view class="title">预约时间：</view>
						<view class="content">
							<view>{{item.visit_date}}  {{item.visit_time}}</view>
						</view>
					</view> -->
					<view class="prop-item">
						<view class="title">预约人数：</view>
						<view class="content">
							{{item.person_num}}
						</view>
					</view>
					<view class="prop-item">
						<view class="title">预约状态：</view>
						<view class="content">
							{{item.status_name}}
						</view>
					</view>
				</view>
			
			</view>

    
        </scroll-view>
    </view>
</template>

<script>
	import empty from '@/components/empty/empty.vue';  
	export default {
		components: {
			empty
		},
		data() {
			return {
				dataList:[]
			}
		},
		onLoad() {
			this.getNetData()
		},
		methods: {
			async getNetData(){
				let resData =  await this.$api.user.getMyAppointment({user_id:this.$store.getters.userId})
				this.dataList = resData.data
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #f5f5f5 !important;
	}
	.order-containar{
		padding: 20upx 30upx;
		background: #f5f5f5;
		box-sizing: border-box;
	}
	.order-item{
		width: 100%;
		background: #ffffff;
		border-radius: 20upx;
		margin-top: 30upx;
		padding: 30upx 0;
	}
	.prop-item{
		display: flex;
		padding: 10rpx 15rpx;
		width: 100%;
		box-sizing: border-box;
	}
	.prop-item .title{
		width: 25%;
		text-align: right;
		color: #999;
		font-size: 26rpx;
		line-height: 40upx;
	}
	.prop-item .content{
		flex: 1;
		font-size: 28rpx;
		line-height: 40rpx;
	}
</style>
