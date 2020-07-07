<template>
  <div class="template-selector">
    <el-popover
      :append-to-body="false"
      :visible-arrow="false"
      placement="bottom"
      popper-class="template-selector-popper"
      ref="popover4"
      v-model="visible"
      width="435"
    >
      <div style="position: relative;">
        <div class="mask"></div>
        <!--        <div class="module">-->
        <!--          <div class="module-name">系统模板</div>-->
        <!--          <div class="template-list-box">-->
        <!--            <el-radio-group v-model="radio">-->
        <!--              <el-radio-->
        <!--                v-for="(item, index) of templateList"-->
        <!--                :key="index"-->
        <!--                :label="item.id"-->
        <!--              >-->
        <!--                <div class="template-name">{{ item.name }}</div>-->
        <!--                <div class="remove-template">-->
        <!--                  <div class="symbol" v-show="item.id != radio">+</div>-->
        <!--                </div>-->
        <!--              </el-radio>-->
        <!--            </el-radio-group>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="module">
          <div class="module-name">自定义页面</div>
          <div class="template-list-box">
            <el-radio-group v-model="radio">
              <el-radio
                :key="index"
                :label="item.id"
                v-for="(item, index) of templateList"
              >
                <div class="template-name">{{ item.name }}</div>
                <div class="remove-template">
                  <div class="symbol" v-show="item.id != radio">+</div>
                </div>
              </el-radio>
            </el-radio-group>
            <!--            <div class="add-template">-->
            <!--              +-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </el-popover>
    <div class="popover-btn" v-popover:popover4>
      <div v-if="!templateName">选择模板</div>
      <div v-else-if="templateName">{{ templateName }}</div>
      <div><img alt="" src="assets/img/sanjiao.png" /></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TemplateSelector',
    props: {
      onTemplateSelected: {
        type: Function
      },
      templateList: {
        type: Array,
        default() {
          return [
            { name: '会员卡模板', pageID: 1 },
            { name: '百货商超', pageID: 2 },
            { name: '中秋节秒杀活动页', pageID: 3 },
            { name: '生鲜便利', pageID: 4 }
          ]
        }
      },
      selectedTemplateId: {},
      afterDeleteSuccess: {
        type: Function
      },
      templateName: {
        type: String
      }
    },
    data() {
      return {
        radioValue: '会员卡模板',
        radio: '',
        visible: false
      }
    },
    activated() {
      console.log('激活popper！！！！')
      this.radio = this.selectedTemplateId
    },
    created() {
      this.radio = this.selectedTemplateId
    },
    watch: {
      selectedTemplateId(val) {
        this.radio = val
      }
    },

    methods: {
      addTemplate() {
        this.$emit('addTemplate', true)
      },
      addPage() {
        this.$emit('addPage', true)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import '../../../style';
  @import 'TemplateSelector';

  .template-selector {
    position: relative;
    width: 180px;
    margin-left: 12px;
    color: rgba(95, 91, 89, 1);
    display: flex;
    box-sizing: border-box;
    padding-top: 8px;
    padding-left: 11px;

    .popper {
      position: absolute;
      top: 0;
      left: 0;
      width: 400px;
      height: 150px;
      background: yellowgreen;
      z-index: 2000;
    }

    /deep/ .template-selector-popper {
      top: 27px !important;
      left: 11px !important;
      border-radius: 0 !important;
      box-shadow: none;
      border: #ddd1c6 1px solid;

      .mask {
        position: absolute;
        width: 167px;
        height: 1px;
        background: #ffffff;
        z-index: 1;
        left: -12px;
        top: -13px;
      }

      .module {
        padding-bottom: 22px;

        .module-name {
          padding-bottom: 19px;
        }

        .el-radio__label {
          display: flex;
          justify-content: space-between;
          width: 100%;
          position: relative;

          .remove-template {
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            opacity: 0;

            &:hover {
              opacity: 1;
            }

            .symbol {
              transform: rotate(45deg);
              font-size: 24px;
              height: 18px;
              width: 24px;
            }
          }
        }

        .template-list-box {
        }
      }
    }
  }

  .popover-btn {
    height: 32px;
    width: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: #ddd1c6 1px solid;
    font-size: 14px;
    color: #5f5b59;
    box-sizing: border-box;
    padding: 0 11px;
    cursor: pointer;
    outline: none;
  }

  /deep/ .el-radio-group {
    display: flex;
    flex-wrap: wrap;

    .el-radio {
      display: flex;
      width: 200px;
      padding: 0 5px;
      margin: 0;
      margin-bottom: 10px;
      box-sizing: border-box;
    }

    .el-radio__label {
      display: flex;
      align-items: center;
    }
  }
</style>

<style></style>
