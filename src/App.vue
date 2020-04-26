<template>
  <div id="app">
    <HotSpotForm
      class="hot-Spot-form"
      @postModelData="onDataPost"
    ></HotSpotForm>
    <image-hot-spot-preview
      class="image-hot-spot-preview"
      :hot-spot-arr="dataObj.component.data"
      :image-url="dataObj.component.imageHotSpotUrl"
    ></image-hot-spot-preview>
  </div>
</template>

<script>
  import HotSpotForm from './template/HotSpot/form/HotSpotForm'
  import ImageHotSpotPreview from './components/ImageHotSpot/ImageHotSpotPreview'
  export default {
    name: 'App',
    components: {
      HotSpotForm,
      ImageHotSpotPreview
    },
    data() {
      return {
        dataObj: {
          component: {
            data: [],
            type: '图片热点',
            imageId: 1358,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            imageHotSpotUrl: require('./assets/可回收-玻璃类.png')
          }
        }
      }
    },
    methods: {
      onDataPost(value) {
        console.log(value)
        this.dataObj = value
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    .hot-Spot-form {
      flex-shrink: 0;
      width: 438px;
      border: 1px solid #ebebeb;
    }
    .image-hot-spot-preview {
      flex-shrink: 0;
      width: 438px;
      border: 1px solid #ebebeb;
      margin-left: 50px;
    }
  }
</style>
