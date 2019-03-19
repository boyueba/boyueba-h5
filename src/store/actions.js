import apiAxios from "../common/request";
import API from "../common/api";

export default {
	// get请求方法
	getForm(context, params) {
		const {url, data} = params;
		return apiAxios("GET", url, data);
	},
	// post请求方法
	postForm(context, params) {
		const {url, data} = params;
		return apiAxios("POST", url, data);
	},
	// 获取章节内容
	async getContent({dispatch}, params) {
		let obj = {};
		await dispatch('getForm', {
			url: API.novelContent,
			data: params
		}).then(res => {
			obj = res;
		});
		return obj;
	},
	// 根据章节id获取章节title
	getSectionTitleBySectionId({state}, sectionId) {
		const section = state.sections.filter(item => parseInt(sectionId) === item.sectionId)[0] || {};
		return section.sectionTitle;
	}
};