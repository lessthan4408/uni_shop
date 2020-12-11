import http from './http.js'

const _getCate = ()=>{//获取分类列表
	let options = {
		url:'/api/getcate'
	}
	return http(options)
}

const _getBanner=()=>{//获取轮播图
	let options = {
		url:'/api/getbanner'
	}
	return http(options)
}

const _getSeckill=()=>{//获取秒杀活动
	let options = {
		url:'/api/getseckill'
	}
	return http(options)
}

const _getindexgoods=()=>{//获取底部tab内容
	let options = {
		url:'/api/getindexgoods'
	}
	return http(options)
}

const _getcategoodPage=(data={})=>{//获取产品列表且分页
	let options={
		url:"/api/getcategoodPage",
		data
	}
	return http(options)
}

const _getDetail=(data={})=>{//获取具体商品信息
	let options = {
		url:'/api/getgoodsinfo',
		data
	}
	return http(options)
}

const _getcates=()=>{//获取所有分类列表,数据呈递归树状
	let options = {
		url:'/api/getcates'
	}
	return http(options)
}

const _getIdentCode=(data={})=>{//获取验证短信
	let options={
		url:'/api/sms',
		data
	}
	return http(options)
}

const _login=(data={}) =>{//点击登录按钮
	let options = {
		url:'/api/wxlogin',
		data
	}
	return http(options)
}

const _checkToken =(header={})=>{//使用后台接口验证token的有效性
	let options = {
		url:'/api/checktoken',
		header
	}
	return http(options)
}

const _addCart = (data={},header={})=>{//添加商品到购物车
	let options = {
		url:'/api/cartadd',
		data,
		header
	}
	return http(options)
}

const _getCartList = (data={},header={})=>{//获取购物车列表
	let options = {
		url:'/api/cartlist',
		data,
		header
	}
	return http(options)
}

const _delCart=(data={},header={})=>{//删除购物车一条商品
	let options = {
		url:'/api/cartdelete',
		data,
		header
	}
	return http(options)
}

const _editCart=(data={},header={})=>{//编辑购物车并同步到数据库中
	let options = {
		url:'/api/cartedit',
		data,
		header
	}
	return http(options)
}

const _orderAdd = (data={},header={})=>{//提交订单至订单列表
	let options = {
		url:'/api/orderadd',
		data,
		header
	}
	// console.log(options)
	return http(options)
}

const _orderList = (data={},header={})=>{
	let options = {
		url:'/api/orders',
		data,
		header
	}
	// console.log(options)
	return http(options)
}

const _search = (data={})=>{
	let options = {
		url:'/api/search',
		data
	}
	return http(options)
}

export default {
	_getCate,
	_getBanner,
	_getSeckill,
	_getindexgoods,
	_getcategoodPage,
	_getDetail,
	_getcates,
	_getIdentCode,
	_login,
	_checkToken,
	_addCart,
	_getCartList,
	_delCart,
	_editCart,
	_orderAdd,
	_orderList,
	_search
}