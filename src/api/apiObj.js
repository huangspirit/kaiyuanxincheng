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
    SpecialOfferList: {
        url: `api-g/gods-anon/queryDirectGoods`
    },
    findBrandList: {
        url: `api-g/gods-anon/findBrand`
    },
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
    allReply: {
        url: "/api-g/ic/queryInquirySheetList"
    },
    replyRequest: {
        url: "/api-g/ic/updateInquirySheet"
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
    siderInquiryList
}
