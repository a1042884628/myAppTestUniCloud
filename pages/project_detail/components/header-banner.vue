<template>
	<view class="house_img_box">
		<view class="house_img_info">
			<view class="house_views_num">
				<text>{{views_num}}</text>
			</view>
			<view class="house_img_tab">

				<text v-for="(item,index) in swipeBtnList" :key="item.type" @click="tabClick(item)"
					:class="{on:selectType==item.type}">{{item.name}}</text>

			</view>
		</view>
		<view class="house_img">
			<view class="vr-logo" v-show="selectType==1" @click="itemClick(item)"></view>

			<swiper class="house_sw" :autoplay="autoplay" :circular="false" duration="500" :interval="interval"
				:current="swipeCurrent" @change="changeCurrent">
				<swiper-item v-for="(item,index) in bannerList" :key="item.id" @click="itemClick(item)">
					<image lazyLoad="true" mode="aspectFill" :src="item.file_url"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bannerDataList: {
				type: Object,
				default: {}
			},
			views_num: 0,
			projectId: ''
		},
		data() {
			return {
				autoplay: false,
				interval: 5000,
				selectType: 0,
				swipeCurrent: 0,
				swipeBtnList: [],
				bannerList: [],
			}
		},
		watch: {
			bannerDataList: {
				handler(val) {
					this.initSwipeData(val);
				}
			}
		},
		methods: {
			itemClick(item) {
				if(item.type==1)
				{
					this.$navTo("h5", {
						url: item.goto_url
					})
				}
				else
				{
					this.$navTo('project_album', {
						projectId: this.projectId,
						selectType: this.selectType
					})					
				}

			},
			tabClick(tab) {

				this.selectType = tab.type;
				for (var i = 0; i < this.bannerList.length; i++) {
					if (this.bannerList[i].type == tab.type) {
						this.swipeCurrent = i;
						break;
					}

				}
			},
			changeCurrent(e) {
				this.swipeCurrent = e.detail.current;
				this.selectType = this.bannerList[this.swipeCurrent].type;
			},
			initSwipeData(bannerData) {
				let swipeBtnList = [];
				if (bannerData.vr && bannerData.vr.length > 0) {
					swipeBtnList.push({
						type: "1",
						name: "VR",
						firstIdx: 0
					})
					for (let index in bannerData.vr) {
						bannerData.vr[index].type = 1
					}
					this.bannerList = this.bannerList.concat(bannerData.vr);
				}
				if (bannerData.video && bannerData.video.length > 0) {
					swipeBtnList.push({
						type: "2",
						name: "规划图",
						firstIdx: bannerData.vr.length
					})
					for (let index in bannerData.video) {
						bannerData.video[index].type = 2
					}
					this.bannerList = this.bannerList.concat(bannerData.video);
				}
				if (bannerData.image && bannerData.image.length > 0) {
					swipeBtnList.push({
						type: "3",
						name: "图片",
						firstIdx: bannerData.vr.length + bannerData.video.length
					})
					for (let index in bannerData.image) {
						bannerData.image[index].type = 3
					}
					this.bannerList = this.bannerList.concat(bannerData.image);
				}
				this.swipeBtnList = swipeBtnList;

				if (this.swipeBtnList.length > 0) {
					this.selectType = this.swipeBtnList[0].type;
				}
			},

		}
	}
</script>

<style>

</style>
