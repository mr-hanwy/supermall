<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="nav-bar-center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/commons/navBar/NavBar";

export default {
  name: "HomeNavBar",
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
