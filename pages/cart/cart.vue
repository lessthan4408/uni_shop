<template>
	<view>
		<block v-if="isLogin">
			<view v-if="cartList.length>0" class="container" >
				<view class="top">
					<!-- 和小程序一样需要加key，不加删除后删除的样式会在之前的商品显示 -->
					<scroll-view class="scroll-view_H" scroll-x="true" v-for="(item,index) in cartList" :key="item.id">
						<view class="cartInfo">
							<view class="cartInfochild">
								<!-- 选择框 -->
								<view class="cartInfo_switch common">
									<!-- 点击当前商品 -->
									 <switch  type="checkbox" :checked="item.checked==1?true:false" @change="oneCheck($event,item.id,index)"/>
								</view>
								<!-- 图片 -->
								<view class="cartInfo_image common">
									<image :src="item.img" mode=""></image>
								</view>
								
								<!-- 信息 -->
								<view class="cartInfo_info">
									<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
									<label for="" style="font-size: 24rpx; color: #ccc;">规格：白色</label>
									<label for="" style="color: red;">￥{{item.price}}</label>
								</view>
								<!-- 加减数量 -->
								<view class="cartInfo_num">
									<view class="cartInfo_num_child">
										<label for="" @click="desc(item.id,index)">-</label>
										<label for="">{{item.num}}</label>
										<label for="" @click="asc(item.id,index)">+</label>
									</view>						
								</view>
							</view>
							
						</view>
						<view class="cartDel" @click="delCart(item.id,index)">
							<label for="">删除</label>
						</view>			
					</scroll-view>
				</view>
				
				<!-- 底部 -->
				<view class="foot">
					<view class="footd1">
						<switch type="checkbox" :checked="allCheckVal" @change="allCheck"/>
						<label>全选</label>
					</view>
					<view class="footd2">
						<view class="footd2sp1">总计：<label style="color: red;">{{totalPrice}}</label></view>
						<label class="footd2sp2">不含运费，已优惠￥0.00</label>
					</view>
					<!-- 跳到提交订单，结算页面 -->
					<view class="footd3" @click="goConfirm">
						<!-- 被选中的商品的个数 -->
						<label>去结算({{totalNum}}件)</label>
					</view>
				</view>
			</view>
			<view v-else>还未添加过购物车哦</view>
		</block>
		<block v-else>
			<view>未登录</view>
		</block>
	</view>
</template>

<script>
	import checkToken from '../../utils/checkToken.js'
	
	export default {
		data(){
			return {
				isLogin:false,
				cartList:[],
				allCheckVal:null
			}
		},
		onShow() {
			this.cartcheckToken()
			this.getCartList()
		},
		computed:{
			totalNum() {//计算商品总件数
				let _totalNum = 0
				this.cartList.map((item)=>{
					if(item.checked==1) {
						return _totalNum+=item.num
					}
				})
				return _totalNum
			},
			totalPrice() {//计算商品总价
				let _totalPrice = 0
				this.cartList.map((item)=>{
					if(item.checked==1) {
						return _totalPrice+=item.num*item.price
					}
				})
				return _totalPrice
			}
		},
		methods:{
			async cartcheckToken() {//判断token状态，设置登录状态且显示不同内容
				let token = uni.getStorageSync('token')
				let tokenRight =await checkToken(token,this)
				// console.log(tokenRight)
				this.isLogin = tokenRight?true:false
			},
			async getCartList() {//根据uid获取当前用户的购物车列表
				let res = await this.$api._getCartList({uid:uni.getStorageSync('uid')},{authorization:uni.getStorageSync('token')})
				// console.log(res)
				if(res.data.list) {//判断购物车中是否有数据
					res.data.list.map((item)=>{
						return item.img = this.$baseUrl + item.img
					})
				}
				this.cartList = res.data.list||[]
				this.allCheckVal = this.cartList.every((item)=>{
					return item.checked==1
				})
				// console.log(this.cartList)
				
			},
			desc(id,index) {//点击减号
				this.cartList[index].num--
				if(this.cartList[index].num<1) {
					this.cartList[index].num=1
				}
				this.editCart(id,index)
			},
			asc(id,index) {//点击加号
				this.cartList[index].num++
				this.editCart(id,index)
			},
			async delCart(id,index) {//通过接口删除数据库中当前商品，且删除渲染列表中的数据(或者不删重新获取购物车列表)
				let res = await this.$api._delCart({id},{authorization:uni.getStorageSync('token')})
				console.log(res)
				if(res.data.code == 200) {
					uni.showToast({
						title:'删除成功'
					})
					// this.getCartList()
					this.cartList.splice(index,1)
				}
			},
			allCheck(e) {//点击全选框,将全选框的值赋给单选框
				// console.log(e.detail.value)
				this.cartList.map((item)=>{
					return item.checked = e.detail.value?1:0
				})
				this.allCheckVal = e.detail.value
				this.cartList.forEach((item,index)=>{
					this.editCart(item.id,index)
				})
			},
			oneCheck(e,id,index) {//点击单选框，计算全选框的值
				// console.log(e.detail.value,index)
				this.cartList[index].checked = e.detail.value
				this.allCheckVal=this.cartList.every((item)=>{
					return item.checked == 1
				})
				this.editCart(id,index)
			},
			async editCart(id,index) {//编辑购物车，数量加减，选中状态改变同步导数据库
				let data={
					id,
					num:this.cartList[index].num,
					checked:this.cartList[index].checked==true?1:0
				}
				// console.log(data)
				let res = await this.$api._editCart(data,{authorization:uni.getStorageSync('token')})
				// console.log(res.data)
			},
			goConfirm() {//点击去结算取到订单确认页面
				let checkedarr = this.cartList.filter((item)=>{
					return item.checked == 1
				})
				
				console.log(checkedarr)
				
				if(checkedarr.length<=0) {
					uni.showToast({
						title:'至少结算一件商品哦',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url:'../confirm/confirm?checkedarr='+JSON.stringify(checkedarr) 
				})
				
			}
		},
	}
</script>

<style>
	@import url("../../common/css/cart.css");

	.cartInfo_image_img{
		width: 120rpx;
		height: 120rpx;
	}
	.foot{
		bottom: var(--window-bottom)
	}
</style>
