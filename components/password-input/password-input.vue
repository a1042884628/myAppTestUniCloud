<template>
  <view class="psdIptBx">
	  <block v-if="!completion">
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[0]}}</text>
		    </text>
		    <text v-if="numLng.length == 1" class="focus_move">|</text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[1]}}</text>
		    </text>
		    <text v-if="numLng.length == 2" class="focus_move">|</text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[2]}}</text>
		    </text>
		    <text v-if="numLng.length == 3" class="focus_move">|</text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>●</text>
		    </text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>●</text>
		    </text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>●</text>
		    </text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>●</text>
		    </text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[3]}}</text>
		    </text>
		    <text v-if="numLng.length == 4" class="focus_move">|</text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[4]}}</text>
		    </text>
		    <text v-if="numLng.length == 5" class="focus_move">|</text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[5]}}</text>
		    </text>
		    <text v-if="numLng.length == 6" class="focus_move">|</text>
		  </view>
		  <view class="psdTtem">
		    <text class="psdTtemTxt">
		      <text>{{numLng[6]}}</text>
		    </text>
		    <text v-if="numLng.length == 7" class="focus_move">|</text>
		  </view>
	  </block>

   <block v-if="completion" v-for="(item , index) in psdIptNum" :key='index'>
      <view class="psdTtem">
        <text v-if="numLng.length > index" class="psdTtemTxt">
          <text>{{numLng[index]}}</text>
        </text>
        <text v-if="numLng.length ==index" class="focus_move">|</text>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    props: {
      //是否明文 默认密文
	  completion: {
        type: Boolean,
        default: true
      },
      plaintext: {
        type: Boolean,
        default: true
      },
      //键盘输入的val
      numLng: {
        type: [String, Number],
        default: ''
      },
      //密码框的个数
      psdIptNum: {
        type: [String, Number],
        default: 6
      }
    },
    data() {
      return {}
    },
    created() {},
    methods: {
    }
  }
</script>

<style scoped>
  .psdIptBx {
    display: flex;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  .psdTtem {
    flex: 1;
    height: 60rpx;
    border-left: 1px solid #ccc;
    line-height: 1;
  }

  .psdTtemTxt {
    text-align: center;
    line-height: 60rpx;
    font-size: 30rpx;
  }

  .focus_move {
    color: #E6240F;
    font-size: 30rpx;
    line-height: 60rpx;
    animation: focus 0.8s infinite;
  }

  @keyframes focus {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
</style>
