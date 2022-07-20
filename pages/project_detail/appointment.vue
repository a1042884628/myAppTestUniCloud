<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">预约楼盘</view>
				<text>{{projectName}}</text>
			</view>
			<view class="cu-form-group">
				<view class="title" >姓名</view>
				<input placeholder="请输入姓名" style="text-align: right;" name="input" v-model="userName"></input>	
			</view>
			<view class="cu-form-group">
				<view class="title" >手机号</view>
				<input placeholder="请输入手机号" type="number" name="input" style="text-align: right;" v-model="mobile"></input>
			</view>
<!-- 			<view class="cu-form-group">
				<view class="title">预约时间</view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="dateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预约日期</view>
				<picker :range="appointmentTimeArr" :value="appointmentTimeIndex" @change="appointmentTimeChange">
					<view class="picker">
						{{appointmentTimeArr[appointmentTimeIndex]}}
					</view>
				</picker>
			</view> -->
			<view class="cu-form-group">
				<view class="title">预约人数</view>
				<picker :range="peopleNumPickerArr" :value="peopleNumPickerindex" @change="peopleNumChange">
					<view class="picker">
						{{peopleNumPickerArr[peopleNumPickerindex]}}
					</view>
				</picker>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn margin-tb-sm lg" @click="submit">立即预约</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {dateFormat,checkPh} from '../../utils/index.js'

	export default {
		data(){
			const currData  =	dateFormat(new Date(new Date().getTime()+24*60*60*1000) ,'yyyy-MM-dd') 
			return {
				id:0,
				projectName:"",
				userName:"",
				mobile:"",
				date:currData,
				peopleNumPickerindex:0,
				peopleNumPickerArr: ['1人', '2人', '3人','4人','4人以上'],
				appointmentTimeArr:[],
				appointmentTimeIndex:0,
			}
		},
		computed:{
			startDate(){
				return dateFormat(new Date() ,'yyyy-MM-dd') 
			},
			endDate(){
				let endDate = new Date()
				endDate.setMonth(endDate.getMonth()+6);
				return dateFormat(endDate,'yyyy-MM-dd')
			}
		},
		onLoad(options) {
			if(options.id && options.name){
				this.id= options.id;
				this.projectName= decodeURIComponent(options.name);
				this.getAppointmentTime()
			}else{
				this.$prompt.showMsg('数据异常');
				setTimeout(()=>{
					uni.navigateBack()
				},1500)
			}
		},
		methods:{
			async getAppointmentTime(){
				let resData = await this.$api.main.getSystemConfig({name:"预约时间段",project_id:this.id})
				this.appointmentTimeArr = resData.data
			},
			peopleNumChange(e) {
				this.peopleNumPickerindex = e.detail.value
			},
			dateChange(e){
				this.date = e.detail.value
			},
			appointmentTimeChange(e){
				this.appointmentTimeIndex = e.detail.value
			},
			submit(){
				if(!this.userName){
					this.$prompt.showMsg('请填写姓名');
					return
				}
				if(!this.mobile){
					this.$prompt.showMsg('请填写手机号');
					return
				}
				if(!checkPh(this.mobile)){
					this.$prompt.showMsg('请填写正确的手机号');
					return
				}
				
				let params ={
					project_id:this.id,
					real_name:this.userName,
					visit_date:this.date,
					visit_time:this.appointmentTimeArr[this.appointmentTimeIndex],
					phone:this.mobile,
					person_num:this.peopleNumPickerArr[this.peopleNumPickerindex],
					user_id:this.$store.getters.userId
				}
				this.$api.user.appointmentKnafang(params).then(res=>{
					this.$prompt.showMsg('操作成功')
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				}).catch(err=>{
					uni.showModal({
					    title: '提示',
					    content: err.message,
						showCancel:false
					});
				})
			}
		}
	}
</script>

<style>
	.cu-btn {
		color: #ffffff !important;
		font-size: 30upx;
		background-image: linear-gradient( #ff9c2a, #ffae51);
	}
	.cu-btn::after {
		border: 0;
	}
</style>
