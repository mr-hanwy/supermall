<template>
  <div id="home">
    <!-- 顶部标题栏 -->
    <home-nav-bar/>
    <b-scroll class="b-scroll">
      <!-- 轮播图 -->
      <home-swiper :banners="banners"/>
      <!-- 推荐 -->
      <recommend :recommend="recommend"/>
      <!-- 流行 -->
      <feature/>
      <!-- 导航 -->
      <tab-ctrl class="tab-ctrl" :texts="['流行','新款','精选']" @tabClick="tabClick"/>
      <!-- 商品列表 -->
      <goods-list :goods="currentGoodsList"/>
    </b-scroll>
  </div>
</template>

<script>
import HomeNavBar from "./component/HomeNavBar";
import HomeSwiper from "./component/HomeSwiper";
import Recommend from "./component/Recommend";
import Feature from "./component/Feature";

import TabCtrl from "components/content/tabController/TabCtrl";
import GoodsList from "components/content/goodsList/GoodsList";

import BScroll from "components/commons/scroll/BScroll";

import {getGoodsList, getMultiData} from "network/home";

export default {
  name: "Home",
  components: {HomeNavBar, HomeSwiper, Recommend, Feature, TabCtrl, GoodsList, BScroll},
  data() {
    return {
      banners: null,
      dKeyword: null,
      keywords: null,
      recommend: null,
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentGoodsType: 'pop'
    }
  },
  created() {
    this.getMultiData();

    this.getGoodsList('pop');
    this.getGoodsList('new');
    this.getGoodsList('sell');
  },
  computed: {
    currentGoodsList() {
      return this.goods[this.currentGoodsType].list;
    }
  },
  methods: {
    getMultiData() {
      getMultiData().then(result => {
        this.banners = result.data.banner.list;
        this.dKeyword = result.data.dKeyword.list;
        this.keywords = result.data.keywords.list;
        this.recommend = result.data.recommend.list;
      }).catch(err => {
        console.log(err);
      });
    },
    getGoodsList(type) {
      let page = this.goods[type].page + 1;
      getGoodsList(type, page).then(result => {
        this.goods[type].list.push(...result.data.list)
        this.goods[type].page = page;
      }).catch(err => {
        console.log(err);
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentGoodsType = 'pop';
          break;
        case 1 :
          this.currentGoodsType = 'new';
          break;
        case 2:
          this.currentGoodsType = 'sell';
          break;
      }
    }
  }
}
</script>

<style scoped>

#home {
  height: 100vh;
  position: relative;
}

.b-scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
