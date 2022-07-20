<template>
	<view>
		<view class="house_info pd20">
			<view class="house_title">
				<text>{{basicData.project_name}}</text>
			</view>
			<view class="house_follow">
				<text @click="showShare">
				</text>
			</view>
			<view class="house_tags">
				<text v-for="(tag,i) in basicData.tags" :key="tag">{{tag.name}}</text>
			</view>

			<view class="house_item_views">
				<view class="hi_views_list">
					<view class="hiv_img" v-for="(star,i) in basicData.stars" :key="star">
						<image :src="star.avatar" mode="widthFix"></image>
					</view>
					
				</view>
				<view class="hi_views_num">
					<text>{{basicData.views || 0}}人围观</text>
				</view>
			</view>
		</view>


		<view class="house_info_2 pd20">
			<view class="h_price">
				<uni-tooltip :content="basicData.price_about">
					<view class="h_value">
						<text>{{basicData.price_about}}</text>
						<!-- <text>元/m²</text> -->
					</view>
					<view class="h_text">
						<text>参考单价</text>
					</view>
				</uni-tooltip>
			</view>
			<view class="h_type">
				<view class="h_value">
					<text>住宅</text>
				</view>
				<view class="h_text">
					<text>产品类型</text>
				</view>
			</view>
			<view class="h_area">
				<uni-tooltip :content="basicData.room_area_about">
					<view class="h_value">
						<text>{{basicData.room_area_about}}</text>
						<text>m²</text>
					</view>
					<view class="h_text">
						<text>面积区间</text>
					</view>
				</uni-tooltip>
			</view>
		</view>

		<view class="house_info_3 pd20">
			<view class="h_address">
				<text>{{basicData.address}}</text>
			</view>
			<view class="h_detailed">
				<view class="hd_item">
					<text>装修标准</text>
					<text>{{getInfo('装修标准')}}</text>
				</view>
				<view class="hd_item">
					<text>产权年限</text>
					<text>{{getInfo('产权年限')}}</text>
				</view>
				<view class="hd_item">
					<text>绿化率</text>
					<text>{{getInfo('绿化率')}}</text>
				</view>
				<view class="hd_item">
					<text>容积率</text>
					<text>{{getInfo('容积率')}}</text>
				</view>
			</view>
			<view class="h_detailed_more" @click="this.$navTo('project_info',{id:projectId})">
				<text>查看更多楼盘信息</text>
			</view>
		</view>
		<share-action ref="shareAction"></share-action>
	</view>
</template>

<script>
	import shareAction from '@/components/shareAction/index.vue'
	export default {
		components: {
			shareAction
		},
		props: {
			basicData: {
				type: Object,
				default: {}
			},
			projectId: ''
		},
		data() {
			return {
				extendInfo: [],
			}
		},
		computed: {
			getInfo() {
				return function(name) {
					for (var i = 0; i < this.extendInfo.length; i++) {
						if (this.extendInfo[i].name == name) {
							return this.extendInfo[i].value;
						}
					}
					return "-";

				}
			}
		},
		watch: {
			basicData(data) {
				let infoArr = [];
				for (var i = 0; i < data.extendInfo.length; i++) {
					for (var j = 0; j < data.extendInfo[i].list.length; j++) {
						infoArr.push(data.extendInfo[i].list[j]);
					}
				}
				this.extendInfo = infoArr;
				
			}
		},
		methods: {
			showShare() {
				this.$refs.shareAction.isShowAction = true
			},
		}
	}
</script>

<style>

</style>
