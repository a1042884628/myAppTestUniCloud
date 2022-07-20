<template>
	<scroll-view scroll-y class="container" @scrolltolower="getProject()">
		<view class="tejia_list">
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
				projectList: []
			}
		},
		onLoad(options) {
			this.getProject();
		},
		computed: {},
		methods: {
			getProject() {
				if (this.loadingType === "loading" || this.loadingType === 'nomore') {
					return
				}

				this.loadingType = 'loading';
				const params = {
					pageindex: this.pageindex++,
					pagesize: this.pagesize,
					channel: 'vr',
					// company_id:getApp().globalData.company_id,
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
