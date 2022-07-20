<template>
	<view class="container">
		<view class="zf_text">
			<text>请输入您期望的房子信息</text>
		</view>
		<view class="zf_item" v-for="(branch,index) in tags" :key="branch.name">
			<view class="zf_title">
				<text>{{branch.name}}</text>
			</view>
			<view class="zf_select">
				<view class="zf_option" @click="clear_branch(branch)" :class="{'selected':!branch.selected}">
					不限
				</view>
				<view class="zf_option" :class="{'selected':node.selected}" @click="toggle(node,branch)" v-for="(node,index2) in branch.items" :key="node.name">
					{{node.name}}
				</view>
			</view>
		</view>
		

		<view class="zf_btn" @click="search">
			<button type="default">立即找房</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tags:[],
			}
		},
		onLoad() {
			this.getTags();
		},
		onShow() {
	
		},
		computed:{
			hasTag(){
				return function(tag)
				{
					return false;
				}
			}
		},
		methods: {
			navTo(path,param){
				this.$navTo(path,param)
			},
			getTags() {
				let tags=new Array(4);
				
				this.$api.main.getProjectTags({}).then(resData => {
					
					let regionArr=[];
					for (var i = 0; i < resData.data.region.length; i++) {
						let r=resData.data.region[i];
						regionArr.push({
							name:r.region_name,
							value:r.region_name,
							selected:false
						})
						
					}
					tags[0]={name:"您想买的区域是？",items:regionArr,selected:false};
					
					let tagsArr=[];
					for (var i = 0; i < resData.data.tags_list.length; i++) {
						let item=resData.data.tags_list[i];
						if(item.name=="总价范围标签")
						{
							tagsArr=this.getBranch(item);
							tags[1]={name:"您期望的房屋总价？",items:tagsArr,selected:false};
						}
						else if(item.name=="户型户数标签")
						{
							tagsArr=this.getBranch(item);
							tags[2]={name:"您想买什么户型？",items:tagsArr,selected:false};
						}						
						else if(item.name=="找房标签")
						{
							tagsArr=this.getBranch(item);
							tags[3]={name:"特殊要求？",items:tagsArr,selected:false};
						}
						
					}
					this.tags=tags;
					console.log(this.tags)
			
				})
			},
			getBranch(item)
			{
				let tagArr=item.cont.split(',');
				let retArr=[];
				for (var i = 0; i < tagArr.length; i++) {
					retArr.push({
						name:tagArr[i],
						value:tagArr[i],
						selected:false
					})
				}
				return retArr;
			},
			clear_branch(branch)
			{
				for (var i = 0; i < branch.items.length; i++) {
					branch.items[i].selected=false;
				}
				branch.selected=false;
			},
			toggle(node,branch)
			{
				node.selected=!node.selected;
				branch.selected=false;
				for (var i = 0; i < branch.items.length; i++) {
					if(branch.items[i].selected)
					{
						branch.selected=true;
						break;
					}
				}
			},
			
			search()
			{
				let tagsArr=[];
				for (var i = 0; i < this.tags.length; i++) {
					let branch=this.tags[i];
					for (var j = 0; j < branch.items.length; j++) {
						let node=branch.items[j];
						if(node.selected)
						{
							tagsArr.push(node.value);
							
						}
						
					}
				}
				
				this.navTo("search_list",{tags:tagsArr.join(',')});
			}
			
		}
	}
</script>

<style>
	
</style>
