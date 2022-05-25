<template>
  <div id="detailBottomBar">
    <div class="bottom-bar bottom-bar-left">
      <div class="customer-service">
        <span class="icon"></span><br/><span>客服</span>
      </div>
      <div class="shop">
        <span class="icon"></span><br/><span>店铺</span>
      </div>
      <div class="collection">
        <span class="icon"></span><br/><span>收藏</span>
      </div>
    </div>
    <div class="bottom-bar bottom-bar-right">
      <div class="add-to-cart" @click="addToCartClick">
        <span>加入购物车</span>
      </div>
      <div class="purchase">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCartClick() {
      this.$emit('addToCartClick');
    }
  }
}
</script>

<style scoped>
#detailBottomBar {
  height: 49px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, .1);

  display: flex;
  text-align: center;
}

.bottom-bar {
  flex: 1;
  display: flex;
  font-size: 14px;
}

.bottom-bar > div {
  flex: 1;
}

.bottom-bar .icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100% repeat;
  margin: 4px auto 0;
}

.bottom-bar-left .customer-service .icon {
  background-position: 0 98px;
}

.bottom-bar-left .shop .icon {
  background-position: 0 52px;
}

.bottom-bar-left .collection .icon {
  background-position: 0 0;
}

.bottom-bar-right {
  font-size: 16px;
  line-height: 49px;
}

.bottom-bar-right .add-to-cart {
  background-color: #ffdd00;
}


.bottom-bar-right .purchase {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
