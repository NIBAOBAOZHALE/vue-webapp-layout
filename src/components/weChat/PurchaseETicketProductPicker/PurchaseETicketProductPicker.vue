<template>
  <div class="e-ticket-picker">
    <draggable v-model="ticketList">
      <div
        class="item"
        style="width: 100%; box-sizing: border-box; margin: 5px;"
        v-for="(item, index) of ticketList"
        :key="index"
      >
        <div class="handle-box">
          <div class="order-number">{{ name }}{{ index + 1 }}</div>
          <div @click="removeTicket(index)" style="" class="remove">
            <div class="symbol">
              <img :src="closeImage" alt="" />
            </div>
          </div>
        </div>

        <div class="info-box">
          <div class="image">
            <el-image
              style="width: 56px; height: 56px; border-radius: 4px;"
              :fit="'contain'"
              :src="imageBaseUrl + item.picUrl"
            ></el-image>
          </div>
          <div class="text-wrap">
            <div class="name">{{ item.prodName }}</div>
          </div>
        </div>
      </div>
    </draggable>

    <div class="add-img">
      <div class="box" @click="refreshSelection">
        <span class="plus">
          +
        </span>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogTableVisible"
      :title="title"
      :width="'960px'"
      ref="elDialog"
    >
      <div class="table-wrap" ref="tableWrap">
        <div class="handle-box">
          <div class="input">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              clearable
              size="small"
              @change="handleSearch"
            >
            </el-input>
            <div class="image">
              <img src="assets/img/Search.png" alt="" />
            </div>
          </div>

          <el-button
            size="small"
            type="primary"
            icon="el-icon-refresh"
            plain
            @click="initData(null)"
            >刷新</el-button
          >
        </div>
        <el-table
          :data="gridData"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
          header-row-class-name="table-header-class-name"
          v-loading="loading"
        >
          <el-table-column label="图片" property="name">
            <template slot-scope="scope">
              <el-image
                style="width: 50px; height: 50px;"
                :src="imageBaseUrl + scope.row.picUrl"
                :fit="'contain'"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            label="商品名称"
            property="prodName"
          ></el-table-column>
          <!--          <el-table-column label="券类型" property="category"></el-table-column>-->
          <el-table-column label="分类" property="catName"></el-table-column>
          <!--          <el-table-column label="兑换价格" property="name"></el-table-column>-->
          <el-table-column label="活动时间">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime | moment('YY/MM/DD') }}</span>
              <span style="display: inline-block;"> - </span>
              <span>{{ scope.row.endTime | moment('YY/MM/DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="55" label="操作">
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-wrap">
        <el-button
          type="primary"
          size="medium"
          class="save-btn"
          @click="addTicket"
          >保存</el-button
        >
        <div class="info">
          您已选择{{ multipleSelection.length }}个{{ name }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ETicketPicker from '@/components/weChat/ETicketPicker/ETicketPicker'
  import { getPurchaseETicketList } from '@/api/wxApi/production'
  import draggable from 'vuedraggable'

  export default {
    name: 'PurchaseETicketProductPicker',
    extends: ETicketPicker,
    components: {
      draggable
    },
    data() {
      return {
        gridData: [],
        loading: false
      }
    },
    methods: {
      initData(searchStr) {
        this.loading = true
        return new Promise((resolve, reject) => {
          getPurchaseETicketList(searchStr)
            .then(res => {
              this.gridData = res.data.prodList
              this.loading = false
              resolve(true)
            })
            .catch(err => {
              this.loading = false
              console.log(err)
              reject(false)
            })
        })
      },
      refreshSelection() {
        this.dialogTableVisible = true
        this.initData().then(() => {
          this.toggleSelection()
          this.loading = false
        })
      }
    },
    created() {}
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  /deep/ .el-form-item__content {
    width: 100%;
  }
  .title-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .e-ticket-picker {
    .item {
      padding-bottom: 25px;
      .info-box {
        height: 80px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 10px 10px;
        box-sizing: border-box;
        background: rgba(249, 247, 243, 1);
        border-radius: 4px;
        .text-wrap {
          width: 100%;
          display: flex;
          align-items: center;
          .name {
            color: #333333;
            font-size: 14px;
            /*width: 100%;*/
            /*height: 100%;*/
            display: flex;
            align-items: center;
            padding-left: 20px;
          }
        }
        .image {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .handle-box {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .order-number {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #5f5b59;
        }
        .remove {
          height: 24px;
          width: 24px;
          /*background: #d2cecb;*/
          border-radius: 45px;
          color: #ffffff;
          position: relative;
          transform: rotate(45deg);
          font-size: 24px;
          right: 0;
          cursor: pointer;
          z-index: 1001;
          .symbol {
            position: relative;
            transform: rotate(45deg);
          }
        }
      }
    }
    .add-img {
      padding-top: 15px;
      .box {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: #d9d5d2 1px dotted;
        cursor: pointer;
        box-sizing: border-box;
        .plus {
          font-size: 28px;
          color: #aaaaaa;
        }
      }
    }
    /deep/ .el-dialog {
      .el-dialog__header {
        display: flex;
        justify-content: flex-start;
        color: #333333;
        font-size: 18px;
      }

      .el-dialog__body {
        padding-bottom: 0;
        padding-left: 0;
        padding-right: 0;
      }
      .handle-box {
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        .input {
          width: 260px;
          height: 32px;
          position: relative;
          .image {
            position: absolute;
            height: 100%;
            width: 32px;
            background: #dcd6d1;
            top: 0;
            right: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 0px 4px 4px 0px;
            img {
              height: 16px;
              width: 16px;
            }
          }
        }
      }
      .table-wrap {
        padding: 0 20px;
        padding-bottom: 5px;
      }
      .bottom-wrap {
        height: 60px;
        background: #fbf9f7;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .info {
          position: absolute;
          display: flex;
          width: 100%;
          justify-content: flex-end;
          box-sizing: border-box;
          padding: 0 20px;
        }
        .save-btn {
          position: relative;
          z-index: 1;
        }
      }
    }

    /deep/tr.table-header-class-name {
      position: relative;
      width: 100%;
      color: #7f7977;
      /*background-color: #ddd4cd;*/
      > th {
        background-color: #f1eeeb;
      }
    }
  }
</style>
