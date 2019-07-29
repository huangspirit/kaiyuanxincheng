const mutations = {
    setloginState(state,data){
        sessionStorage.loginState=data
        state.loginState=data
    }
}
export default mutations
