<template>
  <div class="cart">
    <Nav></Nav>
    <div class="list">
      <!-- 头部 -->
      <div class="head">
        <div class="title">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>购物车</el-breadcrumb-item>
          </el-breadcrumb>

          <div class="cartNum">购物车（全部{{ list.length }}）</div>
          <el-button
            @click="clear"
            type="danger"
            class="el-icon-shopping-cart-1"
            >清空购物车</el-button
          >
        </div>
        <div class="Total_price">
          <div class="selected">
            已选商品（不含运费）
            <p>{{ total }}元</p>
          </div>
          <el-button
            type="danger"
            class="el-icon-wallet"
            round
            @click="confirm($event), (dialogVisible = sw)"
            >结算</el-button
          >
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="shopping_list">
        <el-table
          ref="multipleTable"
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="change"
          stripe
          lazy
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column label="商品信息" width="200" align="center">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.cover"
                alt=""
                style="width: 120px; height: 120px"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>

          <el-table-column
            prop="shop"
            label="商品名称"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column label="价格（元）" width="120" align="center">
            <template slot-scope="scope">
              {{ scope.row.price.toFixed(2) + '元' }}
            </template>
          </el-table-column>
          <el-table-column label="数量" width="250" align="center">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.num"
                @change="handleChange($event, scope.row)"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
            </template>
          </el-table-column>

          <el-table-column
            label="合计（元）"
            width="120"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              {{ (scope.row.price * scope.row.num).toFixed(2) + '元' }}
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="120"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="delData(scope.row.id)"
                class="el-icon-delete"
                type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalList"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="确认收货地址"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="box">
        <div class="address" style="background-color: #909399">
          <div
            class="address-item"
            v-for="item in this.tableData"
            :key="item.id"
          >
            <el-radio v-model="radio2" :label="item.id" @change="sel"
              >寄送至：</el-radio
            >

            {{ item.addressMessage }}{{ item.infoAddress }}（{{
              item.consignee
            }}）{{ item.phone }}
          </div>
        </div>
        <div class="content">
          <h4>确认订单信息</h4>
          <el-table :data="arr" border style="width: 100%">
            <el-table-column
              prop="id"
              label="商品编号"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column label="商品信息" align="center" width="180">
              <template slot-scope="scope">
                <img :src="scope.row.cover" style="width: 100%" />
              </template>
            </el-table-column>
            <el-table-column prop="shop" label="商品名称" align="center">
            </el-table-column>

            <el-table-column label="单价（元）" align="center">
              <template slot-scope="scope">
                {{ scope.row.price.toFixed(2) + '元' }}
              </template>
            </el-table-column>

            <el-table-column prop="num" label="数量" align="center">
            </el-table-column>
            <el-table-column label="总价（元）" align="center">
              <template slot-scope="scope">
                {{ scope.row.money.toFixed(2) + '元' }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="sel">
          <div class="weixin">
            <el-button type="danger" @click="dialogVisible1 = true"
              >立即充值</el-button
            >
          </div>
          <div class="yue">
            <el-radio v-model="radio1" label="余额" border>余额</el-radio>

            <div>{{ totalMoney ? totalMoney + '.00' : '0.00' }}元</div>
          </div>
        </div>

        <div class="info">
          <h4>实付款：￥{{ total.toFixed(2) + '元' }}</h4>
          <p>
            寄送至：{{ this.subAddress.addressMessage
            }}{{ this.subAddress.infoAddress }}
          </p>
          <p>
            收货人：{{ this.subAddress.consignee }} {{ this.subAddress.phone }}
          </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exit(), (dialogVisible = false)"
          >返回购物车</el-button
        >
        <el-button type="primary" @click="submitOrder(), (dialogVisible = true)"
          >提交订单</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="充值余额"
      :visible.sync="dialogVisible1"
      width="50%"
      :before-close="handleClose1"
    >
      <div class="bx">
        <el-radio v-model="radio3" label="1" border>充值：2000元</el-radio>
        <el-radio v-model="radio3" label="2" border>充值：4000元</el-radio>
        <el-radio v-model="radio3" label="3" border>充值：6000元</el-radio>
        <el-radio v-model="radio3" label="4" border>充值：8000元</el-radio>
      </div>
      <div class="img">
        <img
          src="../assets//images//shoukuan.png"
          alt=""
          style="width: 270px; height: auto"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible1 = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination.vue'

import {
  del,
  getCartList,
  cartOrder,
  clearCarts,
  pay,
  cartAdd
} from '@/utils/request'
import { getAddressList, getUserMoney } from '@/utils/user'
const Nav = () => import('@/components/Nav.vue')

export default {
  components: { Nav },
  data() {
    return {
      num: 0,
      list: [],
      checkAll: false,
      total: 0,
      flag: false,
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        uid: localStorage.getItem('uid')
      },
      totalList: 0,
      i: false,
      arr: [],
      totalCount: 0,
      timer: null,
      sw: false,
      tableData: [],
      radio1: '',
      radio2: 3,
      radio3: 1,
      dialogVisible: false,
      dialogVisible1: false,
      multipleSelection: [],

      subAddress: [],
      totalMoney: ''
    }
  },
  computed: {
    totals() {
      let net = 0

      this.multipleSelection
        .map((row) => {
          // console.log(row)
          return row.num * row.price
        })
        .forEach((item) => {
          net += item
        })
      // console.log(net, '=====', this.multipleSelection)

      return { totalPrice: net, data: this.multipleSelection }
    }
  },
  watch: {
    totals: function (newValue, oldValue) {
      this.total = newValue.totalPrice
      this.arr = newValue.data
      // console.log(newValue, oldValue)
    },
    deep: true
  },
  methods: {
    change(val) {
      // console.log(val)
      this.multipleSelection = val
    },

    async handleChange(val, item) {
      await cartAdd({ id: item.id, num: val })
    },
    async delData(item) {
      // console.log(item)
      await del({
        id: item,
        pageSize: this.queryInfo.pageSize,
        pageNum: this.queryInfo.pageNum,
        uid: this.queryInfo.uid
      }).then((res) => {
        if (res.data.status === 200) {
          this.list = res.data.data
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 500
          })
        } else {
          this.$message({ message: '删除失败！', type: 'error', duration: 500 })
        }
      })
    },
    async getCartLists() {
      await getCartList(this.queryInfo).then((res) => {
        if (res.data.status === 200) {
          this.list = res.data.data
          this.totalList = res.data.total
        } else {
          // this.$message({ message: '获取数据失败!', type: 'error' })
        }
      })
    },
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
    },

    handleCurrentChange(val) {
      this.queryInfo.pageNum = val
      this.getCartLists()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleClose1(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    confirm(e) {
      this.getAddress()
      if (this.arr.length >= 1) {
        getUserMoney({ id: localStorage.getItem('uid') }).then((res) => {
          if (res.data.status === 200) {
            this.totalMoney = res.data.money
          }
        })
        this.sw = true
      } else {
        this.$message({
          message: '请选择商品！',
          type: 'warning',
          duration: 500
        })
      }
    },

    clear() {
      this.$confirm('此操作将清空购物车， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          clearCarts({ uid: this.queryInfo.uid }).then((res) => {
            if (res.data.status === 200) {
              this.$message({ type: 'success', message: '清空成功！' })
              // location.reload()
            }
          })

          // }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '清空失败！'
          })
        })
    },
    getAddress() {
      getAddressList({
        id: localStorage.getItem('uid'),
        aid: localStorage.getItem('uid')
      }).then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
          if (res.data.data.length < 1) {
            this.$message({
              message: '暂无收货地址信息,请到个人中心填写收货地址',
              type: 'warning',
              duration: 3000
            })
          }
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning',
            duration: 500
          })
        }
      })
    },
    sel(val) {
      for (const i in this.tableData) {
        if (this.tableData[i].id === val) {
          this.subAddress = this.tableData[i]
          this.subAddress.total = this.total
        }
      }
      // console.log(val)s
    },
    async submitOrder() {
      if (!this.subAddress || !this.radio1) {
        this.$message({
          message: '请选择收货地址或钱包',
          type: 'warning',
          duration: 500
        })
      } else {
        for (const i in this.arr) {
          this.arr[i].addressMessage = this.subAddress.addressMessage
          this.arr[i].consignee = this.subAddress.consignee
          this.arr[i].infoAddress = this.subAddress.infoAddress
          this.arr[i].phone = this.subAddress.phone
          this.arr[i].postalCode = this.subAddress.postalCode

          await cartOrder(this.arr[i]).then((res) => {
            if (res.data.status === 200) {
              // 结算后删除购物车商品数据
              pay({
                id: this.arr[i].id
              }).then((res) => {
                if (res.data.status === 200) {
                  location.reload()
                }
              })
              this.$message({
                message: '支付成功',
                type: 'success',
                duration: 1000
              })
            } else {
              this.$message({
                message: '支付失败,请检查商品库存或余额是否充足',
                type: 'warning',
                duration: 1500
              })
            }
          })
        }
      }
    },
    // 返回购物车清空数据
    exit() {
      this.tableData = []
    }
  },

  created() {
    this.getCartLists()
    // this.getList()
  }
}
</script>

