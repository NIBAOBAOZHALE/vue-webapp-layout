<template>
  <div class="carousel-form">
    <div class="label">轮播图</div>
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
      <el-form-item label="轮播间隔" label-width="100px!important">
        <el-input-number
          class="el-input-text-align-left"
          :max="30"
          :min="0.01"
          v-model="compDataList.component.interval"
          @change="postData"
          :precision="2"
          placeholder="请输入轮播间隔，单位秒"
          :controls="false"
          style="width: 248px; text-align: left;"
        ></el-input-number>
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
      <el-form-item label="轮播图高度" label-width="100px!important">
        <el-input-number
          :max="700"
          :min="0"
          v-model="compDataList.component.height"
          @change="postData"
          placeholder="请输入轮播间隔，单位秒"
          style="width: 106px;"
        ></el-input-number>
      </el-form-item>
      <div style="margin-bottom: 30px;"></div>
      <div class="add-item" style="margin-bottom: 20px;">
        <el-button
          size="mini"
          @click="addCarouselItem"
          :disabled="compDataList.component.data.length >= 10"
          >添加图片</el-button
        >
        <div style="font-size: 12px; color: #999999; font-weight: 400;">
          鼠标拖拽调整顺序，最多10个
        </div>
      </div>
      <div class="items-wrapper">
        <draggable v-model="compDataList.component.data" @sort="postData">
          <template v-for="(item, index) of compDataList.component.data">
            <div class="item" :key="index">
              <div class="title">
                图片{{ index + 1 }}
                <img
                  class="delete-button"
                  src="../assets/images/删除导航.png"
                  alt=""
                  @click="removeCarouselItem(index)"
                />
              </div>
              <div class="config">
                <el-form label-position="left" size="mini">
                  <el-form-item class="upload-image" label="选择图片">
                    <sp-upload-img
                      width="60px"
                      :limitNumber="1"
                      :fileUrl.sync="item.imageUrl"
                      :value="item.imageUrl"
                      v-model="item.imageId"
                      :is-single-image="true"
                      @update:fileUrl="postData"
                      @onChange="postData"
                      v-if="!item.imageUrl"
                      :limit-size="2048"
                    >
                    </sp-upload-img>
                    <span
                      data-v-6a4e73e7=""
                      style="
                        display: block;
                        font-size: 12px;
                        color: rgb(153, 153, 153);
                        line-height: 18px;
                        padding-top: 13px;
                      "
                      v-if="!item.imageUrl"
                      >支持格式jpg、png的图片，2M以内，建议宽度640px或750px</span
                    >
                    <div
                      v-else
                      class="image-preview"
                      style="width: min-content;"
                    >
                      <div>
                        <img
                          style="
                            width: 62px !important;
                            height: 62px !important;
                            position: relative;
                            border-radius: 4px;
                            overflow: hidden;
                          "
                          :src="item.imageUrl"
                        />
                        <img
                          class="delete-button"
                          src="../assets/images/删除图标.png"
                          @click="
                            compDataList.component.data[index].imageUrl = ''
                            compDataList.component.data[index].imageId = ''
                            postData()
                          "
                        />
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="跳转链接">
                    <div class="link">
                      <div
                        class="name"
                        v-if="
                          (item.link && item.link.name) ||
                            (item.link && item.link.url)
                        "
                        :style="{
                          marginRight: item.link && item.link.name ? '10px' : ''
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
                          src="../assets/images/删除图标.png"
                          alt=""
                          @click="
                            item.link = null
                            postData()
                          "
                        />
                        {{
                          (item.link && item.link.name && item.link.name) ||
                            item.link.url
                        }}
                      </div>
                      <el-button
                        v-if="!item.link"
                        size="mini"
                        @click="
                          selectUrlVisible = true
                          editedNavigationItemIndex = index
                        "
                        style="width: 100px;"
                        >选择</el-button
                      >
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </el-form>
    <!--    <div class="img_list">图片列表：<span>（最多支持6张Banner图）</span></div>-->
    <!--    <div class="module">-->
    <!--      <span class="tip">如不配置链接，对应页面将无法在前端展示！</span>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;    <upload-img&ndash;&gt;-->
    <!--    &lt;!&ndash;      :array="compDataList.component.data"&ndash;&gt;-->
    <!--    &lt;!&ndash;      @postMessage="receiveUploadMessage"&ndash;&gt;-->
    <!--    &lt;!&ndash;      v-if="compDataList"&ndash;&gt;-->
    <!--    &lt;!&ndash;      :tip="'注意：上传的banner图大小或比例需一致'"&ndash;&gt;-->
    <!--    &lt;!&ndash;    ></upload-img>&ndash;&gt;-->
    <!--    <img-upload-with-prod-selector-->
    <!--      :array="compDataList.component.data"-->
    <!--      @postMessage="receiveUploadMessage"-->
    <!--      v-if="compDataList"-->
    <!--      :tip="'注意：上传的banner图大小或比例需一致'"-->
    <!--    >-->
    <!--    </img-upload-with-prod-selector>-->
  </div>
</template>

<script>
  export default {
    name: 'CarouselForm',
    inject: ['pageData'],
    props: {
      compData: Object
    },
    data() {
      return {
        compDataList: {},
        num1: 1,
        num2: 1,
        num3: 1,
        radio2: 3,
        customShow: false,
        selectUrlVisible: false
      }
    },
    // watch:{
    //     compData(){
    //         this.compDataList = Object.assign({},this.compData)
    //     }
    // },
    created() {
      this.compDataList = Object.assign({}, this.compData)
    },
    activated() {
      this.compDataList = Object.assign({}, this.compData)
    },
    methods: {
      receiveUploadMessage(data) {
        window.console.error(data)
        console.log(5)
        this.compDataList.component.data = data
        this.$emit('postModelData', this.compDataList)
      },
      handleMarginTopChange(value) {
        let top = Object.assign({}, this.compDataList)
        top.component.marginTopData = value
        this.$emit('postModelData', top)
        console.log(this.num1)
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
      addCarouselItem() {
        this.compDataList.component.data.push({
          imageUrl: null,
          imageId: null,
          link: null
        })
        this.postData()
      },
      removeCarouselItem(index) {
        this.compDataList.component.data.splice(index, 1)
        this.postData()
      },
      receiveLink(res) {
        console.log(res)
        this.compDataList.component.data[
          this.editedNavigationItemIndex
        ].link = res
        // this.currentEditHotSpotObj.link = res
        this.postData()
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .carousel-form {
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
    .items-wrapper {
      > div > .item {
        border: 1px solid rgba(220, 220, 220, 1);
        box-sizing: border-box;
        border-radius: 2px;
        margin-bottom: 20px;
        .title {
          height: 30px;
          background: rgba(246, 246, 246, 1);
          font-size: 14px;
          font-weight: bold;
          color: rgba(32, 32, 32, 1);
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding-left: 21px;
          position: relative;
          img.delete-button {
            width: 15px;
            height: 15px;
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
          }
        }
        .config {
          padding: 4px 11px 4px 11px;
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
        }
      }
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
    .spacing-setting-box {
      /deep/ > div.el-form-item__content {
        width: 248px;
      }
    }
    .el-input-text-align-left {
      /deep/ .el-input {
        > input {
          text-align: left;
        }
      }
    }
    .items-wrapper {
      .el-form {
        /deep/ .el-form-item__content {
          /*width: 204px;*/
        }
        .upload-image.el-form-item.el-form-item--mini {
          display: flex;
          /deep/ label.el-form-item__label {
            flex-shrink: 0;
            width: 100px;
          }
        }
      }
    }
  }
</style>
