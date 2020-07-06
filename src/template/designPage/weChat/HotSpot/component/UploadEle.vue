<script>
  import { ajax } from '@/utils/http'
  export default {
    name: 'UploadEle',
    props: {
      value: String
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    data() {
      return {
        text: '点击上传',
        progress: '0%',
        isEnd: false //控制进度条消失
      }
    },
    methods: {
      handleChange(e) {
        this.isEnd = false
        let file = e.target.files[0]
        if (file) {
          if (this.judgeFile(file)) {
            this.text = '正在上传'
            this.uploadFile(file)
          }
        }
      },
      // 判断上传文件类型
      judgeFile(file) {
        let regArr = ['png', 'jpg', 'jpeg']
        if (
          file.size >= 2 * 1024 * 1024 ||
          !regArr.includes(file.name.split('.').pop())
        ) {
          this.$message({
            type: 'warning',
            message: '文件不符合标准',
            center: true
          })
          return false
        }
        return true
      },
      // 上传文件到服务端
      uploadFile(file) {
        let formData = new window.FormData()
        formData.append('file', file)
        ajax({
          url: '/photo',
          method: 'post',
          time: 10000,
          data: formData,
          progress: e => {
            this.handleProgress(e)
          }
        })
          .then(res => {
            this.$emit('editImgUrl', res)
            this.$emit('change', res)
            this.progress = 0
          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: err,
              center: true
            })
          })
      },
      // 处理文件上传时的进度
      handleProgress(e) {
        let progress = (e.loaded / e.total) * 100 + '%'
        if (progress === '100%') {
          this.text = '点击上传'
          this.isEnd = true
        }
        this.progress = progress
      }
    },
    render: function(h) {
      let { handleChange, progress, text, isEnd } = this
      return (
        <div class="upload-ele">
          <label for="upload">
            {text}
            <div
              class={`upload-ele-progress${isEnd ? ' end' : ''}`}
              style={{ width: `${progress}` }}
            ></div>
          </label>
          <input
            type="file"
            id="upload"
            v-show={0}
            on-change={e => handleChange(e)}
          />
        </div>
      )
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet" type="text/scss">
  .upload-ele {
    label {
      width: 100%;
      display: block;
      cursor: pointer;
      text-align: center;
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      background-color: #f5f7fa;
      border: 1px solid #cecece;
      transition: background-color 0.2s;
      &:hover {
        background-color: #fff;
      }
    }
    &-progress {
      top: 0;
      left: 0;
      height: 100%;
      position: absolute;
      transition: width 0.2s;
      background-color: rgba(160, 212, 236, 0.4);
      &.end {
        animation: backNormal 0.3s ease-in 0.1s both;
      }
    }
  }
  @keyframes backNormal {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
