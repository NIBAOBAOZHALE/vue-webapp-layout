<script>
  import http from '../../../utils/http'
  export default {
    name: 'UploadEle',
    data() {
      return {}
    },
    created() {
      http
        .runAjax('get', '/', { name: 'lichao' })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    methods: {
      handleChange(e) {
        let file = e.target.files[0]
        if (file.size >= 2 * 1024 * 1024 || !file.type.includes('image')) {
          this.$message({
            type: 'warning',
            message: '文件不符合标准',
            center: true
          })
        }
      }
    },
    render() {
      let { handleChange } = this
      return (
        <div class="upload-ele">
          <label for="upload">点击上传</label>
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
      border-radius: 10px;
      border: 1px solid #cecece;
    }
  }
</style>
