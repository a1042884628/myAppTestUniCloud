<template>
	<view class="h_section pd20">
		<view class="hs_title">
			<text>价格走势</text>
			<text></text>
		</view>

		<view class="h_zoushi">
			<qiun-data-charts type="line" :chartData="priceLineData" background="none" />
		</view>


	</view>

</template>

<script>
	import qiuntitleBar from '@/components/qiun-title-bar/qiun-title-bar.vue';
	export default {
		props: {
			price_list: {
				type: Object,
				default: {}
			},
			projectId: ''
		},
		data() {
			return {
				priceLineData: {categories:[],
				series:[],
				},
			}
		},
		watch: {
			price_list() {
				if(this.price_list && this.price_list.list.length>0)
				{
									let categories=[];
				let series=[];
				let st=this.price_list.list[0].buss_month;
				let et=this.price_list.list[this.price_list.list.length-1].buss_month;
				for (var i = 0; i < this.price_list.list.length; i++) {
					categories.push(this.price_list.list[i].buss_month.split('.')[1]+"月");
					series.push(this.price_list.list[i].price)
				}
					this.priceLineData.categories=categories;
					this.priceLineData.series.push({
						name:st+"到"+et+ "价格走势",
						data: series
					})
				}

		      console.log("priceLineData",this.priceLineData)
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
