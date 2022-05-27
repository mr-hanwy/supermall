<template>
  <div id="app">
    <!-- 保持页面访问状态，详情页不需要保持 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import "assets/css/base.css";
</style>
