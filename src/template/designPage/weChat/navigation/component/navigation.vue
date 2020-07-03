<template>
  <div class="top_navigate">
    <template v-if="Number(dataObj.component.data.length) === 0">
      <img
        v-show="
          Number(dataObj.component.data.length) === 0 &&
            Number(dataObj.component.direction) === 0
        "
        src="../assets/images/功能导航-横向排列占位.png"
        alt=""
      />

      <img
        v-show="
          Number(dataObj.component.data.length) === 0 &&
            Number(dataObj.component.direction) === 1
        "
        src="../assets/images/功能导航-纵向排列占位.png"
        alt=""
      />
    </template>

    <template v-if="dataObj.component.data.length">
      <!--横向展示多行-->
      <div
        v-if="
          Number(dataObj.component.direction) === 0 &&
            Number(dataObj.component.rowStyle) === 0
        "
        class="item-wrapper"
      >
        <div
          class="url"
          v-for="(item, index) of dataObj.component.data"
          :key="index"
          :class="[multiRowWidthStyleClass]"
        >
          <img
            v-if="dataObj.component.enableImg && item.imageUrl"
            :src="item.imageUrl"
            alt
          />
          <img
            v-else-if="dataObj.component.enableImg && !item.url"
            src="../assets/images/暂无图标.png"
            alt=""
          />
          <div class="text" :style="{ color: item.fontColor }">
            {{ item.title }}
          </div>
        </div>
      </div>
      <!--横向展示单行-->
      <div
        v-else-if="
          Number(dataObj.component.direction) === 0 &&
            Number(dataObj.component.rowStyle) === 1
        "
        class="item-wrapper"
        :class="[dataObj.component.data.length >= 3 ? 'much' : '']"
      >
        <div
          class="url"
          v-for="(item, index) of dataObj.component.data"
          :key="index"
          style="width: 22%; overflow: hidden;"
        >
          <img
            v-if="dataObj.component.enableImg && item.imageUrl"
            :src="item.imageUrl"
            alt
          />
          <img
            v-else-if="dataObj.component.enableImg && !item.url"
            src="../assets/images/暂无图标.png"
            alt=""
          />
          <div class="text" :style="{ color: item.fontColor }">
            {{ item.title }}
          </div>
        </div>
      </div>

      <!--纵向展示-->
      <div
        v-else-if="Number(dataObj.component.direction) === 1"
        class="portrait"
      >
        <div
          v-for="(item, index) of dataObj.component.data"
          :key="index"
          class="line"
        >
          <div class="left-box">
            <img v-if="dataObj.component.enableImg" :src="item.imageUrl" alt />
            <div class="text" :style="{ color: item.fontColor }">
              {{ item.title }}
            </div>
          </div>
          <div class="right-box">
            <img src="../assets/images/箭头.png" alt="" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'navigation',
    props: ['dataObj'],
    data() {
      return {
        switchs: true
      }
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      multiRowWidthStyleClass: function() {
        if (this.dataObj.component.numberOfRowItems) {
          console.log(this.dataObj.component.numberOfRowItems)
          const styleMap = {
            1: 'one-item',
            2: 'two-item',
            3: 'three-item',
            4: 'four-item',
            5: 'five-item'
          }
          return styleMap[this.dataObj.component.numberOfRowItems]
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .top_navigate {
    /*width: 345px;*/
    margin: 0 auto;
    width: 100%;
  }
  .navigate {
    width: 70px;
    margin: 6px 0 0 6px;
    height: 20px;
    background: #eeeeee;
    font-size: 12px;
    color: #333333;
    text-align: center;
    line-height: 20px;
  }
  .portrait {
    border-radius: 20px 20px 20px 20px;
    min-height: 54px;
    overflow: hidden;
    /*width: 360px;*/
    background: #ffffff;
    padding: 0 15px;
    .line {
      width: 100%;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f9f9f9;
      // padding-left: 15px;
      > .left-box {
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        .text {
          margin-left: 10px;
        }
      }
      > .right-box {
        img {
          width: 14px;
        }
      }
    }
  }
  .much {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap !important;
  }
  .item-wrapper {
    /*height: 85px;*/
    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .one-item {
      width: 100%;
    }
    .two-item {
      width: 50%;
    }
    .three-item {
      width: 33%;
    }
    .four-item {
      width: 25%;
    }
    .five-item {
      width: 20%;
    }
    .url {
      display: flex;
      flex-wrap: wrap;
      flex-shrink: 0;
      text-align: center;
      justify-content: center;
      padding-top: 12px;
      /*width: 25%;*/
      height: 100%;
      box-sizing: border-box;
      img {
        width: 40px;
        height: 40px;
      }
      .text {
        overflow: hidden;
        font-size: 12px;
        margin-top: 5px;
        /*height: 40px;*/
        height: 20px;
        width: 100%;
      }
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }
  .main {
    width: 345px;
    margin: 0 auto;
    overflow-y: hidden;
    white-space: nowrap;
    .three {
      min-width: 22.5% !important;
      text-align: center;
    }
  }
  .border-radius {
    > div {
      border-radius: 10px;
    }
  }
</style>
