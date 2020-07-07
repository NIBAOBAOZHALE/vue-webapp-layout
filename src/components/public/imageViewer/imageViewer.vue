<template>
  <div style="display: flex;">
    <div class="img-box" style="position: relative;">
      <img
        :src="imageUrl"
        :style="{ width: width, height: height }"
        alt=""
        style="border-radius: 4px; overflow: hidden;"
        v-bind="$attrs"
        v-if="imageUrl"
        v-on="$listeners"
      />
      <img
        @click="$emit('delete')"
        alt=""
        class="delete-button"
        src="./assets/images/删除图标.png"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'imageViewer',
    props: {
      imageUrl: {
        required: true,
        type: [String, Number]
      },
      width: {
        type: [String],
        default: '100px'
      },
      height: {
        type: [String],
        default: '100px'
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped type="text/scss">
  img.delete-button {
    width: 15px;
    height: 15px;
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
</style>
