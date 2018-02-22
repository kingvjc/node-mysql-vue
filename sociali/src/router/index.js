import Vue from 'vue';
import Router from 'vue-router';
import homePage from './homePage';
import personCenter from './personCenter';
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const home = {
	path: '/',
	redirect: to => {
		return '/home-page';
	},
	name: 'home',
}
const router = new Router({
    routes: [home, homePage, personCenter]
});
export default router;
