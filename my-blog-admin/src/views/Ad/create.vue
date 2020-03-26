<template>
  <div class="ad-create">
    <h2>新建广告位</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input
          size="small"
          v-model="model.name"
          style="width:300px"
        ></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <!-- 添加列表 -->
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item, idx) in model.items" :key="idx">
            <el-form-item label="跳转链接(URL)">
              <el-input
                size="small"
                style="width:500px"
                v-model="item.url"
              ></el-input>
            </el-form-item>
            <!-- 广告图片上传 -->
            <el-form-item label="图片" style="margin-top:0.5rem">
              <el-upload
                class="avatar-uploader"
                :on-success="res => $set(item, 'image', res.url)"
                :show-file-list="false"
                :action="$http.defaults.baseURL + '/upload'"
                name="image"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 删除按钮 -->
            <el-form-item>
              <el-button
                size="small"
                type="danger"
                @click="model.items.splice(idx, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" native-type="submit"
          >保存</el-button
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
      model: {
        items: []
      }
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/ads", this.model);
      }
      this.$router.push("/ad/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-create {
  padding: 10px;
  border-radius: 5px;
  background-color: #ffffff;
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
