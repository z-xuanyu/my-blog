<template>
  <v-layout>
    <v-container pt-1>
      <div class="article-detail-page">
        <!-- 文章头部 -->
        <div class="article-content white">
          <div class="article-header mb-2 mt-2">
            <div class="article-title pt-3 title text-center">
              {{ article.title }}
            </div>
            <div class="d-flex mt-3 justify-center flex-wrap align-center">
              <v-icon size="16" color="#999">mdi-account</v-icon>
              <div class="author ml-1 caption mr-2">{{article.author}}</div>
              <v-icon size="14" color="#999">mdi-calendar-minus</v-icon>
              <div class="time ml-1 caption mr-2">{{article.createdAt | date}}</div>
              <div class="article-category ml-1 caption mr-2">
                <span>分类:</span>
                <span class="mr-1" v-for="(item,index) in article.categories" :key="index">{{item.name}}</span>
              </div>
              <v-icon size="16" color="#999">mdi-eye</v-icon>
              <div class="hot ml-1 mr-2 caption">{{article.views}}</div>
              <v-icon size="14" color="#999">mdi-comment</v-icon>
              <div class="article-comment ml-1 caption">65</div>
            </div>
          </div>
          <!-- 换行线 -->
          <v-divider></v-divider>
          <!-- 文章内容部分 -->
          <v-content class="pa-4 mb-5">
            <div class="article-body" v-html="compiledMarkdown"></div>
            <!-- 文章打赏 -->
            <div class="mt-4">
              <div class="d-flex justify-space-between">
                <div class="text-grey d-flex">
                  <v-icon>mdi-calendar-minus</v-icon>
                  <div class="caption">
                    最后修改：2020 年 02 月 25 日 10 : 50 PM
                  </div>
                </div>
                <div class="text-grey caption">© 允许规范转载</div>
              </div>
            </div>
            <div class="d-flex justify-center mt-6">
              <v-btn
                small
                @click="handleShow"
                elevation="10"
                width="80"
                color="red"
              >
                <v-icon size="16px">mdi-credit-card-outline</v-icon>
                打赏</v-btn
              >
            </div>
          </v-content>
        </div>
        <!-- 文章打赏 -->
        <!-- 打赏弹出层 -->
        <v-dialog v-model="show" max-width="300">
          <div class="title text-center">打赏博主</div>
          <div class="d-flex justify-center mb-4">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </div>
          <div class="title text-center mb-3">感谢您的支持~</div>
          <v-img
            width="250"
            class="ma-auto mb-5"
            alt="打赏码"
            height="250"
            src="https://www.ihewro.com/usr/uploads/sina/5cc11bd7a60a8.jpg"
          ></v-img>
        </v-dialog>
        <!-- 文章评论 -->
        <article-comment></article-comment>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import axios from "axios";
import hljs from "highlight.js";
import dayjs from "dayjs"
import "highlight.js/styles/solarized-dark.css";
import articleComment from "../../../components/articleComment"
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");
  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
import marked from "marked";
var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  smartLists: true,
  smartypants: false
});
export default {
  asyncData({ params }) {
    return axios
      .get(`http://localhost:3000/web/api/arcitle/detail/${params.id}`)
      .then(res => {
        return { article: res.data };
      });
  },
  components: {
    articleComment,
  },
  mounted() {
    highlightCode();
  },

  updated() {
    highlightCode();
  },
  data() {
    return {
      article: null,
      show: false,
    };
  },
  methods: {
    handleShow() {
      this.show = true
    }
  },
  filters: {
    // 处理时间的格式化的过滤器
    date(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.article.body);
    }
  }
};
</script>

<style lang="scss">
.article-detail-page {
  .article-body {
    // 文章内容图片样式修改
    pre {
      border-radius: 4px;
    }
    code {
      background-color: inherit;
      color: inherit;
      font-size: 12px;
      .hljs-keyword {
        color: #859900;
      }
      .hljs-title {
        color: #268bd2;
      }
      .hljs-params {
        color: #df5320;
      }
      .hljs-regexp {
        color: #2aa198;
      }
    }
    img {
      width: 100%;
      border-radius: 4px;
    }
    // 文章内代码块样式
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 10px !important;
      padding-left: 10px;
      border-left: 5px solid #9466ff;
      background: #f0f2f7;
    }
  }
  .article-content {
    border-radius: 4px;
    color: #333;
  }
  .article-comment {
    color: #333;
    border-radius: 4px;
    .user-name{
      color: #ffb929;
    }
    .subname{
      color: #268bd2;
    }
  }
  .article-detail-page .theme--dark.v-label {
    color: #fff;
  }
}
</style>
