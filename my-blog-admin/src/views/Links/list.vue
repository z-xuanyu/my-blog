<!--
 * @Author: your name
 * @Date: 2020-03-25 12:26:21
 * @LastEditTime: 2020-04-10 21:17:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-admin/src/views/Links/list.vue
 -->

<template>
  <div class="add-list m-2">
    <el-row class="p-3">
      <!-- 搜索框 -->
      <el-col>
        <el-input
          class="mr-3"
          size="small"
          placeholder="请输入搜索关键词"
          style="width:200px"
        ></el-input>
        <el-button size="small" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
        <el-button
          @click="$router.push('/link/create')"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加链接</el-button
        >
      </el-col>
      <!-- 表单列表 -->
      <el-col class="mt-3">
        <el-table border :data="Data" style="width: 100%">
          <el-table-column label="链接名称" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="URL" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" width="250">
            <template slot-scope="scope">
              <span>{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.createdAt | date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 弹出层 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="200">
        <el-form-item label="链接名称">
          <el-input v-model="form.name" size="small" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="form.url" size="small" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.desc" size="small" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      Data: [],
      form:{

      },
      dialogFormVisible:false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { status, data } = await this.$http.get("v2/link/getLists");
      if (status === 200) {
        this.Data = data;
      }
    },
    // 删除
    handleDelete(row) {
      this.$confirm("确定要删除该条友情链接?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { status } = await this.$http.delete("v2/link/delete", {
            data: row
          });
          if (status === 200) {
            this.$message({
              message: "恭喜你，删除成功！",
              type: "success"
            });
          }
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑信息
    handleEdit(){
      this.dialogFormVisible = true
    }
  },
  filters: {
    // 处理时间的格式化的过滤器
    date(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="scss" scoped>
.add-list {
  background-color: #ffffff;
}
</style>
