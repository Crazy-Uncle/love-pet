<template>
  <div class="adm">
    <Nav></Nav>
    <div class="box">
      <div class="left" @click="back"></div>
      <div class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">
            <el-form
              :label-position="labelPosition"
              label-width="80px"
              :model="formLabelAlign"
            >
              <el-form-item label="账号">
                <p>{{ formLabelAlign.username }}</p>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input
                  :disabled="disabled"
                  clearable
                  v-model="formLabelAlign.nickname"
                  :rule="[{ required: true, message: '昵称不能为空' }]"
                ></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-input
                  :disabled="disabled"
                  clearable
                  v-model="formLabelAlign.sex"
                ></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input
                  :disabled="disabled"
                  clearable
                  v-model="formLabelAlign.age"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  :disabled="disabled"
                  clearable
                  v-model="formLabelAlign.email"
                ></el-input>
              </el-form-item>

              <el-form-item label="所在地">
                <el-input
                  :disabled="disabled"
                  clearable
                  v-model="formLabelAlign.address"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button @click="edit">编辑</el-button>

                <el-button type="success" :plain="true" @click="open2" round
                  >保存一下</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="密码管理" name="second">
            <!-- 密码管理 -->

            <el-tabs v-model="activeName"> </el-tabs>

            <el-steps :active="active" finish-status="success">
              <el-step title="验证原密码" space="12px"></el-step>
              <el-step title="修改密码"></el-step>
              <el-step title="修改成功"></el-step>
            </el-steps>

            <div class="oldPass" v-if="activeFlag1">
              请输入原密码：
              <el-input
                placeholder="请输入密码"
                v-model="old"
                show-password
              ></el-input>
            </div>

            <div class="newPass" v-else-if="activeFlag2">
              <div>
                请输入密码：
                <el-input
                  placeholder="请输入密码"
                  v-model="newPas1"
                  show-password
                ></el-input>
              </div>

              <div>
                请确认密码：
                <el-input
                  placeholder="请确认密码"
                  v-model="newPas2"
                  show-password
                ></el-input>
              </div>
            </div>

            <el-result
              icon="success"
              title="修改成功"
              subTitle=""
              v-else-if="activeFlag3"
            >
            </el-result>

            <el-button style="margin-top: 12px" @click="next" class="next"
              >下一步</el-button
            >
          </el-tab-pane>

          <el-tab-pane label="地址管理">
            <el-form
              ref="numberValidateForm"
              label-width="100px"
              :model="addressList"
              style="max-width: 460px"
            >
              <el-form-item label="地址信息：">
                <el-input
                  v-model="addressList.address"
                  placeholder="请输入省/市/区/街道"
                  :disabled="disabled2"
                  clearable
                />
              </el-form-item>
              <el-form-item label="详细地址：">
                <el-input
                  v-model="addressList.infoAddress"
                  placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
                  :disabled="disabled2"
                  clearable
                />
              </el-form-item>
              <el-form-item label="邮政编码：">
                <el-input
                  v-model="addressList.postalCode"
                  placeholder="请填写邮编"
                  :disabled="disabled2"
                  clearable
                />
              </el-form-item>
              <el-form-item label="收货人姓名：">
                <el-input
                  v-model="addressList.consignee"
                  placeholder="长度不超过25个字符"
                  max-length="25"
                  :disabled="disabled2"
                  clearable
                />
              </el-form-item>
              <el-form-item label="手机号：">
                <el-input
                  v-model="addressList.phone"
                  placeholder="请填写+86的手机号码"
                  minlength="11"
                  maxlength="11"
                  show-word-limit
                  :disabled="disabled2"
                  clearable
                />
              </el-form-item>
              <el-form-item>
                <el-button @click="edit2">编辑</el-button>
                <el-button type="info" @click="saveAddress">保存</el-button>
                <el-popover placement="right" width="800" trigger="click">
                  <el-table :data="tableData">
                    <el-table-column
                      width="150"
                      property="id"
                      align="center"
                      label="id"
                    ></el-table-column>
                    <el-table-column
                      width="150"
                      property="consignee"
                      align="center"
                      label="收货人"
                    ></el-table-column>
                    <el-table-column
                      width="100"
                      property="addressMessage"
                      align="center"
                      label="所在地区"
                    ></el-table-column>
                    <el-table-column
                      width="300"
                      property="infoAddress"
                      align="center"
                      label="详细地址"
                    ></el-table-column>
                    <el-table-column
                      width="300"
                      property="postalCode"
                      align="center"
                      label="邮编"
                    ></el-table-column>
                    <el-table-column
                      width="300"
                      property="phone"
                      align="center"
                      label="手机号"
                    ></el-table-column>

                    <el-table-column width="300" align="center" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          @click="change(scope.row), (dialogVisible = true)"
                          >修改
                        </el-button>

                        <el-button type="danger" @click="del(scope.row)"
                          >删除</el-button
                        >
                        <!-- <el-button @click="def(scope.row, scope.$index)"
                          >设为默认</el-button
                        > -->
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    slot="reference"
                    @click="getAddress"
                    class="el-icon-notebook-1"
                    >地址簿</el-button
                  >
                </el-popover>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="restAddressList"
      >
        <el-form-item label="地址信息">
          <el-input
            v-model="restAddressList.address"
            placeholder="请输入省/市/区/街道"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            v-model="restAddressList.infoAddress"
            placeholder="请输入详细地址，如街道"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input
            v-model="restAddressList.postalCode"
            placeholder="请填写邮编"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input
            v-model="restAddressList.consignee"
            placeholder="长度不超过25个字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="restAddressList.phone"
            placeholder="请填写+86的手机号"
            minlength="11"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changed(), (dialogVisible = false)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import router from '@/router/index'

