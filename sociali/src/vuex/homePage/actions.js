import {
	getUserListUrl,
	zanNumUrl
} from './api';

export async function getUserList({commit}, params) {
	let data = await getUserListUrl(params);
	commit('SET_USER_LIST', data.list);
	return data;
}

export async function getZanNum({commit}, params) {
	console.log(params);
	let data = await zanNumUrl(params);
	return data;
}