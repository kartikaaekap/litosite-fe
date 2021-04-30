export const state = () => {
  return {
    auth: null,
    isSidebarOpen: false,
    variables: null,
    isInit: false,
    user: null,
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  deleteUser(state) {
    state.user = null
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
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
export const actions = {
  useAPI(context, { method, url, data, key }) {
    return new Promise((resolve, reject) => {
      this.$axios[method](url, data)
        .then(({ data: response }) => resolve(response.data || response))
        .catch(
          ({
            response: {
              status: statusCode,
              data: { message },
            },
          }) => {
            reject(new Error({ statusCode, message }))
          }
        )
    })
  },
  getItems({ dispatch }, payload) {
    return dispatch('useAPI', {
      method: 'get',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/${payload}`,
    })
  },
  newUser({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/${url}`,
      data,
    })
  },
  loginUser({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/${url}`,
      data,
    })
  },
  logoutUser({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/${url}`,
      data,
    })
  },
  createItem({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/${url}`,
      data,
    })
  },
  updateItem({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'patch',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/${url}`,
      data,
    })
  },
  deleteItem({ dispatch }, payload) {
    return dispatch('useAPI', {
      method: 'delete',
      url: `http://ec2-54-198-153-24.compute-1.amazonaws.com/api/${payload}`,
    })
  },

  // auth-related actions
  login(context, payload) {
    return this.dispatch('loginUser', ['rest-auth/login/', payload])
  },
  createUser({ dispatch }, [body, query]) {
    const qs = new URLSearchParams(query).toString()
    return dispatch('newUser', [`rest-auth/registration/${qs}`, body])
  },
  logout(context, payload) {
    return this.dispatch('logoutUser', ['rest-auth/logout/', payload])
  },
  getAdminList({ dispatch }) {
    return dispatch('getItems', 'admin-list/')
  },

  // rock actions
  createRockField({ dispatch }, payload) {
    return dispatch('createItem', ['contrib-rock/', payload])
  },
  getRockField({ dispatch }) {
    return dispatch('getItems', 'contrib-rock/')
  },
  getRockById({ dispatch }, rockId) {
    return dispatch('getItems', [`contrib-rock/${rockId}`])
  },
  getRockPending({ dispatch }) {
    return dispatch('getItems', 'contrib-rock/?status=pnd')
  },
  getRockApproved({ dispatch }) {
    return dispatch('getItems', 'contrib-rock/?status=apr')
  },
  getRockRejected({ dispatch }) {
    return dispatch('getItems', 'contrib-rock/?status=rjt')
  },
  updateRejectedRock({ dispatch }, [rockId, data]) {
    return dispatch('updateItem', [`contrib-rock/edit/${rockId}`, data])
  },

  // validator-actions
  getRockPendingValidator({ dispatch }) {
    return dispatch('getItems', 'valid-rock/?status=pnd')
  },
  getRockApprovedValidator({ dispatch }) {
    return dispatch('getItems', 'valid-rock/?status=apr')
  },
  getRockRejectedValidator({ dispatch }) {
    return dispatch('getItems', 'valid-rock/?status=rjt')
  },
  getRockByIdValidator({ dispatch }, rockId) {
    return dispatch('getItems', [`valid-rock/${rockId}`])
  },
  getAllRockValidator({ dispatch }) {
    return dispatch('getItems', 'valid-rock/')
  },

  // Map
  getPinPoints({ dispatch }) {
    return dispatch('getItems', 'map/')
  },
  getRockByIdUnauthorized({ dispatch }, rockId) {
    return dispatch('getItems', [`map/${rockId}`])
  },
  getSedimenRock({ dispatch }) {
    return dispatch('getItems', 'map/?search=sedimen')
  },
  getMetamorfRock({ dispatch }) {
    return dispatch('getItems', 'map/?search=metamorf')
  },
  getBekuRock({ dispatch }) {
    return dispatch('getItems', 'map/?search=beku')
  },
}
