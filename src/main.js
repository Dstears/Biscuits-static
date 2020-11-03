// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import common from '@/util/common'
import Clipboard from 'v-clipboard'

Vue.use(ElementUI)
Vue.use(Clipboard)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$get = common.get
Vue.prototype.$post = common.post
Vue.prototype.validate = common.validate
Vue.prototype.copy = common.copy
Vue.prototype.getCookie = common.getCookie
Vue.prototype.delCookie = common.delCookie
Vue.prototype.arr2tree = common.arr2tree
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
