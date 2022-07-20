<template>
<view class="h_section pd20">
			<view class="hs_title">
				<text>用户评论</text>
				<text></text>
			</view>

			<view class="h_pinglun_box">
				<view class="hpl_item" v-for="(item,index) in comment_list.list" :key="item.id">
					<view class="hpl_user">
						<view class="hpl_img">
							<image :src="item.avatar" mode="widthFix"></image>
						</view>
						<view class="hpl_name">
							<text>{{item.nick_name}}</text>
						</view>
					</view>
					<view class="hpl_content">
						<text>{{item.cont}}</text>
					</view>
					<view class="hpl_date">
						<text>{{item.add_date}}</text>
					</view>
				</view>

				<view class="hpl_item_more" @click="this.$navTo('project_comment',{project_id:projectId})">
					<text>查看更多评论</text>
				</view>
			</view>

		</view>

	
</template>

<script>
	export default {
		props: {
			comment_list: {
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

		}
	}
</script>

<style>

</style>
