<template>
  <div id="app">
    <customize></customize>
  </div>
</template>

<script>
  import Customize from '@/views/weChatPages/customize/customize'
  export default {
    name: 'App',
    components: {
      Customize
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
        this.dataObj = value
      }
    }
  }
</script>

<style lang="scss">
  html {
    height: 100%;
    overflow: hidden;
  }
  body {
    height: 100%;
    margin: unset;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    .flex-box {
      display: flex;
    }
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
    .data-preview {
      width: 100%;
      .jv-container {
        width: 438px;
      }
    }
    /*.title {*/
    /*  margin: 10px 0;*/
    /*}*/
  }
</style>
