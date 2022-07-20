<template>
	<view class="container">
		<view class="dikuai_img">
			<swiper :autoplay="autoplay" :circular="true" duration="500" :interval="interval">
				<swiper-item v-for="(item,index) in formdata.img_list" :key="item.id" @click="viewImage"
					:data-url="item.file_url">
					<image lazyLoad="true" mode="widthFix" :src="item.file_url"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="dikuai_title">
			<text>{{formdata.land_name}}</text>
		</view>

		<view class="dikuai_info">
			<view class="dk_item">
				<text>编号</text>
				<text>{{formdata.land_no}}</text>
			</view>
			<view class="dk_item">
				<text>名称</text>
				<text>{{formdata.land_name}}</text>
			</view>
			<view class="dk_item">
				<text>位置</text>
				<text>{{formdata.address}}</text>
			</view>
			<view class="dk_item">
				<text>土地面积</text>
				<text>{{formdata.area}}m²</text>
			</view>
			<view class="dk_item">
				<text>性质（年限）</text>
				<text>{{formdata.land_type}}年</text>
			</view>
			<view class="dk_item">
				<text>宗地作用</text>
				<text>{{formdata.use_type}}</text>
			</view>
			<view class="dk_item">
				<text>容积率</text>
				<text>{{formdata.volume_ratio}}</text>
			</view>
			<view class="dk_item">
				<text>建筑密度</text>
				<text>{{formdata.building_ratio}}</text>
			</view>
			<view class="dk_item">
				<text>出让起始价</text>
				<text>{{formdata.orgin_price}}</text>
			</view>
			<view class="dk_item">
				<text>挂牌时间</text>
				<text>{{formdata.hang_date}}</text>
			</view>
			<view class="dk_item">
				<text>竟得人</text>
				<text>{{formdata.owner_person}}</text>
			</view>
			<view class="dk_item">
				<text>成交价格</text>
				<text>{{formdata.price}}</text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				autoplay: true,
				interval: 5000,
				imgList: [],
				formdata: {}
			}
		},
		onLoad(option) {
			if (option.id) {
				this.id = option.id;
				this.getDetail();
			}

		},
		watch: {
		},
		methods: {
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			getDetail() {
				const params = {
					id: this.id
				}
				let that = this;
				this.$api.main.getLandDetail(params).then(resData => {
					that.formdata = resData.data;

					let imgList = []

					for (let imgListIndex in that.formdata.img_list) {
						imgList.push(that.formdata.img_list[imgListIndex].file_url)
					}
					this.imgList = imgList
				}).catch(function(err) {
					console.log(err);
				});
			},
		}
	}
</script>

<style>

</style>
