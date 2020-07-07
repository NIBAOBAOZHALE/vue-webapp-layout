<template>
  <div class="func-form">
    <div class="label">功能导航</div>
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
      <el-form-item label="导航布局" label-width="100px!important">
        <el-radio-group
          @change="handleDirectionChange"
          v-model="compDataList.component.direction"
        >
          <el-radio :label="0">横向</el-radio>
          <el-radio :label="1">纵向</el-radio>
        </el-radio-group>
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
        label="导航样式"
        label-width="100px!important"
        v-if="Number(compDataList.component.direction) === 0"
      >
        <el-radio-group
          @change="handleDirectionChange"
          v-model="compDataList.component.rowStyle"
        >
          <el-radio :label="0">多行展示</el-radio>
          <el-radio :label="1">横向滑动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="单行个数"
        label-width="100px!important"
        v-if="
          Number(compDataList.component.direction) === 0 &&
            Number(compDataList.component.rowStyle) === 0
        "
      >
        <el-select
          @change="postData"
          placeholder="请选择"
          v-model="compDataList.component.numberOfRowItems"
        >
          <el-option
            :key="item"
            :label="item"
            :value="item"
            v-for="item in numberOfRowItemsOptions"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item-->
      <!--        label="是否启用导航图片"-->
      <!--        label-width="100px!important"-->
      <!--        v-if="Number(compDataList.component.direction) === 1"-->
      <!--      >-->
      <!--        <el-radio-group-->
      <!--          v-model="compDataList.component.EnableImg"-->
      <!--          @change="EnableNavigatImg"-->
      <!--        >-->
      <!--          <el-radio :label="true">是</el-radio>-->
      <!--          <el-radio :label="false">否</el-radio>-->
      <!--        </el-radio-group>-->
      <!--      </el-form-item>-->
      <div style="margin-bottom: 30px;"></div>
      <div class="add-item" style="margin-bottom: 20px;">
        <el-button @click="addNavigationItem" size="mini" style="width: 118px;"
          >添加功能导航
        </el-button>
        <div style="font-size: 12px; color: #999999; font-weight: 400;">
          鼠标拖拽调整顺序
        </div>
      </div>
      <div class="items-wrapper">
        <draggable @sort="postData" v-model="compDataList.component.data">
          <template v-for="(item, index) of compDataList.component.data">
            <div :key="index" class="item">
              <div class="title">
                功能导航{{ index + 1 }}
                <img
                  @click="removeNavigationItem(index)"
                  alt=""
                  class="delete-button"
                  src="../assets/images/删除导航.png"
                />
              </div>
              <div class="config">
                <el-form label-position="left" size="mini">
                  <el-form-item label="导航名称">
                    <el-input
                      @change="postData"
                      maxlength="4"
                      placeholder="请输入导航名称，4字以内"
                      size="mini"
                      v-model="item.title"
                      >导航名称
                    </el-input>
                  </el-form-item>
                  <!--                  <el-form-item label="字体颜色">-->
                  <!--                    <el-color-picker-->
                  <!--                      class="color-picker"-->
                  <!--                      v-model="item.fontColor"-->
                  <!--                      @change="postData"-->
                  <!--                    />-->
                  <!--                  </el-form-item>-->
                  <el-form-item label="选择图标">
                    <!--                    <sp-upload-img-->
                    <!--                      width="60px"-->
                    <!--                      :limitNumber="1"-->
                    <!--                      :fileUrl.sync="item.imageUrl"-->
                    <!--                      :value="item.imageUrl"-->
                    <!--                      v-model="item.imageId"-->
                    <!--                      :is-single-image="true"-->
                    <!--                      @update:fileUrl="postData"-->
                    <!--                      @onChange="postData"-->
                    <!--                      v-if="!item.imageUrl"-->
                    <!--                    >-->
                    <!--                    </sp-upload-img>-->
                    <!--                    <div v-else class="image-preview">-->
                    <!--                      <img-->
                    <!--                        style="-->
                    <!--                          width: 62px !important;-->
                    <!--                          height: 62px !important;-->
                    <!--                          position: relative;-->
                    <!--                          border-radius: 4px;-->
                    <!--                          overflow: hidden;-->
                    <!--                        "-->
                    <!--                        :src="item.imageUrl"-->
                    <!--                      />-->
                    <!--                      <img-->
                    <!--                        class="delete-button"-->
                    <!--                        src="../assets/images/删除图标.png"-->
                    <!--                        @click="-->
                    <!--                          compDataList.component.data[index].imageUrl = ''-->
                    <!--                          compDataList.component.data[index].imageId = ''-->
                    <!--                          postData()-->
                    <!--                        "-->
                    <!--                      />-->
                    <!--                    </div>-->
                    <upload-ele
                      @change="postData"
                      v-if="!item.imageUrl"
                      v-model="item.imageUrl"
                    ></upload-ele>
                    <image-viewer
                      :image-url="item.imageUrl"
                      @delete="
                        item.imageUrl = null
                        postData()
                      "
                      v-if="item.imageUrl"
                    >
                    </image-viewer>
                  </el-form-item>
                  <el-form-item label="跳转链接">
                    <el-input clearable v-model="item.link"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </el-form>
  </div>
