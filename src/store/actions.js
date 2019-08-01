const actions = {
    setloginState (context,data) {
        context.commit('setloginState',data)
      },
      promation({commit},val) {
        commit("PFROMATION", val)
      }
}
export default actions

