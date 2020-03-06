<template>
  <div class="shop mt-3">
    <el-row :gutter="20">
      <!-- 店铺以及交易提示 -->
      <el-col :span="12" style="height:470px" class="d-flex flex-column justify-content-between">
        <!-- 商品提示 -->
        <el-card>
          <div slot="header" class="d-flex justify-content-between">
            <span>店铺及商品提示</span>
            <span class="text-muted">您需要关注的店铺信息以及待处理事项</span>
          </div>
          <div class="p-2">
            <el-row :gutter="20">
              <el-col :span="6" class="text-center" v-for="(item,index) in goodsTips" :key="index">
                <div class="py-4 rounded bg-light">
                  <h4>{{item.num}}</h4>
                  <small class="text-muted">{{item.desc}}</small>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- 交易提示 -->
        <el-card>
          <div slot="header" class="d-flex justify-content-between">
            <span>交易提示</span>
            <span class="text-muted">您需要立即处理的交易订单</span>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col
                :span="4"
                v-for="(item,index) in transactionTips"
                :key="index"
                class="text-center"
              >
                <div class="py-4 rounded bg-light">
                  <h4>{{item.num}}</h4>
                  <small class="text-muted">{{item.desc}}</small>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!-- 订单统计 -->
      <el-col :span="12">
        <el-card style="height:470px">
          <div slot="header" class="d-flex justify-content-between">
            <span>订单总数统计</span>
            <span class="text-muted">订单数量</span>
          </div>
          <!-- 订单统计表格 -->
          <div ref="orderCount" style="width:100%;height:370px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "Shop",
  data() {
    return {
      goodsTips: [
        {
          num: "64",
          desc: "出售中"
        },
        {
          num: "10",
          desc: "待回复"
        },
        {
          num: "0",
          desc: "库存预警"
        },
        {
          num: "3",
          desc: "仓库中"
        }
      ],
      transactionTips: [
        {
          num: "23",
          desc: "待付款"
        },
        {
          num: "234",
          desc: "待发货"
        },
        {
          num: "56",
          desc: "已发货"
        },
        {
          num: "16",
          desc: "待回复"
        },
        {
          num: "3",
          desc: "退款中"
        },
        {
          num: "3",
          desc: "待售后"
        }
      ]
    };
  },
  mounted() {
    this.OrderCount();
  },
  methods: {
    OrderCount() {
      let OrderCount = echarts.init(this.$refs.orderCount);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      OrderCount.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>