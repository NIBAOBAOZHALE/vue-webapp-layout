<template>
  <div class="e-ticket-picker">
    <div
      class="item"
      style="width: 100%; box-sizing: border-box; margin: 5px;"
      v-for="(item, index) of ticketList"
      :key="index"
    >
      <div class="handle-box">
        <div class="order-number">{{ name }}{{ index + 1 }}</div>
        <div @click="removeTicket(index)" class="remove" style="">
          <div class="symbol">
            <img :src="closeImage" alt="" />
          </div>
        </div>
      </div>

      <div class="info-box">
        <div class="image">
          <el-image
            :fit="'contain'"
            :src="imageBaseUrl + item.picUrl"
            style="width: 56px; height: 56px; border-radius: 4px;"
          ></el-image>
        </div>
        <div class="text-wrap">
          <div class="name">{{ item.prodName }}</div>
        </div>
      </div>
    </div>

    <div class="add-img">
      <div class="box" @click="refreshSelection">
        <span class="plus">
          +
        </span>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogTableVisible"
      :width="'960px'"
      ref="elDialog"
    >
      <div class="table-wrap" ref="tableWrap">
        <div class="handle-box">
          <div class="input">
            <el-input
              clearable
              placeholder="请输入内容"
              size="small"
              v-model="input"
              @change="handleSearch"
            >
            </el-input>
            <div class="image">
              <img alt="" :src="searchIcon" />
            </div>
          </div>

          <el-button
            @click="refreshSelection(null)"
            icon="el-icon-refresh"
            plain
            size="small"
            type="primary"
            >刷新
          </el-button>
        </div>
        <el-table
          :data="gridData"
          @selection-change="handleSelectionChange"
          header-row-class-name="table-header-class-name"
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
          <el-table-column label="券类型">
            <template slot-scope="scope">
              <!--              <span  v-if="scope.row.ticket.ticketName">-->
              <!--                {{scope.row.ticket.ticketName}}-->
              <!--              </span>-->
              <template v-if="scope.row.ticket">
                {{ ticketTypeResolver(scope.row.ticket['ticketType']) }}
              </template>
              <template v-else-if="!scope.row.ticket">
                {{ 'NULL' }}
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
          <el-table-column label="操作" type="selection" width="80">
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
          您已选择{{ multipleSelection.length }}个{{ name }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getETicketCenterList } from '@/api/wxApi/production'

  export default {
    name: 'ETicketPicker',
    components: {},
    props: {
      array: Array,
      name: String,
      title: {
        type: String,
        default: function() {
          return '选择商品'
        }
      }
    },
    data() {
      return {
        dialogTableVisible: false,
        gridData: [
          {
            name: '全场通用20元代金券',
            count: '20',
            img: require('@/assets/img/ticket.png')
          },
          {
            name: 'YSL 003色号',
            count: '342.09',
            img: require('@/assets/img/purchase-e-ticket-by-bulk-purchase-form.png')
          },
          {
            name: '百草味坚果礼盒代金劵3',
            count: '20000',
            img: require('@/assets/img/points-mall.png')
          }
        ],
        ticketList: [],
        input: '',
        multipleSelection: [],
        prodList: [],
        loading: false,
        searchIcon: require('./assets/images/Search.png'),
        closeImage: require('@/assets/img/close-b.png')
      }
    },
    computed: {},
    watch: {
      // array: function() {
      //
      //   if (this.array) {
      //     let newArr = Object.assign([], this.array);
      //     this.ticketList = newArr;
      //   }
      // },
      gridData: function() {
        this.toggleSelection()
      },
      ticketList() {
        this.postArray()
      }
    },
    created() {
      if (this.array) {
        let newArr = JSON.parse(JSON.stringify(this.array))
        this.ticketList = newArr
      }
    },
    mounted() {
      // this.$nextTick(function() {
      //   setTimeout(() => {
      //     this.toggleSelection();
      //   }, 500);
      // });
    },
    methods: {
      ticketTypeResolver(type) {
        const map = {
          V: '代金券',
          D: '折扣券',
          P: '礼品券',
          G: '兑换券'
        }
        return map[type] || 'null'
      },
      addTicket() {
        if (this.multipleSelection.length < 1) {
          this.messageBoxConfirm('未选择商品，无法保存', '提示', false)
            .then(() => {})
            .catch(() => {})
        } else {
          this.ticketList = Object.assign([], this.multipleSelection)
          this.postArray()
          this.dialogTableVisible = false
        }
      },
      handleSearch() {
        this.initData(this.input)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      initData(searchStr) {
        this.loading = true
        return new Promise((resolve, reject) => {
          getETicketCenterList(searchStr)
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
        })
      },
      postArray() {
        this.$emit('postArray', Object.assign([], this.ticketList))
      },
      refreshSelection() {
        this.loading = true
        this.dialogTableVisible = true
        this.initData().then(() => {
          this.toggleSelection()
          this.loading = false
        })
      },
      removeTicket(index) {
        console.log(index)
        this.ticketList.splice(index, 1)
        this.postArray()
      },
      toggleSelection() {
        console.log('切换显示')
        setTimeout(() => {
          this.gridData.forEach(item => {
            this.ticketList.forEach(obj => {
              if (obj.ticketShelfID === item.ticketShelfID) {
                this.$refs.multipleTable.toggleRowSelection(item, true)
              }
            })
          })
        }, 50)
      }
    },
    update() {
      // this.toggleSelection()
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import 'ETicketPicker';
</style>
