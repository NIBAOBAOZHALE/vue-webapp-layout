<template>
  <div class="text_mains func-form">
    <div class="label">标题</div>
    <el-form
      label-position="left"
      size="mini"
      :inline="true"
      label-width="25px!important"
    >
      <el-form-item
        label="间距设置"
        label-width="100px!important"
        class="spacing-setting-box"
      >
        <el-form-item label="上">
          <el-input-number
            :max="30"
            :min="0"
            v-model="compDataList.component.marginTop"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="下">
          <el-input-number
            :max="30"
            :min="0"
            v-model="compDataList.component.marginBottom"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="左">
          <el-input-number
            :max="30"
            :min="0"
            v-model="compDataList.component.marginLeft"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="右">
          <el-input-number
            :max="30"
            :min="0"
            v-model="compDataList.component.marginRight"
            @change="postData"
            label="描述文字"
            style="width: 88px;"
          ></el-input-number>
        </el-form-item>
      </el-form-item>
      <el-form-item
        class="text-area"
        label="标题名称"
        label-width="100px!important"
      >
        <el-input
          v-model="compDataList.component.text"
          style="width: 268px;"
          @blur="postData"
          placeholder="请输入标题名称"
        >
        </el-input>
      </el-form-item>
      <!--      <el-form-item label="图片圆角" label-width="100px!important">-->
      <!--        <el-radio-group-->
      <!--          @change="postData"-->
      <!--          v-model="compDataList.component.borderRadius"-->
      <!--        >-->
      <!--          <el-radio :label="false">直角</el-radio>-->
      <!--          <el-radio :label="true">圆角</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <el-form-item
        class="text-area"
        label="对齐方式"
        label-width="100px!important"
      >
        <el-radio-group
          v-model="compDataList.component.align"
          @change="postData"
        >
          <el-radio :label="1">居左</el-radio>
          <el-radio :label="2">居中</el-radio>
          <el-radio :label="3">居右</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="text-area"
        label="标题粗细"
        label-width="100px!important"
      >
        <el-radio-group
          v-model="compDataList.component.fontWeight"
          @change="postData"
        >
          <el-radio :label="0">常规</el-radio>
          <el-radio :label="1">加粗</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="字体大小" label-width="100px!important">
        <el-select v-model="compDataList.component.fontSize" @change="postData">
          <el-option
            v-for="(val, index) of fontSizeData"
            :key="index"
            :label="val"
            :value="val"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        style="width: 100%;"
        label="标题颜色"
        label-width="100px!important"
      >
        <el-color-picker
          class="color-picker"
          v-model="compDataList.component.fontColor"
        >
        </el-color-picker>
      </el-form-item>
      <el-form-item
        style="width: 100%;"
        label="背景颜色"
        label-width="100px!important"
      >
        <el-color-picker
          class="color-picker"
          @change="postData"
          v-model="compDataList.component.backgroundColor"
        >
        </el-color-picker>
      </el-form-item>
      <el-form-item
        style="width: 100%;"
        label="跳转链接"
        label-width="100px!important"
      >
        <div class="link">
          <div
            class="name"
            v-if="
              (compDataList.component.link &&
                compDataList.component.link.name) ||
                (compDataList.component.link && compDataList.component.link.url)
            "
            :style="{
              marginRight:
                compDataList.component.link && compDataList.component.link.name
                  ? '10px'
                  : ''
            }"
          >
            <img
              style="
                position: absolute;
                width: 15px;
                height: 15px;
                right: 0;
                top: 0;
                cursor: pointer;
              "
              src="../assets/images/删除.png"
              alt=""
              @click="removeLink()"
            />
            {{
              (compDataList.component.link &&
                compDataList.component.link.name &&
                compDataList.component.link.name) ||
                compDataList.component.link.url
            }}
          </div>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            style="width: 100px;"-->
          <!--            @click="selectUrlVisible = true"-->
          <!--            v-if="!compDataList.component.link"-->
          <!--            >选择</el-button-->
          <!--          >-->
          <el-input
            clearable
            @change="postData"
            v-model="compDataList.component.link"
          >
          </el-input>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'Main',
    inject: ['pageData'],
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
      // receiveUploadMessage(data) {
      //   console.error(data)
      //   data = 'aa'
      //   let color = '#FF6924'
      //   let obj = Object.assign({}, this.compDataList)
      //   obj.component.text = data
      //   obj.component.backgroundColor = color
      //   this.$emit('postModelData', obj, color)
      // },
      postData() {
        setTimeout(() => {
          let obj = this.$lodash.cloneDeep(this.compDataList)
          this.$emit('postModelData', obj)
        }, 50)
      },
      receiveLink(res) {
        console.log(res)
        this.compDataList.component.link = this.$lodash.cloneDeep(res)
        // this.currentEditHotSpotObj.link = res
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
        this.postData()
      },
      removeLink() {
        this.compDataList.component.link = null
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
