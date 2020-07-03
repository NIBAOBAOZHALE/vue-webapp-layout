import ETicketPickerComponent from './ETicketPicker'

const ETicketPicker = {
  // 全局注册组件install
  install: function(Vue) {
    Vue.component(ETicketPickerComponent.name, ETicketPickerComponent)
  }
}
export default ETicketPicker
