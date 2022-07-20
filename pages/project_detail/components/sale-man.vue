<template>
	<view class="h_section pd20">
		<view class="hs_title">
			<text>推荐置业顾问</text>
			<text></text>
		</view>
		<view class="h_consultant_box">
			<view class="hc_item" v-for="(item,index) in saler_list.list" :key="item.id" v-if="index<=2" @click="this.$navTo('sale_man_card',{id:item.id})">
				<view class="hc_img">
					<image :src="item.avatar" mode="widthFix"></image>
				</view>
				<view class="hc_info">
					<text>{{item.real_name}}</text>
					<text>金牌置业顾问</text>
				</view>
				<view class="hc_contact">
					<text class="hc_tel" @click.stop="tapPhone(item)" ></text>
					<text class="hc_online" @click.stop="tapChat(item)" ></text>
				</view>
			</view>
		</view>
	
	</view>
	
</template>

<script>
	export default {
		props: {
			saler_list: {
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
			tapPhone(item){
				uni.makePhoneCall({
				    phoneNumber: item.telephone
				});
			},
			tapChat(item){
				console.log(item);
				this.$navTo('chat2employee',{userId:this.$store.getters.userId,salerId:item.id,projectId:this.projectId,name:item.real_name})
			}
		}
	}
</script>

<style>

</style>
