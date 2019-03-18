export default {
	baseUrl: process.env.NODE_ENV === 'development' ? '' : 'http://www.boyueba.com:8090/byb',
	storyState: [{
		key: 0,
		value: '未知'
	}, {
		key: 1,
		value: '未完本'
	}, {
		key: 2,
		value: '完本'
	}]
}