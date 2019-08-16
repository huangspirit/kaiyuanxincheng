const actions = {
    setloginState (context,data) {
        context.commit('setloginState',data)
      },
      promation({commit},val) {
        commit("PFROMATION", val)
      },
      applyEdit({commit},val) {
        commit("EDITAPPLY", val)
      }
}
export default actions

