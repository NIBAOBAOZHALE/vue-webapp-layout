<template>
  <div class="card_home func-form">
    <div class="label">会员卡</div>
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
      <el-form-item label="封面圆角" label-width="100px!important">
        <el-radio-group
          @change="postData"
          v-model="compDataList.component.borderRadius"
        >
          <el-radio :label="false">直角</el-radio>
          <el-radio :label="true">圆角</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="logo类型" label-width="100px!important">
        <el-radio-group
          @change="postData"
          v-model="compDataList.component.logoType"
        >
          <el-radio :label="1">商户logo</el-radio>
          <el-radio :label="2">用户头像</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        class="el-radio-group-wrap"
        label="名称类型"
        label-width="100px!important"
      >
        <el-radio-group
          @change="postData"
          v-model="compDataList.component.nameType"
        >
          <el-radio :label="1">商户名称</el-radio>
          <el-radio :label="2">用户昵称</el-radio>
          <el-radio :label="3">手机号码</el-radio>
          <el-radio :label="4">会员卡号</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择封面" label-width="100px!important">
        <!--        <sp-upload-img-->
        <!--          :limitNumber="1"-->
        <!--          width="100px"-->
        <!--          v-model="compDataList.component.coverImgId"-->
        <!--          :fileUrl.sync="compDataList.component.coverImgUrl"-->
        <!--          :value="compDataList.component.coverImgId"-->
        <!--          @onChange="postData"-->
        <!--          :limitSize="1000"-->
        <!--          v-if="!compDataList.component.coverImgUrl"-->
        <!--        >-->
        <!--        </sp-upload-img>-->
        <upload-ele
          @editImgUrl="handleUploadImg"
          v-if="!compDataList.component.coverImgUrl"
        >
        </upload-ele>
        <image-viewer
          :image-url="compDataList.component.coverImgUrl"
          @delete="
            compDataList.component.coverImgId = undefined
            compDataList.component.coverImgUrl = undefined
            postData()
          "
          height="100px"
          v-if="compDataList.component.coverImgUrl"
          width="100px"
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
          >支持格式jpg、png的图片，1M以内，建议 尺寸1000*600</span
        >
      </el-form-item>
      <el-form-item label="信息类目" label-width="100px!important">
        <span
          style="
            display: block;
            width: 242px;
            font-size: 12px;
            color: #999999;
            line-height: 28px;
          "
          >信息类目至少开启两项,拖拽可移动位置</span
        >
        <draggable
          @sort="iconListSort"
          element="div"
          v-model="compDataList.component.infoItems"
        >
          <div
            :key="index"
            class="icon-box"
            v-for="(item, index) of compDataList.component.infoItems"
          >
            <el-checkbox
              :disabled="
                !checkBoxLimit(compDataList.component.infoItems) &&
                  item.enable === true
              "
              :key="index"
              :label="item.name"
              @change="chiocePrin"
              v-model="item.enable"
            ></el-checkbox>
          </div>
        </draggable>
      </el-form-item>
      <el-form-item label="字体颜色" label-width="100px!important">
        <el-color-picker
          @change="postData"
          class="color-picker"
          v-model="compDataList.component.fontColor"
        ></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { uploadImage } from '@/api/wxApi/upload'
  import draggable from 'vuedraggable'
  import imageViewer from '@/components/public/imageViewer/imageViewer'
  import UploadEle from '@/components/public/UploadEle'

  export default {
    name: 'VipCardForm',
    components: {
      draggable,
      imageViewer,
      UploadEle
    },
    props: {
      compData: {}
    },
    data() {
      return {
        compDataList: {},
        input1: '',
        input2: '',
        memberShipTitle: '0',
        prop: '100',
        imageUrl: '',
        cardUrl: ''
      }
    },

    created() {
      this.compDataList = Object.assign({}, this.compData)
      console.log(this.compDataList)
    },
    computed: {
      checkBoxLimit() {
        return function(options) {
          let count = 0
          options &&
            options.map(item => {
              if (Boolean(item.enable) === true) {
                count += 1
              }
            })
          return count > 2
        }
      }
    },
    methods: {
      iconListSort() {
        console.log('图标重排')
        this.$emit('postModelData', { ...this.compDataList })
      },
      // handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(URL.createObjectURL(file.raw))
      // },
      iconColorChange() {
        this.$emit('postModelData', { ...this.compDataList })
      },
      removeIconImage(index) {
        this.compDataList.component.infoItems[index]['imageUrl'] = ''
        this.$emit('postModelData', { ...this.compDataList })
      },
      barCodeChange(val) {
        console.log(val)
        this.$emit('postModelData', { ...this.compDataList })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 png 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      // chioceClose () {
      //  console.log(this.radio3)
      // },
      blur() {
        let main = Object.assign({}, this.compDataList)
        this.$emit('postModelData', main)
      },
      cardSuccess(res, file) {
        this.compDataList.component.bannerData = URL.createObjectURL(file.raw)
        this.$emit('postModelData', { ...this.compDataList })
        this.cardUrl = URL.createObjectURL(file.raw)
        // let inputdata = Object.assign({}, this.compDataList);
        // inputdata.component.inputdata = inputData;
        // this.$emit("postModelData", inputdata);
      },
      chiocePrin() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      },
      coverDisplay() {
        let showProps = Object.assign({}, this.compDataList)
        showProps.component.proportion = this.prop
        this.$emit('postModelData', showProps)
      },
      // 上传商户logo
      handleAvatarSuccess(res, file) {
        console.log(URL.createObjectURL(file.raw))
        this.imageUrl = URL.createObjectURL(file.raw)
        this.compDataList.component.data = URL.createObjectURL(file.raw)
        this.$emit('postModelData', this.compDataList)
        // let inputdata = Object.assign({}, this.compDataList);
        // inputdata.component.inputdata = inputData;
        // this.$emit("postModelData", inputdata);
      },
      // eslint-disable-next-line no-unused-vars
      handleChange(value) {
        // this.chioce()
        // let proportion = Object.assign({}, this.compDataList);
        // proportion.component.proportion = this.input2.toString();
        // this.$emit("postModelData", proportion);
      },
      // receive(data, inputData) {
      //   this.compDataList.component.bannerData = data;
      //   this.$emit("postModelData", this.compDataList);
      //   let inputdata = Object.assign({}, this.compDataList);
      //   inputdata.component.inputdata = inputData;
      //   this.$emit("postModelData", inputdata);
      // },
      handleProportionChange(value) {
        console.log(value)
        this.compDataList.component.proportion = value
        this.compDataList.component.customProportion = false
        this.$emit('postModelData', { ...this.compDataList })
      },
      memberShipTitleChange(val) {
        console.log(val)
        this.$emit('postModelData', { ...this.compDataList })
      },
      memberShipTitleTextChange(text) {
        console.log(text)
        this.$emit('postModelData', { ...this.compDataList })
      },
      receiveMarginBottom(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.marginBottom = value
        this.$emit('postModelData', obj)
      },
      receiveMarginTop(value) {
        let obj = Object.assign({}, this.compDataList)
        obj.component.marginTopData = value
        this.$emit('postModelData', obj)
      },
      uploadCoverImg(content) {
        const formData = new FormData()
        formData.append('uploadFile', content.file)
        uploadImage(formData)
          .then(res => {
            console.log(res.data.url)
            // this.uploadSuccess(res.data.url);
            // if (this.uploadSuccessCallBack) {
            //   this.uploadSuccessCallBack(res);
            // }
            console.log(this.compDataList)
            this.compDataList.component.coverImgUrl = res.data.url
            this.$emit('postModelData', this.compDataList)
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: err.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
      },
      uploadImg(content) {
        const formData = new FormData()
        formData.append('uploadFile', content.file)
        uploadImage(formData)
          .then(res => {
            console.log(res.data.url)
            // this.uploadSuccess(res.data.url);
            // if (this.uploadSuccessCallBack) {
            //   this.uploadSuccessCallBack(res);
            // }
            this.compDataList.component.avatarImgUrl = res.data.url
            this.$emit('postModelData', this.compDataList)
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: err.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
      },
      uploadIconImg(index) {
        return function(content) {
          const formData = new FormData()
          formData.append('uploadFile', content.file)
          uploadImage(formData)
            .then(res => {
              console.log(res.data.url)
              // this.uploadSuccess(res.data.url);
              // if (this.uploadSuccessCallBack) {
              //   this.uploadSuccessCallBack(res);
              // }
              this.compDataList.component.infoItems[index]['imageUrl'] =
                res.data.url
              this.$emit('postModelData', this.compDataList)
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: err.message,
                type: 'error',
                duration: 5 * 1000
              })
            })
        }.bind(this)
      },
      postData() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
      },
      handleUploadImg(imgUrl) {
        this.compDataList.component.coverImgUrl = imgUrl
        this.postData()
      }
    },
    active() {
      this.compDataList = Object.assign({}, this.compData)
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .func-form {
    padding: 20px 21px 0 21px;
    box-sizing: border-box;

    > .label {
      width: 70px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }

    /deep/ .form,
    .el-form {
      margin: 17px 10px;
    }

    .color-picker {
      /deep/ .el-color-picker__trigger {
        width: 60px;

        .el-color-picker__icon {
          display: none;
        }
      }
    }
  }

  .spacing-setting-box {
    /deep/ > div.el-form-item__content {
      width: 248px;
    }
  }

  .el-radio-group-wrap {
    /deep/ > label.el-form-item__label {
      line-height: 0;
    }

    /deep/ > div.el-form-item__content {
      width: 248px;

      .el-radio-group {
        box-sizing: border-box;
      }

      label.el-radio {
        margin-bottom: 20px;
      }
    }
  }
</style>
