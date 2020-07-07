<template>
  <div class="urlSelector">
    <div class="wrap">
      <!--      <el-tooltip-->
      <!--        v-if="link"-->
      <!--        :content="linkObj.prodName ? linkObj.prodName : link"-->
      <!--        placement="top"-->
      <!--        effect="light"-->
      <!--      >-->
      <!--        <div class="url ellipsis">{{ name }}</div>-->
      <!--      </el-tooltip>-->
      <!--      <div v-if="!link" class="url ellipsis">{{ name }}</div>-->
      <div @click="openUrlSelector" class="select-url">选择链接</div>
      <!--            <div v-if="!link" class="url ellipsis">{{ name }}</div>-->
      <div class="url" v-if="link">{{ link }}</div>
    </div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      @open="initData"
      center
      title="链接工具"
      width="882px"
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
                <template v-for="(item, index) of miniList">
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
                <el-radio :label="'customizeUrl'" style="margin-bottom: 0;"
                  >自定义链接
                </el-radio>
                <el-input
                  size="mini"
                  style="width: 220px;"
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
      :business-type="businessType"
      :post-selection="receiveSelection"
      v-if="ProductSelDialogTableVisible"
    ></product-sel-with-prod-selector>
    <event-inf-list-selector
      :business-type="businessType"
      :post-selection="receiveSelection"
      title="请选择活动"
      v-if="EventInfSelDialogTableVisible"
    >
    </event-inf-list-selector>
  </div>
</template>

<script>
  import UrlSelectorWithProdSelector from '@/components/weChat/Url&ProductSelector/UrlSelectorWithProdSelector'
  import ProductSelWithProdSelector from '@/components/weChat/Url&ProductSelector/ProductSel'

  export default {
    name: 'UrlSelectorWithProdSelectorForHotSpot',
    components: {
      ProductSelWithProdSelector
    },
    extends: UrlSelectorWithProdSelector,
    data() {
      return {
        dialogTableVisible: false,
        businessType: '',
        currentProductLink: {}
      }
    }
    // methods: {
    //   handleRadioSelected(obj) {
    //     if (obj === "customizeUrl") {
    //       this.selectedLink = { ...this.linkPrototype };
    //       this.selectedLink.name = "自定义链接";
    //       this.isCustomizeUrlInputShow = true;
    //     } else {
    //       this.isCustomizeUrlInputShow = false;
    //       obj = JSON.parse(obj);
    //       let productStr = new String();
    //       if (obj.child === "Y") {
    //         this.businessType = obj.businessType;
    //         this.dialogTableVisible = false;
    //         setTimeout(() => {
    //           this.dialogTableVisible = true;
    //         }, 24);
    //       } else {
    //         this.dialogTableVisible = false;
    //       }
    //       console.log(productStr);
    //       this.selectedLink = obj;
    //     }
    //   },
    //   handleReplaceUrlId(url, id, urlType) {
    //     let productStr = new String();
    //     if (urlType === "miniUri") {
    //       try {
    //         productStr = URI(url)
    //           .search({ id: id })
    //           .toString();
    //         return productStr;
    //       } catch (e) {
    //         return url;
    //       }
    //     } else {
    //       try {
    //         id = id.toString();
    //         return url.replace(/id/g, id);
    //       } catch (e) {
    //         return url;
    //       }
    //     }
    //   },
    //   receiveSelection(row) {
    //     ;
    //     console.log(row);
    //     const ticketShelfID = row.ticketShelfID;
    //     const urlType = this.selectedLink.miniUri ? "miniUri" : "webUri";
    //     let url = this.handleReplaceUrlId(
    //       this.selectedLink[urlType],
    //       ticketShelfID,
    //       urlType
    //     );
    //     this.selectedLink[urlType] = url;
    //     this.selectedLink["prodName"] = row.prodName;
    //     ;
    //     this.dialogTableVisible = false;
    //   },
    //   save() {
    //     this.dialogVisible = false;
    //     this.afterLinkChange && this.afterLinkChange(this.selectedLink);
    //   }
    // }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import '../urlSelector/urlSelector';

  .wrap {
    justify-content: flex-start !important;
    align-items: center;

    > div {
      position: relative;
      transform: translateY(5px);
    }

    div.select-url {
      width: 98px;
      height: 32px;
      background: rgba(59, 178, 119, 1);
      border-radius: 16px;
      padding: 0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div.url {
      display: flex;
      background: none !important;
      border-radius: 0;
      color: #3bb277;
      margin-left: 20px;
      width: unset !important;
      height: 32px;
      align-items: center;
    }
  }
</style>
