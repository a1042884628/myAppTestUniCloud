<template>
	<view class="container">
<!-- 		<view class="content-box">
			<view class="c-b-left">&yen;{{score}}</view>
		</view> -->
		<view class="f_title"><text>积分明细</text></view>
		<view class="detailed-list">
			<view class="detailed-box"
			v-for="(item, index) in dataList" :key="index"
			>
				<view class="detailed-t-t-n">
					<view class="detailed-title-time">
						<view class="detailed-title"><text>{{item.type}}</text></view>
						<view class="detailed-time"><text>{{item.createtime}}</text></view>
					</view>
					<view class="detailed-num " :class="[item.type == '收入' ? 'num-up' : 'num-down']"><text>{{item.score}}</text></view>
				</view>
				<view class="detailed-info"><text>{{item.memo}}</text></view>
			</view>
			<load-more :status="loadingType"></load-more>
		</view>

	</view>
</template>

<script>
// import loadMore from '@/components/loadMore/loadMore.vue'
// export default {
// 	components: {
// 		loadMore
// 	},
// 	data() {
// 		return {
// 			loadingType: 'more',
// 			pageindex: 1,
// 			pagesize: 20,
// 			total:0,
// 			dataList: [],
// 		};
// 	},
// 	onLoad() {
// 		this.getNetData();
// 	},
// 	computed:{
// 		score(){return this.$store.getters.score}
// 	},
// 	methods: {
// 		async getNetData() {
// 			this.loadingType = 'loading';
// 			const params = {
// 				pageindex:this.pageindex++,
// 				pagesize:this.pagesize,
// 				user_id:this.$store.getters.userId
// 			}
// 			let resData =  await this.$api.user.getUserScoreLogList(params);
// 			this.dataList = this.dataList.concat(resData.data.rows)
// 			this.total = resData.data.total;
// 			this.loadingType = Math.ceil(this.total / this.pagesize) >= this.pageindex ? 'more' : 'nomore';
// 		}
// 	},
// 	//加载更多
// 	onReachBottom(){
// 		this.getNetData();
// 	},
// };
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16upx;
}
.list-cell {
	display: flex;
	align-items: baseline;
	padding: 20upx $page-row-spacing;
	line-height: 60upx;
	position: relative;
	background: #fff;
	justify-content: center;
	&.log-out-btn {
		margin-top: 40upx;
		.cell-tit {
			color: $uni-color-primary;
			text-align: center;
			margin-right: 0;
		}
	}
	&.cell-hover {
		background: #fafafa;
	}
	&.b-b:after {
		left: 30upx;
	}
	&.m-t {
		margin-top: 16upx;
	}
	.cell-more {
		align-self: baseline;
		font-size: $font-lg;
		color: $font-color-light;
		margin-left: 10upx;
	}
	.cell-tit {
		flex: 1;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		margin-right: 10upx;
	}
	.cell-tip {
		font-size: $font-base;
		color: $font-color-light;
	}
	switch {
		transform: translateX(16upx) scale(0.84);
	}
}

.content-box {
	display: flex;
	align-items: baseline;
	padding: 40upx $page-row-spacing;
	overflow: hidden;
	background: #ffffff;
	border-bottom: 1px solid $border-color-light;
}
.c-b-left {
	flex: 2;
	line-height: 60upx;
	font-size: $font-lg-2;
	color: $font-color-dark;
}
.c-b-right {
	flex: 0.5;
}
.sm-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 170upx;
	height: 60upx;
	font-size: $font-base;
	color: #fff;
	background-color: $base-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}

.f_title {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20upx $page-row-spacing;
	font-size: $font-lg;
	color: $font-color-black;
	padding: 30upx 0;
}
.detailed-box {
	padding: 20upx $page-row-spacing;
	overflow: hidden;
	background: #ffffff;
	border-bottom: 1px solid $border-color-light;
}
.detailed-t-t-n {
	display: flex;
}
.detailed-title-time {
	flex: 2;
}
.detailed-title {
	font-size: $font-lg;
	color: $font-color-black;
}
.detailed-time {
	font-size: $font-sm;
	color: $font-color-light;
	margin-top: 6upx;
}
.detailed-num {
	flex: 1;
	text-align: right;
	font-size: $font-lg-2;
}
.clear {
	clear: both;
}
.detailed-info {
	display: flex;
	overflow: hidden;
	font-size: $font-lg;
	color: $font-color-base;
	margin-top: 15upx;
}
.num-up {
	color: $font-color-orange;
}
.num-down {
	color: $font-color-base;
}
</style>
