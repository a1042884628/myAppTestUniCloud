<template>
	<view class="container">
		<view class="gz_box_1">
			<image :src="img" show-menu-by-longpress mode="widthFix"></image>
		</view>
		<view class="gz_box_2">
			<view class="gz_title">
				<text>关注流程</text>
			</view>
			<view class="gz_item">
				<view class="gz_item_text">
					1.长按识别二维码
				</view>
				<view class="gz_item_img">
					<image :src="imgList[0]" mode="widthFix" @click="viewImage" :data-url="imgList[0]"></image>
				</view>
			</view>
			<view class="gz_item">
				<view class="gz_item_text">
					2.点击关注公众号
				</view>
				<view class="gz_item_img">
					<image :src="imgList[1]"  mode="widthFix" @click="viewImage" :data-url="imgList[1]"></image>
				</view>
			</view>
		</view>
			
	</view>
</template>

<script>
	import {
		imgUrl
	} from '@/global/config.js'
	export default {
		data() {
			return {
				img:imgUrl+'app/gzh_1.png',
				imgList:[imgUrl+'app/gzh_2.png',imgUrl+'app/gzh_3.png'],

			}
		},
		onLoad(options) {

		},
		onReady: function (res) {

		},
		methods: {

			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url,
					fail:function(err)
					{
						console.log(err)
					},
					success:function (res) {
							console.log(res);
						}
				});
			},
			
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.gz_box_1 {
		width: 100%;
	}
	.gz_box_1 image {
		width: 100%;
		height: auto;
	}
	.gz_box_2 {
		width: 100%;
		margin-top: 100upx;
	}
	.gz_title {
		width: 100%;
		text-align: center;
	}
	.gz_title text {
		display: inline-block;
		color: #fc942b;
		font-size: 35upx;
		line-height: 50upx;
		font-weight: bold;
		position: relative;
	}
	.gz_title text::before ,.gz_title text::after {
		content: '';
		display: block;
		width: 220upx;
		height: 2upx;
		background: #fc942b;
		position: absolute;
		left: -250upx;
		top: 25upx;
		opacity: 0.2;
	}
	.gz_title text::after {
		left: auto;
		right: -250upx;
	}
	.gz_item {
		width: 50%;
		float: left;
		text-align: center;
		font-size: 28upx;
		padding-top: 30upx;
	}
	.gz_item_text {
		width: 100%;
		text-align: center;
	}
	.gz_item_img {
		width: 100%;
		margin-top: 30upx;
	}
	.gz_item_img image {
		width: 75%;
		height: auto;
	}
	
	
</style>
