<template>
  <div id="toast" v-show="isShow">
    <span class="msg">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false,
      timer: null
    }
  },
  methods: {
    show(message, delay = 1.5) {
      this.message = message;
      this.isShow = true;

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, delay * 1000);
    }
  }
}
</script>

<style scoped>
#toast {
  padding: 15px 20px;
  background-color: rgba(0, 0, 0, .8);
  border-radius: 6px;
  white-space: nowrap;

  font-size: 18px;
  color: #fff;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>
