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
    }
}
export default mutations
