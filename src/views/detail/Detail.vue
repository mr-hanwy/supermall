<template>
  <div id="detail">
    <detail-nav-bar/>
    <b-scroll class="b-scroll" ref="scroll" :probeType="3" @scroll="currenScrollPosition">
      <detail-swiper :items="swiperItems" @detailSwiperImageLoaded="detailSwiperImageLoaded"/>
      <detail-base-goods-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-more-goods-info :more-info="moreGoodsInfo" @morGoodsImageLoaded="morGoodsImageLoaded"/>
      <goods-params-info :goods-params-info="goodsParamsInfo"/>
    </b-scroll>
    <back-top @click.native="backToTop" v-show="backTopIsShow"/>
  </div>
</template>

<script>
import DetailNavBar from "./component/DetailNavBar";
import DetailSwiper from "./component/DetailSwiper";
import DetailBaseGoodsInfo from "./component/DetailBaseGoodsInfo";
import DetailShopInfo from "./component/DetailShopInfo";
import DetailMoreGoodsInfo from "./component/DetailMoreGoodsInfo";
import GoodsParamsInfo from "./component/GoodsParamsInfo";

import BackTop from "components/content/backTop/BackTop";

import BScroll from "components/commons/scroll/BScroll";

import {getDetail, GoodsInfo} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar, DetailSwiper, DetailBaseGoodsInfo, DetailShopInfo, DetailMoreGoodsInfo, GoodsParamsInfo,
    BackTop,
    BScroll
  },
  data() {
    return {
      iid: null,
      swiperItems: null,
      backTopIsShow: false,
      refresh: null,
      goodsInfo: {},
      shopInfo: {},
      moreGoodsInfo: {},
      goodsParamsInfo: {}
    }
  },
  created() {
    this.iid = this.$route.query.iid;

    getDetail(this.iid).then(result => {
      var data = result.result;
      this.swiperItems = data.itemInfo.topImages;
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
      this.shopInfo = data.shopInfo;
      this.moreGoodsInfo = data.detailInfo;
      this.goodsParamsInfo = data.itemParams;
      console.log(result);
    })
  },
  mounted() {
    this.refresh = this.debounce(this.$refs.scroll.refresh, 500);
  },
  methods: {
    currenScrollPosition(position) {
      // 判断是否需要显示 backTop 按钮
      this.backTopIsShow = Math.abs(position.y) > 1000;
    },
    detailSwiperImageLoaded() {
      this.refresh && this.refresh();
    },
    morGoodsImageLoaded() {
      this.refresh && this.refresh();
    },
    backToTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
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
#detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 99;
}

.b-scroll {
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
