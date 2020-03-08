<template>
  <div class="category-list">
    <el-button
      class="mb-2"
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="$router.push('/category/create')"
      >新建分类</el-button
    >
    <el-table
      :data="items"
      style="width: 100%"
      border
      highlight-current-row
      empty-text="暂无分类信息"
    >
      <el-table-column align="center" prop="_id" label="ID" width="250" />
      <!-- 子级分类 -->
      <el-table-column
        align="center"
        prop="parent.name"
        label="上级分类"
        width="180"
      />
      <!-- 父级分类 -->
      <el-table-column
        align="center"
        prop="name"
        label="分类名称"
        width="180"
      />
      <!-- 分类图标 -->
      <el-table-column
        align="center"
        prop="icon"
        label="分类图标"
        width="180"
      />
      <!-- 删除,编辑,添加二级分类 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
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
            type="primary"
            @click="$router.push('/category/create')"
            icon="el-icon-plus"
            >添加二级分类</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="p-3">
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>

    <!-- 编辑弹出层 -->
    <el-dialog width="500px" title="编辑分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- id -->
        <el-form-item
          size="small"
          style="width:300px"
          label="ID"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form._id" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级分类 -->
        <el-form-item
          size="small"
          style="width:300px"
          label="上级分类"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.parent.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item
          size="small"
          style="width:300px"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 分类图标 -->
        <el-form-item
          size="small"
          style="width:300px"
          label="分类图标"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交信息 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false"
          >取消</el-button
        >
        <el-button size="small" type="primary" @click="handleUpdata(form)"
          >确认修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      dialogFormVisible: false,
      form: {
        _id: "",
        name: "",
        icon: "",
        parent: {
          _id: "",
          name: "无上级分类",
          icon: ""
        }
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.fetch();
  },

  methods: {
    // 获取数据
    async fetch() {
      const res = await this.$http.get(
        "http://localhost:3000/admin/api/rest/categories"
      );
      this.items = res.data;
    },
    // 编辑分类
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    // 删除分类
    handleDelete(row) {
      // eslint-disable-next-line no-console
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // eslint-disable-next-line no-console
          console.log(row);
          await this.$http.delete(`rest/categories/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑更新分类
    handleUpdata(form) {
      this.$http.put(`rest/categories/${form._id}`, form);
      this.dialogFormVisible = false;
      this.$message({
        type: "success",
        message: "更新成功"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category-list {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}
</style>
