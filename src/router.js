import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [];
const context = require.context('./views', true, /router\.js$/);
context.keys().map(item => {
	const r = context(item).default;
	if(r instanceof Array) r.map(i => routes.push(i))
	if(r.constructor === Object) routes.push(r)
});

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})