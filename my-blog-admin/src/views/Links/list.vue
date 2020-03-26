<!--
 * @Author: your name
 * @Date: 2020-03-25 12:26:21
 * @LastEditTime: 2020-03-25 13:28:59
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
        <el-button @click="$router.push('/link/create')" size="small" type="primary" icon="el-icon-plus"
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
              <span>{{ scope.row.createTime }}</span>
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
          name: "轩钰博客",
          url: "http://www.zhouxuanyu.com",
          desc: "描述信息",
          status: true,
          createTime: "2020-03-25 14:35"
        },
        {
          name: "轩钰博客",
          url: "http://www.zhouxuanyu.com",
          desc: "描述信息",
          status: true,
          createTime: "2020-03-25 14:35"
        },
        {
          name: "轩钰博客",
          url: "http://www.zhouxuanyu.com",
          desc: "描述信息",
          status: true,
          createTime: "2020-03-25 14:35"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.add-list {
  background-color: #ffffff;
}
</style>
