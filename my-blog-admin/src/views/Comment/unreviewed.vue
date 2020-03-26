<!--
 * @Author: your name
 * @Date: 2020-03-25 13:48:03
 * @LastEditTime: 2020-03-26 17:02:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-admin/src/views/Comment/Unreviewed.vue
 -->
<template>
  <div class="unreviewed">
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
          <el-table-column label="用户名" width="140">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Email" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="头像" width="60">
            <template slot-scope="scope">
              <img width="30px" height="30px" :src="scope.row.avatar" />
            </template>
          </el-table-column>
          <el-table-column label="内容" width="380">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag
                size="small"
                :type="scope.row.status ? 'success' : 'danger'"
                effect="dark"
                >{{ scope.row.status ? "已审核" : "未审核" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑/回复</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 评论回复弹出层 -->
    <el-dialog title="审核与回复" :visible.sync="dialogFormVisible">
      <el-row>
        <!-- 用户信息 -->
        <el-col>
          <h3
            style="border-left:4px solid #409EFF;font-size:16px;font-weight:bold"
            class="pl-1"
          >
            用户信息:
          </h3>
          <div class="user-info p-3">
            <div class="username">
              <span class="mr-1">用户名:</span>
              <span class="mr-3">xunayu</span>
              <span class="mr-1">邮箱:</span>
              <span class="mr-3">812006298@qq.com</span>
              <span class="mr-1">手机号:</span>
              <span class="mr-3">15800021934</span>
              <span class="mr-1">介绍:</span>
              <span>这个家伙很懒,什么都没有留下!</span>
            </div>
          </div>
        </el-col>
        <!-- 评论/留言信息 -->
        <el-col>
          <h3
            style="border-left:4px solid #409EFF;font-size:16px;font-weight:bold;"
            class="pl-1"
          >
            留言/评论信息:
          </h3>
          <p class="p-3">文章写得不错哦</p>
        </el-col>
        <!-- 留言/评论回复 -->
        <el-col>
          <h3
            style="border-left:4px solid #409EFF;font-size:16px;font-weight:bold;"
            class="pl-1"
          >
            回复内容:
          </h3>
          <el-input
          class="pt-3 pb-3  "
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-form :model="form">
        <el-form-item label="审核" :label-width="formLabelWidth">
          <el-select style="width:100px" size="small" v-model="form.status" placeholder="请选择">
            <el-option label="通过" value="true"></el-option>
            <el-option label="不通过" value="fasle"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, //弹出层显隐
      Data: [
        {
          userName: "轩钰",
          email: "812006298@qq.com",
          avatar:
            "https://ask.qcloudimg.com/random-avatar/3614976/cx87vpnb0s.png",
          content: "文章不错哦",
          status: false,
          createTime: "2020-03-25 16:48"
        },
        {
          userName: "ayu",
          email: "969718197@qq.com",
          avatar:
            "https://ask.qcloudimg.com/random-avatar/3614976/cx87vpnb0s.png",
          content: "真的太给了,支持你!666",
          status: false,
          createTime: "2020-03-25 16:48"
        }
      ],
      form: {
        status:''
      }
    };
  },
  methods: {
    handleEdit() {
      this.dialogFormVisible = !this.dialogFormVisible;
    }
  }
};
</script>

<style lang="scss" scoped>
.unreviewed {
  background-color: #ffffff;
  border-radius: 5px;
}
</style>
