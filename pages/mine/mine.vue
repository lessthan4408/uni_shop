<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<block v-if="isLogin">
			<view class="mineTop">
				<view class="mineTop_left">
					<view class="mineTop_left_image">
						<image src="@/static/mine/2.jpg" mode=""></image>
					</view>
					<view class="mineTop_left_info">
						<text for="" style="color: #fff;">{{username}}</text>
						<text for="">V1</text>
					</view>		
				</view>
				<view class="mineTop_right">
					<view class="mineTop_right_info">
						<text for="">每日签到</text>
					</view>
				</view>
			</view>
			
			<!-- 订单状态 -->
			<view class="order_state">
				<view class="order_state_list" @click="goOrder">
					<image src="@/static/mine/quanbudingdan.png" mode=""></image>
					<text class="list_text">全部订单</text>
				</view>
				<view class="order_state_list">
					<image src="@/static/mine/daifukuan.png" mode=""></image>
					<text class="list_text">待付款</text>
				</view>
				<view class="order_state_list">
					<image src="@/static/mine/daishouhuo.png" mode=""></image>
					<text class="list_text">待收货</text>
				</view>
			</view>
			
			<!-- 个人信息 -->
			<view class="person_msg">
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="@/static/mine/dizhiguanli.png" alt class="MsgItemLogo" />
						<text>地址管理</text>
					</view>	
					<view class="MsgItemRight">
					   <image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="@/static/mine/zu.png" alt class="MsgItemLogo" />
						<text>我的钱包</text>
					</view>	
					<view class="MsgItemRight">
						<text class="remaB" v-show="true">200余额</text>
					   <image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="@/static/mine/wodeyouhuiquan.png" alt class="MsgItemLogo" />
						<text>我的优惠券</text>
					</view>	
					<view class="MsgItemRight">
					   <image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="@/static/mine/wodeerweima.png" alt class="MsgItemLogo" />
						<text>我的二维码</text>
					</view>	
					<view class="MsgItemRight">
					   <image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="@/static/mine/xiaohuoban.png" alt class="MsgItemLogo" />
						<text>我的小伙伴</text>
					</view>	
					<view class="MsgItemRight">
					   <image src="@/static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				
			</view>
		</block>

		<block v-else>
			<view class="login" @click="goLogin">
				<button type="warn">去登录</button>
			</view>
		</block>
	</view>
</template>

<script>
	import checkToken from '../../utils/checkToken.js'
	export default {
		data(){
			return {
				//   个人信息
				personMsgList: [{
					name: "地址管理",
					icon: "../../static/mine/dizhiguanli.png"
				  },
				  {
					name: "我的钱包",
					icon: "../../static/mine/zu.png",
					remaBala: "200余额"
				  },
				  {
					name: "我的优惠券",
					icon: "../../static/mine/wodeyouhuiquan.png",
				  },
				  {
					name: "我的二维码",
					icon: "../../static/mine/wodeerweima.png",
				  },
				  {
					name: "我的小伙伴",
					icon: "../../static/mine/xiaohuoban.png"
				  }
				],
				isLogin:false,
				username:''
			}
		},
		onShow() {
			this.mycheckToken()
			this.username = uni.getStorageSync('tel')
		},
		methods:{
			async mycheckToken() {//切换到我的页面时判断登录状态，显示不同内容
				let token = uni.getStorageSync('token') || null
				let tokenRight = await checkToken(token,this)
				// console.log(tokenRight)
				this.isLogin = tokenRight?true:false
			},
			goLogin() {//token过期或未登录，点击登录按钮
				uni.navigateTo({
					url:'../login/login'
				})
			},
			goOrder() {//点击全部订单去到订单页面
				uni.navigateTo({
					url:'../order/order'
				})
			}
		}
		
	}
</script>

<style>
	@import url("../../common/css/mine.css");
	.login {
		margin-top: 150px;
	}
</style>
