
export const saveLocal = store => {
  if (localStorage.activeName) {
    store.state.activeName = localStorage.activeName
    store.state.openNames = localStorage.openNames
  }
  store.subscribe((mutation, state) => {
    localStorage.activeName = state.activeName
    localStorage.openNames = state.openNames
  })
}
