<template>
	<view class="content">
		<calculator :bgcColor="'#A0CFFF'" :btnColor="'#409EFF'"  @submit='submit'></calculator>
	</view>
</template>

<script>
	import calculator from '@/components/calculator/index.vue'
	export default {
		components: {
			calculator
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			submit(obj, type) {
				uni.navigateTo({
					url: type === 1 ? '../all-pay/index?data=' + encodeURIComponent(JSON.stringify(obj)) : '../pay/index?data=' + encodeURIComponent(JSON.stringify(obj))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .tabs-line{
		background-color: #409EFF !important;
	}
	/deep/ .active{
		color: #409EFF !important;
	}
	/deep/ .wx-radio-input.wx-radio-input-checked::before {
	  border-radius: 50%; /* 圆角 */
	  width: 45rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
	  height: 45rpx; /* 选中后对勾大小，不要超过背景的尺寸 */
	  line-height: 45rpx;
	  text-align: center;
	  font-size: 28rpx; /* 对勾大小 30rpx */
	  color: #fff; /* 对勾颜色 白色 */
	  background: #409EFF;
	  transform: translate(-50%, -50%) scale(1);
	  -webkit-transform: translate(-50%, -50%) scale(1);
	}
</style>
