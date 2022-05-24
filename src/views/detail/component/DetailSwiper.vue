<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in items" :key="item">
        <img :src="item" alt="" @load="imageLoaded"/>
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
    imageLoaded() {
      this.$emit('imageLoaded');
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 40vh;
}
</style>
