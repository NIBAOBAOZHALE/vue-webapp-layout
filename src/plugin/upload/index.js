import uploadImgComponent from './upload'

const uploadImg = {
  // 全局注册组件install
  install: function(Vue) {
    Vue.component(uploadImgComponent.name, uploadImgComponent)
  }
}
export default uploadImg
