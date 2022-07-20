<template>
	<view class="h_section pd20">
		<view class="hs_title">
			<text>楼盘配套</text>
			<text></text>
		</view>
	
		<view class="h_map_box">
			
			<map id="map" ref="map" @callouttap="toMap(0)"  :enable-scroll="false" :enable-zoom="false" :latitude="basicData.latitude" :longitude="basicData.longitude" :scale='14' :markers="markers" style="width: 100%;flex:1; height: 100%;" ></map>
		
		</view>
	
		<view class="h_peitao_box">
			<view class="hp_tab">
				<text @click="toMap(0)">交通</text>
				<text @click="toMap(1)">教育</text>
				<text @click="toMap(2)">医疗</text>
				<text @click="toMap(3)">商业</text>
			</view>
		</view>
	
	
	</view>
</template>

<script>
	export default {
		props: {
			basicData: {
				type: Object,
				default: {}
			},
			projectId: ''
		},
		data() {
			return {
				longitude:"",
				latitude:"",
				name:"",
				markers:[]
			}
		},
		watch: {
			basicData(val){
				this.longitude = this.basicData.longitude
				this.latitude = this.basicData.latitude
				this.name = this.basicData.project_name
				this.markers =[
					{
						id:0,
						latitude:this.latitude,
						longitude:this.longitude,
						iconPath:"",
						width:1,
						height:1,
						callout: {
						    latitude: this.latitude,
						    longitude: this.longitude,
						    content: this.name,
						    borderRadius: 20,
						    borderWidth: 1,
						    borderColor: "#fff",
						    bgColor: "#fff",
						    padding: 10,
						    display: "ALWAYS",
						    textAlign: "center"
						}
					}
				]
			}
		},
		methods: {
			toMap( index ){
				let pageParams = {
					id:this.projectId,
					name:this.name,
					latitude:this.latitude,
					longitude:this.longitude,
					activiIndex:index
				}
				this.$navTo('project_peitao_map',pageParams)
			},
		}
	}
</script>

<style>

</style>
