<template>
	<view class="iden-container">
		<view v-if="status == -1">
			<image alt class="bg-img" mode="widthFix" src="/static/iden_bg.jpg"></image>
			<view class="form-containar">
				<view class="nav">
					<view class="title solid-bottom active ">置业顾问认证</view>
				</view>

				<form>
					<view class="cu-form-group margin-top-sm">
						<view class="title" style="min-width: 120rpx;">姓名</view>
						<input placeholder="请输入姓名" v-model="employeeUserName"></input>
					</view>
					<view class="cu-form-group">
						<view class="title" style="min-width: 120rpx;">手机号</view>
						<input placeholder="请输入手机号" v-model="employeeMobile" type="number"></input>
					</view>
					<view class="cu-form-group margin-top-sm">
						<textarea maxlength="-1" @input="employeeMemoChange" placeholder="请输入备注"></textarea>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue margin-tb-sm lg" @click="submit">认证</button>
					</view>
				</form>
			</view>
		</view>
		<view v-if="status == 0 || status == 1 || status == 2 ">
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">申请状态</view>
					<text>{{statusName}}</text>
				</view>
				<view class="cu-form-group ">
					<view class="title">申请人姓名</view>
					<text>{{employeeUserName}}</text>
				</view>
				<view class="cu-form-group ">
					<view class="title">手机号</view>
					<text>{{employeeMobile}}</text>
				</view>
				<view class="cu-form-group">
					<view class="title">备注</view>
					<textarea maxlength="-1" v-model="employeeMemo" ></textarea>
				</view>

				<!-- <view class="padding flex flex-direction">
					<button class="cu-btn bg-blue margin-tb-sm lg" @click="submit">立即预约</button>
				</view> -->
			</form>
		</view>
	</view>
</template>

<script>
		import {checkPh} from '@/utils/index.js'
	export default {
		data() {
			return {
				activeIndex: 0,
				brokerUserName: "",
				brokerMobile: "",
				brokerMemo: "",
				employeeUserName: "",
				employeeMobile: "",
				employeeMemo: "",
				status: "-1",
				statusName: "",
				

			}
		},
		onLoad() {
			this.brokerMobile = this.$store.getters.mobile;
			this.employeeMobile = this.$store.getters.mobile;
			// this.getIdentityState()
		},
		methods: {
			getIdentityState() {
				let params = {
					ty: "员工认证",
					user_id: this.$store.getters.userId
				}
				this.$prompt.showLoadingMsg()
				this.$api.main.getIdentityState(params).then(res => {
					this.$prompt.hideToast()
					this.status = res.data.status
					
					switch (this.status) {
						case -1:
							this.statusName = '未提交'
							break;
						case 0:
							this.statusName = '待审核'
							this.employeeUserName = res.data.real_name
							this.employeeMobile = res.data.mobile
							this.employeeMemo = res.data.memo
							break;
						case 1:
							this.statusName = '同意'
							this.employeeUserName = res.data.real_name
							this.employeeMobile = res.data.mobile
							this.employeeMemo = res.data.memo
							break;
						case 2:
							this.statusName = '拒绝'
							this.employeeUserName = res.data.real_name
							this.employeeMobile = res.data.mobile
							this.employeeMemo = res.data.memo
							break;
						default:
							break;
					}
				})
			},
			brokerMemoChange(e) {
				this.brokerMemo = e.detail.value
			},
			employeeMemoChange(e) {
				this.employeeMemo = e.detail.value
			},
			submit() {
				if(!checkPh(this.employeeMobile)){
					this.$prompt.showMsg('请填写正确的手机号');
					return
				}
				let params = {
					user_id: this.$store.getters.userId,
				}
				params.ty = "员工认证"
				params.real_name = this.employeeUserName
				params.mobile = this.employeeMobile
				params.memo = this.employeeMemo
				this.$api.main.identityAuth(params).then(res => {
					this.$prompt.showMsg('操作成功')
					let params = {
						open_id : this.$store.getters.openId
					}
					this.$api.wxapi.wxLogin2(params).then(res=>{
						 this.$store.dispatch('user/login',res.data)
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}).catch(err=>{
					uni.showModal({
					    title: '提示',
					    content: err.message,
						showCancel:false
					});
				})
			}
		}
	}
</script>

<style lang="scss">
	.iden-container {
		width: 100vw;
		height: 100vh;
		background: #fff;
		box-sizing: border-box;
		padding-top: 1rpx;
		overflow: hidden;
		position: relative;
	}

	.iden-container .bg-img {
		height: 100%;
		width: 100%;

	}

	.form-containar {
		position: absolute;
		left: 10%;
		width: 80%;
		bottom: 200rpx;
		z-index: 31;
		background-color: #FFFFFF;
		border-radius: 3%;
	}

	.nav {
		display: flex;
		align-items: center;

		.title {
			width: 100%;
			text-align: center;
			padding: 30rpx 0rpx;
			font-size: 32rpx;
		}

		.active {
			position: relative;

		}

		.active::after {
			border-bottom: 1px solid #CCCCCC;
			content: " ";
			width: 200%;
			height: 200%;
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
		}

	}
</style>
