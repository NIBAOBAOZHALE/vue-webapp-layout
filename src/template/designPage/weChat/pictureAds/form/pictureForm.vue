<template>
  <div class="picture-form function-form">
    <div class="label">图片</div>
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
      <el-form-item label="图片圆角" label-width="100px!important">
        <el-radio-group
          @change="postData"
          v-model="compDataList.component.borderRadius"
        >
          <el-radio :label="false">直角</el-radio>
          <el-radio :label="true">圆角</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="100px!important" label="选择图片">
        <sp-upload-img
          v-if="!compDataList.component.imageUrl"
          :limitNumber="1"
          width="100px"
          :fileUrl.sync="compDataList.component.imageUrl"
          @update:fileUrl="postData"
          :value="compDataList.component.imageUrl"
          v-model="compDataList.component.imageId"
          @onChange="postData"
          :limitSize="1000"
        ></sp-upload-img>
        <image-viewer
          v-if="compDataList.component.imageUrl"
          :image-url="compDataList.component.imageUrl"
          width="100px"
          height="100px"
          @delete="
            compDataList.component.imageUrl = ''
            compDataList.component.imageId = ''
            compDataList.component.data = []
            postData()
          "
        >
        </image-viewer>
        <span
          style="
            display: block;
            width: 242px;
            font-size: 12px;
            color: #999999;
            line-height: 18px;
            padding-top: 13px;
          "
          >支持格式jpg、png的图片，2M以内，建议 宽度640px或750px</span
        >
      </el-form-item>
      <el-form-item label-width="100px!important" label="跳转链接">
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
              @click="
                compDataList.component.link = undefined
                postData()
              "
            />
            {{
              compDataList.component.link &&
                compDataList.component.link.name &&
                compDataList.component.link.name
            }}
          </div>
          <el-button
            @click="selectUrlVisible = true"
            style="width: 100px;"
            v-if="!compDataList.component.link"
            >选择</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <!--    <div class="module">-->
    <!--      <span class="tip">如不配置链接，对应页面将无法在前端展示！</span>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <img-upload-with-prod-selector-->
    <!--        @postMessage="receiveUploadMessage"-->
    <!--        :array="compDataList.component.data"-->
    <!--        v-if="compDataList"-->
    <!--      >-->
    <!--      </img-upload-with-prod-selector>-->
    <!--      &lt;!&ndash; <div @click="chioceLink">选择连接</div> &ndash;&gt;-->
    <!--    </div>-->
  </div>
</template>
<script>
  export default {
    name: 'PictureAdsForm',
    inject: ['pageData'],
    components: {},
    props: {
      compData: {}
    },
    data() {
      return {
        compDataList: {},
        num1: 1,
        num2: 1,
        selectUrlVisible: false
      }
    },
    created() {
      this.compDataList = Object.assign({}, this.compData)
    },
    active() {
      this.compDataList = Object.assign({}, this.compData)
    },
    methods: {
      // chioceLink() {
      //   let Link = Object.assign({}, this.compDataList);
      //   Link.component.link = "http://www.baidu.com";
      //   this.$emit("postModelData", Link);
      // },
      receiveUploadMessage(data) {
        console.error(data)
        this.compDataList.component.data = data
        this.$emit('postModelData', this.compDataList)
      },
      handleMarginTopChange(value) {
        let top = Object.assign({}, this.compDataList)
        top.component.marginTopData = value
        this.$emit('postModelData', top)
      },
      handleMarginBottomChange(value) {
        let bottom = Object.assign({}, this.compDataList)
        bottom.component.marginBottom = value
        this.$emit('postModelData', bottom)
      },
      postData() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      },
      receiveLink(res) {
        console.log(res)
        this.compDataList.component.link = res
        // this.currentEditHotSpotObj.link = res
        this.postData()
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .carousel-form,
  .function-form {
    padding: 20px 21px 0 21px;
    box-sizing: border-box;
    > .label {
      width: 58px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    > /deep/ .form,
    .el-form {
      margin: 17px 10px;
    }
    .add-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .image-preview {
      position: relative;
      .delete-button {
        position: absolute;
        right: -10px;
        top: -10px;
        cursor: pointer;
        width: 15px;
        height: 15px;
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
