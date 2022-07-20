<template>
	<view class="container">
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
<!-- enable-traffic=true -->
		<view class="map_box">
			<map id="map" ref="map" scale="14" layer-style="1" enable-satellite=true showLocation=true :markers="markers"
				style="width: 100%;flex:1; height: 100%;" @markertap="markertap" @callouttap="labeltap" @labeltap="labeltap" :longitude="map_longitude" :latitude="map_latitude">
			</map>
		</view>
	</view>
</template>

<script>
	import {
		webHost
	} from '../../global/config.js'
	export default {
		data() {
			return {
				map: '',
				map_longitude:'117.120128',
				map_latitude:'36.652069',
				longitude: '',
				latitude: '',
				key_word:'',
				nearby:'',
				open_date:'',
				tags: '',
				region_name:'',
				markers:[],
			}
		},
		onLoad(options) {
			console.log("onLoad")
			this.map = uni.createMapContext("map", this);
			
			let that=this;
				uni.getLocation({
					type: "gcj02",
					success: function(t) {
						that.map_longitude = t.longitude
						that.map_latitude = t.latitude
						// that.longitude = t.longitude
						// that.latitude = t.latitude
					},
					fail: function(e) {

					},
					complete: function(e) {
						
					}
				});
				that.getProject();
		},
		methods: {
			getProject() {
				const params = {
					pageindex: 1,
					pagesize: 10000000,
					key_word:this.key_word,
					tags: this.tags,
					longitude: this.longitude,
					latitude: this.latitude,
					nearby: this.nearby,
					open_date: this.open_date,
					region_name:this.region_name,
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
					
				}

				this.$api.main.getProjectList(params).then(resData => {
					let projectList = resData.data.rows;
					let markers = [];
					for (var i = 0; i < projectList.length; i++) {
						let project = projectList[i];
						let lat=project.latitude?parseFloat(project.latitude):0
						let lng=project.longitude?parseFloat(project.longitude):0
						let marker = {
							id: project.id,
							width: 10,
							height: 15,
							alpha:0.5,
							// joinCluster: true, // 指定了该参数才会参与聚合
							callout: {
								content: project.project_name,
								borderWidth: 0,
								borderRadius: 5,
								padding:5,
								bgColor: '#038cff',
								color: '#ffffff',
								display: 'ALWAYS',
							},
							latitude: lat,
							longitude: lng,
						};
						markers.push(marker);

					}
					
					this.markers=markers;
					console.log("markers",this.markers)
					if(this.markers.length>0 && this.region_name=="")
					{
						this.map_longitude=this.markers[0].longitude;
						this.map_latitude=this.markers[0].latitude;
					}
					// this.map.addMarkers({
					// 	markers,
					// 	clear: true,
					// 	complete(res) {
					// 		console.log('addMarkers', res)
					// 	}
					// })

				
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
			},
			
			confirm(e) {
				console.log(e)
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
						this.map_latitude=e[i].ext_data[0].latitude;
						this.map_longitude=e[i].ext_data[0].longitude;
					}  else if (e[i].name == "开盘时间" && e[i].value.length>0) {
						this.open_date = e[i].value[0];
					} else if (e[i].value.length>0) {
						tags = tags + e[i].value.join(',') + ',';
					}
				}
				this.tags = tags;
				if (needLocation && that.longitude=='' && that.latitude=='') {
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
			markertap(e) {
				var projectId=e.detail.markerId;
				this.$navTo('project_index',{id:projectId});
				// console.log(e)
			},
			labeltap(e) {
				var projectId=e.detail.markerId;
				this.$navTo('project_index',{id:projectId});
				// console.log(e)
			}
		}
	}
</script>

<style>
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
