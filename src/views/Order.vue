<template>
  <div class="order">
    <Nav></Nav>

    <div class="all">
      <div class="title">所有订单</div>
      <el-table
        :data="list"
        style="width: 100%"

      >
        <el-table-column label="宝贝" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover"
              alt=""
              style="width: 120px; height: 120px"

              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="价格（元）"  width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.price.toFixed(2)+'元' }}
          </template>
        </el-table-column>
        <el-table-column prop="num" label="数量" align="center">
        </el-table-column>
        <el-table-column label="实付款"   align="center"   :sortable="true" :sort-method="sortMethod">
           <template slot-scope="scope" >
            {{ scope.row.money.toFixed(2)+'元' }}
          </template>
        </el-table-column>
        <el-table-column prop="date" width="182" label="付款时间" sortable align="center">
        </el-table-column>
        <el-table-column prop="status" label="订单状态" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="del(scope.row)" type="danger" class="el-icon-delete"
              >删除订单记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryList.pageNum"
      :page-sizes="[5]"
      :page-size="queryList.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { getOrders, delOrder } from '@/utils/request'
export default {
  components: { Nav },
  data () {
    return {
      total: 0,
      queryList: {
        pageNum: 1,
        pageSize: 5,
        uid: localStorage.getItem('uid')
      },
      list: []
    }
  },
  methods: {
    sortMethod(before, after) { return Number(before.money) - Number(after.money); },

    handleSizeChange (val) {
      this.queryList.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(val)

      this.queryList.pageNum = val
      this.getOrderList()
    },
    getOrderList () {
      getOrders(this.queryList).then((res) => {
        if (res.data.status === 200) {
          this.list = res.data.data
          this.total = res.data.total
        }
      })
    },
    del (val) {
      delOrder({
        id: val.id,
        uid: this.queryList.uid,
      
      }).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          this.list = res.data.data
          this.getOrderList()
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 300
          })
        } else {
          this.$message({ message: '删除失败！', type: 'error', duration: 300 })
        }
      })
    }
  },
  watch: {
    list: function (newValue, oldValue) {
      if (newValue.length < 1) {
        location.reload()
      }
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>

<style lang="less" scoped>
.order {
 min-width: 1600px; min-height: 100%;
  background: #f5f5f5 !important;

  display: flex;
  flex-direction: column;
  align-items: center;

  .all {
    width: 1000px;
    min-height: 1000px;

    margin: 50px auto;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .title {
      color: #ff4401;
      font-weight: 700;
      font-size: 20px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 15px;
      box-sizing: border-box;
      // background-color: blueviolet;
    }

    .kind {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      height: 50px;
      background-color: coral;

      div {
        // width: 80px;
      }
    }

    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: flex-end;
      flex-direction: column-reverse;
      align-items: center;
      width: 100%;
      // height: 730px;
      // background-color: brown;
      list-style: none;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 120px;
        width: 100%;
        padding: 12px; /* padding-left: 22px; */
        box-sizing: border-box; /* margin-top: 10px; */ /* margin: 10px; */
        margin-bottom: 15px;
        border-radius: 12px;

        // background-color: #95d475;
        box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);

        .baby {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 170px;
          height: 100%;

          img {
            width: 100%;
            border-radius: 12px;
            height: 100%;
          }
          span {
            font-size: 18px;
            width: 14px;
            font-weight: 700;
            height: 100%;
            display: flex;
            color: #f56c6c;
            align-items: center;
          }
          // background-color: #ff4401;
        }

        .price,
        .num,
        .total {
          display: flex;
          justify-content: center;
          align-items: center;

          width: 70px;
          height: 100%;
          // background-color: #ff4401;
        }

        .record {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 120px;
          height: 50px;
          cursor: pointer;
        }
      }
    }
  }

  .el-pagination {
  }
}
</style>
