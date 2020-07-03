<template>
  <div class="hot-spot-form func-form">
    <div class="label">图片热点</div>
    <!--        <div class="title"><span>间距配置</span></div>-->
    <!--        <div class="config-box">-->
    <!--      -->
    <!--        </div>-->
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
          v-if="!compDataList.component.imageHotSpotUrl"
          :limitNumber="1"
          width="100px"
          :fileUrl.sync="compDataList.component.imageHotSpotUrl"
          @update:fileUrl="uploadImg"
          :value="compDataList.component.imageHotSpotUrl"
          v-model="compDataList.component.imageId"
          @onChange="postData"
          :limitSize="1000"
        ></sp-upload-img>
        <image-viewer
          v-if="compDataList.component.imageHotSpotUrl"
          :image-url="compDataList.component.imageHotSpotUrl"
          width="100px"
          @delete="
            compDataList.component.imageHotSpotUrl = ''
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

      <el-form-item label-width="100px!important" label="热点">
        <el-button
          :disabled="!compDataList.component.imageHotSpotUrl"
          @click="isEditImageHotSpotDialogShow = true"
          >绘制热点</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="isEditImageHotSpotDialogShow"
      title="绘制热点"
      width="810px"
      :center="false"
      @closed="closeDialog()"
      @open="openDialog()"
      :close-on-click-modal="false"
      :show-close="false"
      custom-class="dialog-container"
    >
      <image-hot-spot-area
        v-if="isEditImageHotSpotShow"
        :hot-spot-arr="temporaryData.component.data"
        :post-hot-spot-arr="receiveHotSpotArr"
        :image-url="temporaryData.component.imageHotSpotUrl"
      ></image-hot-spot-area>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ImageHotSpotArea from '@/components/weChat/ImageHotSpot/ImageHotSpotArea'
  import ImageViewer from '@/components/public/imageViewer/imageViewer'

  export default {
    name: 'HotSpotForm',
    props: {
      compData: Object
    },
    components: {
      ImageViewer,
      ImageHotSpotArea
    },
    data() {
      return {
        compDataList: {},
        isEditImageHotSpotDialogShow: false,
        temporaryData: {},
        isEditImageHotSpotShow: false
      }
    },
    created() {
      this.compDataList = JSON.parse(JSON.stringify(this.compData))
      this.temporaryData = JSON.parse(JSON.stringify(this.compData))
    },
    activated() {
      this.compDataList = JSON.parse(JSON.stringify(this.compData))
      this.temporaryData = JSON.parse(JSON.stringify(this.compData))
    },
    methods: {
      uploadImg() {
        this.compDataList.component.data = []
        this.isEditImageHotSpotShow = false
        this.temporaryData = JSON.parse(JSON.stringify(this.compDataList))
        this.isEditImageHotSpotShow = true
        this.$emit('postModelData', { ...this.compDataList })
      },
      receiveHotSpotArr(arr) {
        console.log(arr)
        this.temporaryData.component.data = JSON.parse(JSON.stringify(arr))
      },
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
      save() {
        // this.temporaryData.component.data &&
        //   this.temporaryData.component.data.every(item => {
        //     return Boolean(item.link)
        //   })
        console.log(
          this.temporaryData.component.data &&
            this.temporaryData.component.data.every(item => {
              console.log(item.link)
              return JSON.stringify(item.link) !== '{}'
            })
        )
        if (
          this.temporaryData.component.data &&
          this.temporaryData.component.data.every(item => {
            console.log(item.link)
            return JSON.stringify(item.link) !== '{}'
          })
        ) {
          this.compDataList = JSON.parse(JSON.stringify(this.temporaryData))
          this.$emit('postModelData', { ...this.compDataList })
          this.isEditImageHotSpotDialogShow = false
        } else {
          this.$message.error('有未选择链接的热点，请选择链接')
        }
      },
      cancel() {
        this.isEditImageHotSpotDialogShow = false
        this.temporaryData = null
        this.temporaryData = JSON.parse(JSON.stringify(this.compDataList))
      },
      closeDialog() {
        this.isEditImageHotSpotShow = false
      },
      openDialog() {
        this.isEditImageHotSpotShow = true
      },
      postData() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet" type="text/scss">
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
      margin: 17px 10px;
    }
  }

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div.tip {
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 12px;
    }

    .upload-image-btn {
      width: 98px;
      height: 26px;
      background: rgba(59, 178, 119, 1);
      border-radius: 13px;
      padding-top: 0;
      padding-bottom: 0;
      color: rgb(255, 255, 255);
    }
  }

  /*.image-placeholder {*/
  /*  height: 340px;*/
  /*  border: 1px dashed rgba(224, 219, 216, 1);*/
  /*  border-radius: 6px;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: center;*/
  /*  .inner-box {*/
  /*    width: 220px;*/
  /*    height: 318px;*/
  /*    background: rgba(249, 247, 243, 1);*/
  /*    border-radius: 6px;*/
  /*    font-weight: 400;*/
  /*    color: rgba(95, 91, 89, 1);*/
  /*    font-size: 14px;*/
  /*    display: flex;*/
  /*    align-items: center;*/
  /*    justify-content: center;*/
  /*  }*/
  /*}*/

  /deep/ .el-dialog__body {
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .spacing-setting-box {
    /deep/ > div.el-form-item__content {
      width: 248px;
    }
  }
</style>
