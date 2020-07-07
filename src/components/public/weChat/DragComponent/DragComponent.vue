<template>
  <div>
    <div class="top-tools-box">
      <!-- 基础模板 -->
      <div class="info-box-left" v-if="obj.Basics">
        <div class="current-version">当前版本：v1.0.1</div>
        <div class="newest-version">最新版本：v1.0.2</div>
        <div class="state">
          <span class="point"></span>状态：审核失败
          <img alt src="../../../../assets/img/jg.png" />
        </div>
      </div>
      <!--      <div class="chioce_mb" v-if="obj.homepage || obj.custom">选择模板</div>-->
      <template-selector
        class="chioce_mb"
        v-if="obj.homepage || obj.custom"
      ></template-selector>
      <!-- 会员主页 -->
      <!-- <div></div> -->
      <div class="handle-box-right">
        <template v-for="(item, index) of obj.toolsBox">
          <div :key="index" class="save" v-show="item === 'save'">保存</div>
          <div :key="index" class="warning" v-show="item === 'publish'">
            发布
          </div>
          <div :key="index" class="primary" v-show="item === 'preview'">
            预览
          </div>
          <div :key="index" class="blue" v-show="item === 'addTemplate'">
            新增模板
          </div>
          <div :key="index" class="primary" v-show="item === 'previewCode'">
            正式预览码
          </div>
        </template>
      </div>
    </div>
    <div class="container">
      <div class="component-group">
        <el-scrollbar
          class="default-scrollbar"
          view-class="default-scrollbar__view"
          wrap-class="default-scrollbar__wrap"
        >
          <el-menu v-if="obj.homepage || obj.custom">
            <el-submenu index="2">
              <template slot="title">
                <i class="iconfont" style="position: static;">&#xe685;</i>
                <span>基础模块</span>
              </template>

              <el-menu-item-group>
                <draggable
                  :clone="cloneComponent"
                  :group="{ name: 'drag', pull: 'clone', put: false }"
                  :sort="false"
                  element="div"
                  v-model="componentsList"
                >
                  <template v-for="(item, index) in componentsList">
                    <el-menu-item
                      :id="index"
                      :key="index"
                      class="component-container"
                      v-if="
                        item.component.type === '标题' ||
                          item.component.type === 'banner' ||
                          item.component.type === '图片广告' ||
                          item.component.type === '功能导航' ||
                          item.component.type === '图片热点' ||
                          item.component.type === '关注公众号' ||
                          (item.component.type === '会员卡' && obj.custom)
                      "
                    >
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/biaoti.png"-->
                      <!--                        v-if="item.component.type === '标题'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/banner.png"-->
                      <!--                        v-else-if="item.component.type === 'banner'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/gongnengdaohang.png"-->
                      <!--                        v-else-if="item.component.type === '功能导航'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/tupianguanggao.png"-->
                      <!--                        v-else-if="item.component.type === '图片广告'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/requhuizhi.png"-->
                      <!--                        v-else-if="item.component.type === '图片热点'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/weixin.png"-->
                      <!--                        v-else-if="item.component.type === '关注公众号'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/huiyunaka.png"-->
                      <!--                        v-else-if="-->
                      <!--                          item.component.type === '会员卡' && obj.custom-->
                      <!--                        "-->
                      <!--                      />-->
                      <span>{{ item.component.type }}</span>
                    </el-menu-item>
                  </template>
                </draggable>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <el-menu v-if="obj.homepage || obj.custom">
            <!-- <el-menu-item index="1">
                                                                <template slot="title">
                                                                    <span>基础组件</span>
                                                                </template>
                        </el-menu-item>-->
            <el-submenu index="3">
              <template slot="title">
                <!-- <img src="../assets/img/jg.png" alt /> -->
                <i class="iconfont" style="position: static;">&#xe72e;</i>
                <span>营销</span>
              </template>
              <el-menu-item-group>
                <draggable
                  :clone="cloneComponent"
                  :group="{ name: 'drag', pull: 'clone', put: false }"
                  :sort="false"
                  element="div"
                  v-model="componentsList"
                >
                  <template v-for="(item, index) in componentsList">
                    <el-menu-item
                      :id="index"
                      :key="index"
                      v-if="
                        item.component.type === '领券中心' ||
                          item.component.type === '电子券秒杀' ||
                          item.component.type === '电子券拼团' ||
                          item.component.type === '积分商城'
                      "
                    >
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/biaoti.png"-->
                      <!--                        v-if="item.component.type === '领券中心'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/banner.png"-->
                      <!--                        v-else-if="item.component.type === '电子券秒杀'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/pintuan.png"-->
                      <!--                        v-else-if="item.component.type === '电子券拼团'"-->
                      <!--                      />-->
                      <!--                      <img-->
                      <!--                        alt-->
                      <!--                        src="../../../../assets/img/jifenshangcheng.png"-->
                      <!--                        v-else-if="item.component.type === '积分商城'"-->
                      <!--                      />-->

                      <span>{{ item.component.type }}</span>
                    </el-menu-item>
                  </template>
                </draggable>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <!-- 基础配置 -->
          <!-- <div class="main" v-if="obj.Basics">
                      <div class="theme">主题色</div>
                      <div class="Recommend">推荐背景色</div>
                      <div class="color">
                        <div
                          :key="index"
                          :style="{ background: item.background }"
                          style="width:70px;height:24px;"
                          v-for="(item, index) in themeColor"
                        ></div>
                    </div>-->
          <!-- 自定义背景色 -->
          <!-- <div class="block">
                        <span class="demonstration">自定义背景色:</span>
                        <el-color-picker v-model="color1"></el-color-picker>
                    </div>-->
          <!-- 推荐字体色 -->
          <!-- <div class="recorde">推荐字体色:</div>
                      <div class="bg">
                        <div class="white">
                          <img alt src="../../assets/img/xuzho.png" />
                        </div>
                        <div class="black">
                          <img alt src="../../assets/img/xuzho.png" />
                        </div>
                      </div>
                    </div>-->
        </el-scrollbar>
      </div>

      <div class="shop-container">
        <div class="switch-order-box">
          <el-radio-group v-model="switchOrderRadio">
            <el-radio-button
              @click.native="switchOrder = false"
              label="布局"
            ></el-radio-button>
            <el-radio-button
              @click.native="switchOrder = true"
              label="排序"
            ></el-radio-button>
          </el-radio-group>
        </div>
        <el-scrollbar
          class="default-scrollbar"
          style="padding-top: 40px; box-sizing: border-box;"
          view-class="default-scrollbar__view"
          wrap-class="default-scrollbar__wrap"
        >
          <!-- 基础配置tab -->
          <div class="procedures" v-if="obj.Basics">
            <div
              :style="{ background: baseConfigFormData.NavigatorBackground }"
              class="title"
            >
              <div
                :style="{
                  color:
                    baseConfigFormData.NavigatorTitleColor === 3
                      ? 'white'
                      : 'black'
                }"
                class="text"
              >
                小程序标题
              </div>
            </div>
            <div class="procedures_main">
              <div class="main">
                <div class="main_t">
                  页面标题和此区域在
                  <span>“会员 主页”</span>和 <span>“自定义页”</span>编辑
                </div>
              </div>
            </div>
            <div class="tab" v-if="baseConfigFormData.enableMenu == true"></div>
          </div>
          <div class="list-group">
            <draggable
              :class="switchOrder ? 'switch-order' : ''"
              class="component-container"
              element="div"
              group="drag"
              v-model="pageConfigObj.webLayout"
              v-show="switchOrder"
            >
              <!--                            <div v-if="!switchOrder" :id="item.id" v-for="(item,index) in pageConfigObj.webLayout"-->
              <!--                                 @mouseenter.stop.capture="()=>{return false}" class="component-with-mask">-->
              <!--                                <span class="border" :class="{'show-border':activeId === item.id}"></span>-->
              <!--                                <div class="mask" >-->
              <!--                                    <span class="tip" @click="handleClick(item.id)" >修改</span>-->
              <!--                                    <span class="delete" @click.stop.capture="deleteComponent(item.id)" v-bind:class="{active:activeId == item.id}">+</span>-->
              <!--                                </div>-->
              <!--                                <component :is="item.comp" :key="item.id" style="cursor: move" :data="item.data"-->
              <!--                                           :ref="item.comp" class="component-class"></component>-->
              <!--                            </div>-->
              <div
                :id="item.id"
                :key="index"
                @mouseenter.stop.capture="
                  () => {
                    return false
                  }
                "
                class="component-with-mask order"
                style="height: 40px; margin-bottom: 5px;"
                v-for="(item, index) in pageConfigObj.webLayout"
              >
                <span class="border show-border"></span>
                <div class="order-mask">
                  <!--                                    <span class="tip" @click="handleClick(item.id)" >修改</span>-->
                  <span>{{ item.compName }}</span>
                  <span
                    @click.stop.capture="deleteComponent(item.id)"
                    class="delete"
                    >+</span
                  >
                </div>
                <!--                                <component :is="item.comp" :key="item.id" style="cursor: move" :data="item.data"-->
                <!--                                           :ref="item.comp" class="component-class"></component>-->
              </div>
            </draggable>
            <draggable
              :class="switchOrder ? 'switch-order' : ''"
              class="component-container"
              element="div"
              filter=".not-dragging "
              group="drag"
              v-model="pageConfigObj.webLayout"
              v-show="!switchOrder"
            >
              <template v-for="(item, index) in pageConfigObj.webLayout">
                <div
                  :class="item.drag"
                  :id="item.id"
                  :key="index"
                  :slot="item.slot"
                  :style="[
                    { marginTop: item.component.marginTopData + 'px' },
                    { marginBottom: item.component.marginBottom + 'px' },
                    { marginLeft: item.component.marginLeft + 'px' },
                    { marginRight: item.component.marginRight + 'px' }
                  ]"
                  @mouseenter.stop.capture="
                    () => {
                      return false
                    }
                  "
                  class="component-with-mask"
                  v-if="!switchOrder"
                >
                  <span
                    :class="{ 'show-border': activeId === item.id }"
                    class="border"
                  ></span>

                  <div @click="toLink(item.component.link)" class="mask">
                    <span @click="handleClick(item.id)" class="tip">修改</span>
                    <span
                      @click.stop.capture="deleteComponent(item.id)"
                      class="delete"
                      v-bind:class="{ active: activeId == item.id }"
                      >+</span
                    >
                  </div>

                  <div class="component-class">
                    <component
                      :dataObj="item"
                      :is="item.comp"
                      :key="item.id"
                      :ref="item.comp"
                      style="cursor: move;"
                    ></component>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </el-scrollbar>
      </div>
      <div class="editor">
        <!-- 基础配置 -->
        <div v-if="obj.Basics">
          <div class="navigat">基础配置</div>
          <div class="configure">
            <span></span>
            <span>导航栏</span>
          </div>
          <!-- 自定义背景色 -->
          <div class="block">
            <span class="demonstration">导航栏背景色:</span>
            <el-color-picker
              @change="choiceBackgColor"
              v-model="baseConfigFormData.NavigatorBackground"
            ></el-color-picker>
          </div>
          <div class="block_model">
            <div class="mode">导航栏标题颜色:</div>
            <el-radio-group
              @change="chioceTitleColor"
              v-model="baseConfigFormData.NavigatorTitleColor"
            >
              <el-radio :label="3">白色</el-radio>
              <el-radio :label="6">黑色</el-radio>
            </el-radio-group>
          </div>
          <div class="configure">
            <span></span>
            <span>菜单栏</span>
          </div>
          <div class="block_model" style="border: none;">
            <div class="mode">是否启用菜单栏:</div>
            <el-radio-group v-model="baseConfigFormData.enableMenu">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
        </div>

        <!-- v-if="isEditFormShow" -->
        <component
          :compData="model"
          :is="model.form"
          :key="model.id"
          @postModelData="receiveModelData"
          v-else-if="!pageSetting"
        ></component>
        <!-- style="box-sizing: border-box;padding:20px 10px" -->
        <!-- 右边的默认配置 -->
        <div class="right page-setting" v-else-if="pageSetting">
          <div class="pageEdi">页面设置</div>
          <div class="title">标题</div>
          <el-input
            clearable
            placeholder="请输入标题"
            v-model="pageSettingFormData.pageTitle"
          ></el-input>
          <div class="blocks">
            <span class="back">页面背景色:</span>
            <el-color-picker
              v-model="pageSettingFormData.background"
            ></el-color-picker>
          </div>
          <div class="share">分享标题</div>
          <el-input
            clearable
            placeholder="请输入分享标题"
            v-model="pageSettingFormData.shareTitle"
          ></el-input>
          <div class="shareImg">分享图片:</div>
          <upload-img
            :array="pageSettingFormData.shareImageUrl"
            :item-limit="1"
            :upload-success-call-back="receivePageSettingShareImageUrl"
            @postMessage="handleRemovePageSettingShareImageUrl"
          ></upload-img>
        </div>
        <!-- <el-button @click="submit">提交修改</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import Title_form from '../../../../template/designPage/weChat/title/form/titleForm'
  import Title from '../../../../template/designPage/weChat/title/component/title'
  import { weChatMiniDesignPage } from '@/utils/dataStructure'
  import { findMaxItem } from '@/utils/tools'
  import {
    Carousel,
    CarouselForm,
    ETicketCenter,
    ETicketCenterForm,
    ETicketSnapUp,
    ETicketSnapUpForm,
    HotSpot,
    HotSpotForm,
    ImageComp,
    VipCard,
    VipCardForm,
    Navigation,
    NavigationForm,
    officialAccounts,
    officialAccountsForm,
    PictureAds,
    PictureAdsForm,
    PointsMall,
    PointsMallForm,
    purchaseETicketByBulkPurchase,
    purchaseETicketByBulkPurchaseForm,
    TemplateSelector,
    RichText,
    RichTextForm
  } from '@/template/designPage/weChat'

  import data from '@/components/public/DragComponent/componentsList'

  export default {
    name: 'DragComponent',
    props: {
      obj: Object,
      compData: {}
    },
    components: {
      TemplateSelector,
      draggable,
      Title_form,
      Title,
      ImageComp,
      PictureAds,
      PictureAdsForm,
      NavigationForm,
      Navigation,
      officialAccounts,
      officialAccountsForm,
      purchaseETicketByBulkPurchase,
      purchaseETicketByBulkPurchaseForm,
      Carousel,
      CarouselForm,
      ETicketCenter,
      ETicketCenterForm,
      VipCard,
      VipCardForm,
      PointsMallForm,
      PointsMall,
      ETicketSnapUp,
      ETicketSnapUpForm,
      HotSpot,
      HotSpotForm,
      RichText,
      RichTextForm
    },
    data() {
      return {
        radio2: 3,
        radio3: 1,
        navigationBac: '#DDDADB', // 导航栏背景色
        compDataList: {},
        pageSetting: true,
        switchOrder: false,
        themeColor: [
          { background: '#F28300' },
          { background: '#FD5850' },
          { background: '#C79C6F' },
          { background: '#E94775' },
          { background: '#8DA5C4' },
          { background: '#2EBFAC' },
          { background: '#69BC56' },
          { background: '#3DA7EA' }
        ],
        color1: '#DDDADB',
        layoutDataList: [],
        input10: '',
        input3: '',
        componentsList: data,
        editForm: null,
        isEditFormShow: false,
        editFormId: null,
        model: {},
        datas: {},
        activeId: '',
        switchOrderRadio: false,
        pageSettingFormData: {
          pageTitle: '',
          background: '',
          shareTitle: '',
          shareImageUrl: []
        },
        baseConfigFormData: {
          NavigatorBackground: '',
          NavigatorTitleColor: '',
          enableMenu: true
        },
        miniDesignPage: {},
        animated: false,
        appliedStatus: '',
        applyTemplateDialogShow: false,
        currentPreviewTemplateIndex: 0,
        currentPreviewTemplateData: null,
        weChatMiniDesignPage: weChatMiniDesignPage
      }
    },
    created() {
      // console.dir(this.pageConfigObj.webLayout[0])
      // console.log(123456)
      // this.compDataList = Object.assign({}, this.compData);
      // console.log(this.obj);
      this.initPageSettingShow()
    },
    computed: {},

    activated() {
      // this.compDataList = Object.assign({}, this.compData);
      // console.log(this.compDataList);
      this.initPageSettingShow()
    },
    deactivated() {},
    methods: {
      applyTemplate() {
        // this.addNewMemberShipCard();
        if (this.currentPreviewTemplateIndex !== null || undefined) {
          this.pageConfigObj.webLayout = JSON.parse(
            JSON.stringify(
              this.templateList[this.currentPreviewTemplateIndex].layout
            )
          )
          // this.pageConfigObj.webLayout.push(this.obj.memberShipCard);
          this.designID = ''
          this.currentEditTemplateName = ''
          this.pageConfigObj = JSON.parse(JSON.stringify(weChatMiniDesignPage))
          this.pageConfigObj.setting.templateName = this.templateList[
            this.currentPreviewTemplateIndex
          ].setting.templateName
          //
          this.applyTemplateDialogShow = false
        }
      },
      resolveModuleImgSrc(moduleImg) {
        return '@assets/img/' + moduleImg
      },
      blink() {
        this.animated = true
        setTimeout(() => {
          this.animated = false
        }, 200)
      },
      afterLeave() {
        this.animated = true
        this.blink()
      },
      handleRemovePageSettingShareImageUrl(imgList) {
        console.log(imgList)
        this.pageConfigObj.setting.shareImageUrl = imgList
      },
      receivePageSettingShareImageUrl(res) {
        console.log(res.data.url)
        this.pageConfigObj.setting.shareImageUrl[0].url = res.data.url
      },
      initPageSettingShow() {
        if (this.obj.module == 'baseConfig' || this.obj.module == 'vipHome') {
          this.pageSetting = true
        }
      },
      choiceBackgColor() {
        this.navigationBac = this.color1
      },
      chioceTitleColor() {},
      toLink(e) {
        if (e) {
          window.location.href = e
          // this.$router.push(data)
        }
      },
      cloneComponent(el) {
        let newEl = Object.assign({}, el) /* 浅拷贝被复制对象 */
        delete newEl.moduleInfo
        if (this.pageConfigObj.webLayout.length > 0) {
          newEl['id'] = parseInt(
            findMaxItem(this.pageConfigObj.webLayout).id + 1
          )
        } else {
          newEl['id'] = this.pageConfigObj.webLayout.length + 1
        }
        console.log(newEl.id)
        return newEl
      },
      handleClick(id) {
        this.animated = true
        this.deletes = true
        this.right = false
        this.activeId = id
        this.editForm = null
        this.editFormId = null
        this.model = null
        this.mainStyle = false
        this.isEditFormShow = false
        this.pageSetting = false
        this.mainStyle = false
        console.log(id)
        let Obj = {}
        for (let obj of this.pageConfigObj.webLayout) {
          // console.log(obj)
          if (id === obj['id']) {
            Obj = obj
          }
        }
        // this.editForm = Obj.schema
        this.editFormId = Obj.id
        this.model = window._.cloneDeep(Obj)
        // this.model = JSON.parse(JSON.stringify(Obj))
        this.isEditFormShow = true
        setTimeout(() => {
          this.blink()
        }, 20)
        console.log(this.model)
      },
      imageUpload(file) {
        console.log(file)
      },
      onSubmit() {
        return false
      },
      reset() {
        this.$refs.JsonEditor.reset()
      },
      submit() {
        this.receiveModelData(this.datas)
        console.log(this.datas)
        for (let obj of this.pageConfigObj.webLayout) {
          if (obj['id'] === this.editFormId) {
            if (obj['compType'] === 'image') {
              let CarouselObj = JSON.parse(JSON.stringify(this.model))
              for (let item of CarouselObj['files']) {
                item['url'] = item['response']['files']['file']
              }
              console.dir(CarouselObj)
              obj['data'] = CarouselObj
              return
            }
            obj['data'] = JSON.parse(JSON.stringify(this.model))
          }
        }
        console.log(this.model)
      },
      deleteComponent(id) {
        let index = 0
        // if (this.pageConfigObj.webLayout.length <= 1) {
        //   return;
        // }
        for (let obj of this.pageConfigObj.webLayout) {
          if (obj['id'] === id) {
            this.pageConfigObj.webLayout.splice(index, 1)
            break
          }
          index = index + 1
        }
        this.saved = false
        this.model = undefined
      },
      receiveModelData(data) {
        this.model = data
        let index = 0
        for (let obj of this.pageConfigObj.webLayout) {
          if (obj['id'] === this.editFormId) {
            this.pageConfigObj.webLayout[index] = data
            this.saved = false
            break
          }
          index += 1
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import '../../DragComponent/DragComponent.scss';
</style>
