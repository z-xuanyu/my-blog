<!--
 * @Author: your name
 * @Date: 2020-03-08 15:52:23
 * @LastEditTime: 2020-04-10 11:38:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /my-blog-web/components/v-swiper.vue
 -->
<template>
  <!-- 首页轮播部分 -->
  <div ref="carouselWidth">
    <v-carousel
      cycle
      :height="carouseHeight"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(slide, i) in items" :key="i">
        <v-sheet height="100%" class="overflow-hidden">
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              :src="slide.imgUrl"
              aspect-ratio="1.7"
            ></v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouseHeight: 250,
      items: [
        {
          imgUrl:
            "https://upyun.xuanmo.xin/images/20180623145637.jpg"
        },
        {
          imgUrl:
            "https://yusi123.com/wp-content/uploads/2019/01/london-3833039_960_720.jpg"
        },{
          imgUrl:
            "https://yusi123.com/wp-content/uploads/2017/12/cakes-fruit-1062x708.jpg"
        }
      ]
    };
  },
  mounted() {
    const carouselWidth = this.$refs.carouselWidth.offsetWidth;
    if (carouselWidth < 400) {
      this.carouseHeight = 150;
    }
  }
};
</script>

<style lang="scss" scoped></style>
