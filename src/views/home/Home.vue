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
    <back-top @click.native="backToTopBtnClick" v-show="backToTopBtnIsShow"/>
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

import {backToTopMixin, imageLoadedMixin} from "commons/mixin";

export default {
  name: "Home",
  mixins: [backToTopMixin, imageLoadedMixin],
  components: {
    HomeNavBar, HomeSwiper, Recommend, Feature,
    TabCtrl, GoodsList,
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
    this.$eventBus.$off('imageLoaded', this.imageLoadedListener);
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
    currenScrollPosition(position) {
      let y = Math.abs(position.y);
      // 监听显示 backToTop 按钮
      this.listenerBackToTopButtonShow(y);

      // 判断 tab-ctrl 是否吸顶
      this.isTabCtrlFixed = y > this.$refs.tabCtrl.$el.offsetTop;
    },
    loadMore() {
      this.getGoodsList(this.currentGoodsType);
    }/* ================== 监听事件 end ================== */
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
  z-index: 1;
}
</style>
