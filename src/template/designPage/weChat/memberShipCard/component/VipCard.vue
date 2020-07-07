<template>
  <div class="member-ship-card">
    <!-- :style="{backgroundImage: 'url(' + coverImgUrl + ')'}" -->
    <div
      :style="{
        borderRadius: dataObj.component.borderRadius ? '10px' : '',
        backgroundImage: dataObj.component.coverImgUrl
          ? `url(${dataObj.component.coverImgUrl})`
          : 'linear-gradient(#7FBD86,#55A85E)'
      }"
      class="card-face"
    >
      <div class="top">
        <div class="user_info">
          <div class="left-box">
            <div class="avatar">
              <img
                :src="logo"
                alt=""
                v-if="Number(dataObj.component.logoType) === 1"
              />
              <img
                src="./assets/images/用户头像.png"
                v-if="Number(dataObj.component.logoType) === 2"
              />
            </div>
            <div class="name-box">
              <div
                class="member-name"
                v-if="Number(dataObj.component.nameType) === 1"
              >
                商户名称
              </div>
              <div
                class="member-name"
                v-if="Number(dataObj.component.nameType) === 2"
              >
                用户昵称
              </div>
              <div
                class="member-name"
                style="font-size: 18px; line-height: 20px;"
                v-if="Number(dataObj.component.nameType) === 3"
              >
                13000000000
              </div>
              <div
                class="member-name"
                style="font-size: 18px; line-height: 20px;"
                v-if="Number(dataObj.component.nameType) === 4"
              >
                1234xxxxxxxx
              </div>
              <div class="member-level">
                <img
                  alt=""
                  src="./assets/images/会员标识.png"
                  style="width: 12px; height: 12px; margin-right: 2px;"
                />
                青铜会员
                <img
                  src="./assets/images/向右箭头.png"
                  style="height: 11px; width: auto; margin-left: 2px;"
                />
              </div>
            </div>
          </div>
          <div class="qr-code">
            <img
              alt=""
              src="./assets/images/二维码.png"
              style="height: 100%;"
            />
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="card-face-info">
          <template v-for="(item, index) in dataObj.component.infoItems">
            <div
              :class="{
                'two-item': checkBoxLimit(dataObj.component.infoItems)
              }"
              :key="index"
              class="item"
              v-if="item.enable"
            >
              <div
                :style="{ color: dataObj.component.fontColor }"
                class="value"
                v-if="item.name === '积分'"
              >
                3814
              </div>
              <div
                :style="{ color: dataObj.component.fontColor }"
                class="value"
                v-else-if="item.name === '余额'"
              >
                120.00
              </div>
              <div
                :style="{ color: dataObj.component.fontColor }"
                class="value"
                v-else-if="item.name === '优惠券'"
              >
                17
              </div>
              <div
                :style="{ color: dataObj.component.fontColor }"
                class="value"
                v-else-if="item.name === '成长值'"
              >
                200
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="cardTop">
              <div class="main">
                <img src="./tu.jpg" alt="" />
                <div class="main_two">
                  <div class="name">商户名</div>
                  <div class="card">青铜会员</div>
                </div>
              </div>
            </div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VipCard',
    props: ['dataObj'],
    data() {
      return {
        coverImgUrl: require('./assets/images/card.png'),
        closeOrOpen: true,
        logo: require('./assets/images/商竹logo.png'),
        QRCode: require('./assets/images/QRCode.png')
      }
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      cardHeight: function() {
        if (this.dataObj.component.proportion) {
          return (200 * this.dataObj.component.proportion) / 100 + 'px'
        }
      },
      checkBoxLimit() {
        return function(options) {
          let count = 0
          options &&
            options.map(item => {
              if (Boolean(item.enable) === true) {
                count += 1
                return item
              }
            })
          return count <= 2
        }
      }
    },
    created() {
      console.log(this.dataObj)
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  @mixin public {
    .left {
      min-width: 77px;
      height: 36px;
      position: relative;
      @include publics;
    }
    .center {
      min-width: 70px;
      height: 36px;
      position: relative;
      @include publics;
    }
    .right {
      min-width: 92px;
      height: 36px;
      position: relative;
      @include publics;
    }
  }

  @mixin publics {
    img {
      position: absolute;
      left: 0;
    }
    .point_num,
    .ticket_num,
    .money_num {
      color: #ff7300;
      position: absolute;
      font-size: 14px;
      left: 36px;
    }
    .point,
    .money,
    .ticket {
      position: absolute;
      font-size: 11px;
      color: #8a8a8a;
      left: 36px;
      top: 21px;
    }
  }

  .member-ship-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-size: 100%, 100%;
    border-radius: 10px 10px 10px 10px;
    width: 100%;

    .card-face {
      background-size: 100%, 100%;
      width: 345px;
      height: 200px;
      // background: #cccccc;
      /*border-radius: 10px 10px 0 0;*/
      padding-top: 15px;
      box-sizing: border-box;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      > div {
        flex-shrink: 0;
      }
    }

    .top {
      .user_info {
        height: 60px;
        margin-left: 15px;
        margin-right: 15px;
        text-align: left;
        position: relative;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;

        .left-box {
          display: flex;

          .name-box {
            display: flex;
            flex-wrap: wrap;
            width: 80px;
            box-sizing: border-box;
            margin-left: 7px;
            padding-top: 7px;

            > div {
              flex-shrink: 0;
            }

            .member-name {
              font-size: 20px;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
            }

            .member-level {
              background: rgba(51, 51, 51, 0.2);
              border-radius: 10px;
              display: flex;
              align-items: center;
              height: 20px;
              width: 82px;
              font-size: 12px;
              font-weight: 500;
              box-sizing: border-box;
              padding: 4px 5px;
              color: #ffffff;

              .num {
                margin-left: 27px;
              }
            }
          }
        }

        .qr-code {
          margin-top: 7px;
          height: 26px;
          width: auto;
        }

        .avatar {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;

          > img {
            height: 31px;
            width: 31px;
          }
        }

        .qude {
          width: 56px;
          height: 56px;
          top: 8px;
          left: 405px;
        }
      }
    }

    .bottom {
      width: 345px;
      height: 50px;
      border-radius: 10px;
      box-sizing: border-box;
      display: flex;
      margin-bottom: 37px;
      padding: 0 20px;

      .card-face-info {
        width: 325px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > .item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 25%;

          > div {
            flex-shrink: 0;
            width: 100%;
          }

          > .value {
            font-size: 20px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          > .name {
            font-size: 15px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            opacity: 0.5;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .two-item {
          width: 40% !important;
        }
      }
    }
  }

  .member-ship-card {
  }
</style>
