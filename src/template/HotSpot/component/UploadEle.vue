<script>
  import http from '../../../utils/http'
  export default {
    name: 'UploadEle',
    data() {
      return {
        progress: 0
      }
    },
    created() {},
    methods: {
      handleChange(e) {
        let file = e.target.files[0]
        if (this.judgeFile(file)) {
          this.uploadFile(file)
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
        http
          .runAjax('post', '/photo', formData)
          .then(res => {
            this.$emit('editImgUrl', res)
          })
          .catch(err => {
            this.$message({
              type: 'warning',
              message: err,
              center: true
            })
          })
      }
    },
    render() {
      let { handleChange, progress } = this
      return (
        <div class="upload-ele">
          <label for="upload">点击上传{progress}</label>
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
      background-color: #f5f7fa;
      border: 1px solid #cecece;
      transition: background-color 0.2s;
      &:hover {
        background-color: #fff;
      }
    }
  }
</style>
