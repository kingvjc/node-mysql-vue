
import request from 'common/request';
//
export async function getUserListUrl(params){
	return await request({
		method: 'get',
		url: 'http://localhost:3000/homePage/pageList',
		params: params
	})
}
export async function zanNumUrl(params){
	return await request({
		method: 'post',
		url: 'http://localhost:3000/homePage/zanNum',
		params: params
	})
}
