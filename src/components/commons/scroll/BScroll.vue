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
    },
    pullUpLoad: {
      type: Boolean,
      default: false
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
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    this.scroll.on('scroll', position => {
      this.$emit('scroll', position);
    });

    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp');
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollPositionY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>
.scroll-wrapper {
  overflow: hidden;
}
</style>
