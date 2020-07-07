<template>
  <div class="upload-img-box">
    <!--        <template v-if="!array">-->
    <!--            <div @click="open=true">点击上传图片</div>-->
    <!--        </template>-->
    <template v-for="(item, index) of imgList">
      <div :key="index" class="item" v-if="item.url">
        <div class="title-and-handle" v-if="item.url">
          <div class="title">图片</div>
          <div @click="removeItem(item.id)" class="close">
            <img :src="require('./assets/img/close-b.png')" alt="" />
          </div>
        </div>
        <div class="image-container">
          <div class="img-box">
            <!--            <img :src="item.url" alt="" style="height: 100%;width: 100%" v-if="item.url">-->
            <div class="image" v-if="item.url">
              <el-upload
                :headers="{
                  'Content-Type': 'multipart/form-data'
                }"
                :http-request="replaceImg(item.id)"
                :show-file-list="false"
                action="/api/common/uploadImg.api"
                class="upload-demo"
              >
                <el-image
                  :src="imageBaseUrl + item.url"
                  fit="scale-down"
                  style="height: 100% !important; width: 100% !important;"
                ></el-image>
              </el-upload>
            </div>
            <!--          <div-->
            <!--            @click="uploadImg(item.id)"-->
            <!--            v-else-if="!item.url"-->
            <!--            class="image"-->
            <!--          ></div>-->
          </div>
          <div class="handle-box" v-if="enableHandleBox">
            <!--                    <url-selector-->
            <!--                            :after-link-change="receiveLink(item.id)"-->
            <!--                            :link="item.link ? item.link.miniUri || item.link.webUri : ''"-->
            <!--                            :name="item.link ? item.link.name : ''"-->
            <!--                    ></url-selector>-->
            <url-selector-with-prod-selector
              :after-link-change="receiveLink(item.id)"
              :link="item.link ? item.link.miniUri || item.link.webUri : ''"
              :linkObj="item.link"
              :name="item.link ? item.link.name : ''"
            >
            </url-selector-with-prod-selector>
          </div>
          <div class="input-box" v-if="enableTitle">
            <span>导航名称</span>
            <input
              :placeholder="item.title ? item.title : '建议4个字以内'"
              @input="inputData($event, index)"
              style="
                margin-top: 16px;
                height: 40px;
                width: 100%;
                border-radius: 4px;
                outline: none;
                border: dashed 1px #d9d5d2;
                padding-left: 10px;
                box-sizing: border-box;
              "
            />
          </div>
        </div>
      </div>
    </template>

    <div class="caution">
      {{ tip }}
    </div>
    <div class="add-img" v-show="imgList.length < itemLimit || !imgList.length">
      <div class="box">
        <el-upload
          :headers="{
            'Content-Type': 'multipart/form-data'
          }"
          :http-request="uploadImg"
          :show-file-list="false"
          action="/api/common/uploadImg.api"
          class="upload-demo"
        >
          <span class="plus">
            +
          </span>
        </el-upload>
      </div>
    </div>

    <!--    <el-dialog :visible.sync="open">-->
    <!--      <span>图片选择器</span>-->
    <!--      <el-upload-->
    <!--        :file-list="fileList"-->
    <!--        :limit="1"-->
    <!--        :multiple="false"-->
    <!--        :on-success="uploadSuccess"-->
    <!--        action="https://jsonplaceholder.typicode.com/posts/"-->
    <!--        class="upload-demo"-->
    <!--      >-->
    <!--        <el-button size="small" type="primary">点击上传</el-button>-->
    <!--      </el-upload>-->
    <!--    </el-dialog>-->
  </div>
</template>

<script>
  import uploadImg from '@/components/weChat/upload/upload.vue'
  import UrlSelectorWithProdSelector from '@/components/weChat/Url&ProductSelector/UrlSelectorWithProdSelector'

  export default {
    name: 'ImgUploadWithProdSelector',
    extends: uploadImg,
    components: { UrlSelectorWithProdSelector },
    created() {}
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import '../upload/upload.scss';
</style>
