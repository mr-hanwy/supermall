<template>
  <div id="detail">
    <detail-nav-bar ref="navBar" @ctrlItemClick="ctrlItemClick"/>
    <b-scroll class="b-scroll" ref="scroll" :probe-type="3" @scroll="currenScrollPosition">
      <detail-swiper ref="swiper" :items="swiperItems" @imageLoaded="imageLoaded"/>
      <detail-base-goods-info :goods-info="goodsInfo"/>
      <detail-shop-info :shop-info="shopInfo"/>
      <detail-more-goods-info :more-info="moreGoodsInfo" @imageLoaded="imageLoaded"/>
      <goods-params-info ref="params" :goods-params-info="goodsParamsInfo"/>
      <goods-evaluation-info ref="evaluation" :evaluation-info="evaluationInfo" @imageLoaded="imageLoaded"/>
      <goods-list ref="recommend" :goods="recommendGoodsInfo"/>
    </b-scroll>
    <detail-bottom-bar @addToCartClick="addToCartClick"/>
    <back-top @click.native="backToTopBtnClick" v-show="backToTopBtnIsShow"/>
  </div>
</template>

<script>
import DetailNavBar from "./component/DetailNavBar";
import DetailSwiper from "./component/DetailSwiper";
import DetailBaseGoodsInfo from "./component/DetailBaseGoodsInfo";
import DetailShopInfo from "./component/DetailShopInfo";
import DetailMoreGoodsInfo from "./component/DetailMoreGoodsInfo";
import GoodsParamsInfo from "./component/GoodsParamsInfo";
import GoodsEvaluationInfo from "./component/GoodsEvaluationInfo";
import DetailBottomBar from "./component/DetailBottomBar";

import GoodsList from "components/content/goodsList/GoodsList";

import BScroll from "components/commons/scroll/BScroll";

import {getDetail, getRecommend, GoodsInfo} from "network/detail";
import {debounce} from "commons/utils";
import {backToTopMixin, imageLoadedMixin} from "commons/mixin";

export default {
  name: "Detail",
  mixins: [backToTopMixin, imageLoadedMixin],
  components: {
    DetailNavBar, DetailSwiper, DetailBaseGoodsInfo, DetailShopInfo, DetailMoreGoodsInfo, GoodsParamsInfo, GoodsEvaluationInfo, DetailBottomBar,
    GoodsList,
    BScroll
  },
  data() {
    return {
      iid: null,
      swiperItems: null,
      refresh: null,
      goodsInfo: {},
      shopInfo: {},
      moreGoodsInfo: {},
      goodsParamsInfo: {},
      evaluationInfo: null,
      recommendGoodsInfo: null,
      navPositionY: [],
      navCurrentIndex: 0,
      getNavPositionY: null
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
      if (data.rate.cRate > 0) {
        this.evaluationInfo = data.rate.list;
      }

    });

    getRecommend().then(result => {
      this.recommendGoodsInfo = result.data.list;
    });

    this.getNavPositionY = debounce(() => {
      this.navPositionY = [];
      this.navPositionY.push(this.$refs.swiper.$el.offsetTop);
      this.navPositionY.push(this.$refs.params.$el.offsetTop);
      this.navPositionY.push(this.$refs.evaluation.$el.offsetTop);
      this.navPositionY.push(this.$refs.recommend.$el.offsetTop);
      this.navPositionY.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    currenScrollPosition(position) {
      let y = Math.abs(position.y);

      // 监听显示 backToTop 按钮
      this.listenerBackToTopButtonShow(y);

      let navPositionsYLength = this.navPositionY.length - 1;
      for (let i = 0; i < navPositionsYLength; i++) {
        if (this.navCurrentIndex !== i && (y >= this.navPositionY[i]) && y < this.navPositionY[i + 1]) {
          this.navCurrentIndex = i;
          this.$refs.navBar.currentIndex = this.navCurrentIndex;
        }
      }
    },
    imageLoaded() {
      this.getNavPositionY();
    },
    ctrlItemClick(ctrlItemIndex) {
      this.$refs.scroll.scrollTo(0, this.navPositionY[ctrlItemIndex] * -1);
    },
    addToCartClick() {
      let product = {};
      product.iid = this.iid;
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.realPrice;
      product.image = this.swiperItems[0];
      this.$store.dispatch('addProductToCart', product).then(message => {
        this.$toast.show(message);
      });
    }
  },
  destroyed() {
    this.$eventBus.$off('imageLoaded', this.imageLoadedListener);
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  background-color: #fff;
  position: relative;
  z-index: 1;
}

.b-scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
