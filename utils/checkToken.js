const checkToken = async(token,_this)=>{//该函数返回一个promise
	if(token==null) {//未登录  code 500
		// console.log(11)
		uni.setTabBarItem({
			index:2,
			text:'未登录'
		})
		return false
	} else {//已登录
		let res = await _this.$api._checkToken({authorization:token})
		// console.log(res)
		if(res.data.code == 200) {//token未失效  code 200
			// console.log(22)
			uni.setTabBarItem({
				index:2,
				text:'我的'
			})
			return true
		} else {//token已失效,可将token字段改为1234模拟  code 403
			// console.log(33)
			uni.setTabBarItem({
				index:2,
				text:'未登录'
			})
			return false
		}
	}
}
export default checkToken

