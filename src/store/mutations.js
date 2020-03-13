const mutations = {
    setloginState(state,data){
        sessionStorage.loginState=data
        state.loginState=data
    },
    PFROMATION(state,data) {
        console.log("")
        localStorage.setItem("proInformation",JSON.stringify(data))
        state.proInformation = data
    },
    EDITAPPLY(state,data) {
        localStorage.setItem("applyDetailEdit",JSON.stringify(data))
        state.applyDetailEdit = data
    },
    setshowlogin(state,data){
       
        state.showlogin = data;
    },
    setshowDeliverCar(state,data){
        state.showDeliverCar = data;
    },
    setshowPayTypeOnline(state,data){
        state.showPayTypeOnline = data;
    }
}
export default mutations
