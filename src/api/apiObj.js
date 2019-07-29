import HttpRequest from '@/lib/axios'
const axios = new HttpRequest()
const common={
    getDeliveryCompany:{url:"api-order/goods-order/queryKuaiDi"},
    GetCenterChangeAddress:{url:''}
}
const home={
        SearchData:{url:"api-g/gods-anon/searchIndex"},
        GetHotSearch:{url: `api-g/gods-anon/querySummaryHome`},
        SpecialOfferList:{url:`api-g/gods-anon/queryDirectGoods`},
        findBrandList:{url:`api-g/gods-anon/findBrand`},
     }
 const buyerOrderCenter={
     confirmChangeDiliverTime:{url:"/api-order/customerCenter/confirmChangeDiliverTime"}
 }

export {axios,common,home,buyerOrderCenter}
