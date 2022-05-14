<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend" :key="item.acm">
      <a :href="item.link">
        <div class="recommend-img">
          <img :src="item.image" alt="">
        </div>
        <div class="recommend-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  justify-content: space-around;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}

.recommend .recommend-item {
  flex: 0 1 20%;
  /*max-width: 20%;*/
  text-align: center;
}

.recommend .recommend-item .recommend-img {
  margin-bottom: 8px;
}

.recommend .recommend-item .recommend-img img {
  width: 100%;
}

.recommend .recommend-item .recommend-text {
  font-size: 14px;
}
</style>
