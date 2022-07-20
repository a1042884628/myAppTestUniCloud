<template>
	<view class="h_section pd20">
		<view class="h_section pd20">
			<view class="hs_title">
				<text>楼盘资讯</text>
				<text></text>
			</view>

			<view class="h_news">
				<view class="h_new_item" v-for="(item,index) in news_list.list" :key="item.id" @click="itemClick(item)">
					{{item.title}}
				</view>

			</view>


		</view>

	</view>
</template>

<script>
	export default {
		props: {
			news_list: {
				type: Object,
				default: {}
			},
			projectId: ''
		},
		data() {
			return {}
		},
		watch: {},
		methods: {
			itemClick(item) {
				
				console.log(item)
				if (item.goto_url) {

					let url = item.goto_url.toLowerCase();
					if (url.indexOf("http") >= 0) {
						this.$navTo('h5', {
							url: url
						})
					} else {
						uni.navigateTo({
							url: url
						})
					}
				}
			},
		}
	}
</script>

<style>

</style>
