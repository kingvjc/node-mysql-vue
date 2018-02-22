import {getUserInfo} from './api.js';

export async function setmethod() {
	let params = {
		page: 1,
		limit: 20,
		userId: 'csyang'
	}
	let data = await getUserInfo(params);
	console.log(data);
}