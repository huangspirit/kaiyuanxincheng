import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import Common from './modules/Common'
import home from './modules/home'
import AllBrand from './modules/AllBrand'
import Undirect from './modules/Undirect'
import Direct from './modules/Direct'
import GoodsDetails from './modules/GoodsDetails'
import ShippingAddress from './modules/ShippingAddress'
import PersonalInvoice from './modules/PersonalInvoice'
import shoppingCart from './modules/shoppingCart'
import BuyerOrderManagement from './modules/BuyerOrderManagement'
//import SellerOrderManagement from './modules/SellerOrderManagement'
import OriginalFactoryEntry from './modules/OriginalFactoryEntry'
import InvoiceInformationManagement from './modules/InvoiceInformationManagement'
import PersonalData from './modules/PersonalData'
import SellerIssuesProduct from './modules/SellerIssuesProduct'
import MerchantList from './modules/MerchantList'
import Login from './modules/Login'
import ShoppingSettlement from './modules/ShoppingSettlement'
import SignContract from './modules/SignContract'
import SellerCommodityManagement from './modules/SellerCommodityManagement'
import {saveLocal } from './plugin/saveLocal'
import { saveSessionStorage } from './plugin/saveSessionStorage'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
        home,
        Common,
        AllBrand,
        Undirect,
        GoodsDetails,
        Direct,
        ShippingAddress,
        Login,
        PersonalInvoice,
        shoppingCart,
        BuyerOrderManagement,
       // SellerOrderManagement,
        PersonalData,
        OriginalFactoryEntry,
        InvoiceInformationManagement,
        SellerIssuesProduct,
        MerchantList,
        ShoppingSettlement,
        SignContract,
        SellerCommodityManagement
  },
  plugins: [
      saveLocal,
      saveSessionStorage
  ]
})
