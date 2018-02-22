
<script>
import {
	mapMutations,
	mapGetters
} from 'vuex';
export default {
	created() {
		this.getUserList({userId: 'csyang'});
	},
	data() {
        return {
        }
    },
	methods: {
		...mapMutations({
			setLoading: 'CHANGE_LOADING_STATE'
		}),
		async getUserList(val) {
			this.setLoading(true);
			try {
				 await this.$store.dispatch('getUserList', val);
			} catch (e) {
				throw e;
			} finally {
				this.setLoading(false);
			}
		},
		zanNum(val) {
			let params = {
				id: val
			};
		    this.getZanNum(params);
		},
		async getZanNum(val) {
			this.setLoading(true);
			try {
				let code = await this.$store.dispatch('getZanNum', val);
				if (code.status === 1) {
					this.getUserList();
				}
			} catch (e) {
				throw e;
			} finally {
				this.setLoading(false);
			}
		},
		skip(val) {
			this.$router.push({
				name: 'personCenter',
				query: {
					id: val
				}
			});
		}
	},
	computed: {
		...mapGetters({
			userList: 'userList'
		})
	}
}
</script>
<template>
<div class="home-page">
	<div class="page-photo" v-for="item in userList">
		<img :src="item.image" width="200px" height="200px" @click="skip(item.id)">
		<div class="page-content">
		    <p class="guanzhu"><span>{{item.name}}</span><el-button type="text">+关注</el-button></p>
		    <p class="zan"><span>{{item.num}}位赞</span><el-button :style="{color: item.status === 1?'#3a8ee6':''}" icon="el-icon-star-off" size="mini" @click="zanNum(item.id)">赞</el-button></p>
		</div>
	</div>
</div>
</template>
<style scoped lang="stylus">
.home-page
    border 1px solid lightgray;
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content center
.page-photo
    width 206px
    height 206px
    margin 8px
    img
       border 1px solid lightgray
       padding 2px
       margin 0
.el-button
    padding 4px
.page-content
    margin-top -60px
    margin-left 10px
    p
        margin 0
.guanzhu
    .el-button
       margin-left 10px
.zan
    .el-button
        margin-left 90px
span
    color white
</style>