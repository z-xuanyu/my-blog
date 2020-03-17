<template>
  <v-container class="article-list">
    <slot name="title">
      <h1 class="title">{{ title }}</h1>
    </slot>
    <v-row>
      <v-col
        v-for="(item, i) in articleList"
        :key="i"
        cols="12"
        class="pa-0 mb-5"
      >
        <nuxt-link
          :to="{ name: 'article-detail-id', params: { id: item._id } }"
        >
          <v-hover v-slot:default="{ hover }" class="overflow">
            <v-card :color="item.bgColor" :elevation="hover ? 16 : 2">
              <v-row>
                <!-- 文章图片 -->
                <v-col class="pa-0" cols="12" md="4" sm="4" lg="3">
                  <div class="article-img overflow">
                    <v-img
                      :src="item.pic"
                      lazy-src="https://wxt.sinaimg.cn/large/007XivJ0gy1g7k0182gofg30jc0akjt8.gif"
                      style="width:100%"
                      height="150"
                    ></v-img>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  sm="8"
                  lg="9"
                  class="pa-0 d-flex flex-column"
                >
                  <!-- 文章标题 -->
                  <div class="article-title-content pa-1">
                    <v-chip
                      v-for="(tagItem, tagIndex) in item.categories"
                      :key="tagIndex"
                      class="ml-2"
                      x-small
                      color="primary"
                      >{{ tagItem.name }}</v-chip
                    >
                    <h3 class="pl-3">{{ item.title }}</h3>
                    <!-- 文章内容 -->
                    <div class="article-content caption pa-2 pb-0 pt-0 ma-1">
                      {{ item.body | summary }}
                    </div>
                  </div>
                  <!-- 文章评论 -->
                  <v-row class="ma-0">
                    <v-col
                      cols="12"
                      class="pb-0 pt-0 d-flex justify-space-between align-center"
                    >
                      <div class="d-flex align-center">
                        <v-icon size="16">mdi-account</v-icon>
                        <span class="user-name ml-1 mr-2 text-12">
                          {{ item.author }}
                        </span>
                        <v-icon size="16">mdi-clock-outline</v-icon>
                        <span class="time mr-2 ml-1 text-12"
                          >2020年02月22日</span
                        >
                        <v-icon class="d-none d-md-block" size="16"
                          >fa fa-comments-o</v-icon
                        >
                        <span class="text-12 d-none d-md-block ml-1">评论</span>
                      </div>
                      <div class="mr-4">
                        <v-btn depressed x-small color="primary"
                          >阅读详情</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: "文章列表"
    }
  },
  filters: {
    // 文章摘要
    summary: function(value) {
      const str = value.replace(/<[^>]+>/g, "");
      return str.substring(0, 50);
    }
  }
};
</script>

<style lang="scss" scoped>
.article-list {
  .overflow {
    overflow: hidden;
  }
}
</style>
