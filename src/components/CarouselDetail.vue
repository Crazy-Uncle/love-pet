<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in toData" :key="item.id">
      <img class="carouseDetail" :src="item" alt="" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: ['toData'],
  data() {
    return {}
  },
  methods: {},
  created() {}
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  .carouseDetail {
    width: 100%;
    height: 100%;
  }
}
</style>
