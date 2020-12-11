<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<!--  -->
			<view :class="curIndex==index?'left_list activeList':'left_list'" v-for="(item,index) in cates" @click="changeIndex(index)">
				<label>{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					
					<!-- 页面刚加载时，cates中没有数据，使用.children会报错，所以需要判断,js代码从上到下执行，下加载data后挂载元素-->
					<block v-if="cates.length>0">
						<view class="bottom_list" v-for="(item) in cates[curIndex].children">
							<view>
								<image :src="item.img" alt="">
									<span>{{item.catename}}</span>
							</view>
						</view>
						<view v-if="cates[curIndex].children.length==0">暂无二级分类</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates:[],
				curIndex:0
			}
		},
		mounted() {
			this._getCates()
		},
		methods: {
			async _getCates() {//点击首页商品分类，进入全部分类页面
			  let res = await this.$api._getcates()
			   // console.log(res)
			   res.data.list.map((item)=>{
				   item.children = item.children || []
				   item.children.map((val)=>{
					  val.img = this.$baseUrl + val.img
				   })

			   })
			   this.cates = res.data.list || []
			   console.log(this.cates)
			},
			changeIndex(index) {//改变cates的index
				this.curIndex = index
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}

	.bottom {
		text-align: center;
		display: flex;
		flex-direction: row;
	}
</style>
