<template>
  <div id="shopcart">
    <cart-nav-bar/>
    <b-scroll class="b-scroll" ref="scroll">
      <product-list ref="productList" :card-product-list="getProductListForCart" @imageLoaded="imageLoaded" @itemCheckboxClick="itemCheckboxClick"/>
    </b-scroll>
    <cart-bottom-bar ref="cartBottomBar"/>
  </div>
</template>

<script>
import CartNavBar from "./component/CartNavBar";
import ProductList from "./component/ProductList";
import CartBottomBar from "./component/CartBottomBar";

import BScroll from "components/commons/scroll/BScroll";
import {imageLoadedMixin} from "commons/mixin";

import {mapGetters} from 'vuex';

export default {
  name: "Shopcart",
  mixins: [imageLoadedMixin],
  data() {
    return {
      selectProductList: []
    }
  },
  components: {
    CartNavBar, ProductList, CartBottomBar,
    BScroll
  },
  computed: {
    ...mapGetters(['getProductListForCart'])
  },
  methods: {
    imageLoaded() {
      this.imageLoadedListener();
    },
    itemCheckboxClick(productIId) {
      this.$store.dispatch('selectProduct', productIId);
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  destroyed() {
    this.$eventBus.$off('imageLoaded', this.imageLoadedListener);
  }
}
</script>

<style scoped>
#shopcart {
  height: 100vh;
  position: relative;
}

.b-scroll {
  position: absolute;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
}
</style>
