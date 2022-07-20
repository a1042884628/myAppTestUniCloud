<template>
	<view class="select_box">
		<view class="select_nav">
			<view class="select_nav_item" :class="{ selected: searchData.region.select }" @click="tabClick(searchData.region)">
				<text>区域</text>
			</view>
			<view class="select_nav_item" :class="{ selected: searchData.houseType.select }" @click="tabClick(searchData.houseType)">
				<text>户型</text>
			</view>
			<view class="select_nav_item" :class="{ selected: searchData.price.select }" @click="tabClick(searchData.price)">
				<text>价格</text>
			</view>
			<view class="select_nav_item" :class="{ selected: searchData.other.select }" @click="tabClick(searchData.other)">
				<text>更多</text>
			</view>
		</view>

		<view class="select_section" v-show="searchData.select">
			<!--区域部分-->
			<view class="select_s_main" v-show="searchData.region.select">
				<view class="select_s_left">
					<text :class="{ selected: item.select }" v-for="(item, index) in searchData.region.items"   @click="oneSelectClick(searchData.region.items,index)">{{item.name}}</text>
				</view>

				<view v-for="(item, index) in searchData.region.items"  class="s_r" v-show="item.select">
					<view class="select_s_right" v-if="!item.child">
						<text v-for="(item2, index2) in item.items"  :class="{ selected: item2.select }" @click="oneSelectClick(item.items,index2)">{{item2.name}}</text>
					</view>
					
					<view class="select_s_right2" v-if="item.child">
						<view class="ssr_a">
							<text v-for="(item2, index2) in item.items"  :class="{ selected: item2.select }" @click="oneSelectClick(item.items,index2)">{{item2.name}}</text>
						</view>

						<view class="ssr_b"  v-for="(item2, index2) in item.items"  v-show="item2.select" v-if="item2.items.length>0">
							<checkbox-group @change="checkboxChange($event,item2.items)">
								<label v-for="(item3, index3) in item2.items" >
									<text>{{item3.name}}</text>
									<checkbox :value="item3.name" :checked="item3.select"/>
								</label>
								
							</checkbox-group>
						</view>

					</view>				
				</view>
			</view>


			<!--户型部分-->
			<view class="select_s_main" v-show="searchData.houseType.select"> 
				<view class="ssm_box" v-for="(item, index) in searchData.houseType.items" >
					<view class="ssm_title">
						<text>{{item.name}}</text>
					</view>
					<view class="ssm_list">
						<view v-for="(item2, index2) in item.items"  :class="{ selected: item2.select }" @click="oneSelectClick(item.items,index2)" class="ssm_item">{{item2.name}}</view>

					</view>
				</view>
			</view>

			<!--价格部分-->
			<view class="select_s_main" v-show="searchData.price.select">
				<view class="select_s_left">
					<text :class="{ selected: item.select }" v-for="(item, index) in searchData.price.items"  @click="oneSelectClick(searchData.price.items,index)">{{item.name}}</text>
				</view>
				<view class="select_s_right" v-for="(item, index) in searchData.price.items"  v-show="item.select">
					<text v-for="(item2, index2) in item.items"  :class="{ selected: item2.select }" @click="oneSelectClick(item.items,index2)">{{item2.name}}</text>
				</view>
				
			</view>


			<!--更多部分-->
			<view class="select_s_main select_s_main2" v-show="searchData.other.select">
				
				
				<view class="ssm_box" v-for="(item, index) in searchData.other.items" >
					<view class="ssm_title">
						<text>{{item.name}}</text>
					</view>
					<view class="ssm_list">
						<view v-html="item2.name" v-for="(item2, index2) in item.items"   :class="{ selected: item2.select }" @click="oneSelectClick(item.items,index2)" class="ssm_item"></view>

					</view>
				</view>


			</view>






			<view class="select_s_btn" v-show="searchData.select">
				<view class="select_s_btn_a">
					<button type="default" @click="clear()">清空</button>
				</view>
				<view class="select_s_btn_b">
					<button type="default" @click="confirm()">确定</button>
				</view>
			</view>
		</view>






	</view>
</template>

