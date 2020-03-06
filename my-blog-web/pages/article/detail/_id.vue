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
              <div class="author ml-1 caption mr-2">xuanyu</div>
              <v-icon size="14" color="#999">mdi-calendar-minus</v-icon>
              <div class="time ml-1 caption mr-2">2019-09-09 01:17:50</div>
              <div class="article-category ml-1 caption mr-2">
                分类： 前端相关
              </div>
              <v-icon size="16" color="#999">mdi-eye</v-icon>
              <div class="hot ml-1 mr-2 caption">5545</div>
              <v-icon size="14" color="#999">mdi-comment</v-icon>
              <div class="article-comment ml-1 caption">65</div>
            </div>
          </div>
          <!-- 换行线 -->
          <v-divider></v-divider>
          <!-- 文章内容部分 -->
          <v-content class="pa-4 mb-5">
            <div class="article-body" v-html="article.body"></div>
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
                @click="showDialog = true"
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
        <!-- 文章评论 -->
        <div class="article-comment white pa-3">
          <v-row class="mb-3 pl-3 pr-3">
            <v-col class="text-center grey lighten-3 border-r-4">
              共 26 条评论关于 “我的后台管理系统终于有了第一版”
            </v-col>
          </v-row>
          <div class="comment-wrapper grey lighten-3 pa-3 border-r-4">
            <div class="comment-title">发表评论</div>
            <div class="comment-subtitle mb-2">
              电子邮件地址不会被公开。 必填项已用
            </div>
            <v-textarea
              outlined
              class="white"
              name="input-7-4"
              label="发表评论"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
          </div>
          <!-- 评论信息输入框 -->
          <v-row class="grey lighten-3 ma-0 mt-3 border-r-4">
            <v-col cols="6">
              <v-text-field
                v-model="authorName"
                :rules="nameRules"
                :counter="10"
                label="昵称"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :counter="10"
                label="邮箱"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="grey lighten-3 ma-0">
            <v-col cols="6">
              <v-text-field
                v-model="authorName"
                :rules="nameRules"
                :counter="10"
                label="网址"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :counter="10"
                label="邮箱"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- 信息提交按钮 -->
          <v-row>
            <v-col class="d-flex justify-center">
              <v-btn @click="commentTips = true" color="deep-purple"
                >提交评论</v-btn
              >
            </v-col>
          </v-row>
          <!-- 评论列表 -->
          <v-row
            class="article-comment-list ma-3 grey lighten-3 border-r-4"
            v-for="(item, index) in 5"
            :key="index"
          >
            <v-col cols="2" md="1" sm="1" class="pa-2">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
            </v-col>
            <v-col cols="10" md="11" sm="11" class="pl-5">
              <div class="user-name">轩宇</div>
              <div class="user-comment-content caption">
                文章写的不错哦!
              </div>
              <div
                class="user-comment-content-footer d-flex align-center justify-sm-space-between"
              >
                <div class="user-comment-time caption">2019-09-24 17:21:40</div>
                <div class="opinion d-flex">
                  <v-icon size="16" class="mr-1" color="#a8b6c0"
                    >mdi-thumb-up-outline</v-icon
                  >
                  <span class="caption">54</span>
                  <v-icon size="16" class="ml-3 mr-1" color="#a8b6c0"
                    >mdi-thumb-down-outline</v-icon
                  >
                  <span class="caption">0</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- 评论信息提示弹出层 -->
        <v-snackbar
          v-model="commentTips"
          color="success"
          bottom
          :timeout="commentTimeout"
        >
          {{ commentTipsText }}
          <v-btn color="blue" text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
        <!-- 打赏弹出层 -->
        <v-dialog v-model="showDialog" max-width="300">
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
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ params }) {
    console.log(params.id);
    console.log("监听到我了");
    return axios
      .get(`http://localhost:3000/admin/api/rest/article/${params.id}`)
      .then(res => {
        return { article: res.data };
      });
  },
  data() {
    return {
      article: null,
      showDialog: false,
      commentTips: false, // 评论提示
      commentTipsText: "评论成功",
      commentTimeout: 2000,
      authorName: "", //昵称
      email: "", //邮箱
      nameRules: [
        v => !!v || "请输入正确的昵称",
        v => v.length <= 10 || "昵称太长了"
      ], //昵称校验规则
      emailRules: [
        v => !!v || "请输入正确的邮箱",
        v => /.+@.+/.test(v) || "抱歉!邮箱不正确"
      ]
    };
  }
};
</script>

<style lang="scss">
.article-detail-page {
  .article-body {
    // 文章内容图片样式修改
    img {
      width: 100%;
      border-radius: 4px;
    }
    // 文章内代码块样式
    .ql-syntax {
      color: rgb(230, 236, 241);
      display: block;
      hyphens: none;
      tab-size: 2;
      direction: ltr;
      font-size: 14px;
      text-align: left;
      word-break: normal;
      font-family: "Source Code Pro", Consolas, Menlo, Monaco, Courier,
        monospace;
      line-height: 1.4;
      white-space: pre;
      word-spacing: normal;
      margin: 32px 0px;
      padding: 24px 24px 24px 8px;
      overflow: auto;
      background: rgb(24, 48, 85);
      border-radius: 3px;
    }
    h1{
      font-size: 20px;
    }
    h2{
      font-size: 18px;
    }
    h3{
      font-size: 17px;
    }
    h4{
      font-size: 16px;
    }
    h5{
      font-size: 15px;
    }
    h6{
      font-size: 14px;
    }
    h1,h2,h3,h4,h5,h6 {
      margin-bottom: 10px !important;
      padding-left: 10px;
      border-left: 5px solid #9466ff;
      background: #f0f2f7;
    }
    p{
      font-size: 14px;
    }
  }
  .article-content {
    border-radius: 4px;
    color: #333;
  }
  .article-comment {
    color: #333;
    border-radius: 4px;
  }
  .theme--dark.v-label {
    color: #000;
  }
  .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: #000;
  }
  .theme--dark.v-input input,
  .theme--dark.v-input textarea {
    color: #000;
  }
}
</style>
