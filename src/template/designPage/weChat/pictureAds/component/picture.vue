<template>
  <div @click="toLink" class="picture-ads" style="width: 100%;">
    <template v-if="dataObj.component.imageUrl">
      <!--                        <h3 class="small">{{ item }}</h3>-->
      <img
        :src="dataObj.component.imageUrl && dataObj.component.imageUrl"
        :style="{ borderRadius: dataObj.component.borderRadius ? '10px' : '' }"
        alt=""
        style="height: 100%; width: 100%;"
      />
    </template>
    <template v-else>
      <img alt="" src="../assets/images/图片组件-占位.png" />
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

<style lang="scss" rel="stylesheet" scoped type="text/scss">
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

  /deep/ .el-carousel--horizontal {
    overflow-x: inherit;
  }
</style>
