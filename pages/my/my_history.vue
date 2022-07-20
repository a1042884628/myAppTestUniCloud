<template>
	<view class="container">
		<scroll-view class="my_history_list" @scrolltolower="getProject()">
			
			
			<project-item v-for="(item,index) in projectList" :key="item.id" :project="item"></project-item>
			<load-more :status="loadingType"></load-more>
			
		</scroll-view>
	</view>
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
					channel: 'look_hisory',
					user_id:this.$store.getters.userId
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
<style lang="scss">

</style>
