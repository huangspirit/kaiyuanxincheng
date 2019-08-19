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
    }
}
const buyerOrderCenter = {
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
    }
}
const sellerOrderCenter = {
    diliverGoods: {
        url: "/api-order/sellerCenter/diliverGoods"
    },
    diliverHKGoods: {
        url: "/api-order/sellerCenter/diliverHKGoods"
    },
    querySysBill: {
        url: "/api-u/userBill/querySysBill"
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
    },
}
const sellerCenter = {
    //卖家账单中心查询
    queryAccountDetail: {
        url: "/api-order/sellerCenter/queryAccountDetail"
    }
}
const personCenter = {
    //买家中心汇总页面
    queryCustomerCenterSummary: {
        url: "api-u/users-anon/queryCustomerCenterSummary"
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
    agentFication
}