</template>
<script>
  import UploadEle from '@/template/designPage/weChat/HotSpot/component/UploadEle'

  export default {
    name: 'NavigationForm',
    components: { UploadEle },
    inject: ['pageData'],
    props: {
      compData: {}
    },
    data() {
      return {
        compDataList: {},
        num1: 1,
        num2: 2,
        radio2: 3,
        EnableImg: true,
        numberOfRowItemsOptions: [1, 2, 3, 4, 5],
        selectUrlVisible: false,
        editedNavigationItemIndex: undefined
      }
    },
    created() {
      this.compDataList = Object.assign({}, this.compData)
    },
    active() {
      this.compDataList = Object.assign({}, this.compData)
    },
    methods: {
      addNavigationItem() {
        this.compDataList.component.data.push({
          title: undefined,
          fontColor: '#000000',
          imageUrl: undefined,
          link: undefined
        })
        this.postData()
      },
      removeNavigationItem(index) {
        this.compDataList.component.data.splice(index, 1)
        this.postData()
      },
      receiveLink(res) {
        console.log(res)
        this.compDataList.component.data[
          this.editedNavigationItemIndex
        ].link = this.$lodash.cloneDeep(res)
        // this.currentEditHotSpotObj.link = res
        // this.postHotSpotArr && this.postHotSpotArr(this.objArr)
        this.postData()
      },
      // receiveUploadMessage(data) {
      //   this.compDataList.component.data = data
      //   this.$emit('postModelData', this.compDataList)
      // },
      // receiveMarginTop(value) {
      //   let obj = Object.assign({}, this.compDataList)
      //   obj.component.marginTopData = value
      //   this.$emit('postModelData', obj)
      // },
      // receiveMarginBottom(value) {
      //   console.log(value)
      //   let obj = Object.assign({}, this.compDataList)
      //   obj.component.marginBottom = value
      //   this.$emit('postModelData', obj)
      // },
      // handleChange() {
      //   // this.chioce()
      //   let top = Object.assign({}, this.compDataList)
      //   top.component.marginTopData = this.num1.toString()
      //   this.$emit('postModelData', top)
      //   console.log(this.num1)
      // },
      // handleChanges() {
      //   // this.chioce()
      //   let bottom = Object.assign({}, this.compDataList)
      //   bottom.component.marginBottom = this.num2.toString()
      //   this.$emit('postModelData', bottom)
      // },
      EnableNavigatImg() {
        let openImg = Object.assign({}, this.compDataList)
        // openImg.component.EnableImgs = this.EnableImg;
        this.$emit('postModelData', openImg)
      },
      handleDirectionChange() {
        let ManualSwitch = Object.assign({}, this.compDataList)
        this.$emit('postModelData', ManualSwitch)
        console.log(this.radio2)
      },
      postData() {
        let obj = Object.assign({}, this.compDataList)
        this.$emit('postModelData', obj)
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

    .color-picker {
      /deep/ .el-color-picker__trigger {
        width: 60px;

        .el-color-picker__icon {
          display: none;
        }
      }
    }

    > /deep/ .form,
    .el-form {
      margin: 17px 10px;
    }
  }

  /*.all {*/
  /*  width: 100%;*/
  /*  padding: 0 0 !important;*/
  /*  .navigate {*/
  /*    width: 64px;*/
  /*    height: 15px;*/
  /*    font-size: 16px;*/
  /*    font-weight: 400;*/
  /*    color: rgba(242, 131, 0, 1);*/
  /*    line-height: 12px;*/
  /*    margin: 20px 0 0 10px;*/
  /*  }*/
  /*  .configure {*/
  /*    display: flex;*/
  /*    margin: 20px 0 0 10px;*/
  /*    span:first-child {*/
  /*      display: inline-block;*/
  /*      width: 3px;*/
  /*      height: 16px;*/
  /*      background: rgba(248, 146, 25, 1);*/
  /*      opacity: 0.5;*/
  /*      border-radius: 1px;*/
  /*      margin-left: 0;*/
  /*    }*/
  /*    span {*/
  /*      font-size: 14px;*/
  /*      font-weight: 400;*/
  /*      color: rgba(51, 51, 51, 1);*/
  /*      margin-left: 7px;*/
  /*    }*/
  /*  }*/
  /*  .spacing {*/
  /*    margin: 0 15px;*/
  /*    .top_spacing,*/
  /*    .bottom_spacing {*/
  /*      // width: 258px;*/
  /*      margin: 0 auto;*/
  /*      padding-right: 20px;*/
  /*      box-sizing: border-box;*/
  /*      display: flex;*/
  /*      justify-content: space-between;*/
  /*      align-items: center;*/
  /*      span {*/
  /*        font-size: 14px;*/
  /*        font-weight: 400;*/
  /*        color: rgba(95, 91, 89, 1);*/
  /*      }*/
  /*      /deep/.el-input-number {*/
  /*        width: 130px;*/
  /*        height: 34px;*/
  /*        line-height: 34px;*/
  /*      }*/
  /*      /deep/.el-input {*/
  /*        width: 130px;*/
  /*        height: 34px;*/
  /*        input {*/
  /*          width: 130px;*/
  /*          height: 34px;*/
  /*        }*/
  /*      }*/
  /*      /deep/.el-input-number__decrease,*/
  /*      /deep/.el-input-number__increase {*/
  /*        width: 32px;*/
  /*        height: 32px;*/
  /*        background: rgba(249, 247, 243, 1);*/
  /*      }*/
  /*    }*/
  /*    .bottom_spacing {*/
  /*      margin-top: 10px;*/
  /*    }*/
  /*  }*/
  /*  .layout {*/
  /*    margin: 25px 0 0 20px;*/
  /*    .latout_text {*/
  /*      display: flex;*/
  /*      font-size: 14px;*/
  /*      font-weight: 400;*/
  /*      color: rgba(95, 91, 89, 1);*/
  /*    }*/
  /*    .el-radio-group {*/
  /*      display: flex;*/
  /*      margin-top: 15px;*/
  /*    }*/
  /*  }*/
  /*  .careful {*/
  /*    width: 251px;*/
  /*    font-size: 14px;*/
  /*    font-weight: 400;*/
  /*    color: rgba(153, 153, 153, 1);*/
  /*    line-height: 20px;*/
  /*    margin: 18px 0 0 19px;*/
  /*    text-align: left;*/
  /*  }*/
  /*  .navigateImg {*/
  /*    display: flex;*/
  /*    font-size: 14px;*/
  /*    font-weight: 400;*/
  /*    color: rgba(95, 91, 89, 1);*/
  /*    margin: 24px 0 0 21px;*/
  /*  }*/
  /*  .radioGroup {*/
  /*    .el-radio-group {*/
  /*      display: flex;*/
  /*      margin: 15px 0 0 21px;*/
  /*    }*/
  /*  }*/
  /*}*/

  /deep/ .el-image {
    width: 100px !important;
    height: 100px !important;
  }

  .module {
    margin: 20px;
  }

  .tip {
    color: red;
    font-size: 12px;
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
</style>
