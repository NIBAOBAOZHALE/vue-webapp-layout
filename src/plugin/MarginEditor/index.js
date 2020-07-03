import margin from './MarginEditor'

const marginEditor = {
  install: function(Vue) {
    Vue.component(margin.name, margin)
  }
}
export default marginEditor
