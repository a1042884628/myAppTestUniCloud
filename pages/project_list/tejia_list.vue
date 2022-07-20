<template>
	<scroll-view scroll-y class="container" @scrolltolower="getProject()">
		<view class="tejia_list">
			<project-item v-for="(item,index) in projectList" :key="item.id" :project="item" :showRoom="true"></project-item>
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
				tags: '',
			}
		},
		onLoad(options) {
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
				for (var i = 0; i < e.length; i++) {
					if (e[i].name == "附近") {
						this.nearby = e[i].value[0];
						needLocation = true;
					} else if (e[i].name == "开盘时间" && e[i].value.length>0) {
						this.open_date = e[i].value[0];
					} else if (e[i].value.length>0) {
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
			getProject() {
				if (this.loadingType === "loading" || this.loadingType === 'nomore') {
					return
				}

				this.loadingType = 'loading';
				const params = {
					pageindex: this.pageindex++,
					pagesize: this.pagesize,
					channel: 'promotion_room',
					tags: this.tags,
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				this.$api.main.getProjectList(params).then(resData => {
					this.projectList = this.projectList.concat(resData.data.rows)

					this.total = resData.data.total;
					this.loadingType = Math.ceil(this.total / this.pagesize) >= this.pageindex ? 'more' : 'nomore';

					console.log(this.projectList)
				})
			}
		},

	}
</script>

<style>
	page {
		height: 100%;
	}
.container {
	height: 100%;
}
</style>
