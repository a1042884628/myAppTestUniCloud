<template>
	<scroll-view scroll-y class="container" @scrolltolower="getProject()">
		<view class="list_search">
			<view class="search_box">
				<input class="search_input" type="text" placeholder="输入查询内容"  v-model="key_word"/>
			</view>
			<view class="search_btn" @click="search()">
				搜索
			</view>
			<view class="select_wrap">
				<search-con @confirm="confirm()" id="search_con" ref="search_con" ></search-con>
			</view>
		</view>
		
		<view class="search_list">
			
			<project-item v-for="(item,index) in projectList" :key="item.id" :project="item"></project-item>
			<load-more :status="loadingType"></load-more>

		</view>


		</scroll-view>
</template>

<script>
	import projectItem from '../project_list/components/project_item.vue'
	import {
		webHost
	} from '../../global/config.js'
	import {
		check_login
	} from "@/utils/user.js"
	export default {
		components: {
			projectItem,
		},
		data() {
			return {
				loadingType: "more",
				pageindex: 1,
				pagesize: 20,
				total: 0,
				projectList: [],
				
				longitude: '',
				latitude: '',
				key_word:'',
				nearby:'',
				open_date:'',
				tags: '',
				region_name:'',
			}
		},
		onLoad(options) {
			if(options.key_word)
			{
				this.key_word= decodeURIComponent(options.key_word);
			}
			if(options.tags)
			{
				this.tags= decodeURIComponent(options.tags);
			}			
			this.getProject();
		},
		computed: {},
		methods: {
			confirm(e) {
				
				let that=this;
				this.loadingType = "more";
				this.pageindex = 1;
				this.pagesize = 20;
				this.total = 0;
				this.projectList = [];
			
				let needLocation = false;
				let tags = '';
				this.nearby='';
				this.region_name='';
				this.open_date='';
				for (var i = 0; i < e.length; i++) {
					if (e[i].name == "附近" && e[i].value.length>0) {
						this.nearby = e[i].value[0];
						needLocation = true;
					}else if (e[i].name == "区域" && e[i].value.length>0) {
						this.region_name = e[i].value[0];
					} else if (e[i].name == "开盘时间" && e[i].value.length>0) {
						this.open_date = e[i].value[0];
					} else if (e[i].value.length>0) {
						tags = tags + e[i].value.join(',') + ',';
					}
				}
				this.tags = tags;
				if(needLocation && this.latitude=='') {
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
			getProject() {
				if (this.loadingType === "loading" || this.loadingType === 'nomore') {
					return
				}
				let that=this;
				this.loadingType = 'loading';
				const params = {
					pageindex: this.pageindex++,
					pagesize: this.pagesize,
					key_word:this.key_word,
					tags: this.tags,
					longitude: this.longitude,
					latitude: this.latitude,
					nearby: this.nearby,
					open_date: this.open_date,
					region_name:this.region_name,
					guid:this.$store.getters.guid
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				this.$api.main.getProjectList(params).then(resData => {
					this.projectList = this.projectList.concat(resData.data.rows)

					this.total = resData.data.total;
					this.loadingType = Math.ceil(this.total / this.pagesize) >= this.pageindex ? 'more' : 'nomore';

					console.log(this.projectList)
				}).catch(errData=>{
					that.loadingType = "more";
				})
			},
			search()
			{
				this.loadingType = "more";
				this.pageindex = 1;
				this.pagesize = 20;
				this.total = 0;
				this.projectList = [];
				
				this.getProject();
			}

		}


	}
</script>

<style>
	page {
		height: 100%;
	}
.container {
	height: 100%;
}
.list_search {
	padding: 20upx 30upx 0 30upx;
}
.select_box {
	position: static;
}
.select_box .select_nav {
	border-bottom: 0;
}
</style>
