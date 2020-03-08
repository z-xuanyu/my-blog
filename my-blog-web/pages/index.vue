<template>
  <v-layout>
    <v-container>
      <!-- 首页轮播 -->
      <v-swiper></v-swiper>
      <!-- 文章列表 -->
      <article-list :articleList='articleList' title="最新文章"></article-list>
      <!-- 分页 -->
      <div class="text-center">
        <v-pagination v-model="page" :length="10" :total-visible="5" circle></v-pagination>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import rightSide from "../components/rightSide";
import leftSide from "../components/leftSide";
import articleList from "../components/articleList"
import vSwiper from "../components/v-swiper"
export default {
  components: {
    rightSide,
    leftSide,
    articleList,
    vSwiper
  },
  created(){
    this.getData()
  },
  data() {
    return {
      page: 1, //分页
      articleList:[],
    };
  },
  methods:{
    getData(){
      this.$axios.$get('http://localhost:3000/web/api/arcitle',{
        params:{
          num:5,
          page:this.page
        }
      }).then((res)=>{
        const articleData = res.sort((a,b)=>{
          return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
        })
        this.articleList = articleData
      })
    }
  },
  watch:{
    // 监听分页变化
    page:function(){
      this.getData()
    }
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
