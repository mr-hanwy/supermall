<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="#ff5777">
        <img slot="item-img" src="~assets/img/tabbar/home.svg" alt=""/>
        <img slot="item-img-active" src="~assets/img/tabbar/home_active.svg" alt=""/>
        <span slot="item-text">首页</span>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="#ff5777">
        <img slot="item-img" src="~assets/img/tabbar/category.svg" alt=""/>
        <img slot="item-img-active" src="~assets/img/tabbar/category_active.svg" alt=""/>
        <span slot="item-text">分类</span>
      </tab-bar-item>
      <tab-bar-item path="/shopcart" activeColor="#ff5777">
        <img slot="item-img" src="~assets/img/tabbar/shopcart.svg" alt=""/>
        <img slot="item-img-active" src="~assets/img/tabbar/shopcart_active.svg" alt=""/>
        <span slot="item-text">购物车</span>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#ff5777">
        <img slot="item-img" src="~assets/img/tabbar/profile.svg" alt=""/>
        <img slot="item-img-active" src="~assets/img/tabbar/profile_active.svg" alt=""/>
        <span slot="item-text">我的</span>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import {TabBar, TabBarItem} from "components/commons/tabbar";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
