<script>

import plHeader from 'modules/global/header';
import errMessage from './common/errorMessage';
import loading from './components/loading';
export default {
  created() {
    errMessage.$on('requestError', (mes) => {
        let error = mes || '后台接口崩溃了';
        this.$alert(mes, '', {
            type: 'error',
            confirmButtonText: '确定'
        });
    });
  },
  data() {
    return {
    }
  },
  components: {
    plHeader,
    loading
  }
}
</script>
<template>
<div id="app">
    <pl-header></pl-header>
    <div class="content">
        <router-view></router-view>
        1111111
    </div>
    <loading></loading>
</div>
</template>

<style scoped lang="stylus">
#app
    padding 0px
    margin 0px
    font-size 13px
</style>
