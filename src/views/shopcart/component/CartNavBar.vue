<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="nav-bar-center">购物车</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commons/navBar/NavBar";

export default {
  name: "CartNavBar",
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
