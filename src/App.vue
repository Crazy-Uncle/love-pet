<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // flag: window.localStorage.getItem('key')
    }
  },
  methods: {}
  // watch: {
  //   // 使用$routr监听，to: 去到的页面 from: 顾名思义 指的是从哪个页面过来, 下面有2种方法
  //   $route(to, from) {
  //     window.location.reload() // 这个方法可行 直接就强制刷新
  //   }
  // }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  background: #f5f5f5 !important;
}
</style>
