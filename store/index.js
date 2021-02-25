export const state = () => {
  return {
    auth: null,
    isSidebarOpen: false,
    editScenarioId: null,
    variables: null,
    isInit: false,
    haveReceipt: false,
  }
}

export const mutations = {
  updateCurrentUser(state, payload) {
    state.auth.user = payload
  },
  toggleSidebar(state, payload) {
    state.isSidebarOpen =
      typeof payload === 'boolean' ? payload : !state.isSidebarOpen
  },
  updateVariables(state, payload) {
    state.variables = payload
  },
  isInitTrue(state) {
    state.isInit = true
  },
  isInitFalse(state) {
    state.isInit = false
  },
  isHaveReceipt(state, payload) {
    state.haveReceipt = payload
  },
}
