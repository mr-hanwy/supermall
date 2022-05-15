<template>
  <div class="tab-ctrl">
    <div class="tab-ctrl-item" v-for="(item, index) in texts" :key="item" :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabController",
  props: {
    texts: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
.tab-ctrl {
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 15px;
  background-color: var(--color-background);
}

.tab-ctrl .tab-ctrl-item {
  flex: 1;
}

.tab-ctrl .tab-ctrl-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>
