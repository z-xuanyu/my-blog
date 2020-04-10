<template>
  <div class="acticle-create-page">
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 所属分类 -->
      <el-form-item size="small" label="所属分类">
        <el-select size="small" v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 文章标题 -->
      <el-form-item label="标题">
        <el-input
          size="small"
          style="width:80%"
          v-model="model.title"
        ></el-input>
      </el-form-item>
      <!-- 文章封面 -->
      <el-form-item label="封面">
        <el-input
          size="small"
          style="width:50%"
          v-model="model.pic"
        ></el-input>
      </el-form-item>
      <!-- 文章背景颜色 -->
      <el-form-item label="背景颜色">
        <el-input
          size="small"
          style="width:200px"
          v-model="model.bgColor"
        ></el-input>
      </el-form-item>
      <!-- 文章发布时间 -->
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="model.time"
          type="datetime"
          style="width:200px"
          placeholder="选择日期时间"
          size="small"
        >
        </el-date-picker>
      </el-form-item>
      <!-- 文章作者 -->
      <el-form-item label="撰写人">
        <el-input
          size="small"
          style="width:200px"
          v-model="model.author"
        ></el-input>
      </el-form-item>
      <!-- 文章详情内容 -->
      <el-form-item label="详情">
        <mavon-editor codeStyle="solarized-dark" ref="md" @save='save' @imgAdd='imgAdd' placeholder='开始你的灵魂创作吧' v-model="model.body" />
      </el-form-item>
      <!-- 发布,更新按钮 -->
      <el-form-item>
        <el-button size="small" type="primary" native-type="submit"
          >{{ id ? "更新" : "发布" }}文章</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  created() {
    this.fetchCatgories();
    this.id && this.fetch();
  },
  methods: {
    // 图片上传
    imgAdd(pos, $file){
        const formdata = new FormData();
        formdata.append('image', $file);
        this.$http.post('upload',formdata).then(res=>{
          const $vm = this.$refs.md
          $vm.$img2Url(pos, res.data.url);
        })
    },
    async save() {
      // eslint-disable-next-line no-console
      if (this.id) {
        await this.$http.put(
          `rest/articles/${this.id}`,
          this.model
        );
      } else {
        await this.$http.post(
          "rest/articles",
          this.model
        );
      }
      this.$router.push("/article/list");
      const message = this.id ? "更新成功" : "发布成功";
      this.$message({
        type: "success",
        message: message
      });
    },
    async fetch() {
      const res = await this.$http.get(
        `rest/articles/${this.id}`
      );
      this.model = res.data;
    },
    async fetchCatgories() {
      const res = await this.$http.get(
        `rest/categories`
      );
      this.categories = res.data;
    }
  }
};
</script>

<style scoped lang="scss">
.acticle-create-page {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  .el-form-item{
    margin-bottom: 10px;
  }
}
</style>
