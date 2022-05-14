<template>
  <div id="home">
    <!-- 顶部标题栏 -->
    <home-nav-bar/>
    <!-- 轮播图 -->
    <home-swiper :banners="banners"/>
    <!-- 推荐 -->
    <recommend :recommend="recommend"/>
  </div>
</template>

<script>
import HomeNavBar from "./component/HomeNavBar";
import HomeSwiper from "./component/HomeSwiper";
import Recommend from "./component/Recommend";

import {getMultiData} from "network/home";

export default {
  name: "Home",
  components: {HomeNavBar, HomeSwiper, Recommend},
  data() {
    return {
      banners: null,
      dKeyword: null,
      keywords: null,
      recommend: null
    }
  },
  created() {
    getMultiData().then(result => {
      this.banners = result.data.banner.list;
      this.dKeyword = result.data.dKeyword.list;
      this.keywords = result.data.keywords.list;
      this.recommend = result.data.recommend.list;
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
.nav-bar {
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>
