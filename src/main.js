import Vue from 'vue'
import App from './App.vue'
import lodash from 'lodash'
import ElementUI from 'element-ui'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/src/components/vue-draggable-resizable.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$lodash = lodash
Vue.component('vue-draggable-resizable', VueDraggableResizable)
new Vue({
  render: h => h(App)
}).$mount('#app')
