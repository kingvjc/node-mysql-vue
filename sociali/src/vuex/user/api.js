
import request from 'common/request';
//
export async function getUserInfo(params){
	return await request({
		method: 'get',
		url: 'http://localhost:3000/users',
		params: params
	})
}
