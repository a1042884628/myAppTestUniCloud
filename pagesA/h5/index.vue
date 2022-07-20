<template>
	<view>
		<web-view :src="src" @load="load" @message="message" @error="error"></web-view>
	</view>
</template>

<script>
	import {webHost} from '../../global/config.js'
	export default {
		data() {
			return {
				src:""
			}
		},
		onLoad(options) {
			this.src = decodeURIComponent(options.url);
			console.log(this.src)
		},
		methods: {
			load(e){
				console.log('load',e);
			},
			error(e){
				console.log('error',e);
			},
			message(e){
				console.log("message",e);
			}
		}
	}
</script>

<style>
</style>
