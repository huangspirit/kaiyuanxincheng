const mutations = {
    setloginState(state,data){
        sessionStorage.loginState=data
        state.loginState=data
    },
    PFROMATION(state,data) {
        console.log(data,'5555555555')
        state.proInformation = data
    }
}
export default mutations
