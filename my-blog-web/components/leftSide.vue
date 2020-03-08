<template>
  <div class="navbar-side">
    <v-navigation-drawer style="transform:0" color="primary" width="200">
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
        <v-list-group color="white" v-for="item in navItem" :key="item._id">
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
      <!-- 登录 -->
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>登录管理</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created(){
    this.getData()
  },
  data() {
    return {
      sideItems: [
        { title: "首页", icon: "mdi-home" },
        { title: "仓库", icon: "fa fa-github" },
        { title: "朋友", icon: "fa fa-gratipay" },
        { title: "相册", icon: "fa fa-picture-o" },
        { title: "日记", icon: "fa fa-sticky-note" },
        { title: "归档", icon: "fa fa-file-text" },
        { title: "留言", icon: "fa fa-comments" }
      ],
      navItem:[]
    }
  },
  methods:{
    getData(){
      axios.get('http://localhost:3000/web/api/category').then(res=>{
        this.navItem = res.data
      })
    }
  }
};
</script>

<style scoped lang="scss">
.v-list-item__title,
.v-list-item__subtitle {
  overflow: inherit;
}
</style>
