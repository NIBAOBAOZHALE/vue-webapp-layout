<template>
  <div class="template-selector">
    <el-popover
      ref="popover4"
      placement="bottom"
      width="435"
      :visible-arrow="false"
      popper-class="template-selector-popper"
      :append-to-body="false"
      v-model="visible"
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
        <!--                :label="item.pageID"-->
        <!--              >-->
        <!--                <div class="template-name">{{ item.name }}</div>-->
        <!--                <div class="remove-template">-->
        <!--                  <div class="symbol" v-show="item.pageID != radio">+</div>-->
        <!--                </div>-->
        <!--              </el-radio>-->
        <!--            </el-radio-group>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="module">
          <div class="module-name">自定义页面</div>
          <div class="template-list-box">
            <el-radio-group v-model="radio" @change="handlePageIdChange">
              <el-radio
                v-for="(item, index) of templateList"
                :key="index"
                :label="item.pageID"
              >
                <div class="template-name">{{ item.name }}</div>
                <label class="handle-box">
                  <div class="remove-template">
                    <div
                      class="symbol"
                      v-show="item.pageID != radio && item.status !== 'A'"
                      @click.stop="removePage(item.pageID)"
                    >
                      +
                    </div>
                  </div>
                  <div class="applied" v-if="item.status === 'A'">应用中</div>
                </label>
              </el-radio>
              <div class="add-template">
                <el-button class="primary" icon="el-icon-plus" @click="addPage"
                  >自定义页</el-button
                >
                <el-button
                  class="warning"
                  icon="el-icon-plus"
                  @click="addTemplate"
                  >通用模板</el-button
                >
              </div>
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
      <div><img src="assets/img/sanjiao.png" alt="" /></div>
    </div>
  </div>
</template>

<script>
  import TemplateSelector from '@/components/weChat/TemplateSelector/TemplateSelector'
  import { removeWeChatMiniPage } from '@/api/wxApi/config'

  export default {
    name: 'customizeTemplateSelector',
    extends: TemplateSelector,
    props: ['selectedTemplateId'],
    data() {
      return {}
    },
    methods: {
      handlePageIdChange(id) {
        console.log(id)
        this.onTemplateSelected && this.onTemplateSelected(id)
      },
      removePage(id) {
        console.log('删除')
        console.log(id)
        this.messageBoxConfirm('确认删除？', '删除模板')
          .then(() => {
            removeWeChatMiniPage(id)
              .then(() => {
                this.popMessage('success', '删除成功')
                this.afterDeleteSuccess && this.afterDeleteSuccess(id)
              })
              .catch(err => {
                console.log(err)
                this.popMessage('error', err.data.msg)
              })
          })
          .catch(() => {})
      }
    },
    created() {}
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet">
  @import '../../../style';
  @import '../../../components/weChat/TemplateSelector/TemplateSelector';
</style>