import { save, getUserList } from '@/utils/my'
import {
  verify,
  changePassword,
  getAddressList,
  shippingAddress,
  changeAddress,
  delAddress
} from '@/utils/user'
const Nav = () => import('@/components/Nav.vue')

export default {
  components: { Nav },
  data() {
    return {
      dialogVisible: false,

      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        nickname: localStorage.getItem('nickname'),
        sex: '',
        age: '',
        email: '',
        address: ''
      },
      addressList: {
        address: '',
        infoAddress: '',
        postalCode: '',
        consignee: '',
        phone: ''
      },
      activeName: 'first',
      // flag: true,
      old: '',
      active: 0,
      activeFlag1: true,
      activeFlag2: true,
      activeFlag3: true,
      newPas1: '',
      newPas2: '',
      tableData: [],
      addressId: Number,
      restAddressList: {
        address: '',
        infoAddress: '',
        postalCode: '',
        consignee: '',
        phone: ''
      },
      disabled: true,
      disabled2: true
    }
  },
  methods: {
    edit() {
      this.disabled = false
    },
    edit2() {
      this.disabled2 = false
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    change(val) {
      this.addressId = val.id
    },
    changed() {
      if (
        !this.restAddressList.address ||
        !this.restAddressList.consignee ||
        !this.restAddressList.infoAddress ||
        !this.restAddressList.phone ||
        !this.restAddressList.postalCode
      ) {
        this.$message({
          message: '请填写完整地址信息',
          type: 'warning',
          duration: 500
        })
      } else {
        changeAddress({
          id: this.addressId,
          addressMessage: this.restAddressList.address,
          infoAddress: this.restAddressList.infoAddress,
          postalCode: this.restAddressList.postalCode,
          consignee: this.restAddressList.consignee,
          phone: this.restAddressList.phone
        }).then((res) => {
          if (res.data.status === 200) {
            for (const i in this.restAddressList) {
              this.restAddressList[i] = ''
            }
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 500
            })
          } else {
            this.$message({
              message: '修改失败',
              type: 'warning',
              duration: 500
            })
          }
        })
      }
    },
    del(val) {
      this.addressId = val.id

      // if(this.addressList)
      delAddress({ id: this.addressId }).then((res) => {
        if (res.data.status === 200) {
          this.getAddress()
          this.$message({
            message: '删除地址成功',
            type: 'success',
            duration: 500
          })
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning',
            duration: 500
          })
        }
      })
    },
    open2() {
      save({
        username: localStorage.getItem('username'),
        nickname: this.formLabelAlign.nickname,

        sex: this.formLabelAlign.sex,
        age: this.formLabelAlign.age,
        email: this.formLabelAlign.email,
        address: this.formLabelAlign.address
      }).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          window.location.reload()
          this.$message({ message: '保存成功！', type: 'success' })
        }
      })
    },
    next() {
      if (this.active++ > 2) this.active = 0

      if (this.active === 1) {
        verify({
          username: localStorage.getItem('username'),
          password: this.old
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({ message: '验证成功！', type: 'success' })
          } else {
            this.$message({ message: '验证失败！', type: 'success' })
            this.active = 0
          }
        })

        this.activeFlag1 = true
        this.activeFlag2 = false
        this.activeFlag3 = false
        // console.log(1)
      }
      if (this.active === 2) {
        this.activeFlag2 = true
        this.activeFlag1 = false
        this.activeFlag3 = false
      }
      if (this.active === 3) {
        if (this.newPas1 === this.newPas2) {
          changePassword({
            username: localStorage.getItem('username'),
            password: this.newPas2
          }).then((res) => {
            if (res.data.status === 200) {
              this.$message({ message: '修改成功,请重新登录', type: 'success' })
              this.activeFlag3 = true
              this.activeFlag1 = false
              this.activeFlag2 = false

              localStorage.removeItem('token')
              localStorage.removeItem('username')
              localStorage.removeItem('uid')
              localStorage.removeItem('nickname')
            } else {
              this.$message({ message: '修改失败！', type: 'error' })
              this.active = 3
            }
          })
        } else {
          this.active = 3
        }
        location.reload()
      }
      if (this.active === 0) {
        this.activeFlag1 = true
        this.activeFlag2 = false
        this.activeFlag3 = false
      }
    },

    back() {
      router.push('/')
    },
    async getData() {
      await getUserList({
        username: localStorage.getItem('username')
      }).then((res) => {
        if (res.data.status === 200) {
          this.formLabelAlign.nickname = res.data.data[0].nickname

          this.formLabelAlign.sex = res.data.data[0].sex
          this.formLabelAlign.age = res.data.data[0].age
          this.formLabelAlign.email = res.data.data[0].email
          this.formLabelAlign.address = res.data.data[0].address
        } else {
          this.$message({ message: '获取数据失败！', type: 'error' })
        }
      })
    },
    saveAddress() {
      if (
        !this.addressList.address ||
        !this.addressList.consignee ||
        !this.addressList.infoAddress ||
        !this.addressList.phone ||
        !this.addressList.postalCode
      ) {
        this.$message({
          message: '请填写完整地址信息',
          type: 'warning',
          duration: 500
        })
      } else {
        shippingAddress({
          aid: localStorage.getItem('uid'),
          username: localStorage.getItem('username'),
          addressMessage: this.addressList.address,
          infoAddress: this.addressList.infoAddress,
          postalCode: this.addressList.postalCode,
          consignee: this.addressList.consignee,
          phone: this.addressList.phone
        }).then((res) => {
          if (res.data.status === 200) {
            // 提交成功清除输入框内容
            for (const i in this.addressList) {
              this.addressList[i] = ''
            }
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 500
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'warning',
              duration: 500
            })
          }
        })
      }
    },
    async getAddress() {
      await getAddressList({
        id: localStorage.getItem('uid'),
        aid: localStorage.getItem('uid')
      }).then((res) => {
        if (res.data.status === 200) {
          this.tableData = res.data.data
        } else {
          this.$message({
            message: res.data.message,
            type: 'warning',
            duration: 500
          })
        }
      })
    }
  },
  created() {
    this.getData()
    this.formLabelAlign.username = localStorage.getItem('username')
  },
  watch: {
    $route(to, from) {
      if (to.path === '/admin') {
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.adm {
  display: flex;
  width: 100%;
  height: 100%;
  background: #f5f5f5 !important;

  flex-direction: column;
  align-items: center;

  // background-color: blue;

  .box {
    margin-top: 100px;
    display: flex;
    min-width: 1200px;
    min-height: 600px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }

  .left {
    flex: 1;
    cursor: pointer;
    background-image: url(../assets/images/bizi.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: aquamarine;
  }
  .right {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    flex: 1;

    // background-color: blueviolet;

    .el-tabs--top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;

      .el-tabs__content {
        width: 100%;
      }

      .el-tab-pane {
        width: 100%;
        height: 472px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .el-form {
          display: flex;
          align-items: center;
          flex-direction: column;
          .el-form-item {
            .el-form-item__content {
              p {
                margin: 0;
                width: 202px;
                text-align: center;
              }
            }
          }
        }
        .el-steps {
          width: 100%;
        }
        .oldPass {
          display: flex;
          align-items: center;
          justify-content: center;

          .el-input {
            width: 170px;
          }
        }
        .newPass {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 150px;
          flex-direction: column;

          .el-input {
            width: 170px;
          }
        }
        .el-steps {
          width: 100%;
        }

        .next {
          width: 100px;
          // margin: auto;
        }
      }

      .el-button {
        width: 150px;
        height: 50px;
      }
    }
    // background-color: #cae2ff;
  }
}
</style>
