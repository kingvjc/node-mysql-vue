
import request from 'common/request';
// //
export async function getBackgroundUrl(params){
	return await request({
		method: 'get',
		url: 'http://localhost:3000/homePage/bg',
		params: params
	})
}
export async function getHeadImgUrl(params){
	return await request({
		method: 'get',
		url: 'http://localhost:3000/homePage/headImg',
		params: params
	})
}
