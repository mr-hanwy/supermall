<template>
  <div id="detailShopInfo" v-if="Object.keys(shopInfo).length > 0">
    <div class="shop-title">
      <img class="shop-icon" :src="shopInfo.shopLogo">
      <span class="shop-name">{{ shopInfo.name }}</span>
    </div>
    <div class="shop-info">
      <div class="info-left">
        <div class="shop-sells">
          <span>{{ shopInfo.cSells | shopSellFilter }}</span>
          <p>总销量</p>
        </div>
        <div class="shop-goods">
          <span>{{ shopInfo.cGoods }}</span>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="separator"></div>
      <div class="info-right">
        <table class="shop-score">
          <tbody>
          <tr v-for="item in shopInfo.score">
            <td>{{ item.name }}</td>
            <td :style="{color: item.isBetter?'#e73838':'#4aa94a'}">{{ item.score }}</td>
            <td>
              <span class="score-better"
                    :style="{backgroundColor: item.isBetter?'#e73838':'#4aa94a', color:'#fff'}">
                {{ getBetter(item.isBetter) }}
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="info-btn">
      <a :href="shopInfo.shopUrl">进店逛逛</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    getBetter(isBetter) {
      return isBetter ? '高' : '低';
    }
  },
  filters: {
    shopSellFilter(value) {
      if (value > 10000)
        return (value / 10000).toFixed(1) + '万';
      return value
    }
  }
}
</script>

<style scoped>
#detailShopInfo {
  border-bottom: 4px solid #eee;
  padding: 10px 0;
}

.shop-title {
  padding: 10px 0;
}

.shop-title .shop-icon {
  width: 22vw;
  vertical-align: middle;
  padding: 0 10px;
  border-radius: 50%;
}

.shop-title .shop-name {
  font-size: 18px;
}

.shop-info,
.shop-info .info-left {
  display: flex;
}

.shop-info .info-left,
.shop-info .info-right,
.shop-info .info-left .shop-sells,
.shop-info .info-left .shop-goods {
  flex: 1;
}

.shop-info {
  align-items: center;
}

.shop-info .info-left {
  text-align: center;
  font-size: 15px;
  padding: 10px 0;
}

.shop-info .info-left p {
  padding: 10px;
}

.shop-info .info-left .shop-goods {
  position: relative;
}

.shop-info .info-left .shop-goods:after {
  content: '';
  display: block;
  width: 2px;
  height: 100%;
  background-color: #eee;
  position: absolute;
  top: 0;
  right: 0;
}

.shop-info .info-right {
  margin-left: 20px;
}

.shop-info .info-right .shop-score {
  font-size: 15px;
}

.shop-info .info-right .shop-score tr td {
  padding: 5px 3px;
}

.shop-info .info-right .shop-score tr td .score-better {
  font-size: 12px;
  border-radius: 4px;
  padding: 2px;
}

.info-btn {
  text-align: center;
  padding: 25px 0;
}

.info-btn a {
  background-color: #eee;
  padding: 8px 30px;
  border-radius: 8px;
}

</style>
