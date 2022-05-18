<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in items" :key="item">
        <img :src="item" alt="" @load="detailSwiperImageLoaded"/>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/commons/swiper';

export default {
  name: "DetailSwiper",
  components: {Swiper, SwiperItem},
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    detailSwiperImageLoaded() {
      this.$emit('detailSwiperImageLoaded');
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 40vh;
}
</style>
