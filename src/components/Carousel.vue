<template>
  <el-carousel :interval="4000" type="card" height="250px">
    <el-carousel-item v-for="item in slideshow" :key="item.id">
      <img class="img" :src="item.imageUrl" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { slideshow } from '../utils/request'

export default {
  data() {
    return {
      slideshow: []
    }
  },
  methods: {
    Slideshow() {
      slideshow().then((res) => {
        this.slideshow = res.data.data
      })
    }
  },
  created() {
    this.Slideshow()
  }
}
</script>

<style lang="less" scoped>
.el-carousel {
  margin: 50px auto;
  max-width: 1080px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
