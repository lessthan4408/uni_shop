<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="text-align: center;" type="text" value="" placeholder="寻找商品" @focus="goSearch"/>
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" scroll-x="{true}">
				<view class="uni-tab-item">
					<text :class="curIndex==0?'uni-tab-item-title uni-tab-item-title-active':'uni-tab-item-title'" @click="_changeIndex(0)">推荐</text>
				</view>
				<view class="uni-tab-item" v-for="(item,index) in cate" @click="_changeIndex(index+1,item.id,item.catename)">
					<text :class="curIndex==index+1?'uni-tab-item-title uni-tab-item-title-active':'uni-tab-item-title'">{{item.catename}}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 推荐轮播图 -->
		<view class="banner-container">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular>
				<swiper-item v-for="(item,index) in banner">
					<view class="swiper-item">
						<image :src="item.img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="@/static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="@/static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="_goClassify">
				<image src="@/static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="@/static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{time.h}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time.m}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time.s}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image :src="seckill.img" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="@/static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="@/static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="@/static/index/swiper.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view :class="btmIndex==0?'tag_list active_tag_list':'tag_list'" @click="_changeBtmIndex(0)">
					<label for="">热门推荐</label>
				</view>
				<view :class="btmIndex==1?'tag_list active_tag_list':'tag_list'" @click="_changeBtmIndex(1)">
					<label for="">最新好货</label>
				</view>
				<view :class="btmIndex==2?'tag_list active_tag_list':'tag_list'" @click="_changeBtmIndex(2)">
					<label for="">所有商品</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<block v-if="btmList.length>0">
					<view 
					class="product" 
					v-for="(item,index) in btmList[btmIndex].content"
					@click="_goDetail(item.id)">
						<view class="GoodsLeft">
							<image class="GoodsImg" :src="item.img" alt />
						</view>
						<view class="GoodsCont">
							<view class="GoodConTit">{{item.goodsname}}</view>
							<view class="GoodsPrice">￥{{item.price}}</view>
							<view class="yimai">已售50件</view>
							<view class="Immed">立即抢购</view>
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cate:[],
				curIndex:0,
				banner:[],
				seckill:{},
				time:{},
				timer:null,
				btmList:[],
				btmIndex:0
			}
		},
		onLoad() {
			this._getCate()
			this._getbanner()
			this._getBtmList()
		},
		onShow() {
			this._getSeckill()
		},
		onHide() {
			if(this.timer)clearInterval(this.timer)
		},
		methods: {
			async _getCate() {//获取分类名
				let res =await this.$api._getCate()
				// console.log(res)
				this.cate=res.data.list
			},
			_changeIndex(index,id,catename) {//改变分类index
				// console.log(id)
				this.curIndex=index
				if(index==0) {
					return
				}
				uni.navigateTo({
					url:`../product/product?id=${id}&catename=${catename}`
				})
			},
			async _getbanner() {//获取轮播图
				let res = await this.$api._getBanner()
				res.data.list.map((item)=>{
					return item.img = this.$baseUrl + item.img
				}) 
				// console.log(res)
				this.banner = res.data.list
			},	
			_goClassify(){//点击去到商品分类
				uni.navigateTo({
					url:'../classify/classify'
				})
			},
			async _getSeckill() {//获取限时秒杀数据
				let res = await this.$api._getSeckill()
				// console.log(res.data.list[0])
				res.data.list[0].img = this.$baseUrl + res.data.list[0].img
				this.seckill = res.data.list[0]
				this._setTimer(this.seckill.endtime)
			},
			_setTimer(endtime) {//设置倒计时
				this.timer = setInterval(()=>{
					// let ts = (endtime - new Date().getTime())/1000
					let ts = (new Date('2021/10/01').getTime() - new Date().getTime())/1000
					let h = parseInt(ts/3600)
					let m = parseInt(ts%3600/60)
					let s = parseInt(ts%60)
					h = h<10?'0'+ h :h;
					m = m<10?'0'+ m :m;
					s = s<10?'0'+ s :s;
					this.time = {h,m,s}
					// console.log(h,m,s)
				},1000)
			},
			async _getBtmList() {//获取底部tab数据
				let res = await this.$api._getindexgoods()
				// console.log(res)
				res.data.list.map((item)=>{
					item.content.map((val)=>{
						return val.img = this.$baseUrl + val.img
					})
				})
				this.btmList = res.data.list
				// console.log(this.btmList)	
			},
			_changeBtmIndex(index) {//改变底部index
				this.btmIndex = index
			},
			_goDetail(id) {//底部tab去详情页面
				uni.navigateTo({
					url:'../details/details?id='+id
				})
			},
			goSearch() {//点击寻找商品去到搜索页面
				uni.navigateTo({
					url:'../search/search'
				})
			}
		},
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
