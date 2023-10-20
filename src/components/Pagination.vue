<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSizes"
      :page-size="queryInfo.pageSize"
      :current-page="queryInfo.pageNum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { whole, getKind, getCartList, getOrders } from '../utils/request'

export default {
  props: ['sendKind'],
  data() {
    return {
      pageSizes: [8],
      total: 32,
      queryInfo: {
        pageNum: 1,
        pageSize: 8,
        uid: localStorage.getItem('uid')
      },
      list: [],
      oderList: []
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val

      if (this.$parent.kind === '狗狗') {
        this.getList()
      }
      if (this.$parent.kind === '全部') {
        this.getWhole()
      }
      if (this.$parent.kind === '推荐') {
        this.getList()
      } else {
        // this.$message({ message: '请求错误！', type: 'error' })
      }
    },
    getWhole() {
      whole(this.queryInfo).then((res) => {
        if (res.data.status !== 200) {
          return this.$message({ message: res.data.message, type: 'error' })
        }
        this.list = res.data.data
        this.$emit('getList', this.list)
        this.total = res.data.total
      })
    },
    getList() {
      getKind({
        kind: this.$parent.kind,
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize
      }).then((res) => {
        this.list = res.data.data
        this.$emit('getList', this.list)
        this.total = res.data.total
      })
    }
  },
  created() {
    this.getWhole()
  }
}
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px; // background-color: cadetblue; }
}
</style>
