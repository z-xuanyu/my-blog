<template>
  <header>
    <div class="logo">
        <h3 class="text-white">YU-ADMIN</h3>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">商品</el-menu-item>
      <el-menu-item index="3">订单</el-menu-item>
      <el-menu-item index="4">会员</el-menu-item>
      <el-menu-item index="5">设置</el-menu-item>
      <el-submenu index="6">
        <template slot="title"><el-avatar class="mr-1" :size="30" :src="circleUrl"></el-avatar>个人中心</template>
        <el-menu-item index="2-1">修改密码</el-menu-item>
        <el-menu-item index="2-2">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>
<script>
export default {
  name: "Header",
  data() {
      return {
          activeIndex: '1',
          circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
  },
  methods: {
      handleSelect() {
        // console.log(key, keyPath);
      }
  },
};
</script>
<style lang="scss" scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items:center;
    background-color: #545c64;
    padding: 0 20px;
}
</style>