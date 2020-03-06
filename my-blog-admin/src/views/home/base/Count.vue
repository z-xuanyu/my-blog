<template>
  <div class="count">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in counts" :key="index">
        <el-card>
          <div class="d-flex align-items-center">
            <div class="icon text-center mr-3" :class="item.bg">
              <i class="h3 text-white" :class="item.icon"></i>
            </div>
            <div>
              <h4 class="mb-1">{{item.number}}</h4>
              <small class="text-muted">{{item.desc}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    name:"Count",
    data() {
        return {
            counts:[
              {
                  icon:"el-icon-user-solid",
                  bg:"bg-primary",
                  number:"30",
                  desc:"关注人数（个）"
              },{
                  icon:"el-icon-s-finance",
                  bg:"bg-success",
                  number:"120",
                  desc:"订单总数（笔）"
              },
              {
                  icon:"el-icon-s-order",
                  bg:"bg-danger",
                  number:"4183.80",
                  desc:"今日订单总额（元）"
              },
              {
                  icon:"el-icon-s-data",
                  bg:"bg-warning",
                  number:"100",
                  desc:"本月销量（笔）"
              },
          ]
        }
    },
}
</script>
<style lang="scss" scoped>
.count{
    .icon {
    height: 50px;
    width: 50px;
    line-height: 50px;
  }
}
</style>