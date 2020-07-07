<template>
  <div class="main-container image-hot-spot-preview">
    <div class="percent-container" style="width: 243px;" v-if="imageUrl">
      <div ref="parent" style="position: relative; width: 243px;">
        <el-image
          :src="imageUrl"
          @load="imageLoaded"
          fit="contain"
          style="width: 243px; display: block; position: relative;"
        >
        </el-image>
        <template v-for="(item, index) of hotSpotArr">
          <vue-draggable-resizable
            :draggable="false"
            :h="$lodash.ceil(parentHeight * item.height)"
            :handles="[]"
            :key="index"
            :parent="true"
            :w="$lodash.ceil(parentWidth * item.width)"
            :x="$lodash.ceil(parentWidth * item.x)"
            :y="$lodash.ceil(parentHeight * item.y)"
            @dragging="onDrag(...arguments, index)"
            @resizing="onResize(...arguments, index)"
            v-if="draggableShow && hotSpotArr.length > 0 && imgLoaded"
          >
            <p>
              {{ item.name ? item.name : '热点' + (index + 1) }}
            </p>
          </vue-draggable-resizable>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import imageArea from './ImageHotSpotArea'

  export default {
    extends: imageArea,
    name: 'preview-area',
    props: {
      hotSpotArr: {
        type: Array
      }
    },
    data() {
      return {
        imgLoaded: false
      }
    },
    methods: {
      imageLoaded() {
        this.$nextTick(() => {
          this.imgLoaded = true
          this.draggableShow = true
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  /deep/ .handle {
    background: none;
    border: 0;
  }

  /deep/ .resizable.vdr {
    border: 1px solid #155bd4;
    background: rgba(51, 136, 255, 0.5);
    /*font-size: 12px;*/
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  /deep/ .draggable {
    background: rgba(255, 255, 255, 1);
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
