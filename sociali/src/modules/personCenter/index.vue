<script>
import {mapGetters} from 'vuex';
export default {
	created() {
		this.getBackground({userId: 1});
		this.getHeadImg({userId: 1});
	},
	data() {
		return {
			fileList: [],
			dialogUpload: false,
			uploadType: {type: 1},
			headUrl: 'static/img/headerImg1.png'
		}
	},
	methods: {
	    submitUpload() {
	        this.$refs.upload.submit();
	    },
	    upload(val) {
	    	this.dialogUpload = true;
	    	this.uploadType.type = val;
	    },
	    uploadSuccess() {
	    	this.dialogUpload = false;
	    	this.message(this, 'success', '文件上传成功');
	    	this.getBackground({userId: 1});
	    	this.getHeadImg({userId: 1});
	    	this.$refs.upload.clearFiles();
	    },
	    /**
	     * [getBackground 获取背景图片]
	     * @return {[type]} [description]
	     */
	    async getBackground(userid) {
	    	try {
	    		let code = await this.$store.dispatch('getBackground', userid);
	    		if (Object.is(code.status, 1)) {
	    			this.$refs.image.style.background = `url(${code.imgPre}) no-repeat`;
	    			this.$refs.image.style.backgroundSize = '100% 100%';
	    		}
	    	} catch (e) {
	    		throw e;
	    	} finally {
	    	}
	    },
	    async getHeadImg(userId) {
	    	try {
	    		let code = await this.$store.dispatch('getHeadImg', userId);
	    		if (Object.is(code.status, 1)) {
	    			this.headUrl = code.headImg;
	    		}
	    	} catch (e) {
	    		throw e;
	    	} finally {
	    	}
	    }
	},
	computed: {
		...mapGetters({
			backGround: 'backGround',
			headImg: 'headImg',
			message: 'message'
		})
	}
}
</script>

<template>
<div class="person-center">
	<div class="cover-background" ref="image">
	    <img src="static/img/background.png" title="上传背景图片" width="40" height="40" @click="upload(1)"/><br/><br/>
	    <img :src="headImg" title="上传头像" width="130" @click="upload(2)"/>
	</div>
	<!-- 弹框model -->
    <el-dialog title="上传图片" :visible.sync="dialogUpload" width="30%">
        <el-upload class="upload-demo" ref="upload" :file-list="fileList" :auto-upload="false"
		  action="http://localhost:3000/homePage/background"
		  :data="uploadType"
		  :on-success="uploadSuccess">
		  <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
		  <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传</el-button>
		</el-upload>
    </el-dialog>
    <div class="flex">
    	<div class="left">
    		<div><span>个人简介</span><el-button size="mini"type="success">编辑</el-button></div>
    		<div class="person-instro"></div>
    	</div>
    	<div class="right"></div>
    </div>
</div>
</template>y

<style scoped lang="stylus">
.person-center
    color black
.cover-background
    position relative
    height 200px
    background #EEEEEE
    border 1px solid lightgray
    margin-top 2px
.flex
    display flex
    flex-direction row
    justify-content space-between
    .left
        width 250px
        min-height 300px
        border 1px solid green
        padding 10px
        &>div
            background url(../../../static/img/person.png) no-repeat
            padding-left 50px
            span
                margin-right 70px
    .right
        width calc(100% - 290px)
        min-height 300px
        border 1px solid red
</style>

