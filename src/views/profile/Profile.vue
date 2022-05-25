<template>
  <div id="profile">
    <profile-nav-bar/>
  </div>
</template>

<script>
import ProfileNavBar from "./component/ProfileNavBar";

export default {
  name: "Profile",
  components: {ProfileNavBar}
}
</script>

<style scoped>
#profile {
  height: 100vh;
  position: relative;
}
</style>
