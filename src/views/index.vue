<template>
  <div class="content">
    <Nav></Nav>

    <Carousel></Carousel>

    <div class="discount">
      <h4 style="padding-left: 10px">限时特价</h4>

      <el-card shadow="hover">
        <h5 style="color: red; font-size: 15px; margin: 0">
          限时特价优惠返场倒计时
        </h5>
        <van-count-down
          v-if="flag"
          :time="time"
          @finish="onFinish(1)"
          format="DD 天 HH 时 mm 分 ss 秒"
        />
      </el-card>

      <div class="box">
        <el-card
          shadow="hover"
          v-for="item in special"
          :key="item.id"
          @click.native="to(item)"
        >
          <el-image
            :src="item.cover"
            alt=""
            lazy
            fit="cover"
            style="width: 160px; height: 160px"
          />

          <div class="cl">
            <p>{{ item.name }} 特价：</p>
            <h4>{{ item.price }} 元</h4>
          </div>
        </el-card>
      </div>
    </div>

    <div class="title">
      <el-tabs v-model="activeName" @tab-click="handleClick" id="tab">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="狗狗" name="second"></el-tab-pane>
        <el-tab-pane label="猫猫" name="third"></el-tab-pane>
        <el-tab-pane label="推荐" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="sell">
      <el-card
        shadow="hover"
        v-for="item in list"
        :key="item.id"
        @click.native="to(item)"
      >
        <el-image
          :src="item.cover"
          alt=""
          lazy
          fit="cover"
          style="width: 160px; height: 160px"
        />
        <div>
          <p>{{ item.name }} 价格：</p>
          <h4>{{ item.price }} 元</h4>
        </div>
      </el-card>
    </div>

    <div class="baike-list">
      <div class="baike-banner">
        <img src="../assets/images/baike.png" alt="" />
      </div>
      <ul>
        <li>
          <p class="xh">博美品相怎么看</p>
          <p class="xl">
            品相好的博美的头部和身体成比例，体型娇小而匀称;眼睛呈棕色，眼间距大，眼睛有适度凹陷，耳朵较小，呈三角形，直立于头顶;有双层
          </p>
        </li>
        <li>
          <p class="xh">怎么选比熊犬纯不纯</p>
          <p class="xl">
            纯种比熊犬属于小型犬，身形匀称，标准肩高在9.5-11.5英寸之间；它的毛发蓬松柔软，底层毛发浓密，外层毛发粗硬，摸起来要像天鹅绒一样
          </p>
        </li>
        <li>
          <p class="xh">怎么区分柯基犬（挑选柯基幼犬）</p>
          <p class="xl">
            在挑选柯基幼犬前，与它进行互动，观察柯基幼犬精神状态，精神涣散的幼犬多为病犬;从正面看以柯基的鼻子为一点，柯基两个耳朵尖为两
          </p>
        </li>
        <li>
          <p class="xh">边牧怎么选（边牧侧面脑袋形状呈圆弧形）</p>
          <p class="xl">
            边牧侧面脑袋形状呈圆弧形，脑额部很宽，并且嘴巴很宽;边牧尾巴不会卷曲在背上，卷曲的都不可选;边牧耳朵不会完全耷拉下来，3/4到1/4立耳，甚至是全立耳才是对的。
          </p>
        </li>
      </ul>
    </div>
    <Pagination @getList="onGetList" :sendKind="kind"></Pagination>
  </div>
</template>

<script>
import router from '@/router'
import { special, DailySpecialRound } from '../utils/request'
const Nav = () => import('@/components/Nav.vue')

const Carousel = () => import('@/components/Carousel.vue')

const Pagination = () => import('@/components/Pagination.vue')

export default {
  components: { Carousel, Nav, Pagination },
  data() {
    return {
      activeName: 'first',
      special: [],
      id: 0,
      list: [],
      kind: '全部',
      arr: [],
      time: 0,
      flag: true
    }
  },
  methods: {
    handleClick(tab, event) {
      this.kind = tab.label
      // console.log(this)
      if (tab.label === '狗狗') {
        this.$children[4].getList()
      }
      if (tab.label === '全部') {
        this.$children[4].getWhole()
      }
      if (tab.label === '猫猫') {
        this.$children[4].getList()
      }
      if (tab.label === '推荐') {
        this.$children[4].getList()
      } else {
        // console.log()
      }
    },
    to(item) {
      this.id = item.id

      router.push({ path: '/detail', query: item })
    },
    dailySpecial() {
      special().then((res) => {
        if (res.status === 200) {
          this.special = res.data.data
        }
      })
    },
    onGetList(val) {
      this.list = val
    },
    async onFinish() {
      await DailySpecialRound().then((res) => {
        if (res.data.status === 200) {
          this.special = res.data.data
        }
      })
      this.flag = false
    },
    count() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const d = date.getDate()
      const h = date.getHours()
      const mm = date.getMinutes()
      const s = date.getSeconds()
      const start = year + '-' + month + '-' + d + ' ' + h + ':' + mm + ':' + s

      const end = new Date('2023-9-26 18:13:30 ').getTime()

      const day = end - new Date(start).getTime()
      // console.log(day)

      // console.log(count)
      this.time = day
    }
  },

  created() {
    this.dailySpecial()
    this.count()
  },
  activated() {}
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  min-height: 100vh;

  margin: auto;
  background: #f5f5f5 !important;
  margin-bottom: 50px;
  .discount {
    max-width: 1100px;
    min-height: 410px;
    margin: auto;
    background-color: #f56c6c;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    // background-color: #67c23a;
    h4 {
      font-size: 20px;
      padding-top: 5px;
      color: #ffff;
    }

    .box {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      width: 100%;
      height: auto;
      // background-color: blueviolet;

      .el-card {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        min-width: 200px;

        cursor: pointer;
        border-radius: 12px;

        // background-color: cadetblue;
        .cl {
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            font-size: 15px;
          }
          h4 {
            font-size: 15px;
            color: #ed0b0b;
          }
        }
      }
    }
  }

  .title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 30px 0;
    // background-color: brown;

    .el-tabs {
      display: flex;
      align-items: center;

      height: 100%;
      font-size: 25px;

      /deep/ .el-tabs__item {
        text-align: center;
        width: 250px;
        font-size: 20px;
      }
    }
  }

  .sell {
    display: flex;
    max-width: 1200px;
    height: auto;
    margin: auto;
    background-color: #c2c6ce;
    flex-wrap: wrap;
    border-radius: 12px;
    align-content: flex-end;
    box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
    justify-content: flex-start;
    box-sizing: border-box;
    .el-card {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      max-width: 200px;

      margin: 15px 48px;
      height: 280px;
      cursor: pointer;
      border-radius: 12px;
      justify-content: center;

      div {
        display: flex;
        width: 100%;
        height: 100%;

        p {
          margin: 0;
          font-size: 15px;
        }
        h4 {
          margin: 0;
          color: red;
          font-size: 15px;
        }
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;

    // background-color: cadetblue;
  }
  @media screen and (max-width: 2350px) {
    .baike-list {
      display: none;
      max-width: 300px;
    }
  }

  .baike-list {
    position: fixed;
    max-width: 360px;
    top: 35%;
    right: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .baike-banner {
      width: 100%;
      img {
        width: 100%;
      }
    }
    ul {
      width: 100%;
      padding: 0 20px;
      margin-top: 25px;
      box-sizing: border-box;
      background-color: #ffff;

      list-style: none;
      li {
        padding: 0 20px;
        margin-top: 25px;
        box-sizing: border-box;
        .xh {
          font-weight: 700;
        }
        .xl {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
