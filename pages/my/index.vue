<template>
	<view class="container">
		<view class="u_info_box">
			<view class="u_head">
				<image mode="widthFix" :src="avatar || '/static/missing-face.png'"></image>
			</view>
			<view class="u_info" v-if="isLogin">
				<view class="u_name">
					<text>{{nickname}}</text>
				</view>
				<view class="u_level">
					<text>房e点会员</text>
				</view>
			</view>
			<view class="u_info_login" v-if="!isLogin">
				<view class="u_name" @click="navTo('login')">
					<text>请登录</text>
				</view>
			</view>
			<view class="u_more" @click="this.$navTo('my_setting')" v-if="isLogin">
				<text>设置中心</text>
			</view>
		</view>
		<view class="u_nav_box">
			<view class="u_nav_item" @click="this.$navTo('my_collection','','',4)">
				<view class="u_nav_img">
					<image src="../../static/icon_27.png" mode="widthFix"></image>
				</view>
				<view class="u_nav_text">
					<text>我的收藏</text>
				</view>
			</view>

			<view class="u_nav_item" @click="this.$navTo('my_history')">
				<view class="u_nav_img">
					<image src="../../static/icon_28.png" mode="widthFix"></image>
				</view>
				<view class="u_nav_text">
					<text>浏览记录</text>
				</view>
			</view>

			<view class="u_nav_item" @click="this.$navTo('my_appointment')">
				<view class="u_nav_img">
					<image src="../../static/icon_29.png" mode="widthFix"></image>
				</view>
				<view class="u_nav_text">
					<text>我的预约</text>
				</view>
			</view>

			<view class="u_nav_item" @click="this.$navTo('my_zhaofang')">
				<view class="u_nav_img">
					<image src="../../static/icon_30.png" mode="widthFix"></image>
				</view>
				<view class="u_nav_text">
					<text>帮我找房</text>
				</view>
			</view>
		</view>
		<view class="u_menu_box">
			<view class="um_item ui_1 " @click="this.$navTo('contacts',{type:'2'})" v-if="isEmployee">
				<text>咨询我的</text><text class="red_num" v-if="saler_un_read_num>0">{{saler_un_read_num}}</text>
			</view>
			<view class="um_item ui_1 " @click="this.$navTo('contacts',{type:'1'})" v-if="isEmployee">
				<text>我的咨询</text><text class="red_num" v-if="un_read_num>0">{{un_read_num}}</text>
			</view>
			<view class="um_item ui_7" @click="this.$navTo('sale_identity')" v-if="!isEmployee">
				<text>置业顾问认证</text>
			</view>
			<view class="um_item ui_1" @click="this.$navTo('contacts',{type:'1'})" v-if="!isEmployee">
				<text>我的咨询</text><text class="red_num" v-if="un_read_num>0">{{un_read_num}}</text>
			</view>
			<view class="um_item ui_2" @click="this.$navTo('calculator')">
				<text>购房计算器</text>
			</view>
			<view class="um_item ui_3" @click="this.$navTo('activityList')">
				<text>精选活动</text>
			</view>
			<view class="um_item ui_4" @click="this.$navTo('my_score')">
				<text>我的积分</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
				<view class="um_item ui_5" @click="this.$navTo('my_guanzhu')">
					<text>关注公众号</text>
				</view>
			<!-- #endif -->
			<view class="um_item ui_6" @click="this.$navTo('my_aboutus')">
				<text>关于房e点</text>
			</view>

		</view>
	</view>
</template>
<script>
	import {
		check_login,
		isEmployee
	} from '../../utils/user.js'
	export default {
		components: {},
		data() {
			return {
				isLogin: false,
			};
		},
		onShow() {
			this.isLogin = check_login();
			console.log("onShow", this.isLogin)
			if (this.isLogin) {
				this.getUserWallet()
			}
		},
		onLoad() {
			console.log("isEmployee", isEmployee())
		},
		computed: {
			nickname() {
				return this.$store.getters.nickname
			},
			levelname() {
				return this.$store.getters.levelname
			},
			avatar() {
				return this.$store.getters.avatar
			},
			money() {
				return this.$store.getters.money
			},
			score() {
				return this.$store.getters.score
			},
			mobile() {
				return this.$store.getters.mobile
			},
			isEmployee() {
				return isEmployee()
			},
			saler_un_read_num(){
				return this.$store.getters.saler_un_read_num
			},
			un_read_num(){
				return this.$store.getters.un_read_num
			}
		},
		watch:{
			saler_un_read_num(){
				if(this.un_read_num>0 || this.saler_un_read_num>0)
				{
					uni.showTabBarRedDot({
						index:2
					})
				}
				else
				{
					uni.hideTabBarRedDot({
						index:2
					})
				}
			},
			un_read_num(){
				if(this.un_read_num>0 || this.saler_un_read_num>0)
				{
					uni.showTabBarRedDot({
						index:2
					})
				}
				else
				{
					uni.hideTabBarRedDot({
						index:2
					})
				}
			}
		},
		methods: {
			navTo(url, param) {
				this.$navTo(url, param);
			},
			getUserWallet() {
				this.$api.user.getUserWallet({
					user_id: this.$store.getters.userId,
					saler_id:this.$store.getters.salerId
				}).then(res => {
					this.$store.dispatch('user/setWallet', res.data)
				})
			},

		}

	}
</script>
<style lang="scss">
	page {
		background: #ffffff;
	}

	.container {
		background: url(../../static/usercenter_bg.png) no-repeat;
		background-size: 100% auto;
	}
	.um_item {
		position: relative;
	}
	.red_num {
		display: block;
		width: 40upx;
		height: 40upx;
		float: right;
		background: #ff1e00;
		border-radius: 30upx;
		line-height: 40upx;
		color: #ffffff;
		font-size: 22upx;
		text-align: center;
		position: absolute;
		right: 60upx;
		top: 35upx;
	}
</style>
