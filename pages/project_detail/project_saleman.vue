<template>
	<view class="h_section pd20">
		<view class="h_consultant_box">
			<view class="hc_item" v-for="(item,index) in saler_list" :key="item.id" @click="this.$navTo('sale_man_card',{id:item.id})">
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
		data() {
			return {
				id: "",
				saler_list: [],
			}
		},
		onLoad(options) {
			this.id = options.project_id;
			this.getNetData();

			console.log("onload")
		},
		watch: {},
		methods: {
			getNetData() {
				this.$api.main.getSalemanList({
					pageindex:1,
					pagesize:1000,
					project_id: this.id
				}).then(res => {
					this.saler_list = res.data.rows
					

					console.log("getNetData", this.saler_list)
				})
			},
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
