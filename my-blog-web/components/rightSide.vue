<template>
  <div class="right-side mr-2" style="width:220px">
    <!-- 公告 -->
    <div class="notice primary mt-3">
      <div class="notice-title pa-2">
        <v-icon>fa fa-gratipay</v-icon>
        <span>公告</span>
      </div>
      <!-- 换行 -->
      <v-divider></v-divider>
      <div class="notice-contenr pa-2 subtitle-2">
        喜欢这款主题的朋友可以按教程折腾。 本站采用Nuxtjs+Wordpress Rest
        Api渲染页面，源码存放在Github，欢迎使用。
      </div>
    </div>
    <!-- 热门评论.热门文章 -->
    <div class="mt-4 hit-article">
      <v-tabs
        show-arrows
        grow
        color="white"
        v-model="tab"
        background-color="primary"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1">
          <v-icon>fa fa-fire</v-icon>
        </v-tab>
        <v-tab href="#tab-2">
          <v-icon>fa fa-comments-o</v-icon>
        </v-tab>
        <v-tab href="#tab-3">
          <v-icon>fa fa-random</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
          <v-row v-for="(item,index) in hotArticle" :key="index">
            <v-col cols="3" class="pl-4">
              <v-avatar>
                <img
                  :src="item.pic"
                  alt="John"
                />
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <h5>{{item.title}}</h5>
              <div class="d-flex">
                <v-icon size="12">fa fa-comment-o</v-icon>
                <span class="text-12 ml-2">4545</span>
              </div>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <!-- 博客信息 -->
    <div class="mt-2 mb-2 border-r-4 overflow-hidden">
      <v-card class="mx-auto" tile>
        <v-list>
          <v-subheader>博客信息</v-subheader>
          <v-list-item-group v-model="sideMode" color="primary">
            <v-list-item v-for="(item, i) in rightSideItems" :key="i">
              <v-list-item-icon>
                <v-icon size="16" v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="pr-3">
                <v-list-item-title
                  class="text-12"
                  v-text="item.text"
                ></v-list-item-title>
              </v-list-item-content>
              <v-chip x-small>{{ item.tag }}</v-chip>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <!-- 标签云 -->
    <!-- 博客标签晕 -->
    <v-row justify="space-around">
      <v-col cols="12">
        <h2 class="title">标签云</h2>
        <v-sheet elevation="10" class="pa-4">
          <v-chip-group column active-class="primary--text">
            <v-chip
              small
              color="primary"
              text-color="white"
              v-for="tag in tags"
              :key="tag"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      sideMode: 0,
      rightSideItems: [
        {
          text: "文章数目",
          icon: "fa fa-file-text-o",
          tag: "232"
        },
        {
          text: "评论数目",
          icon: "fa fa-comments-o",
          tag: "6808"
        },
        {
          text: "运行天数",
          icon: "fa fa-calendar-minus-o",
          tag: "3年275天"
        },
        {
          text: "最后活动",
          icon: "fa fa-line-chart",
          tag: "1 星期前"
        }
      ],
      tags: [
        "前段笔记",
        "Vue",
        "NodeJS",
        "日记",
        "自言自语",
        "Html",
        "Css",
        "JavaSrcipt",
        "微信小程序"
      ],
      hotArticle:[]
    };
  },
  created () {
    this.getHotArticle();
  },
  methods: {
   async getHotArticle() {
      const result = await this.$axios.$get('arcitle')
      this.hotArticle = result.splice(3)
    }
  },
};
</script>

<style scoped lang="scss">
.right-side {
  .notice {
    border-radius: 4px;
  }
  .hit-article {
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
