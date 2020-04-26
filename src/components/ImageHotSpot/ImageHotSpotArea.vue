<template>
  <div class="main-container image-hot-spot-area">
    <div class="left-box">
      <div
        class="percent-container"
        style="height: 510px; overflow-y: scroll; overflow-x: hidden;"
        v-if="imageUrl"
        ref="percentContainer"
      >
        <div
          ref="parent"
          class="parent"
          style="position: relative; width: 400px; margin: 0 auto;"
        >
          <el-image
            :src="imageUrl"
            fit="contain"
            style="width: 400px; display: block; position: relative;"
            @load="imageLoaded($event)"
          >
          </el-image>
          <template v-for="(item, index) of objArr">
            <vue-draggable-resizable
              :h="item.absolute.height"
              :key="index"
              :w="item.absolute.width"
              :x="item.absolute.x"
              :y="item.absolute.y"
              :ref="'imageHotSpotItem' + index.toString()"
              @dragging="onDrag(...arguments, index)"
              @resizing="onResize(...arguments, index)"
              @dragstop="onDragStop"
              @resizestop="onResizeStop"
              :parent="true"
              v-if="draggableShow && objArr.length > 0"
              @click.native="editHotSpot(index)"
              :class="{ active: currentEditHotSpotIndex == index }"
              style="top:0;"
            >
              <div class="content-box">
                <p>
                  {{ item.name ? item.name : '热点' + (index + 1) }}
                </p>
                <div class="delete-hot-spot">
                  <img :src="closeImage" @click.stop="removeHotSpot(index)" />
                </div>
              </div>
            </vue-draggable-resizable>
          </template>
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="image-hot-spot-list-box" :ref="'imageHotSpotListBox'">
        <div class="handle-box">
          <el-button @click="addHotSpot" class="add-hot-spot"
            >增加热点</el-button
          >
          <span style="font-size: 12px; font-weight: 400; color: #666666;">
            最多10个
          </span>
        </div>
        <el-scrollbar
          class="default-scrollbar"
          style="box-sizing: border-box;"
          view-class="default-scrollbar__view"
          wrap-class="default-scrollbar__wrap"
          ref="scrollBar"
        >
          <div
            class="image-hot-spot-item"
            @click="editHotSpot(index, true)"
            v-for="(item, index) of objArr"
            :key="index"
            :class="{ active: currentEditHotSpotIndex == index }"
          >
            <div class="top-wrap">
              <span>{{ item.name ? item.name : '热点' + (index + 1) }}</span>
            </div>
            <div class="bottom-wrap">
              <div class="hot-spot-name">
                <div class="label">热点名称</div>
                <el-input
                  v-model="objArr[index].name"
                  :placeholder="'请输入热点名称'"
                  @input="postArr"
                  size="mini"
                  style="width: 163px;"
                ></el-input>
              </div>
              <div class="url">
                <div class="label">跳转链接</div>
                <div class="url-box">
                  <el-input
                    size="small"
                    v-model="objArr[index].link.url"
                    @input="postArr"
                  ></el-input>
                </div>
              </div>
            </div>
            <!--            <img v-if="!$lodash.isEmpty(item.link)" :src="linkImage" alt="" />-->
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'imageArea',
    props: {
      hotSpotArr: {
        type: Array
      },
      imageUrl: {
        type: String
      },
      postHotSpotArr: {
        type: Function
      }
    },
    data() {
      return {
        objArr: [],
        images: require('./assets/images/crop.png'),
        hotSpotPrototype: {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          defaultName: '',
          url: '',
          name: '',
          absolute: {
            width: 100,
            height: 100,
            x: 200,
            y: 200
          },
          link: {}
        },
        parentWidth: 0,
        parentHeight: 0,
        draggableShow: false,
        currentEditHotSpotIndex: null,
        currentEditHotSpotObj: null,
        closeImage: require('./assets/images/close-b.png'),
        linkImage: require('./assets/images/link.png'),
        selectUrlVisible: false
      }
    },
    watch: {
      objArr: {
        handler: function() {
          this.calculatePercentage()
        },
        deep: true
      }
    },
    created() {
      if (this.hotSpotArr) {
        this.objArr = JSON.parse(JSON.stringify(this.hotSpotArr))
      }
    },
    mounted() {},
    updated() {
      this.parentWidth = parseInt(
        window.getComputedStyle(this.$refs.parent).getPropertyValue('width'),
        10
      )
      this.parentHeight = parseInt(
        window.getComputedStyle(this.$refs.parent).getPropertyValue('height'),
        10
      )
    },
    methods: {
      addHotSpot() {
        this.draggableShow = true
        const scrollTop = this.$refs.percentContainer.scrollTop
        console.log('滚动距离')
        console.log(scrollTop)
        const obj = JSON.parse(JSON.stringify(this.hotSpotPrototype))
        obj.height = this.$lodash.ceil(
          (obj.absolute.height / this.parentHeight) * 100
        )
        obj.width = this.$lodash.ceil(
          (obj.absolute.width / this.parentWidth) * 100
        )
        obj.x = this.$lodash.ceil((obj.absolute.x / this.parentWidth) * 100)
        obj.absolute.y = scrollTop
        obj.y = this.$lodash.ceil((obj.absolute.y / this.parentHeight) * 100)
        obj.defaultName = this.objArr.length ? this.objArr.length + 1 : '1'
        this.objArr.push({ ...obj })
        this.calculatePercentage()
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
        this.$refs['scrollBar'].wrap.scrollTop =
          this.$refs['scrollBar'].wrap.scrollHeight + 100
      },
      removeHotSpot(index) {
        if (this.objArr.length < 1) {
          this.postHotSpotArr && this.postHotSpotArr(this.objArr)
          return
        }
        if (this.objArr.length <= 1) {
          this.currentEditHotSpotObj = null
          this.currentEditHotSpotIndex = null
          this.draggableShow = false
          this.objArr.splice(index, 1)
          this.postHotSpotArr && this.postHotSpotArr(this.objArr)
        } else {
          this.currentEditHotSpotObj = null
          this.currentEditHotSpotIndex = null
          this.objArr.splice(index, 1)
          this.postHotSpotArr && this.postHotSpotArr(this.objArr)
        }
      },
      calculatePercentage() {
        if (this.objArr.length > 0) {
          for (let obj of this.objArr) {
            obj.height = this.$lodash.floor(
              obj.absolute.height / this.parentHeight,
              4
            )
            obj.width = this.$lodash.floor(
              obj.absolute.width / this.parentWidth,
              4
            )
            obj.x = this.$lodash.floor(obj.absolute.x / this.parentWidth, 4)
            obj.y = this.$lodash.floor(obj.absolute.y / this.parentHeight, 4)
          }
        }
      },
      editHotSpot(index, status) {
        //
        const str = 'imageHotSpotItem' + index
        if (status) {
          this.$refs[str][0].$el.scrollIntoView()
        }
        console.log(this.$refs[str][0])
        // this.$refs[str][0].$el.mousedown()
        this.currentEditHotSpotObj = null
        setTimeout(() => {
          this.currentEditHotSpotObj = JSON.parse(
            JSON.stringify(this.hotSpotArr[index])
          )
          this.currentEditHotSpotIndex = index
        })
      },
      imageLoaded() {
        // console.log(event.path[0].clientHeight);
        this.$nextTick(() => {
          this.parentWidth = parseInt(
            window
              .getComputedStyle(this.$refs.parent)
              .getPropertyValue('width'),
            10
          )
          this.parentHeight = parseInt(
            window
              .getComputedStyle(this.$refs.parent)
              .getPropertyValue('height'),
            10
          )
          // this.addHotSpot()

          if (this.hotSpotArr) {
            this.objArr = JSON.parse(JSON.stringify(this.hotSpotArr))
          }
          this.draggableShow = true
        })
      },
      onDrag: function(x, y, index) {
        //   console.log(x)
        // console.log(y)
        //   console.log(item)
        this.objArr[index].absolute.x = x
        this.objArr[index].absolute.y = y
      },
      onDragStop() {
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
      },
      onResize: function(x, y, width, height, index) {
        this.objArr[index].absolute.x = x
        this.objArr[index].absolute.y = y
        this.objArr[index].absolute.width = width
        this.objArr[index].absolute.height = height
        // console.log(item);
      },
      onResizeStop() {
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
      },
      receiveLink(res) {
        console.log(res)
        this.objArr[this.currentEditHotSpotIndex].link = res
        this.currentEditHotSpotObj.link = res
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
      },
      postArr() {
        this.postHotSpotArr && this.postHotSpotArr(this.objArr)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet" scoped type="text/scss">
  .image-hot-spot-area {
    display: flex;
    justify-content: space-between;
    .percent-container {
      /*margin-bottom: 30px;*/
    }
  }

  .content-box {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .delete-hot-spot {
      position: absolute;
      right: 0;
      top: 0;
      height: 20px;
      width: 20px;
      z-index: 999;
      img {
        height: 20px;
        width: 20px;
      }
    }
  }

  .right-box {
    margin-left: 20px;
    width: 401px;
    .image-hot-spot-list-box {
      width: 401px;
      height: 510px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(201, 201, 201, 1);
      border-radius: 4px;
      box-sizing: border-box;
      padding: 21px;
      .handle-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 21px;
        .el-button {
          width: 92px;
          height: 32px;
          padding: 0 !important;
        }
      }
      .image-hot-spot-item {
        /*height: 32px;*/
        display: flex;
        justify-content: space-between;
        flex-shrink: 0;
        flex-wrap: wrap;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1px solid rgba(220, 220, 220, 1);
        > div {
          width: 100%;
          padding: 0 16px;
        }
        .top-wrap {
          display: flex;
          align-items: center;
          height: 30px;
          background: rgba(246, 246, 246, 1);
          font-weight: bold;
          color: #333333;
          font-size: 14px;
        }
        .bottom-wrap {
          /*height: 60px;*/
          padding-top: 13px;
          padding-bottom: 13px;
          box-sizing: border-box;
          .hot-spot-name,
          .url {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .url {
            margin-top: 30px;
            .url-box {
              display: flex;
              width: 163px;
              align-items: center;
              justify-content: space-between;
            }
          }
        }
      }
      .active {
        background: rgba(238, 238, 238, 1);
      }
    }
  }

  .default-scrollbar,
  .default-scrollbar__wrap,
  .default-scrollbar,
  .el-scrollbar {
    height: calc(100% - 65px);
    overflow-x: hidden !important;
  }

  /deep/ .default-scrollbar__wrap.el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /deep/ .handle {
    background: none;
    border: 0;
  }

  /deep/ .active.draggable {
    border: 1px solid rgba(6, 97, 172, 1);
    background: rgba(116, 179, 230, 1);
    /*font-size: 12px;*/
    color: #fff;
    opacity: 0.8;
  }

  /deep/ .draggable {
    background: rgba(255, 255, 255, 1);
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
  }

  /deep/ .edit-hot-spot {
    .el-form-item {
      margin-bottom: 22px !important;
    }
  }

  /*.product-select {*/
  /*  background:rgba(59,178,119,1);*/
  /*  border-radius:16px;*/
  /*  width:98px;*/
  /*  height:32px;*/
  /*  color: rgb(255, 255, 255);*/
  /*  padding:8px 20px;*/
  /*}*/
</style>
