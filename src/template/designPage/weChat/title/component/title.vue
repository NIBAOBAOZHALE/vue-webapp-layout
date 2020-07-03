<template>
  <div class="text_main">
    <div
      class="text"
      v-if="!dataObj.component.text"
      style="
        color: rgba(153, 153, 153, 1);
        line-height: 14px;
        box-sizing: border-box;
        margin: 0 11px 0 11px;
        font-size: 12px;
      "
    >
      这是标题，请在右边进行编辑
    </div>
    <div
      v-if="dataObj.component.text"
      :style="{
        fontSize: `${dataObj.component.fontSize}px`,
        color: dataObj.component.fontColor,
        backgroundColor: dataObj.component.backgroundColor,
        fontWeight:
          Number(dataObj.component.fontWeight) === 0 ? 'normal' : 'bold'
      }"
      class="text"
      :class="[
        dataObj.component.align === 2
          ? 'center'
          : dataObj.component.align === 3
          ? 'right'
          : 'left'
      ]"
    >
      {{ dataObj.component.text }}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'texts',
    props: ['dataObj'],
    data() {
      return {
        compDataList: ''
      }
    },
    computed: {},
    created() {
      this.compDataList = Object.assign({}, this.dataObj)
      console.log(this.compDataList)
    },
    methods: {},
    watch: {}
  }
</script>
<style lang="scss" scoped>
  .text_main {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .text {
      display: flex;
      box-sizing: border-box;
      flex-wrap: wrap;
      width: 100%;
      word-break: break-all;
      padding: 15px 21px;
      line-height: 14px;
    }
    .center {
      justify-content: center;
    }
    .left {
      justify-content: flex-start;
    }
    .right {
      justify-content: flex-end;
    }
  }
</style>
