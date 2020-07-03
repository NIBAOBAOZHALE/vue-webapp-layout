<template>
  <div class="e-ticket-center">
    <template v-if="dataObj.component.data.length === 0">
      <div class="e-ticket-center-top" v-show="dataObj.component.enableTitle">
        <div class="info-box">
          <div class="left-box">领券中心</div>
          <div class="right-box">更多<span>></span></div>
        </div>
      </div>
      <div class="ticket">
        <div class="item">
          <div class="e-ticket-center-bottom">
            <div class="info-box">
              <div class="image">
                <img src="@/assets/img/ticket.png" alt="" />
              </div>
              <div class="params">
                <div class="ticket-title">通用20元代金券(示例)</div>
                <div class="ticket-info">
                  <div class="ticket-count">20<span>元</span></div>
                  <div class="ticket-discount">满20.01可用</div>
                </div>
                <div class="date">活动时间：11.11-12-12</div>
              </div>
            </div>
            <div class="handle-box">
              <img src="../assets/images/剩余.png" alt="" />
              <div class="button orange-btn">领取</div>
            </div>
          </div>
        </div>

        <div class="item">
          <div class="e-ticket-center-bottom">
            <div class="info-box">
              <div class="image">
                <img src="@/assets/img/ticket.png" alt="" />
              </div>
              <div class="params">
                <div class="ticket-title">通用20元代金券(示例)</div>
                <div class="ticket-info">
                  <div class="ticket-count">20<span>元</span></div>
                  <div class="ticket-discount">满20.01可用</div>
                </div>
                <div class="date">活动时间：11.11-12-12</div>
              </div>
            </div>
            <div class="handle-box">
              <img src="../assets/images/已领取.png" alt="" />
              <div class="button blue-btn">使用</div>
            </div>
          </div>
        </div>

        <div class="item" style="filter: grayscale(1);">
          <div class="e-ticket-center-bottom">
            <div class="info-box">
              <div class="image">
                <img src="@/assets/img/ticket.png" alt="" />
              </div>
              <div class="params">
                <div class="ticket-title">通用20元代金券(示例)</div>
                <div class="ticket-info">
                  <div class="ticket-count">20<span>元</span></div>
                  <div class="ticket-discount">满20.01可用</div>
                </div>
                <div class="date">活动时间：11.11-12-12</div>
              </div>
            </div>
            <div class="handle-box">
              <img src="../assets/images/无.png" alt="" />
              <div class="button gray-btn">已抢光</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="dataObj.component.data.length !== 0">
      <div class="e-ticket-center-top" v-show="dataObj.component.enableTitle">
        <div class="info-box">
          <div class="left-box">领券专区</div>
          <div class="right-box">更多<span>></span></div>
        </div>
      </div>
      <div class="ticket">
        <div
          class="item"
          v-for="(item, index) of dataObj.component.data"
          :key="index"
        >
          <div class="e-ticket-center-bottom">
            <div class="info-box">
              <div class="image">
                <el-image :src="imageBaseUrl + item.picUrl"> </el-image>
              </div>
              <div class="params">
                <div class="ticket-title ellipsis">{{ item.prodName }}</div>
                <div class="ticket-info">
                  <div class="ticket-count">
                    {{ formatAccount(item.ticket.ticketFee) }}<span>元</span>
                  </div>
                  <div class="ticket-discount">
                    满{{ formatAccount(item.ticket.targetFee) }}可用
                  </div>
                </div>
                <div class="date">活动时间：11.11-12-12</div>
              </div>
            </div>
            <div class="handle-box">
              <img src="../assets/images/剩余.png" alt="" />
              <div class="button orange-btn">领取</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'ETicketCenter',
    props: ['dataObj'],
    data() {
      return {}
    },
    created() {
      console.log(process.env)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet" type="text/scss">
  .e-ticket-center {
    box-sizing: content-box;
    width: 345px;
    margin: 0 auto;
  }
  .ticket {
    display: flex;
    flex-wrap: wrap;
    .item {
      box-shadow: #c1c1c17d 0 0 10px;
      border-radius: 12px;
      box-sizing: border-box;
      padding: 0px 10px;
      margin: 10px 0;
      width: 100%;
      margin-top: 10px;
      display: block;
      height: 110px;
    }
    .item:first-child {
      margin-top: 0;
    }
    .e-ticket-center-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      .info-box {
        height: 90px;
        display: flex;
        justify-content: flex-start;
        .image {
          flex-shrink: 0;
          width: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
          }
        }
        .params {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          box-sizing: border-box;
          padding: 0 10px;
          width: 190px;
          > div {
            width: 100%;
          }
          .ticket-title {
            display: block;
            text-align: left;
            font-size: 14px;
          }
          .ticket-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 30px;
            width: 200px;
            padding-left: 2px;
            .ticket-count {
              color: #ff7300;
              font-size: 22px;
              font-weight: bold;
              height: 100%;
              flex-shrink: 0;
              > span {
                font-size: 14px;
              }
            }
            .ticket-discount {
              font-size: 12px;
              color: rgba(255, 115, 0, 1);
              display: flex;
              align-items: center;
              justify-content: flex-start;
              background: rgba(255, 240, 228, 1);
              padding: 4px 3px;
              height: 12px;
              margin-left: 10px;
              border-radius: 5px;
            }
          }
          .date {
            font-size: 12px;
            color: rgb(151, 151, 151);
          }
        }
      }
      .handle-box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        img {
          width: 50px;
        }
        .button {
          margin-top: 17px;
          width: 70px;
          height: 22px;
          border-radius: 22px;
          font-size: 12px;
          color: rgba(255, 255, 255, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button.orange-btn {
          background: linear-gradient(
            -30deg,
            rgba(255, 97, 55, 1) 0%,
            rgba(255, 168, 90, 1) 99%
          );
        }
        .button.blue-btn {
          background: linear-gradient(
            -30deg,
            rgba(49, 159, 247, 1) 0%,
            rgba(98, 209, 255, 1) 100%
          );
        }
        .button.gray-btn {
          color: rgba(204, 204, 204, 1);
        }
      }
    }
  }
  .e-ticket-center-top {
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
</style>
