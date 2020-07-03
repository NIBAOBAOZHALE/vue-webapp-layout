<template>
  <div class="official-accounts-form">
    <h3>客服</h3>
    <div>
      <div class="position">
        <el-radio-group
          v-bind:value="compDataList.component.position"
          @change="handlePositionChange"
        >
          <el-radio :label="'1'">悬浮</el-radio>
          <el-radio :label="'2'">固定</el-radio>
        </el-radio-group>
      </div>
      <margin-editor
        :margin-bottom="compDataList.component.marginBottom"
        :margin-top="compDataList.component.marginTopData"
        :margin-left="compDataList.component.marginLeft"
        :margin-right="compDataList.component.marginRight"
        @postMarginTop="receiveMarginTop"
        @postMarginBottom="receiveMarginBottom"
        @postMarginLeft="receiveMarginLeft"
        @postMarginRight="receiveMarginRight"
      ></margin-editor>
    </div>
  </div>
</template>

<script>
  import marginEditor from '@/plugin/MarginEditor/MarginEditor'

  export default {
    props: {
      compData: Object
    },
    data() {
      return {
        compDataList: {}
      }
    },
    created() {
      this.compDataList = Object.assign({}, this.compData)
    },
    activated() {
      this.compDataList = Object.assign({}, this.compData)
    },
    components: {
      marginEditor
    },
    name: 'officialAccountsForm',
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
      receiveMarginLeft(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.marginLeft = value
        this.$emit('postModelData', obj)
      },
      receiveMarginRight(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.marginRight = value
        this.$emit('postModelData', obj)
      },
      handlePositionChange(value) {
        console.log(value)
        let obj = Object.assign({}, this.compDataList)
        if (value === '1') {
          obj.component.position = '2'
        } else {
          obj.component.position = '1'
        }
        this.$emit('postModelData', obj)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet" type="text/scss">
  .official-accounts-form {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 10px 20px;
    > div {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
