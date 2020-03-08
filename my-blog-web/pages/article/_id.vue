<template>
  <v-layout>
    <v-container>
      <!-- 文章列表 -->
      <article-list :articleList='articleList'>
        <div slot="title">
          <h1 class="title">关于{{$route.params.id}}文章</h1>
        </div>
      </article-list>
      <!-- 分页 -->
      <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      circle
    ></v-pagination>
  </div>
    </v-container>
  </v-layout>
</template>

<script>
import articleList from "../../components/articleList"
export default {
  components: {
    articleList
  },
  created () {
    this.getData();
  },
  data() {
    return {
      articleList:[],
      page:1
    }
  },
  methods: {
    async getData() {
      this.id = this.$route.query.tag_id
      const result = await this.$axios.$get(`http://localhost:3000/web/api/arcitle/${this.id}`,)
      const data = result.sort((a,b)=>{
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
      })
      this.articleList = data
    }
  },
  
}
</script>

<style>

</style>