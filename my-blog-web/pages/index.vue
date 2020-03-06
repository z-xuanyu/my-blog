<template>
  <v-layout>
    <v-container>
      <!-- 首页轮播部分 -->
      <div ref="carouselWidth">
        <v-carousel cycle :height="carouseHeight" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
      <!-- 文章列表 -->
      <article-list :articleList='articleList' title="最新文章"></article-list>
      <!-- 分页 -->
      <div class="text-center">
        <v-pagination v-model="page" :length="15" :total-visible="7" circle></v-pagination>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import rightSide from "../components/rightSide";
import leftSide from "../components/leftSide";
import articleList from "../components/articleList"
import axios from "axios";
export default {
  asyncData() {
    return axios
      .get("http://localhost:3000/admin/api/rest/article")
      .then(res => {
        return { articleList: res.data.reverse() };
      });
  },
  components: {
    rightSide,
    leftSide,
    articleList
  },
  mounted() {
    const carouselWidth = this.$refs.carouselWidth.offsetWidth;
    if (carouselWidth < 400) {
      this.carouseHeight = 150;
    }
  },
  data() {
    return {
      carouseHeight: "250",
      page: 1, //分页
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ]
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
