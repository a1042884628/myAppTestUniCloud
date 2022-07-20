<template>
	<view class="container">
		<view class="list-content">
			<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadMore">
				<view class="activity-item" v-for="(item, index) in dataList" :key="index" @click.stop="toDetail(item)">
					<view class="title">{{item.title}}</view>
					<view class="time">{{item.start_date}} 至 {{item.end_date}}</view>
					<view class="img-c">
						<image :src="item.imgurl" mode="widthFix"></image>
					</view>
					<view class="introduce">{{item.summary}}</view>
					<view class="button">
						<button type="primary" @click.stop="toDetail(item)">查看详情</button>
					</view>
				</view>
				<load-more :status="loadingType"></load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import loadMore from '@/components/load-more/load-more.vue'
	export default {
		components: {
			loadMore
		},
		data() {
			return {
				loadingType: 'more', //加载更多状态
				loaded: false,
				dataList: [],
				pageindex: 1,
				pagesize: 20,
				total: 0
			};
		},
		onLoad(option) {
			this.getNetData();
		},
		methods: {
			toDetail(item) {
				this.$navTo('activityDetail', {
					id: item.id
				})
			},
			async getNetData() {
				this.loadingType = 'loading';
				let params = {
					pageindex: this.pageindex++,
					pagesize: this.pagesize,
					// company_id:getApp().globalData.company_id
				}
				let resData = await this.$api.main.getActivityList(params);
				this.total = resData.data.total;
				this.dataList = this.dataList.concat(resData.data.rows);
				this.loadingType = Math.ceil(this.total / this.pagesize) >= this.pageindex ? 'more' : 'nomore';
				this.loaded = true;
			},
			loadMore() {
				if (this.loadingType === "loading" || this.loadingType === 'nomore') {
					return
				}
				this.getNetData()
			}
		}
	};
</script>

<style lang="scss">
	.list-content {
		height: 100%;
		width: 100%;
	}


	.activity-section {
		margin-top: 20upx;
	}

	.activity-item {
		padding: 40upx $page-row-spacing;
		background: #ffffff;
		overflow: hidden;
		border-bottom: 1px solid #f6f6f6;

		.title {
			font-size: $font-lg + 5;
			color: $font-color-black;
		}

		.time {
			font-size: $font-base;
			color: $font-color-disabled;
			margin-top: 10upx;
		}

		.img-c {
			margin-top: 10upx;
			width: 100%;
			height: auto;

			image {
				width: 100%;
				height: auto;
				border-radius: 8upx;
			}
		}

		.introduce {
			font-size: $font-base;
			color: $font-color-base;
			margin-top: 10upx;
		}

		.button {
			margin-top: 20upx;

			text {
				width: 40%;
				float: left;
				font-size: $font-lg;
				color: $font-color-black;
				line-height: 60upx;
				text-decoration: underline;
			}

			button {
				width: 35%;
				height: 60upx;
				line-height: 60upx;
				color: #ffffff;
				background-image: -webkit-linear-gradient(#ff9c2a, #ffae51);
				background-image: linear-gradient(#ff9c2a, #ffae51);
				border-radius: 50upx;
				border: none;
				font-size: $font-lg;
				float: right;
			}

			button::after {
				border: 0;
			}
		}
	}
</style>
