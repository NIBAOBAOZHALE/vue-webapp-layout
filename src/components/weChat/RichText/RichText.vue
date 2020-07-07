<template>
  <div class="RichText">
    <editor
      :init="tinymceInit"
      id="tinymceEditor"
      v-bind="$attrs"
      v-model="text"
      v-on="$listeners"
    ></editor>
  </div>
</template>

<script>
  import editor from '@tinymce/tinymce-vue'
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/icons/default/icons'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/plugins/textcolor'
  import 'tinymce/plugins/advlist'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/preview'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/hr'

  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 500
      },
      // 自定义宽度
      width: {
        type: Number,
        default: undefined
      }
    },
    model: {
      event: 'change'
    },
    components: {
      editor
    },
    watch: {
      text(val) {
        this.$emit('change', val)
      }
    },
    data() {
      return {
        text: this.value,
        tinymceInit: {}
      }
    },
    created() {
      console.log(this)
      this.tinymceInit = {
        skin_url: '/tinymce/skins/ui/oxide',
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        browser_spellcheck: true, // 拼写检查
        branding: false, // 去水印
        elementpath: false, // 禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        paste_data_images: false, // 不允许粘贴图像
        menubar: false, // 隐藏menu
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
        height: this.height,
        width: this.width
      }
    }
  }
</script>
