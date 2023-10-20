<template>
  <div class="login">
    <Nav></Nav>
    <div class="box">
      <div class="left"></div>
      <!-- 登录 -->
      <div v-if="flag" class="right">
        <div class="title">登录</div>
        <div class="user">
          <div class="account">
            <p>账号：</p>
            <el-input
              v-model="loginParams.username"
              placeholder="请输入账号"
            ></el-input>
          </div>
          <div class="password">
            <p>密码：</p>
            <el-input
              v-model="loginParams.password"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </div>
        </div>
        <a href="#" @click="show">还没账号?马上去注册</a>
        <el-button type="primary" :plain="true" @click="login" round
          >立即登录</el-button
        >
      </div>
      <!-- 注册 -->
      <div v-else class="register">
        <div class="title">注册</div>
        <div class="user">
          <div class="name">
            <p>用户名：</p>
            <el-input
              v-model="registerParams.nickname"
              placeholder="请输入昵称"
            ></el-input>
          </div>
          <div class="account">
            <p>账号：</p>
            <el-input
              v-model="registerParams.username"
              placeholder="请输入账号"
            ></el-input>
          </div>
          <div class="password">
            <p>密码：</p>
            <el-input
              v-model="registerParams.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </div>
        </div>
        <a href="#" @click="show($event)">去登陆</a>
        <el-button type="primary" round :plain="true" @click="register"
          >立即注册</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router/index'
import Nav from '@/components/Nav.vue'
import { login, register } from '../utils/request'

export default {
  components: { Nav },
  data() {
    return {
      key: true,
      loginParams: {
        username: '',
        password: ''
      },
      registerParams: { username: '', password: '', nickname: '' },
      flag: true,
      nickname: ''
    }
  },
  methods: {
    show() {
      if (this.flag === true) {
        this.flag = false
      } else {
        this.flag = true
      }
    },
    async login() {
      await login(this.loginParams).then((res) => {
        if (res.data.status === 200) {
          this.$message({ message: '登录成功！', type: 'success' })
          // console.log(res.data)
          localStorage.setItem('uid', res.data.id)
          localStorage.setItem('nickname', res.data.nickname)
          localStorage.setItem('username', res.data.username)

          const token = res.data.token

          localStorage.setItem('token', token)

          router.push('/')
          window.location.reload()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    async register() {
      const result = await register(this.registerParams)

      if (result.data.status == 200) {
        const join = await login(this.registerParams)
        if (join.data.status == 200) {
          localStorage.setItem('uid', join.data.id)
          localStorage.setItem('nickname', join.data.nickname)
          localStorage.setItem('username', join.data.username)

          const token = join.data.token
          localStorage.setItem('token', token)
          this.$message({
            message: '注册成功',
            type: 'success',
            duration: 1500
          })

          router.push('/')
          // window.location.reload()
        }
      } else {
        this.$message({ message: '注册失败', type: 'error', duration: 1500 })
      }
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  min-width: 1600px;
  min-height: 100%;
  background: #f5f5f5 !important;

  flex-direction: column;
  align-items: center;

  // background-color: aqua;
  .box {
    margin-top: 100px;
    display: flex;
    width: 1200px;
    min-height: 600px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  .left {
    flex: 1;
    // cursor: pointer;
    // background-color: blueviolet;
    background-image: url(../assets/images/pet.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .right {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;
    // background-color: brown;

    .title {
      margin-top: 30px;
      height: 50px;
      text-align: center;
      font-size: 25px;
      line-height: 50px;
      color: rgb(27, 143, 211);
      // background-color: cadetblue;
    }

    .user {
      display: flex;
      justify-content: center;
      height: 300px;
      margin-top: 150px;
      // background-color: aqua;
      flex-direction: column;
      align-items: center;

      .account,
      .password {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 350px;
        height: 100px;
        font-size: 18px;
        // background-color: burlywood;

        p {
          height: 40px;
        }
        .el-input {
          width: 250px;
          height: 60px;
        }
      }
    }

    a {
      margin-bottom: 25px;
    }
    .el-button {
      width: 150px;
      height: 50px;
    }
  }

  .register {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .title {
      margin-top: 30px;
      height: 50px;
      text-align: center;
      font-size: 25px;
      color: rgb(27, 143, 211);
      line-height: 50px; // background-color: cadetblue; }
    }
    .name {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 350px;
      height: 100px;
      font-size: 18px;
      // background-color: burlywood;

      p {
        height: 40px;
      }
      .el-input {
        width: 250px;
        height: 60px;
      }
    }
    .user {
      display: flex;
      justify-content: center;
      height: 300px;
      margin-top: 150px;
      // background-color: aqua;
      flex-direction: column;
      align-items: center;

      .account,
      .password {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 350px;
        height: 100px;
        font-size: 18px;
        // background-color: burlywood;

        p {
          height: 40px;
        }
        .el-input {
          width: 250px;
          height: 60px;
        }
      }
    }
    a {
      margin-bottom: 25px;
    }
    .el-button {
      width: 150px;
      height: 50px;
    }
  }
}
</style>
../utils/request
