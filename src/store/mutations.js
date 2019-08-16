const mutations = {
    setloginState(state,data){
        sessionStorage.loginState=data
        state.loginState=data
    },
    PFROMATION(state,data) {
        console.log(data,'5555555555')
        state.proInformation = data
    },
    EDITAPPLY(state,data) {
        console.log(data,'666666666')
        state.applyDetailEdit = data
    }
}
export default mutations
