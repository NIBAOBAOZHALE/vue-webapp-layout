<template>
  <div class="urlSelector">
    <div class="wrap">
      <el-tooltip :content="link" effect="light" placement="top" v-if="link">
        <div class="url ellipsis">{{ name }}</div>
      </el-tooltip>
      <div class="url ellipsis" v-if="!link">{{ name }}</div>
      <div @click="openUrlSelector" class="select-url">选择链接</div>
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
              <span class="module-name">
                <!--                其他-->
              </span>
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
                <el-radio :label="'customizeUrl'" style="margin-bottom: 0;"
                  >自定义链接
                </el-radio>
                <el-input
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
  </div>
</template>

<script>
  import { getLinks } from '@/api/wxApi/config'

  export default {
    name: 'urlSelector',
    props: {
      afterLinkChange: {
        type: Function
      },
      link: {
        type: String
      },
      name: {
        type: String
      },
      linkObj: {
        type: Object
      }
    },
    data() {
      return {
        dialogVisible: false,
        radio: '',
        webList: [],
        miniList: [],
        selectedLink: '',
        extMiniList: [],
        isCustomizeUrlInputShow: false,
        linkPrototype: {
          businessType: '',
          child: '',
          lastModified: '',
          linkID: 205,
          miniUri: '',
          module: '',
          name: '',
          priority: '',
          tabSelect: '',
          webUri: ''
        }
      }
    },
    created() {},
    methods: {
      handleRadioSelected(obj) {
        if (obj === 'customizeUrl') {
          this.selectedLink = { ...this.linkPrototype }
          this.selectedLink.name = '自定义链接'
          this.isCustomizeUrlInputShow = true
        } else {
          this.isCustomizeUrlInputShow = false
          obj = JSON.parse(obj)
          // let productStr = new String
          // if (obj.child === 'Y') {
          //    productStr =  URI(obj.miniUri)
          //           .search({ id: "112" }).toString()
          // }
          // console.log(productStr)
          this.selectedLink = obj
        }
      },
      handleTabClick(instance) {
        console.log(instance)
      },
      initData() {
        getLinks()
          .then(res => {
            console.log(res)
            this.webList = res.webList
            this.miniList = res.miniList
            this.extMiniList = res.extMiniList
          })
          .catch(err => {
            console.log(err)
          })
      },
      openUrlSelector() {
        this.dialogVisible = true
      },
      radioChange(e) {
        console.log(e)
      },
      save() {
        this.dialogVisible = false
        this.afterLinkChange && this.afterLinkChange(this.selectedLink)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import 'urlSelector';
</style>
