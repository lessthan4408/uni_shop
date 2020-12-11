<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{ information.name }}</label>
				<label for="">{{ information.phone }}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{ information.address }}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">
			<!-- cartsInfo 循环体 -->
			<view class="cartsInfo" v-for="(item,index) in confirmList">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:白色</view>
					</view>
					<view class="carts_price">
						<label for="">￥{{item.price*item.num}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：{{item.num}}
					</view>
					<view class="">
						<label for="" class="jian" @click="desc(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="asc(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥420</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{totalPrice}}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="orderAdd">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				confirmList:[],
				information: {
					name: 'YouSu',
					phone: '12315',
					address: '九龙坡杨家坪中公教育'
				}
			}
		},
		onLoad(options) {
			console.log(JSON.parse(options.checkedarr))
			this.confirmList = JSON.parse(options.checkedarr)
		},
		computed:{
			totalPrice() {//计算商品总价格
				let _totalPrice = 0
				this.confirmList.map((item)=>{
					return _totalPrice += item.price*item.num
				})
				return  _totalPrice
			},
			totalNum() {
				let _totalNum = 0
				this.confirmList.map((item)=>{
					return _totalNum += item.num
				})
				return _totalNum
			}
		},
		methods: {
			desc(index) {//点击减号
				this.confirmList[index].num --
				if(this.confirmList[index].num<=1) {
					this.confirmList[index].num = 1
				}
			},
			asc(index) {//点击加号
				this.confirmList[index].num ++
			},
			async orderAdd() {//点击提交订单将confirmList提交到数据库(shop_order和orders中都需要插入)，且删除购物车中的订单(自动删除，不用手动删除)
				let params = {//1. 添加订单到数据库
					uid:uni.getStorageSync('uid'),
					username:this.information.name,
					userphone:this.information.phone,
					address:this.information.address,
					countmoney:this.totalPrice,
					countnumber:this.totalNum,
					addtime:new Date().toLocaleString()
				}
				params = JSON.stringify(params)
				
				let idstr = this.confirmList.map((item)=>{
					return item.id
				}).join()
				
				let data = {
					params,
					idstr
				}
				
				// console.log(data,uni.getStorageSync('token'))
				
				let res = await this.$api._orderAdd(data,{authorization:uni.getStorageSync('token')})
				
				// console.log(res,1111)
				uni.showToast({
					title:res.data.msg
				})
				if(res.data.code==200) {
					setTimeout(()=>{
						uni.switchTab({
							url:'../index/index'
						})
					},1500)
				}
				
				// this.confirmList.map((item)=>{//2. 删除购物车中数据
				// 	// this.$api._delCart({id:item,id},{authorization:uni.getStorageSync('token')})
				// 	console.log(item.id)
				// })
			},
		}
	}
</script>

<style>
	@import url("../../common/css/confirm.css");
</style>
