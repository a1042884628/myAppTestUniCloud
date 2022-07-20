<template>
	<view class="container">
		<view class="h_type_tab">
			<view class="htt_item" :class="{on:type=='楼盘'}" @click="type='楼盘'"><text>楼盘</text></view>
<view class="htt_item" :class="{on:type=='户型'}" @click="type='户型'"><text>户型</text></view>
</view>
		<scroll-view class="list-scroll-content sc_box" scroll-y @scrolltolower="getHouseType()" v-show="type=='户型'">
			<view class="sc_h_type_item" v-for="(item,index) in house_type.house_type_list" :key="item"
				@click="this.$navTo('house_type_detail',{id:item.id})">
				<view class="sc_h_type_img">
					<image :src="item.pic_url" mode="widthFix"></image>
				</view>
				
				<view class="sc_h_type_text">
					<view class="sc_h_type_1">
						<text>{{item.name}}</text>
					</view>
					<view class="sc_h_type_2">
						<text>{{item.area}}m²</text>
						<text>{{item.towards}}</text>
					</view>
					<view class="sc_h_tags">
					    <text class="sc_h_itag" v-for="(tag,tagIndex) in item.tags" :key="tag.name">{{tag.name}}</text>
					</view>
					<view class="sc_h_type_3">
						<text>￥{{item.price_about}}/m²</text>
					</view>
				</view>
			</view>
			<load-more :status="house_type.loadingType"></load-more>
		</scroll-view>


		<scroll-view class="my_collection_list sc_box" @scrolltolower="getProject()"  scroll-y v-show="type=='楼盘'">
			<project-item v-for="(item,index) in project.projectList" :key="item.id" :project="item"></project-item>
			<load-more :status="loadingType"></load-more>
		</scroll-view>

	</view>
</template>
<script>
	import projectItem from '../project_list/components/project_item.vue'
	export default {
		components: {
			projectItem,
		},
		data() {
			return {
				type:'楼盘',
				house_type: {
					loadingType: "more",
					pageindex: 1,
					pagesize: 20,
					total: 0,
					house_type_list: []
				},
				project: {
					loadingType: "more",
					pageindex: 1,
					pagesize: 20,
					total: 0,
					projectList: []
				}
			}
		},
		onShow() {
			this.house_type={
				loadingType: "more",
				pageindex: 1,
				pagesize: 20,
				total: 0,
				house_type_list: []
			},
			this.project= {
				loadingType: "more",
				pageindex: 1,
				pagesize: 20,
				total: 0,
				projectList: []
			}
			
			if(this.$store.getters.userId>0)
			{
				this.getHouseType();
				this.getProject();				
			}

		},
		methods: {
			async getHouseType() {

				if (this.house_type.loadingType === "loading" || this.house_type.loadingType === 'nomore') {
					return
				}

				this.house_type.loadingType = 'loading';
				const params = {
					pageindex: this.house_type.pageindex++,
					pagesize: this.house_type.pagesize,
					user_id: this.$store.getters.userId
				}
				let resData = await this.$api.user.getFavoriteList(params);
				this.house_type.house_type_list = this.house_type.house_type_list.concat(resData.data.rows)
				this.house_type.total = resData.data.total;
				this.house_type.loadingType = Math.ceil(this.house_type.total / this.house_type.pagesize) >= this
					.house_type.pageindex ? 'more' : 'nomore';
			},
			getProject() {
				if (this.project.loadingType === "loading" || this.project.loadingType === 'nomore') {
					return
				}

				this.project.loadingType = 'loading';
				const params = {
					pageindex: this.project.pageindex++,
					pagesize: this.project.pagesize,
					channel: 'favourate',
					user_id: this.$store.getters.userId
					// company_id:getApp().globalData.company_id,
				}

				this.$api.main.getProjectList(params).then(resData => {
					this.project.projectList = this.project.projectList.concat(resData.data.rows)

					this.project.total = resData.data.total;
					this.project.loadingType = Math.ceil(this.project.total / this.project.pagesize) >= this
						.project.pageindex ? 'more' : 'nomore';
				})
			}
		}
	}
</script>
<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}
	.container {
		width: 100%;
		height: 100%;
	}
	.sc_box {
		width: 100%;
		height: 100%;
		padding-top: 100upx;
	}
	.h_type_tab {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
		margin-top: 20upx;
		margin-bottom: 20upx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 111;
		background: #ffffff;
		border-bottom: 2upx solid #f5f5f5;
	}
	.h_type_tab .htt_item {
		flex: 1;
		color: #000000;
		text-align: center;
	}
	.h_type_tab .htt_item.on text {
		display: inline-block;
		color: #ee8f21;
		border-bottom: 4upx solid #ee8f21;
		padding-bottom: 10upx;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	
	.sc_h_type_item {
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding: 35upx 30upx;
		display: flex;
		border-bottom: 2upx solid #f2f2f2;
	}
	.house_item {
		padding-left: 30upx;
		padding-right: 30upx;
		box-sizing: border-box;
	}
	.sc_h_type_img {
		width: 230upx;
		height: 175upx;
		display: block;
		margin-right: 30upx;
		border-radius: 10upx;
		overflow: hidden;
		position:relative;
	
	}
	.sc_h_type_img image {
		width:100%;
		height: 100%;
		object-fit: cover;
		border-radius: 10upx;
	}
	.sc_h_type_text {
		flex: 1;
		overflow: hidden;
	}
	.sc_h_type_1 {
		width: 100%;
		height: 40upx;
		font-size: 35upx;
		line-height: 46upx;
		font-weight: bold;
		overflow: hidden;
	}
	.sc_h_type_2 {
		width: 100%;
		overflow: hidden;
		color: #9399A5;
		font-size: 30upx;
		margin-top: 6upx;
	}
	.sc_h_type_2 text {
		margin-right: 20upx;
	}
	.sc_h_type_3 {
		width: 100%;
		overflow: hidden;
		color: #f34b1f;
		margin-top: 6upx;
	}
	.sc_h_tags {
	    display: table;
	}
	
	.sc_h_itag {
	    background: rgba(245,247,250,1);
	    border-radius: 10upx;
	    margin: 6upx 6upx 6upx 0;
	    float: left;
	    height: 40upx;
	    line-height: 40upx;
	    padding: 0 10upx;
	    color: #9399A5;
	    font-size: 22upx;
	}
</style>
