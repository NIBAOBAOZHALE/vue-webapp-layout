<template>
  <div class="main-container image-hot-spot-preview">
    <div class="percent-container" style="width: 438px;" v-if="imageUrl">
      <div ref="parent" style="position: relative; width: 438px;">
        <el-image
          :src="imageUrl"
          fit="contain"
          style="width: 438px; display: block; position: relative;"
          @load="imageLoaded"
        >
        </el-image>
        <template v-for="(item, index) of hotSpotArr">
          <vue-draggable-resizable
            :h="Number($lodash.ceil(parentHeight * item.height))"
            :key="index"
            :w="Number($lodash.ceil(parentWidth * item.width))"
            :x="$lodash.ceil(parentWidth * item.x)"
            :y="$lodash.ceil(parentHeight * item.y)"
            @dragging="onDrag(...arguments, index)"
            @resizing="onResize(...arguments, index)"
            :parent="true"
            v-if="draggableShow && hotSpotArr.length > 0 && imgLoaded"
            :draggable="false"
            :handles="[]"
            style="top:0;"
            @click.native="toLink(item)"
            title="点击打开绑定的地址"
          >
            <p style="cursor: pointer">
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
      },
      toLink({ link }) {
        console.log(link)
        if (link.url && link.url.length > 0) {
          window.open(link.url)
        }
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
