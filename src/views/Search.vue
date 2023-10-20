<template>
  <div class="search">
    <Nav></Nav>

    <div class="content">
      <div class="title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            :to="{ path: '/' }"
            style="padding-left: 10px; box-sizing: border-box"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>

        <p
          v-if="flag"
          style="font-size: 15px; padding-left: 10px; box-sizing: border-box"
        >
          下面是关于 “{{ title }}” 的信息
        </p>
        <p
          style="font-size: 15px; padding-left: 10px; box-sizing: border-box"
          v-else
        >
          无此信息
        </p>
      </div>

      <el-table
        :data="getSearch"
        stripe
        style="width: 100%"
        border
        highlight-current-row
      >
        <el-table-column
          prop="name"
          label="商品名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品信息"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover"
              alt=""
              style="width: 120px; height: 120px; cursor: pointer"
              fit="cover"
              @click.prevent="cell(scope.row)"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          width="280"
          label="商品描述"
          align="center"
        >
        </el-table-column>

        <el-table-column
          label="价格(元)"
          align="center"
          sortable
          :sort-method="sortMethod"
        >
          <template slot-scope="scope">
            {{ scope.row.price + '元' }}
          </template>
        </el-table-column>

        <el-table-column prop="repertory" label="库存" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { search } from '@/utils/request'
import router from '@/router'
export default {
  components: { Nav },
  data() {
    return {
      getSearch: [],
      title: '',
      flag: true
    }
  },

  methods: {
    sortMethod(a, b) {
      return Number(a.price) - Number(b.price)
    },

    getData(name) {
      search({ name: name }).then((res) => {
        if (res.data.status === 200) {
          // console.log(res.data.data)
          this.getSearch = res.data.data
          this.title = res.data.searchTitle

          this.flag = true
        } else {
          this.$message({
            message: '没有找到',
            type: 'warning',
            duration: 1000
          })
          this.flag = false
          this.getSearch = []
        }
      })
    },

    to(val) {
      // console.log(val)
      router.push({ path: '/detail', query: val })
    },
    cell(row) {
      // console.log(row)
      this.$router.push({ path: '/detail', query: row })
    }
  },
  created() {
    this.getData(this.$route.query.name)
  }
}
</script>

<style lang="less" scoped>
.search {
  min-width: 1600px;
  min-height: 100%;
  background: #f5f5f5 !important;

  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    min-width: 1000px;
    min-height: 600px;
    margin-top: 50px;
    // background-color: #409eff;

    .title {
      width: 100%;
      height: 100px;
      display: flex;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-around;

      p {
        margin: 0;
      }
    }
    .list {
      width: 100%;
      height: auto;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

      .info {
        display: flex;
        width: 100%;
        height: 50px;
        margin: 0;
        padding: 0;
        align-items: center;
        justify-content: space-around;
        list-style: none;
        background-color: #ccc;
      }

      .item {
        display: flex;
        width: 100%;
        height: 500px;
        flex-direction: column;
        justify-content: flex-start;

        .item-li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
          width: 100%;
          padding: 12px;
          box-sizing: border-box;
          margin: 10px 0;
          border-radius: 12px;

          // background-color: #95d475;
          box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
          div {
            display: flex;
            height: 100%;
            align-items: center;

            img {
              width: 120px;
              height: 100%;
              border-radius: 10px;
            }
            span {
              font-size: 14px;
              width: 70px;
              font-weight: 700;
              height: 100%;
              display: flex;
              color: #f56c6c;
              align-items: center;
            }
          }
        }
      }
    }
  }
}
</style>
