<template>
	<scroll-view scroll-y class="container" @scroll="scroll" @scrolltolower="getProject()">
		<button @click="testco()">请求云对象helloco的方法</button>
		<button @click="testtodo()">请求云对象todo的方法</button>
		<view class="home_search" :class="{scr_search:scollTop > 10}">
			<view class="search_city">
				<text>济南</text>
			</view>
			<view class="search_box" @click="this.$navTo('search')">
				<input class="search_input" type="text" placeholder="楼盘查询" :disabled="true" />
			</view>
		</view>
		<swiper class="swiper home_banner" indicator-dots="true" autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @click.stop="banner_goto(item)">
				<view class="swiper-item">
					<image :src="item.image_url" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>

		<view class="home_news">
			<view class="hn_title">
				<image src="../../static/icon_5.png" mode="widthFix"></image>
			</view>
			<view class="hn_main">
				<swiper class="swiper" autoplay="true" interval="6000" duration="500" :vertical='true'>
					<swiper-item v-for="(item,index) in newsList" :key="item.id" @click="banner_goto(item)">
						<view class="swiper-item">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="home_nav">
			<view class="hn_item" @click="this.$navTo('tupai_list')">
				<image src="../../static/m6.png" mode="widthFix"></image>
				<text>济南土拍</text>
			</view>
			<view class="hn_item" @click="this.$navTo('h5',{url:nav_url.market_news_url})">
				<image src="../../static/m4.png" mode="widthFix"></image>
				<text>皇姐问房</text>
			</view>
			<view class="hn_item" @click="this.$navTo('h5',{url:nav_url.super_house_visit_url})">
				<image src="../../static/m1.png" mode="widthFix"></image>
				<text>超级房探</text>
			</view>
			<view class="hn_item" @click="this.$navTo('vr_list')">
				<image src="../../static/m5.png" mode="widthFix"></image>
				<text>VR看房</text>
			</view>
			<view class="hn_item" @click="this.$navTo('map_list')">
				<image src="../../static/m2.png" mode="widthFix"></image>
				<text>地图找房</text>
			</view>
			<view class="hn_item" @click="this.$navTo('jingpin_list')">
				<image src="../../static/m3.png" mode="widthFix"></image>
				<text>精品推荐</text>
			</view>
			<view class="hn_item" @click="this.$navTo('tejia_list')">
				<image src="../../static/m7.png" mode="widthFix"></image>
				<text>特价房源</text>
			</view>
			<view class="hn_item" @click="this.$navTo('calculator')">
				<image src="../../static/m8.png" mode="widthFix"></image>
				<text>购房计算</text>
			</view>
		</view>

		<view class="home_hot">
			<view class="hh_title">
				<image src="../../static/icon_6.png" mode="widthFix"></image>
			</view>

			<view class="hh_main">
				<view class="select_wrap">
					<search-con @confirm="confirm()" id="search_con" ref="search_con"
						:style="isTop == 1 ? 'top:'+search_home_bottom+'px' :''" :class="{fixed_search:isTop == 1}">
					</search-con>
				</view>

				<view class="hh_list">

					<project-item v-for="(item,index) in projectList" :key="item.id" :project="item"></project-item>
					<load-more :status="loadingType"></load-more>
				</view>
			</view>
		</view>

	</scroll-view>
</template>

