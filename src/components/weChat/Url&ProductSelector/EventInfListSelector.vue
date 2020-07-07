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
          <div class="input" style="visibility: hidden;">
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
          <el-table-column label="活动主题" property="name">
            <template slot-scope="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始日期" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.startDate | moment('YY/MM/DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.endDate | moment('YY/MM/DD') }}</span>
            </template>
          </el-table-column>
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
  import ProductSel from '@/components/weChat/Url&ProductSelector/ProductSel'

  export default {
    name: 'EventInfListSelector',
    extends: ProductSel
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  /*@import "@/plugin/ETicketPicker/ETicketPicker.scss";*/
  @import '../ETicketPicker/ETicketPicker';
  @import 'ProductSel';
</style>
