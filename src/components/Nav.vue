<template>
  <div class="nav">
    <div class="nav_content">
      <div class="left">
        <router-link to="/"
          ><img src="../assets/images/logo.png" alt="爱宠"
        /></router-link>
        <p>宠物之家</p>
      </div>

      <div class="center">
        <el-input
          id="ipt"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="name"
          style="margin: 0 5px"
        >
        </el-input>

        <el-button type="primary" icon="el-icon-search" @click="search"
          >搜索</el-button
        >
      </div>

      <div class="right">
        <router-link to="/" class="el-icon-s-home">首页</router-link>

        <router-link to="/login" v-if="flag" class="el-icon-lock"
          >登录/注册
        </router-link>

        <p v-else class="el-icon-s-custom">
          欢迎回来，{{ username }}
          <a href="#" @click="exit" class="el-icon-warning">退出登录</a>
        </p>

        <router-link to="/admin" class="el-icon-s-custom"
          >个人中心
        </router-link>
        <router-link to="/cart" class="el-icon-shopping-cart-2"
          >购物车
        </router-link>
        <router-link to="/order" class="el-icon-tickets">我的订单 </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      username: '',
      flag: true,
      searchList: []
    }
  },
  methods: {
    show() {
      if (localStorage.getItem('token')) {
        this.flag = false
        this.username = localStorage.getItem('username')
      }
    },
    exit() {
      localStorage.clear()

      this.flag = true
      window.location.reload()
    },
    async search() {
      if (this.name) {
        if (this.$route.path === '/search') {
          this.$parent.getData(this.name)
        } else {
          this.$router.push({ path: '/search', query: { name: this.name } })
        }
      } else {
        this.$message({
          message: '请在搜索框输入内容',
          type: 'warning',
          duration: 500
        })
      }
    }
  },

  created() {
    this.show()
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: center;
  width: 100%;
  max-height: 80px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1400px) {
    a,
    p {
      display: block;
      -webkit-transform: scale(0.8);
    }
    .right {
      display: none;
    }
  }
  .nav_content {
    display: flex;
    justify-content: space-between;
    max-width: 1600px;
    height: 80px;
    // background-color: blueviolet;

    .left {
      display: flex;
      align-items: center;
      max-width: 300px;
      // padding-left: 50px;
      height: 100%;
      // background-color: brown;

      img {
        width: 80px;
        height: 100%;
      }

      p {
        margin-left: 30px;
        font-size: 20px;
        font-weight: 700;
        color: #409eff;
      }
    }

    .center {
      display: flex;
      align-items: center;

      // background-color: aqua;

      .el-input {
        width: 70%;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 460px;
      height: 100%;

      // background-color: rgb(26, 173, 83);
      a {
        text-decoration: none;
        padding: 0 15px;
        // margin: 0 30px;
        color: black;
      }

      p {
        color: #409eff;
        display: flex;
      }
    }
  }
}
</style>