<style lang="less" scoped>
.cart {
  display: flex;
  min-width: 1600px;
  min-height: 100%;
  background-image: url(../assets/images/bizi2.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-wrap: wrap;
  justify-content: center;

  .list {
    min-width: 850px;
    height: auto;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-top: 50px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    .head {
      width: 100%;
      height: 100px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      // background-color: cadetblue;
      border-bottom: 1px solid #ccc;

      .title {
        display: flex;
        height: 100px;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 15px;

        .el-button {
          width: 80px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .Total_price {
        display: flex;
        width: 350px;

        justify-content: space-between;
        align-items: center;
        .selected {
          display: flex;
          align-items: center;
        }

        p {
          color: red;
        }
        .el-button {
          display: flex;
          justify-content: center;
          width: 80px;
          height: 40px;
          margin-right: 10px;
        }
      }
    }

    .select {
      width: 100%;
      height: 80px;
      // background-color: #6e5e5e;

      ul {
        // color: black;
        list-style: none;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }

    .shopping_list {
      width: 100%;
      min-height: 1000px;
      display: flex;
      flex-direction: column;
      align-items: center;

      ul {
        padding: 0;
        width: 100%;
        height: 730px;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        // justify-content: space-between;
        align-items: center;
        li {
          display: flex;
          justify-content: space-between;
          width: 770px;
          height: 120px;
          margin-bottom: 15px;
          border-radius: 12px;
          padding: 5px;
          // background-color: #95d475;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

          span {
            font-size: 18px;
            width: 14px;
            font-weight: 700;
            height: 100%;
            display: flex;
            color: #f56c6c;
            align-items: center;
          }
          .first {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 100%;
            // background-color: red;
          }

          .second {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 170px;
            height: 100%;
            img {
              width: 100%;
              border-radius: 12px;

              height: 100%;
            }
            // background-color: blue;
          }
          .three {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f56c6c;
            width: 50px;
            height: 100%;
            // background-color: red;
          }
          .four {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 140px;
            height: 100%;
            // background-color: red;
            .reduce {
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .el-input {
              width: 80px;
              display: flex;
              justify-content: center;
              align-items: center;
              /deep/.el-input__inner {
                text-align: center;
              }
            }
            .add {
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          .five {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f56c6c;

            width: 50px;
            height: 100%;
            // background-color: red;
          }

          .sex {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            width: 120px;
            height: 100%;
            // background-color: red;
          }
        }
      }

      .el-pagination {
        margin-top: 30px;
      }
    }
  }

  .el-dialog {
    .img {
      display: flex;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .box {
      display: flex;
      width: 100%;
      height: auto;
      flex-direction: column;
      justify-content: space-around;

      .address {
        display: flex;
        width: 100%;
        height: 80px;
        // background-color: #95d475;
        flex-direction: column;
        justify-content: space-around;
      }

      .sel {
        display: flex;
        justify-content: space-around;
        width: 50%;
        height: auto;
        // background-color:#67C23A;
        .weixin {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .yue {
          display: flex;
          align-items: center;
          height: 100%;
          div {
            width: auto;
          }
        }
      }
      .info {
        display: flex;
        width: 100%;
        height: 131px;
        // background-color: #F56C6C;
        margin-right: 0;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        h4 {
          font-family: 700;
          color: red;
        }
      }
    }
  }
}
</style>
