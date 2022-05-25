<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="nav-bar-center">分类</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commons/navBar/NavBar";

export default {
  name: "CategoryNavBar",
  components: {NavBar}
}
</script>

<style scoped>
.nav-bar {
  text-align: center;
  color: #fff;
  background-color: var(--color-tint);
}
</style>
