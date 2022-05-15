<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <div class="scroll-content">
      <slot/>
    </div>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll';

export default {
  name: "BScroll",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BetterScroll(this.$refs.scrollWrapper, {});
  }
}
</script>

<style scoped>
.scroll-wrapper {
  overflow: hidden;
}
</style>
