<template>
  <div class="hot-spot">
    <el-image
      :src="dataObj.component.imageHotSpotUrl"
      fit="contain"
      style="width: 100%; height: 100%;"
      v-if="dataObj.component.imageHotSpotUrl"
    ></el-image>
    <img
      alt=""
      src="../assets/images/图片热点-占位.png"
      v-if="!dataObj.component.imageHotSpotUrl"
    />
  </div>
</template>

<script>
  export default {
    name: 'HotSpot',
    props: ['dataObj'],
    data() {
      return {
        image: require('../assets/images/crop.png')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hot-spot {
    width: 100%;
  }

  .hot {
    width: 70px;
    margin: 6px 0 0 6px;
    height: 20px;
    background: #eeeeee;
    font-size: 12px;
    color: #333333;
    text-align: center;
    line-height: 20px;
  }

  .tip {
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
