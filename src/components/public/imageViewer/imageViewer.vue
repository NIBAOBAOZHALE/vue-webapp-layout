<template>
  <div style="display: flex;">
    <div class="img-box" style="position: relative;">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt=""
        :style="{ width: width, height: height }"
        style="border-radius: 4px; overflow: hidden;"
        v-on="$listeners"
        v-bind="$attrs"
      />
      <img
        class="delete-button"
        src="./assets/images/删除图标.png"
        @click="$emit('delete')"
        alt=""
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
        default: ''
      },
      height: {
        type: [String],
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  img.delete-button {
    width: 15px;
    height: 15px;
    position: absolute;
    right: -10px;
    top: -10px;
    cursor: pointer;
  }
</style>
