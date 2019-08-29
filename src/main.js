import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SearchInput from '_c/SearchInput'
import ButtonIcon from '_c/ButtonIcon'
import LadderPrice from '_c/LadderPrice'
import TabImageFoot from '_c/TabImageFoot'
import TabImage from '_c/TabImage'
import Pagination from '_c/Pagination'
import ImgE from '_c/ImgE'
import uploadImg from '_c/uploadImg'
import HeaderSearch from '_c/HeaderSearch'
import CountTime from "_c/countTime";
import SetTankuang from "_c/SetTankuang"
import Purchase from "_c/purchase"
import './plugins/element.js'

Vue.config.productionTip = false
Vue.component('SearchInput', SearchInput)
Vue.component('ButtonIcon', ButtonIcon)
Vue.component('LadderPrice', LadderPrice)
Vue.component('TabImageFoot', TabImageFoot)
Vue.component('TabImage', TabImage)
Vue.component('Pagination', Pagination)
Vue.component('ImgE', ImgE)
Vue.component('uploadImg', uploadImg)
Vue.component('HeaderSearch', HeaderSearch)
Vue.component('CountTime', CountTime)
Vue.component('SetTankuang', SetTankuang)
Vue.component('Purchase', Purchase)
import filters from "./lib/filters";
import "./assets/css/reset.less";
window.eventBus = new Vue;
import Vuelazyload from 'vue-lazyload'

Vue.use(Vuelazyload, {
    error: require('../public/static/img/error.jpg'),
    loading: require('../public/static/img/error.jpg')
})
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key][key])
});
Vue.prototype.HeaderImg="//brand.113ic.com/2100a014823349faa6323f8541cefbe2.jpg"
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
