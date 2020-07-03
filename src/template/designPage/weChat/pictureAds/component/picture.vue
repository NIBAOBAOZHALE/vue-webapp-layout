<template>
  <div style="width: 100%;" @click="toLink" class="picture-ads">
    <template v-if="dataObj.component.imageUrl">
      <!--                        <h3 class="small">{{ item }}</h3>-->
      <img
        :src="dataObj.component.imageUrl && dataObj.component.imageUrl"
        alt=""
        style="height: 100%; width: 100%;"
        :style="{ borderRadius: dataObj.component.borderRadius ? '10px' : '' }"
      />
    </template>
    <template v-else>
      <img src="../assets/images/图片组件-占位.png" alt="" />
    </template>
  </div>
</template>
<script>
  export default {
    name: 'pictureAds',
    props: ['dataObj'],
    data() {
      return {}
    },
    computed: {},
    mounted() {
      console.log(this.dataObj)
    },
    methods: {
      toLink() {
        alert(99)
        if (this.dataObj.component.link) {
          window.location.href = this.dataObj.component.link
          alert(99)
        }
      }
    },
    watch: {}
  }
</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet">
  // .picture-ads {
  //   margin: 0 15px;
  // }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .carousel {
    width: 100%;
  }
  /deep/.el-carousel--horizontal {
    overflow-x: inherit;
  }
</style>
