export default [{
	path: '/',
	name: 'storyList',
	component: () => import('./storyList.vue')
},{
	path: '/story-detail/:novelId',
	name: 'storyDetail',
	component: () => import('./storyDetail.vue')
},{
	path: '/story-page',
	name: 'storyPage',
	component: () => import('./storyPage.vue')
}]