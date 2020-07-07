<template>
  <div class="margin-editor">
    <el-form ref="form">
      <el-form-item
        label="上间距:(pt)"
        v-show="marginTop !== undefined || inputTop"
      >
        <el-input-number
          :max="30"
          :min="0"
          :value="marginTop"
          @change="handleChangeTop"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <!-- 下间距 -->
      <el-form-item
        label="下间距:(pt)"
        v-show="marginBottom !== undefined || inputBottpm"
      >
        <el-input-number
          :max="30"
          :min="0"
          :value="marginBottom"
          @change="handleChangeBottom"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="左间距:(pt)" v-show="marginLeft !== undefined">
        <el-input-number
          :max="30"
          :min="0"
          :value="marginLeft"
          @change="handleChangeLeft"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="右间距:(pt)" v-show="marginRight !== undefined">
        <el-input-number
          :max="30"
          :min="0"
          :value="marginRight"
          @change="handleChangeRight"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'MarginEditor',
    data() {
      return {
        inputTop: false,
        inputBottpm: false,
        marginTopNum: 0,
        marginBottomNum: 0
      }
    },
    watch: {
      marginTop: {
        handler(newVal) {
          if (newVal == undefined) {
            // this.marginTop = 0
            this.inputTop = true
          }
        },
        immediate: true
      },
      marginBottom: {
        handler(newVal) {
          if (newVal == undefined) {
            // this.marginBottom = 0
            this.inputBottpm = true
          }
        },
        immediate: true
      }
    },
    props: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    methods: {
      handleChangeTop(value) {
        console.log(this.props)
        if (value == undefined) {
          console.log(this.marginTop == 0)
          //  this.marginTop.typeof
          this.input1 = 0
        }
        this.$emit('postMarginTop', value)
      },
      handleChangeBottom(value) {
        console.log(value)
        this.$emit('postMarginBottom', value)
      },
      handleChangeLeft(value) {
        console.log(value)
        this.$emit('postMarginLeft', value)
      },
      handleChangeRight(value) {
        console.log(value)
        this.$emit('postMarginRight', value)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import '../../style/el-form';

  .margin-editor {
    margin: 22px 0;
  }

  .title-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>
