<script>
	// 项目的根组件
	import checkToken from './utils/checkToken.js'
	
	export default {
		async onLaunch() {
			if(process.env.NODE_ENV === 'development'){
				//做开发操作配置设置
			    console.log('开发环境')
			}else{
				// 做生产环境配置设置
			    console.log('生产环境')
			}
			
			//验证token的有效性
			let token = uni.getStorageSync('token')||null//uni.getStorageSync('token')没有的话为空格字符串，所以需要设置默认为null
			// console.log(token)
			let tokenRight = await checkToken(token,this)
			// console.log(tokenRight)
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
