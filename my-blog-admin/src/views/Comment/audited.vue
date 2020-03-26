<!--
 * @Author: your name
 * @Date: 2020-03-25 13:47:12
 * @LastEditTime: 2020-03-25 17:11:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-admin/src/views/Comment/Already.vue
 -->
<template>
    <div class="audited m-2">
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
        <el-button @click="$router.push('/link/create')" size="small" type="primary" icon="el-icon-plus"
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
              <img width="30px" height="30px" :src="scope.row.avatar">
            </template>
          </el-table-column>
          <el-table-column label="内容" width="380">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="100">
            <template slot-scope="scope">
              <el-tag size="small" :type='scope.row.status ? "success" : "danger"' effect='dark'>{{scope.row.status?'已审核':'未审核'}}</el-tag>
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
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Data: [
                    {
                        userName:"轩钰",
                        email:'812006298@qq.com',
                        avatar:"https://ask.qcloudimg.com/random-avatar/3614976/cx87vpnb0s.png",
                        content:"文章不错哦",
                        status:true,
                        createTime:"2020-03-25 16:48"
                    },
                    {
                        userName:"轩钰",
                        email:'812006298@qq.com',
                        avatar:"https://ask.qcloudimg.com/random-avatar/3614976/cx87vpnb0s.png",
                        content:"文章不错哦",
                        status:true,
                        createTime:"2020-03-25 16:48"
                    },
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
.audited{
    background-color: #ffffff;
    border-radius: 5px;
}
</style>