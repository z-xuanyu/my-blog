<template>
  <v-app dark class="container" style="padding:0">
    <!-- 侧边栏 -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="primary"
      width="200"
      class="d-md-none"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 顶部导航 -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      class="container pl-0"
      style="left:0"
    >
      <v-app-bar-nav-icon
        class="d-xs-block d-md-none mb-5"
        @click.stop="drawer = !drawer"
      />
      <!-- logo博客大标题 -->
      <nuxt-link to="/" v-show="!isShowSearch"
        ><v-toolbar-title v-text="title" class="mb-5"
      /></nuxt-link>
      <v-spacer />
      <!-- 搜索框 -->
      <div class="mb-6 d-md-block" :class="isShowSearch ? '' : 'd-none'">
        <v-text-field
          solo-inverted
          flat
          hide-details
          label="请输入关键字"
          rounded
          clearable
          dense
          shaped
          :prepend-inner-icon="isShowSearch ? '' : 'fa fa-search'"
        />
      </div>
      <v-spacer />
      <v-btn
        @click="isShowSearch = !isShowSearch"
        icon
        class="d-xs-block d-md-none mb-5"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- main 部分 -->
    <v-content class="pl-0">
      <v-container class="pa-0 d-flex justify-space-between">
        <!-- 左边导航栏 -->
        <div class="d-none d-md-block">
          <left-side></left-side>
        </div>
        <nuxt />
        <!-- 右边状态栏 -->
        <div class="d-none d-md-block">
          <right-side></right-side>
        </div>
      </v-container>
    </v-content>
    <!-- 底部 -->
    <v-footer class="container pa-0" dark padless>
      <v-card class="flex" flat tile>
        <v-card-title class="primary d-none d-md-block">
          <div class="d-flex">
            <strong class="subheading"
              >Get connected with us on social networks!</strong
            >
            <v-spacer></v-spacer>

            <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </div>
        </v-card-title>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>轩钰博客</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import rightSide from "../components/rightSide";
import leftSide from "../components/leftSide";
export default {
  components: {
    rightSide,
    leftSide
  },
  data() {
    return {
      clipped: false,
      drawer: false, //是否展开侧边栏
      fixed: false, //是否固定定位
      isShowSearch: false,
      items: [
        {
          icon: "mdi-apps",
          title: "首页",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "关于",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      title: "轩钰博客",
      icons: [
        "fa fa-facebook",
        "fa fa-twitter",
        "fa fa-google-plus",
        "fa fa-linkedin",
        "fa fa-instagram"
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.v-toolbar__title.mb-5 {
  color: #fff;
}
</style>
