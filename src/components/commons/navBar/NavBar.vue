<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <slot name="nav-bar-left"/>
    </div>
    <div class="nav-bar-center">
      <slot name="nav-bar-center"/>
    </div>
    <div class="nav-bar-right">
      <slot name="nav-bar-right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
}

.nav-bar .nav-bar-left,
.nav-bar .nav-bar-right {
  width: 60px;
}

.nav-bar .nav-bar-center {
  flex: 1;
}
</style>
