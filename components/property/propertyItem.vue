<template>
	<view class="properties-layer">
	    <view class="properties-layer-content">
	        <view  class="properties-item" v-for="(item,index) in estateList" :key="item.id" @click="toDetail(item.id)">
	            <view class="img properties-img">
	                <view class="VR-label" v-if="item.has_vr">VR</view>
	                <image  class="image"  mode="scaleToFill" :src="item.picurl"></image>
	            </view>
	            <view class="info-layer">
	                <view class="title">
	                    <view class="AreaName">{{item.project_name}}</view>
	                </view>
	                <view class="info-price">
	                    <view v-if="item.price_about">{{item.price_about}}/m²</view> 
	                    <view>建面 {{item.room_area_about}}/m²</view>
	                </view>
	                <view class="tags" >
	                    <view class="titem" v-for="(tag,tagIndex) in item.tags" :key="tag.name">
						 {{tag.name}}
						</view>
	                </view>
	                <view class="info">
						<text class="cuIcon cuIcon-locationfill padding-right-xs" style="color: #007AFF;"></text>
	                    <view class="text">
							{{item.address}}
						</view>
	                </view>
	            </view>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		props:{
			estateList:{
				type:Array
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			toDetail(id){
				this.$navTo("project_index",{id})
			}
		}
	}
</script>

<style>
	
	.properties-layer {
	    width: 100%;
	}
	
	.properties-layer-content .properties-item {
	    border: 1px solid rgba(0,0,0,0.1);
	    border-radius: 15rpx;
	    box-shadow: 0 0 30rpx rgba(150,150,150,0.4);
	    margin-bottom: 30rpx;
	    position: relative;
	}
	
	.properties-item .info-layer {
	    width: 100%;
	    padding: 0 30rpx 30rpx 30rpx;
	    position: relative;
	    box-sizing: border-box;
	}
	
	.properties-item .img .image {
	    width: 100%;
	    height: 248rpx;
	    border-radius: 15rpx 15rpx 0 0;
	}
	
	.properties-img {
	    position: relative;
	    height: 248rpx;
	}
	
	.properties-item .title {
	    font-size: 36rpx;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    font-weight: 500;
	    color: rgba(25,25,62,1);
	    padding-top: 10rpx;
		padding-bottom: 10rpx;
	}
	
	.properties-item .AreaName {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    font-size: 36rpx;
	    font-weight: 500;
	    color: rgba(25,25,62,1);
	}
	
	
	.tri4 {
	    position: absolute;
	    left: 0;
	    top: 50rpx;
	    width: 0;
	    height: 0;
	    border-color: transparent #C6070C;
	    border-width: 0 22rpx 14rpx 0;
	    border-style: solid;
	}
	
	.properties-item .price {
	    position: absolute;
	    top: 6rpx;
	    right: 0;
	    font-size: 30rpx;
	    color: #FF4946;
	}
	
	.properties-item .tags {
	    padding: 15rpx 0;
	    display: table;
	}
	
	.properties-item .info {
	    width: 100%;
	    display: flex;
	    flex-wrap: nowrap;
	    line-height: 30rpx;
	}
	
	.properties-item .info .text {
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    width: 100%;
	    font-size: 26rpx;
	    overflow: hidden;
	    font-weight: 300;
	    color: rgba(147,153,165,1);
	}
	
	.properties-item .info .like {
	    width: 10%;
	    text-align: right;
	}
	
	.properties-item .info .like .img {
	    width: 30rpx;
	    height: 30rpx;
	}
	
	.titem {
	    font-size: 24rpx;
	    padding: 0 14rpx;
	    border-radius: 4rpx;
	    text-align: center;
	    margin: 0 8rpx 8rpx 0rpx;
	    line-height: 44rpx;
	    display: table;
	    float: left;
	    background: rgba(245,247,250,1);
	    color: rgba(147,153,165,1);
	}
	

	
	
	.info-price {
	    display: flex;
	    justify-content: flex-start;
	    align-items: center;
	    flex-wrap: wrap;
	    align-content: space-around;
	    width: 610rpx;
	}
	
	.info-price view:nth-child(1) {
	    font-weight: bold;
	    color: rgba(255,87,114,1);
	    font-size: 40rpx;
	    margin-right: 22rpx;
	}
	
	.info-price view:nth-child(2) {
	    font-size: 26rpx;
	    font-weight: 300;
	    color: rgba(147,153,165,1);
	    margin-top: 10rpx;
	}
	
	.title .title-shoucang {
	    font-size: 40rpx;
	    background: rgba(255,255,255,1);
	    box-shadow: 0px 20px 45px -10px rgba(240,244,251,1);
	}
	
	.title .title-shoucang .star {
	    width: 40rpx;
	    height: 40rpx;
	}
	
	.VR-label {
	    width: 180rpx;
	    height: 50rpx;
	    line-height: 50rpx;
	    text-align: center;
	    font-size: 26rpx;
	    z-index: 1;
	    overflow: hidden;
	    border-top-left-radius: 15rpx;
	    border-bottom-right-radius: 15rpx;
	    background-image: linear-gradient(to right,#28ADF9 0%,#3C7FFF 100%);
	    color: #fff;
	    position: absolute;
	    left: 0;
	    top: 0;
	}
	
	
	
	
	
</style>
