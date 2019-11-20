
import {axios,common} from "@/api/apiObj";
const state = {
    //物流公司
    DeliveryCompany:{},
    CenterChangeAddress:[]

}

const getters = {
    
}

const actions = {
    // 获取快递公司
    GetDeliveryCompany (context,data){
        return new Promise((resolve, reject) => {
            if(context.state.DeliveryCompany[data.pfrixName.toUpperCase()]){
                resolve(context.state.DeliveryCompany[data.pfrixName.toUpperCase()])
            }else{
                axios.request({...common.getDeliveryCompany,params:data}).then(
                    res=>{
                        resolve(res.data)
                        context.commit('SetDeliveryCompany', {data:data,list:res})
                    }
                )
            }

        })
    },
    //获取卖家发货的地址详情
    GetCenterChangeAddress(){
        return new Promise((resolve, reject) => {
            axios.request({...common.getDeliveryCompany,params:data}).then(
                res=>{
                    resolve(res)
                    commit('SetCenterChangeAddress', res)
                }
            )
        })
    },
    //反馈条目
    GetQueryItem(){
        return new Promise((resolve, reject) => {
            axios.request(common.queryItem).then(
                res=>{
                    resolve(res)
                   /// commit('SetCenterChangeAddress', res)
                }
            )
        })
    },
    //保存反馈
    saveFeed(context,data){
        
        return new Promise((resolve, reject) => {
            axios.request({...common.save,data:JSON.parse(data),method:'post'}).then(
                res=>{
                    resolve(res)
                  
                }
            )
        })
    }
}

const mutations = {
    SetDeliveryCompany(state, data) {
        state.DeliveryCompany[data.data.pfrixName.toUpperCase()] = data.list.data;
        console.log("DeliveryCompany0:",state.DeliveryCompany)
    },
    SetCenterChangeAddress(state,data){
        state.CenterChangeAddress=data
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
