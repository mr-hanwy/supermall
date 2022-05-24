<template>
  <div id="goodsEvaluationInfo" v-if="evaluationInfo && evaluationInfo.length > 0">
    <div class="evaluation-title">
      <span class="title">用户评价</span>
      <span class="more">
        更多
        <span class="more-icon">
          <img src="~assets/img/common/back.svg" alt=""/>
        </span>
      </span>
    </div>
    <div class="evaluation-list">
      <div class="evaluation-item" v-for="item in evaluationInfo" :key="item.rateId">
        <div class="user-info">
          <img class="head-portrait" :src="item.user.avatar" alt="">
          <span class="user-name">{{ item.user.uname }}</span>
        </div>
        <div class="user-evaluation">
          <p>{{ item.content }}</p>
          <div class="purchase-info">
            <span class="purchase-time">{{ item.created | showDate }}</span>
            <span class="purchase-style">{{ item.style }}</span>
          </div>
          <div class="show-images">
            <div class="image-item" v-for="img in item.images" :key="img">
              <img :src="img" alt="" @load="imageLoaded"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'commons/utils';

export default {
  name: "GoodsEvaluationInfo",
  props: {
    evaluationInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    showDate(value) {
      let date = new Date(value * 1000);
      return formatDate(date, 'yyyy-MM-dd');
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
#goodsEvaluationInfo {
  padding: 20px 10px;
  border-bottom: 5px solid #eee;
}

.evaluation-title {
  border-bottom: 1px solid #eee;
  padding: 10px 0 20px;
}

.evaluation-title .more {
  float: right;
}

.evaluation-title .more .more-icon img {
  height: 16px;
  vertical-align: middle;
  transform: rotateZ(180deg) translateY(2px);
}

.evaluation-title:after {
  clear: both;
}

.evaluation-list {
  padding: 10px 0;
}

.evaluation-list .evaluation-item .user-info {
  padding: 10px 0;
}

.evaluation-list .evaluation-item .user-info .head-portrait {
  width: 13vw;
  border-radius: 50%;
  vertical-align: middle;
  transform: translateY(-2px);
}

.evaluation-list .evaluation-item .user-info .user-name {
  font-size: 18px;
  padding: 5px 10px;
}

.evaluation-list .evaluation-item .user-evaluation p {
  text-align: justify;
  line-height: 26px;
}


.evaluation-list .evaluation-item .user-evaluation .purchase-info {
  font-size: 15px;
  color: #afabab;
  padding: 10px 0;
}

.evaluation-list .evaluation-item .user-evaluation .purchase-info .purchase-style {
  padding-left: 10px;
}

.evaluation-list .evaluation-item .user-evaluation .show-images {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.evaluation-list .evaluation-item .user-evaluation .show-images .image-item {
  flex: 0 1 28%;
  margin-right: 5px;
}

.evaluation-list .evaluation-item .user-evaluation .show-images .image-item img {
  width: 100%;
}
</style>
