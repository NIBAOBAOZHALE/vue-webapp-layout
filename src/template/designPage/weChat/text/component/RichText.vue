<template>
  <div class="text_main">
    <div
      :class="[
        dataObj.component.align === 2
          ? 'center'
          : dataObj.component.align === 3
          ? 'right'
          : 'left'
      ]"
      :style="{
        fontSize: `${dataObj.component.fontSize}px`,
        color: dataObj.component.fontColor,
        backgroundColor: dataObj.component.backgroundColor,
        fontWeight:
          Number(dataObj.component.fontWeight) === 0 ? 'normal' : 'bold'
      }"
      class="text"
      style="color: rgba(153, 153, 153, 1); box-sizing: border-box;"
      v-if="!dataObj.component.text"
    >
      这是一段文本，请在右边进行编辑
    </div>
    <div
      class="text"
      v-html="dataObj.component.text"
      v-if="dataObj.component.text"
    ></div>
  </div>
</template>
<script>
  export default {
    name: 'RichText',
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
      box-sizing: border-box;
      width: 100%;
      padding: 15px 21px;

      /deep/ p {
        strong {
          font-weight: bold;

          > * {
            font-weight: bold;
          }
        }
      }
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
