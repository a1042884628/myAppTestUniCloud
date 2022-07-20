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
			let paramsStr= this.transParams(options);
			
			this.src = webHost+"pages/coom/transRoute"+paramsStr;
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
			},
			transParams(obj){
					let params =   Object.keys(obj).map(function (key) {
				        return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
				    }).join("&");
					
					let uuidSetting = this.$store.getters.uuidSetting;
					let uuid='';
					for (var i = 0; i < uuidSetting.length; i++) {
						if (uuidSetting[i].selected) {
							uuid=uuidSetting[i].uuid;
						}
					}
					return  params ? '?'+params+'&uuid='+uuid : '?uuid='+uuid
			}
		}
	}
</script>

<style>
</style>
