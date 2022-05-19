<template>
  <div id="goodsParamsInfo" v-if="Object.keys(goodsParamsInfo).length > 0">
    <div class="param-rule">
      <div class="rule-title">
        <span>{{ goodsParamsInfo.rule.key }}</span>
      </div>
      <div class="rule-desc">
        <p>{{ goodsParamsInfo.rule.desc }}</p>
      </div>
      <div class="rule-tables">
        <table v-for="table in goodsParamsInfo.rule.tables">
          <tbody>
          <tr v-for="tr in table">
            <td v-for="td in tr">{{ td }}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="rule-disclaimer">
        <p>{{ goodsParamsInfo.rule.disclaimer }}</p>
      </div>
    </div>
    <div class="param-info">
      <div class="info-title">
        <span>{{ goodsParamsInfo.info.key }}</span>
      </div>
      <div class="info-list">
        <table>
          <tr v-for="info in goodsParamsInfo.info.set">
            <td style="width: 25%;">{{ info.key }}</td>
            <td style="color: var(--color-high-text)">{{ info.value }}</td>
          </tr>
        </table>
      </div>
      <div class="info-image" v-if="goodsParamsInfo.info.images">
        <img :src="goodsParamsInfo.info.images[0]"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsParamsInfo",
  props: {
    goodsParamsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
#goodsParamsInfo {
  padding: 10px;
  border-bottom: 5px solid #eee;
}

.param-rule {
  padding-bottom: 20px;
}

.param-rule .rule-title,
.param-info .info-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
  border-top: 2px solid #eee;
}

.param-rule .rule-title span,
.param-info .info-title span {
  padding: 10px 30px;
  background-color: #eee;
  border-radius: 4px;
}

.param-rule .rule-desc {
  font-size: 17px;
  text-align: justify;
  padding: 10px 0;
}

.param-rule .rule-disclaimer {
  font-size: 14px;
  color: var(--color-text);
  text-align: justify;
  padding: 10px 0;
}

.param-rule .rule-tables table,
.param-info .info-list table {
  width: 100%;
}

.param-rule .rule-tables table tr td,
.param-info .info-list table tr td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.param-info .info-image img {
  width: 100%;
}
</style>
