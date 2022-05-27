<template>
  <div id="cartBottomBar">
    <div class="select">
      <input id="allSelect" type="checkbox" :checked="isSelectedAll" :disabled="notHasProduct" @click="allCheckboxClick">
      <label for="allSelect">全选</label>
    </div>
    <div class="total-price">
      合计：{{ totalPrice }}
    </div>
    <div class="pay" @click="toPay" :class="{'not-selected': !isSelectedAll}">
      去支付({{ totalCount }})
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "CartBottomBar",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getProductListForCart', 'getProductListLengthForCart']),
    selectProduct() {
      return this.getProductListForCart.filter(product => product.selected);
    },
    totalPrice() {
      return '￥' + this.selectProduct.reduce((totalPrice, product) => totalPrice + product.price * product.count, 0).toFixed(2);
    },
    totalCount() {
      return this.selectProduct.reduce((totalCount, product) => totalCount + product.count, 0)
    },
    isSelectedAll() {
      if (this.getProductListLengthForCart < 1) return false;
      return !this.getProductListForCart.find(product => !product.selected);
    },
    notHasProduct() {
      return this.getProductListLengthForCart < 1;
    }
  },
  methods: {
    allCheckboxClick() {
      if (this.isSelectedAll)
        this.getProductListForCart.forEach(product => product.selected = false);
      else
        this.getProductListForCart.forEach(product => product.selected = true);
    },
    toPay() {
      if (!this.isSelectedAll) {
        this.$toast.show('请选择需要购买的商品！');
      }
    }
  }
}
</script>

<style scoped>
#cartBottomBar {
  display: flex;
  height: 44px;
  line-height: 44px;
  background-color: #eee;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 49px;
}

.select {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
  margin-right: 5px;
}

.select input[type='checkbox'] {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.total-price {
  flex: 1;
  color: var(--color-high-text);
}

.pay {
  background-color: #ff6422;
  color: #fff;
  padding: 0 20px;
  text-align: center;
}

.pay.not-selected {
  background-color: #aba9a9;
}
</style>
