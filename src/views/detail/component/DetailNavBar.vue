<template>
  <div>
    <nav-bar class="nav-bar">
      <div class="back-btn" slot="nav-bar-left" @click="backBtnClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div class="nav-ctrl" slot="nav-bar-center">
        <div class="nav-ctrl-item" v-for="(item, index) in navBarItems" @click="ctrlItemClick(index)" :class="{active:index === currentIndex}">
          <span>{{ item }}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commons/navBar/NavBar";

export default {
  name: "DetailNavBar",
  components: {NavBar},
  data() {
    return {
      navBarItems: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backBtnClick() {
      this.$router.back();
    },
    ctrlItemClick(index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style scoped>
.back-btn {
  text-align: center;
}

.back-btn img {
  width: 18px;
  vertical-align: middle;
}

.nav-ctrl {
  display: flex;
  text-align: center;
  font-size: 16px;
}

.nav-ctrl .nav-ctrl-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>