<script>
	import projectItem from '../project_list/components/project_item.vue'
	import {
		webHost
	} from '@/global/config.js'
	import {
		check_login
	} from "@/utils/user.js"
	import {
		dateFormat
	} from '@/utils/index.js'
	export default {
		components: {
			projectItem,
		},
		data() {
			return {
				longitude: '',
				latitude: '',
				isTop: false,
				scollTop: 0,
				search_home_bottom: 98,
				select_wrap_top: 300,
				allowScroll: true,
				loadingType: "more",
				pageindex: 1,
				pagesize: 20,
				total: 0,
				projectList: [],
				swiperList: [],
				newsList: [],
				nearby: '',
				open_date: '',
				tags: '',
				region_name: '',
				channel: 'home',
				nav_url: {},
			}
		},
		onShow() {
			if (check_login()) {
				this.getUserWallet()
			}

		},
		onLoad(options) {
			this.getProject();
			this.getHomeData();
			if (check_login()) {

				this.postVisitedit();
			}
			console.log("statusBarHeight", this.$globalData.statusBarHeight);

			// const query = uni.createSelectorQuery()

			// query.in(this).select(".home_search").boundingClientRect();
			// query.in(this).select(".home_hot").boundingClientRect();
			// query.in(this).select(".home_nav").boundingClientRect();

			// query.exec((data) => {
			// 	this.search_home_bottom = data[0].bottom;
			// 	this.select_wrap_top = data[1].top;
			// 	var home_banner_bottom = data[2].bottom;
			// 	console.log("boundingClientRect", this.search_home_bottom, this.select_wrap_top,
			// 		home_banner_bottom, data[1]);
			// });



		},
		mounted() {

		},
		onReady() { //兼容抖音小程序，需要在onReady 中才可以获取dom位置
			const query = uni.createSelectorQuery()
			query.in(this).select(".home_search").boundingClientRect();
			query.in(this).select(".home_hot").boundingClientRect();
			query.in(this).select(".home_nav").boundingClientRect();

			query.exec((data) => {
				this.search_home_bottom = data[0].bottom;
				this.select_wrap_top = data[1].top;
				var home_banner_bottom = data[2].bottom;
				console.log("boundingClientRect", this.search_home_bottom, this.select_wrap_top,
					home_banner_bottom, data[1]);
			});
		},
		computed: {
			setting() {
				return this.$store.getters.setting
			},
			saler_un_read_num() {
				return this.$store.getters.saler_un_read_num
			},
			un_read_num() {
				return this.$store.getters.un_read_num
			}
		},
		watch: {
			saler_un_read_num() {
				if (this.un_read_num > 0 || this.saler_un_read_num > 0) {
					uni.showTabBarRedDot({
						index: 2
					})
				} else {
					uni.hideTabBarRedDot({
						index: 2
					})
				}
			},
			un_read_num() {
				if (this.un_read_num > 0 || this.saler_un_read_num > 0) {
					uni.showTabBarRedDot({
						index: 2
					})
				} else {
					uni.hideTabBarRedDot({
						index: 2
					})
				}
			}
		},
		methods: {
			async testco() { // 注意异步
				const helloco = uniCloud.importObject('helloco') // 导入云对象
				try {
					const res = await helloco.sum(1, 2) //导入云对象后就可以直接调用该对象的sum方法了，注意使用异步await
					console.log('testco helloco res', res) // 结果是3
				} catch (e) {
					console.log(e)
				}
			},
			async testtodo() {
				const todo = uniCloud.importObject('todo') //第一步导入云对象
				try {
					const res = await todo.add('title demo', 'content demo') //导入云对象后就可以直接调用该对象的方法了，注意使用异步await
					uni.showToast({
						title: '创建成功'
					})
				} catch (e) {
					// 符合uniCloud响应体规范 https://uniapp.dcloud.net.cn/uniCloud/cf-functions?id=resformat，自动抛出此错误 
					uni.showModal({
						title: '创建失败',
						content: e.errMsg,
						showCancel: false
					})
				}
			},
			banner_goto(item) {
				if (item.goto_url) {

					let url = item.goto_url.toLowerCase();
					if (url.indexOf("http") >= 0) {
						this.$navTo('h5', {
							url: item.goto_url
						})
					} else {
						uni.navigateTo({
							url: "/" + item.goto_url
						})
					}
				}
			},
			confirm(e) {

				let that = this;
				this.loadingType = "more";
				this.pageindex = 1;
				this.pagesize = 20;
				this.total = 0;
				this.projectList = [];

				let needLocation = false;
				let tags = '';
				this.nearby = '';
				this.region_name = '';
				this.open_date = '';
				for (var i = 0; i < e.length; i++) {
					if (e[i].name == "附近" && e[i].value.length > 0) {
						this.nearby = e[i].value[0];
						needLocation = true;
					} else if (e[i].name == "区域" && e[i].value.length > 0) {
						this.region_name = e[i].value[0];
					} else if (e[i].name == "开盘时间" && e[i].value.length > 0) {
						this.open_date = e[i].value[0];
					} else if (e[i].value.length > 0) {
						tags = tags + e[i].value.join(',') + ',';
					}
				}
				this.tags = tags;
				if (needLocation) {
					uni.getLocation({
						type: "gcj02",
						success: function(t) {
							that.longitude = t.longitude
							that.latitude = t.latitude
						},
						fail: function(e) {
							that.$prompt.showMsg('获取位置信息失败，条件【附近】不参与查询');
						},
						complete: function(e) {
							that.getProject();
						}
					});
				} else {
					this.getProject();
				}

			},
			scroll(e) {
				this.scollTop = e.detail.scrollTop;

				// var px = this.scollTop / 750 * wx.getSystemInfoSync().windowWidth;
				// var rpx = (this.scollTop * 750 / wx.getSystemInfoSync().windowWidth) - this.search_home_bottom;
				// console.log(e);
				// console.log(this.scollTop);
				if (this.scollTop - this.search_home_bottom >= this.select_wrap_top) {
					this.isTop = true;
				} else {
					this.isTop = false;
				}
			},
			getHomeData() {
				const params = {
					company_id: getApp().globalData.company_id
				}
				this.$api.main.getHomeData(params).then(res => {
					this.swiperList = res.data.banner_list
					this.newsList = res.data.notice.list
					this.nav_url = res.data.nav_url;
				})
			},
			getProject() {
				if (this.loadingType === "loading" || this.loadingType === 'nomore') {
					return
				}

				this.loadingType = 'loading';
				const params = {
					pageindex: this.pageindex++,
					pagesize: this.pagesize,
					channel: this.channel,
					tags: this.tags,
					longitude: this.longitude,
					latitude: this.latitude,
					nearby: this.nearby,
					open_date: this.open_date,
					region_name: this.region_name,
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				this.$api.main.getProjectList(params).then(resData => {
					this.projectList = this.projectList.concat(resData.data.rows)

					this.total = resData.data.total;
					this.loadingType = Math.ceil(this.total / this.pagesize) >= this.pageindex ? 'more' : 'nomore';

				})


			},
			postVisitedit() {
				this.$api.main.postVisitedit({
					open_id: this.$store.getters.openId,
					visit_time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
					leave_time: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
					url: this.$pages['index'],
					para: "{}",
					agent: 0
				})
			},
			onShareAppMessage(res) {
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				let route = currPage.route + "?id=" + this.id
				if (check_login()) {
					route += "&reco_mobile=" + this.$store.getters.mobile
				}
				return {
					title: this.setting.platform_name,
					path: route
				}
			},
			onShareTimeline(res) {
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				let route = currPage.route + "?id=" + this.id
				if (check_login()) {
					route += "&reco_mobile=" + this.$store.getters.mobile
				}
				route = route + "&uuid=" + _uuid;
				return {
					title: this.setting.platform_name,
					path: route
				}
			},
			getUserWallet() {
				this.$api.user.getUserWallet({
					user_id: this.$store.getters.userId,
					saler_id: this.$store.getters.salerId
				}).then(res => {
					this.$store.dispatch('user/setWallet', res.data)
				})
			},
		},

	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.container {
		height: 100%;
	}

	.scr_search {
		background: #f8ad44;
	}

	.fixed_search {
		background: #fff;
		z-index: 999;
		width: 100%;
		position: fixed;
		box-shadow: 0 8upx 8upx rgba(0, 0, 0, 0.05);
	}

	.select_wrap {
		width: 100%;
		height: 80upx;
		background: #fff;
		position: relative;
		z-index: 2;
	}
</style>
