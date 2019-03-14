import {publicPath} from './config';
import axios from 'axios';
import {Toast} from 'mint-ui';
import {baseUrl} from './CONSTANT'

axios.defaults.baseURL = baseUrl + "/api";

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	// console.log('对响应数据做点什么', response)
	if(response.status === 200)
		return response.data;
	else
		return {}
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

const apiAxios = (method, url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: method,
			url: url,
			data: method === 'POST' || method === 'PUT' ? params : null,
			params: method === 'GET' || method === 'DELETE' ? params : null,
			headers: {Authorization: sessionStorage.token || ''}
		}).then(function (res) {
			console.log('axios1', res, params);
			if(res.hasOwnProperty('data') && res.data){
				resolve(res.data);
			}
		}).catch(function (err) {
			reject(err);
		})
	});
};

export default apiAxios;