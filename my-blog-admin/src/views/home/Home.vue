<template>
  <div class="home">
    <!-- 用户统计 -->
    <v-count></v-count>
    <!-- 店铺统计 -->
    <v-shop></v-shop>
    <!-- 销量统计 -->
    <v-sales></v-sales>
  </div>
</template>
<script>
import Count from './base/Count'
import Shop from './base/Shop'
import Sales from './base/Sales '
export default {
  name: "Home",
  components:{
      "v-count":Count,
      "v-shop":Shop,
      "v-sales":Sales
  }
};
</script>
<style lang="scss" scoped>
</style>