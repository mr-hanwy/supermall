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
  props: {
    probeType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BetterScroll(this.$refs.scrollWrapper, {
      click: true,
      probeType: this.probeType
    });

    this.scroll.on('scroll', position => {
      this.$emit('scroll', position);
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    }
  }
}
</script>

<style scoped>
.scroll-wrapper {
  overflow: hidden;
}
</style>
