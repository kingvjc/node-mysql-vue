<template>
<div id="header">
	<ul class="header">
		<router-link tag="li" to="/entertainment">娱乐版块</router-link>
		<router-link tag="li" to="/friend">好友圈</router-link>
		<router-link tag="li" to="/video-share">视频分享</router-link>
		<router-link tag="li" to="/photo">摄影圈</router-link>
		<router-link tag="li" to="/home-page">公共主页</router-link>
		<router-link tag="li" to="/person-center">个人中心</router-link>
		<router-link tag="li" to="/setting">设置</router-link>
	</ul>
</div>
</template>
<style scoped lang="stylus">
#header
    padding 0 10px
    background lightgray
ul
    padding 0
    margin 0
    list-style none
    li
        padding 14px 20px
        cursor pointer
        &:hover
           background #BAB9B9
.header
    height 45px
    display flex
    flex-direction row
    justify-content flex-end
    align-items center
.router-link-active
    background gray
</style>