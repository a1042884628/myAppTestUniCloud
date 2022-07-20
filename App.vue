<script>
	import utils from 'utils/index.js'
	export default {

		onLaunch: function() {
			let that = this
			let userInfo = uni.getStorageSync('userInfo') || '';

			if (userInfo) {
				userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				that.$store.dispatch('user/login', userInfo).then(res => {

					return that.$api.user.getUserWallet({
						user_id: userInfo.id,
						saler_id:userInfo.saler_id
					})
				}).then(res => {
					that.$store.dispatch('user/setWallet', res.data)
				})
			}
			let userGuid = uni.getStorageSync('userGuid') || '';	
			if(userGuid)
			{
				that.$store.dispatch('user/setGuid', userGuid);
			}
		},
		onShow: function(options) {
			console.log('options', options)
			//1007	单人聊天会话中的小程序消息卡片  1008	群聊会话中的小程序消息卡片   1047 扫描小程序码 1048	长按图片识别小程序码 1049 扫描手机相册中选取的小程序码
			if (options.scene == '1007' || options.scene == '1008' || options.scene == '1047' || options.scene ==
				'1048' || options.scene == '1049') {
				if (options.query.scene) {
					let userId = utils.getQueryVariable(decodeURIComponent(options.query.scene), 'user_id');
					console.log('userId', userId);
					let share_type = this.getShareType(options.path)
					if (userId) {
						this.shareCallbackadd(userId, share_type)
					}
		
					let uuid = utils.getQueryVariable(decodeURIComponent(options.query.scene), 'uuid');
					if (uuid) {
						this.saveUUID(uuid);
					}
				} else {
					let userId = options.query.userId
					let share_type = this.getShareType(options.path)
					if (userId) {
						this.shareCallbackadd(userId, share_type)
					}
		
					let uuid = options.query.uuid;
					if (uuid) {
						this.saveUUID(uuid);
					}
				}
			}
			console.log('App Show')
		},
		methods: {
			getShareType(path) {
				if (path == 'pages/project_detail/project_index') {
					/* pages/floorDetail/index */
					return '项目'
				}
			},
			shareCallbackadd(userId, share_type) {
				let that = this
				wx.login({
					success(res) {
						if (res.code) {
							that.$api.wxapi.wxLogin({
								code: res.code
							}).then(res => {
								console.log('wxapi wxLogin res', res)
								let open_id = res.data.open_id;
								let params = {
									share_user_id: userId,
									share_type: share_type,
									share_id: 0,
									temp_guid: open_id,
									open_id: open_id,
									avatar: "",
									nick_name: "",
								}
								if (that.$store.getters.avatar) {
									params.avatar = that.$store.getters.avatar
								}
								if (that.$store.getters.nickname) {
									params.nick_name = that.$store.getters.nickname
								}
								console.log('shareCallbackadd params', params)
								that.$api.main.shareCallbackadd(params).then(res => {
									console.log('shareCallbackadd res', res);
								}).catch(err => {
									console.log(err);
								});
							})
						}
					}
				})
			},
			saveUUID(uuid) {
				let uuidSetting = this.$store.getters.uuidSetting;
				let isNew = true;
				for (var i = 0; i < uuidSetting.length; i++) {
					uuidSetting[i].selected = false;
					if (uuidSetting[i].uuid == uuid) {
						uuidSetting[i].selected = true;
						isNew = false;
					}
				}
				if (isNew) {
					uuidSetting.push({
						uuid: uuid,
						uuid_name: '',
						selected: true
					});
					this.$store.dispatch('app/setuuidSetting', uuidSetting); //先保存，再异步获取名称，避免页面onload 加载时，接口没有返回
					let that = this;
					this.$api.main.uuidCheck({
						my_uuid: uuid
					}).then(resData => {
						if (resData.data) {
							for (var i = 0; i < uuidSetting.length; i++) {
								if (uuidSetting[i].uuid == uuid) {
									uuidSetting[i].uuid_name = resData.data.system_name;
								}
							}
							that.$store.dispatch('app/setuuidSetting', uuidSetting);
						}
			
					}).catch(function(err) {
						console.log(err);
					});
				} else {
					this.$store.dispatch('app/setuuidSetting', uuidSetting);
				}
			
			
			
			}
		}
	}
</script>

<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/style.css";
	/*每个页面公共css */
	body {
		background: $page-color-base;
	}

	.font-bold600 {
		font-weight: 600;
	}

	.nav .cur-sort {
		position: relative;
	}

	.nav .cur-sort::after {
		content: '';
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		width: 40rpx;
		font-weight: normal;
		border-bottom: 6rpx solid;
		transform: translate(-50%);

	}

	.list-scroll-content {
		height: 100%;
	}

	uni-button,
	button {
		height: 80upx;
		line-height: 80upx;
		font-weight: normal;

		&.no-border:before,
		&.no-border:after {
			border: 0;
		}
	}

	uni-button[type='default'],
	button[type='default'] {
		color: $font-color-dark;
	}
</style>
