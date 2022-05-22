<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoaded"/>
    <p class="item-title">{{ info.title }}</p>
    <div class="item-feature">
      <span class="item-price-origin" v-if="hasOrgPrice">{{ info.orgPrice }}</span>
      <span class="item-price">￥{{ info.price }}</span>
      <span class="item-collect">{{ info.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    info: Object,
    default() {
      return {};
    }
  },
  computed: {
    showImage() {
      return this.info.image || this.info.show.img;
    },
    hasOrgPrice() {
      return this.info.orgPrice !== undefined && this.info.orgPrice !== '' && this.info.orgPrice !== '￥' && this.info.orgPrice.substring(1) !== this.info.price;
    }
  },
  methods: {
    imageLoaded() {
      this.$eventBus.$emit('imageLoaded');
    },
    itemClick() {
      this.$router.push({path: '/detail', query: {iid: this.info.iid}});
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  flex: 0 1 47%;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
}

.goods-list-item img {
  width: 100%;
  border-radius: 8px;
}

.goods-list-item .item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px 4px;
}

.goods-list-item .item-feature {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0 4px 20px;
}

.goods-list-item .item-feature .item-price-origin {
  text-decoration: line-through;
}

.goods-list-item .item-feature .item-price {
  font-size: 13px;
  color: var(--color-high-text);
}


.goods-list-item .item-feature .item-collect {
  margin-left: auto;
  position: relative;
}

.goods-list-item .item-feature .item-collect:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -16px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px no-repeat;
}
</style>
