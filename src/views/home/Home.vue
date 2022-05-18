<template>
  <div id="home">
    <!-- 顶部标题栏 -->
    <home-nav-bar/>
    <!-- 导航（实现吸顶效果） -->
    <tab-ctrl class="fixed-tab-ctrl" :texts="['流行','新款','精选']" @tabClick="tabClick" ref="fixedTabCtrl" v-show="isTabCtrlFixed"/>
    <!-- 滚动视图 -->
    <b-scroll class="b-scroll" ref="scroll" :probeType="3" @scroll="currenScrollPosition" :pull-up-load="true" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners"/>
      <!-- 推荐 -->
      <recommend :recommend="recommend"/>
      <!-- 流行 -->
      <feature/>
      <!-- 导航 -->
      <tab-ctrl :texts="['流行','新款','精选']" @tabClick="tabClick" ref="tabCtrl"/>
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
      backTopIsShow: false,
      isTabCtrlFixed: false,
      scrollPositionY: 0
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
  activated() {
    this.$refs.scroll.scrollTo(0, this.scrollPositionY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.scrollPositionY = this.$refs.scroll.getScrollPositionY();
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
      this.$refs.tabCtrl.currentIndex = index;
      this.$refs.fixedTabCtrl.currentIndex = index;
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    currenScrollPosition(position) {
      // 判断是否需要显示 backTop 按钮
      this.backTopIsShow = Math.abs(position.y) > 1000;

      // 判断 tab-ctrl 是否吸顶
      this.isTabCtrlFixed = Math.abs(position.y) > this.$refs.tabCtrl.$el.offsetTop;
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

      return function (...args) {
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

.fixed-tab-ctrl {
  position: relative;
  z-index: 999;
}
</style>
