<template>
	<view class="h_section pd20">
		<view class="hs_title">
			<text>特价房源</text>
			<text></text>
		</view>
	
		<view class="h_tejia_box">
			<view class="ht_item" v-for="(item,index) in special_house_list.list" :key="item.id" v-if="index<=2 || room_expand">
				<view class="ht_item_info">
					<text>{{item.building_name}}# {{item.room_code}}</text>
					<text>{{item.house_type}} {{item.area}}m²</text>
				</view>
				<view class="ht_item_price">
					<text>{{item.total_price}}万</text>
					<text>￥{{item.avg_price}}/m²</text>
				</view>
			</view>
	
			
			<view class="ht_item_more" :class="{ht_item_more_expand:room_expand}" @click.stop="this.room_expand=!this.room_expand" v-if="special_house_list.list.length>2">
				<text>{{room_expand?"收起更多":"查看更多"}}</text>
			</view>
		</view>
	
	
	</view>
	
</template>

<script>
	export default {
		props: {
			special_house_list: {
				type: Object,
				default: {}
			},
			projectId: ''
		},
		data() {
			return {
				room_expand:false,
			}
		},
		watch: {},
		methods: {

		}
	}
</script>

<style>

</style>
