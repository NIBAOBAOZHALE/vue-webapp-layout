<template>
  <div class="text_mains func-form">
    <div class="label">文本</div>
    <el-form
      :inline="true"
      label-position="left"
      label-width="25px!important"
      size="mini"
    >
      <el-form-item
        class="spacing-setting-box"
        label="间距设置"
        label-width="100px!important"
      >
        <el-form-item label="上">
          <el-input-number
            :max="30"
            :min="0"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
            v-model="compDataList.component.marginTop"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="下">
          <el-input-number
            :max="30"
            :min="0"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
            v-model="compDataList.component.marginBottom"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="左">
          <el-input-number
            :max="30"
            :min="0"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
            v-model="compDataList.component.marginLeft"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="右">
          <el-input-number
            :max="30"
            :min="0"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
            v-model="compDataList.component.marginRight"
          ></el-input-number>
        </el-form-item>
      </el-form-item>
      <el-form-item
        class="text-area"
        label="文本内容"
        label-width="100px!important"
      >
        <rich-text
          :height="320"
          :width="288"
          @change="postData"
          v-model="compDataList.component.text"
        ></rich-text>
        <!--        <sp-richtext-->
        <!--          v-model="compDataList.component.text"-->
        <!--          :toolbar="[-->
        <!--            'fontsizeselect forecolor backcolor bold underline strikethrough alignleft aligncenter alignright'-->
        <!--          ]"-->
        <!--          :disabled="false"-->
        <!--          :width="288"-->
        <!--          :height="320"-->
        <!--          @onChange="postData"-->
        <!--        ></sp-richtext>-->
        <!--      <el-form-item label="图片圆角" label-width="100px!important">-->
        <!--        <el-radio-group-->
        <!--          @change="postData"-->
        <!--          v-model="compDataList.component.borderRadius"-->
        <!--        >-->
        <!--          <el-radio :label="false">直角</el-radio>-->
        <!--          <el-radio :label="true">圆角</el-radio>-->
        <!--        </el-radio-group>-->
      </el-form-item>
      <el-form-item
        label="跳转链接"
        label-width="100px!important"
        style="width: 100%;"
      >
        <el-input
          @change="postData"
          v-model="compDataList.component.link"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import RichText from '@/components/weChat/RichText/RichText'

  export default {
    name: 'RichTextForm',
    inject: ['pageData'],
    components: {
      RichText
    },
    props: {
      compData: {}
    },
    data() {
      return {
        compDataList: {},
        color1: '#409EFF',
        input10: '',
        num1: 0,
        num2: 0,
        radio2: 3,
        fontSizeData: [12, 14, 16, 18, 20],
        selectUrlVisible: false
      }
    },
    created() {
      this.compDataList = Object.assign({}, this.compData)
      console.log(this.compDataList)
    },
    methods: {
      chioceChange() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      },
      // eslint-disable-next-line no-unused-vars
      handleChange(value) {
        // this.chioce()
        let top = Object.assign({}, this.compDataList)
        top.component.marginTopData = this.num1.toString()
        this.$emit('postModelData', top)
        console.log(this.num1)
      },
      // eslint-disable-next-line no-unused-vars
      handleChanges(value) {
        // this.chioce()
        let bottom = Object.assign({}, this.compDataList)
        bottom.component.marginBottom = this.num2.toString()
        this.$emit('postModelData', bottom)
      },
      blur() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      },
      chioce() {
        let obj = Object.assign({}, this.compDataList)
        //    obj.component.text = this.color1
        obj.component.backgroundColor = this.color1
        this.$emit('postModelData', obj)
      },
      receiveUploadMessage(data) {
        console.error(data)
        data = 'aa'
        let color = '#FF6924'
        let obj = Object.assign({}, this.compDataList)
        obj.component.text = data
        obj.component.backgroundColor = color
        this.$emit('postModelData', obj, color)
      },
      postData() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      },
      receiveLink(res) {
        console.log(res)
        this.compDataList.component.link = res
        // this.currentEditHotSpotObj.link = res
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
        this.postData()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .func-form {
    padding: 20px 21px 0 21px;
    box-sizing: border-box;

    > .label {
      width: 58px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

    /deep/ .form,
    .el-form {
      margin: 17px 0;
    }

    .text-area {
      margin-right: 0;

      /deep/ label.el-form-item__label {
        padding-right: 0;
      }
    }

    .color-picker {
      /deep/ .el-color-picker__trigger {
        width: 60px;

        .el-color-picker__icon {
          display: none;
        }
      }
    }

    .link {
      display: flex;
      justify-content: flex-start;
      position: relative;

      .name {
        max-width: 204px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .spacing-setting-box {
      /deep/ > div.el-form-item__content {
        width: 248px;
      }
    }
  }
</style>
