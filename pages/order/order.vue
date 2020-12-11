]<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
		</view>
		<view class="list" v-if="orderList.length>0">
			<!-- row 循环体 -->
			<view class="row" v-for="(item) in orderList">
				<view class="products">
					<view class="imagebox" v-for="(val) in item.child">
						<image :src="val.img" mode="widthFix"></image>
						<text class="title">{{val.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥:{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				orderList:[]
			}
		},
		onShow(){
			this._getOrderList()
		},
		methods: {
			async _getOrderList() {//获取订单列表
				let res = await this.$api._orderList({uid:uni.getStorageSync('uid')},{authorization:uni.getStorageSync('token')})
				// console.log(res.data.list)
				if(res.data.code == 200) {
					res.data.list.map((item)=>{
						item.child.map((val)=>{
							return val.img = this.$baseUrl + val.img
						})
					})
					this.orderList = res.data.list
					// console.log(this.orderList)
				}
			}
		},
		
	}
</script>

<style>
.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		/* float: left; */
		margin:10rpx;
		display: flex;
	}
	.imagebox .title{
		margin-top: 30rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
