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
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>轩钰</v-list-item-title>
            <v-list-item-subtitle>只要心还跳</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <!-- 换行 -->
        <v-divider></v-divider>
        <v-list-item link v-for="(item, index) in sideItems" :key="index">
          <v-list-item-icon>
            <v-icon dense>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- 换行线 -->
        <v-divider></v-divider>
        <v-subheader>分类</v-subheader>
        <!-- 分类 -->
        <v-list-group color="white" v-for="item in items" :key="item._id">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{item.name}}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link :to="{name:'article-id',params:{id:nav.name},query:{tag_id:nav._id}}" v-for="(nav, index) in item.children" :key="index">
            <v-list-item-icon>
              <v-icon dense></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{nav.name}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
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
  created(){
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$axios.$get('category')
      this.items = res
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false, //是否展开侧边栏
      fixed: false, //是否固定定位
      isShowSearch: false,
      miniVariant: false,
      title: "轩钰博客",
      icons: [
        "fa fa-facebook",
        "fa fa-twitter",
        "fa fa-google-plus",
        "fa fa-linkedin",
        "fa fa-instagram"
      ],
      sideItems: [
        { title: "首页", icon: "mdi-home" },
        { title: "仓库", icon: "fa fa-github" },
        { title: "朋友", icon: "fa fa-gratipay" },
        { title: "相册", icon: "fa fa-picture-o" },
        { title: "日记", icon: "fa fa-sticky-note" },
        { title: "归档", icon: "fa fa-file-text" },
        { title: "留言", icon: "fa fa-comments" }
      ],
      items: [
        
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
