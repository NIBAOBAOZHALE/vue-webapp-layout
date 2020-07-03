<template>
  <div class="urlSelector">
    <div class="wrap">
      <el-tooltip
        v-if="link"
        :content="linkObj.prodName ? linkObj.prodName : link"
        placement="top"
        effect="light"
      >
        <div class="url ellipsis">{{ name }}</div>
      </el-tooltip>
      <div v-if="!link" class="url ellipsis">{{ name }}</div>
      <div @click="openUrlSelector" class="select-url">选择链接</div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      @open="initData"
      center
      title="链接工具"
      width="882px"
      :append-to-body="true"
    >
      <el-tabs @tab-click="handleTabClick" type="border-card">
        <el-tab-pane label="小程序">
          <el-radio-group @change="handleRadioSelected" v-model="radio">
            <div class="module">
              <span class="module-name">
                会员
              </span>
              <div class="item">
                <template v-for="(item, index) of miniList">
                  <el-radio
                    :key="index"
                    :label="JSON.stringify(item)"
                    v-if="item.module === '会员'"
                    >{{ item.name }}
                  </el-radio>
                </template>
              </div>
            </div>
            <div class="module">
              <span class="module-name">
                营销
              </span>
              <div class="item">
                <template v-for="(item, index) of miniList">
                  <el-radio
                    :key="index"
                    :label="JSON.stringify(item)"
                    v-if="item.module === '营销'"
                    >{{ item.name }}
                  </el-radio>
                </template>
              </div>
            </div>
            <div class="module">
              <span class="module-name">
                其他
              </span>
              <div class="item">
                <template v-for="(item, index) of miniList">
                  <el-radio
                    :key="index"
                    :label="JSON.stringify(item)"
                    v-if="item.module === '其他' && item.name !== '品牌导航'"
                    >{{ item.name }}
                  </el-radio>
                </template>
              </div>
            </div>
            <div class="module">
              <span class="module-name">
                外部小程序
              </span>
              <div class="item">
                <el-radio
                  :key="index"
                  :label="JSON.stringify(item)"
                  v-for="(item, index) of extMiniList"
                  >{{ item.name }}
                </el-radio>
              </div>
            </div>
          </el-radio-group>
          <!--          <el-radio-group @change="handleRadioSelected" v-model="radio">-->
          <!--           -->
          <!--          </el-radio-group>-->
        </el-tab-pane>
        <el-tab-pane label="H5链接">
          <el-radio-group @change="handleRadioSelected" v-model="radio">
            <!--            <div class="module">-->
            <!--              <span class="module-name">-->
            <!--                会员-->
            <!--              </span>-->
            <!--              <div class="item">-->
            <!--                <el-radio-->
            <!--                  :key="index"-->
            <!--                  :label="JSON.stringify(item)"-->
            <!--                  v-for="(item, index) of webList"-->
            <!--                  v-if="item.module === '会员'"-->
            <!--                  >{{ item.name }}-->
            <!--                </el-radio>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="module">-->
            <!--              <span class="module-name">-->
            <!--                营销-->
            <!--              </span>-->
            <!--              <div class="item">-->
            <!--                <el-radio-->
            <!--                  :key="index"-->
            <!--                  :label="JSON.stringify(item)"-->
            <!--                  v-for="(item, index) of webList"-->
            <!--                  v-if="item.module === '营销'"-->
            <!--                  >{{ item.name }}-->
            <!--                </el-radio>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="module">
              <span class="module-name"> </span>
              <div class="item">
                <template v-for="(item, index) of webList">
                  <el-radio
                    :key="index"
                    :label="JSON.stringify(item)"
                    v-if="item.name !== '品牌导航'"
                    >{{ item.name }}
                  </el-radio>
                </template>
              </div>
            </div>
            <div class="module">
              <span class="module-name"> </span>
              <div class="item" style="display: flex; align-items: center;">
                <el-radio style="margin-bottom: 0;" :label="'customizeUrl'"
                  >自定义链接
                </el-radio>
                <el-input
                  style="width: 220px;"
                  size="mini"
                  v-if="isCustomizeUrlInputShow"
                  v-model="selectedLink.webUri"
                ></el-input>
              </div>
            </div>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>
      <span class="dialog-footer" slot="footer">
        <el-button @click="save">确定</el-button>
      </span>
    </el-dialog>
    <product-sel-with-prod-selector
      v-if="ProductSelDialogTableVisible"
      :business-type="businessType"
      :post-selection="receiveSelection"
    ></product-sel-with-prod-selector>
    <event-inf-list-selector
      v-if="EventInfSelDialogTableVisible"
      :business-type="businessType"
      :post-selection="receiveSelection"
      title="请选择活动"
    >
    </event-inf-list-selector>
  </div>
