import Vue from 'vue';
import Vuex from 'vuex';
import env from './env';
import commonFunction from './commonFunction';
import user from './user';
import homePage from './homePage';
import personCenter from './personCenter';

Vue.use(Vuex);

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		env, commonFunction, user, homePage, personCenter
	}
})