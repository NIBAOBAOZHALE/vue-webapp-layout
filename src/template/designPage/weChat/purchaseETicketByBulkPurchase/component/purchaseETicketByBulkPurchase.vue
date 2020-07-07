<template>
  <div class="purchase-ETicket-by-bulk-purchase">
    <div class="top-box" v-show="dataObj.component.enableTitle">
      <div class="info-box">
        <div class="left-box">拼团专区</div>
        <div class="right-box">更多<span>></span></div>
      </div>
    </div>
    <div class="ticket" v-if="dataObj.component.data.length < 1">
      <div class="item">
        <div class="left-container">
          <div class="image">
            <img :src="img" alt="" />
          </div>
        </div>
        <div class="right-container">
          <div class="top-wrapper">
            <div class="info-box">
              <div class="title">
                (示例)YSL 003色号鳍光唇膏唇膏唇膏唇膏唇膏唇
              </div>
              <div class="sales">已拼300件</div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="count-box">
              <span class="symbol">￥</span>
              <span class="count">342.09</span>
              <span class="origin-count">￥509</span>
            </div>
            <div class="handle-box">
              <div class="text">马上抢</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left-container">
          <div class="image">
            <img :src="img" alt="" />
          </div>
        </div>
        <div class="right-container">
          <div class="top-wrapper">
            <div class="info-box">
              <div class="title">YSL 003色号鳍光唇膏唇膏唇膏唇膏唇膏唇</div>
              <div class="sales">已拼300件</div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="count-box">
              <span class="symbol">￥</span>
              <span class="count">342.09</span>
              <span class="origin-count">￥509</span>
            </div>
            <div class="handle-box">
              <div class="text">马上抢</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left-container">
          <div class="image">
            <img :src="img" alt="" />
          </div>
        </div>
        <div class="right-container">
          <div class="top-wrapper">
            <div class="info-box">
              <div class="title">YSL 003色号鳍光唇膏唇膏唇膏唇膏唇膏唇</div>
              <div class="sales">已拼300件</div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="count-box">
              <span class="symbol">￥</span>
              <span class="count">342.09</span>
              <span class="origin-count">￥509</span>
            </div>
            <div class="handle-box">
              <div class="text">马上抢</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ticket" v-if="dataObj.component.data.length > 0">
      <div
        :key="index"
        class="item"
        v-for="(item, index) of dataObj.component.data"
      >
        <div class="left-container">
          <div class="image">
            <el-image
              :fit="'contain'"
              :src="imageBaseUrl + item.picUrl"
              alt=""
            />
          </div>
        </div>
        <div class="right-container">
          <div class="top-wrapper">
            <div class="info-box">
              <div class="title">{{ item.prodName }}</div>
              <div class="sales">已拼300件</div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="count-box">
              <span class="symbol">￥</span>
              <span class="count">{{ formatAccount(item.price) }}</span>
              <span class="origin-count"
                >￥{{ formatAccount(item.oriPrice) }}</span
              >
            </div>
            <div class="handle-box">
              <div class="text">马上抢</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'purchaseETicketByBulkPurchase',
    props: ['dataObj'],
    data() {
      return {
        img: require('@/assets/img/purchase-e-ticket-by-bulk-purchase-form.png')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .purchase-ETicket-by-bulk-purchase {
    box-sizing: border-box;
    width: 345px;
    margin: 0 auto;

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

    .ticket {
      display: flex;
      flex-wrap: wrap;

      .item:first-child {
        margin-top: 0;
      }

      .item {
        box-shadow: #c1c1c17d 0 0 10px;
        border-radius: 12px;
        padding: 9px 9px;
        margin: 10px 0;
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;

        .image {
          height: 107px;
          width: 107px;
        }

        .right-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left: 10px;

          .top-wrapper {
            .info-box {
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;

              .title {
                color: #333333;
                font-size: 14px;
                line-height: 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 194px;
                display: flex;
                justify-content: flex-start;
              }

              .sales {
                color: #999999;
                background: #e0e0e0;
                font-size: 10px;
                display: inline-block;
                padding: 3px;
                margin-top: 5px;
                margin-left: 2px;
              }
            }
          }

          .bottom-wrapper {
            display: flex;
            justify-content: space-between;

            .count-box {
              color: #f7931e;
              display: flex;
              align-items: center;

              .symbol {
                font-size: 14px;
              }

              .count {
                font-size: 17px;
              }

              .origin-count {
                font-size: 9px;
                color: #b2b2b2;
                text-decoration: line-through;
                padding-left: 8px;
                padding-bottom: 2px;
              }
            }

            .handle-box {
              .text {
                color: #ffffff;
                font-size: 12px;
                padding: 8px 14px;
                background: linear-gradient(
                  232deg,
                  rgba(251, 174, 86, 1) 0%,
                  rgba(247, 147, 30, 1) 100%
                );
                border-radius: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
