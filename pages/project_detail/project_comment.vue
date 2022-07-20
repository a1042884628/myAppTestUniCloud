<template>
	<scroll-view scroll-y class="container" @scrolltolower="loadData()">

		<view class="h_section pd20">
			<view class="h_pinglun_box">
				<view class="hpl_item" v-for="(item,index) in comment_list" :key="item.id">
					<view class="hpl_user" @click="reply_comment(item,item)">
						<view class="hpl_img">
							<image :src="item.avatar" mode="widthFix"></image>
						</view>
						<view class="hpl_name">
							<text>{{item.nick_name}}</text>
						</view>
					</view>
					<view class="hpl_content">
						<text>{{item.cont}}</text>
					</view>
					<view class="hpl_date">
						<text>{{item.add_date}}</text>
					</view>
					
					
					
					<view class="hpl_item hpl_item_2" v-for="(item2,index2) in item.comment_list" :key="item2.id"  @click="reply_comment(item2,item)">
						<view class="hpl_user">
							<view class="hpl_img">
								<image :src="item2.avatar" mode="widthFix"></image>
							</view>
							<view class="hpl_name">
								<text>{{item2.nick_name}}</text>
							</view>
						</view>
						<view class="hpl_content">
							<text>{{item2.cont}}</text>
						</view>
						<view class="hpl_date">
							<text>{{item2.add_date}}</text>
						</view>
					</view>
					
				</view>
				
				
				
			
				
				
			</view>

		</view>



		<view class="h_bt_k">

		</view>

		<view class="comment_box">
			<view class="comment_input">
				<input type="text" class="c_input" v-model="cont" :placeholder="placeholder"
					placeholder-style="color:#bbbbbb;" />
			</view>
			<view class="comment_btn">
				<button class="c_button" type="default" @click="addComment">发送</button>
			</view>
		</view>






	</scroll-view>
</template>

<script>
	import {check_login} from "@/utils/user.js"
	export default {
		data() {
			return {
				id: "",
				loadingType: "more",
				pageindex: 1,
				pagesize: 20,
				total: 0,
				comment_list: [],

				cid: 0,
				cont: '',
				replay_item:'',
				placeholder: '请填写评论...',
			}
		},
		onLoad(options) {
			this.id = options.project_id;
			this.loadData();
		},
		methods: {
			reply_comment(item,pItem) {
				this.replay_item=pItem;
				this.cid = pItem.id;
				this.placeholder = "回复：" + item.nick_name;
			},
			addComment() {
				if(!check_login()){
					this.$navTo('login');
					return;
				}
				if (this.cont == '') {
					this.$prompt.showMsg('请输入评论内容');
					return;
				}

				this.$prompt.showLoadingMsg('请稍后...')
				let that = this;

				let params = {
					cid: this.cid,
					cont: this.cont,
					project_id: this.id,
					user_id: this.$store.getters.userId
				}

				this.$api.main.commentAdd(params).then(resData => {
					
					if(that.replay_item)
					{
						that.replay_item.comment_list.push(resData.data);
					}
					else
					{
						that.comment_list.unshift(resData.data);
					}
					 
					that.cid=0;
					that.cont='';
					that.replay_item='';
					that.placeholder='请填写评论...';
					that.$prompt.hideToast();
					this.$prompt.showMsg('评论成功');

				}).catch(function(err) {
					console.log(err);
					that.$prompt.hideToast();
				});

			},
			loadData() {
				if (this.loadingType === "loading" || this.loadingType === 'nomore') {
					return
				}

				this.loadingType = 'loading';
				const params = {
					pageindex: this.pageindex++,
					pagesize: this.pagesize,
					project_id: this.id,
				}
				if (this.$store.getters.userId) {
					params.user_id = this.$store.getters.userId
				}
				this.$api.main.getCommentList(params).then(resData => {
					this.comment_list = this.comment_list.concat(resData.data.rows)

					this.total = resData.data.total;
					this.loadingType = Math.ceil(this.total / this.pagesize) >= this.pageindex ? 'more' : 'nomore';
					console.log('comment_list',this.comment_list)
				})
			},
			navTo(url, param) {
				this.$navTo(url, param);
			}
		},
	}
</script>

<style>
	page {
		height: 100%;
	}

	.container {
		height: 100%;
	}

	.comment_box {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 20upx;
		box-sizing: border-box;
		background: #ffffff;
		box-shadow: 0 -8upx 8upx rgba(0, 0, 0, 0.1);
	}

	.comment_input {
		width: 78%;
		float: left;
	}

	.comment_btn {
		width: 20%;
		float: right;
	}

	.c_input {
		width: 100%;
		height: 80upx;
		background: #ffffff;
		font-size: 35upx;
	}

	.c_button {
		width: 100%;
		text-align: center;
		color: #ffffff !important;
		border-radius: 10upx;
		height: 80upx;
		border: 0;
		font-size: 35upx;
		background-image: -webkit-linear-gradient(#6dddd6, #42c1c7);
		background-image: linear-gradient(#6dddd6, #42c1c7);
	}

	.c_button::after {
		border: 0;
	}
</style>
