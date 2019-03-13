export default {
	// 设置当前小说ID, 初始化章节列表，内容列表
	setNovelId: function (state, novelId) {
		state.novelId = novelId;
		state.sections = [];
		state.contents = [];
	},
	// 设置累加小说章节，若数组为空，清空章节列表；不为空，则合并
	setNovelSections: function (state, sections) {
		if(sections.length === 0) {
			state.sections = [];
		} else {
			state.sections = state.sections.concat(sections);
		}
	},
}