</template>

<script>
  import urlSelector from '@/components/weChat/urlSelector/urlSelector.vue'
  import ProductSelWithProdSelector from '@/components/weChat/Url&ProductSelector/ProductSel'
  import EventInfListSelector from '@/components/weChat/Url&ProductSelector/EventInfListSelector'
  import URI from 'urijs'

  export default {
    name: 'UrlSelectorWithProdSelector',
    components: {
      ProductSelWithProdSelector,
      EventInfListSelector
    },
    extends: urlSelector,
    data() {
      return {
        ProductSelDialogTableVisible: false,
        EventInfSelDialogTableVisible: false,
        businessType: '',
        currentProductLink: {},
        businessTypeMap: {
          P: this.fillProductLink,
          F: this.fillProductLink,
          S: this.fillProductLink,
          G: this.fillProductLink,
          '15': this.fillEventInfLink,
          '27': this.fillEventInfLink
        }
      }
    },
    methods: {
      handleRadioSelected(obj) {
        if (obj === 'customizeUrl') {
          this.selectedLink = { ...this.linkPrototype }
          this.selectedLink.name = '自定义链接'
          this.isCustomizeUrlInputShow = true
        } else {
          this.isCustomizeUrlInputShow = false
          obj = JSON.parse(obj)
          let productStr = new String()
          if (obj.child === 'Y') {
            if (obj.businessType != '15' && obj.businessType != '27') {
              this.businessType = obj.businessType
              this.ProductSelDialogTableVisible = false
              setTimeout(() => {
                this.ProductSelDialogTableVisible = true
              }, 24)
            } else {
              this.businessType = obj.businessType
              this.EventInfSelDialogTableVisible = false
              setTimeout(() => {
                this.EventInfSelDialogTableVisible = true
              }, 24)
            }
          } else {
            this.ProductSelDialogTableVisible = false
            this.EventInfSelDialogTableVisible = false
          }
          console.log(productStr)
          this.selectedLink = obj
        }
      },
      handleReplaceUrlId(url, id, urlType) {
        let productStr = new String()
        if (urlType === 'miniUri') {
          try {
            productStr = URI(url)
              .search({ id: id })
              .toString()
            return productStr
          } catch (e) {
            return url
          }
        } else {
          try {
            id = id.toString()
            return url.replace(/id/g, id)
          } catch (e) {
            return url
          }
        }
      },
      handleReplaceEventInfId(url, id, urlType) {
        let productStr = new String()
        if (urlType === 'miniUri') {
          try {
            productStr = URI(url)
              .search({ id: id })
              .toString()
            return productStr
          } catch (e) {
            return url
          }
        } else {
          try {
            id = id.toString()
            return url.replace(/idStr/g, id)
          } catch (e) {
            return url
          }
        }
      },
      receiveSelection(row) {
        console.log(row)
        // this.fillProductLink(row)
        this.businessTypeMap[this.selectedLink.businessType](row)
        this.ProductSelDialogTableVisible = false
        this.EventInfSelDialogTableVisible = false
      },
      save() {
        this.ProductSelDialogTableVisible = false
        this.EventInfSelDialogTableVisible = false
        this.dialogVisible = false
        this.afterLinkChange && this.afterLinkChange(this.selectedLink)
      },
      fillProductLink(row) {
        const ticketShelfID = row.ticketShelfID
        const urlType = this.selectedLink.miniUri ? 'miniUri' : 'webUri'
        let url = this.handleReplaceUrlId(
          this.selectedLink[urlType],
          ticketShelfID,
          urlType
        )
        this.selectedLink[urlType] = url
        this.selectedLink['prodName'] = row.prodName
      },
      fillEventInfLink(row) {
        const eventID = row.eventIDStr
        const urlType = this.selectedLink.miniUri ? 'miniUri' : 'webUri'
        console.log(this.selectedLink[urlType])
        let url = this.handleReplaceEventInfId(
          this.selectedLink[urlType],
          eventID,
          urlType
        )
        console.log(url)
        this.selectedLink[urlType] = url
        this.selectedLink['prodName'] = row.prodName
      }
    }
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet">
  @import '../urlSelector/urlSelector.scss';
</style>
