import HttpRequest from '@/lib/axios'
const axios = new HttpRequest()
const common = {
    getDeliveryCompany: {
        url: "api-order/goods-order/queryKuaiDi"
    },
    GetCenterChangeAddress: {
        url: 'api-g/goods-center/queryWarehouseList'
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
        url: "api-b/apply/getApplyList"
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
    AddAddress:{
        url:"api-u/address/saveReceivingAddress"
    },
    // 删除地址
    DeleteAddress:{
        url:"api-u/address/deleteReceivingAddressById"
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
    presonalAdress
}
