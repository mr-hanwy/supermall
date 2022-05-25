<template>
  <div id="productList">
    <div class="list-item" v-for="item in cardProductList" :key="item.iid">
      <div class="item item-check-box">
        <input type="checkbox" :checked="item.selected" @click="itemCheckboxClick(item.iid)">
      </div>
      <div class="item item-image">
        <img :src="item.image" alt="" @load="imageLoaded"/>
      </div>
      <div class="item item-info">
        <p class="title">{{ item.title }}</p>
        <p class="desc">{{ item.desc }}</p>
        <div class="info-attr">
          <span class="price">￥{{ item.price }}</span>
          <span class="count">x{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    cardProductList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoaded() {
      this.$emit('imageLoaded');
    },
    itemCheckboxClick(iid) {
      this.$emit('itemCheckboxClick', iid);
    }
  },
}
</script>

<style scoped>
.list-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.list-item .item-check-box {
  flex: 0 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}

.list-item .item-check-box input[type='checkbox'] {
  width: 16px;
  height: 16px;
}

.list-item .item-image {
  flex: 0 0 88px;
  height: 108px;
  padding: 0 5px;
}

.list-item .item-image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.list-item .item-info {
  overflow: hidden;
  padding: 0 5px;
  position: relative;
}

.list-item .item-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px 4px;
}

.list-item .item-info p.desc {
  font-size: 14px;
  color: #918b8b;
}

.list-item .item-info .info-attr {
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 5px;
}

.list-item .item-info .info-attr .price {
  color: var(--color-high-text);
}
</style>
