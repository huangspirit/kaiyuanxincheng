
const state = {
  loading: {
    lock: true,
    text: '拼命加载中,请稍后。。。',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  },
  // 登录的状态
  loginState: (sessionStorage.getItem("loginState")=='false' || sessionStorage.getItem("loginState")=='true')?Boolean(sessionStorage.getItem("loginState")):false,
  // 滚动
  headerFxed: true,
  proInformation:{},
  applyDetailEdit:{}
}
export default state
