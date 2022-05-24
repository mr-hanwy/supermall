<template>
  <div id="moreGoodsInfo" v-if="Object.keys(moreInfo).length > 0">
    <div class="desc">
      <div class="desc-start"></div>
      <div class="desc-info">{{ moreInfo.desc }}</div>
      <div class="desc-end"></div>
    </div>
    <div class="info-list">
      <div class="info-item" v-for="item in moreInfo.detailImage">
        <div class="item-title"><span>{{ item.key }}</span></div>
        <div class="item-image-list">
          <div class="image-item" v-for="image in item.list">
            <img :src="image" alt="" @load="imageLoaded"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailMoreGoodsInfo",
  props: {
    moreInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoaded() {
      this.$emit('imageLoaded');
    }
  }
}
</script>

<style scoped>
#moreGoodsInfo {
  padding: 10px 0;
}

.desc {
  padding: 20px 10px;
}

.desc:after {
  clear: both;
}

.desc .desc-start,
.desc .desc-end {
  width: 50%;
  height: 1px;
  background-color: #888484;
  position: relative;
}

.desc .desc-start {
  float: left;
}

.desc .desc-end {
  float: right;
}

.desc .desc-start:after,
.desc .desc-end:after {
  ---block-size: 6px;
  content: '';
  display: block;
  width: var(---block-size);
  height: var(---block-size);
  background-color: #888484;
  position: absolute;
  top: calc(var(---block-size) * -1);
}

.desc .desc-start:after {
  left: 0;
}

.desc .desc-end:after {
  right: 0;
}

.desc .desc-info {
  font-size: 16px;
  padding: 20px 5px;
  text-align: justify;
  clear: both;
}

.info-list .info-item {
  padding: 5px;
}

.info-list .info-item .item-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
  border-top: 2px solid #eee;
}

.info-list .info-item .item-title span {
  padding: 10px 30px;
  background-color: #eee;
  border-radius: 4px;
}

.info-list .info-item .item-image-list .image-item {
  width: 100%;
}

.info-list .info-item .item-image-list .image-item img {
  width: 100%;
}
</style>
