import baseUrl from './config.js'

const http = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl + options.url,
			method:options.method || 'get',
			data:options.data || {},
			header:options.header || {"content-type":'application/json'},
			success:resolve,
			fail:reject
		})
	})
}

export default http