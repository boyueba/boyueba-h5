import apiAxios from './request';
export default {
	novelList: '/novel/list', // 小说列表
	novelSection: '/novel/section', // 获取小说章节列表
	novelContent: '/novel/content', // 获取小说具体章节
	
	get: function (url, data) {
		return apiAxios("GET", url, data);
	}
}

