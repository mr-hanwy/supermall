<template>
  <div id="category">
    <category-nav-bar/>
  </div>
</template>

<script>
import CategoryNavBar from "./component/CategoryNavBar";

export default {
  name: "Category",
  components: {CategoryNavBar}
}
</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}
</style>
