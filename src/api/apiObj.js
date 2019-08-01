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
    confirmChangeDiliverTime: {
        url: "/api-order/customerCenter/confirmChangeDiliverTime",
        method: "post"
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

export {
    axios,
    common,
    home,
    buyerOrderCenter,
    sellerOrderCenter,
    message
}
