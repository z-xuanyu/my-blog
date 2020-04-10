<!--
 * @Author: xuanyu
 * @Date: 2020-03-25 12:25:02
 * @LastEditTime: 2020-04-02 13:13:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-blog/my-blog-admin/src/views/Links/create.vue
 -->
<template>
  <div class="link-add">
    <el-row class="pt-4">
      <el-col>
        <el-form label-width="120px" @submit.native.prevent="save">
          <el-form-item label="链接名称">
              <el-input size="small" v-model="model.name" style="width:180px"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input size="small" v-model="model.url" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input size="small" v-model="model.desc" style="width:450px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" native-type="submit" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        model: {
          name:'',
          url:'',
          desc:''
        }
      }
    },
    methods: {
      async save(){
        const {status} = await this.$http.post('v2/link',this.model)
        if(status === 200){
          this.$message({
          message: '恭喜你，添加成功！',
          type: 'success'
        });
        this.$router.push("/link/list")
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.link-add{
  background-color: #ffffff;
}
</style>