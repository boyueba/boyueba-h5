import apiAxios from './request';
export default {
	novelType: '/novel/type', // 小说分类
	novelList: '/novel/list', // 小说列表
	novelInfo: '/novel/one', // 小说详情页
	novelSection: '/novel/section', // 获取小说章节列表
	novelContent: '/novel/content', // 获取小说具体章节
	
	get: function (url, data) {
		return apiAxios("GET", url, data);
	}
}

