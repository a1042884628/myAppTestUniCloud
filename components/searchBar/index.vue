<template>
	<view class="search-bar">
		<view class="search-bar-form">
			<view class="search-bar-box">
				<text class="cuIcon-search"></text>
				<input confirm-type="search" :disabled="disabled" @confirm="searchConfirm" class="search-bar-input" :placeholder="placeholder" placeholder-class="phcolor" v-model="inputVal"/>
				<view class="icon-clear" v-show="showClear" @tap="clearInput">
					<text class="cuIcon-close"></text>
				</view>
			</view>
			
		</view>
		<button v-if="showBtn" class="margin-left-xs cu-btn  round bg-blue shadow" @tap="searchConfirm">{{btnContext}}</button>
	</view>
</template>

<script>
	export default {
		props:{
			placeholder:{
				type:String,
				default:""
			},
			btnContext:{
				type:String,
				default:"搜索"
			},
			disabled:{
				type:Boolean,
				default:false
			},
			showBtn:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				inputVal:"",
				showClear:false
			}
		},
		watch:{
			inputVal(val){
				if(val.length > 0){
					this.showClear = true
				}else{
					this.showClear = false
					this.$emit('clearInput');
				}
			}
		},
		onLoad() {
			
		},
		methods: {
			clearInput(){
				this.inputVal = ""
				uni.hideKeyboard() 
				this.$emit('clearInput');
			},
			searchConfirm(){
				this.$emit('searchConfirm',this.inputVal);
			}
		}
	}
</script>

<style>
	.search-bar {
		display: flex;
		align-items: center;
		position: relative;
		padding: 30upx 30upx 30upx;
		background-color: #fff;
		/* box-shadow: 0 2px 2px #ccc;*/
	}
	.search-bar-form {
		flex: 1;
		position: relative;
		border-radius: 32upx;
		background: #f2f5f7;
	}
	.search-bar-box {
		display: flex;
		align-items: center;
		position: relative;
		padding-left: 20upx;
		padding-right: 20upx;
		height: 64upx;
		z-index: 1;
	}
	.search-bar-input {
		line-height: normal;
		width: 100%;
		padding-left: 20upx;
		font-size: 30upx;
		color: #333;
	}
	.phcolor {
		font-size: 30upx;
	}
</style>
