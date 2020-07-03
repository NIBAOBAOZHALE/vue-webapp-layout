<template>
  <div class="hot-spot">
    <img
      :src="dataObj.component.imageHotSpotUrl"
      v-if="dataObj.component.imageHotSpotUrl"
      fit="contain"
      style="width: 100%; height: 100%;"
      :style="{ borderRadius: dataObj.component.borderRadius ? '10px' : '' }"
    />
    <img
      v-if="!dataObj.component.imageHotSpotUrl"
      src="../assets/images/图片热点-占位.png"
      alt=""
      :style="{ borderRadius: dataObj.component.borderRadius ? '10px' : '' }"
    />
  </div>
</template>

<script>
  export default {
    name: 'HotSpot',
    props: ['dataObj'],
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
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
