<template>
  <div class="sales mt-3">
    <el-row :gutter="20">
      <!-- 销量情况统计 -->
      <el-col :span="12">
        <el-card>
          <div slot="header" class="d-flex justify-content-between">
            <span>销量情况统计</span>
            <span>按周期统计商家店铺的订单量和订单金额</span>
          </div>
          <div style="height:270px" class="d-flex flex-column justify-content-between">
            <div class="media align-items-center border">
              <span class="py-5 px-3 bg-light border-right">昨日销量</span>
              <div class="media-body d-flex flex-column">
                <div class="border-bottom pl-3 pb-3 mb-3">
                  <span>订单量(件)</span>
                  <span>82</span>
                </div>
                <div class="pl-3">
                  <span>订单量(件)</span>
                  <span>82</span>
                </div>
              </div>
            </div>
            <div class="media align-items-center border">
              <span class="py-5 px-3 bg-light border-right">昨日销量</span>
              <div class="media-body d-flex flex-column">
                <div class="border-bottom pl-3 pb-3 mb-3">
                  <span>订单量(件)</span>
                  <span>82</span>
                </div>
                <div class="pl-3">
                  <span>订单量(件)</span>
                  <span>82</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 单品销售排名 -->
      <el-col :span="12">
        <el-card>
          <div slot="header" class="d-flex justify-content-between">
            <span>单品销售排名</span>
            <span>按周期统计商家店铺的订单量和订单金额</span>
          </div>
          <!-- 销售排名 -->
          <div>
            <el-table :data="tableData" height="270" border size="medium" style="width: 100%">
              <el-table-column prop="ranking" label="排名" width="50"></el-table-column>
              <el-table-column prop="name" label="商品信息"></el-table-column>
              <el-table-column prop="num" label="销量" width="180"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Sales",
  data() {
    return {
      tableData: [
        {
          ranking: "1",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "1239"
        },
        {
          ranking: "2",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "1200"
        },
        {
          ranking: "3",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "980"
        },
        {
          ranking: "4",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "897"
        },
        {
          ranking: "5",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "760"
        },
        {
          ranking: "6",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "567"
        },
        {
          ranking: "7",
          name: "上海市普陀区金沙江路 1518 弄",
          num: "450"
        }
      ]
    };
  }
};
</script>