<template>
  <div style="height: 100%; display: block;">
    <div class="customize page-container">
      <div class="top-tools-box">
        <div class="handle-box-right">
          <el-button
            @click="saveConfig"
            round
            size="mini"
            style="height: 28px; padding: 0 23px;"
            type="primary"
            >保存
          </el-button>
        </div>
      </div>
      <div class="container">
        <div class="component-group">
          <div class="title">组件库</div>
          <el-scrollbar
            class="default-scrollbar"
            view-class="default-scrollbar__view"
            wrap-class="default-scrollbar__wrap"
          >
            <el-menu :default-openeds="['2']" v-if="obj.homepage || obj.custom">
              <el-submenu index="2">
                <template slot="title">
                  <!--                <i class="iconfont" style="position: static;">&#xe685;</i>-->
                  <span class="title">基础组件</span>
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
                        v-if="item.moduleInfo.module === 'baseModule'"
                      >
                        <img :src="item.moduleInfo.moduleImg" alt />
                        <div>{{ item.component.type }}</div>
                      </el-menu-item>
                    </template>
                  </draggable>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <!-- <img src="../assets/img/jg.png" alt /> -->
                  <!--                <i class="iconfont" style="position: static;">&#xe72e;</i>-->
                  <span class="title">营销</span>
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
                        v-if="item.moduleInfo.module === 'marketingModule'"
                      >
                        <img :src="item.moduleInfo.moduleImg" alt />
                        <div>{{ item.component.type }}</div>
                      </el-menu-item>
                    </template>
                  </draggable>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </div>

        <div class="shop-container">
          <div class="list-group">
            <div
              class="flex-container"
              style="border: 1px solid rgba(220, 220, 220, 1);"
            >
              <div
                @click="
                  pageSetting = true
                  animated = true
                "
                class="switch-to-set-page"
                style="position: relative; width: 100%;"
              >
                <img src="./assets/img/状态栏.png" />

                <div style="position: relative; width: 100%;">
                  <img src="./assets/img/标题栏-带返回按钮.png" />
                  <div
                    style="
                      position: absolute;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      flex-shrink: 0;
                    "
                  >
                    {{ pageConfigObj.setting.pageTitle || '页面标题' }}
                  </div>
                </div>
              </div>
              <div
                class="placeholder"
                style="
                  position: absolute;
                  width: 375px;
                  height: 667px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-sizing: border-box;
                  background: rgba(255, 255, 255, 1);
                "
                v-if="pageConfigObj.webLayout.length < 1"
              >
                请将组件拖动到此处
              </div>
              <div class="scroll-box" style="height: 667px;">
                <el-scrollbar
                  class="default-scrollbar"
                  style="box-sizing: border-box;"
                  view-class="default-scrollbar__view"
                  wrap-class="default-scrollbar__wrap"
                >
                  <draggable
                    :class="switchOrder ? 'switch-order' : ''"
                    @sort="reOrderComponent"
                    class="component-container"
                    element="div"
                    filter=".not-dragging "
                    ghost-class="placeholder"
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
                          {
                            marginTop: item.component.marginTop / 2 + 'px'
                          },
                          {
                            marginBottom: item.component.marginBottom / 2 + 'px'
                          },
                          { paddingLeft: item.component.marginLeft / 2 + 'px' },
                          {
                            paddingRight: item.component.marginRight / 2 + 'px'
                          }
                        ]"
                        @click="handleClick(item.id)"
                        @mouseenter.stop.capture="
                          () => {
                            return false
                          }
                        "
                        class="component-with-mask"
                        v-if="!switchOrder"
                      >
                        <span
                          :class="[
                            { 'show-border': activeId === item.id },
                            { border: !mainStyle }
                          ]"
                          class="border"
                        >
                          <span
                            class="component-name"
                            style="
                              font-size: 12px;
                              font-weight: 400;
                              color: rgba(116, 189, 120, 1);
                              margin-left: 11px;
                              margin-top: 7px;
                              display: block;
                            "
                            >{{ item.component.type }}</span
                          >
                        </span>

                        <div class="mask">
                          <span class="delete">
                            <img
                              @click.stop.capture="onUpItem(item, index)"
                              alt=""
                              src="./assets/img/上移.png"
                            />
                            <img
                              @click.stop.capture="onDownItem(item, index)"
                              alt=""
                              src="./assets/img/下移.png"
                            />
                            <img
                              @click.stop.capture="deleteComponent(item.id)"
                              alt=""
                              src="./assets/img/关闭.png"
                            />
                          </span>
                        </div>

                        <div class="component-class">
                          <component
                            :dataObj="item"
                            :is="item.compType"
                            :key="item.id"
                            :ref="item.compType"
                            style="cursor: move;"
                          ></component>
                        </div>
                      </div>
                    </template>
                  </draggable>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
        <div class="editor">
          <!-- 右边的默认配置 -->
          <div>
            <transition @after-leave="afterLeave" name="fade">
              <div class="animating-container" v-show="!animated">
                <div
                  class="right page-setting"
                  v-show="pageSetting && !animated"
                >
                  <div class="pageEdi">页面设置</div>
                  <el-form
                    :model="pageConfigObj.setting"
                    :rules="rules"
                    label-position="left"
                    label-width="100px"
                    ref="ruleForm"
                    size="mini"
                  >
                    <el-form-item label="页面名称" prop="name">
                      <!--                    <div class="title">页面名称</div>-->
                      <el-input
                        :maxlength="8"
                        clearable
                        placeholder="请输入页面名称"
                        size="small"
                        v-model="pageConfigObj.setting.name"
                      ></el-input>
                    </el-form-item>

                    <el-form-item label="页面标题" prop="pageTitle">
                      <el-input
                        :maxlength="8"
                        clearable
                        placeholder="请输入页面标题"
                        size="small"
                        v-model="pageConfigObj.setting.pageTitle"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="分享文案">
                      <el-input
                        :rows="3"
                        clearable
                        maxlength="20"
                        placeholder="请输入分享文案"
                        show-word-limit
                        size="small"
                        type="textarea"
                        v-model="pageConfigObj.setting.shareText"
                      ></el-input>
                    </el-form-item>
                    <!--                    <el-form-item label="分享图片">-->
                    <!--                      <sp-upload-img-->
                    <!--                        :limitNumber="1"-->
                    <!--                        width="100px"-->
                    <!--                        v-model="pageConfigObj.setting.shareImageUrl"-->
                    <!--                        :limitSize="2048"-->
                    <!--                      ></sp-upload-img>-->
                    <!--                      <span-->
                    <!--                        style="-->
                    <!--                          display: block;-->
                    <!--                          width: 242px;-->
                    <!--                          font-size: 12px;-->
                    <!--                          color: #999999;-->
                    <!--                          line-height: 18px;-->
                    <!--                          padding-top: 13px;-->
                    <!--                        "-->
                    <!--                        >支持格式jpg、png的图片，2M以内，图片长宽比是5:4</span-->
                    <!--                      >-->
                    <!--                    </el-form-item>-->
                  </el-form>
                </div>
                <div
                  class="component-editor"
                  v-if="model"
                  v-show="!animated && !pageSetting"
                >
                  <component
                    :compData="model"
                    :is="model.baseData && model.baseData.form"
                    :key="model.id"
                    @postModelData="receiveModelData"
                  ></component>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="applyTemplateDialogShow"
        class="new-template-dialog"
        title="新建页面"
        width="850px"
      >
        <!--预览弹框-->
        <div class="add-new-page">
          <div class="left-box">
            <div class="text">通用模板：</div>
            <div class="template-list-box">
              <el-radio-group
                @change="switchTemplate"
                v-model="currentPreviewTemplateIndex"
              >
                <el-radio
                  :key="index"
                  :label="index"
                  class="item"
                  v-for="(item, index) of this.templateList"
                >
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="right-box">
            <div class="template-list-preview-container">
              <!--          <div class="component-container" v-if="templateList.length > 0">-->
              <div class="component-container" v-if="templateList.length > 0">
                <div
                  :class="item.drag"
                  :id="item.id"
                  :key="index"
                  :slot="item.slot"
                  :style="[
                    { marginTop: item.component.marginTop / 2 + 'px' },
                    { marginBottom: item.component.marginBottom / 2 + 'px' },
                    { marginLeft: item.component.marginLeft / 2 + 'px' },
                    { marginRight: item.component.marginRight / 2 + 'px' }
                  ]"
                  @mouseenter.stop.capture="
                    () => {
                      return false
                    }
                  "
                  class="component-with-mask"
                  v-for="(item, index) in templateList[
                    currentPreviewTemplateIndex
                  ].layout"
                >
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
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-box" slot="footer">
          <el-button @click="applyTemplate">确定</el-button>
          <el-button @click="applyTemplateDialogShow = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import DragComponent from '@/components/public/weChat/DragComponent/DragComponent'
  import {
    applyWeChatMiniPage,
    getWeChatMiniPageList,
    getWeChatTemplateList,
    saveWeChatMiniPageConfig
  } from '@/api/wxApi/config'
  import { weChatMiniDesignPage } from '@/utils/dataStructure'
  import customizeTemplateSelector from '@/views/weChatPages/customize/customizeTemplateSelector'
  import { layoutDataListIdFilter } from '@/utils/filters'
  import { componentDataFilter } from '@/utils/filters'

  export default {
    name: 'customize',
    components: {
      customizeTemplateSelector
    },
    extends: DragComponent,
    props: {
      obj: {
        type: Object,
        default() {
          return {
            toolsBox: ['save', 'apply', 'addTemplate'],
            custom: true,
            module: 'customize',
            page: true
          }
        }
      },
      compData: {},
      pageData: {
        type: Object
      }
    },
    data() {
      return {
        mainStyle: true,
        designID: '',
        saveDisable: true,
        pageConfigObj: this.$lodash.cloneDeep(weChatMiniDesignPage),
        layoutDataList: [
          {
            id: 5,
            form: 'Title_form',
            comp: 'Title',
            compType: 'Title',
            platform: { W: true, A: true },
            baseData: {
              previewImg:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
              form: 'Title_form'
            },
            component: {
              type: '标题',
              text:
                '888768uyuiyrdgvvvvvvfdgfdgdfgfdgdf@click="selectUrlVisible = true"@click="selectUrlVisible = true"@click="selectUrlVisible = true"@click="selectUrlVisible = true"@click="selectUrlVisible = true"@click="selectUrlVisible = true"',
              align: 1,
              textLine: true,
              marginBottom: 0,
              marginTop: 19,
              marginLeft: 30,
              marginRight: 30,
              position: '',
              value2: true,
              fontWeight: 0,
              fontSize: 16,
              fontColor: '#C21B1B',
              backgroundColor: '#FFFFFF',
              data: [],
              link: {
                linkId: 2202,
                platformAppType: '1',
                appType: '0',
                name: '秒杀(商品)',
                url: 'pages/ticketMall/goodsDetail/goodsDetail?id=id',
                appName: '营销',
                appId: 'wx263d06f226f1e619',
                userId: 'gh_c2f4c78bbb0e',
                linkType: '1'
              }
            }
          },
          {
            id: 4,
            comp: 'PictureAds',
            compType: 'PictureAds',
            platform: { W: true, A: true },
            baseData: {
              previewImg:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
              form: 'PictureAdsForm'
            },
            component: {
              type: '图片广告',
              text: '精品优选',
              marginBottom: 15,
              link: {
                linkId: 2301,
                platformAppType: '1',
                appType: '0',
                name: '品牌导航',
                url: 'pages/chooseStore/main',
                appName: '其他',
                appId: 'wx263d06f226f1e619',
                userId: 'gh_c2f4c78bbb0e'
              },
              data: [],
              marginTop: 15,
              imageId: 1270,
              imageUrl:
                'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/bd7b6ded61c64112855cfbb5642c49db.jpg',
              marginLeft: 30,
              marginRight: 30
            }
          },
          {
            id: 1,
            comp: 'HotSpot',
            compType: 'HotSpot',
            platform: { W: true, A: true },
            baseData: {
              previewImg:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
              form: 'HotSpotForm'
            },
            component: {
              type: '图片热点',
              marginTop: 0,
              marginBottom: 0,
              data: [
                {
                  width: 0.25,
                  height: 0.25,
                  x: 0,
                  y: 0,
                  defaultName: '1',
                  url: '',
                  name: '积分记录',
                  absolute: { width: 100, height: 100, x: 0, y: 0 },
                  link: {
                    linkId: 2100,
                    platformAppType: '1',
                    appType: '0',
                    name: '积分记录',
                    url: 'pages/card/points/points',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  }
                },
                {
                  width: 0.58,
                  height: 0.47,
                  x: 0.42,
                  y: 0.53,
                  defaultName: 2,
                  url: '',
                  name: '积分商城',
                  absolute: { width: 232, height: 188, x: 168, y: 212 },
                  link: {
                    linkId: 2107,
                    platformAppType: '1',
                    appType: '0',
                    name: '积分商城(商品)',
                    url: 'pages/pointMall/goodsDetail/goodsDetail?id=id',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  }
                }
              ],
              imageHotSpotUrl:
                'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/6afd430712a84f6598d5e69f6616eeda.jpg',
              imageId: 1236,
              marginLeft: 30,
              marginRight: 30
            }
          },
          {
            id: 2,
            comp: 'Navigation',
            compType: 'Navigation',
            platform: { W: true, A: true },
            baseData: {
              previewImg:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
              form: 'NavigationForm'
            },
            component: {
              type: '功能导航',
              text: '精品优选',
              marginTop: 5,
              marginBottom: 15,
              position: '',
              direction: 0,
              rowStyle: 0,
              numberOfRowItems: 3,
              EnableImg: true,
              link: '',
              data: [
                {
                  title: '4234234',
                  fontColor: '#000000',
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/55b57630de7143aea09e242d49c1d32f.png',
                  link: {
                    linkId: 2100,
                    platformAppType: '1',
                    appType: '0',
                    name: '积分记录',
                    url: 'pages/card/points/points',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  },
                  imageId: 1283
                },
                {
                  title: '234324',
                  fontColor: '#000000',
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/617b2104ac4d4f08b0bc6e19003efc50.jpg',
                  link: {
                    linkId: 2107,
                    platformAppType: '1',
                    appType: '0',
                    name: '积分商城(商品)',
                    url: 'pages/pointMall/goodsDetail/goodsDetail?id=id',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  },
                  imageId: 1284
                },
                {
                  title: '234234',
                  fontColor: '#000000',
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/0b512dfd826049f7a77a5ab036a0c1df.png',
                  link: {
                    linkId: 2103,
                    platformAppType: '1',
                    appType: '0',
                    name: '储值消费',
                    url: 'pages/card/cardPay/cardPay',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  },
                  imageId: 1285
                },
                {
                  title: '234324',
                  fontColor: '#000000',
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/36f14e1f0ab6451b96bae528397749fc.png',
                  link: {
                    linkId: 2204,
                    platformAppType: '1',
                    appType: '0',
                    name: '拼团(商品)',
                    url: 'pages/ticketMall/goodsDetail/goodsDetail?id=id',
                    appName: '营销',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  },
                  imageId: 1286
                },
                {
                  title: '243234',
                  fontColor: '#000000',
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/36f745e3945245c99f198cc9f85c332c.png',
                  link: {
                    linkId: 2102,
                    platformAppType: '1',
                    appType: '0',
                    name: '储值充值',
                    url: 'pages/card/recharge/recharge',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  },
                  imageId: 1287
                }
              ],
              title: '',
              marginLeft: 30,
              marginRight: 30
            }
          },
          {
            id: 3,
            comp: 'Carousel',
            compType: 'Carousel',
            platform: { W: true, A: true },
            baseData: {
              previewImg:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAATCAYAAACORR0GAAABYUlEQVRIS+2VMUgCYRTH/+9LMckgEMmmhtqjtWgJs5YGB8OG1tBrqTgpyTCiIjjlhuguGhoLmhxNBedoiyCaMxAaGkoi8O7FkW3GaWhLfvP/vR/8vve+jwppidGRwwxQ2WQ+Csb1NFkgEzgE+LqdPGImQIwTYRNMW3UQh2ZlPdtO0HevfDq2T6CljoOulGhEEJ3/EUhcdEEtz8vXHXXVtSwO+MfqSurqgIvpY2Jdfc+py0Nza6eVy3BYuMe8/vnkyVNpR/I4XOycSugvjcw2rS6vSI8E3JnESQHcMCAJJh8TUrUec9RhiDMAwzOyNmILInAo8MOjWshIMplUfq1Wc30e9x4ZdAyH2UssIv635+1Kvy8Ehjcga1ojUEGJLnB9jyoM1oKyvvuLobItsdTWPOYkFTOxBDOlCHwA4NawLW0+4DRwP72hP1gVZH2DRSUmg2gFwGDzbeyTzJwNxvVFK/kJKwHyrqeteAoAAAAASUVORK5CYII=',
              form: 'CarouselForm'
            },
            component: {
              type: '轮播',
              text: '',
              marginBottom: 0,
              height: 340,
              interval: 3,
              borderRadius: false,
              isDefaultHeight: true,
              data: [
                {
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/abadc330340646a5861d7bde90bd4e1c.jpg',
                  imageId: 1248,
                  link: {
                    linkId: 2101,
                    platformAppType: '1',
                    appType: '0',
                    name: '储值账户',
                    url: 'pages/card/accounts/accounts',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  }
                },
                {
                  imageUrl:
                    'http://bamboo-scrm.oss-cn-qingdao.aliyuncs.com/default/image/202004/795177af889b4be9926b196182c4b1a6.jpg',
                  imageId: 1249,
                  link: {
                    linkId: 2103,
                    platformAppType: '1',
                    appType: '0',
                    name: '储值消费',
                    url: 'pages/card/cardPay/cardPay',
                    appName: '会员中心',
                    appId: 'wx263d06f226f1e619',
                    userId: 'gh_c2f4c78bbb0e'
                  }
                }
              ],
              marginTop: 1,
              marginLeft: 30,
              marginRight: 30
            }
          }
        ],
        pagesList: [],
        templateList: [],
        rules: {
          pageTitle: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
        },
        currentEditTemplateName: '',
        dialog: false,
        pageId: undefined,
        saved: false
      }
    },
    provide() {
      return {
        pageData: this.pageData
      }
    },
    created() {
      // this.initData()
      //   .then(res => {
      //     console.log(res);
      //     this.layoutDataList = res.data[0].layout;
      //     this.designID = res.data[0].pageID;
      //     this.pageConfigObj.setting = res.data[0].setting;
      //     this.pagesList = res.data;
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
      console.log(this.pageData)
      this.pageConfigObj = { ...this.pageConfigObj, ...this.pageData }
    },
    activated() {
      this.mainStyle = true
      // this.initNewConfig()
      // this.initData()
      //   .then(res => {
      //     if (res.data.length > 0) {
      //         const arr = res.data.filter(item => {
      //           return item.status == "A";
      //         });
      //         let currentApplyTemplate = arr[0];
      //         if (currentApplyTemplate) {
      //           const newList = layoutDataListIdFilter(currentApplyTemplate.layout);
      //           this.appliedStatus = currentApplyTemplate.status;
      //           this.layoutDataList = newList;
      //           this.designID = currentApplyTemplate.pageID;
      //           this.currentEditTemplateName = currentApplyTemplate.name;
      //           this.pageConfigObj.setting = currentApplyTemplate.setting;
      //           this.pagesList = res.data;
      //         } else {
      //           currentApplyTemplate = res.data[0];
      //           const newList = layoutDataListIdFilter(currentApplyTemplate.layout);
      //           this.appliedStatus = currentApplyTemplate.status;
      //           this.layoutDataList = newList;
      //           this.designID = currentApplyTemplate.pageID;
      //           this.currentEditTemplateName = currentApplyTemplate.name;
      //           this.pageConfigObj.setting = currentApplyTemplate.setting;
      //           this.pagesList = res.data;
      //         }
      //       } else {
      //
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
    },
    methods: {
      reOrderComponent() {
        this.saved = false
      },
      pageTop() {
        // this.mainStyle = true
        // this.deletes = true
        this.animated = false
        this.pageSetting = true
      },
      switchTemplate(index) {
        console.log(index)
      },
      // openNewPageDialog() {
      //   getWeChatTemplateList('H')
      //     .then(res => {
      //       this.applyTemplateDialogShow = true
      //       this.templateList = res.data
      //     })
      //     .catch(err => {
      //       if (err.data) {
      //         this.popMessage('error', err.data.msg)
      //       }
      //     })
      // },
      addNewPage() {
        this.messageBoxConfirm()
          .then(() => {
            this.pageSetting = true
            this.mainStyle = true
            this.deletes = true
            this.applyTemplateDialogShow = false
            this.initNewConfig()
          })
          .catch(() => {
            // alert('取消')
          })
      },
      initNewConfig() {
        this.layoutDataList = []
        this.designID = ''
        this.currentEditTemplateName = ''
        this.pageConfigObj = JSON.parse(JSON.stringify(weChatMiniDesignPage))
      },
      // applyTemplate() {
      //   if (this.currentPreviewTemplateIndex !== null || undefined) {
      //     this.layoutDataList = JSON.parse(
      //       JSON.stringify(
      //         this.templateList[this.currentPreviewTemplateIndex].layout
      //       )
      //     );
      //     this.designID = "";
      //     this.currentEditTemplateName = "";
      //     this.pageConfigObj = JSON.parse(JSON.stringify(weChatMiniDesignPage));
      //     this.applyTemplateDialogShow = false;
      //   }
      // },
      // apply() {
      //   this.pageConfigObj.layout = [...this.layoutDataList]
      //   this.pageConfigObj.name = this.pageConfigObj.setting.pageTitle
      //   if (this.designID) {
      //     applyWeChatMiniPage(this.designID, 'H', this.pageConfigObj)
      //       .then(res => {
      //         console.log(res)
      //         if (res.data.flag) {
      //           this.popMessage('success', '应用成功')
      //           this.appliedStatus = 'A'
      //         } else {
      //           this.popMessage('error', res.data.msg)
      //         }
      //       })
      //       .catch(err => {
      //         console.error(err)
      //       })
      //   } else {
      //     return false
      //   }
      // },
      getTemplate(data) {
        console.warn(data)
        this.loadTemplateList(data)
      },
      handleTemplateRemoved(id) {
        console.log(id)
        let index = 0
        for (let item of this.pagesList) {
          if (item.pageID == id) {
            this.pagesList.splice(index, 1)
          }
          index = index + 1
        }
      },
      // initData() {
      //   const openLoading = this.openFullScreenLoading
      //   openLoading()
      //   return new Promise((resolve, reject) => {
      //     getWeChatMiniPageList('H')
      //       .then(res => {
      //         console.error('api返回的模板')
      //         console.log(res)
      //         resolve(res)
      //         openLoading().close()
      //       })
      //       .catch(err => {
      //         console.error('api返回的错误')
      //         console.log(err)
      //         this.popMessage('error', err.data.msg)
      //         openLoading().close()
      //         reject(err)
      //       })
      //   })
      // },
      // loadTemplateList(id) {
      //   this.deletes = true
      //   this.pageSetting = true // 默认最右边的配置展示第一个
      //   this.initData(id)
      //     .then(res => {
      //       console.log(res)
      //       let arr = res.data.filter(item => {
      //         if (item.pageID == id) {
      //           return item
      //         }
      //       })
      //       const obj = arr[0]
      //       console.error(obj)
      //       this.mainStyle = true
      //       this.appliedStatus = obj.status
      //       this.currentEditTemplateName = obj.name
      //       this.layoutDataList = layoutDataListIdFilter(obj.layout)
      //       this.designID = obj.pageID
      //       this.pageConfigObj.setting = obj.setting
      //       this.pagesList = res.data
      //     })
      //     .catch(err => {
      //       console.error(err)
      //     })
      // },
      // save() {
      //   this.submitForm('ruleForm')
      //     .then(() => {
      //       this.pageConfigObj.layout = [...this.layoutDataList]
      //       this.pageConfigObj.name = this.pageConfigObj.setting.templateName
      //       const loading = this.openFullScreenLoading()
      //       if (this.designID) {
      //         saveWeChatMiniPageConfig(this.designID, 'H', this.pageConfigObj)
      //           .then(res => {
      //             if (res.data.flag) {
      //               this.popMessage('success', '保存成功')
      //             } else {
      //               this.popMessage('error', '保存失败')
      //             }
      //             console.log(res)
      //             loading.close()
      //           })
      //           .catch(err => {
      //             console.error(err)
      //             loading.close()
      //           })
      //       } else {
      //         saveWeChatMiniPageConfig(this.designID, 'H', this.pageConfigObj)
      //           .then(res => {
      //             if (res.data.flag) {
      //               this.popMessage('success', '保存成功')
      //             } else {
      //               this.popMessage('error', '保存失败')
      //             }
      //             console.log(res)
      //             loading.close()
      //             setTimeout(() => {
      //               this.initData()
      //                 .then(res => {
      //                   let newList = res.data[res.data.length - 1].layout
      //                   for (let i = 0; i < newList.length; i++) {
      //                     newList[i].id = i
      //                   }
      //                   this.layoutDataList = newList
      //                   this.designID = res.data[res.data.length - 1].pageID
      //                   this.pageConfigObj.setting =
      //                     res.data[res.data.length - 1].setting
      //                   this.pagesList = res.data
      //                 })
      //                 .catch(err => {
      //                   console.error(err)
      //                 })
      //             }, 300)
      //           })
      //           .catch(err => {
      //             console.error(err)
      //             loading.close()
      //           })
      //       }
      //     })
      //     .catch(() => {
      //       this.popMessage('error', '请填写页面名称和标题')
      //     })
      // },
      submitForm(formName) {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              resolve(true)
            } else {
              console.log('error submit!!')
              reject(false)
            }
          })
        })
      },
      close() {
        if (!this.saved) {
          this.$confirm('未保存的数据将丢失，是否离开页面？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            this.$emit('close')
          })
        } else {
          this.$emit('close')
        }
      },
      saveConfig() {
        //保存页面配置
        this.submitForm('ruleForm')
          .then(() => {
            const { setting, pageId, webLayout, oprId } = {
              ...this.pageConfigObj
            }
            const { name } = { ...this.pageConfigObj.setting }
            this.axios({
              url: `POST:/mini/custom/page`,
              data: {
                miniLayout: JSON.stringify(componentDataFilter(webLayout)),
                name: name,
                oprId: (oprId && oprId) || '',
                pageId: pageId,
                setting: JSON.stringify(setting),
                webLayout: JSON.stringify(webLayout)
              }
            }).then(res => {
              this.saved = true
              this.pageConfigObj.pageId = res
              this.$message.success('保存成功')
            })
          })
          .catch(() => {
            this.pageSetting = true
            this.animated = true
          })
      },
      // 上移
      onUpItem(item, index) {
        this.pageConfigObj.webLayout.splice(index - 1, 0, item)
        this.pageConfigObj.webLayout.splice(index + 1, 1)
        this.saved = false
      },
      // 下移
      onDownItem(item, index) {
        this.pageConfigObj.webLayout.splice(index + 2, 0, item)
        this.pageConfigObj.webLayout.splice(index, 1)
        this.saved = false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import '../../../components/public/DragComponent/DragComponent.scss';
  @import 'customize';
</style>