<script>
	export default {
		name: "search-con",
		props: {
		},
		data() {
			return {
				keyIndex:0,//自增的key
				tags_data:{},
				searchData: {
					select:false,
					region: {
						name: "区域",
						select: false,
						items:[
							{
								name: "区域",
								value: "区域",
								select: true,
								items: []
							},
							{
								name: "地铁",
								select: false,
								child:true,
								items: [{name: "不限",value: "",items: [],select: false},
									{name: "一号线",value: "一号线",select: false,items: []},
									{name: "二号线",value: "二号线",select: false,items: []},
									{name: "三号线",value: "三号线",select: false,items: []}
								]
							},
							{
								name: "附近",
								value: "附近",
								select: false,
								items: [{
										name: "1公里以内",
										value: "1公里以内",
										select: false
									},
									{
										name: "2公里以内",
										value: "2公里以内",
										select: false
									},
									{
										name: "3公里以内",
										value: "3公里以内",
										select: false
									},
									{
										name: "4公里以内",
										value: "4公里以内",
										select: false
									},
									{
										name: "5公里以内",
										value: "5公里以内",
										select: false
									}
								]
							}
						]
						
					},
					price: {
						name: "价格",
						select: false,
						items:[
							{
								name: "单价",
								value: "单价",
								select: true,
								items: []
							},
							{
								name: "总价",
								value: "总价",
								select: false,
								items: []
							}
						]
					},

					houseType: {
						name: "户型",
						select: false,
						items: [
							{
								name: "户型",
								select: false,
								items: []
							}
						]
						
					},
					other: {
						name: "其他",
						select: false,
						items:[
							{
								name: "房屋面积",
								value: "房屋面积",
								select: false,
								items: []
							},
								{
								name: "楼层高度",
								value: "楼层高度",
								select: false,
								items: []
							},
							{
								name: "装修标准",
								value: "装修标准",
								select: false,
								items: []
							},
							{
								name: "开盘时间",
								value: "开盘时间",
								select: false,
								items: [{
										name: "近期开盘",
										value: "近期开盘",
										select: false
									},
									{
										name: "未来三个月",
										value: "未来三个月",
										select: false
									},
									{
										name: "未来半年",
										value: "未来半年",
										select: false
									},
									{
										name: "过去三个月",
										value: "过去三个月",
										select: false
									},
									{
										name: "过去半年",
										value: "过去半年",
										select: false
									}
								]
							
							}
						]
					}
				}



			}
		},
		mounted() {
			 this.loadData();
		},

		watch: {
		},
		computed:{
		},
		methods: {
			loadData() {
				this.$api.main.getProjectTags({}).then(resData => {
					this.tags_data=resData.data;
					this.initSearchData();
				})
			},
			initSearchData()
			{
				let regionArr=[];
				for (var i = 0; i < this.tags_data.region.length; i++) {
					let r=this.tags_data.region[i];
					regionArr.push({
						name:r.region_name,
						value:r.region_name,
						select:false,
						ext_data:{
							longitude:r.longitude,
							latitude:r.latitude
						}
					})
					
				}
				this.searchData.region.items[0].items=regionArr;
				this.searchData.region.items[1].items[1].items=this.getNodeFromData("地铁一号线标签");
				this.searchData.region.items[1].items[2].items=this.getNodeFromData("地铁二号线标签");
				this.searchData.region.items[1].items[3].items=this.getNodeFromData("地铁三号线一期标签");
				// this.searchData.region.items[2].items=getNodeFromData("附近标签");
				
				this.searchData.price.items[0].items=this.getNodeFromData("单价范围标签");
				this.searchData.price.items[1].items=this.getNodeFromData("总价范围标签");
				
				this.searchData.houseType.items[0].items=this.getNodeFromData("户型户数标签");
				this.searchData.other.items[0].items=this.getNodeFromData("房屋面积标签");
				this.searchData.other.items[1].items=this.getNodeFromData("楼层高度标签");
				this.searchData.other.items[2].items=this.getNodeFromData("装修标准标签");
			},
			getNodeFromData(nodeName)
			{
				for (var i = 0; i < this.tags_data.tags_list.length; i++) {
					let item=this.tags_data.tags_list[i];
					if(item.name==nodeName)
					{
						let tagArr=item.cont.split(',');
						let retArr=[];
						for (var i = 0; i < tagArr.length; i++) {
							retArr.push({
								name:tagArr[i],
								value:tagArr[i],
								select:false
							})
						}
						return retArr;						
					}
				}
				

			},
			oneSelectClick(obj,index)
			{
				for (var i = 0; i < obj.length; i++) {
					obj[i].select=false;
				}
				obj[index].select=true;
			},
			tabClick(obj)
			{
				if(!obj.select)
				{
					this.searchData.region.select=false;
					this.searchData.houseType.select=false;
					this.searchData.price.select=false;
					this.searchData.other.select=false;
				}
				obj.select=!obj.select;
				this.searchData.select=obj.select;
			},
			clear()
			{
				let currentRoot={};
				if(this.searchData.region.select)
				{
					currentRoot=this.searchData.region;
				}
				else if(this.searchData.houseType.select)
				{
					currentRoot=this.searchData.houseType;
				}
				else if(this.searchData.price.select)
				{
					currentRoot=this.searchData.price;
				}
				else if(this.searchData.other.select)
				{
					currentRoot=this.searchData.other;
				}
				
				for (var i = 0; i < currentRoot.items.length; i++) {
					if(currentRoot.items[i].child)
					{
						for (var j = 0; j < currentRoot.items[i].items.length; j++) {
							this.clearItem(currentRoot.items[i].items[j]);
							currentRoot.items[i].items[j].select=false;//清除左侧导航
						}
						currentRoot.items[i].items[0].select=true;//选中第一个
						
					}
					else
					{
						this.clearItem(currentRoot.items[i]);
					}

					currentRoot.items[i].select=false;//清除左侧导航
				}
				currentRoot.items[0].select=true;//选中第一个
				
				// currentRoot.select=false;
				
				this.confirm();
				
			},
			clearItem(obj)
			{
				for (var i = 0; i < obj.items.length; i++) {
					// this.$set(obj.items[i], 'select', false)
					obj.items[i].select=false;
				}
				
				
				console.log(obj)
			},
			confirm()
			{
				let result=[];
				result=result.concat(this.getRootItemResult(this.searchData.region))
				result=result.concat(this.getRootItemResult(this.searchData.houseType))
				result=result.concat(this.getRootItemResult(this.searchData.price))
				result=result.concat(this.getRootItemResult(this.searchData.other))
				this.searchData.region.select=false;
				this.searchData.houseType.select=false;
				this.searchData.price.select=false;
				this.searchData.other.select=false;
				this.searchData.select=false;
				
				
				this.$emit('confirm', result); 
			},
			getRootItemResult(rootItem)
			{ 	
				let result=[];
				for (var i = 0; i < rootItem.items.length; i++) {
					if(rootItem.items[i].child)
					{
						let data={
									name:rootItem.items[i].name,
									value: [],
									ext_data:[]
								};
						for (var j = 0; j < rootItem.items[i].items.length; j++) {
							let childData=this.getSelect(rootItem.items[i].items[j])
							data.value=data.value.concat(childData.value);
							data.ext_data=data.ext_data.concat(childData.ext_data);
						}
						result.push(data)
					}
					else
					{
						result.push(this.getSelect(rootItem.items[i]))
						
					}
				}
				return result;
			},
			getSelect(childItem)
			{
				
				let data={
							name:childItem.name,
							value: [],
							ext_data:[]
						};
				for (var i = 0; i < childItem.items.length; i++) {
					if(childItem.items[i].select)
					{
						data.value.push(childItem.items[i].value)
						if(childItem.items[i].ext_data)
						{
							data.ext_data.push(childItem.items[i].ext_data)
						}
					}

				}
				return data;
			},
			checkboxChange: function(e,i) {
				console.log(e,i);
				var items = i,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.name)) {
						// this.$set(item, 'select', true)
						item.select=true;
					} else {
						// this.$set(item, 'select', false)
						item.select=false;
					}
				}
			},



		}
	}
</script>


<style>

</style>
