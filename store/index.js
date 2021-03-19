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

export const actions = {
  useAPI(context, { method, url, data, token }) {
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
      url: `${process.env.baseUrl}/api/${payload}`,
    })
  },
  newUser({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `${process.env.baseUrl}/${url}`,
      data,
    })
  },
  loginUser({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `${process.env.baseUrl}/${url}`,
      data,
    })
  },
  logoutUser({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `${process.env.baseUrl}/${url}`,
      data,
    })
  },
  createItem({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `${process.env.baseUrl}/api/${url}`,
      data,
    })
  },
  updateItem({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'patch',
      url: `${process.env.baseUrl}/api/${url}`,
      data,
    })
  },
  deleteItem({ dispatch }, payload) {
    return dispatch('useAPI', {
      method: 'delete',
      url: `${process.env.baseUrl}/api/${payload}`,
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
}
