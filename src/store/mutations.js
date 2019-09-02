const mutations = {
    setloginState(state,data){
        sessionStorage.loginState=data
        state.loginState=data
    },
    PFROMATION(state,data) {

        state.proInformation = data
    },
    EDITAPPLY(state,data) {

        state.applyDetailEdit = data
    }
}
export default mutations
