
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
  showlogin:false,
  showDeliverCar:false,
  showPayTypeOnline:false,
  proInformation:{},
  applyDetailEdit:{},
  title:'大麦晶城',
  zhizhao:"http://brand.113ic.com/fb76cdd9d3904c029533f2c8819ee098.jpg",
  AgencyBrandNumLimit:6,
  isFF:navigator.userAgent.indexOf("Firefox") > -1
}
export default state;
