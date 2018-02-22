
import 'isomorphic-fetch';
import errMessage from './errorMessage';
const header = {
	    'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
}
export default  function request(params) {
	let reqheader = {
		  method: params.method,
		  headers: header
		  // credentials: 'include'// 支持携带cookie
	}

	// 处理get请求中的参数
	let url = `${params.url}?t=${+new Date()}`;
	if (params.method === 'get') {
  		for (let i in params.params) {
  			url += `&${i}=${params.params[i]}`;
  		}
	}
	if (params.method !== 'get') {
		  reqheader.body = `data=${JSON.stringify(params.params)}`;
	}
  return new Promise((resolve, reject) => {
      fetch(url, reqheader).then(response => {
          if (response.status !== 200) {
              errMessage.$emit('requestError', '后台程序崩溃了');
              reject(response);
          }
          return response.json();
      }).then(data => {
          switch (Number(data.status)) {
              case 0:
                  errMessage.$emit('requestError', data.errorInfo);
              case 1:
                  break;
              default:
                  errMessage.$emit('requestError', '后台程序崩溃了');
          }
          resolve(data);
      }).catch(error => {
          reject(error);
      });
  });
}
