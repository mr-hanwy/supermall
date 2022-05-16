<template>
  <div id="home">
    <!-- 顶部标题栏 -->
    <home-nav-bar/>
    <!-- 滚动视图 -->
    <b-scroll class="b-scroll" ref="scroll" :probeType="3" @scroll="scrollTo" :pull-up-load="true" @pullingUp="loadMore">
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
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTop" v-show="backTopIsShow"/>
  </div>
</template>

<script>
import HomeNavBar from "./component/HomeNavBar";
import HomeSwiper from "./component/HomeSwiper";
import Recommend from "./component/Recommend";
import Feature from "./component/Feature";

import TabCtrl from "components/content/tabController/TabCtrl";
import GoodsList from "components/content/goodsList/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import BScroll from "components/commons/scroll/BScroll";

import {getGoodsList, getMultiData} from "network/home";

export default {
  name: "Home",
  components: {
    HomeNavBar, HomeSwiper, Recommend, Feature,
    TabCtrl, GoodsList, BackTop,
    BScroll
  },
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
      currentGoodsType: 'pop',
      backTopIsShow: false
    }
  },
  created() {
    this.getMultiData();

    this.getGoodsList('pop');
    this.getGoodsList('new');
    this.getGoodsList('sell');
  },
  mounted() {

    const refresh = this.debounce(this.$refs.scroll.refresh, 500);

    this.$eventBus.$on('imageLoaded', () => {
      refresh();
    })
  },
  computed: {
    currentGoodsList() {
      return this.goods[this.currentGoodsType].list;
    }
  },
  methods: {
    /**
     * ================== 请求数据 Start ==================
     */
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
        this.$refs.scroll.finishPullUp();
      }).catch(err => {
        console.log(err);
      });
    },/* ================== 请求数据 end ================== */
    /**
     * ================== 监听事件 Start ==================
     */
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
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    scrollTo(position) {
      this.backTopIsShow = Math.abs(position.y) > 1000;
    },
    loadMore() {
      this.getGoodsList(this.currentGoodsType);
    },/* ================== 监听事件 end ================== */

    /**
     *  防抖函数
     *  放置在指定时间内频繁调用函数或请求数据
     * @param func 需要执行的函数
     * @param delay 等待时间
     * @returns {(function(...[*]): void)|*} 最终调用的函数
     */
    debounce(func, delay) {
      let timer = null;

      return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
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
