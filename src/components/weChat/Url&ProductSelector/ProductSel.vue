<template>
  <div class="e-ticket-picker">
    <el-dialog
      :append-to-body="true"
      :before-close="handleCloseDialog"
      :title="title"
      :visible="visible"
      :width="'960px'"
      ref="elDialog"
    >
      <div class="table-wrap" ref="tableWrap">
        <div class="handle-box">
          <div class="input">
            <el-input
              @change="handleSearch"
              clearable
              placeholder="请输入内容"
              size="small"
              v-model="input"
            >
            </el-input>
            <div class="image">
              <img :src="searchIcon" alt="" />
            </div>
          </div>
          <el-button
            @click="initData(null)"
            icon="el-icon-refresh"
            plain
            size="small"
            type="primary"
            >刷新
          </el-button>
        </div>
        <el-table
          :data="gridData"
          @current-change="handleCurrentChange"
          header-row-class-name="table-header-class-name"
          highlight-current-row
          ref="multipleTable"
          v-loading="loading"
        >
          <el-table-column label="图片" property="name">
            <template slot-scope="scope">
              <el-image
                :fit="'contain'"
                :src="imageBaseUrl + scope.row.picUrl"
                style="width: 50px; height: 50px;"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            property="prodName"
          ></el-table-column>
          <el-table-column label="展示分类">
            <template slot-scope="scope">
              <!--              <span  v-if="scope.row.ticket.ticketName">-->
              <!--                {{scope.row.ticket.ticketName}}-->
              <!--              </span>-->
              <template v-if="scope.row.ticket">
                {{ resolveTicketType(scope.row.ticket['ticketType']) }}
              </template>
              <template v-else-if="!scope.row.ticket">
                {{ resolveShelfType(scope.row.shelfType) }}
              </template>
            </template>
          </el-table-column>
          <!--          <el-table-column label="分类" property="catName"></el-table-column>-->
          <!--                    <el-table-column label="兑换价格" property="name">-->

          <!--                    </el-table-column>-->
          <el-table-column label="活动时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime | moment('YY/MM/DD') }}</span>
              <span style="display: inline-block;"> - </span>
              <span>{{ scope.row.endTime | moment('YY/MM/DD') }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column label="操作" type="selection" width="80">-->
          <!--          </el-table-column>-->
        </el-table>
      </div>

      <div class="bottom-wrap">
        <el-button
          @click="addTicket"
          class="save-btn"
          size="medium"
          type="primary"
          >保存
        </el-button>
        <div class="info">
          <!--          您已选择{{ multipleSelection.length }}个{{ name }}-->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ETicketPicker from '@/components/weChat/ETicketPicker/ETicketPicker'
  import {
    getETicketCenterList,
    getETicketSnapProdsList,
    getEventInfList,
    getPointsMallList,
    getPurchaseETicketList
  } from '@/api/wxApi/production'

  export default {
    name: 'PicAdsProductSel',
    extends: ETicketPicker,
    props: {
      businessType: {
        type: String,
        required: true
      },
      postSelection: {
        type: Function
      }
    },
    data() {
      return {
        apiMap: {
          P: getPointsMallList,
          F: getETicketCenterList,
          S: getETicketSnapProdsList,
          G: getPurchaseETicketList,
          '15': getEventInfList,
          '27': getEventInfList
        },
        singleSelection: null,
        visible: true
      }
    },
    watch: {},
    created() {
      this.initData()
    },
    methods: {
      handleCurrentChange(row) {
        this.singleSelection = row
      },
      initData(searchStr) {
        this.loading = true
        return new Promise((resolve, reject) => {
          if (this.businessType != '15' && this.businessType != '27') {
            this.apiMap[this.businessType](searchStr)
              .then(res => {
                console.log(res)
                this.gridData = res.data.prodList
                this.loading = false
                resolve(true)
              })
              .catch(err => {
                this.loading = false
                console.log(err)
                reject(false)
              })
          } else {
            this.apiMap[this.businessType](this.businessType)
              .then(res => {
                console.log(res)
                this.gridData = res.data.eventList
                this.loading = false
                resolve(true)
              })
              .catch(err => {
                this.loading = false
                console.log(err)
                reject(false)
              })
          }
        })
      },
      addTicket() {
        if (!this.singleSelection) {
          this.messageBoxConfirm('未选择商品，无法保存', '提示', false)
            .then(() => {})
            .catch(() => {})
        } else {
          if (this.postSelection) {
            this.postSelection(this.singleSelection)
            this.$emit('update:visible', false)
          }
        }
      },
      handleCloseDialog(done) {
        this.visible = false
        done()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  /*@import "@/plugin/ETicketPicker/ETicketPicker.scss";*/
  @import '../ETicketPicker/ETicketPicker';
  @import 'ProductSel';
</style>
