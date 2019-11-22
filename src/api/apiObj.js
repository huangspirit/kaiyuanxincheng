import HttpRequest from '@/lib/axios'
const axios = new HttpRequest()
const common = {
    getDeliveryCompany: {
        url: "api-order/goods-order/queryKuaiDi"
    },
    GetCenterChangeAddress: {
        url: 'api-g/goods-center/queryWarehouseList'
    },
    querySysMessage: {
        url: "api-n/notification-anon/querySysMessage"
    },
    resetme: {
        url: "api-u/users/me"
    },
    refresh_token: {
        url: "sys/refresh_token"
    },
    getuserInfo: {
        url: "api-u/users/current"
    },
    //获取月结详情
    findVipDetail: {
        url: "api-u/vip/findVipDetail"
    },
    //反馈
    queryItem: {
        url:"api-b/feed/queryItem"
    },
    //保存反馈
    save:{
        url:"api-b/feed/save"
    },
    //获取反馈的内容
    queryFeedList:{
        url:"api-b/feed/queryFeedList"
    }

}
const home = {
    SearchData: {
        url: "api-g/gods-anon/searchIndex"
    },
    GetHotSearch: {
        url: `api-g/gods-anon/querySummaryHome`
    },
    //查询基准库产品的售卖商家产品
    SpecialOfferList: {
        url: `api-g/gods-anon/queryDirectGoods`
    },
    //获取品牌列表
    findBrandList: {
        url: `api-g/gods-anon/findBrand`
    },
    // 品牌列表
    queryBrandHomePage: {
        url: "api-g/gods-anon/queryBrandHomePage"
    },
    //获取分类
    queryCatergoryHomePage: {
        url: "api-g/gods-anon/queryCatergoryHomePage"
    },
    //获取特价直供的分类
    queryDirectC: {
        url: "api-g/gods-anon/queryDirectC"
    }

}
const footer = {
    queryWebConfigTitle: {
        url: "api-b/webFront/queryWebConfigTitle"
    },
    queryConfigDetail: {
        url: "api-b/web/queryConfigDetail"
    }
};
const buyerOrderCenter = {
    //增加评论
    insertOrderComment: { url: "api-order/order/insertOrderComment" },
    //支付宝支付取消订单时的报关税
    payGuanshui: { url: "api-order/alipay/payGuanshui" },
    //微信支付取消订单时的报关税
    getWechatPayBaoguan: { url: "api-order/wechat/getWechatPayBaoguan" },
    //对公转账支付取消订单时的报关税
    uploadBankTransferNo: { url: "api-order/customerCenter/uploadBankTransferNo" },
    //提升额度
    increaseCredit: {
        url: 'api-b/vipApply/increaseCredit',
        method: 'post'
    },
    //获取买家订单
    queryOrderPersonal: {
        url: "api-order/customerCenter/queryOrderPersonal"
    },
    //获取买家订单详情
    queryOrderDeatil: {
        url: "api-order/customerCenter/queryOrderDeatil"
    },
    //确认更改交期
    confirmChangeDiliverTime: {
        url: "/api-order/customerCenter/confirmChangeDiliverTime",
        method: "post"
    },
    //查询收藏的商品和商家
    queryGoodsFavouriteList: {
        url: "/api-g/gf/queryGoodsFavouriteList"
    },
    //查询收藏商家的商品
    queryPublishGoodsListByUser: {
        url: "/api-g/goods-b/queryPublishGoodsListByUser"
    },
    //确认收货
    confirmRecieveGoods: {
        url: "api-order/customerCenter/confirmRecieveGoods"
    },
    //月结查询订单
    vipOrderBill: {
        url: "api-order/customerCenter/vipOrderBill"
    },
    vipOrderBillCheck: {
        url: "api-order/customerCenter/vipOrderBillCheck", method: "post"
    },
    queryOrderBillCheckList: {
        url: "api-order/customerCenter/queryOrderBillCheckList"
    },
    vipOrderBillForPay: {
        url: "api-order/customerCenter/vipOrderBillForPay"
    },
    //月结改普通订单
    changePayMent:{
        url:"/api-order/customerCenter/changePayMent"
    }
}
const sellerOrderCenter = {
    //批量国内发货
    diliverBatchGoods: {
        url: "api-order/sellerCenter/diliverBatchGoods"
    },
    querySellerCenterSummary: {
        url: "api-order/selllerCenter/querySellerCenterSummary"
    },
    diliverGoods: {
        url: "/api-order/sellerCenter/diliverGoods"
    },
    diliverHKGoods: {
        url: "/api-order/sellerCenter/diliverHKGoods"
    },
    querySysBill: {
        url: "/api-u/userBill/querySysBill"
    },
    //根据billId查询开票信息
    findBillContent: {
        url: "/api-u/users-anon/findBillContent"
    },
    billManager: {
        url: "/api-order/customerCenter/billManager"
    },
    openBill: {
        url: "/api-order/sellerCenter/openBill"
    },
    queryExpress: {
        url: "/api-order/selllerCenter/queryExpress"
    },
    queryBillListBySeller: {
        url: "/api-order/sellerCenter/queryBillListBySeller"
    }
}
const sellerCenter = {
    //商品上下架管理
    updateBatchPublishGoodsSatus: {
        url: "api-g/goods-b/updateBatchPublishGoodsSatus"
    },
    //卖家账单中心查询
    queryAccountDetail: {
        url: "/api-order/sellerCenter/queryAccountDetail"
    },
    //卖家结算账单
    saveSellerCheckApply: {
        url: '/api-order/sellerCenter/saveSellerCheckApply'
    },
    //根据seller_id查询发布商品 的详情
    querySellerGoodsDetail: {
        url: "api-g/goods/querySellerGoodsDetail"
    },
    //追加库存
    updateStockCount: {
        url: "api-g/goods-b/updateStockCount"
    },
    //原厂发布产品
    //获取类目
    queryCatergory: {
        url: "api-g/goods-b/queryCatergory"
    },
    //获取二级分类的属性
    queryExproperty: {
        url: "api-g/goods-b/queryExproperty"
    },
    saveGoodsBaseInfo: {
        url: 'api-g/goods-b/saveAGoodsBaseInfo'
    },
    saveBatchGoodsExinfo: {
        url: "api-g/goods-b/saveBatchGoodsExinfo"
    },
    //校验产品是否重复
    searchDisrictGoods: {
        url: "api-g/goods-b/searchDisrictGoods"
    },
    //獲取产品基础库类别
    querySllerCatergory: {
        url: "api-g/goods/querySllerCatergory"
    },
    //获取产品列表
    querySllerStockGoodsList: {
        url: "api-g/goods/querySllerStockGoodsList"
    },
    //获取产品详情
    findGoodsBaseInfoById: {
        url: "api-g/goods-b/findGoodsBaseInfoById"
    },
    //更新产品的基础信息
    updateGoodsBaseInfo: {
        url: "api-g/goods-b/updateGoodsBaseInfo"
    },
    //更新產品屬性
    updateGoodsExinfo: {
        url: "api-g/goods-b/updateGoodsExinfo"
    }

}
const personCenter = {

    //买家中心汇总页面
    queryCustomerCenterSummary: {
        url: "api-u/users-anon/queryCustomerCenterSummary"
    },
    queryUserConsumeDetailList: {
        url: "api-u/users/queryUserConsumeDetailList"
    },
    //提现的相关接口
    saveBank: {
        url: "api-b/draw/saveBank", method: 'post'
    },
    getBankList: {
        url: "api-b/draw/getBankList"
    },
    deleBank: {
        url: "api-b/draw/deleBank"
    },
    checkSetPassword: {
        url: 'api-b/draw/checkSetPassword'
    },
    count: {
        url: "api-b/draw/count"
    },
    saveDraw: {
        url: "api-b/draw/saveDraw", method: "post"
    },
    savedrawPassword: {
        url: "api-b/draw/savedrawPassword", method: "post"
    },
    updatedrawPassword: {
        url: "api-b/draw/updatedrawPassword", method: "post"
    },
    checkdrawPassword: {
        url: "api-b/draw/checkdrawPassword", method: 'post'
    },
    getDrawList: {
        url: "api-b/draw/getDrawList"
    }
}
const message = {
    queryMessageCatergory: {
        url: "/api-n/notification/queryMessageCatergory"
    },
    queryUserMessageList: {
        url: "/api-n/notification/queryUserMessageList"
    },
    updateUserMessageByTag: {
        url: "/api-n/notification/updateUserMessageByTag"
    },
    deleteMessage: {
        url: "/api-n/notification/deleteMessage"
    }
}
const shoppingCar = {

    queryGoodsBillSetOffList: {
        url: "api-g/goods-b/queryGoodsBillSetOffList"
    },
    queryUserBill: {
        url: "/api-u/userBill/queryUserBill"
    },
    insertShoppingCar: {
        url: "/api-g/sc/insertShoppingCar"
    },
    inquiryList: {
        url: "/api-g/sc/queryShoppingCarList"
    },
    //删除购物车商品
    deleteSigletonShoppingCar: {
        url: "/api-g/sc/deleteSigletonShoppingCar"
    },
    //批量删除购物车商品
    deleteBatchShoppingCar: {
        url: "/api-g/sc/deleteBatchShoppingCar"
    },
    //收藏关注商家和产品
    insertGoodsFavourite: {
        url: "/api-g/gf/insertGoodsFavourite"
    },
    //取消关注商家和产品，删除收藏
    deleteGoodsFavourite: {
        url: "/api-g/gf/deleteGoodsFavourite"
    },
    saveInquiry: {
        url: "/api-g/ic/saveInquirySheet"
    },
    saveBatchInquiry: {
        url: "/api-g/ic/saveBatchInquirySheet",
        method: 'post'
    },
    //询价栏搜索
    searchSheetList: {
        url: "api-g/ic/queryInquirySheetList"
    },

}
const siderInquiryList = {
    // 全部 批复
    allReply: {
        url: "/api-g/ic/queryInquirySheetList"
    },
    // 已批复 待批复 已失效
    replyRequest: {
        url: "/api-g/ic/updateInquirySheet"
    },
    replyAgain: {
        url: "/api-g/ic/reApplyInquirySheet"
    },
    //询价复议
    reApplyInquirySheetPrice: {
        url: "api-g/ic/reApplyInquirySheetPrice"
    }

}
const BrandDetail = {
    //导航搜索
    findGoodsBaseInfoAndExInfo: {
        url: "api-g/gods-anon/findGoodsBaseInfoAndExInfo"
    },
    //获取品类
    queryCatergoryByParentId: {
        url: "api-g/gods-anon/queryCatergoryByParentId"
    },
    //input搜索结果获取
    searchResult: {
        url: "api-g/gods-anon/searchResult"
    },
    //获取筛选项
    queryPropertyByParentId: {
        url: "api-g/gods-anon/queryPropertyByParentId"
    },
    //根据筛选条件筛选产品
    queryByProperty: {
        url: "api-g/gods-anon/queryByProperty",
        method: "post"
    },
    //根据筛选条件筛选数量
    queryMatchCount: {
        url: "api-g/gods-anon/queryMatchCount",
        method: "post"
    }

}
const sellerShop = {
    //回复评论
    replyOrderComment:{url:"api-order/order/replyOrderComment"},
    //获取评论
    orderCommentList:{
        url:"api-order/order-anon/orderCommentList"
    },
    //获取商家详情
    querySellerShop:{
        url:"api-g/gods-anon/querySellerShop"
    },
    queryUserInfo:{
        url:"api-u/users-anon/queryUserInfo"
    }
}
const FactoryEntry = {
    queryCompnayInfo: {
        url: "api-b/vipApply/queryCompnayInfo"
    },
    //升级为月结用户
    vipApply: {
        url: "api-b/vipApply/saveData"
    },
    //获取用户月结申请单
    getApplyList: {
        url: "api-b/customerCenter/getApplyList"
    },
    // 获取申请单详情
    getApplyDetail: {
        url: "api-b/customerCenter/getApplyDetail"
    }

}
const presonalAdress = {
    // 获取地址列表
    getAllAdress: {
        url: "api-u/address/queryAllReceivingAddress"
    },
    // 编辑地址
    editAdress: {
        url: "api-u/address/updateReceivingAddress"
    },
    // 添加收货地址
    AddAddress: {
        url: "api-u/address/saveReceivingAddress"
    },
    // 删除地址
    DeleteAddress: {
        url: "api-u/address/deleteReceivingAddressById"
    }
}
const topupDeposit = {
    //获取用户充值保证金的金额列表
    getDepositList: {
        url: 'api-b/customerCenter/getDepositList'
    },
    //充值保证金调用微信支付的方法
    getWechatPayVip: {
        url: 'api-order/wechat/getWechatPayVip'
    },
    //微信扫码成功后调用轮训的接口
    queryUserVipConsumeDetail: {
        url: 'api-u/users/queryUserVipConsumeDetail',

    },
    //阿里支付的方法
    pagePayDeposit: {
        url: 'api-order/alipay/pagePayDeposit'
    }
}
const agentFication = {
    // 获取资质图列表
    getQualificationList: {
        url: "api-b/customerCenter/getQualificationList"
    },
    // 新增资质图
    saveQualificationList: {
        url: "api-b/customerCenter/saveQualificationList"
    },
    // 编辑资质图
    updateQualificationList: {
        url: "api-b/customerCenter/updateQualificationList"
    },
    // 删除资质图
    delQualificationList: {
        url: 'api-b/customerCenter/delQualificationList'
    }
}
export {
    axios,
    common,
    home,
    footer,
    buyerOrderCenter,
    sellerCenter,
    sellerOrderCenter,
    message,
    shoppingCar,
    siderInquiryList,
    BrandDetail,
    FactoryEntry,
    presonalAdress,
    personCenter,
    topupDeposit,
    agentFication,
    sellerShop
}
