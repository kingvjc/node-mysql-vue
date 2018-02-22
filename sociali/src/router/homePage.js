
export default {
	path: '/home-page',
	name: 'homePage',
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/homePage')));
	},
	children: []
}
