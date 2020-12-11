<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="tel" placeholder="输入手机号" maxlength="12"/>
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="_getIdentCode">{{identCodeCon}}</text>
			</view>
			<input type="text" v-model="identCode" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button  type="primary" @click="_login" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<!-- <text style="color: #006699;text-align: center;" >通过微信授权登录</text> -->
		</view>
	</view>
</template>

<script>
	
	let app = getApp()
	
	export default {
		data() {
			return {
				tel:'17623808684',
				identCode:'',
				identCodeCon:'获取验证码',
				isSend:false,//是否已发送验证码
				timer:null
			}
		},
		methods: {
			async _getIdentCode() {//获取验证码
				let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				if(!reg.test(this.tel)) {//手机号格式错误
					uni.showToast({
						title:"请输入正确的手机号",
						icon:"none"
					})
					return
				} 
				//手机号格式正确
				if(!this.isSend) {
					let res = await this.$api._getIdentCode({phone:this.tel})
					console.log(res.data.list)
					let num = 5
					if(this.timer)clearInterval(this.timer)
					this.timer = setInterval(()=>{//异步
						num--
						this.identCodeCon = num + '秒后重新获取'
						if(num<0) {
							this.identCodeCon = '重新获取验证码'
							this.isSend=false
						}
					},1000)
					this.isSend = true//点击之后会将isSend变为真，所以五秒之后变为false后才会执行if中的代码
					
					//点击获取验证码，将验证码和手机号存入本地
					uni.setStorageSync('code',res.data.list.code)
					uni.setStorageSync('tel',this.tel)
				}
			},
			async _login() {
				if(this.tel==uni.getStorageSync('tel')&&this.identCode==uni.getStorageSync('code')) {
					// console.log(1)
					let res =await this.$api._login({phone:this.tel})//相同用户后台指定不会反复添加至数据库
					console.log(res.data)
					
					//点击登录，将用户唯一标识uid和用户身份验证token存入本地
					uni.setStorageSync('uid',res.data.list.uid)
					uni.setStorageSync('token',res.data.list.token)
					
					uni.showToast({
						title:res.data.msg
					})
					setTimeout(()=>{
						uni.switchTab({//登录成功跳转至 我的 页面
							url:'../mine/mine'
						})
					},1000)
				} else {
					uni.showToast({
						title:"请输入正确的信息",
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	.box{
		position: relative;
	}

	.row{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}
	.send{
		display: flex;
		justify-content: space-between;
	}
	.send text:nth-of-type(2){
		color: #00BB00;
	}
	text{
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}
	input{
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
	
</style>
