<template>
  <div class="e-ticket-center-form func-form">
    <div class="navigate">领券中心</div>
    <div class="config-module-container">
      <div class="module">
        <div class="title"><span></span> <span>配置</span></div>
        <div class="config-box">
          <el-form>
            <margin-editor
              :margin-bottom="compDataList.component.marginBottom"
              :margin-top="compDataList.component.marginTopData"
              :margin-left="undefined"
              :margin-right="undefined"
              @postMarginBottom="receiveMarginBottom"
              @postMarginTop="receiveMarginTop"
            >
            </margin-editor>
            <el-form-item label="显示标题">
              <el-radio-group
                :value="compDataList.component.enableTitle"
                @change="handleChangeTitleStatus"
              >
                <el-radio :label="true">显示</el-radio>
                <el-radio :label="false">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="module" v-if="!fromRoute">
        <div class="title"><span></span> <span>添加电子券</span></div>
        <div class="config-box">
          <e-ticket-picker
            @postArray="receiveETicketArray"
            :array="compDataList.component.data"
            :title="'领券中心'"
            :name="'电子券'"
          ></e-ticket-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ETicketPicker from '@/components/weChat/ETicketPicker/ETicketPicker'

  export default {
    name: 'ETicketCenterForm',
    components: {
      ETicketPicker
    },
    props: {
      compData: Object
    },
    data() {
      return {
        compDataList: {},
        fromRoute: ''
      }
    },
    created() {
      this.fromRoute = this.$route.meta.Public
      this.compDataList = Object.assign({}, this.compData)
    },
    activated() {
      this.compDataList = Object.assign({}, this.compData)
    },
    methods: {
      receiveMarginTop(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.marginTopData = value
        this.$emit('postModelData', obj)
      },
      receiveMarginBottom(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.marginBottom = value
        this.$emit('postModelData', obj)
      },
      receiveETicketArray(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.data = value
        this.$emit('postModelData', obj)
      },
      handleChangeTitleStatus(value) {
        console.error(value)
        value = !value
        this.postCompData('enableTitle', value)
      },
      postCompData(key, value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component[`${key}`] = value
        this.$emit('postModelData', obj)
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet">
  .func-form {
    padding: 20px 10px;
    box-sizing: border-box;
    .navigate {
      width: 64px;
      height: 15px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 131, 0, 1);
      line-height: 12px;
    }
    .config-module-container {
      .module {
        padding-top: 20px;
        .title {
          display: flex;
          span:first-child {
            display: inline-block;
            width: 3px;
            height: 16px;
            background: rgba(248, 146, 25, 1);
            opacity: 0.5;
            border-radius: 1px;
            margin-left: 0;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            margin-left: 7px;
          }
        }
        .config-box {
          padding: 0 10px;
        }
      }
    }
  }
</style>
