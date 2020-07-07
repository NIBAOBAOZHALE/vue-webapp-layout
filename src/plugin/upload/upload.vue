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
            <url-selector
              :after-link-change="receiveLink(item.id)"
              :link="item.link ? item.link.miniUri || item.link.webUri : ''"
              :name="item.link ? item.link.name : ''"
            ></url-selector>
          </div>
          <div class="input-box" v-if="enableTitle">
            <span>导航名称</span>
            <input
              :placeholder="item.title ? item.title : '建议4个字以内'"
              @input="inputData($event, index)"
              maxlength="7"
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
  import { uploadImage } from '@/api/wxApi/upload'
  import urlSelector from '@/components/aliPay/urlSelector/urlSelector'
  import { findMaxItem } from '@/utils/tools'

  export default {
    name: 'uploadImg',
    components: { urlSelector },
    props: {
      array: {
        type: Array
      },
      enableHandleBox: {
        type: Boolean,
        default: function() {
          return true
        }
      },
      enableTitle: {
        type: Boolean
      },
      itemLimit: {
        type: Number,
        default: 100
      },
      uploadSuccessCallBack: {
        type: Function
      },
      tip: {
        type: String
      }
    },

    data() {
      return {
        open: false,
        fileList: [],
        myinputdata: [],
        imgList: [],
        editId: 0,
        input: ''
      }
    },
    computed: {},
    watch: {
      array: function() {
        //
        if (this.array) {
          let newArr = Object.assign([], this.array)
          this.array.forEach((item, index) => {
            newArr['id'] = index + 1
            newArr['url'] = item.url
          })
          this.imgList = newArr
        }
      }
    },
    created() {
      //
      if (this.array) {
        let newArr = JSON.parse(JSON.stringify(this.array))
        this.array.forEach((item, index) => {
          newArr['id'] = index + 1
          newArr['url'] = item.url
        })
        this.imgList = newArr
      }
    },
    methods: {
      addItem() {
        this.imgList.push({
          id: this.imgList.length + 1
        })
      },
      clearTitle(event) {
        console.log(event)
        event.target.value = ''
      },
      inputData(event, itemIndex) {
        let index = 0
        for (let item of this.imgList) {
          if (index === itemIndex) {
            item['title'] = event.target.value
            break
          }
          index = index + 1
        }
        this.$emit('postMessage', Object.assign([], this.imgList))
        this.input = ''
      },
      receiveLink(id) {
        return function(link) {
          console.log(link)
          console.log(id)
          for (let item of this.imgList) {
            if (item.id == id) {
              item['link'] = { ...link }
            }
          }
          this.$emit(
            'postMessage',
            Object.assign([], this.imgList),
            this.myinputdata
          )
        }.bind(this)
      },
      removeItem(id) {
        let index = 0
        for (let item of this.imgList) {
          if (item.id === id) {
            this.imgList.splice(index, 1)
            break
          }
          index = index + 1
        }
        this.$emit('postMessage', Object.assign([], this.imgList))
      },
      removeNullItem() {
        return Object.assign([], this.imgList)
      },
      uploadImg(content) {
        const formData = new FormData()
        formData.append('uploadFile', content.file)
        uploadImage(formData)
          .then(res => {
            this.uploadSuccess(res.data.url)
            if (this.uploadSuccessCallBack) {
              this.uploadSuccessCallBack(res)
            }
          })
          .catch(err => {
            console.log(err)
            this.$message({
              message: err.message,
              type: 'error',
              duration: 5 * 1000
            })
          })
      },
      uploadSuccess(url, id) {
        // console.log(res)
        // console.log(file.raw);
        // let src = window.URL.createObjectURL(file.raw);
        if (id) {
          for (let item of this.imgList) {
            if (item.id === id) {
              item['url'] = url
              break
            }
          }
          this.$emit(
            'postMessage',
            Object.assign([], this.imgList),
            this.myinputdata
          )
        } else {
          if (this.imgList.length > 0) {
            this.imgList.push({
              id: parseInt(findMaxItem(this.imgList).id + 1),
              url: url
            })
          } else {
            this.imgList.push({
              id: this.imgList.length + 1,
              url: url
            })
          }
          this.$emit(
            'postMessage',
            Object.assign([], this.imgList),
            this.myinputdata
          )
        }
      },
      replaceImg(id) {
        return function(content) {
          const formData = new FormData()
          formData.append('uploadFile', content.file)
          uploadImage(formData)
            .then(res => {
              this.uploadSuccess(res.data.url, id)
              if (this.uploadSuccessCallBack) {
                this.uploadSuccessCallBack(res)
              }
            })
            .catch(err => {
              console.log(err)
              this.$message({
                message: err.message,
                type: 'error',
                duration: 5 * 1000
              })
            })
        }.bind(this)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @import 'upload';
</style>
