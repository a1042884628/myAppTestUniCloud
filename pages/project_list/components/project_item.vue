<template>
	<view class="house_item" @click="navToDetail(project)">
		<view class="house_item_main">
			<view class="house_item_img">
				<view class="vr-logo-s" v-if="project.has_vr"></view>
				<image :src="project.picurl" mode="aspectFill"></image>
			</view>
			<view class="house_item_info">
				<view class="hi_title">
					<text>{{project.project_name}}</text>
				</view>
				<view class="hi_btn" @click.stop="appointment(project)">
					<text>预约看房</text>
				</view>
				<view class="hi_tags">
					<!-- <text class="onsale">在售</text> -->
					<text v-for="(tag,i) in project.tags" :key="tag">{{tag.name}}</text>
				</view>
				<view class="hi_price">
					<text>￥{{project.price_about}}</text>
					<!-- <text>m²</text> -->
				</view>
				<view class="hi_location">
					<text>{{project.region_name}}{{project.sub_region_name}}</text>
					<text>{{project.room_area_about}} m²</text>
				</view>

			</view>

		</view>
		<view class="house_item_views" v-if="project.stars.length>0">
			<view class="hi_views_list">
				<view class="hiv_img" v-for="(star,i) in project.stars" :key="star">
					<image :src="star.avatar" mode="widthFix"></image>
				</view>

			</view>
			<view class="hi_views_num">
				<text>{{project.views}}人围观</text>
			</view>
		</view>

		<view class="h_tejia_box" v-if="project.room_list && project.room_list.length>0 && showRoom">
			<view class="ht_item" v-for="(item,index) in project.room_list" :key="item.id"
				v-if="index<=2 || room_expand">
				<view class="ht_item_info">
					<text>{{item.building_name}}# {{item.room_code}}</text>
					<text>{{item.house_type}} {{item.area}}m²</text>
				</view>
				<view class="ht_item_price">
					<text>{{item.total_price}}万</text>
					<text>￥{{item.avg_price}}/m²</text>
				</view>
			</view>
			<view class="ht_item_more" :class="{ht_item_more_expand:room_expand}"
				@click.stop="this.room_expand=!this.room_expand" v-if="project.room_list.length>2">
				<text>{{room_expand?"收起更多":"查看更多"}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		check_login
	} from '@/utils/user.js'
	export default {

		props: {
			project: {
				type: Object,
				default: {}
			},
			showRoom: false,
		},
		data() {
			return {
				room_expand: false,
			}
		},
		computed: {

		},
		watch: {

		},
		methods: {
			appointment(project) {
				if (!check_login()) {
					this.$navTo('login')
					return
				}
				let that = this;
				let params = {
					project_id: project.id,
					real_name: this.$store.getters.realName,
					visit_date: "",
					visit_time: "",
					phone: this.$store.getters.mobile,
					person_num: 1,
					user_id: this.$store.getters.userId
				}
				this.$prompt.showLoadingMsg();
				this.$api.user.appointmentKnafang(params).then(res => {
					this.$prompt.hideToast();
					this.$prompt.showMsg('预约成功')

				}).catch(err => {
					that.$prompt.hideToast();
					that.$prompt.showMsg(err.message)
				})
			},
			navToDetail(item) {
				// #ifdef MP-WEIXIN
				let that = this;

				if (check_login()) {
					console.log("requestSubscribeMessage1");
					that.$api.main.has_valid_sub_weixin_msg({
						open_id: that.$store.getters.openId
					}).then(resData => {

						if (resData.data == "0") {
							var tmplIds1 = 'ynn46UzpmvvtMt8p3qtNhg0qJI-xMxphWGTH-i_qRNs';
							var tmplIds2 = 'DYJXqUT4qZKU61Ozd8Rze9FO9yYaXvwiQiAjXxMeWJ8';
							wx.requestSubscribeMessage({
								tmplIds: [tmplIds1, tmplIds2],
								success(res) {
									console.log("requestSubscribeMessage2", res);
									if (res.errMsg == 'requestSubscribeMessage:ok') {
										console.log(123)
										console.log('type', typeof res)

										var msg_type = '';
										for (const key in res) {
											console.log('res[key]', key, '123', res[key])
											if (key == tmplIds1 && res[key] == 'accept') {
												console.log(456)
												msg_type += '活动提醒'
											}
											if (key == tmplIds2 && res[key] == 'accept') {
												msg_type += '咨询通知'
											}
										}
										if(msg_type!=''){
											that.$api.main.sub_weixin_msg({
												open_id: that.$store.getters.openId,
												msg_type: msg_type
											}).then(resData => {})
										}
										
									}
								},
								fail(res) {
									console.log("requestSubscribeMessage3", res);
								}
							})
						}

					})



				}

				// #endif
				this.$navTo('project_index', {
					id: item.id
				});

			}
		}
	}
</script>


<style>
</style>
