<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :items="swiperItems"/>
  </div>
</template>

<script>
import DetailNavBar from "./component/DetailNavBar";
import DetailSwiper from "./component/DetailSwiper";

import {getDetail} from "network/detail";

export default {
  name: "Detail",
  components: {DetailNavBar, DetailSwiper},
  data() {
    return {
      iid: null,
      swiperItems: null
    }
  },
  created() {
    this.iid = this.$route.query.iid;

    getDetail(this.iid).then(result => {
      this.swiperItems = result.result.itemInfo.topImages;
    })
  }
}
</script>

<style scoped>

</style>
