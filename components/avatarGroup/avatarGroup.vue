<template>
	<view>
		<view class="cu-avatar-group">
			<view class="cu-avatar round" :class="size" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index].avatar + ')' }]"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			avatar:{
				type:Array
			},
			size:{
				default:'sm'
			}
		},
		
	}
</script>

<style>
</style>
