<template>
  <div id="detailBaseGoodsInfo" v-if="Object.keys(goodsInfo).length > 0">
    <div class="info-prop">
      <p class="info-title">{{ goodsInfo.title }}</p>
      <div class="info-price">
        <span class="now-price">{{ goodsInfo.price }}</span>
        <span class="old-price">{{ goodsInfo.oldPrice }}</span>
        <span class="discountDesc" :style="{backgroundColor:goodsInfo.discountBgColor}">{{ goodsInfo.discountDesc }}</span>
      </div>
    </div>
    <div class="info-extended">
      <div class="info-tag">
        <span class="tag-item" v-for="item in goodsInfo.columns" :key="item">{{ item }}</span>
      </div>
      <div class="services">
        <div class="services-item" v-for="item in goodsInfo.services" :key="item.name">
          <img class="item-icon" :src="item.icon" v-if="item.icon"/>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseGoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
#detailBaseGoodsInfo {
  padding: 10px 8px;
  border-bottom: 10px solid #eee;
}

.info-prop .info-title {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-align: justify;
}

.info-prop .info-price {
  padding-top: 10px;
}

.info-prop .info-price .now-price {
  color: var(--color-high-text);
  font-size: 20px;
  font-weight: bold;
}

.info-prop .info-price .old-price {
  color: var(--color-text);
  font-size: 15px;
  text-decoration: line-through;
  padding: 0 5px;
}

.info-prop .info-price .discountDesc {
  font-size: 12px;
  color: #fff;
  padding: 3px 6px;
  border-radius: 8px;
  position: relative;
  top: -8px;
}

.info-extended {
  padding: 10px 0;
}

.info-extended .info-tag,
.info-extended .services {
  display: flex;
  justify-content: space-between;
}

.info-extended .info-tag {
  font-size: 15px;
  padding: 5px 0;
  border-bottom: 2px solid #eee;
}

.info-extended .services {
  font-size: 12px;
  padding-top: 20px;
}

.info-extended .services .services-item .item-icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  margin-right: 2px;
}
</style>
