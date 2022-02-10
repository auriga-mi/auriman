const storeApplications = {

  namespaced: true,
  
  state: {

    nextId: 1,
    applications: [],

  },
  
  getters: {

  },
  
  mutations: {

    SET_APPLICATION(state, payload) {
      state.applications.push(payload)
      state.nextId++
    },

    REMOVE_APPLICATION(state, payload) { 
      state.applications.splice(payload, 1)
    },

    RESET_ALL_APPLICATIONS(state) {
      state.applications = []
    }
    
  },
  
  actions: {

    addItem(context, payload) {
      context.commit('SET_APPLICATION', payload)
    },

    removeItem({state, commit}, payload) {
      const index = state.applications.findIndex(x => x.id === payload)
      commit('REMOVE_APPLICATION', index)
    },

    resetAllItems(context) {
      context.commit('RESET_ALL_APPLICATIONS')
    }
    
  }

}

export default storeApplications