<template>
  <div class="func-form">
    <div class="navigate">秒杀专区</div>
    <div class="config-module-container">
      <div class="module">
        <div class="title"><span></span> <span>配置</span></div>
        <div class="config-box">
          <el-form class="form">
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
          <!--            :title="'电子券秒杀'"-->
          <!--            :name="'电子券'"-->
          <!--          ></e-ticket-picker>-->
          <product-picker
            :array="compDataList.component.data"
            :name="'商品'"
            :title="'秒杀商品'"
            @postArray="receiveETicketArray"
          >
          </product-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductPicker from '@/components/weChat/SnapUpProductPicker/SnapUpProductPicker'

  export default {
    name: 'ETicketSnapUpForm',
    props: {
      compData: Object
    },
    components: {
      ProductPicker
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
  @import '../../../../../style/func-form';
</style>
