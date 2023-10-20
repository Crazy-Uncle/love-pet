<template>
  <div class="detail">
    <Nav></Nav>
    <div class="content">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ list.activity }}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="introduce">
        <div class="img">
          <CarouselDetail :toData="carouseDetail"></CarouselDetail>
          <div class="title">
            <h4>
              {{ list.title }}
            </h4>
            <p>包邮;付款后48小时内发货</p>

            <ul>
              <li>寿命：{{ list.life }}</li>
              <li>性别：{{ list.sex }}</li>
              <li>年龄：{{ list.age }}</li>
              <li>疫苗：{{ list.vaccine }}针疫苗</li>

              <li>
                价格：<span>{{ list.price }}元 </span>
              </li>
              <li>库存：{{ list.repertory }}</li>
            </ul>

            <div class="shop">
              <el-button
                type="danger"
                @click.prevent="getCartData"
                class="el-icon-shopping-cart-1"
                >加入购物车</el-button
              >
              <el-button type="warning" plain @click="play" class="el-icon-sell"
                >立即购买</el-button
              >
            </div>
          </div>
        </div>
      </div>

      <div class="describe">
        <!-- <p>{{ life.describe }}</p> -->
        <p>描述介绍：{{ life.describes }}</p>
        <img :src="life['one']" alt="" />
        <img :src="life['two']" alt="" />
        <img :src="life['three']" alt="" />
        <img :src="life['four']" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import CarouselDetail from '@/components/CarouselDetail.vue'
import router from '@/router'
import { cart, cartOrder } from '@/utils/request'
export default {
  components: { Nav, CarouselDetail },
  data() {
    return {
      num: 1,
      list: [],
      id: 0,
      carouseDetail: { one: '', two: '', three: '', four: '' },
      life: { describes: '', one: '', two: '', three: '', four: '' }
    }
  },
  methods: {
    handleChange(value) {},
    getData() {
      // console.log(this.$route.query)
      this.list = this.$route.query
      this.id = this.$route.query.id
      this.carouseDetail.one = this.$route.query.slideshow_one
      this.carouseDetail.two = this.$route.query.slideshow_two
      this.carouseDetail.three = this.$route.query.slideshow_three
      this.carouseDetail.four = this.$route.query.slideshow_four
      // console.log(this.list.activity)
      this.life.one = this.$route.query.life1
      this.life.two = this.$route.query.life2
      this.life.three = this.$route.query.life3
      this.life.four = this.$route.query.life4
      this.life.describes = this.$route.query.describes
    },
    getCartData() {
      const uid = localStorage.getItem('uid')
      const shop = this.list.name
      const price = this.list.price
      const num = this.num
      const cover = this.list.cover
      const activity = this.list.activity

      const params = {
        uid: uid,
        shop: shop,
        price: price,
        num: num,
        cover: cover,
        activity: activity
      }
      if (params.num > this.list.repertory) {
        console.log(1)
        this.$message({
          message: '库存不足，店家正在加紧补货',
          type: 'warning',
          duration: 1000
        })
      } else {
        console.log(params)
        cart(params).then((res) => {
          if (res.data.status === 200) {
            // console.log(res)
            this.$message({
              message: '成功加入购物车！',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message({
              message: '加入购物车失败',
              type: 'warning',
              duration: 1000
            })
          }
        })
      }
    },
    play() {
      if (this.list.repertory < 1) {
        this.$message({
          message: '店家正在加紧补货',
          type: 'warning',
          duration: 1000
        })
      } else {
        this.$confirm('此操作将跳转至购物车 , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            const uid = localStorage.getItem('uid')
            const shop = this.list.name
            const price = this.list.price
            const num = this.num
            const cover = this.list.cover
            const activity = this.list.activity

            const params = {
              uid: uid,
              shop: shop,
              price: price,
              num: num,
              cover: cover,
              activity: activity
            }
            if (params.num > this.list.repertory) {
              this.$message({
                message: '库存不足，店家正在加紧补货',
                type: 'warning',
                duration: 1000
              })
            } else {
              cart(params).then((res) => {
                // console.log(res)

                if (res.data.status === 200) {
                  // console.log(res)
                  this.$router.push('/cart')

                  this.$message({
                    message: '成功加入购物车',
                    type: 'success',
                    duration: 1000
                  })
                } else {
                  this.$message({
                    message: '加入购物车失败',
                    type: 'warning',
                    duration: 1000
                  })
                }
              })
            }

            // cartOrder({
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作！'
            })
          })
      }
    },
    async fast() {
      const uid = localStorage.getItem('uid')
      const shop = this.list.name
      const price = this.list.price
      const num = this.num
      const cover = this.list.cover
      const activity = this.list.activity

      const params = {
        uid: uid,
        shop: shop,
        price: price,
        num: num,
        cover: cover,
        activity: activity
      }
      if (params.num > this.list.repertory) {
        this.$message({
          message: '库存不足，店家正在加紧补货',
          type: 'warning',
          duration: 1000
        })
      } else {
        await cart(params).then((res) => {
          // console.log(res)

          if (res.data.status === 200) {
            // console.log(res)
            this.$message({
              message: '成功加入购物车',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message({
              message: '加入购物车失败',
              type: 'warning',
              duration: 1000
            })
          }
        })
      }
    }
  },
  created() {
    this.getData()
  },
  activated() {
    if (this.id !== this.$route.query.id) {
      this.id = this.$route.query.id
      this.getData()
    }

    // console.log('进入')
  }
}
</script>

<style lang="less" scoped>
.detail {
  min-width: 1600px;
  min-height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .content {
    min-width: 800px;
    min-height: auto;
    // background-color: aqua;

    .el-breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      height: 50px;
      padding-left: 15px;
      box-sizing: border-box;
      // background-color: burlywood;
    }

    .introduce {
      width: 100%;
      height: 300px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

      // background-color: tomato;

      .img {
        display: flex;

        .el-carousel {
          flex: 1;
        }
        .title {
          flex: 1;
          display: flex;

          flex-direction: column;
          justify-content: space-between;
          h4 {
            box-sizing: border-box;
            padding-left: 15px;
            color: #f56c6c;
            margin: 0;
            font-size: 17px;
          }
          p {
            box-sizing: border-box;
            padding-left: 15px;

            margin: 0;
            font-size: 12px;
          }

          ul {
            width: 100%;
            height: auto;
            box-sizing: border-box;
            // background-color: brown;
            margin: 0;
            li {
              height: 25px;

              span {
                color: red;
              }
            }
          }
          .num {
            box-sizing: border-box;
            padding-left: 15px;

            display: flex;
            align-items: center;
            width: 100%;
            height: 40px;

            .el-el-input-number {
              height: 100%;
            }
          }
          .shop {
            display: flex;
            // margin-top: 20px;
            // background-color: red;

            justify-content: center;

            .el-button {
              margin: 0 20px;
            }
          }
        }
      }
    }

    .describe {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      margin-top: 40px;

      p {
        width: 800px;
        height: auto;
        color: black;
        font-size: 13px;
      }

      img {
        margin-top: 35px;
      }
    }
  }
}
</style>
