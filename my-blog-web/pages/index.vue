<!--
 * @Author: xuanyu
 * @Date: 2020-02-29 13:20:21
 * @LastEditTime: 2020-04-10 10:05:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog-web/pages/index.vue
 -->
<template>
  <v-layout>
    <v-container>
      <!-- 首页轮播 -->
      <v-swiper></v-swiper>
      <!-- 文章列表 -->
      <article-list :articleList="articleList" title="最新文章"></article-list>
      <!-- 分页 -->
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="10"
          :total-visible="5"
          circle
        ></v-pagination>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import rightSide from "../components/rightSide";
import leftSide from "../components/leftSide";
import articleList from "../components/articleList";
import vSwiper from "../components/v-swiper";
export default {
  components: {
    rightSide,
    leftSide,
    articleList,
    vSwiper
  },
  watchQuery: ['page'],  //监听参数字符串的更改,重新执行asyncData
  // ssr
  async asyncData(context) {
    const result = await context.app.$axios.$get(`arcitle`, {
      params: {
        num: 5
      }
    });
    return {
      articleList: result.sort((a, b) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      })
    };
  },
  data() {
    return {
      page: 1, //分页
      text:"恭喜你"
    };
  }
};
</script>
<style lang="scss" scoped>
.border-r-4 {
  border-radius: 4px;
}
.overflow {
  overflow: hidden;
}
</style>
