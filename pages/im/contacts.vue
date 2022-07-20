<template>
	<view class="cu-list menu-avatar">
		<empty v-if="dataList.length <= 0" :fixed="true" imgUrl="/static/img_nodata.png"></empty>
		<view class="cu-item" v-for="(item,index) in dataList" :key="index" @click="toChat(item)">
			<view class="cu-avatar round lg" :style="{backgroundImage:'url('+item.avatar+')'}">
				<text class="red_num" v-if="item.un_read_num>0">{{item.un_read_num}}</text>
			</view>
			<view class="content">
				<view class="text-grey" v-if="type == 1">{{item.saler_name}}</view>
				<view class="text-grey" v-if="type == 2">{{item.user_name}}</view>
				<view class="text-gray text-sm flex">
					<view class="text-cut">
						{{item.last_cont}}
					</view> </view>
			</view>
			<view class="action">
				<view class="text-grey text-xs">{{item.last_time}}</view>
				<!-- <view class="cu-tag round bg-grey sm">5</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {check_login,isEmployee} from '../../utils/user.js'
	import empty from '@/components/empty/empty.vue';  
	export default{
		components: {
			empty
		},
		data(){
			return {
				isEmployee:false,
				dataList:[],
				type:0
			}
		},
		onShow() {
			this.isEmployee = isEmployee();
			this.getContacts()
		},
		onLoad(options) {
			 this.type = options.type
		},
		methods:{
			async getContacts(){
				let resData ;
				let params = {}
				if(this.type == 1){
					params.user_id = this.$store.getters.userId
					resData  =  await this.$api.im.getContactsForUser(params)
				}else{
					params.saler_id = this.$store.getters.salerId
					resData  =  await this.$api.im.getContactsForSale(params)
				}
				this.dataList = resData.data;
			},
			toChat(item){
				if(this.type  == '1'){
					this.$navTo('chat2employee',{userId:this.$store.getters.userId,salerId:item.saler_id,name:item.saler_name})
				}else{
					this.$navTo('chat2user',{userId:item.user_id,salerId:this.$store.getters.salerId,name:item.user_name}) 
				}
			}
		}
	}
</script>

<style>
	.cu-avatar {
		position: relative;
	}
	.red_num {
		display: block;
		width: 36upx;
		height: 36upx;
		float: right;
		background: #ff1e00;
		border-radius: 30upx;
		line-height: 36upx;
		color: #ffffff;
		font-size: 20upx;
		text-align: center;
		position: absolute;
		right: -8upx;
		top: -8upx;
	}
</style>
