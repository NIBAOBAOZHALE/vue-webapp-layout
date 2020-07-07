<template>
  <div class="points-mall">
    <div class="top-box" v-show="dataObj.component.enableTitle">
      <div class="info-box">
        <div class="left-box">积分商城</div>
        <div class="right-box">更多<span>></span></div>
      </div>
    </div>
    <div class="bottom-box" v-if="dataObj.component.data.length < 1">
      <div class="item">
        <div class="image">
          <img :src="img" alt="" />
        </div>
        <div class="info-box">
          <div class="title">(示例)百草味坚果礼盒代金劵3…</div>
          <div class="count">
            <div class="current-count">20000<span>积分</span></div>
            <div class="origin-count">￥218</div>
          </div>
        </div>
      </div>
      <div class="item" style="">
        <div class="image">
          <img :src="img" alt="" />
        </div>
        <div class="info-box">
          <div class="title">百草味坚果礼盒代金劵3…</div>
          <div class="count">
            <div class="current-count">20000<span>积分</span></div>
            <div class="origin-count">￥218</div>
          </div>
        </div>
      </div>
      <div class="item" style="">
        <div class="image">
          <img :src="img" alt="" />
        </div>
        <div class="info-box">
          <div class="title">(示例)百草味坚果礼盒代金劵3…</div>
          <div class="count">
            <div class="current-count">20000<span>积分</span></div>
            <div class="origin-count">￥218</div>
          </div>
        </div>
      </div>
      <div class="item" style="">
        <div class="image">
          <img :src="img" alt="" />
        </div>
        <div class="info-box">
          <div class="title">(示例)百草味坚果礼盒代金劵3…</div>
          <div class="count">
            <div class="current-count">20000<span>积分</span></div>
            <div class="origin-count">￥218</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box" v-else-if="dataObj.component.data.length >= 1">
      <div
        :key="index"
        class="item"
        v-for="(item, index) of dataObj.component.data"
      >
        <div class="image">
          <el-image :fit="'contain'" :src="imageBaseUrl + item.picUrl" alt="" />
        </div>
        <div class="info-box">
          <div class="title">{{ item.prodName }}</div>
          <div class="count">
            <div class="current-count">{{ item.point }}<span>积分</span></div>
            <div class="origin-count"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PointsMall',
    props: ['dataObj'],
    data() {
      return {
        img: require('@/assets/img/points-mall.png')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .points-mall {
    box-sizing: border-box;
    width: 345px;
    margin: 0 auto;
  }

  .top-box {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-top: 10px;

    .info-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;

      .left-box {
        font-size: 15px;
        font-weight: bold;
      }

      .right-box {
        font-size: 12px;
        color: #c0c0c0;

        > span {
          padding-left: 5px;
        }
      }
    }
  }

  .bottom-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .item:nth-child(even) {
      padding-left: 10px;
      width: 158px;
    }

    .item {
      display: flex;
      flex-wrap: wrap;
      width: 168px;
      padding-bottom: 20px;
      padding-top: 5px;

      .image {
        width: 168px;
        height: 168px;
        background: #f1f1f1;

        img {
          background: #f1f1f1;
        }
      }
    }

    .info-box {
      width: 100%;
      padding-top: 15px;

      .title {
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #333333;
      }

      .count {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 15px;

        .current-count {
          color: #ff7300;
          font-size: 14px;

          > span {
            font-size: 9px;
            padding-left: 2px;
            display: inline-block;
          }
        }

        .origin-count {
          color: #a1a1a1;
          font-size: 10px;
          text-decoration: line-through;
        }
      }
    }
  }
</style>
