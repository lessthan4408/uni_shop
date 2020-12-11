<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" placeholder="搜索商品" placeholder-class="placeholder" @focus="search"/>
		</view>
		<view class="list" v-if="productList.length>0">
			<view class="row" v-for="(item,index) in productList" @click="_goDetails(item.id)">
			<!-- <view class="row"> -->
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>3565评论</text>	
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
	data(){
		return {
			productList:[],
			totalPage:1,
			page:1,
		}
	},
	onLoad() {
		// console.log(this.options)
		uni.setNavigationBarTitle({
			title:this.options.catename
		})
		this._getProductList()
	},
	methods:{
		async _getProductList() {//获取产品列表
		// console.log(this)
			let res = await this.$api._getcategoodPage({fid:this.options.id,page:this.page,size:3})
			// console.log(res)
			res.data.list[1] = res.data.list[1]||[]
			res.data.list[1].map((item)=>{
				return item.img = this.$baseUrl + item.img
			})
			this.totalPage = res.data.list[0] || 1
			this.productList=this.productList.concat(res.data.list[1])
			// console.log(this.productList,this.totalPage)
		},
		_goDetails(id) {//跳转到详情页
			uni.navigateTo({
				url:'../details/details?id='+id
			})
		},
		async search() {
			uni.navigateTo({
				url:'../search/search'
			})
		}
	},
	onReachBottom() {//上拉加载数据
		this.page++
		if(this.page > this.totalPage) {
			uni.showToast({
				title:'没有更多数据0.0',
				icon:"none"
			})
			return
		}
		this._getProductList()
	}
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
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
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
