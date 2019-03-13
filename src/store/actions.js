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
	// 初始化小说
	async initNovel({state, commit, dispatch}, {novelId}) {
		if(novelId !== state.novelId) {
			commit('setNovelId', novelId);
			await dispatch('getSections');
			return state.sections[0] || {};
		}
	},
	// 获取目录章节列表
	async getSections({state, commit, dispatch}, ) {
		const {pageNum, pageSize} = state.sectionPage;
		const params = {
			novelId: state.novelId,
			pageNum,
			pageSize
		};
		await dispatch('getForm', {
			url: API.novelSection,
			data: params
		}).then(res => {
			console.log('===章节列表===', res);
			commit('setNovelSections', res.list);
		});
	},
	// 获取章节内容
	async getContent({dispatch}, {sectionId}) {
		const params = {
			sectionId
		};
		const obj = {
			title: await dispatch('getSectionTitleBySectionId', sectionId)
		};
		await dispatch('getForm', {
			url: API.novelContent,
			data: params
		}).then(res => {
			console.log('===具体章节===', res);
			const content = res.content;
			obj.content = content;
		});
		return obj;
	},
	// 根据章节id获取章节title
	getSectionTitleBySectionId({state}, sectionId) {
		const section = state.sections.filter(item => parseInt(sectionId) === item.sectionId)[0] || {};
		return section.sectionTitle;
	}
};