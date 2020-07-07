<template>
  <div class="carousel">
    <div
      :style="{
        height: dataObj.component.height / 2 + 'px'
      }"
      class="block"
    >
      <el-carousel
        :interval="
          (dataObj.component.interval && dataObj.component.interval * 1000) ||
            undefined
        "
        :style="{
          height: dataObj.component.height / 2 + 'px',
          borderRadius:
            Boolean(dataObj.component.borderRadius) === true ? '10px' : ''
        }"
        arrow="never"
        v-if="show && dataObj.component.data.length"
      >
        <el-carousel-item
          :key="index"
          v-for="(item, index) of dataObj.component.data"
        >
          <!--                        <h3 class="small">{{ item }}</h3>-->
          <img
            :src="item.imageUrl"
            alt=""
            style="height: 100%; width: 100%;"
            v-if="item.imageUrl"
          />
        </el-carousel-item>
      </el-carousel>
      <img
        alt=""
        src="../assets/images/轮播图-占位.png"
        style="height: 100%; width: 101%;"
        v-else-if="!dataObj.component.data.length"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Carousel',
    props: ['dataObj'],
    data() {
      return {
        show: true
      }
    },
    computed: {
      carouselInterval() {
        return this.dataObj.component.interval
      }
    },
    watch: {
      carouselInterval: function() {
        this.show = false
        setTimeout(() => {
          this.show = true
        }, 20)
      }
    },
    mounted() {
      console.log(this.dataObj)
    },
    methods: {}
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .carousel {
    /*width: 345px !important;*/
    margin: 0 auto;
  }

  .block-style {
    width: 50px;
    margin: 6px 0 0 6px;
    height: 20px;
    background: #eeeeee;
    font-size: 12px;
    color: #333333;
    text-align: center;
    line-height: 20px;
  }

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
    /*min-height: 200px;*/
  }

  /deep/ .el-carousel--horizontal {
    // overflow-x: inherit
  }

  /deep/ .el-carousel__container {
    height: 100%;
  }

  /deep/ button.el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50px;
  }
</style>
