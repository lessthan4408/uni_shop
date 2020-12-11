<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>			
		</view>
		
		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
				  <label class="jian" @click="desc">-</label>
				  <label class="zhi">{{buyNum}}</label>
				  <label class="jia" @click="asc">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view 
					:class="specsattrIndex==index?'threed3i1 cur':'threed3i1'" 
					v-for="(item,index) in detail.specsattr"
					@click="changeIndex(index)">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		 <view class="productDetail">
			<!-- <view class="productDetailTitle">{{detail.description}}</view> -->
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="@/static/detail/2.jpg"  /> -->
			<rich-text :nodes="detail.description"></rich-text>
		</view>
		
		<view class="productEval">
			<view class="eval">商品评价</view>
			<view >
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">交易很好，物流很快</label>					
				<view class="evalImage">
					<image src="@/static/detail/pingjia1.jpg">
					<image src="@/static/detail/pingjia2.jpg">
					<image src="@/static/detail/pingjia3.jpg">
				</view>
				<label class="evalTime">2020-02-12</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2">立即购买</button> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:[],
				buyNum:1,
				specsattrIndex:0,
				goodsId:''
			}
		},
		onLoad(options) {
			this.goodsId = options.id 
			this._getDetail(options.id)
		},
		methods: {
			async _getDetail(id) {//获取商品详情
				let res = await this.$api._getDetail({id})
				res.data.list[0].img = this.$baseUrl + res.data.list[0].img
				res.data.list[0].specsattr=res.data.list[0].specsattr.split(',') || []
				this.detail = res.data.list[0]
				console.log(this.detail)
			},
			changeIndex(index) {//改变属性的index
				this.specsattrIndex = index
			},
			desc() {//点击减号
				this.buyNum--
				if(this.buyNum < 1) {
					this.buyNum = 1
				}
			},
			asc() {//点击加号
				this.buyNum++
				if(this.buyNum >= this.detail.number) {
					this.buyNum = this.detail.number
				}
			},
			async addCart() {//点击添加到购物车
			    let data = {
					uid:uni.getStorageSync('uid'),
					goodsid:this.goodsId,
					num:this.buyNum,
					checked:1
				}
				let res = await this.$api._addCart(data,{authorization:uni.getStorageSync('token')})
				// console.log(res)
				if(res.data.code==200) {
					uni.showToast({
						title:res.data.msg
					})
				} else {
					uni.showToast({
						title:'请登录',
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'../mine/mine'
						})
					},1000)
				}
			}
		},
	}
</script>

<style>
	@import url("../../common/css/details.css");
	.cur {
		background:#F26B11;
	}
</style>
