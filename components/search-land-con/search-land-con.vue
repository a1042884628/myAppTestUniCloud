<template>
	<view class="select_box">
		<view class="select_nav">
			<view class="select_nav_item" :class="{ selected: searchData.region.select }"
				@click="tabClick(searchData.region)">
				<text>区域</text>
			</view>
			<view class="select_nav_item" :class="{ selected: searchData.status.select }"
				@click="tabClick(searchData.status)">
				<text>状态</text>
			</view>
			<view class="select_nav_item" :class="{ selected: searchData.landName.select }"
				@click="tabClick(searchData.landName)">
				<text>名称</text>
			</view>
		</view>

		<view class="select_section" v-show="searchData.select">
			<!--区域部分-->
			<view class="select_s_main" v-show="searchData.region.select">
				<view class="select_s_left">
					<text :class="{ selected: item.select }" v-for="(item, index) in searchData.region.items"
						@click="oneSelectClick(searchData.region.items,index)">{{item.name}}</text>
				</view>

				<view v-for="(item, index) in searchData.region.items" class="s_r" v-show="item.select">
					<view class="select_s_right" v-if="!item.child">
						<text v-for="(item2, index2) in item.items" :class="{ selected: item2.select }"
							@click="oneSelectClick(item.items,index2)">{{item2.name}}</text>
					</view>

					<view class="select_s_right2" v-if="item.child">
						<view class="ssr_a">
							<text v-for="(item2, index2) in item.items" :class="{ selected: item2.select }"
								@click="oneSelectClick(item.items,index2)">{{item2.name}}</text>
						</view>

						<view class="ssr_b" v-for="(item2, index2) in item.items" v-show="item2.select"
							v-if="item2.items.length>0">
							<checkbox-group @change="checkboxChange($event,item2.items)">
								<label v-for="(item3, index3) in item2.items">
									<text>{{item3.name}}</text>
									<checkbox :value="item3.name" :checked="item3.select" />
								</label>

							</checkbox-group>
						</view>

					</view>
				</view>
			</view>



			<!--状态部分-->
			<view class="select_s_main" v-show="searchData.status.select">
				<view class="select_s_left">
					<text :class="{ selected: item.select }" v-for="(item, index) in searchData.status.items"
						@click="oneSelectClick(searchData.status.items,index)">{{item.name}}</text>
				</view>
				<view class="select_s_right" v-for="(item, index) in searchData.status.items" v-show="item.select">
					<text v-for="(item2, index2) in item.items" :class="{ selected: item2.select }"
						@click="oneSelectClick(item.items,index2)">{{item2.name}}</text>
				</view>

			</view>


			<!--名称部分-->
			<view class="select_s_main select_s_main2" v-show="searchData.landName.select">


				<view class="ssm_box" v-for="(item, index) in searchData.landName.items">

						<input class="search_input" type="text" :placeholder="item2.name" v-for="(item2, index2) in item.items"   v-model="item2.value" />
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
		name: "search-land-con",
		props: {
		},
		data() {
			return {
				keyIndex: 0, //自增的key
				tags_data:{},
				searchData: {
					select: false,
					region: {
						name: "区域",
						select: false,
						items: [{
							name: "区域",
							value: "区域",
							select: true,
							items: []
						}]
					},
					status: {
						name: "状态",
						select: false,
						items: [{
							name: "状态",
							value: "状态",
							select: true,
							items: [{
									name: "交易中",
									value: "1",
									select: false
								},
								{
									name: "已成交",
									value: "2",
									select: false
								},
								{
									name: "流拍",
									value: "3",
									select: false
								},
							]
						}]
					},

					landName: {
						name: "名称",
						select: false,
						items: [{
							name: "名称",
							select: true,
							items: [{
								name: "土地名称",
								value: "",
								select: true,
								type:'input'
							}]

						}]

					}
				}



			}
		},
		mounted() {
		 this.loadData();

		},

		watch: {
		},
		computed: {},
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
			},
			oneSelectClick(obj, index) {
				for (var i = 0; i < obj.length; i++) {
					obj[i].select = false;
				}
				obj[index].select = true;
			},
			tabClick(obj) {
				if (!obj.select) {
					this.searchData.region.select = false;
					this.searchData.status.select = false;
					this.searchData.landName.select = false;
				}
				obj.select = !obj.select;
				this.searchData.select = obj.select;
			},
			clear() {
				let currentRoot = {};
				if (this.searchData.region.select) {
					currentRoot = this.searchData.region;
				} else if (this.searchData.status.select) {
					currentRoot = this.searchData.status;
				} else if (this.searchData.landName.select) {
					currentRoot = this.searchData.landName;
				} 

				for (var i = 0; i < currentRoot.items.length; i++) {
					if (currentRoot.items[i].child) {
						for (var j = 0; j < currentRoot.items[i].items.length; j++) {
							this.clearItem(currentRoot.items[i].items[j]);
							currentRoot.items[i].items[j].select = false; //清除左侧导航
						}
						currentRoot.items[i].items[0].select = true; //选中第一个

					} else {
						this.clearItem(currentRoot.items[i]);
					}

					currentRoot.items[i].select = false; //清除左侧导航
				}
				currentRoot.items[0].select = true; //选中第一个

				// currentRoot.select=false;
this.confirm();
			},
			clearItem(obj) {
				for (var i = 0; i < obj.items.length; i++) {
					// this.$set(obj.items[i], 'select', false)
					if(obj.items[i].type && obj.items[i].type=='input')
					{
						obj.items[i].value='';
					}
					else
					{
						obj.items[i].select = false;
					}
					
				}


				console.log(obj)
			},
			confirm() {
				let result = [];
				result=result.concat(this.getRootItemResult(this.searchData.region))
				result=result.concat(this.getRootItemResult(this.searchData.status))
				result=result.concat(this.getRootItemResult(this.searchData.landName))
				this.searchData.region.select = false;
				this.searchData.status.select = false;
				this.searchData.landName.select = false;
				this.searchData.select = false;
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
			checkboxChange: function(e, i) {
				console.log(e, i);
				var items = i,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.name)) {
						// this.$set(item, 'select', true)
						item.select = true;
					} else {
						// this.$set(item, 'select', false)
						item.select = false;
					}
				}
			},



		}
	}
</script>


<style>

</style>
