
<script>
import {mapGetters} from 'vuex'
export default {
	created() {
	},
	data() {
		return {
		}
	},
	computed: {
		...mapGetters({
			loading: 'loading'
		})
	}
}
</script>
<template>
<div class="loading-content"
v-loading.fullscreen.lock="loading"
element-loading-text="加载中，请稍等..."
element-loading-background="rgba(0, 0, 0, 0.5)"
v-if="loading">
</div>
</template>