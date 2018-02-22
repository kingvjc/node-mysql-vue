
export default {
	path: '/person-center',
	name: 'personCenter',
	component(resolve) {
		require.ensure([], () => resolve(require('../modules/personCenter')));
	},
	children: []
}