<template>
	<view class="container">
		<search-land-con @confirm="confirm()"></search-land-con>
		<view class="map_box">
			<map id="map" ref="map" scale="14" layer-style="1" enable-satellite=true showLocation=true  :markers="markers"
				style="width: 100%;flex:1; height: 100%;" @markertap="markertap" @callouttap="labeltap"  @labeltap="labeltap" :longitude="longitude" :latitude="latitude">
			</map>
		</view>
		<view class="tupai_tabs">
			<view class="tt_item" :class="{tt_item_on:type==''}" @click="changeType('')">
				<text>所有</text>
			</view>
			<view class="tt_item" :class="{tt_item_on:type=='商业'}" @click="changeType('商业')">
				<text>商业</text>
			</view>
			<view class="tt_item" :class="{tt_item_on:type=='住宅'}" @click="changeType('住宅')">
				<text>住宅</text>
			</view>
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
				longitude:'117.120128',
				latitude:'36.652069',
				land_name:'',
				status:'',
				region_name:'',
				type:'',
				markers:[],
			}
		},
		onLoad(options) {
			this.map = uni.createMapContext("map", this);
			let that=this;
			uni.getLocation({
				type: "gcj02",
				success: function(t) {
					that.longitude = t.longitude
					that.latitude = t.latitude
				},
				fail: function(e) {
				},
				complete: function(e) {
				}
			});
			
			this.getland();

		},
		methods: {
			getland() {
				const params = {
					pageindex: 1,
					pagesize: 10000000,
					land_name:this.land_name,
					status:this.status,
					region_name:this.region_name,
					type:this.type
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				
				this.$api.main.getLandlist(params).then(resData => {
					let landlist = resData.data.rows;
					let markers = [];
					for (var i = 0; i < landlist.length; i++) {
						let land = landlist[i];
						let marker = {
							id: land.id,
							width: 10,
							height: 15,
							alpha:0.5,
							// joinCluster: true, // 指定了该参数才会参与聚合
							callout: {
								content: land.land_name,
								borderWidth: 0,
								borderRadius: 5,
								padding:5,
								bgColor: '#038cff',
								color: '#ffffff',
								display: 'ALWAYS',
							},
							latitude: land.latitude,
							longitude: land.longitude,
						};
						markers.push(marker);
					}
					this.markers=markers;
					console.log("markers",this.markers)
					if(this.markers.length>0 && this.region_name=="")
					{
						this.longitude=this.markers[0].longitude;
						this.latitude=this.markers[0].latitude;
					}
					// this.map.addMarkers({
					// 	markers,
					// 	clear: false,
					// 	complete(res) {
					// 		console.log('addMarkers', res)
					// 	}
					// })

				
				})
			},
			changeType(type)
			{
				this.type=type;
				this.getland();
			},
			confirm(e) {
				console.log(e);
				this.land_name='';
				this.status='';
				this.region_name='';
				for (var i = 0; i < e.length; i++) 
				{
					if(e[i].name=="区域" && e[i].value.length>0)
					{
						this.region_name=e[i].value[0];
						this.latitude=e[i].ext_data[0].latitude;
						this.longitude=e[i].ext_data[0].longitude;
					}
					else if(e[i].name=="状态" && e[i].value.length>0)
					{
						this.status=e[i].value[0];
					}
					else if(e[i].name=="名称" && e[i].value.length>0)
					{
						this.land_name=e[i].value[0];
					}
				}
				this.getland();

			},
			markertap(e) {
				var id=e.detail.markerId;
				this.$navTo('tupai_details',{id:id});
				// console.log(e)
			},
			labeltap(e) {
				var id=e.detail.markerId;
				this.$navTo('tupai_details',{id:id});
				// console.log(e)
			}
		}
	}
</script>

<style>

</style>
