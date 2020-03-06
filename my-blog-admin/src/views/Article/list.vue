<template>
  <div class="article-list-page">
    <el-button
      class="mb-3"
      type="primary"
      @click="$router.push('/article/create')"
      icon="el-icon-plus"
      size="mini"
      >新建文章</el-button
    >
    <el-table :data="articleData">
      <!-- 文章标题 -->
      <el-table-column prop="title" label="文章标题" width="350px">
      </el-table-column>
      <!-- 文章发布时间 -->
      <el-table-column
        align="center"
        prop="createdAt"
        label="发布时间"
        width="120"
      >
      </el-table-column>
      <!-- 最新修改 -->
      <el-table-column
        align="center"
        prop="updatedAt"
        label="最近更新时间"
        width="150"
      >
      </el-table-column>
      <!-- 文章分类 -->
      <el-table-column align="center" label="所属分类" width="150px">
        <template slot-scope="scope">
          <div class="d-flex category-tag">
            <el-tag
              class="category-tag-item"
              size="small"
              v-for="(item, index) in scope.row.categories"
              :key="index"
              type="successs"
              >{{ item.name }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <!-- 发布状态 -->
      <el-table-column align="center" label="发布状态" width="100">
        <el-tag size="small" effect="dark" type="success">已发布</el-tag>
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="$router.push('/category/create')"
            icon="el-icon-s-promotion"
            >预览</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleData: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(
        "http://localhost:3000/admin/api/rest/articles"
      );
      this.articleData = res.data;
    },
    // 删除文章
    handleDelete(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`http://localhost:3000/admin/api/rest/articles/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.article-list-page {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  .category-tag {
    justify-content: center;
    .category-tag-item {
      margin-left: 5px;
    }
  }
}
</style>
