<template>
  <div class="header">
    <template v-if="initData">
      <template v-for="(item, index) of initData">
        <img :src="item.response.files.file" :key="index" alt="" width="100%" />
      </template>
    </template>
    <template v-else>
      ImageComp
    </template>
  </div>
</template>

<script>
  export default {
    name: 'ImageComp',
    props: {
      data: {
        type: Object
      }
    },
    computed: {
      initData() {
        console.log(this.data['files'])
        return this.data['files']
      }
    }
  }
</script>

<style scoped type="text/scss" lang="scss" rel="stylesheet">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 200px;
    /*background: #42b983;*/
    color: #3f3f3f;
  }
</style>
