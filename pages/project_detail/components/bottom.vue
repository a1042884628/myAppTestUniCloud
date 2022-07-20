<template>
	<view class="house_bottom_box">
		<view class="hbb_left">
			<view class="hbb_sc" :class="{hbb_sc_on:favorite}"  @click="doFavorite">

			</view>
			<view class="hbb_pl" @click="this.$navTo('project_comment',{project_id:projectId})">

			</view>
		</view>
		<view class="hbb_right">
			<view class="hbb_tuangou" @click="appointment()">
				<text>预约看房</text>
			</view>
			<view class="hbb_contact" @click="this.$navTo('project_saleman',{project_id:projectId})">
				<text>联系顾问</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {check_login} from '@/utils/user.js'
	export default {
		props: {
			isFavorite:{
				type:Number,
				default:0
			},
			projectId:{
				type:Number,
				default:0
			},
			project_name:{
				type:String,
				default:''
			},
		},
		data() {
			return {
				favorite : 0
			}
		},
		watch: {
			isFavorite(val){
				this.favorite = val
			}
		},
		methods: {
			doFavorite(){
				if(!check_login()){
					this.$navTo('login')
					return 
				}
				
				let params = {
					ty:'项目',
					user_id:this.$store.getters.userId,
					record_id:this.projectId,
					is_cancel:this.favorite
				}
				this.$api.user.favorite(params).then(res=>{
					if(this.favorite == 0){
						this.favorite = 1
					}else{
						this.favorite = 0
					}
				})
				
			},
			appointment(){
				// console.log("appointment",this.projectId,this.project_name)
				// this.$navTo('appointment',{id:this.projectId,name:this.project_name})
				if(!check_login()){
					this.$navTo('login')
					return 
				}
				let that=this;
				let params ={
					project_id:this.projectId,
					real_name:this.$store.getters.realName,
					visit_date:"",
					visit_time:"",
					phone:this.$store.getters.mobile,
					person_num:1,
					user_id:this.$store.getters.userId
				}
				this.$prompt.showLoadingMsg();
				this.$api.user.appointmentKnafang(params).then(res=>{
					this.$prompt.hideToast();
					this.$prompt.showMsg('预约成功')
				
				}).catch(err=>{
					this.$prompt.hideToast();
					that.$prompt.showMsg(err.message)
				})
			},
		}
	}
</script>

<style>

</style>
