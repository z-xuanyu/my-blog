<template>
  <div class="ad-list">
    <el-row class="bg-white p-3">
      <!-- 添加广告 -->
      <el-col class="mb-2">
        <el-button
          @click="$router.push('/ad/create')"
          size="small"
          type="primary"
        >
          <i class="el-icon-plus"></i>添加广告
        </el-button>
      </el-col>
      <!-- 表格列表 -->
      <el-col>
        <el-table :data="list" style="width: 100%">
          <el-table-column label="ID" width="250">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row._id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="名称" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.image" style="width:100px;height:60px" />
            </template>
          </el-table-column>
          <el-table-column label="跳转链接" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
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
    <!-- 弹出层 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <el-form-item label="ID:">
          <el-input
            style="width:250px"
            v-model="form._id"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称:">
          <el-input
            style="width:250px"
            v-model="form.name"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片:">
          <el-upload
            class="avatar-uploader"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :action="$http.defaults.baseURL + '/upload'"
            name="image"
          >
            <img v-if="form.image" :src="form.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接:">
          <el-input
            style="width:250px"
            v-model="form.url"
            size="small"
          ></el-input>
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
      list: [], //列表数据
      dialogFormVisible: false, //弹出显隐藏
      form: {
        _id: "",
        name: "",
        image: "",
        url: ""
      },
      formLabelWidth: "200"
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // 获取数据
    async fetch() {
      const res = await this.$http.get("rest/ads");
      let arr = [];
      res.data.forEach(item => {
        item.items.forEach(i => {
          let obj = {
            _id: i._id,
            name: item.name,
            image: i.image,
            url: i.url
          };
          arr.push(obj);
        });
      });
      this.list = arr;
    },
    // 编辑数据
    handleEdit(index, row) {
      this.form = row;
      // eslint-disable-next-line no-console
      console.log(row);
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 删除
    handleDelete(index, row) {
      // eslint-disable-next-line no-console
      console.log(row._id);
      this.$confirm(`是否确定要删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`v2/ads/delete/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    // 头像上传成功
    handleAvatarSuccess(res, file) {
      this.form.image = URL.createObjectURL(file.raw);
    }
  }
};
</script>
<style lang="scss" scoped>
.ad-list {
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
