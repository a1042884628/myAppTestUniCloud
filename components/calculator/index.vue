<template>
	<view class="container">
		<view class="container-page" :style="{'backgroundColor': bgcColor}">
			<view style="padding: 45rpx 30rpx;">
				<me-tabs v-model="tabIndex" :tabs="tabs" @change="tabChange"></me-tabs>
				<view class="">
					<business @submit='submit' ref="business" v-if="tabIndex === 0"></business>
					<accumulation @submit='submit'  ref="accumulation" v-if="tabIndex === 1"></accumulation>
					<group @submit='submit'  ref="group" v-if="tabIndex === 2"></group>
				</view>
				<view class="btn">
					<button class="reset" @tap="reset">重置</button>
					<button class="save" @tap="save" :style="{'backgroundColor': btnColor}">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabs from '@/components/me-tabs/me-tabs.vue'
	import business from '@/components/calculator/business.vue'
	import accumulation from '@/components/calculator/accumulation.vue'
	import group from '@/components/calculator/group.vue'
	export default {
		components: {
			business,
			accumulation,
			group,
			tabs
		},
		props: {
			bgcColor: {
				type: String,
				default: '#8CC5FF'
			},
			btnColor: {
				type: String,
				default: '#409EFF'
			},
			activeColor: {
				type: String,
				default: '#53A8FF'
			}
		},
		data() {
			return {
				list: [
					'商业贷款',
					'公积金贷款',
					'组合贷款'
				],
				tabIndex: 0,
				tabs: [{
						name: '商业贷款'
					},
					{
						name: '公积金贷款'
					},
					{
						name: '组合贷款'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			tabChange() {

			},
			submit(obj, type) {
				this.$emit('submit', obj, type)
			},
			reset(){
				if (this.tabIndex === 0) {
					this.$refs.business.reset()
					return
				}
				if (this.tabIndex === 1) {
					this.$refs.accumulation.reset()
					return
				}
				if (this.tabIndex === 2) {
					this.$refs.group.reset()
					return
				}
			},
			save() {
				if (this.tabIndex === 0) {
					this.$refs.business.submit()
					return
				}
				if (this.tabIndex === 1) {
					this.$refs.accumulation.submit()
					return
				}
				if (this.tabIndex === 2) {
					this.$refs.group.submit()
					return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container-page {
		height: 100vh;

		.header-group {
			display: flex;
			border-top-right-radius: 15rpx;
			border-top-left-radius: 15rpx;

			.group {
				width: 34%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.right-bottom {
		border-radius: 0 15rpx 0 0;
	}

	.left-bottom {
		border-radius: 15rpx 0 0 0;
	}

	.center-left-bottom {
		border-radius: 15rpx 15rpx 0 0;
	}

	.center-right-bottom {
		border-radius: 15rpx 15rpx 0 0;
	}

	.btn {
		margin-top: 50rpx;
		display: flex;

		.reset {
			width: 40%;
			border-radius: 50rpx;
		}

		.save {
			width: 40%;
			border-radius: 50rpx;
			color: #FFFFFF;

			&::after {
				border: none !important;
			}
		}
	}
</style>
