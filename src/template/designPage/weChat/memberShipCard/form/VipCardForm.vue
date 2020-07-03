<template>
  <div class="card_home func-form">
    <div class="label">会员卡</div>
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
          v-model="compDataList.component.logoType"
          @change="postData"
        >
          <el-radio :label="1">商户logo</el-radio>
          <el-radio :label="2">用户头像</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="名称类型"
        label-width="100px!important"
        class="el-radio-group-wrap"
      >
        <el-radio-group
          v-model="compDataList.component.nameType"
          @change="postData"
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
        <upload-ele @editImgUrl="handleUploadImg"> </upload-ele>
        <image-viewer
          :image-url="compDataList.component.coverImgUrl"
          height="100px"
          width="100px"
          @delete="
            compDataList.component.coverImgId = undefined
            compDataList.component.coverImgUrl = undefined
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
          element="div"
          @sort="iconListSort"
          v-model="compDataList.component.infoItems"
        >
          <div
            class="icon-box"
            v-for="(item, index) of compDataList.component.infoItems"
            :key="index"
          >
            <el-checkbox
              @change="chiocePrin"
              :label="item.name"
              :key="index"
              v-model="item.enable"
              :disabled="
                !checkBoxLimit(compDataList.component.infoItems) &&
                  item.enable === true
              "
            ></el-checkbox>
          </div>
        </draggable>
      </el-form-item>
      <el-form-item label="字体颜色" label-width="100px!important"
        ><el-color-picker
          class="color-picker"
          @change="postData"
          v-model="compDataList.component.fontColor"
        ></el-color-picker>
      </el-form-item>
    </el-form>
    <!-- 封面 -->
    <!-- 封面显示比列 -->
    <!--    <div class="Proportion">-->
    <!--      <div class="proportion-type c_prop">显示比例模式：</div>-->
    <!--      <el-radio-group-->
    <!--        class="proportion-type"-->
    <!--        v-model="compDataList.component.customProportion"-->
    <!--      >-->
    <!--        <el-radio :label="false">预设高度</el-radio>-->
    <!--        <el-radio :label="true">自定义高度</el-radio>-->
    <!--      </el-radio-group>-->
    <!--      <div class="c_prop">封面显示比例：</div>-->
    <!--      <div class="radio" v-if="!compDataList.component.customProportion">-->
    <!--        <el-radio-group-->
    <!--          v-model="compDataList.component.proportion"-->
    <!--          @change="handleProportionChange"-->
    <!--        >-->
    <!--          <el-radio :label="50">50%</el-radio>-->
    <!--          <el-radio :label="70">70%</el-radio>-->
    <!--          <el-radio :label="100">100%</el-radio>-->
    <!--        </el-radio-group>-->
    <!--      </div>-->
    <!--      <div class="custom" v-if="compDataList.component.customProportion">-->
    <!--        &lt;!&ndash;        <el-radio v-model="compData.component.proportion" :label="100" >自定义</el-radio>&ndash;&gt;-->
    <!--        <el-input-number-->
    <!--          v-model="compDataList.component.proportion"-->
    <!--          @change="handleChange"-->
    <!--          :min="50"-->
    <!--          :max="100"-->
    <!--          style="width: 100%;"-->
    <!--          v-if="compDataList.component.proportion"-->
    <!--        ></el-input-number>-->
    <!--        <span v-if="compDataList.component.proportion" class="Percent">%</span>-->
    <!--      </div>-->
    <!--      <div class="careful">注意：自定义数值请控制在50%-100%之间</div>-->
    <!--    </div>-->
    <!-- 会员卡标题 -->
    <!--    <div class="title">-->
    <!--      <div class="card">会员卡标题:</div>-->
    <!--      <div style="display: flex; margin-left: 20px; flex-wrap: wrap;">-->
    <!--        <el-radio-group-->
    <!--          v-model="compDataList.component.memberShipTitle"-->
    <!--          @change="memberShipTitleChange"-->
    <!--        >-->
    <!--          <el-radio :label="0">自定义名称</el-radio>-->
    <!--          <el-radio :label="1">会员等级</el-radio>-->
    <!--        </el-radio-group>-->
    <!--        <el-input-->
    <!--          style="margin-top: 15px;"-->
    <!--          v-if="compDataList.component.memberShipTitle == 0"-->
    <!--          placeholder="请输入标题"-->
    <!--          maxlength="10"-->
    <!--          v-model="compDataList.component.memberShipTitleText"-->
    <!--          @change="memberShipTitleTextChange"-->
    <!--        ></el-input>-->
    <!--      </div>-->
    <!--    </div>-->
    <!-- 会员条码 -->
    <!--    <div class="member">-->
    <!--      <div class="open_member">是否展示会员条码:</div>-->
    <!--      <div style="display: flex;">-->
    <!--        <el-radio-group-->
    <!--          v-model="compDataList.component.barCode"-->
    <!--          @change="barCodeChange"-->
    <!--        >-->
    <!--          <el-radio label="1">展示</el-radio>-->
    <!--          <el-radio label="0">隐藏</el-radio>-->
    <!--        </el-radio-group>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="member">-->
    <!--      <div class="open_member">是否展示会员卡号:</div>-->
    <!--      <div style="display: flex;">-->
    <!--        <el-radio-group-->
    <!--          v-model="compDataList.component.showCardNumber"-->
    <!--          @change="barCodeChange"-->
    <!--        >-->
    <!--          <el-radio :label="true">展示</el-radio>-->
    <!--          <el-radio :label="false">隐藏</el-radio>-->
    <!--        </el-radio-group>-->
    <!--      </div>-->
    <!--    </div>-->
    <!-- 是否开启印花logo -->
    <!--    <div class="printing">-->
    <!--      <div class="open_printing">-->
    <!--        印花：-->
    <!--        <span>（印花最少开启两项）</span>-->
    <!--      </div>-->
    <!--      <div class="choice_prin">-->
    <!--        <draggable-->
    <!--          element="div"-->
    <!--          @sort="iconListSort"-->
    <!--          v-model="compDataList.component.whetherToOpen"-->
    <!--        >-->
    <!--          <div-->
    <!--            class="icon-box"-->
    <!--            v-for="(item, index) of compDataList.component.whetherToOpen"-->
    <!--            :key="index"-->
    <!--          >-->
    <!--            <el-checkbox-->
    <!--              @change="chiocePrin"-->
    <!--              :label="item.name"-->
    <!--              :key="index"-->
    <!--              v-model="item.enable"-->
    <!--              :disabled="-->
    <!--                !$lodash.every(compDataList.component.whetherToOpen, [-->
    <!--                  'enable',-->
    <!--                  true-->
    <!--                ]) && item.enable === true-->
    <!--              "-->
    <!--            ></el-checkbox>-->
    <!--            <el-upload-->
    <!--              class="avatar-uploader"-->
    <!--              action="https://jsonplaceholder.typicode.com/posts/"-->
    <!--              :show-file-list="false"-->
    <!--              :http-request="uploadIconImg(index)"-->
    <!--            >-->
    <!--              <div class="image-box">-->
    <!--                <img-->
    <!--                  style="height: 30px;"-->
    <!--                  v-if="item.imageUrl"-->
    <!--                  :src="imageBaseUrl + item.imageUrl"-->
    <!--                  class="avatar"-->
    <!--                />-->
    <!--                <i-->
    <!--                  class="el-icon-circle-close"-->
    <!--                  @click.stop="removeIconImage(index)"-->
    <!--                  v-if="item.imageUrl"-->
    <!--                ></i>-->
    <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
    <!--              </div>-->
    <!--            </el-upload>-->
    <!--          </div>-->
    <!--        </draggable>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="module">-->
    <!--      <div class="title">字体颜色:</div>-->
    <!--      <el-color-picker-->
    <!--        style="margin-top: 20px;"-->
    <!--        @change="iconColorChange"-->
    <!--        v-model="compDataList.component.iconColor"-->
    <!--      ></el-color-picker>-->
    <!--    </div>-->
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
