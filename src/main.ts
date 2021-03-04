import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css"
import { Bus } from "./Bus"
Vue.config.productionTip = false

Vue.mixin({
	beforeDestroy() {
		Bus.close(this);
	}
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
