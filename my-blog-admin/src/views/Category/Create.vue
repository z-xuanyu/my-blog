<template>
  <div class="category-page">
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select size="small" style="width:120px" v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 名称 -->
      <el-form-item label="分类名称">
        <el-input style="width:500px" size="small" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="分类图标">
        <el-input style="width:500px" size="small" v-model="model.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    id:{}
  },
  data() {
    return {
      model: {},
      parents: [],
    };
  },
  created(){
    this.fetchParents()
    this.id && this.fetch()
  },
  methods:{
     async save(){
      // eslint-disable-next-line no-unused-vars
      let res
      if (this.id) {
        res = await this.$http.put(`http://localhost:3000/admin/api/rest/categories/${this.id}`, this.model)
      } else {
        res = await this.$http.post('http://localhost:3000/admin/api/rest/categories', this.model)
      }
      this.$router.push('/category/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`http://localhost:3000/admin/api/rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents(){
      const res = await this.$http.get(`http://localhost:3000/admin/api/rest/categories`)
      this.parents = res.data
    },
  }
};
</script>

<style lang="scss" scoped>
.category-page{
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}
</style>
