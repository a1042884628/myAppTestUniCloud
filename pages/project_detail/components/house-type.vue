<template>
	<view class="h_section pd20">
		<view class="hs_title">
			<text>楼盘户型</text>
			<text></text>
		</view>
	
		<view class="h_type_tab">
			<view class="htt_item" v-for="(item,index) in roomNumArrs" :key="item" :class="{'on':item.room==selectRoom}" @click="roomTypeChange(item.room)"><text>{{item.room==-1?"":item.room}}{{item.room==-1?"全部":"室"}}({{item.num}})</text></view>
		</view>
		<view class="h_type_box">
			<scroll-view class="h_type_list border-box" scrollX="true">
	
				<view class="h_type_item" v-for="(item,index) in dataList" :key="item" @click="this.$navTo('house_type_detail',{id:item.id})">
					<view class="h_type_img">
						<image :src="item.pic_url" mode="widthFix"></image>
					</view>
					<view class="h_type_1">
						<text>{{item.name}}</text>
					</view>
					<view class="h_type_2">
						<text>{{item.area}}m²</text>
						<text>￥{{item.price_about}}/m²</text>
					</view>
				</view>
	
	
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			house_type: {
				type: Object,
				default: {}
			},
			projectId: ''
		},
		data() {
			return {
				selectRoom:-1,
				roomNumArrs:[],
				scrollleft:0,
				dataList:[]
			}
		},
		watch: {
			house_type:{
				handler(data,old)
				{
					console.log("house_type",data)
					let arr = [];
					let dataArr=[];
					arr.push({room:-1,num:this.house_type.list.length});
					for (var i = 0; i < this.house_type.list.length; i++) {
						let ty=this.house_type.list[i];
						let found=false;
						for (var j = 0; j < arr.length; j++) {
							if(arr[j].room==ty.room_count)
							{
								arr[j].num++;
								found=true;
							}
						}
						if(!found && ty.room_count)
						{
							arr.push({room:ty.room_count,num:1});
						}
						
						dataArr.push(ty);
					}
					
					arr.sort(function(a, b){return a.room - b.room}); 
					this.roomNumArrs = arr;
					this.dataList=dataArr;
					console.log("this.roomNumArrs",this.roomNumArrs)					
				},
				 immediate: true
				
				
			}
		},
		methods: {
			roomTypeChange(roomCount)
			{
				this.selectRoom=roomCount;
				let dataArr=[];
				for (var i = 0; i < this.house_type.list.length; i++) {
					if(this.house_type.list[i].room_count==this.selectRoom || this.selectRoom==-1)
					{
						dataArr.push(this.house_type.list[i]);
					}
				}
				this.dataList=dataArr;
				
			}
		}
	}
</script>

<style>

</style>
