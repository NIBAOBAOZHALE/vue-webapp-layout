<template>
  <div class="points-mall-form func-form">
    <div class="navigate">积分商城</div>
    <div class="config-module-container">
      <div class="module">
        <div class="title"><span></span> <span>配置</span></div>
        <div class="config-box">
          <el-form>
            <margin-editor
              :margin-bottom="compDataList.component.marginBottom"
              :margin-top="compDataList.component.marginTopData"
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
        <div class="title"><span></span> <span>添加商品</span></div>
        <div class="config-box">
          <!--          <e-ticket-picker-->
          <!--            @postArray="receiveETicketArray"-->
          <!--            :array="compDataList.component.data"-->
          <!--            :title="'积分商城'"-->
          <!--            :name="'商品'"-->
          <!--          ></e-ticket-picker>-->
          <points-mall-product-picker
            :array="compDataList.component.data"
            :name="'商品'"
            :title="'积分商城'"
            @postArray="receiveETicketArray"
          >
          </points-mall-product-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PointsMallProductPicker from '@/components/weChat/PointsMallProductPicker/PointsMallProductPicker'

  export default {
    name: 'PointsMallForm',
    props: {
      compData: Object
    },
    components: {
      PointsMallProductPicker
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

<style lang="scss" rel="stylesheet" scoped type="text/scss">
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
