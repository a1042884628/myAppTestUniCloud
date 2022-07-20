<template>
	<view class="container">
		<view class="banner">
			<image :src="banner" style="width: 100%;" mode="widthFix"></image>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles"></text>
				<text class="text-xl text-bold">活动详情</text>
			</view>
		</view>
		<view class="parse" v-html="content"></view>
		<view class="activity" style="margin-bottom: 120upx;">
			<view class="cu-form-group">
				<view class="title" style="display: flex;align-items: center;">
					<image src="@/static/baomingshijian.png" style="width: 40upx;height: 40upx;margin-right: 10upx;">
					</image>
					活动时间
				</view>
				<view>{{start_date}} - {{end_date}}</view>
			</view>

			<view class="cu-form-group">
				<view class="title" style="display: flex;align-items: center;">
					<image src="@/static/jiezhishijian.png" style="width: 40upx;height: 40upx;margin-right: 10upx;">
					</image>
					报名截止
				</view>
				<view v-if="act_status=='报名中'">剩余{{differDays}}天</view>
				<view v-if="act_status!='报名中'" class="text-red">{{act_status}}</view>
			</view>
			<view class="cu-form-group" v-if="sign_status != '未报名'">
				<view class="title" style="display: flex;align-items: center;">
					<image src="@/static/baomingzhuangtai.png" style="width: 40upx;height: 40upx;margin-right: 10upx;">
					</image>
					报名状态
				</view>
				<view>{{sign_status}}</view>
			</view>
		</view>
		<view class="baoming" v-if="sign_status == '未报名' && act_status=='报名中'" @click="apply">报名</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				content: "",
				banner: "",
				start_date: "",
				end_date: "",
				sign_start_date:"",
				sign_end_date:"",
				differDays: "",
				sign_status: "",
				act_status:"",
				title: ""
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getNetData()
		},
		methods: {
			async getNetData() {
				let params = {
					id: this.id
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				let resData = await this.$api.main.getActivityDetail(params);
				this.banner = resData.data.imgurl
				this.sign_status = resData.data.sign_status
				this.title = resData.data.title
				this.start_date = resData.data.start_date.replace(/-/g, "/")
				this.end_date = resData.data.end_date.replace(/-/g, "/")
				this.sign_start_date = resData.data.sign_start_date.replace(/-/g, "/")
				this.sign_end_date = resData.data.sign_end_date.replace(/-/g, "/")
				const regex = new RegExp('<img', 'gi');
				this.content = resData.data.cont.replace(regex, `<img style="max-width: 100%; height: auto"`);
				this.differDays = this.getDaysBetween(this.sign_start_date, this.sign_end_date)

			},
			getDaysBetween(dateString1, dateString2) {
				var startDate = Date.parse(dateString1);
				var endDate = Date.parse(dateString2);
				
				var dt=Date.parse(this.ThisDate());
				var days = (endDate - dt) / (1 * 24 * 60 * 60 * 1000)+1;
				if(dt<startDate)
				{
					this.act_status="未开始";
				}
				else if(dt>=startDate && dt<=endDate)
				{
					this.act_status="报名中";
				}
				else
				{
					this.act_status="已截止";
				}
				
				console.log(dt,days);
				return days;
			},
			ThisDate() { //当前日期
			      var date = new Date();
			      var year = date.getFullYear();
			      var month = date.getMonth() + 1;
			      var day = date.getDate();
			      // myDate.toLocaleString( );
			      var time = year + "/" + month + "/" + day;
			      return time;
			    },
			apply() {
				let params = {
					id: this.id,
					title: this.title,
					start_date: this.start_date,
					end_date: this.end_date
				}
				uni.navigateTo({
					url: "apply?params=" + JSON.stringify(params),

				})

				// this.$navTo('activityApply',{
				// 	params:JSON.stringify(params)
				// })
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}

	.cuIcon-titles {
		color: #ff9c2a;
	}

	.baoming {
		height: 80upx;
		width: 100%;
		color: #ffffff;
		background-image: -webkit-linear-gradient(#ff9c2a, #ffae51);
		background-image: linear-gradient(#ff9c2a, #ffae51);
		text-align: center;
		line-height: 80upx;
		position: fixed;
		bottom: 0;
	}
	.text-xl {
		color: #000000;
	}
	.parse {
		width: 100%;
		text-align: justify;
		padding: 0 30upx 20upx 36upx;
		line-height: 1.8;
		color: #333333;
		border-bottom: 2upx solid #eeeeee;
	}
</style>
