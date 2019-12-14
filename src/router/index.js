import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../store'
import {
    setTitle
} from '@/lib/utils'
Vue.use(Router)
const router = new Router({
    routes
})
router.beforeEach((to, from, next) => {
    if (from.path == '/PersonalCenter/GetVipApplyDetail' || from.path == '/PersonalCenter/AgencyQualification' ||  from.path == '/PersonalCenter/UpgradeLevelRes') {
    } else {
        store.dispatch("applyEdit", {});
    }
    if (from.path == '/PersonalCenter/GetVipApplyDetail' && to.path == "/OriginalFactoryEntry" ||
        from.path == '/OriginalFactoryEntry' && to.path == "/OriginalFactoryEntry/CheckInformation") {} else {
        store.state.OriginalFactoryEntry.applyDetailEdit = {}
    }
    to.meta && setTitle(to.meta.title)
    window.scrollTo(0, 0)
    // 拿到本地token
    // eslint-disable-next-line camelcase
    let access_token = sessionStorage.getItem('access_token')
    // 判断路由是否需要token验证信息
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 判断token是否存在
        // eslint-disable-next-line camelcase
        if(!access_token){
            next('/')
        }else{
            next()
        }
        return;
        if (access_token) {
            // 如果不是登录页直接跳转
            if (to.name !== 'Login') {
                next()
                // 如果是登录页跳到首页
            } else {
                next({
                    name: '/'
                })
            }
            // 如果token不存在
        } else {
            // 如果不是登录页跳到登录页
            if (to.name !== 'Login') {
                next({
                    name: 'Login'
                })
                // 否则是登录页继续跳转
            } else next()
        }
        // 如果不需要token验证信息直接跳转
    } else next()
})
// router.afterEach((to, from) => {
//   // 结束Loading
//   iView.LoadingBar.finish()
// })
export default router
